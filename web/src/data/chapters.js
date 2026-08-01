// Kurikulum 10 bab (lihat plan/plan.md). Dipakai sebagai sumber tunggal untuk
// sidebar/topbar di ChapterLayout, supaya Bab 2-10 nanti tinggal menambah
// halaman tanpa perlu menulis ulang daftar bab.
//
// Bab 11-20 (Fase 2 — Python Lanjutan) juga didaftarkan di sini supaya
// penomoran beranda/sidebar tetap lengkap 1-20 — judulnya diambil apa
// adanya dari `data/fase2.js` (satu sumber, jangan diketik ulang beda kata).
// Bab 11-20 sekarang SEMUANYA sudah punya halaman sungguhan (lihat
// AVAILABLE_CHAPTERS) -- Fase 2 selesai.
import { fase2Chapters } from './fase2.js';

export const chapters = [
  { number: 1, title: 'Kenalan dengan Python' },
  { number: 2, title: 'Menyapa Dunia (print)' },
  { number: 3, title: 'Kotak Ajaib (Variabel)' },
  { number: 4, title: 'Ngobrol dengan Komputer (input)' },
  { number: 5, title: 'Angka & Hitung-hitungan' },
  { number: 6, title: 'Kalau Begini Maka Begitu (if)' },
  { number: 7, title: 'Ulang-ulang (Loop)' },
  { number: 8, title: 'Kumpulan Barang (List sederhana)' },
  { number: 9, title: 'Salah itu Wajar (Error)' },
  { number: 10, title: 'Proyek Seru' },
  ...fase2Chapters.map((c) => ({ number: c.number, title: c.title })),
];

// Fase 1 (Bab 1-10) dan Fase 2 (Bab 11-20) sudah lengkap.
export const AVAILABLE_CHAPTERS = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
];

export function isChapterAvailable(number) {
  return AVAILABLE_CHAPTERS.includes(number);
}
