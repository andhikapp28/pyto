// Web Worker yang benar-benar menjalankan Pyodide (Python asli di browser).
//
// KENAPA WORKER: sebelum ini, Pyodide dijalankan langsung di main thread
// (lihat riwayat git pyodide-runner.js) — sengaja, demi kesederhanaan, tapi
// itu berarti kode Python yang nyangkut di loop tak berhenti (mis. `while
// True: pass`, atau starter code Bab 10/19 yang lupa mengubah kondisi loop)
// MEMBEKUKAN SELURUH TAB: semua JS, semua editor lain di halaman, bahkan
// scroll — karena satu-satunya thread JS di tab itu terus-menerus sibuk
// menjalankan interpreter WASM, tak pernah kembali ke event loop browser.
//
// Situs ini di-deploy sebagai GitHub Pages *static* site (lihat
// astro.config.mjs) — GitHub Pages TIDAK mengizinkan kita mengatur header
// respons kustom (Cross-Origin-Opener-Policy / Cross-Origin-Embedder-Policy),
// jadi `SharedArrayBuffer` (dan lewat itu `pyodide.setInterruptBuffer()` yang
// dipakai demo resmi Pyodide untuk interrupt "halus" bergaya KeyboardInterrupt
// dari main thread) TIDAK tersedia di produksi. Itu jalan "terbaik" versi
// Pyodide sendiri, tapi tidak viable di sini.
//
// Solusinya: pindahkan seluruh eksekusi Pyodide ke Worker terpisah ini, lalu
// dari main thread (pyodide-runner.js) pakai `Worker.terminate()` sebagai
// tombol darurat. `terminate()` TIDAK butuh SharedArrayBuffer maupun header
// cross-origin-isolation apa pun — browser boleh mematikan sebuah Worker
// kapan saja, bahkan saat lagi sibuk jalanin loop tak berhenti di WASM,
// karena Worker punya thread sendiri yang terpisah dari main thread. Main
// thread (jadi seluruh UI halaman) TETAP RESPONSIF selama itu. Konsekuensi:
// begitu di-terminate, RUNTIME Pyodide yang sedang berjalan hilang total
// (tidak bisa "dilanjutkan" dengan lembut seperti KeyboardInterrupt asli) —
// pyodide-runner.js menangani ini dengan membuat Worker + runtime Pyodide
// BARU dari nol untuk eksekusi berikutnya (lihat stopPython()). Kode yang
// SEDANG DIKETIK pembaca di kotak kode aman, karena itu cuma teks di
// <textarea> milik main thread, tidak pernah ikut dimatikan.
//
// Pola komunikasi: RPC sederhana lewat postMessage. Pesan masuk dari main
// thread berbentuk { id, type, payload }; balasan dari worker berbentuk
// { type: 'result'|'error', id, ... } untuk satu kali balasan, atau
// { type: 'output'|'input-request', id, ... } untuk event yang bisa
// terjadi berkali-kali SELAMA satu pemanggilan (dipakai jembatan input()
// interaktif, Bab 4 — lihat handleRunPythonInteractive di bawah).
//
// CATATAN DUPLIKASI YANG DISENGAJA: beberapa konstanta (versi Pyodide,
// preamble Kanvas Ajaib Bab 17, setup input() Bab 4) SENGAJA disalin di
// sini alih-alih di-`import` dari pyodide-runner.js. Worker klasik (bukan
// `type: 'module'`) tidak punya `import`, dan `importScripts()` sinkron
// jauh lebih sederhana & terbukti (persis seperti cara main thread memuat
// pyodide.js sebelumnya) daripada bikin Worker modul + file konstanta
// bersama. Kalau salah satu preamble ini diubah, in sync-kan manual dengan
// pyodide-runner.js (komentar silang ditinggalkan di kedua sisi).

const PYODIDE_VERSION = '0.26.4';
const PYODIDE_CDN = `https://cdn.jsdelivr.net/pyodide/v${PYODIDE_VERSION}/full/`;
const DRAWING_CANVAS_SIZE = 400; // HARUS sama dengan DRAWING_CANVAS_SIZE di pyodide-runner.js

