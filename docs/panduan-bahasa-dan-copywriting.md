# Panduan Audit Bahasa, Glosarium, & Style Guide Copywriting Pyto
**Penulis:** Tim Ahli Linguistik & Spesialis Copywriting Edukasi Teknologi (Tech Localization & Pedagogical Copywriter)  
**Status Dokumen:** Standar Resmi Kurikulum & Antarmuka "Belajar Python Bareng Pyto"  
**Sasaran Pembaca:** Pelajar SD (Kelas 4+), SMP, SMA/SMK, Mahasiswa, Guru/Pendidik, dan Pemula Dewasa/Pekerja Kantoran di Indonesia.

---

## 1. Latar Belakang & Analisis Masalah

Dalam meninjau seluruh materi di repositori web Pyto (`chapters.js`, `fase1.js`, `fase2.js`, dan halaman bab 1–20), ditemukan dua jebakan utama dalam lokalisasi edukasi teknologi:

### A. Masalah Terjemahan Berlebihan (*Over-translation* / *Hyper-localization*)
Penerjemahan istilah teknis universal menjadi padanan bahasa Indonesia yang terlalu harfiah, kaku, atau menggunakan analogi dongeng yang menggantikan nama aslinya:
1. **"Menyapa Dunia"** untuk `Hello, World!` / `print()`:
   Mengaburkan ritual tradisi pemrograman 50 tahun ilmu komputer. Pemula tidak menyadari bahwa `"Hello, World!"` adalah frase standar industri.
2. **"Kotak Berlabel"** untuk `Dictionary`:
   Terjadi tumpang-tindih (konflik istilah) yang membingungkan. Di Bab 3, variabel diperkenalkan sebagai *"kotak berlabel"*. Di Bab 11, `dictionary` tiba-tiba juga dinamai *"Kamus / Kotak Berlabel"*. Pembaca pemula menjadi rancu membedakan variabel skalar dan struktur data dictionary.
3. **"Kumpulan Barang"** untuk `List`:
   Menyempitkan makna `list` seolah hanya wadah barang fisik/belanjaan, padahal list dapat menampung angka, teks, koordinat, hingga objek kompleks.
4. **"Bikin Barcode Ajaib"** untuk `QR Code Generator`:
   Secara teknis keliru (Barcode adalah kode 1D garis, QR Code adalah matriks 2D). Di Indonesia istilah *"QR Code"* atau *"Kode QR"* sudah sangat lazim berkat QRIS dan menu kafe. Sebutan "Barcode Ajaib" terdengar kuno dan kekanak-kanakan.
5. **"Perpustakaan Python"** untuk `Python Library`:
   Terjemahan harfiah yang keliru (*false friend*). Dalam ranah informatika Indonesia, *library* diterjemahkan sebagai **pustaka**, bukan **perpustakaan** (yang merujuk pada gedung/ruangan fisik tempat peminjaman buku).
6. **"Mantra Sendiri"** untuk `Fungsi (def)`:
   Mengasosiasikan koding dengan klenik/sihir Harry Potter, mengaburkan konsep fundamental reusabilitas (*reusability*) dan logika pemrograman.
7. **"Angka Beneran vs Angka Bohongan"** untuk Tipe Data `int`/`float` vs `str`:
   Gaya bahasa terlalu anak TK. String `"10"` bukanlah angka bohongan, melainkan representasi teks dari digit angka.

### B. Ketidakseimbangan Nada (*Tone of Voice*)
1. **Terlalu Kekanak-kanakan (*Infantilizing*)**:
   Ungkapan seperti *"Siap jadi programmer cilik?"* (di Footer CTA), *"Master Python Cilik"* (gelar level 20 di sistem gamifikasi), dan istilah serba-ajaib membuat pembaca remaja (SMP/SMA/SMK) serta dewasa merasa enggan berbagi pencapaian ke media sosial karena takut diejek kekanak-kanakan.
2. **Terlalu Birokratis / Skripsi Kaku**:
   Di beberapa bagian teks teoretis, kalimat berputar-putar dan kaku.

