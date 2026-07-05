# Design System — Web "Belajar Python Bareng Pyto"

Panduan visual agar semua halaman web (dan nanti kartu konten) tampil konsisten. Semua warna, font, dan komponen mengacu ke dokumen ini.

**Prinsip desain:** ramah, cerah, dan lapang. Menyenangkan untuk anak, tapi tetap bersih dan mudah dibaca untuk dewasa. Banyak ruang kosong, sudut membulat, tidak berantakan.

---

## 🎨 Palet Warna

Tema utama terinspirasi Pyto si robot ular — hijau segar sebagai warna khas, ditemani warna-warna cerah yang ramah.

### Warna Utama (Brand)
| Nama | Hex | Dipakai untuk |
|------|-----|---------------|
| **Pyto Green** | `#2FBF71` | Warna utama: tombol, judul, aksen |
| **Pyto Green Dark** | `#1E9E58` | Hover tombol, teks aksen di atas latar terang |
| **Pyto Green Soft** | `#E4F7ED` | Latar kotak highlight, badge |

### Warna Pendukung (Aksen Ceria)
| Nama | Hex | Dipakai untuk |
|------|-----|---------------|
| **Sunny Yellow** | `#FFC94D` | Kotak "Main Yuk", sorotan, bintang |
| **Sky Blue** | `#4DA6FF` | Kotak "Tahu Lebih", tautan info |
| **Coral** | `#FF7A6B` | Kotak peringatan/error yang ramah, tombol sekunder |
| **Grape** | `#8B6FE0` | Aksen dekoratif, ikon variasi |

### Netral (Teks & Latar)
| Nama | Hex | Dipakai untuk |
|------|-----|---------------|
| **Ink** | `#1E2A32` | Teks utama |
| **Slate** | `#5A6B75` | Teks sekunder, keterangan |
| **Cloud** | `#F5F8F7` | Latar halaman |
| **White** | `#FFFFFF` | Latar kartu/konten |
| **Border** | `#E1E8E5` | Garis pemisah, tepi kartu |

### Warna Kode (Code Block)
| Nama | Hex | Dipakai untuk |
|------|-----|---------------|
| **Code BG** | `#282C34` | Latar blok kode (gelap, kontras) |
| **Code Text** | `#E6E6E6` | Teks kode umum |
| **Code Green** | `#98C379` | String / teks dalam tanda kutip |
| **Code Blue** | `#61AFEF` | Nama fungsi (`print`, `input`) |
| **Code Purple** | `#C678DD` | Kata kunci (`if`, `for`, `while`) |
| **Code Comment** | `#7D8799` | Komentar (`# ...`) |

---

## 🔤 Tipografi

Pakai font gratis dari Google Fonts, ramah dibaca semua umur.

| Peran | Font | Catatan |
|-------|------|---------|
| **Judul** | `Baloo 2` | Bulat & ceria, cocok untuk anak tanpa terlihat kekanakan |
| **Isi teks** | `Nunito` | Sangat mudah dibaca, hangat |
| **Kode** | `JetBrains Mono` | Monospace jelas, membedakan `0` dan `O` |

### Ukuran (skala)
| Elemen | Ukuran | Tebal |
|--------|--------|-------|
| Judul halaman (H1) | 40px | 800 |
| Judul bagian (H2) | 28px | 700 |
| Sub-judul (H3) | 22px | 700 |
| Isi teks | 18px | 400 |
| Keterangan kecil | 15px | 400 |
| Kode | 16px | 400 |

Baris teks diberi jarak lega: `line-height: 1.7`. Lebar konten baca maksimal ~720px agar mata tidak lelah.

---

## 🧩 Komponen Kotak Materi

Tiga jenis kotak sesuai sistem berlapis di buku:

**Kotak Inti** — penjelasan utama. Latar putih, tepi lembut. Tidak perlu ikon.

**🎮 Kotak "Main Yuk"** — aktivitas untuk anak.
- Latar: `#FFF6E0` (kuning muda), garis kiri tebal `Sunny Yellow`.
- Ikon: 🎮 atau 🐍 Pyto.

**🔎 Kotak "Tahu Lebih"** — bonus untuk yang penasaran.
- Latar: `#EAF3FF` (biru muda), garis kiri tebal `Sky Blue`.

**⚠️ Kotak "Awas"** — mengingatkan kesalahan umum, dibuat ramah bukan menakutkan.
- Latar: `#FFEDEA` (coral muda), garis kiri tebal `Coral`.

---

## 🔘 Tombol

| Jenis | Latar | Teks | Untuk |
|-------|-------|------|-------|
| **Utama** | Pyto Green | Putih | "Jalankan Kode", "Bab Selanjutnya" |
| **Sekunder** | Putih, tepi Pyto Green | Pyto Green | "Ulangi", "Reset" |
| **Unduh** | Sky Blue | Putih | "Unduh Bab ini (PDF)" |

Semua tombol: sudut membulat `12px`, padding lega, sedikit membesar saat hover.

---

## 🖥️ Editor Kode Interaktif

Bagian penting web: pembaca bisa coba kode langsung.
- Kotak editor latar gelap (`Code BG`), teks berwarna sesuai tabel Warna Kode.
- Tombol **▶ Jalankan** warna Pyto Green di kanan atas editor.
- Area hasil di bawah editor, latar `Cloud`, judul kecil "Hasil:".
- Tombol **Reset** untuk kembali ke kode awal.

---

## 📐 Tata Letak & Bentuk

- **Sudut membulat:** kartu `16px`, tombol `12px`, kotak kode `10px`.
- **Bayangan:** halus dan lembut — `0 4px 16px rgba(30,42,50,0.06)`. Hindari bayangan tajam.
- **Jarak antar bagian:** minimal `32px` agar lapang.
- **Navigasi:** sidebar daftar bab di kiri (desktop), atau menu tarik di atas (HP).
- **Responsif:** wajib nyaman dibuka di HP — target audiens banyak yang pakai ponsel.

---

## ♿ Aksesibilitas

- Kontras teks terhadap latar minimal rasio 4.5:1 (Ink di atas White/Cloud aman).
- Jangan mengandalkan warna saja — kotak materi selalu punya ikon + label teks.
- Ukuran tombol cukup besar untuk jari anak (minimal 44×44px area sentuh).

---

## 💻 Variabel CSS (siap pakai)

```css
:root {
  /* Brand */
  --pyto-green:      #2FBF71;
  --pyto-green-dark: #1E9E58;
  --pyto-green-soft: #E4F7ED;

  /* Aksen */
  --sunny-yellow: #FFC94D;
  --sky-blue:     #4DA6FF;
  --coral:        #FF7A6B;
  --grape:        #8B6FE0;

  /* Netral */
  --ink:    #1E2A32;
  --slate:  #5A6B75;
  --cloud:  #F5F8F7;
  --white:  #FFFFFF;
  --border: #E1E8E5;

  /* Kode */
  --code-bg:      #282C34;
  --code-text:    #E6E6E6;
  --code-green:   #98C379;
  --code-blue:    #61AFEF;
  --code-purple:  #C678DD;
  --code-comment: #7D8799;

  /* Bentuk */
  --radius-card:   16px;
  --radius-btn:    12px;
  --radius-code:   10px;
  --shadow-soft:   0 4px 16px rgba(30,42,50,0.06);
}
```

---

*Dokumen ini jadi acuan tunggal warna & gaya. Buku PDF dan kartu konten pendek juga memakai palet yang sama agar semuanya terlihat "satu keluarga".*
