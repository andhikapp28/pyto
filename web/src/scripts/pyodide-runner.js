// Logika bersama untuk memuat & menjalankan Pyodide (Python asli di
// browser). Diekstrak dari EditorSection.astro supaya bisa dipakai ulang
// oleh editor latihan di halaman bab (PyodideEditor.astro) tanpa duplikasi.
//
// ---------------------------------------------------------------------
// PENTING (perbaikan "tab freeze"): Pyodide TIDAK LAGI dijalankan di main
// thread. Seluruh eksekusi Python sungguhan sekarang tinggal di
// `pyodide-worker.js` (Web Worker terpisah) — lihat komentar panjang di
// file itu untuk alasan lengkapnya (ringkasnya: GitHub Pages, tempat situs
// ini di-deploy, tidak mengizinkan header COOP/COEP kustom, jadi
// SharedArrayBuffer + pyodide.setInterruptBuffer() — cara "resmi" Pyodide
// untuk interrupt halus — TIDAK viable di produksi; sebagai gantinya kita
// pakai Worker.terminate() sebagai tombol darurat, yang tidak butuh
// SharedArrayBuffer sama sekali).
//
// File ini SEKARANG cuma klien RPC tipis ke Worker itu lewat postMessage.
// SEMUA fungsi yang diekspor di bawah (runPython, runPythonInteractive,
// runPythonInteractiveWithChart, runPhotoWorkbench, runQrWorkbench,
// runFileWorkbench, runDrawingWorkbench, ensurePillow,
// ensurePackageViaMicropip, ensureMatplotlib, isFirstPyodideLoad, dst.)
// SENGAJA mempertahankan signature & perilaku eksternal yang PERSIS SAMA
// seperti sebelumnya, supaya PyodideEditor.astro, EditorSection.astro,
// FinanceChartEditor.astro (Bab 20), dan keempat komponen "bengkel"
// (Drawing/Photo/Qr/File-WorkbenchEditor.astro) tidak perlu (dan sebagian
// besar memang tidak) diubah sama sekali.
//
// Tombol baru: stopPython() — mematikan (terminate) Worker yang sedang
// berjalan, membatalkan eksekusi Python yang nyangkut (mis. loop tak
// berhenti) TANPA membekukan tab, lalu menyiapkan Worker+runtime Pyodide
// baru dari nol untuk percobaan berikutnya. Kode yang sedang diketik
// pembaca aman (cuma teks di <textarea> milik halaman, tidak pernah ikut
// dimatikan). Dipakai oleh tombol "⏹ Stop" di PyodideEditor.astro.
// ---------------------------------------------------------------------

export const LOADING_MESSAGE = '🐍 Pyto sedang bangun... sebentar ya';

// ---------------------------------------------------------------------
// Inti RPC ke Worker
// ---------------------------------------------------------------------

let worker = null;
let nextRequestId = 1;
const pendingRequests = new Map(); // id -> { resolve, reject, onOutput, onInputRequest }

// Penanda internal dipakai stopPython()/friendlyError() supaya pesan "kamu
// sendiri yang menghentikan program" tidak ditampilkan seperti error Python
// biasa (lihat STOPPED_MESSAGE di bagian friendlyError()).
const STOPPED_MARKER = '__PYTO_STOPPED__';

function createWorker() {
  const w = new Worker(new URL('./pyodide-worker.js', import.meta.url));
  w.addEventListener('message', handleWorkerMessage);
  w.addEventListener('error', handleWorkerCrash);
  return w;
}

function getWorker() {
  if (!worker) worker = createWorker();
  return worker;
}

