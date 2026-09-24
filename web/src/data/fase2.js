// Kurikulum Fase 2 ("Python Lanjutan") — Bab 11-20. Sumber: plan/Fase2/plan.md
// (draf kurikulum, riset lengkap di plan/Fase2/riset-topik-fase2.md).
//
// Bab 11-20 sekarang SEMUANYA sudah punya halaman sungguhan (`live: true`)
// — lihat AVAILABLE_CHAPTERS di chapters.js dan src/pages/bab/11.astro s.d.
// 20.astro. Fase 2 resmi selesai.
// Ini tetap satu-satunya sumber judul/blurb untuk seluruh Bab 11-20 — dipakai
// bareng oleh chapters.js, Fase2Teaser.astro, dan halaman /fase2/.

export const fase2Meta = {
  label: 'Fase 2',
  name: 'Python Lanjutan',
  tagline: 'Bikin Sesuatu yang Beneran Dipakai',
  count: 10,
  // Fase 2 punya halaman rincian sendiri (/fase2/) — Fase 1 tidak, jadi cuma
  // Fase 2 yang menampilkan tautan "rincian lengkap" di beranda (lihat
  // ChapterList.astro). Beri detailHref di sini (bukan di-hardcode di
  // komponen) supaya kalau Fase 3 nanti juga dapat halaman sendiri, tinggal
  // tambahkan field yang sama di fase3.js.
  detailHref: '/fase2/',
};

export const fase2Chapters = [
  {
    number: 11,
    emoji: '🗂️',
    title: 'Struktur Data Dictionary',
    short: 'dictionary',
    blurb:
      'Menyimpan data berpasangan kunci-nilai (key-value), mencari data lewat label secara instan, dan memakai method .get().',
    group: 'pembuka',
    live: true,
  },
  {
    number: 12,
    emoji: '🌐',
    title: 'Mengambil Data Internet (API & JSON)',
    short: 'API & Fungsi def',
    blurb:
      'Mengambil data cuaca gratis secara online via format JSON dan membungkus kode menjadi fungsi (def) buatan sendiri.',
    group: 'pembuka',
    live: true,
  },
  {
    number: 13,
    emoji: '🖼️',
    title: 'Olah Gambar dengan Pillow',
    short: 'Olah Gambar',
    blurb:
      'Upload foto sendiri, lalu resize, beri watermark teks otomatis, ubah hitam-putih, atau gabung jadi kolase.',
    group: 'pembuka',
    live: true,
  },
  {
    number: 14,
    emoji: '📱',
    title: 'Generator QR Code',
    short: 'QR Code',
    blurb:
      'Bikin kode QR yang bisa langsung dipindai kamera HP sungguhan untuk teks atau tautan website — coba deh!',
    group: 'pembuka',
    live: true,
  },
  {
    number: 15,
    emoji: '📊',
    title: 'Otomasi File Excel & PDF',
    short: 'Otomasi Dokumen',
    blurb:
      'Merapikan data ribuan baris Excel dengan openpyxl dan mengekstrak teks dari file PDF secara otomatis.',
    group: 'pembuka',
    live: true,
  },
  {
    number: 16,
    emoji: '🕵️',
    title: 'Kriptografi & Keamanan Sandi',
    short: 'Sandi & Enkripsi',
    blurb:
      'Bikin dan pecahkan sandi rahasia (Caesar cipher), sekalian uji ketahanan password dari serangan peretas.',
    group: 'susulan',
    live: true,
  },
  {
    number: 17,
    emoji: '🎨',
    title: 'Karya Visual dengan Kode (Turtle Graphics)',
    short: 'Grafika Kode',
    blurb:
      'Geser sedikit, putar, ulangi — pola perulangan matematika yang tiba-tiba melukis mandala dan kembang api penuh warna.',
    group: 'susulan',
    live: true,
  },
  {
    number: 18,
    emoji: '🔍',
    title: 'Pencarian Pola Teks (Regex)',
    short: 'Regex',
    blurb:
      'Gunakan modul re untuk menyaring alamat email, memeriksa nomor HP, dan menyamarkan data pribadi dari tumpukan teks.',
    group: 'susulan',
    live: true,
  },
  {
    number: 19,
    emoji: '🎮',
    title: 'Proyek Game Interaktif',
    short: 'Game Teks',
    blurb:
      'Bikin game Tebak Kata dan Batu-Gunting-Kertas lengkap dengan skor, validasi input, dan loop permainan siap tanding.',
    group: 'susulan',
    live: true,
  },
  {
    number: 20,
    emoji: '💰',
    title: 'Aplikasi Keuangan & Visualisasi Data',
    short: 'Capstone Proyek',
    blurb:
      'Pencatat arus kas pribadi lengkap dengan visualisasi grafik batang dan diagram lingkaran memakai matplotlib.',
    group: 'susulan',
    live: true,
  },
];
