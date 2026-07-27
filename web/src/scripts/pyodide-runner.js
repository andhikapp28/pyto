// Logika bersama untuk memuat & menjalankan Pyodide (Python asli di
// browser). Diekstrak dari EditorSection.astro supaya bisa dipakai ulang
// oleh editor latihan di halaman bab (PyodideEditor.astro) tanpa duplikasi.
const PYODIDE_VERSION = '0.26.4';
const PYODIDE_CDN = `https://cdn.jsdelivr.net/pyodide/v${PYODIDE_VERSION}/full/`;

export const LOADING_MESSAGE = '🐍 Pyto sedang bangun... sebentar ya';

let pyodideReadyPromise = null;

function loadScript(src) {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = src;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Gagal memuat Pyodide. Cek koneksi internetmu, ya.'));
    document.head.appendChild(script);
  });
}

// True kalau ini panggilan pertama (dipakai untuk menampilkan pesan loading).
export function isFirstPyodideLoad() {
  return !pyodideReadyPromise;
}

export function getPyodide() {
  if (!pyodideReadyPromise) {
    pyodideReadyPromise = (async () => {
      if (typeof window.loadPyodide !== 'function') {
        await loadScript(`${PYODIDE_CDN}pyodide.js`);
      }
      return window.loadPyodide({ indexURL: PYODIDE_CDN });
    })();
  }
  return pyodideReadyPromise;
}

// Menjalankan kode Python dan mengembalikan gabungan stdout+stderr sebagai teks.
export async function runPython(code) {
  const pyodide = await getPyodide();
  let output = '';
  pyodide.setStdout({
    batched: (s) => {
      output += s + '\n';
    },
  });
  pyodide.setStderr({
    batched: (s) => {
      output += s + '\n';
    },
  });

  await pyodide.runPythonAsync(code);
  return output.replace(/\n$/, '');
}