function handleWorkerMessage(event) {
  const msg = event.data;
  if (!msg || typeof msg !== 'object') return;
  const entry = pendingRequests.get(msg.id);
  if (!entry) return;

  if (msg.type === 'output') {
    entry.onOutput?.(msg.text);
    return;
  }

  if (msg.type === 'input-request') {
    Promise.resolve(entry.onInputRequest ? entry.onInputRequest(msg.prompt) : '').then((value) => {
      // Worker bisa saja sudah di-terminate (lewat stopPython()) selagi
      // menunggu jawaban pembaca — kalau begitu, tidak ada lagi yang perlu
      // dikirim balik.
      if (pendingRequests.has(msg.id)) {
        worker?.postMessage({ id: msg.id, type: 'input-response', value });
      }
    });
    return;
  }

  if (msg.type === 'result') {
    pendingRequests.delete(msg.id);
    entry.resolve(msg.payload);
    return;
  }

  if (msg.type === 'error') {
    pendingRequests.delete(msg.id);
    entry.reject(new Error(msg.message));
  }
}

// Kalau Worker sendiri crash (bukan error Python biasa — mis. gagal memuat
// pyodide.js karena benar-benar offline saat startup), gagalkan semua
// permintaan yang masih menunggu supaya UI tidak menunggu selamanya, lalu
// buang Worker itu supaya percobaan berikutnya membuat yang baru.
function handleWorkerCrash() {
  for (const entry of pendingRequests.values()) {
    entry.reject(new Error('Gagal menjalankan Pyto — coba klik Jalankan sekali lagi, ya.'));
  }
  pendingRequests.clear();
  worker = null;
  pyodideReadyPromise = null;
  pillowReadyPromise = null;
  matplotlibReadyPromise = null;
  for (const key of Object.keys(micropipPackagePromises)) delete micropipPackagePromises[key];
}

// rpc(): kirim satu pesan ke Worker dan kembalikan Promise yang selesai
// begitu Worker membalas 'result' (resolve) atau 'error' (reject).
// `onOutput`/`onInputRequest` opsional dipakai runPythonInteractive() untuk
// menangani event yang bisa muncul BERKALI-KALI selama satu pemanggilan.
// `transfer` opsional dipakai kalau payload berisi Transferable (tidak
// dipakai saat ini dari sisi klien, tapi disediakan untuk simetri).
function rpc(type, payload, { onOutput, onInputRequest, transfer } = {}) {
  return new Promise((resolve, reject) => {
    const id = nextRequestId++;
    pendingRequests.set(id, { resolve, reject, onOutput, onInputRequest });
    try {
      getWorker().postMessage({ id, type, payload }, transfer || []);
    } catch (err) {
      pendingRequests.delete(id);
      reject(err);
    }
  });
}

// Menghentikan PAKSA eksekusi Python yang sedang berjalan (dipakai tombol
// "⏹ Stop"). Efeknya global untuk seluruh halaman — karena cuma ada SATU
// runtime Pyodide dibagi semua editor di halaman ini (persis seperti
// sebelum perbaikan ini), menghentikan lewat satu editor akan membatalkan
// APA PUN yang sedang berjalan di Worker itu, dari editor manapun asalnya.
// Setiap editor menangani pembatalannya sendiri lewat blok catch masing-
// masing (lihat friendlyError() -> STOPPED_MESSAGE).
//
// Mengembalikan `true` kalau memang ada Worker yang dimatikan, `false`
// kalau tidak ada apa-apa yang perlu dihentikan (aman dipanggil kapan saja).
export function stopPython() {
  if (!worker) return false;
  worker.terminate();
  worker = null;

  for (const entry of pendingRequests.values()) {
    entry.reject(new Error(STOPPED_MARKER));
  }
  pendingRequests.clear();

  // Reset semua cache "sudah dimuat" — Worker barunya nanti mulai dari
  // Pyodide/Pillow/matplotlib/paket micropip kosong lagi, jadi pesan
  // loading pertama kali (LOADING_MESSAGE dkk.) akan muncul lagi secara
  // wajar.
  pyodideReadyPromise = null;
  pillowReadyPromise = null;
  matplotlibReadyPromise = null;
  for (const key of Object.keys(micropipPackagePromises)) delete micropipPackagePromises[key];

  return true;
}