let pyodide = null;
let pyodideReadyPromise = null;

function ensurePyodide() {
  if (!pyodideReadyPromise) {
    pyodideReadyPromise = (async () => {
      importScripts(`${PYODIDE_CDN}pyodide.js`);
      pyodide = await loadPyodide({ indexURL: PYODIDE_CDN });
      return pyodide;
    })();
  }
  return pyodideReadyPromise;
}

let pillowReadyPromise = null;
async function ensurePillow() {
  const py = await ensurePyodide();
  if (!pillowReadyPromise) {
    pillowReadyPromise = py.loadPackage('Pillow');
  }
  await pillowReadyPromise;
  return py;
}

let micropipInstallerPromise = null;
async function getMicropip(py) {
  if (!micropipInstallerPromise) {
    micropipInstallerPromise = (async () => {
      await py.loadPackage('micropip');
      return py.pyimport('micropip');
    })();
  }
  return micropipInstallerPromise;
}

const micropipPackagePromises = {};
async function ensurePackageViaMicropip(packageName) {
  const py = await ensurePyodide();
  if (!micropipPackagePromises[packageName]) {
    micropipPackagePromises[packageName] = (async () => {
      const micropip = await getMicropip(py);
      await micropip.install(packageName);
    })();
  }
  await micropipPackagePromises[packageName];
  return py;
}

// -- Bab 20 — matplotlib: paket berat (tersendiri dari Pillow/micropip di
// atas), backend WAJIB dipaksa ke "Agg" (render-ke-memori, non-GUI) SEBELUM
// pyplot pernah di-import di seluruh sesi Worker ini — lihat komentar
// panjang di handleRunPythonInteractiveWithChart soal kenapa. Sinkron
// dengan MATPLOTLIB_LOADING_MESSAGE/isFirstMatplotlibLoad/ensureMatplotlib
// di pyodide-runner.js (di sana cuma cache+proksi RPC ke 'ensureMatplotlib'
// yang menjalankan fungsi ini). --
let matplotlibReadyPromise = null;
async function ensureMatplotlib() {
  const py = await ensurePyodide();
  if (!matplotlibReadyPromise) {
    matplotlibReadyPromise = (async () => {
      await py.loadPackage('matplotlib');
      await py.runPythonAsync('import matplotlib\nmatplotlib.use("Agg")');
    })();
  }
  await matplotlibReadyPromise;
  return py;
}