### C. Nada Ideal Pyto: *Conversational, Empowering, and Technically Grounded*
- **Hangat & Bersahabat**: Menggunakan kata sapaan "kamu", kalimat aktif yang mengalir, dan humor ringan khas Pyto si robot ular.
- **Memberdayakan (*Empowering*)**: Memperlakukan pembaca dari segala usia sebagai kreator teknologi nyata.
- **Akurat & Sesuai Industri**: Menjaga istilah standar industri agar pemula siap saat membaca dokumentasi resmi Python, bertanya di Google/StackOverflow, atau bekerja dengan VS Code.

---

## 2. Tabel Glosarium Standarisasi Istilah (Terminologi)

Prinsip: **Pertahankan istilah teknis universal dalam format kode/miring, padankan dengan bahasa Indonesia yang natural, dan gunakan analogi visual sebagai jembatan pemahaman awal.**

| No | Istilah Asli (Python/Tech) | Terjemahan Lama / Canggung | Istilah Rekomendasi Baru | Format Penulisan | Alasan Pedagogis & Kebahasaan |
|:---|:---|:---|:---|:---|:---|
| 1 | `Hello, World!` / `print()` | Menyapa Dunia | **Halo Dunia (`print()`)** | Teks biasa + `<code>print()</code>` | Menghormati tradisi pemrograman global 50 tahun tanpa menghilangkan fungsi intinya. |
| 2 | `Variable` | Kotak Ajaib | **Variabel** (Analogi: *Wadah Penyimpan Data*) | Variabel (Teks biasa) | Variabel adalah kata serapan baku KBBI. Analogi wadah/kotak hanya dipakai untuk penjelasan awal, bukan judul utama. |
| 3 | `Dictionary` / `dict` | Kotak Berlabel / Kamus | **Dictionary** (Analogi: *Katalog Data / Pasangan Kunci-Nilai*) | *dictionary* / `dict` | Mencegah kebingungan dengan Bab 3 (Variabel). Menyebut kata resminya membuat pemula langsung paham tipe data Python. |
| 4 | `Key` & `Value` | Label & Isi | **Kunci (*Key*) & Nilai (*Value*)** | Kunci (*key*) & nilai (*value*) | Istilah teknis universal untuk pasangan data asosiatif. Menggunakan "label & isi" menyulitkan saat belajar konsep database atau JSON. |
| 5 | `List` | Kumpulan Barang | **List** (Padanan: *Daftar Data*) | *list* / `list` | *List* adalah tipe data terurut. Frase "Daftar Data" jauh lebih akurat dan profesional dibanding "Kumpulan Barang". |
| 6 | `Loop` (`for`, `while`) | Ulang-ulang | **Perulangan (Loop)** | Perulangan (*loop*) | "Ulang-ulang" bernada kekanak-kanakan (*baby talk*). Bahasa Indonesia baku memiliki kata elegan: *perulangan*. |
| 7 | `Branching / Conditional` (`if`/`else`) | Kalau Begini Maka Begitu | **Percabangan / Logika Keputusan (`if`/`else`)** | Percabangan (*conditional*) | "Percabangan" adalah istilah baku ilmu komputer; frasa "logika keputusan" intuitif bagi pemula segala umur. |
| 8 | `QR Code` | Barcode Ajaib | **QR Code / Kode QR** | QR Code / Kode QR | Barcode dan QR Code berbeda secara teknologi. Masyarakat Indonesia sudah sangat akrab dengan istilah QR Code / QRIS. |
| 9 | `Library` | Perpustakaan Python | **Pustaka (*Library*)** | Pustaka / *library* | "Perpustakaan" adalah terjemahan harfiah yang salah kaprah (*false friend*). Standar informatika Indonesia adalah **pustaka**. |
| 10 | `Function` (`def`) | Mantra Sendiri | **Fungsi (`def`)** (Analogi: *Resep Otomatis*) | Fungsi / `def` | Koding adalah logika dan rekayasa, bukan sihir. Fungsi adalah blok kode yang dapat dipanggil kembali (*reusable*). |
| 11 | `Workbench` | Papan Kerja | **Editor / Area Eksplorasi / Studio** | Editor / Studio Kode | "Papan kerja" terdengar kaku seperti bengkel kayu. "Editor" atau "Studio" adalah istilah standar aplikasi modern. |
| 12 | `Error & Debugging` | Salah itu Wajar | **Mengenal Error & Debugging** | Error & *debugging* | Empati ("tidak apa-apa salah") tetap ada di isi teks, tetapi judul harus mengenalkan konsep esensial *debugging*. |
| 13 | `Traceback` | Pesan Error Merah | **Traceback (Laporan Pelacak Error)** | `traceback` / laporan error | Pemula harus tahu kata *traceback* agar bisa membaca pesan terminal Python sungguhan. |
| 14 | `Numeric vs String` | Angka Beneran vs Bohongan | **Tipe Data Angka vs Teks** | Angka (`int`/`float`) vs Teks (`str`) | `"10"` bukan angka bohongan, melainkan karakter string. Penjelasan yang akurat mencegah kebingungan konseptual. |
| 15 | `Package / Module` | Kotak Alat Tambahan | **Modul / Paket Tambahan** | Modul (*module*) / Paket (*package*) | Mengajarkan istilah resmi ekosistem Python (`import module`, `pip package`) dengan tetap mempertahankan analogi praktis. |
| 16 | `Image Processing (Pillow)` | Bengkel Foto Mini | **Olah Gambar (*Image Processing*)** | Olah gambar / manipulasi foto | Lebih profesional dan relevan untuk portofolio pemula, siswa SMK multimedia, maupun hobi. |
| 17 | `Office Automation` | Asisten Kantor Kilat | **Otomasi File Excel & PDF** | Otomasi dokumen / *automation* | Menunjukkan *real-world value* langsung untuk pekerja kantoran, wirausaha/UMKM, dan mahasiswa. |
| 18 | `Regex (Pattern Matching)` | Detektif Teks | **Pencarian Pola Teks (Regex)** | *Regex* / pola teks | Mengawinkan daya tarik visual "detektif teks" dengan istilah industri *Regular Expression (Regex)*. |
| 19 | `Cryptography` | Agen Rahasia Pyto | **Kriptografi & Keamanan Kata Sandi** | Kriptografi / sandi | Menghubungkan konsep penggeseran karakter (*Caesar cipher*) dengan literasi keamanan siber dunia nyata. |
| 20 | `Data Visualization` | Seniman Grafik / Kalkulator Keuangan | **Visualisasi Data & Grafik (Matplotlib)** | Visualisasi data / grafik | Mengenalkan salah satu pilar terbesar Python di dunia nyata: data science & visualisasi. |
| 21 | `String Formatting (f-string)` | Teks Ajaib f-string | **Format Teks (*f-string*)** | `f-string` | Menghilangkan kata "ajaib", berfokus pada fungsi interpolasi teks dinamis. |
| 22 | `Parameter / Argument` | Bahan / Masukan Mantra | **Parameter & Argumen** | Parameter / Argumen | Istilah baku matematika dan ilmu komputer untuk masukan fungsi. |
| 23 | `Case-sensitive` | Huruf Besar-Kecil Dihitung Beda | **Peka Huruf Besar-Kecil (*Case-Sensitive*)** | Peka huruf besar-kecil | Konsep universal dalam sistem operasi dan bahasa pemrograman. |
| 24 | `Boolean (True/False)` | Sakelar Benar/Salah | **Nilai Kebenaran (*Boolean*)** | *Boolean* (`True` / `False`) | Menamai tipe data dengan benar sambil menjelaskan nilainya hanya ada dua: Benar atau Salah. |

