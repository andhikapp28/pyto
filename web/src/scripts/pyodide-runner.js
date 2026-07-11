// Logika bersama untuk memuat & menjalankan Pyodide (Python asli di
// browser). Diekstrak dari EditorSection.astro supaya bisa dipakai ulang
// oleh editor latihan di halaman bab (PracticeEditor.astro) tanpa duplikasi.
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

export function friendlyError(err) {
  const message = err instanceof Error ? err.message : String(err);
  // Ambil baris terakhir yang biasanya berisi jenis error Python (mis. "NameError: ...")
  const lines = message.trim().split('\n');
  return lines[lines.length - 1] || message;
}