// Bab 4: menjalankan kode Python yang boleh memanggil input() SUNGGUHAN dan
// benar-benar berhenti menunggu jawaban pembaca (bukan simulasi).
//
// Caranya: kita definisikan ulang `input` di namespace Python sebagai fungsi
// `async def` yang meng-`await` sebuah Promise dari JS (lewat
// `onInputRequest`), lalu kita ubah kode pengguna secara tekstual supaya
// setiap pemanggilan `input(` diberi awalan `await `. Pyodide mendukung
// top-level `await` di `runPythonAsync` DAN bisa meng-`await` Promise JS
// langsung dari Python (JsProxy dari sebuah Promise otomatis punya
// `__await__`) — jadi eksekusi Python di WASM benar-benar tertahan sampai
// Promise itu selesai, tanpa perlu Web Worker atau SharedArrayBuffer.
//
// Keterbatasan yang disengaja (lihat catatan di laporan akhir): transformasi
// ini memakai pencarian teks `input(`, jadi kalau kata "input(" muncul di
// dalam string/komentar kode pengguna, itu juga akan ikut diberi awalan
// `await` (mengubah bikin SyntaxError kalau memang ada `await` di luar
// fungsi async). Untuk kode-kode pemula seperti di buku ini (tanpa `def`),
// ini praktis tidak pernah kejadian.
function addAwaitBeforeInput(code) {
  return code.replace(/(?<!await\s)\binput(?=\s*\()/g, 'await input');
}

const INTERACTIVE_INPUT_SETUP = `
async def input(prompt=""):
    return await __pyto_request_input(prompt)
`;

// Menjalankan kode Python secara interaktif. `onOutput(text)` dipanggil tiap
// kali ada output baru dari stdout/stderr (bisa dipanggil berkali-kali,
// selagi kode masih berjalan). `onInputRequest(prompt)` dipanggil setiap kali
// kode menyentuh input(...); harus mengembalikan sebuah Promise<string> yang
// baru selesai saat pembaca mengirim jawabannya — persis di titik itulah
// eksekusi Python sungguhan tertahan.
export async function runPythonInteractive(code, { onOutput, onInputRequest } = {}) {
  const pyodide = await getPyodide();

  pyodide.setStdout({
    batched: (s) => {
      if (onOutput) onOutput(s);
    },
  });
  pyodide.setStderr({
    batched: (s) => {
      if (onOutput) onOutput(s);
    },
  });

  pyodide.globals.set('__pyto_request_input', (prompt) => {
    const promptText = prompt == null ? '' : String(prompt);
    if (!onInputRequest) return Promise.resolve('');
    return Promise.resolve(onInputRequest(promptText));
  });

  const transformed = addAwaitBeforeInput(code);
  await pyodide.runPythonAsync(`${INTERACTIVE_INPUT_SETUP}\n${transformed}`);
}

// Bab 12: pesan gagal jaringan (offline, atau situs belum mengizinkan CORS)
// muncul dari Pyodide sebagai "JsException: TypeError: Failed to fetch",
// yang kurang ramah dibaca apa adanya (lihat plan/design/bab-12-desain.md).
// Petakan ke bahasa yang lebih jelas sebelum jatuh ke logika baris-terakhir
// biasa di bawah.
const NETWORK_FAILURE_MESSAGE =
  'Gagal mengambil data — cek koneksi internetmu, atau situs ini mungkin belum mengizinkan diakses dari sini.';

// ---------------------------------------------------------------------
// Bab 13 — jembatan Upload/Jalankan/Unduh foto (PhotoWorkbenchEditor.astro).
// Dibangun generik (nama fungsi tidak menyebut "foto" di intinya) supaya bisa
// dipakai ulang oleh Bab 14 (QR Code) dan Bab 15 (Excel/PDF) — lihat
// plan/design/bab-13-desain.md.
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

// Memastikan paket Pillow sudah termuat di namespace Pyodide. Aman dipanggil
// berkali-kali — pemuatan sungguhan cuma terjadi sekali per sesi.
export async function ensurePillow() {
  const pyodide = await getPyodide();
  if (!pillowReadyPromise) {
    pillowReadyPromise = pyodide.loadPackage('Pillow');
  }
  await pillowReadyPromise;
  return pyodide;
}

// Uint8Array -> base64 (dipotong per-chunk supaya tidak kena batas argumen
// String.fromCharCode.apply untuk file besar).
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

// Membaca balik variabel bernama `outputVarName` dari namespace Python
// sesudah kode pembaca selesai dijalankan, dan mendeteksi OTOMATIS jenis
// hasilnya:
// - objek bergaya PIL.Image (punya `.save()`, bukan bytes) -> di-encode PNG
//   (dipakai Bab 13 `hasil = ...` gambar, dan Bab 14 `hasil = qrcode.make(...)`)
// - `bytes`/`bytearray` mentah -> langsung di-base64-kan apa adanya (dipakai
//   Bab 15, `hasil = buf.getvalue()` untuk file Excel/PDF)
// Lihat plan/design/bab-15-desain.md bagian "Generalisasi WAJIB" untuk
// kontrak lengkapnya. Dipakai ulang oleh runPhotoWorkbench, runQrWorkbench,
// dan runFileWorkbench supaya logikanya cuma ditulis sekali.
async function readWorkbenchResult(pyodide, outputVarName) {
  const readResultCode = `
import base64 as _pyto_base64
import io as _pyto_io
try:
    _pyto_hasil = ${outputVarName}
except NameError:
    _pyto_hasil = None

if _pyto_hasil is not None and hasattr(_pyto_hasil, "save") and not isinstance(_pyto_hasil, (bytes, bytearray)):
    _pyto_buf = _pyto_io.BytesIO()
    _pyto_hasil.save(_pyto_buf, format="PNG")
    _pyto_result_b64 = _pyto_base64.b64encode(_pyto_buf.getvalue()).decode("ascii")
    _pyto_result_kind = "image"
elif isinstance(_pyto_hasil, (bytes, bytearray)):
    _pyto_result_b64 = _pyto_base64.b64encode(bytes(_pyto_hasil)).decode("ascii")
    _pyto_result_kind = "bytes"
else:
    _pyto_result_b64 = None
    _pyto_result_kind = None
`;
  await pyodide.runPythonAsync(readResultCode);
  const resultBase64 = pyodide.globals.get('_pyto_result_b64') ?? null;
  const resultKind = pyodide.globals.get('_pyto_result_kind') ?? null;
  return { resultBase64, resultKind };
}

// Menjalankan kode Python bab "bengkel" (olah gambar dst.) yang butuh sebuah
// file yang diupload pembaca disuntikkan sebagai variabel Python bernama
// `inputVarName` (default "foto", sudah berupa objek PIL.Image), lalu
// membaca balik variabel bernama `outputVarName` (default "hasil") sesudah
// kode reader selesai dijalankan, dikonversi jadi bytes PNG.
//
// Mengembalikan { output, resultBase64 }. `resultBase64` bernilai null kalau
// `hasil` tidak ada atau bukan gambar — pemanggil (PhotoWorkbenchEditor)
// yang menampilkan pesan ramah untuk kasus itu, lihat
// plan/design/bab-13-desain.md langkah 4. Error dari kode pembaca (baik saat
// setup maupun saat menjalankan kode reader) dilempar apa adanya supaya
// ditangkap lewat friendlyError() seperti runPython() biasa.
//
// PENTING: perilaku fungsi ini TIDAK berubah sama sekali dari versi Bab 13
// sebelumnya (dipakai PhotoWorkbenchEditor.astro) — di baliknya sekarang
// cuma memanggil readWorkbenchResult()/runFileWorkbench() generik, lihat
// plan/design/bab-15-desain.md ("Bab 13 TIDAK BOLEH berubah perilaku").
export async function runPhotoWorkbench(
  code,
  fileBase64,
  { inputVarName = 'foto', outputVarName = 'hasil' } = {}
) {
  const pyodide = await ensurePillow();

  let output = '';
  pyodide.setStdout({
    batched: (s) => {
      output += s + '\n';
    },
  });
  pyodide.setStderr({
    batched: (s) => {
      output += s + '\n';
    },
  });

  pyodide.globals.set('_pyto_uploaded_b64', fileBase64);

  const setupCode = `
import base64 as _pyto_base64
import io as _pyto_io
from PIL import Image as _PytoImage
${inputVarName} = _PytoImage.open(_pyto_io.BytesIO(_pyto_base64.b64decode(_pyto_uploaded_b64)))
`;
  await pyodide.runPythonAsync(setupCode);
  await pyodide.runPythonAsync(code);

  const { resultBase64 } = await readWorkbenchResult(pyodide, outputVarName);

  return { output: output.replace(/\n$/, ''), resultBase64 };
}

// ---------------------------------------------------------------------
// Infrastruktur micropip GENERIK (baru, dipakai pertama kali oleh Bab 14
// untuk paket `qrcode`, lalu dipakai ulang oleh Bab 15 untuk `openpyxl` dan
// `pypdf`) — lihat plan/design/bab-14-desain.md dan plan/design/bab-15-desain.md.
// Paket-paket ini pure-Python, TIDAK tersedia lewat pyodide.loadPackage()
// bawaan (beda dari Pillow, yang dibundel resmi sebagai paket WASM), jadi
// harus dipasang lewat micropip.install() sesudah micropip sendiri dimuat.
// ---------------------------------------------------------------------

export const QRCODE_LOADING_MESSAGE =
  '📱 Menyiapkan qrcode (kotak alat bikin kode QR)... sebentar ya';
export const OPENPYXL_LOADING_MESSAGE =
  '📊 Menyiapkan openpyxl (kotak alat baca-tulis Excel)... sebentar ya';
export const PYPDF_LOADING_MESSAGE = '📄 Menyiapkan pypdf (kotak alat baca PDF)... sebentar ya';

let micropipInstallerPromise = null;

async function getMicropip(pyodide) {
  if (!micropipInstallerPromise) {
    micropipInstallerPromise = (async () => {
      await pyodide.loadPackage('micropip');
      return pyodide.pyimport('micropip');
    })();
  }
  return micropipInstallerPromise;
}

const micropipPackagePromises = {};

// True kalau `packageName` belum pernah selesai dipasang via micropip di
// sesi ini (dipakai komponen untuk menampilkan pesan loading yang tepat,
// sama pola dengan isFirstPillowLoad()).
export function isFirstPackageLoad(packageName) {
  return !micropipPackagePromises[packageName];
}

// Memastikan sebuah paket pure-Python sudah terpasang di namespace Pyodide
// lewat micropip. Aman dipanggil berkali-kali — pemasangan sungguhan cuma
// terjadi sekali per paket per sesi.
export async function ensurePackageViaMicropip(pyodide, packageName) {
  if (!micropipPackagePromises[packageName]) {
    micropipPackagePromises[packageName] = (async () => {
      const micropip = await getMicropip(pyodide);
      await micropip.install(packageName);
    })();
  }
  await micropipPackagePromises[packageName];
  return pyodide;
}

// ---------------------------------------------------------------------
// Bab 14 — jembatan Teks/Jalankan/Unduh (+ logo opsional) kode QR
// (QrCodeWorkbenchEditor.astro). Beda dari runPhotoWorkbench: input utamanya
// STRING biasa (teks/URL yang diketik pembaca), bukan file upload — jadi
// disuntik langsung lewat pyodide.globals.set(), tanpa base64/decode gambar.
// Variabel `logo` opsional (kalau pembaca mengaktifkan checkbox "Tambahkan
// logo") memakai proses decode identik dengan `foto` di Bab 13.
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
  const pyodide = await ensurePillow();
  await ensurePackageViaMicropip(pyodide, 'qrcode');

  let output = '';
  pyodide.setStdout({
    batched: (s) => {
      output += s + '\n';
    },
  });
  pyodide.setStderr({
    batched: (s) => {
      output += s + '\n';
    },
  });

  pyodide.globals.set(teksVarName, teksValue);

  if (logoFileBase64) {
    pyodide.globals.set('_pyto_logo_b64', logoFileBase64);
    const logoSetupCode = `
import base64 as _pyto_base64
import io as _pyto_io
from PIL import Image as _PytoImage
${logoVarName} = _PytoImage.open(_pyto_io.BytesIO(_pyto_base64.b64decode(_pyto_logo_b64)))
`;
    await pyodide.runPythonAsync(logoSetupCode);
  }

  await pyodide.runPythonAsync(code);

  const { resultBase64 } = await readWorkbenchResult(pyodide, outputVarName);

  return { output: output.replace(/\n$/, ''), resultBase64 };
}