// ---------------------------------------------------------------------
// Cache "sudah pernah dimuat" di sisi klien — meniru persis pola singleton
// lama (`pyodideReadyPromise` dkk. langsung di module scope), supaya
// isFirstPyodideLoad()/isFirstPillowLoad()/isFirstPackageLoad()/
// isFirstMatplotlibLoad() tetap bisa dicek SINKRON oleh komponen (sebelum
// `await` apa pun) seperti sebelumnya — bedanya sekarang promise itu
// membungkus satu panggilan RPC ke Worker, bukan langsung memanggil
// pyodide.loadPackage() dkk. di tempat.
// ---------------------------------------------------------------------

let pyodideReadyPromise = null;

export function isFirstPyodideLoad() {
  return !pyodideReadyPromise;
}

function ensurePyodideRpc() {
  if (!pyodideReadyPromise) {
    pyodideReadyPromise = rpc('ensurePyodide', {});
  }
  return pyodideReadyPromise;
}

// Dipertahankan untuk kompatibilitas API (tidak dipakai komponen manapun
// secara langsung, lihat pyodide-runner.js versi lama) — sekarang cuma
// memastikan Worker+Pyodide siap, tidak lagi mengembalikan objek pyodide
// sungguhan (yang memang tidak bisa "dikirim" keluar dari Worker).
export function getPyodide() {
  return ensurePyodideRpc();
}

// Menjalankan kode Python dan mengembalikan gabungan stdout+stderr sebagai teks.
export async function runPython(code) {
  await ensurePyodideRpc();
  const { output } = await rpc('runPython', { code });
  return output;
}

// Bab 4: menjalankan kode Python yang boleh memanggil input() SUNGGUHAN dan
// benar-benar berhenti menunggu jawaban pembaca (bukan simulasi). Transformasi
// teks `input(` -> `(await input(...))` dan setup `async def input()` sekarang
// terjadi di dalam Worker (pyodide-worker.js, fungsi addAwaitBeforeInput())
// — lihat komentar panjang di sana untuk kenapa hasilnya dibungkus kurung,
// bukan sekadar ditempeli "await " di depan.
//
// `onOutput(text)` dipanggil tiap kali ada output baru dari stdout/stderr.
// `onInputRequest(prompt)` dipanggil setiap kali kode menyentuh input(...);
// harus mengembalikan Promise<string> yang baru selesai saat pembaca
// mengirim jawabannya — titik itulah eksekusi Python di dalam Worker
// sungguhan tertahan (lewat Promise yang di-`await` dari sisi Python).
export async function runPythonInteractive(code, { onOutput, onInputRequest } = {}) {
  await ensurePyodideRpc();
  await rpc('runPythonInteractive', { code }, { onOutput, onInputRequest });
}

// Bab 12: pesan gagal jaringan (offline, atau situs belum mengizinkan CORS)
// muncul dari Pyodide sebagai "JsException: TypeError: Failed to fetch",
// yang kurang ramah dibaca apa adanya (lihat plan/design/bab-12-desain.md).
// Petakan ke bahasa yang lebih jelas sebelum jatuh ke logika terjemahan
// error biasa di bawah.
const NETWORK_FAILURE_MESSAGE =
  'Gagal mengambil data — cek koneksi internetmu, atau situs ini mungkin belum mengizinkan diakses dari sini.';

// Ditampilkan saat pembaca sendiri menekan tombol "⏹ Stop" (atau eksekusi
// dibatalkan otomatis lewat stopPython()) — beda nada dari error Python
// biasa, karena ini BUKAN kesalahan si pembaca, cuma penghentian paksa.
const STOPPED_MESSAGE =
  '⏹ Program dihentikan. Kalau kode di atas ada perulangan (while/for) yang syaratnya tidak pernah berubah, coba cek lagi bagian itu sebelum menjalankan ulang.';