// -- Bab 4: input() sungguhan lewat Promise yang ditahan sampai jawaban
// pembaca dikirim dari main thread. Sama persis logikanya dengan versi
// main-thread lama, cuma Promise-nya sekarang diselesaikan oleh pesan
// 'input-response' alih-alih dipanggil langsung dari callback JS.
//
// PENTING kenapa dibungkus kurung, bukan sekadar ditempeli "await " di
// depan: kode pemula di buku ini sering merangkai method langsung ke hasil
// input(), mis. `input("Tebak satu huruf: ").lower()` (Bab 19/20). Kalau
// cuma menyisipkan "await " tanpa kurung pembungkus, hasilnya
// `await input(...).lower()` — secara precedence Python itu berarti
// `await (input(...).lower())`, sehingga `.lower()` dipanggil DULU di atas
// objek coroutine yang belum di-await, meledak jadi
// `AttributeError: 'coroutine' object has no attribute 'lower'`. Membungkus
// jadi `(await input(...)).lower()` memastikan `await` selesai dulu SEBELUM
// method apa pun di belakangnya dipanggil.
//
// Implementasi memindai teks secara sadar-sintaks (bukan regex polos):
// melompati string literal (single/double/triple-quote, escape backslash)
// dan komentar `#...` supaya teks "input(" yang kebetulan muncul di dalam
// string/komentar TIDAK ikut diubah, dan supaya tanda kurung di dalam isi
// prompt (mis. `input("Umur (tahun): ")`) tidak mengacaukan pencarian
// kurung tutup yang benar-benar jadi pasangan `input(`.
function addAwaitBeforeInput(code) {
  const n = code.length;
  const isIdentChar = (ch) => ch !== undefined && /[A-Za-z0-9_]/.test(ch);

  function skipStringAt(start) {
    const quote = code[start];
    const triple = code.slice(start, start + 3) === quote.repeat(3);
    const q = triple ? quote.repeat(3) : quote;
    let j = start + q.length;
    while (j < n) {
      if (code[j] === '\\') {
        j += 2;
        continue;
      }
      if (code.slice(j, j + q.length) === q) {
        return j + q.length;
      }
      j++;
    }
    return n;
  }

  function findMatchingParen(openIdx) {
    let depth = 0;
    let j = openIdx;
    while (j < n) {
      const c = code[j];
      if (c === '"' || c === "'") {
        j = skipStringAt(j);
        continue;
      }
      if (c === '#') {
        const nl = code.indexOf('\n', j);
        j = nl === -1 ? n : nl;
        continue;
      }
      if (c === '(') {
        depth++;
      } else if (c === ')') {
        depth--;
        if (depth === 0) return j;
      }
      j++;
    }
    return n - 1;
  }

  let out = '';
  let i = 0;
  while (i < n) {
    const ch = code[i];

    if (ch === '"' || ch === "'") {
      const end = skipStringAt(i);
      out += code.slice(i, end);
      i = end;
      continue;
    }

    if (ch === '#') {
      const nl = code.indexOf('\n', i);
      const end = nl === -1 ? n : nl;
      out += code.slice(i, end);
      i = end;
      continue;
    }

    if (code.slice(i, i + 5) === 'input' && !isIdentChar(code[i - 1]) && !isIdentChar(code[i + 5])) {
      let k = i + 5;
      while (k < n && /\s/.test(code[k])) k++;
      if (code[k] === '(') {
        const alreadyAwaited = /\bawait\s*$/.test(out);
        const closeIdx = findMatchingParen(k);
        if (alreadyAwaited) {
          out += code.slice(i, closeIdx + 1);
        } else {
          out += '(await ' + code.slice(i, closeIdx + 1) + ')';
        }
        i = closeIdx + 1;
        continue;
      }
    }

    out += ch;
    i++;
  }

  return out;
}

const INTERACTIVE_INPUT_SETUP = `
async def input(prompt=""):
    return await __pyto_request_input(prompt)
`;

const pendingInputResolvers = new Map(); // requestId -> resolve(value)

async function handleRunPython(payload) {
  const py = await ensurePyodide();
  let output = '';
  py.setStdout({ batched: (s) => (output += s + '\n') });
  py.setStderr({ batched: (s) => (output += s + '\n') });
  await py.runPythonAsync(payload.code);
  return { output: output.replace(/\n$/, '') };
}

async function handleRunPythonInteractive(id, payload) {
  const py = await ensurePyodide();
  py.setStdout({ batched: (s) => postMessage({ type: 'output', id, text: s }) });
  py.setStderr({ batched: (s) => postMessage({ type: 'output', id, text: s }) });

  py.globals.set('__pyto_request_input', (prompt) => {
    const promptText = prompt == null ? '' : String(prompt);
    return new Promise((resolve) => {
      pendingInputResolvers.set(id, resolve);
      postMessage({ type: 'input-request', id, prompt: promptText });
    });
  });

  const transformed = addAwaitBeforeInput(payload.code);
  await py.runPythonAsync(`${INTERACTIVE_INPUT_SETUP}\n${transformed}`);
  return {};
}

// -- Bab 13/14/15: jembatan Upload/Jalankan/Unduh, dipindah verbatim dari
// pyodide-runner.js (readWorkbenchResult + run*Workbench) — logikanya
// TIDAK berubah sama sekali, cuma sekarang tinggal di worker. --
async function readWorkbenchResult(py, outputVarName) {
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
  await py.runPythonAsync(readResultCode);
  const resultBase64 = py.globals.get('_pyto_result_b64') ?? null;
  const resultKind = py.globals.get('_pyto_result_kind') ?? null;
  return { resultBase64, resultKind };
}