// ---------------------------------------------------------------------
// Bab 15 — jembatan Upload/Jalankan/Unduh FILE GENERIK (FileWorkbenchEditor.astro).
// Beda dari runPhotoWorkbench: file yang diupload BUKAN gambar (`.xlsx`/`.pdf`),
// jadi dibungkus `io.BytesIO` polos (inputMode 'bytesio'), bukan di-decode
// paksa lewat Image.open(). Hasilnya (`hasil`) juga bisa berupa `bytes`
// mentah (bukan cuma PIL.Image) — deteksi otomatis lewat readWorkbenchResult().
// `runPhotoWorkbench` di atas TIDAK memakai fungsi ini (sengaja dibiarkan
// berdiri sendiri) supaya perilaku Bab 13 yang sudah live 100% tidak
// tersentuh, sesuai instruksi di plan/design/bab-15-desain.md.
// ---------------------------------------------------------------------
export async function runFileWorkbench(
  code,
  fileBase64,
  {
    inputVarName = 'berkas_excel',
    inputMode = 'bytesio', // 'image' | 'bytesio'
    outputVarName = 'hasil',
    outputKind = 'bytes', // 'image' | 'bytes' | 'none' (hint dari komponen; 'none' melewati pembacaan hasil sama sekali)
    packages = [], // nama paket micropip yang wajib terpasang dulu, mis. ['openpyxl']
  } = {}
) {
  const needsPillow = inputMode === 'image' || outputKind === 'image';
  const pyodide = needsPillow ? await ensurePillow() : await getPyodide();

  for (const packageName of packages) {
    await ensurePackageViaMicropip(pyodide, packageName);
  }

  let output = '';
  pyodide.setStdout({
    batched: (s) => {
      output += s + '\n';
    },
  });
  pyodide.setStderr({
    batched: (s) => {
      output += s + '\n';
    },
  });

  if (fileBase64 != null) {
    pyodide.globals.set('_pyto_uploaded_b64', fileBase64);
    const setupCode =
      inputMode === 'image'
        ? `
import base64 as _pyto_base64
import io as _pyto_io
from PIL import Image as _PytoImage
${inputVarName} = _PytoImage.open(_pyto_io.BytesIO(_pyto_base64.b64decode(_pyto_uploaded_b64)))
`
        : `
import base64 as _pyto_base64
import io as _pyto_io
${inputVarName} = _pyto_io.BytesIO(_pyto_base64.b64decode(_pyto_uploaded_b64))
`;
    await pyodide.runPythonAsync(setupCode);
  }

  await pyodide.runPythonAsync(code);

  if (outputKind === 'none') {
    return { output: output.replace(/\n$/, ''), resultBase64: null, resultKind: null };
  }

  const { resultBase64, resultKind } = await readWorkbenchResult(pyodide, outputVarName);

  return { output: output.replace(/\n$/, ''), resultBase64, resultKind };
}