// ---------------------------------------------------------------------
// Bab 13 — jembatan Upload/Jalankan/Unduh foto (PhotoWorkbenchEditor.astro).
// Dibangun generik (nama fungsi tidak menyebut "foto" di intinya) supaya bisa
// dipakai ulang oleh Bab 14 (QR Code) dan Bab 15 (Excel/PDF) — lihat
// plan/design/bab-13-desain.md. Logika sungguhan (baca file, jalankan kode,
// baca balik hasil) sekarang ada di pyodide-worker.js; fungsi-fungsi di
// bawah ini cuma proksi RPC yang mempertahankan signature/perilaku lama.
// ---------------------------------------------------------------------

// Pesan loading terpisah dari LOADING_MESSAGE (Pyodide inti) — memuat paket
// Pillow via pyodide.loadPackage('Pillow') bisa makan waktu lumayan lama
// sendiri, terutama di HP low-end, jadi pembaca perlu tahu itu tahap yang
// berbeda.
export const PILLOW_LOADING_MESSAGE = '🖼️ Menyiapkan Pillow (kotak alat olah gambar)... sebentar ya';

let pillowReadyPromise = null;

// True kalau Pillow belum pernah selesai dimuat di sesi ini.
export function isFirstPillowLoad() {
  return !pillowReadyPromise;
}

function ensurePillowRpc() {
  if (!pillowReadyPromise) {
    pillowReadyPromise = ensurePyodideRpc().then(() => rpc('ensurePillow', {}));
  }
  return pillowReadyPromise;
}

// Memastikan paket Pillow sudah termuat di namespace Pyodide (di dalam
// Worker). Aman dipanggil berkali-kali — pemuatan sungguhan cuma terjadi
// sekali per sesi.
export async function ensurePillow() {
  await ensurePillowRpc();
}

// Uint8Array -> base64 (dipotong per-chunk supaya tidak kena batas argumen
// String.fromCharCode.apply untuk file besar). Murni JS, tidak menyentuh
// Pyodide/Worker sama sekali — tetap di main thread seperti semula.
export function bytesToBase64(bytes) {
  let binary = '';
  const chunkSize = 0x8000;
  for (let i = 0; i < bytes.length; i += chunkSize) {
    binary += String.fromCharCode.apply(null, bytes.subarray(i, i + chunkSize));
  }
  return btoa(binary);
}

// base64 -> Uint8Array, untuk mengubah hasil balik dari Python jadi Blob.
export function base64ToBytes(base64) {
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}

// Menjalankan kode Python bab "bengkel" (olah gambar dst.) yang butuh sebuah
// file yang diupload pembaca disuntikkan sebagai variabel Python bernama
// `inputVarName` (default "foto", sudah berupa objek PIL.Image), lalu
// membaca balik variabel bernama `outputVarName` (default "hasil") sesudah
// kode reader selesai dijalankan, dikonversi jadi bytes PNG.
//
// Mengembalikan { output, resultBase64 }. Error dari kode pembaca dilempar
// apa adanya (sekarang lewat rpc()'s reject) supaya ditangkap lewat
// friendlyError() seperti runPython() biasa — PERILAKU TIDAK BERUBAH dari
// versi sebelum Worker.
export async function runPhotoWorkbench(
  code,
  fileBase64,
  { inputVarName = 'foto', outputVarName = 'hasil' } = {}
) {
  await ensurePillowRpc();
  return rpc('runPhotoWorkbench', { code, fileBase64, inputVarName, outputVarName });
}

// ---------------------------------------------------------------------
// Infrastruktur micropip GENERIK (dipakai Bab 14 untuk paket `qrcode`, lalu
// Bab 15 untuk `openpyxl` dan `pypdf`) — lihat plan/design/bab-14-desain.md
// dan plan/design/bab-15-desain.md. Pemasangan sungguhan lewat micropip
// sekarang terjadi di dalam Worker; di sini cuma cache+proksi RPC.
// ---------------------------------------------------------------------

export const QRCODE_LOADING_MESSAGE =
  '📱 Menyiapkan qrcode (kotak alat bikin kode QR)... sebentar ya';
