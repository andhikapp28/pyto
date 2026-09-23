# 📂 Skrip Referensi Python (`code/`)

Folder ini berisi kumpulan berkas skrip Python mandiri (*standalone*) untuk seluruh bab dalam buku/website **Belajar Python Bareng Pyto** 🐍.

Semua skrip di sini ditulis dengan gaya ramah ala Pyto si robot ular, 100% valid secara sintaksis, dan dapat dijalankan langsung menggunakan Python 3.11+.

---

## 📚 Daftar Berkas Kode

### 🟢 Fase 1: Dasar-dasar Python (Bab 1 – Bab 10)

| Bab | Berkas | Materi Inti |
|---|---|---|
| **Bab 1** | `bab1_kenalan_python.py` | Pengantar Python, filosofi kode yang mudah dibaca, komentar `#`. |
| **Bab 2** | `bab2_hello_world.py` | Perintah `print()`, mencetak teks & angka, parameter `sep` dan `end`. |
| **Bab 3** | `bab3_variabel.py` | Variabel ("kotak ajaib"), tipe data dasar (`str`, `int`, `float`, `bool`), fungsi `type()`. |
| **Bab 4** | `bab4_ngobrol_input.py` | Perintah `input()`, interaksi pengguna, `f-string`, dan jebakan tipe data `str`. |
| **Bab 5** | `bab5_angka_hitungan.py` | Operator hitung (`+`, `-`, `*`, `/`, `//`, `%`, `**`), konversi `int()`/`float()`, kalkulator mini. |
| **Bab 6** | `bab6_kalau_begini_maka_begitu.py` | Percabangan `if`, `elif`, `else`, operator perbandingan, logika `and` dan `or`. |
| **Bab 7** | `bab7_ulang_ulang.py` | Perulangan `for` dengan `range()`, perulangan `while`, kontrol `break` dan `continue`. |
| **Bab 8** | `bab8_kumpulan_barang.py` | List `[]`, indeks 0-based, indeks negatif, manipulasi `.append()`, `len()`, perulangan `for`. |
| **Bab 9** | `bab9_salah_itu_wajar.py` | Membaca traceback, 5 error umum pemula (`NameError`, `TypeError`, `ValueError`, `IndexError`, `SyntaxError`). |
| **Bab 10** | `bab10_proyek_seru.py` | Proyek sintesis Fase 1: Tebak Angka (`random`), Kuis Interaktif (Skor), Kalkulator dengan fungsi mini (`def`). |

---

### 🔵 Fase 2: Eksplorasi & Proyek Lanjutan (Bab 11 – Bab 20)

| Bab | Berkas | Materi Inti |
|---|---|---|
| **Bab 11** | `bab11_kamus.py` | Dictionary (kotak berlabel), mengambil & mengubah data lewat *key*, method `.get()`. |
| **Bab 12** | `bab12_data_dari_internet.py` | Mengambil data online lewat REST API (`requests`) dan format JSON. |
| **Bab 13** | `bab13_bengkel_foto_mini.py` | Pengolahan gambar digital dasar menggunakan pustaka `Pillow`. |
| **Bab 14** | `bab14_barcode_ajaib.py` | Membuat kode QR kustom secara otomatis menggunakan paket `qrcode`. |
| **Bab 15** | `bab15_asisten_kantor.py` | Otomasi pengolahan dokumen spreadsheet Excel (`openpyxl`) dan PDF. |
| **Bab 16** | `bab16_agen_rahasia.py` | Keamanan informasi: Sandi Caesar (`ord()`, `chr()`) dan analisa kata sandi. |
| **Bab 17** | `bab17_seniman_digital.py` | Menggambar grafis digital dan pola fraktal dengan modul bawaan `turtle`. |
| **Bab 18** | `bab18_detektif_teks.py` | Pencarian dan validasi pola teks menggunakan Regular Expression (`re`). |
| **Bab 19** | `bab19_proyek_level_up.py` | Proyek gabungan: Game teks Tebak Kata (Hangman) dan Batu-Gunting-Kertas. |
| **Bab 20** | `bab20_kalkulator_keuangan_mini.py` | Proyek capstone Fase 2: Sistem kalkulator & pelacak keuangan pribadi interaktif. |

---

## 🚀 Cara Menjalankan Skrip

### 1. Menjalankan Skrip Per Bab
Jalankan berkas skrip langsung dari terminal menggunakan Python:

```bash
# Contoh menjalankan Bab 4
python code/bab4_ngobrol_input.py

# Contoh menjalankan Proyek Bab 10
python code/bab10_proyek_seru.py
```

> **Catatan Penanganan Input:**  
> Untuk bab-bab yang meminta masukan pengguna (`input()`), skrip sudah dilengkapi penanganan otomatis. Jika kamu menjalankannya di terminal interaktif biasa, kamu bisa bebas mengetik jawabanmu. Jika dijalankan dalam lingkungan pengujian otomatis (non-TTY / tanpa masukan terminal), skrip akan otomatis memakai nilai contoh bawaan sehingga tidak akan berhenti atau macet.

### 2. Memeriksa Sintaks Seluruh Skrip Sekaligus
Kamu dapat memastikan semua skrip 100% bebas dari kesalahan sintaks dengan perintah bawaan `py_compile`:

```bash
python -m py_compile code/*.py
```

---

## 📐 Standar Penulisan Skrip

1. **Format Standar:**
   - **Docstring Pengantar:** Menjelaskan tema dan tujuan pembelajaran bab.
   - **Penjelasan Inti:** Kode bertahap disertai komentar ramah ala Pyto.
   - **🎮 Main Yuk!:** Latihan interaktif atau contoh kasus nyata yang menyenangkan.
   - **🔍 Tahu Lebih:** Eksplorasi mendalam untuk menambah wawasan pembaca.
2. **Kemandirian Berkas:** Tiap berkas dapat dieksekusi secara mandiri (*self-contained*).
3. **Bahasa:** Seluruh petunjuk, komentar, dan pesan keluaran menggunakan bahasa Indonesia yang santun dan mudah dipahami anak-anak maupun pemula.
