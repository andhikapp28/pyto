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
├── docs/        # Dokumentasi PDF
├── code/        # Berkas kode Python (dipakai web & buku)
├── buku/        # Output PDF per bab
├── web/         # Website interaktif (HTML/CSS/JS)
│   ├── css/
│   ├── js/
│   ├── bab/     # Halaman tiap bab
│   └── assets/
├── konten/      # Kartu konten pendek untuk media sosial
└── assets/      # Gambar bersama: maskot Pyto, ilustrasi, ikon
```

> Catatan: folder **`plan/`** (dokumen kerja: rencana, design system, naskah, catatan animasi) sengaja **tidak diupload** ke GitHub — hanya ada di komputer pengembang.

Alur kerja: tulis naskah di **`plan/naskah/`** → hasilkan **`buku/`**, **`web/`**, dan **`konten/`**. Semua mengikuti warna & gaya di `plan/design-system.md`.

---

## 📚 Daftar Bab (Python Dasar)

1. Kenalan dengan Python ✅
2. Menyapa Dunia (`print`)✅
3. Kotak Ajaib (Variabel)✅
4. Ngobrol dengan Komputer (`input`)
5. Angka & Hitung-hitungan
6. Kalau Begini, Maka Begitu (`if`)
7. Ulang-ulang (Loop)
8. Kumpulan Barang (List sederhana)
9. Salah itu Wajar (Error & memperbaiki)
10. Proyek Seru (Tebak Angka, Kuis, Kalkulator)

---

## 🚀 Cara Menjalankan Web (nanti)

Web bersifat statis, tanpa perlu server khusus:

```bash
# buka folder web lalu jalankan server sederhana
cd web
python -m http.server 8000
# buka http://localhost:8000 di browser
```

---

## 📄 Lisensi

- **Materi/naskah** (teks, ilustrasi): [CC BY-SA 4.0](LICENSE) — bebas dibagikan & diadaptasi dengan atribusi.
- **Kode** (web, skrip): MIT.

Lihat berkas [`LICENSE`](LICENSE) untuk detail.

---

*Dibuat dengan semangat membuat coding bisa dinikmati semua orang.* 🐍✨