---

## 3. Rekomendasi Judul, Judul Pendek, & Blurb Bab 1 s.d. 20

Struktur kurikulum yang diperbaiki menggunakan rumus:
**[Aksi Menarik / Intuitif]: [Konsep Teknis Python]**
Hal ini memastikan anak SD kelas 4 merasa tertantang dan paham, sementara remaja SMA/SMK dan dewasa merasa materinya berbobot dan profesional.

### Fase 1: Python Dasar (Dari Nol Sampai Bisa)

| Bab | Emoji | Judul Rekomendasi (`title`) | Judul Pendek (`short`) | Ringkasan Rekomendasi (`blurb`) |
|:---:|:---:|:---|:---|:---|
| **1** | 👋 | **Kenalan dengan Python** | Mulai Ngoding | Apa itu pemrograman, kenapa Python jadi bahasa terpopuler di dunia, dan cara menjalankan baris kodemu yang pertama. |
| **2** | 🗣️ | **Halo Dunia: Perintah `print()`** | `print()` & Teks | Menampilkan tulisan ke layar, tradisi kode "Hello, World!", dan menggabungkan teks dinamis memakai *f-string*. |
| **3** | 📦 | **Variabel: Wadah Penyimpan Data** | Variabel | Menyimpan angka, teks, dan data ke dalam variabel agar program bisa mengingat dan menggunakannya kapan saja. |
| **4** | 💬 | **Program Interaktif dengan `input()`** | `input()` | Membuat program yang bisa bertanya ke pengguna, menerima ketikan jawaban, dan memahami jebakan tipe data teks. |
| **5** | 🧮 | **Angka & Operasi Matematika** | Angka & Operator | Mengolah angka bulat (`int`) dan desimal (`float`), memakai operator hitung, serta mengubah teks menjadi angka. |
| **6** | 🚦 | **Logika Keputusan (`if`, `elif`, `else`)** | Percabangan `if` | Mengajari program mengambil keputusan sendiri berdasarkan syarat benar atau salah (*True/False*) dengan indentasi rapi. |
| **7** | 🔁 | **Perulangan Otomatis (`for` & `while`)** | Perulangan Loop | Menyuruh komputer melakukan tugas berulang ratusan kali secara instan tanpa lelah menggunakan loop `for` dan `while`. |
| **8** | 🧺 | **Daftar Data dengan `list`** | `list` | Menyimpan banyak nilai dalam satu wadah list, mengakses nomor urut (*index*) mulai dari 0, dan menambah data baru. |
| **9** | 🔍 | **Mengenal Error & Debugging** | Debugging | Membaca pesan *traceback* tanpa panik, mengenali jenis error umum (*SyntaxError*, *TypeError*), dan memperbaikinya. |
| **10** | 🚀 | **Mini Proyek: 3 Aplikasi Pertamamu** | Mini Proyek | Menggabungkan seluruh ilmu dasar untuk membangun game Tebak Angka, Kuis Pilihan, dan Kalkulator Interaktif. |

