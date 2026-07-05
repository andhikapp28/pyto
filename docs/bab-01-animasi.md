# Animasi untuk Bab 1 — Kenalan dengan Python

Panduan animasi yang cocok mengisi Bab 1 di web interaktif. Semua memakai warna dari `UI-Design-System-Web.md`. Prinsip: **animasi membantu memahami, bukan mengalihkan perhatian.** Halus, singkat, dan berhenti setelah selesai.

---

## 1. Pyto Melambai (Hero / Pembuka)
- **Di mana:** paling atas halaman, saat pembaca membuka Bab 1.
- **Gerakan:** maskot Pyto muncul dari bawah, lalu tangannya melambai 2x. Mata berkedip pelan.
- **Tujuan:** menyambut, langsung terasa ramah dan hidup.
- **Durasi:** ~1,5 detik, lalu diam (idle: berkedip tiap beberapa detik).

## 2. "Pembantu Ajaib" — Perintah → Aksi
- **Di mana:** bagian analogi pembantu ajaib.
- **Gerakan:** gelembung teks perintah ("Hitung 2+2") melayang dari anak → masuk ke robot → robot menampilkan hasil ("4"). Alur kiri ke kanan.
- **Tujuan:** menggambarkan inti coding = memberi perintah, dapat hasil.
- **Durasi:** ~2 detik, memutar sekali saat bagian ini muncul di layar.

## 3. Teks "Halo, dunia!" Diketik Sendiri (Typewriter)
- **Di mana:** contoh `print("Halo, dunia!")` pertama.
- **Gerakan:** hasilnya muncul huruf demi huruf seolah sedang diketik, dengan kursor berkedip.
- **Tujuan:** menyorot bahwa `print` "menuliskan" sesuatu ke layar.
- **Durasi:** ~1 detik.

## 4. Sorot Warna pada Kode (Highlight Masuk)
- **Di mana:** setiap blok kode.
- **Gerakan:** saat blok kode masuk ke layar, bagiannya menyala bergiliran — `print` (biru) lalu teks dalam kutip (hijau) — sekejap.
- **Tujuan:** mata pembaca diarahkan ke bagian penting kode.
- **Durasi:** ~0,8 detik, sekali.

## 5. Kartu "Main Yuk" Muncul (Pop-in)
- **Di mana:** kotak "Main Yuk — Tebak Perintah".
- **Gerakan:** kartu kuning memantul halus masuk (sedikit membesar lalu pas), ikon 🎮 bergoyang kecil.
- **Tujuan:** memberi kesan "ini bagian seru, ayo main".
- **Durasi:** ~0,6 detik.

## 6. Tombol Run Ditekan (Klik → Hasil)
- **Di mana:** ilustrasi cara menjalankan kode.
- **Gerakan:** kursor bergerak ke tombol hijau **Run**, tombol tertekan (mengkerut sedikit), lalu area hasil muncul dari bawah.
- **Tujuan:** mengajarkan alur nyata: tulis kode → klik Run → lihat hasil.
- **Durasi:** ~1,5 detik, bisa diulang saat di-hover.

## 7. Interpreter Membaca Baris-per-Baris (Tahu Lebih)
- **Di mana:** kotak "Tahu Lebih" tentang interpreter.
- **Gerakan:** garis sorot bergerak turun dari baris ke baris kode, seperti jari menelusuri resep. Tiap baris menyala saat "dibaca".
- **Tujuan:** memperjelas bahwa kode dijalankan berurutan dari atas ke bawah.
- **Durasi:** ~2 detik.

## 8. Konfeti "Selamat!" (Latihan Selesai)
- **Di mana:** setelah bagian "Coba Sendiri", pada teks "kamu baru saja ngoding untuk pertama kali!".
- **Gerakan:** ledakan konfeti kecil warna Pyto (hijau, kuning, biru, coral) sekali.
- **Tujuan:** merayakan keberhasilan, memberi dorongan semangat.
- **Durasi:** ~1,2 detik, sekali.

## 9. Rangkuman Masuk Bertahap (Stagger Fade-in)
- **Di mana:** daftar poin Rangkuman Bab 1.
- **Gerakan:** tiap poin muncul menyusul (fade + geser naik sedikit) satu per satu.
- **Tujuan:** membuat rangkuman terasa mengalir dan mudah dicerna.
- **Durasi:** ~0,3 detik per poin.

## 10. Panah "Bab Selanjutnya" Mengedip
- **Di mana:** tombol menuju Bab 2 di bagian bawah.
- **Gerakan:** panah bergeser maju-mundur pelan mengundang untuk lanjut.
- **Tujuan:** mengajak pembaca meneruskan.
- **Durasi:** berulang halus (loop).

---

## Aturan Penting

**Utamakan yang wajib.** Kalau harus memilih, animasi paling berdampak: **#1 Pyto Melambai**, **#3 Typewriter**, **#6 Tombol Run**, dan **#8 Konfeti**. Sisanya pemanis.

**Hormati "kurangi gerak".** Sediakan mode `prefers-reduced-motion` — untuk pengguna yang sensitif gerakan, animasi diganti kemunculan sederhana (fade) atau dimatikan.

**Jangan berulang berlebihan.** Animasi cerita (2, 3, 6, 7, 8) berjalan **sekali** saat bagiannya terlihat, bukan loop terus-menerus, supaya tidak mengganggu saat membaca.

**Ringan untuk HP.** Pakai animasi CSS/SVG sederhana, hindari file berat — banyak pembaca membuka lewat ponsel.
