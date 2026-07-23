// Kurikulum 10 bab (lihat plan/plan.md). Dipakai sebagai sumber tunggal untuk
// sidebar/topbar di ChapterLayout, supaya Bab 2-10 nanti tinggal menambah
// halaman tanpa perlu menulis ulang daftar bab.
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
];

// Seluruh 10 bab kurikulum dasar sudah punya halaman sungguhan.
export const AVAILABLE_CHAPTERS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

export function isChapterAvailable(number) {
  return AVAILABLE_CHAPTERS.includes(number);
}
