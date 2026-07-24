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

  const readResultCode = `
import base64 as _pyto_base64
import io as _pyto_io
try:
    _pyto_hasil = ${outputVarName}
except NameError:
    _pyto_hasil = None
if _pyto_hasil is not None and hasattr(_pyto_hasil, "save"):
    _pyto_buf = _pyto_io.BytesIO()
    _pyto_hasil.save(_pyto_buf, format="PNG")
    _pyto_result_b64 = _pyto_base64.b64encode(_pyto_buf.getvalue()).decode("ascii")
else:
    _pyto_result_b64 = None
_pyto_result_b64
`;
  const resultBase64 = await pyodide.runPythonAsync(readResultCode);

  return { output: output.replace(/\n$/, ''), resultBase64: resultBase64 ?? null };
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
