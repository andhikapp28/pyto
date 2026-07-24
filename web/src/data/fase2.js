// Kurikulum Fase 2 ("Python Lanjutan") — Bab 11-20. Sumber: plan/Fase2/plan.md
// (draf kurikulum, riset lengkap di plan/Fase2/riset-topik-fase2.md).
//
// Bab 11-13 sekarang sudah punya halaman sungguhan (`live: true`) — lihat
// AVAILABLE_CHAPTERS di chapters.js dan src/pages/bab/11.astro, 12.astro,
// 13.astro. Bab 14-20 masih pengumuman "Segera Hadir" saja: belum ada
// halaman bab sungguhan, jangan tambahkan ke AVAILABLE_CHAPTERS atau bikin
// route /bab/14/ dst. sebelum naskah + implementasinya benar-benar ada.
// Ini tetap satu-satunya sumber judul/blurb untuk seluruh Bab 11-20 — dipakai
// bareng oleh chapters.js, Fase2Teaser.astro, dan halaman /fase2/.

export const fase2Meta = {
  label: 'Fase 2',
  name: 'Python Lanjutan',
  tagline: 'Bikin Sesuatu yang Beneran Dipakai',
  count: 10,
};

export const fase2Chapters = [
  {
    number: 11,
    emoji: '🗂️',
    title: 'Kamus / Kotak Berlabel',
    short: 'Dictionary',
    blurb:
      'Kalau List itu rak dengan nomor urut, Dictionary itu lemari dengan LABEL di tiap laci — tinggal panggil namanya.',
    group: 'pembuka',
    live: true,
  },
  {
    number: 12,
    emoji: '🌐',
    title: 'Data dari Internet',
    short: 'API & JSON',
    blurb:
      'Belajar "ngobrol" sopan dengan layanan online gratis — ambil data cuaca, kutipan, sampai foto hewan asli.',
    group: 'pembuka',
    live: true,
  },
  {
    number: 13,
    emoji: '🖼️',
    title: 'Bengkel Foto Mini',
    short: 'Olah Gambar',
    blurb:
      'Upload foto sendiri, lalu resize, kasih watermark, ubah hitam-putih, atau gabung jadi kolase.',
    group: 'pembuka',
    live: true,
  },
  {
    number: 14,
    emoji: '📱',
    title: 'Bikin Barcode Ajaib',
    short: 'QR Code',
    blurb:
      'Bikin kode kotak-kotak yang bisa langsung dipindai kamera HP sungguhan — coba deh nanti!',
    group: 'pembuka',
  },
  {
    number: 15,
    emoji: '📊',
    title: 'Asisten Kantor Kilat',
    short: 'Excel & PDF Sederhana',
    blurb:
      'Ajari Pyto sekali, biar dia yang merapikan file Excel/PDF-mu seterusnya — bukan copy-paste manual lagi.',
    group: 'pembuka',
  },
  {
    number: 16,
    emoji: '🕵️',
    title: 'Agen Rahasia Pyto',
    short: 'Kode Rahasia & Keamanan Kata Sandi',
    blurb:
      'Bikin & pecahkan sandi rahasia ala agen rahasia, sekalian belajar kenapa password "123456" itu ide buruk.',
    group: 'susulan',
  },
  {
    number: 17,
    emoji: '🎨',
    title: 'Seniman Digital',
    short: 'Menggambar dengan Kode',
    blurb:
      'Geser sedikit, putar, ulangi — pola loop yang tiba-tiba jadi mandala dan kembang api penuh warna.',
    group: 'susulan',
  },
  {
    number: 18,
    emoji: '🔍',
    title: 'Detektif Teks',
    short: 'Pengenalan Pola / Regex',
    blurb:
      'Kacamata detektif Pyto: temukan semua email atau nomor HP yang tersembunyi di tumpukan teks.',
    group: 'susulan',
  },
  {
    number: 19,
    emoji: '🎮',
    title: 'Proyek Level Up',
    short: 'Game Teks',
    blurb:
      'Hangman, Tebak Kata, atau Batu-Gunting-Kertas dengan skor — gabungan semua alat barumu, siap dimainkan bareng teman.',
    group: 'susulan',
  },
  {
    number: 20,
    emoji: '💰',
    title: 'Kalkulator Keuangan Mini',
    short: 'Capstone',
    blurb:
      'Uang jajanmu ke mana aja perginya bulan ini? Bikin pencatat kas sendiri, lengkap dengan grafiknya.',
    group: 'susulan',
  },
];