// ---------------------------------------------------------------------
// Bab 17 — jembatan kanvas gambar SINKRON (DrawingWorkbenchEditor.astro).
// Pola bridge KETIGA (beda dari runPhotoWorkbench dkk. yang membaca balik
// SATU variabel hasil di akhir, dan beda dari runPythonInteractive yang
// menunggu manusia lewat input() async): di sini kode Python memanggil
// balik JS BERKALI-KALI SELAMA eksekusi, tiap kali maju()/mundur()
// menggambar satu garis, lewat dua fungsi yang didaftarkan ke
// pyodide.globals — _pyto_kanvas_garis dan _pyto_kanvas_bersihkan.
// Panggilannya SINKRON (bukan menunggu manusia seperti input() Bab 4/16),
// jadi preamble di bawah murni `def` biasa, tanpa `async`/`await` sama
// sekali. Lihat kontrak lengkap di plan/design/bab-17-desain.md.
// ---------------------------------------------------------------------

export const DRAWING_CANVAS_SIZE = 400; // lebar & tinggi logis kanvas, dalam px

// Preamble Python "Kanvas Ajaib Pyto" — disuntikkan sebelum kode pembaca,
// TIDAK PERNAH ditampilkan ke pembaca di halaman manapun (beda dari Bab 16,
// tempat sandikan()/cek_kekuatan_sandi() ditulis penuh oleh pembaca sendiri
// — di sini maju() dkk. adalah "sihir" kanvas yang sudah disiapkan). Aman
// dijalankan berkali-kali (mendefinisikan ulang fungsi/dict tidak
// menimbulkan efek samping).
const KANVAS_AJAIB_PREAMBLE = `
import math as _pyto_math

_pyto_warna_palet = {
    "hitam": "#1E2A32",
    "putih": "#FFFFFF",
    "merah": "#FF7A6B",
    "kuning": "#FFC94D",
    "hijau": "#2FBF71",
    "biru": "#4DA6FF",
    "ungu": "#8B6FE0",
}

_pyto_state = {"x": 0.0, "y": 0.0, "arah": 0.0, "pena_turun": True, "warna": "hitam", "tebal": 2}

def bersihkan():
    _pyto_state.update({"x": 0.0, "y": 0.0, "arah": 0.0, "pena_turun": True, "warna": "hitam", "tebal": 2})
    _pyto_kanvas_bersihkan()

def maju(langkah):
    _rad = _pyto_math.radians(_pyto_state["arah"])
    _x_baru = _pyto_state["x"] + langkah * _pyto_math.cos(_rad)
    _y_baru = _pyto_state["y"] + langkah * _pyto_math.sin(_rad)
    if _pyto_state["pena_turun"]:
        _warna_hex = _pyto_warna_palet.get(_pyto_state["warna"], "#1E2A32")
        _pyto_kanvas_garis(_pyto_state["x"], _pyto_state["y"], _x_baru, _y_baru, _warna_hex, _pyto_state["tebal"])
    _pyto_state["x"] = _x_baru
    _pyto_state["y"] = _y_baru

def mundur(langkah):
    maju(-langkah)

def belok_kanan(derajat):
    _pyto_state["arah"] = (_pyto_state["arah"] - derajat) % 360

def belok_kiri(derajat):
    _pyto_state["arah"] = (_pyto_state["arah"] + derajat) % 360

def arah_ke(derajat):
    _pyto_state["arah"] = derajat % 360

def mulai_dari(x, y):
    _pyto_state["x"] = float(x)
    _pyto_state["y"] = float(y)

def angkat_pena():
    _pyto_state["pena_turun"] = False

def turun_pena():
    _pyto_state["pena_turun"] = True

def warna_pena(nama_warna):
    if nama_warna in _pyto_warna_palet:
        _pyto_state["warna"] = nama_warna
    else:
        print(f"Pyto belum kenal warna '{nama_warna}', dipakai warna sebelumnya saja ya.")

def tebal_pena(angka):
    _pyto_state["tebal"] = max(1, min(12, angka))

def posisi_sekarang():
    return (_pyto_state["x"], _pyto_state["y"])

def arah_sekarang():
    return _pyto_state["arah"]
`;