export const OPENPYXL_LOADING_MESSAGE =
  '📊 Menyiapkan openpyxl (kotak alat baca-tulis Excel)... sebentar ya';
export const PYPDF_LOADING_MESSAGE = '📄 Menyiapkan pypdf (kotak alat baca PDF)... sebentar ya';

const micropipPackagePromises = {};

// True kalau `packageName` belum pernah selesai dipasang via micropip di
// sesi ini (dipakai komponen untuk menampilkan pesan loading yang tepat,
// sama pola dengan isFirstPillowLoad()).
export function isFirstPackageLoad(packageName) {
  return !micropipPackagePromises[packageName];
}

function ensurePackageRpc(packageName) {
  if (!micropipPackagePromises[packageName]) {
    micropipPackagePromises[packageName] = ensurePyodideRpc().then(() =>
      rpc('ensurePackage', { packageName })
    );
  }
  return micropipPackagePromises[packageName];
}

// Memastikan sebuah paket pure-Python sudah terpasang di namespace Pyodide
// (di dalam Worker) lewat micropip. Aman dipanggil berkali-kali — pemasangan
// sungguhan cuma terjadi sekali per paket per sesi. Parameter pertama
// (`_pyodideUnused`) dipertahankan demi kompatibilitas signature lama;
// tidak dipakai lagi karena tidak ada lagi objek pyodide di main thread.
export async function ensurePackageViaMicropip(_pyodideUnused, packageName) {
  await ensurePackageRpc(packageName);
}

// ---------------------------------------------------------------------
// Bab 14 — jembatan Teks/Jalankan/Unduh (+ logo opsional) kode QR
// (QrCodeWorkbenchEditor.astro). Beda dari runPhotoWorkbench: input utamanya
// STRING biasa (teks/URL yang diketik pembaca), bukan file upload.
// ---------------------------------------------------------------------
export async function runQrWorkbench(
  code,
  teksValue,
  {
    teksVarName = 'teks_qr',
    logoFileBase64 = null,
    logoVarName = 'logo',
    outputVarName = 'hasil',
  } = {}
) {
  await ensurePillowRpc();
  await ensurePackageRpc('qrcode');
  return rpc('runQrWorkbench', {
    code,
    teksValue,
    teksVarName,
    logoFileBase64,
    logoVarName,
    outputVarName,
  });
}

// ---------------------------------------------------------------------
// Bab 15 — jembatan Upload/Jalankan/Unduh FILE GENERIK (FileWorkbenchEditor.astro).
// Beda dari runPhotoWorkbench: file yang diupload BUKAN gambar (`.xlsx`/`.pdf`),
// jadi dibungkus `io.BytesIO` polos (inputMode 'bytesio'), bukan di-decode
// paksa lewat Image.open(). `runPhotoWorkbench` TIDAK memakai fungsi ini
// (tetap berdiri sendiri, perilaku Bab 13 tidak tersentuh).
// ---------------------------------------------------------------------
export async function runFileWorkbench(
  code,
  fileBase64,
  {
    inputVarName = 'berkas_excel',
    inputMode = 'bytesio', // 'image' | 'bytesio'
    outputVarName = 'hasil',
    outputKind = 'bytes', // 'image' | 'bytes' | 'none'
    packages = [], // nama paket micropip yang wajib terpasang dulu, mis. ['openpyxl']
  } = {}
) {
  const needsPillow = inputMode === 'image' || outputKind === 'image';
  if (needsPillow) {
    await ensurePillowRpc();
  } else {
    await ensurePyodideRpc();
  }
  for (const packageName of packages) {
    await ensurePackageRpc(packageName);
  }

  return rpc('runFileWorkbench', {
    code,
    fileBase64,
    inputVarName,
    inputMode,
    outputVarName,
    outputKind,
    packages,
  });
}

