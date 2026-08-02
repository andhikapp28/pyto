# 🐍 Belajar Python Bareng Pyto

Tutorial bahasa pemrograman **Python** yang dibuat menyenangkan dan mudah dipahami — cocok untuk **anak-anak, remaja, maupun dewasa non-IT**. Ditemani maskot **Pyto**, si robot ular yang ramah.

Materi ini tersedia dalam tiga bentuk dari satu sumber naskah yang sama:

- 📖 **Buku** — PDF per bab, bisa dibaca digital atau dicetak.
- 🌐 **Web interaktif** — belajar sambil mencoba kode langsung di browser.
- 📱 **Konten pendek** — kartu bite-sized untuk media sosial.

---

## 🎯 Tujuan

Membuat Python terasa **menyenangkan dan tidak menakutkan**. Fokus pada kesederhanaan: satu konsep per bab, banyak analogi dunia nyata, dan langsung dipraktikkan.

## 👥 Untuk Siapa

Siapa pun yang belum pernah ngoding — dari anak SD sampai orang dewasa yang penasaran. Materi disusun berlapis: penjelasan inti untuk semua, kotak "Main Yuk" untuk anak, dan kotak "Tahu Lebih" untuk yang ingin mendalami.

---

## 📁 Struktur Repo

```
.
├── code/        # Skrip referensi Python tiap bab (dijalankan & diverifikasi)
├── web/         # Website interaktif (Astro + Pyodide)
│   └── src/
│       ├── pages/bab/   # Halaman tiap bab (1.astro, 2.astro, ...)
│       ├── components/  # Komponen ilustrasi & interaktif per bab
│       └── data/        # chapters.js & fase2.js (sumber judul/status bab)
├── docs/        # Dokumentasi PDF
├── buku/        # Output PDF per bab (belum digenerate)
├── konten/      # Kartu konten pendek untuk media sosial (belum digenerate)
└── assets/      # Gambar bersama: maskot Pyto, ilustrasi, ikon
```

> Catatan: folder **`plan/`** (dokumen kerja: rencana, design system, naskah, catatan animasi) sengaja **tidak diupload** ke GitHub — hanya ada di komputer pengembang.

Alur kerja: tulis naskah di **`plan/naskah/`** → implementasikan jadi halaman di **`web/`** (dengan skrip referensi di **`code/`**) → nanti diturunkan juga ke **`buku/`** dan **`konten/`**. Semua mengikuti warna & gaya di `plan/design-system.md`.

Web dibangun pakai [Astro](https://astro.build) dan menjalankan Python langsung di browser lewat [Pyodide](https://pyodide.org) — jadi pembaca bisa coba-coba kode tanpa install apa pun.

---

## 📚 Daftar Bab

**Fase 1 — Python Dasar (Bab 1-10)** ✅ Selesai

1. Kenalan dengan Python
2. Menyapa Dunia (`print`)
3. Kotak Ajaib (Variabel)
4. Ngobrol dengan Komputer (`input`)
5. Angka & Hitung-hitungan
6. Kalau Begini, Maka Begitu (`if`)
7. Ulang-ulang (Loop)
8. Kumpulan Barang (List sederhana)
9. Salah itu Wajar (Error & memperbaiki)
10. Proyek Seru (Tebak Angka, Kuis, Kalkulator)

**Fase 2 — Python Lanjutan (Bab 11-20)** ✅ Selesai

11. Kamus / Kotak Berlabel (Dictionary) ✅
12. Data dari Internet (API & JSON) ✅
13. Bengkel Foto Mini (Olah Gambar) ✅
14. Bikin Barcode Ajaib (QR Code) ✅
15. Asisten Kantor Kilat (Excel & PDF Sederhana) ✅
16. Agen Rahasia Pyto (Kode Rahasia & Keamanan Kata Sandi) ✅
17. Seniman Digital (Menggambar dengan Kode) ✅
18. Detektif Teks (Pengenalan Pola / Regex) ✅
19. Proyek Level Up (Game Teks) ✅
20. Kalkulator Keuangan Mini (Capstone) ✅

---

## 🚀 Cara Menjalankan Web

```bash
cd web
npm install
npm run dev
# buka http://localhost:4321 di browser
```

Untuk build produksi (hasil statis di `web/dist/`):

```bash
npm run build
npm run preview
```

---

## 📄 Lisensi

- **Materi/naskah** (teks, ilustrasi): [CC BY-SA 4.0](LICENSE) — bebas dibagikan & diadaptasi dengan atribusi.
- **Kode** (web, skrip): MIT.

Lihat berkas [`LICENSE`](LICENSE) untuk detail.

---

*Dibuat dengan semangat membuat coding bisa dinikmati semua orang.* 🐍✨