### Fase 2: Python Lanjutan (Bikin Sesuatu yang Beneran Dipakai)

| Bab | Emoji | Judul Rekomendasi (`title`) | Judul Pendek (`short`) | Ringkasan Rekomendasi (`blurb`) |
|:---:|:---:|:---|:---|:---|
| **11** | 🗂️ | **Struktur Data Dictionary** | `dictionary` | Menyimpan data berpasangan kunci-nilai (*key-value*), mencari data lewat label secara instan, dan memakai method `.get()`. |
| **12** | 🌐 | **Mengambil Data Internet (API & JSON)** | API & Fungsi `def` | Menghubungkan program ke internet untuk mengambil data cuaca gratis dan membungkus kode menjadi fungsi buatan sendiri. |
| **13** | 🖼️ | **Olah Gambar dengan Pillow** | *Image Processing* | Mengunggah foto asli untuk diubah ukuran (*resize*), diberi watermark teks otomatis, dan diubah menjadi hitam-putih. |
| **14** | 📱 | **Generator QR Code** | QR Code | Membuat kode QR sendiri dari teks atau tautan website yang bisa langsung dipindai dengan kamera ponsel sungguhan. |
| **15** | 📊 | **Otomasi File Excel & PDF** | Otomasi Dokumen | Membaca dan merapikan data ribuan baris Excel dengan `openpyxl`, serta mengekstrak teks dari dokumen PDF secara otomatis. |
| **16** | 🕵️ | **Kriptografi & Keamanan Kata Sandi** | Sandi & Enkripsi | Membuat dan membongkar sandi rahasia (*Caesar cipher*), serta membangun program penguji kekuatan kata sandi (*password*). |
| **17** | 🎨 | **Karya Visual dengan Kode (Turtle Graphics)** | Grafika Kode | Memanfaatkan kekuatan perulangan matematika untuk melukis pola geometri bintang, mandala warna-warni, hingga kembang api. |
| **18** | 🔍 | **Pencarian Pola Teks dengan Regex** | Regex | Menggunakan modul `re` untuk memeriksa validitas nomor telepon, menyaring alamat email, dan menyamarkan data pribadi. |
| **19** | 🎮 | **Proyek Game Interaktif** | Game Teks | Membangun game Tebak Kata dan Batu-Gunting-Kertas lengkap dengan sistem skor, validasi input, dan loop permainan. |
| **20** | 💰 | **Aplikasi Keuangan & Visualisasi Data** | Capstone Proyek | Proyek penutup: membangun pencatat arus kas pribadi dan menyajikan grafik batang serta diagram lingkaran dengan `matplotlib`. |