// ---------------------------------------------------------------------
// Bab 17 — jembatan kanvas gambar SINKRON (DrawingWorkbenchEditor.astro).
// Kode Python jalan di dalam Worker menggambar ke sebuah OffscreenCanvas
// yang berdiri sendiri di sana (lihat komentar panjang di
// pyodide-worker.js soal kenapa BUKAN transferControlToOffscreen()), lalu
// hasilnya dikirim balik sebagai satu ImageBitmap yang kita gambar SEKALI
// ke <canvas> DOM asli di sini. `canvasElement` yang diterima fungsi ini
// TETAP kanvas biasa yang sepenuhnya dikendalikan main thread seperti
// sebelumnya — toDataURL() (tombol unduh) & pengecatan putih awal di
// DrawingWorkbenchEditor.astro TIDAK PERLU berubah sama sekali.
// ---------------------------------------------------------------------

export const DRAWING_CANVAS_SIZE = 400; // HARUS sama dengan DRAWING_CANVAS_SIZE di pyodide-worker.js

export async function runDrawingWorkbench(code, canvasElement) {
  await ensurePyodideRpc();
  const { output, bitmap } = await rpc('runDrawingWorkbench', { code });

  const ctx = canvasElement.getContext('2d');
  ctx.clearRect(0, 0, DRAWING_CANVAS_SIZE, DRAWING_CANVAS_SIZE);
  ctx.drawImage(bitmap, 0, 0);
  bitmap.close();

  return { output };
}

// ---------------------------------------------------------------------
// Bab 20 — jembatan GABUNGAN: input() interaktif (pola Bab 4/16/18/19, pakai
// ulang addAwaitBeforeInput()/INTERACTIVE_INPUT_SETUP di dalam Worker) +
// pembacaan-balik OTOMATIS figure matplotlib aktif di akhir eksekusi. BEDA
// dari readWorkbenchResult() (Bab 13-15): di sana bridge membaca SATU
// VARIABEL bernama `hasil` yang HARUS ditulis reader secara eksplisit. Di
// sini reader TIDAK PERNAH menulis nama variabel hasil sama sekali -- kode
// plotting matplotlib yang wajar (plt.bar()/plt.pie()) tidak pernah
// menugaskan hasilnya ke variabel apa pun, jadi figure yang AKTIF
// (plt.gcf(), dicek lewat plt.get_fignums()) diambil otomatis. Lihat
// plan/design/bab-20-desain.md bagian "Bridge Baru" untuk kontrak lengkapnya.
//
// Logika sungguhan (matplotlib.use("Agg"), jalankan kode, tangkap figure
// jadi PNG base64) sekarang ada di pyodide-worker.js — fungsi-fungsi di
// bawah ini cuma cache+proksi RPC, pola yang sama persis dengan
// ensurePillow()/ensurePackageViaMicropip() di atas. Ini juga berarti kode
// Bab 20 yang nyangkut di loop tak berhenti bisa dihentikan lewat tombol
// "⏹ Stop" yang sama seperti bab-bab lain.
// ---------------------------------------------------------------------

export const MATPLOTLIB_LOADING_MESSAGE =
  '📊 Menyiapkan matplotlib (kotak alat gambar grafik)... sebentar ya';

let matplotlibReadyPromise = null;

// True kalau matplotlib belum pernah selesai dimuat di sesi ini (dipakai
// komponen untuk menampilkan pesan loading, sama pola dengan
// isFirstPillowLoad()).
export function isFirstMatplotlibLoad() {
  return !matplotlibReadyPromise;
}

function ensureMatplotlibRpc() {
  if (!matplotlibReadyPromise) {
    matplotlibReadyPromise = ensurePyodideRpc().then(() => rpc('ensureMatplotlib', {}));
  }
  return matplotlibReadyPromise;
}

// Memastikan paket matplotlib sudah termuat DAN backend-nya sudah dipaksa
// ke "Agg" (render-ke-memori, non-GUI) di dalam Worker. Aman dipanggil
// berkali-kali — pemuatan sungguhan cuma terjadi sekali per sesi.
export async function ensureMatplotlib() {
  await ensureMatplotlibRpc();
}

