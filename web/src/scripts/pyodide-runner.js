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

export function friendlyError(err) {
  const message = err instanceof Error ? err.message : String(err);
  // Ambil baris terakhir yang biasanya berisi jenis error Python (mis. "NameError: ...")
  const lines = message.trim().split('\n');
  return lines[lines.length - 1] || message;
}