---

## 4. Panduan Kaidah Penulisan (Microcopy Style Guide)

### Kaidah 1: Kapan Istilah Tetap Bahasa Inggris Asli
1. **Sintaksis & Kata Kunci Bahasa Pemrograman**:
   - Seluruh keyword, perintah, method, dan tipe data bawaan Python **wajib ditulis dalam bahasa Inggris asli** dan menggunakan format kode:  
     `print()`, `input()`, `def`, `return`, `for`, `while`, `in`, `range()`, `if`, `elif`, `else`, `True`, `False`, `None`, `append()`, `len()`, `int()`, `str()`, `float()`, `dict()`, `import`.
   - Nama paket/pustaka: `openpyxl`, `Pillow` (`PIL`), `qrcode`, `matplotlib`, `pypdf`, `re`, `random`.
2. **Istilah Teknis Standar Industri Global**:
   - Istilah arsitektur dan format teknologi yang menjadi standar dunia tidak boleh diterjemahkan paksa ke bahasa Indonesia yang tidak lazim.
   - Tetap gunakan: *API, JSON, QR Code, Bug, Debugging, Traceback, Frontend, Backend, Watermark, Regex, Fullmatch, Caesar Cipher*.
   - Saat berada di dalam teks narasi biasa (bukan blok kode), cetak miring (*italics*) istilah asing tersebut jika belum diserap resmi: *string, boolean, float, dictionary, list, method, loop, key-value*.

### Kaidah 2: Kapan Istilah Diserap / Dipadankan ke Bahasa Indonesia
Gunakan padanan bahasa Indonesia untuk konsep generik yang sudah baku di KBBI dan lazim digunakan di kalangan profesional IT Indonesia:
- *Function* → **Fungsi** (BUKAN "mantra")
- *Variable* → **Variabel** (BUKAN hanya "kotak ajaib")
- *Loop / Iteration* → **Perulangan** (BUKAN "ulang-ulang")
- *Conditional / Branching* → **Percabangan** / **Pengambilan Keputusan** (BUKAN "kalau begini maka begitu")
- *Library* → **Pustaka** (BUKAN "perpustakaan")
- *Data Type* → **Tipe Data**
- *Value* → **Nilai**
- *Index* → **Indeks** (jamak: indeks)
- *Parameter / Argument* → **Parameter / Argumen**
- *Upload / Download* → **Unggah / Unduh** (dalam tombol aksi boleh tetap fleksibel: `Upload Foto` atau `Unggah Foto`)
- *Scan* → **Pindai** (atau *scan*)
- *Encryption / Decryption* → **Enkripsi / Dekripsi**

### Kaidah 3: Aturan Penggunaan Analogi Visual (*The Pedagogical Bridge Rule*)
Analogi visual adalah alat bantu mengajar terbaik, **tetapi analogi tidak boleh menggantikan identitas teknis konsep tersebut**.