// Menjalankan kode Python bab "Seniman Digital" (menggambar) yang memanggil
// maju()/mundur()/belok_kanan()/dst. — semuanya sudah didefinisikan lewat
// KANVAS_AJAIB_PREAMBLE di atas, tanpa perlu `import` apa pun dari kode
// pembaca. `canvasElement` adalah elemen <canvas width="400" height="400">
// sungguhan; origin (0,0) ada di TENGAH kanvas dan sumbu-Y dibalik (atas =
// y positif) — lihat "Ringkasan Kontrak API" di plan/design/bab-17-desain.md.
//
// Kanvas + state Pyto WAJIB direset (bersihkan()) SETIAP kali fungsi ini
// dipanggil, SEBELUM kode pembaca dijalankan — supaya tiap klik ▶ Jalankan
// idempoten (kode yang sama selalu menghasilkan gambar yang sama persis,
// tidak menumpuk sisa gambar dari percobaan sebelumnya). Gambarnya muncul
// SEKALIGUS begitu runPythonAsync(code) selesai — TIDAK dianimasikan
// langkah demi langkah (lihat "Keputusan Desain Kunci" poin 4 di
// plan/design/bab-17-desain.md), itu pilihan sengaja, bukan keterbatasan.
export async function runDrawingWorkbench(code, canvasElement) {
  const pyodide = await getPyodide();
  const ctx = canvasElement.getContext('2d');
  const half = DRAWING_CANVAS_SIZE / 2;

  function toScreen(x, y) {
    return [half + x, half - y];
  }

  pyodide.globals.set('_pyto_kanvas_garis', (x0, y0, x1, y1, warnaHex, tebal) => {
    const [sx0, sy0] = toScreen(x0, y0);
    const [sx1, sy1] = toScreen(x1, y1);
    ctx.strokeStyle = warnaHex;
    ctx.lineWidth = tebal;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(sx0, sy0);
    ctx.lineTo(sx1, sy1);
    ctx.stroke();
  });

  pyodide.globals.set('_pyto_kanvas_bersihkan', () => {
    ctx.fillStyle = '#FFFFFF'; // kanvas = "kertas gambar" putih, beda dari latar --cloud di sekitarnya
    ctx.fillRect(0, 0, DRAWING_CANVAS_SIZE, DRAWING_CANVAS_SIZE);
  });

  let output = '';
  pyodide.setStdout({
    batched: (s) => {
      output += s + '\n';
    },
  });
  pyodide.setStderr({
    batched: (s) => {
      output += s + '\n';
    },
  });

  await pyodide.runPythonAsync(KANVAS_AJAIB_PREAMBLE);
  await pyodide.runPythonAsync('bersihkan()');
  await pyodide.runPythonAsync(code);

  return { output: output.replace(/\n$/, '') };
}

export function friendlyError(err) {
  const message = err instanceof Error ? err.message : String(err);
  if (message.includes('Failed to fetch')) {
    return NETWORK_FAILURE_MESSAGE;
  }
  // Ambil baris terakhir yang biasanya berisi jenis error Python (mis. "NameError: ...")
  const lines = message.trim().split('\n');
  return lines[lines.length - 1] || message;
}
