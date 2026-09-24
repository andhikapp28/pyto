// Kurikulum Fase 1 ("Python Dasar") — Bab 1-10. Mirroring bentuk data/fase2.js
// supaya kedua fase bisa dirender lewat komponen kartu yang sama (lihat
// ChapterList.astro) dengan kesetaraan visual (emoji, judul, blurb singkat).
//
// Judul & urutan bab tetap bersumber dari data/chapters.js (dipakai juga oleh
// sidebar ChapterLayout) — jangan diketik ulang beda kata di sini, cukup
// tambahkan emoji/short/blurb untuk tampilan kartu beranda.
// Blurb di bawah dipindah apa adanya dari `descriptions` yang sebelumnya
// hidup di ChapterList.astro (bukan naskah baru).

export const fase1Meta = {
  label: 'Fase 1',
  name: 'Python Dasar',
  tagline: 'Dari Nol Sampai Bisa',
  count: 10,
};

export const fase1Chapters = [
  {
    number: 1,
    emoji: '👋',
    title: 'Kenalan dengan Python',
    short: 'Mulai Ngoding',
    blurb: 'Apa itu pemrograman, kenapa Python seru dan populer, serta cara menjalankan baris kodemu yang pertama.',
    live: true,
  },
  {
    number: 2,
    emoji: '🗣️',
    title: 'Halo Dunia: Perintah print()',
    short: 'print() & Teks',
    blurb: 'Menampilkan tulisan ke layar, tradisi legendaris "Hello, World!", dan menggabungkan teks dengan f-string.',
    live: true,
  },
  {
    number: 3,
    emoji: '📦',
    title: 'Variabel: Wadah Penyimpan Data',
    short: 'Variabel',
    blurb: 'Menyimpan angka, teks, dan data ke dalam variabel agar program bisa mengingat dan menggunakannya kapan saja.',
    live: true,
  },
  {
    number: 4,
    emoji: '💬',
    title: 'Program Interaktif dengan input()',
    short: 'input()',
    blurb: 'Perintah input() untuk membuat program yang bisa bertanya dan menerima ketikan jawaban pengguna.',
    live: true,
  },
  {
    number: 5,
    emoji: '🧮',
    title: 'Angka & Operasi Matematika',
    short: 'Angka & Operator',
    blurb: 'Mengolah angka bulat (int) dan desimal (float), memakai operator hitung, dan kalkulator Python.',
    live: true,
  },
  {
    number: 6,
    emoji: '🚦',
    title: 'Logika Keputusan (if, elif, else)',
    short: 'Percabangan if',
    blurb: 'Mengajari program mengambil keputusan sendiri berdasarkan kondisi benar atau salah (True/False).',
    live: true,
  },
  {
    number: 7,
    emoji: '🔁',
    title: 'Perulangan Otomatis (for & while)',
    short: 'Perulangan Loop',
    blurb: 'Menyuruh komputer melakukan tugas berulang ratusan kali secara instan tanpa lelah.',
    live: true,
  },
  {
    number: 8,
    emoji: '🧺',
    title: 'Daftar Data dengan list',
    short: 'list',
    blurb: 'Menyimpan banyak nilai dalam satu wadah list, mengakses nomor urut (indeks), dan mengolah data.',
    live: true,
  },
  {
    number: 9,
    emoji: '🩹',
    title: 'Mengenal Error & Debugging',
    short: 'Debugging',
    blurb: 'Membaca pesan traceback tanpa panik, mengenali jenis error umum, dan cara cepat memperbaikinya.',
    live: true,
  },
  {
    number: 10,
    emoji: '🎉',
    title: 'Mini Proyek: 3 Aplikasi Pertamamu',
    short: 'Mini Proyek',
    blurb: '3 mini-proyek seru: Tebak Angka, Kuis Pilihan Ganda, dan Kalkulator Interaktif.',
    live: true,
  },
];