* **Prinsip Jembatan (Bridge, Not Replacement)**:
  1. *Perkenalkan nama resminya terlebih dahulu.*
  2. *Berikan analogi visual dunia nyata untuk membangun intuisi.*
  3. *Kembalikan ke kode nyata.*

* **Contoh Penerapan Benar vs Salah**:
  * ❌ *Salah:* "Di bab ini kita belajar bikin **mantra** baru bernama `ambil_cuaca`."  
    *(Masalah: Mengaburkan esensi fungsi, terkesan takhayul/mistis).*
  * ✅ *Benar:* "Di bab ini kita belajar membuat **fungsi (`def`)** buatan sendiri. Bayangkan fungsi seperti **resep masakan siap pakai**: sekali kamu tulis langkah-langkahnya, kamu bisa memasak hidangan yang sama kapan saja hanya dengan memanggil namanya."
  * ❌ *Salah:* "Hari ini kita bikin **Barcode Ajaib**."  
    *(Masalah: Barcode bukan QR Code, kata "ajaib" berlebihan).*
  * ✅ *Benar:* "Hari ini kita membuat **QR Code** sendiri — kode matriks dua dimensi yang biasa kamu pindai di restoran atau struk belanja."
  * ❌ *Salah:* "Angka beneran vs angka bohongan."
  * ✅ *Benar:* "Angka sungguhan (`int` / `float`) vs teks angka (`str`)."

### Kaidah 4: Microcopy Nada Suara pada Elemen Antarmuka (UI & Gamifikasi)
1. **Menghilangkan Sindrom "Anak TK / Bocah"**:
   - ❌ *"Siap jadi programmer cilik?"*  
     ✅ *"Siap bikin program pertamamu bareng Pyto?"* atau *"Mulai petualangan kodingmu sekarang!"*
   - ❌ *"Master Python Cilik 🏆"*  
     ✅ *"Master Python 🏆"* atau *"Pendekar Python 🏆"*
   - ❌ *"Penyihir Kode Senior 🧙‍♂️"*  
     ✅ *"Arsitek Kode Berbakat 🚀"* atau *"Pakar Python Kreatif 💻"*
2. **Tombol Aksi (Action Button)**:
   Gunakan kata kerja aktif, spesifik, dan ringkas:
   - `▶ Jalankan Kode` (bukan sekadar `Jalankan`)
   - `↺ Reset Kode`
   - `📥 Unduh Kartu Prestasi (PNG)`
   - `📋 Salin Gambar`
   - `✓ Selesai Dipelajari`
3. **Pesan Loading & Status**:
   Hangat, ramah, dan transparan:
   - `⏳ Menyiapkan Python di browsermu...`
   - `🖼️ Memuat modul Pillow untuk olah gambar...`
   - `📊 Memuat modul openpyxl untuk file Excel...`

---

## 5. Rangkuman Dampak Perubahan bagi Pembaca

| Aspek | Gaya Lama | Gaya Rekomendasi Baru | Dampak Positif |
|:---|:---|:---|:---|
| **Kesiapan Industri** | Membaca "Menyapa Dunia", "Kotak Berlabel", "Mantra" | Membaca `print()`, *Dictionary*, Fungsi `def` | Pembaca langsung mengerti dokumentasi Python asli & tutorial global tanpa gegar istilah. |
| **Rentang Usia Audiens** | Terasa ditargetkan untuk anak usia 7-9 tahun (infantilizing). | Hangat, modern, cocok dari usia 10 tahun hingga dewasa/kantoran. | Remaja SMA, mahasiswa, dan orang dewasa tidak malu/canggung belajar dari Pyto. |
| **Konsistensi Terminologi** | Variabel dan Dictionary sama-sama disebut "kotak berlabel". | Variabel = "Wadah Data", Dictionary = "Struktur Pasangan Kunci-Nilai". | Menghilangkan kebingungan logika (*mental model*) saat pembaca naik kelas ke Fase 2. |
| **Kebanggaan Prestasi** | Berbagi sertifikat bergelar "Master Cilik". | Berbagi sertifikat bergelar "Python Master / Petualang Tangguh". | Tingkat retensi dan *social sharing* (brag card di Instagram/WA) meningkat drastis. |