async function handleRunPhotoWorkbench(payload) {
  const { code, fileBase64, inputVarName = 'foto', outputVarName = 'hasil' } = payload;
  const py = await ensurePillow();

  let output = '';
  py.setStdout({ batched: (s) => (output += s + '\n') });
  py.setStderr({ batched: (s) => (output += s + '\n') });

  py.globals.set('_pyto_uploaded_b64', fileBase64);

  const setupCode = `
import base64 as _pyto_base64
import io as _pyto_io
from PIL import Image as _PytoImage
${inputVarName} = _PytoImage.open(_pyto_io.BytesIO(_pyto_base64.b64decode(_pyto_uploaded_b64)))
`;
  await py.runPythonAsync(setupCode);
  await py.runPythonAsync(code);

  const { resultBase64 } = await readWorkbenchResult(py, outputVarName);
  return { output: output.replace(/\n$/, ''), resultBase64 };
}

async function handleRunQrWorkbench(payload) {
  const {
    code,
    teksValue,
    teksVarName = 'teks_qr',
    logoFileBase64 = null,
    logoVarName = 'logo',
    outputVarName = 'hasil',
  } = payload;

  const py = await ensurePillow();
  await ensurePackageViaMicropip('qrcode');

  let output = '';
  py.setStdout({ batched: (s) => (output += s + '\n') });
  py.setStderr({ batched: (s) => (output += s + '\n') });

  py.globals.set(teksVarName, teksValue);

  if (logoFileBase64) {
    py.globals.set('_pyto_logo_b64', logoFileBase64);
    const logoSetupCode = `
import base64 as _pyto_base64
import io as _pyto_io
from PIL import Image as _PytoImage
${logoVarName} = _PytoImage.open(_pyto_io.BytesIO(_pyto_base64.b64decode(_pyto_logo_b64)))
`;
    await py.runPythonAsync(logoSetupCode);
  }

  await py.runPythonAsync(code);

  const { resultBase64 } = await readWorkbenchResult(py, outputVarName);
  return { output: output.replace(/\n$/, ''), resultBase64 };
}

async function handleRunFileWorkbench(payload) {
  const {
    code,
    fileBase64,
    inputVarName = 'berkas_excel',
    inputMode = 'bytesio',
    outputVarName = 'hasil',
    outputKind = 'bytes',
    packages = [],
  } = payload;

  const needsPillow = inputMode === 'image' || outputKind === 'image';
  const py = needsPillow ? await ensurePillow() : await ensurePyodide();

  for (const packageName of packages) {
    await ensurePackageViaMicropip(packageName);
  }

  let output = '';
  py.setStdout({ batched: (s) => (output += s + '\n') });
  py.setStderr({ batched: (s) => (output += s + '\n') });

  if (fileBase64 != null) {
    py.globals.set('_pyto_uploaded_b64', fileBase64);
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
    await py.runPythonAsync(setupCode);
  }

  await py.runPythonAsync(code);

  if (outputKind === 'none') {
    return { output: output.replace(/\n$/, ''), resultBase64: null, resultKind: null };
  }

  const { resultBase64, resultKind } = await readWorkbenchResult(py, outputVarName);
  return { output: output.replace(/\n$/, ''), resultBase64, resultKind };
}