// Menjalankan kode Python Bab 20 yang memanggil input() berkali-kali
// (persis semantik runPythonInteractive() -- lihat dokumentasi fungsi itu
// di atas), LALU setelah kode selesai (semua input() sudah terjawab),
// menangkap figure matplotlib yang AKTIF (kalau ada) jadi PNG base64.
// Mengembalikan { chartBase64 } -- null kalau kode pembaca tidak pernah
// memanggil plt.bar()/plt.pie()/dst (tidak ada figure aktif), BUKAN error.
export async function runPythonInteractiveWithChart(code, { onOutput, onInputRequest } = {}) {
  await ensureMatplotlibRpc();
  return rpc('runPythonInteractiveWithChart', { code }, { onOutput, onInputRequest });
}

// ---------------------------------------------------------------------
// Bab 9 — "Salah itu Wajar": terjemahkan pesan error Python paling umum
// bagi pemula ke Bahasa Indonesia yang ramah, senada dengan penjelasan di
// halaman Bab 9 sendiri (lihat NameErrorDemo.astro, TypeErrorDemo.astro,
// ValueErrorDemo.astro, SyntaxErrorDemo.astro, MoreErrorsDemo.astro —
// istilah & nada di bawah sengaja disamakan dengan komponen-komponen itu).
//
// Sebelum perbaikan ini, friendlyError() cuma mengambil baris terakhir
// traceback mentah (mis. "NameError: name 'nma' is not defined") apa
// adanya — jadi janji Bab 9 ("baca jenisnya, baca pesannya, terjemahkan")
// tidak pernah benar-benar dipenuhi DI DALAM editor sungguhan. Sekarang
// jenis error paling umum diterjemahkan; jenis yang belum dipetakan tetap
// jatuh ke perilaku lama (baris terakhir traceback apa adanya) — TIDAK ada
// informasi yang disembunyikan begitu saja untuk error yang belum dikenal.
// ---------------------------------------------------------------------

