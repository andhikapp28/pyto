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
    short: 'Ngoding itu Apa?',
    blurb: 'Apa itu ngoding, dan kenapa Python seru untuk dipelajari.',
    live: true,
  },
  {
    number: 2,
    emoji: '🗣️',
    title: 'Menyapa Dunia (print)',
    short: 'print()',
    blurb: 'Perintah print() dan cara komputer "berbicara".',
    live: true,
  },
  {
    number: 3,
    emoji: '📦',
    title: 'Kotak Ajaib (Variabel)',
    short: 'Variabel',
    blurb: 'Mengenal variabel, kotak ajaib penyimpan informasi.',
    live: true,
  },
  {
    number: 4,
    emoji: '💬',
    title: 'Ngobrol dengan Komputer (input)',
    short: 'input()',
    blurb: 'Perintah input() untuk membuat program interaktif.',
    live: true,
  },
  {
    number: 5,
    emoji: '🧮',
    title: 'Angka & Hitung-hitungan',
    short: 'Angka & Operator',
    blurb: 'Menjadikan Python sebagai kalkulator super.',
    live: true,
  },
  {
    number: 6,
    emoji: '🚦',
    title: 'Kalau Begini Maka Begitu (if)',
    short: 'if / else',
    blurb: 'if dan else, cara komputer mengambil keputusan.',
    live: true,
  },
  {
    number: 7,
    emoji: '🔁',
    title: 'Ulang-ulang (Loop)',
    short: 'for & while',
    blurb: 'for dan while, menyuruh komputer mengulang tanpa capek.',
    live: true,
  },
  {
    number: 8,
    emoji: '🧺',
    title: 'Kumpulan Barang (List sederhana)',
    short: 'List',
    blurb: 'Daftar teman, daftar belanja — kumpulan data dalam satu kotak.',
    live: true,
  },
  {
    number: 9,
    emoji: '🩹',
    title: 'Salah itu Wajar (Error)',
    short: 'Debugging',
    blurb: 'Cara membaca pesan error tanpa panik, lalu memperbaikinya.',
    live: true,
  },
  {
    number: 10,
    emoji: '🎉',
    title: 'Proyek Seru',
    short: 'Mini Project',
    blurb: '3 mini-project seru: Tebak Angka, Kuis, dan Kalkulator.',
    live: true,
  },
];