// -- Bab 17: jembatan kanvas gambar sinkron. Ini bridge yang paling rawan
// dipindah ke Worker (Worker tak bisa sentuh DOM langsung) — solusinya
// SENGAJA BUKAN `canvasElement.transferControlToOffscreen()` (yang hanya
// bisa dipanggil SEKALI SEUMUR HIDUP per elemen <canvas> — begitu dipakai,
// tak bisa "dikembalikan" ke main thread; kalau Worker itu nanti di-
// terminate() lewat tombol Stop, <canvas> asli akan rusak permanen selamanya
// karena Worker barunya tidak mewarisi transfer itu). Sebagai gantinya kita
// pakai `new OffscreenCanvas(...)` yang BERDIRI SENDIRI (tidak terikat ke
// elemen <canvas> DOM manapun): worker menggambar ke situ (SINKRON, tanpa
// perlu postMessage per garis — maju()/mundur() tetap secepat sebelumnya),
// lalu di akhir mengambil hasilnya sebagai satu ImageBitmap (transferable,
// murah) yang dikirim balik ke main thread, yang menggambarnya SEKALI ke
// <canvas> asli lewat ctx.drawImage(). <canvas> DOM asli TIDAK PERNAH
// disentuh dari sini, jadi toDataURL() (dipakai tombol unduh) & isi kanvas
// awal (dicat putih di DrawingWorkbenchEditor.astro) tetap 100% seperti
// semula — dan kalau Worker di-terminate lalu dibuat ulang, worker baru
// tinggal bikin OffscreenCanvas baru lagi, tidak ada apa pun yang rusak
// permanen. Lihat plan/Fase2/design/bab-17-desain.md untuk kontrak API lengkap.
const KANVAS_AJAIB_PREAMBLE = `
import math as _pyto_math

_pyto_warna_palet = {
    "hitam": "#1E2A32",
    "putih": "#FFFFFF",
    "merah": "#FF7A6B",
    "kuning": "#FFC94D",
    "hijau": "#218650",
    "biru": "#0073E7",
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

let drawingCanvas = null;
let drawingCtx = null;

function getDrawingCtx() {
  if (typeof OffscreenCanvas === 'undefined') {
    throw new Error(
      'Kanvas ajaib butuh fitur OffscreenCanvas yang belum didukung browser ini — coba pakai browser yang lebih baru, ya.'
    );
  }
  if (!drawingCanvas) {
    drawingCanvas = new OffscreenCanvas(DRAWING_CANVAS_SIZE, DRAWING_CANVAS_SIZE);
    drawingCtx = drawingCanvas.getContext('2d');
  }
  return drawingCtx;
}

async function handleRunDrawingWorkbench(payload) {
  const py = await ensurePyodide();
  const ctx = getDrawingCtx();
  const half = DRAWING_CANVAS_SIZE / 2;

  function toScreen(x, y) {
    return [half + x, half - y];
  }

  py.globals.set('_pyto_kanvas_garis', (x0, y0, x1, y1, warnaHex, tebal) => {
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

  py.globals.set('_pyto_kanvas_bersihkan', () => {
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, DRAWING_CANVAS_SIZE, DRAWING_CANVAS_SIZE);
  });

  let output = '';
  py.setStdout({ batched: (s) => (output += s + '\n') });
  py.setStderr({ batched: (s) => (output += s + '\n') });

  await py.runPythonAsync(KANVAS_AJAIB_PREAMBLE);
  await py.runPythonAsync('bersihkan()');
  await py.runPythonAsync(payload.code);

  const bitmap = drawingCanvas.transferToImageBitmap();
  return { output: output.replace(/\n$/, ''), bitmap };
}

// -- Bab 20 — jembatan GABUNGAN: input() interaktif (pola Bab 4/16/18/19,
// pakai ulang addAwaitBeforeInput()/INTERACTIVE_INPUT_SETUP di atas -- jadi
// otomatis mewarisi perbaikan bug "(await input(...)).lower()" yang sama)
// + pembacaan-balik OTOMATIS figure matplotlib aktif di akhir eksekusi.
// BEDA dari readWorkbenchResult() (Bab 13-15): di sana bridge membaca SATU
// VARIABEL bernama `hasil` yang HARUS ditulis reader secara eksplisit. Di
// sini reader TIDAK PERNAH menulis nama variabel hasil sama sekali -- kode
// plotting matplotlib yang wajar (plt.bar()/plt.pie()) tidak pernah
// menugaskan hasilnya ke variabel apa pun, jadi figure yang AKTIF
// (plt.gcf(), dicek lewat plt.get_fignums()) diambil otomatis. Lihat
// plan/Fase2/design/bab-20-desain.md bagian "Bridge Baru" untuk kontrak lengkapnya
// -- dipindah ke Worker supaya konsisten dengan seluruh bridge lain (dan
// supaya loop tak berhenti di kode Bab 20 juga bisa dihentikan lewat tombol
// Stop, persis seperti bridge Bab 4/16/18/19).
async function handleRunPythonInteractiveWithChart(id, payload) {
  const py = await ensureMatplotlib();
  py.setStdout({ batched: (s) => postMessage({ type: 'output', id, text: s }) });
  py.setStderr({ batched: (s) => postMessage({ type: 'output', id, text: s }) });

  py.globals.set('__pyto_request_input', (prompt) => {
    const promptText = prompt == null ? '' : String(prompt);
    return new Promise((resolve) => {
      pendingInputResolvers.set(id, resolve);
      postMessage({ type: 'input-request', id, prompt: promptText });
    });
  });

  const transformed = addAwaitBeforeInput(payload.code);
  await py.runPythonAsync(`${INTERACTIVE_INPUT_SETUP}\n${transformed}`);

  const captureChartCode = `