const ERROR_TRANSLATORS = {
  NameError(detail) {
    const m = detail.match(/name '(.+?)' is not defined/);
    const varName = m ? m[1] : null;
    return varName
      ? `Python tidak menemukan sesuatu bernama '${varName}' — coba cek lagi, mungkin salah ketik, atau variabelnya belum pernah dibuat (diisi dengan =) sebelum dipakai.`
      : `Python tidak menemukan nama yang kamu pakai — coba cek lagi, mungkin salah ketik atau belum dibuat sebelum dipakai.`;
  },

  TypeError(detail) {
    if (/can only concatenate str/.test(detail)) {
      return `Python bilang kamu coba menggabungkan teks (str) dengan angka pakai +, padahal dua tipe itu tidak bisa langsung disatukan — coba bungkus angkanya dengan str(), atau ubah teksnya jadi angka dulu dengan int()/float().`;
    }
    if (/unsupported operand type\(s\)/.test(detail)) {
      return `Python bilang ada dua tipe data yang tidak cocok dipakai bersama di operator itu — cek lagi, mungkin ada teks (str) dan angka (int/float) yang tercampur.`;
    }
    if (/missing \d+ required positional argument|takes \d+.*positional argument.*but \d+.*given/.test(detail)) {
      return `Python bilang jumlah nilai yang kamu kirim ke fungsi itu tidak sesuai — coba hitung lagi berapa banyak argumen yang seharusnya diisi.`;
    }
    if (/not callable/.test(detail)) {
      return `Python bilang kamu mencoba "memanggil" sesuatu yang bukan fungsi (pakai tanda kurung ()) — cek lagi, mungkin nama variabelnya sama dengan nama fungsi bawaan, jadi tertimpa.`;
    }
    if (/object is not subscriptable/.test(detail)) {
      return `Python bilang kamu mencoba mengambil isi sesuatu pakai [ ], padahal itu bukan list/dict/teks yang bisa diambil isinya seperti itu.`;
    }
    return `Python bilang ada dua tipe data yang tidak cocok digabung atau dipakai bersama di baris itu — cek lagi tipe data variabelmu (teks/angka/dll).`;
  },

  ValueError(detail) {
    const mInt = detail.match(/invalid literal for int\(\) with base \d+: '(.*)'/);
    if (mInt) {
      return `Tulisan '${mInt[1]}' isinya bukan angka bulat, jadi tidak bisa diubah pakai int() — coba cek lagi isi teksnya.`;
    }
    const mFloat = detail.match(/could not convert string to float: '(.*)'/);
    if (mFloat) {
      return `Tulisan '${mFloat[1]}' isinya bukan angka desimal, jadi tidak bisa diubah pakai float() — coba cek lagi isi teksnya.`;
    }
    return `Python bilang nilai yang kamu berikan tidak bisa diproses di situ — isinya mungkin tidak sesuai dengan yang diharapkan.`;
  },

  SyntaxError(detail) {
    if (/expected ':'/.test(detail)) {
      return `Python bilang kalimatnya belum lengkap — sepertinya ada tanda titik dua : yang kelupaan di akhir baris (misalnya setelah if/elif/else/for/while/def).`;
    }
    if (/unterminated string literal|EOL while scanning/.test(detail)) {
      return `Python bilang ada tanda kutip yang belum ditutup — cek lagi, mungkin ada tanda " atau ' yang lupa dipasangkan di teksmu.`;
    }
    if (/unexpected indent|expected an indented block|IndentationError/.test(detail)) {
      return `Python bilang ada bagian kode yang menjorok (indentasi/spasi di depan baris) tidak sesuai — cek lagi spasinya, terutama sesudah baris yang diakhiri titik dua.`;
    }
    if (/unmatched '\)'|unmatched '\]'|unmatched '\}'|was never closed/.test(detail)) {
      return `Python bilang ada tanda kurung yang tidak pas jumlahnya — cek lagi pasangan ( ), [ ], atau { } di kodemu.`;
    }
    return `Python belum sempat menjalankan kodenya sama sekali, karena bentuk kalimatnya belum sesuai aturan Python — coba cek tanda kurung, titik dua, atau tanda kutip yang mungkin belum lengkap.`;
  },

  IndexError() {
    return `Kamu mencoba mengambil item di posisi (index) yang tidak ada di list/teks itu — index-nya kebesaran (atau list-nya lebih pendek dari yang kamu kira). Ingat, index dimulai dari 0!`;
  },

  KeyError(detail) {
    return `Python tidak menemukan kunci ${detail} di dictionary itu — coba cek lagi ejaannya, atau pastikan kunci itu memang sudah pernah ditambahkan sebelumnya.`;
  },

  ZeroDivisionError() {
    return `Python tidak bisa membagi sebuah angka dengan nol — coba cek lagi angka pembaginya (yang ada di belakang tanda / atau %).`;
  },
};

export function friendlyError(err) {
  const message = err instanceof Error ? err.message : String(err);

  if (message === STOPPED_MARKER) {
    return STOPPED_MESSAGE;
  }
  if (message.includes('Failed to fetch')) {
    return NETWORK_FAILURE_MESSAGE;
  }

  // Ambil baris terakhir yang biasanya berisi jenis error Python (mis. "NameError: ...")
  const lines = message.trim().split('\n');
  const lastLine = lines[lines.length - 1] || message;

  const match = lastLine.match(/^(\w+(?:Error|Warning|Exception)):\s*([\s\S]*)$/);
  if (match) {
    const [, errorType, detail] = match;
    const translate = ERROR_TRANSLATORS[errorType];
    if (translate) {
      return translate(detail, lastLine);
    }
  }

  // Jenis error yang belum dipetakan: tetap tampilkan baris mentahnya apa
  // adanya (perilaku lama) — supaya tidak ada informasi yang hilang begitu
  // saja untuk error yang belum diterjemahkan.
  return lastLine;
}