import base64 as _pyto_base64
import io as _pyto_io
import matplotlib.pyplot as _pyto_plt

if _pyto_plt.get_fignums():
    _pyto_buf = _pyto_io.BytesIO()
    _pyto_plt.savefig(_pyto_buf, format="png", dpi=110, bbox_inches="tight")
    _pyto_chart_b64 = _pyto_base64.b64encode(_pyto_buf.getvalue()).decode("ascii")
    _pyto_plt.close("all")
else:
    _pyto_chart_b64 = None
`;
  await py.runPythonAsync(captureChartCode);
  const chartBase64 = py.globals.get('_pyto_chart_b64') ?? null;

  return { chartBase64 };
}

// -- Dispatcher RPC --
self.onmessage = async (event) => {
  const msg = event.data;
  if (!msg || typeof msg !== 'object') return;

  if (msg.type === 'input-response') {
    const resolve = pendingInputResolvers.get(msg.id);
    if (resolve) {
      pendingInputResolvers.delete(msg.id);
      resolve(msg.value);
    }
    return;
  }

  const { id, type, payload } = msg;
  try {
    switch (type) {
      case 'ensurePyodide':
        await ensurePyodide();
        postMessage({ type: 'result', id, payload: {} });
        break;
      case 'ensurePillow':
        await ensurePillow();
        postMessage({ type: 'result', id, payload: {} });
        break;
      case 'ensurePackage':
        await ensurePackageViaMicropip(payload.packageName);
        postMessage({ type: 'result', id, payload: {} });
        break;
      case 'ensureMatplotlib':
        await ensureMatplotlib();
        postMessage({ type: 'result', id, payload: {} });
        break;
      case 'runPython':
        postMessage({ type: 'result', id, payload: await handleRunPython(payload) });
        break;
      case 'runPythonInteractive':
        postMessage({ type: 'result', id, payload: await handleRunPythonInteractive(id, payload) });
        break;
      case 'runPythonInteractiveWithChart':
        postMessage({
          type: 'result',
          id,
          payload: await handleRunPythonInteractiveWithChart(id, payload),
        });
        break;
      case 'runPhotoWorkbench':
        postMessage({ type: 'result', id, payload: await handleRunPhotoWorkbench(payload) });
        break;
      case 'runQrWorkbench':
        postMessage({ type: 'result', id, payload: await handleRunQrWorkbench(payload) });
        break;
      case 'runFileWorkbench':
        postMessage({ type: 'result', id, payload: await handleRunFileWorkbench(payload) });
        break;
      case 'runDrawingWorkbench': {
        const { output, bitmap } = await handleRunDrawingWorkbench(payload);
        postMessage({ type: 'result', id, payload: { output, bitmap } }, [bitmap]);
        break;
      }
      default:
        throw new Error(`Pesan tak dikenal dikirim ke pyodide-worker: ${type}`);
    }
  } catch (err) {
    postMessage({ type: 'error', id, message: err && err.message ? err.message : String(err) });
  }
};
