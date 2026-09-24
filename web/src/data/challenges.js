/**
 * Kurikulum Tantangan Kode Interaktif Pyto (Bab 1 - 20)
 *
 * Masing-masing bab memiliki 1 misi kode praktis terarah.
 * Evaluator berjalan di sisi klien:
 * - Menjalankan kode pengguna lewat Pyodide
 * - Memvalidasi `output` (stdout konsol) dan `code` (inspeksi struktur)
 * - Memberi umpan balik ramah membimbing jika belum tepat
 */

export const challenges = [
  {
    chapter: 1,
    title: 'Misi 1: Cetak Nama Petualang',
    mission: 'Gunakan fungsi `print()` untuk mencetak salam pertamamu ke layar!',
    starterCode: '# Tulis perintah print di bawah ini:\nprint("Halo, aku siap belajar Python!")',
    hint: 'Ketik perintah print lalu bungkus tulisanmu dengan tanda kutip, misalnya print("Halo!")',
    validate: (output, code) => {
      if (!code.includes('print')) {
        return { pass: false, message: 'Kamu belum menulis fungsi print(). Coba ketik print("...") ya!' };
      }
      if (!output || !output.trim()) {
        return { pass: false, message: 'Belum ada tulisan yang tercetak di layar. Pastikan ada teks di dalam kurung print!' };
      }
      return { pass: true, message: 'Luar biasa! Baris kode pertamamu berhasil berjalan di browser! 🎉' };
    },
  },
  {
    chapter: 2,
    title: 'Misi 2: Cetak Pesan dengan f-string',
    mission: 'Gabungkan variabel `nama` ke dalam kalimat menggunakan f-string `f"Halo, {nama}!"` lalu cetak ke layar.',
    starterCode: 'nama = "Pyto"\n# Cetak f-string di bawah ini:\n',
    hint: 'Gunakan awalan huruf f sebelum tanda kutip: print(f"Halo, namaku {nama}!")',
    validate: (output, code) => {
      if (!code.includes('print')) {
        return { pass: false, message: 'Gunakan print() untuk menampilkan hasilnya ke layar.' };
      }
      if (!code.includes('f"') && !code.includes("f'")) {
        return { pass: false, message: 'Ingat untuk memakai f-string dengan huruf f di depan tanda kutip: f"..."' };
      }
      if (!output.toLowerCase().includes('pyto')) {
        return { pass: false, message: 'Nama "Pyto" belum muncul di hasil cetak layar. Sisipkan {nama} di dalam f-string!' };
      }
      return { pass: true, message: 'Keren! Kamu sudah menguasai f-string untuk merangkai teks dinamis! ✨' };
    },
  },
  {
    chapter: 3,
    title: 'Misi 3: Ganti Isi Variabel (Reassignment)',
    mission: 'Buat variabel `skor = 50`. Di baris berikutnya, ubah nilainya menjadi `100`, lalu cetak nilai `skor` ke layar.',
    starterCode: '# Buat variabel skor mula-mula:\nskor = 50\n\n# Ganti nilainya jadi 100 lalu cetak:\n',
    hint: 'Tulis skor = 100 di baris baru, lalu panggil print(skor).',
    validate: (output, code) => {
      if (!code.includes('skor')) {
        return { pass: false, message: 'Pastikan kamu memakai nama variabel "skor".' };
      }
      if (!code.includes('100')) {
        return { pass: false, message: 'Nilai skor belum diubah menjadi 100.' };
      }
      if (!output.includes('100')) {
        return { pass: false, message: 'Layar belum menampilkan angka 100. Panggil print(skor) di akhir!' };
      }
      return { pass: true, message: 'Tepat sekali! Variabel berhasil diperbarui isinya dan dicetak! 🎯' };
    },
  },
  {
    chapter: 4,
    title: 'Misi 4: Sambut Pengguna Ramah',
    mission: 'Buat variabel `bahasa = "Python"`, lalu cetak kalimat: `"Aku sedang belajar Python!"`.',
    starterCode: 'bahasa = "Python"\n# Cetak kalimat penyambutan di bawah ini:\n',
    hint: 'Bisa pakai f-string: print(f"Aku sedang belajar {bahasa}!")',
    validate: (output, code) => {
      if (!output.toLowerCase().includes('belajar python')) {
        return { pass: false, message: 'Pastikan kalimat "Aku sedang belajar Python!" tercetak di layar.' };
      }
      return { pass: true, message: 'Mantap! Program interaktifmu tersusun rapi! 💬' };
    },
  },
  {
    chapter: 5,
    title: 'Misi 5: Hitung Luas Persegi Panjang',
    mission: 'Diberikan `panjang = 8` dan `lebar = 5`. Hitung luasnya (`panjang * lebar`), simpan di variabel `luas`, lalu cetak `luas`.',
    starterCode: 'panjang = 8\nlebar = 5\n\n# Hitung luas dan cetak hasilnya:\n',
    hint: 'Gunakan operator perkalian bintang (*): luas = panjang * lebar, lalu print(luas)',
    validate: (output, code) => {
      if (!code.includes('*')) {
        return { pass: false, message: 'Gunakan operator perkalian (*) untuk menghitung luas.' };
      }
      if (!output.includes('40')) {
        return { pass: false, message: 'Hasil luas seharusnya 40 (8 dikali 5). Cetak variabel luas dengan print(luas)!' };
      }
      return { pass: true, message: 'Perhitungan tepat! Angka 40 berhasil dihitung oleh Python! 🧮' };
    },
  },
  {
    chapter: 6,
    title: 'Misi 6: Keputusan Nilai Ujian',
    mission: 'Jika `nilai >= 75`, cetak `"Lulus"`. Jika tidak, cetak `"Remedial"`. Coba dengan `nilai = 85`.',
    starterCode: 'nilai = 85\n\nif nilai >= 75:\n    # cetak kelulusan di sini\n    pass\nelse:\n    print("Remedial")\n',
    hint: 'Ganti pass dengan print("Lulus"). Perhatikan indentasi 4 spasi!',
    validate: (output, code) => {
      if (!code.includes('if') || !code.includes('else')) {
        return { pass: false, message: 'Pastikan struktur percabangan if dan else tetap lengkap.' };
      }
      if (!output.includes('Lulus')) {
        return { pass: false, message: 'Karena nilai 85 >= 75, layar seharusnya mencetak "Lulus".' };
      }
      return { pass: true, message: 'Logika keputusan berhasil mengambil jalur yang tepat! 🚦' };
    },
  },
  {
    chapter: 7,
    title: 'Misi 7: Hitung Maju 1 Sampai 5',
    mission: 'Gunakan perulangan `for` dan `range(1, 6)` untuk mencetak angka 1 sampai 5 berurutan.',
    starterCode: '# Tulis perulangan for di bawah ini:\nfor i in range(1, 6):\n    # cetak i di sini\n    pass\n',
    hint: 'Ganti pass dengan print(i) dengan indentasi menjorok ke dalam.',
    validate: (output, code) => {
      if (!code.includes('for')) {
        return { pass: false, message: 'Gunakan perulangan for untuk menyelesaikan misi ini.' };
      }
      const lines = output.trim().split(/\s+/);
      const expected = ['1', '2', '3', '4', '5'];
      const matches = expected.every((num) => lines.includes(num));
      if (!matches) {
        return { pass: false, message: 'Angka yang dicetak belum lengkap 1 sampai 5. Periksa parameter range(1, 6) dan print(i)!' };
      }
      return { pass: true, message: 'Loop berjalan sempurna dari 1 sampai 5 tanpa lelah! 🔁' };
    },
  },
  {
    chapter: 8,
    title: 'Misi 8: Tambah Anggota ke List',
    mission: 'Diberikan `hewan = ["Kucing", "Kelinci"]`. Tambahkan `"Panda"` menggunakan `.append()`, lalu cetak list `hewan`.',
    starterCode: 'hewan = ["Kucing", "Kelinci"]\n\n# Tambahkan "Panda" ke dalam list:\n\n# Cetak list hewan:\n',
    hint: 'Panggil hewan.append("Panda") lalu print(hewan)',
    validate: (output, code) => {
      if (!code.includes('append')) {
        return { pass: false, message: 'Gunakan method .append("Panda") untuk memasukkan data baru.' };
      }
      if (!output.includes('Panda') || !output.includes('Kucing')) {
        return { pass: false, message: 'List akhir harus memuat Kucing, Kelinci, dan Panda. Panggil print(hewan)!' };
      }
      return { pass: true, message: 'List berhasil ditambah data baru secara dinamis! 🧺' };
    },
  },
  {
    chapter: 9,
    title: 'Misi 9: Perbaiki Bug Nama Variabel',
    mission: 'Kode di bawah menghasilkan `NameError` karena nama variabel di baris print typo. Perbaiki agar tidak error!',
    starterCode: 'pesan_rahasia = "Belajar Python itu seru!"\n# Perbaiki typo di bawah ini:\nprint(pesan_rahasiaa)\n',
    hint: 'Hapus huruf "a" ekstra pada pesan_rahasiaa di dalam kurung print.',
    validate: (output, code) => {
      if (code.includes('pesan_rahasiaa')) {
        return { pass: false, message: 'Masih ada typo "pesan_rahasiaa". Samakan dengan nama variabel di baris pertama!' };
      }
      if (!output.includes('Belajar Python itu seru!')) {
        return { pass: false, message: 'Pesan belum tercetak dengan benar.' };
      }
      return { pass: true, message: 'Detektif hebat! Bug NameError berhasil kamu tumpas tuntas! 🕵️' };
    },
  },
  {
    chapter: 10,
    title: 'Misi 10: Mini Kalkulator Penjumlahan',
    mission: 'Buat dua variabel `angka1 = 15` dan `angka2 = 25`. Cetak hasil penjumlahannya dalam format: `"Hasil: 40"`.',
    starterCode: 'angka1 = 15\nangka2 = 25\n\n# Jumlahkan dan cetak hasilnya:\n',
    hint: 'Gunakan f-string: print(f"Hasil: {angka1 + angka2}")',
    validate: (output, code) => {
      if (!output.includes('40')) {
        return { pass: false, message: 'Hasil penjumlahan 15 + 25 adalah 40. Pastikan angka 40 tercetak di layar!' };
      }
      return { pass: true, message: 'Selamat! Mini aplikasimu berjalan sempurna dan Fase 1 resmi tuntas! 🏆' };
    },
  },
  {
    chapter: 11,
    title: 'Misi 11: Ambil Data Dictionary dengan .get()',
    mission: 'Ambil nilai `"nama"` dari dictionary `hero` menggunakan `.get("nama")` lalu cetak ke layar.',
    starterCode: 'hero = {"nama": "Pyto", "level": 10, "elemen": "Petir"}\n\n# Ambil nama hero pakai .get() dan cetak:\n',
    hint: 'Panggil hero.get("nama") di dalam fungsi print: print(hero.get("nama"))',
    validate: (output, code) => {
      if (!code.includes('.get')) {
        return { pass: false, message: 'Gunakan method .get("nama") agar pencarian data aman dari error.' };
      }
      if (!output.includes('Pyto')) {
        return { pass: false, message: 'Nilai "Pyto" belum tercetak di konsol. Pastikan print(hero.get("nama"))!' };
      }
      return { pass: true, message: 'Kamus data dictionary berhasil diakses dengan aman! 🗂️' };
    },
  },
  {
    chapter: 12,
    title: 'Misi 12: Buat Fungsi Hitung Diskon',
    mission: 'Buat fungsi `hitung_diskon(harga)` yang mengembalikan harga setelah diskon 10% (`harga * 0.9`). Panggil dengan harga `10000` dan cetak hasilnya.',
    starterCode: 'def hitung_diskon(harga):\n    return harga * 0.9\n\n# Panggil fungsi dengan 10000 dan cetak:\n',
    hint: 'Tulis hasil = hitung_diskon(10000) lalu print(hasil)',
    validate: (output, code) => {
      if (!code.includes('def hitung_diskon')) {
        return { pass: false, message: 'Pastikan fungsi def hitung_diskon(harga) tetap ada.' };
      }
      if (!output.includes('9000')) {
        return { pass: false, message: 'Diskon 10% dari 10000 adalah 9000. Cetak hasil pemanggilan fungsi ke layar!' };
      }
      return { pass: true, message: 'Mantap! Fungsi buatanmu berhasil dipakai berulang kali! 🌐' };
    },
  },
  {
    chapter: 13,
    title: 'Misi 13: Hitung Resolusi Piksel Gambar',
    mission: 'Diberikan dimensi gambar `lebar = 800` dan `tinggi = 600`. Hitung total pikselnya (`lebar * tinggi`) dan cetak ke layar.',
    starterCode: 'lebar = 800\ntinggi = 600\n\n# Hitung total piksel:\n',
    hint: 'total_piksel = lebar * tinggi lalu print(total_piksel)',
    validate: (output, code) => {
      if (!output.includes('480000')) {
        return { pass: false, message: 'Total piksel 800x600 adalah 480000. Pastikan hasilnya dicetak!' };
      }
      return { pass: true, message: 'Perhitungan dimensi olah gambar Pillow berhasil! 🖼️' };
    },
  },
  {
    chapter: 14,
    title: 'Misi 14: Periksa Panjang Tautan QR Code',
    mission: 'Diberikan link `url = "https://pyto.id"`. Hitung panjang karakternya menggunakan `len(url)` dan cetak hasilnya.',
    starterCode: 'url = "https://pyto.id"\n\n# Hitung panjang karakter URL pakai len():\n',
    hint: 'Panggil print(len(url)) untuk mencetak jumlah karakter teks.',
    validate: (output, code) => {
      if (!code.includes('len')) {
        return { pass: false, message: 'Gunakan fungsi bawaan len(url) untuk menghitung panjang karakter.' };
      }
      if (!output.includes('15')) {
        return { pass: false, message: 'Panjang karakter "https://pyto.id" adalah 15. Pastikan tercetak ke layar!' };
      }
      return { pass: true, message: 'Panjang teks QR Code tervalidasi dengan tepat! 📱' };
    },
  },
  {
    chapter: 15,
    title: 'Misi 15: Rekap Total Penjualan Excel',
    mission: 'Diberikan list pemasukan `omzet = [150000, 200000, 350000]`. Hitung totalnya menggunakan fungsi `sum(omzet)` dan cetak.',
    starterCode: 'omzet = [150000, 200000, 350000]\n\n# Hitung total omzet dengan sum() dan cetak:\n',
    hint: 'Ketik total = sum(omzet) lalu print(total)',
    validate: (output, code) => {
      if (!code.includes('sum')) {
        return { pass: false, message: 'Gunakan fungsi sum(omzet) untuk menjumlahkan semua angka di list.' };
      }
      if (!output.includes('700000')) {
        return { pass: false, message: 'Total rekap omzet seharusnya 700000. Pastikan angka ini tercetak!' };
      }
      return { pass: true, message: 'Otomasi data angka rekap kantor berhasil dihitung kilat! 📊' };
    },
  },
  {
    chapter: 16,
    title: 'Misi 16: Intip Kode Rahasia Karakter (ASCII)',
    mission: 'Cari kode angka dari huruf `"P"` menggunakan fungsi `ord("P")` dan cetak ke layar.',
    starterCode: '# Cari nilai angka dari huruf "P":\n',
    hint: 'Tulis kode_p = ord("P") lalu print(kode_p)',
    validate: (output, code) => {
      if (!code.includes('ord')) {
        return { pass: false, message: 'Gunakan fungsi ord("P") untuk mencari nilai angka huruf P.' };
      }
      if (!output.includes('80')) {
        return { pass: false, message: 'Nilai ord("P") di tabel karakter ASCII adalah 80. Pastikan tercetak!' };
      }
      return { pass: true, message: 'Kunci sandi kriptografi huruf P berhasil dipecahkan (80)! 🕵️' };
    },
  },
  {
    chapter: 17,
    title: 'Misi 17: Hitung Sudut Segi-6 Beraturan',
    mission: 'Untuk menggambar segi-6 beraturan, sudut belok adalah `360 / 6`. Hitung dan cetak nilai sudut tersebut.',
    starterCode: 'jumlah_sisi = 6\n\n# Hitung sudut belok (360 / jumlah_sisi) dan cetak:\n',
    hint: 'sudut = 360 / jumlah_sisi lalu print(sudut)',
    validate: (output, code) => {
      if (!output.includes('60')) {
        return { pass: false, message: 'Sudut segi-6 adalah 60 (360 dibagi 6). Pastikan dicetak ke layar!' };
      }
      return { pass: true, message: 'Kalkulasi geometri kanvas Turtle Graphics akurat! 🎨' };
    },
  },
  {
    chapter: 18,
    title: 'Misi 18: Ekstrak Angka dengan Regex',
    mission: 'Gunakan `re.findall(r"\\d+", teks)` untuk mengambil semua angka dari kalimat `"Beli 3 buku dan 5 pensil"`. Cetak list hasilnya.',
    starterCode: 'import re\n\nteks = "Beli 3 buku dan 5 pensil"\n# Temukan semua angka dengan re.findall:\n',
    hint: 'angka = re.findall(r"\\d+", teks) lalu print(angka)',
    validate: (output, code) => {
      if (!code.includes('findall')) {
        return { pass: false, message: 'Gunakan re.findall(...) untuk menyaring pola angka.' };
      }
      if (!output.includes('3') || !output.includes('5')) {
        return { pass: false, message: 'List angka [\'3\', \'5\'] belum tercetak lengkap.' };
      }
      return { pass: true, message: 'Kacamata detektif pola Regex berhasil menyaring seluruh angka! 🔍' };
    },
  },
  {
    chapter: 19,
    title: 'Misi 19: Validasi Pilihan Game',
    mission: 'Diberikan `opsi = ["batu", "gunting", "kertas"]`. Cek apakah `"batu"` ada di dalam `opsi` menggunakan kata kunci `in`, lalu cetak hasilnya (`True`).',
    starterCode: 'opsi = ["batu", "gunting", "kertas"]\n\n# Cek apakah "batu" in opsi dan cetak:\n',
    hint: 'print("batu" in opsi)',
    validate: (output, code) => {
      if (!code.includes(' in ')) {
        return { pass: false, message: 'Gunakan kata kunci "in" untuk mengecek keanggotaan list.' };
      }
      if (!output.includes('True')) {
        return { pass: false, message: 'Hasil pengecekan seharusnya mencetak True.' };
      }
      return { pass: true, message: 'Logika validasi game interaktif lulus uji coba! 🎮' };
    },
  },
  {
    chapter: 20,
    title: 'Misi 20: Total Pengeluaran Kas Keuangan',
    mission: 'Diberikan dictionary kas `pengeluaran = {"makan": 30000, "transport": 20000}`. Hitung totalnya menggunakan `sum(pengeluaran.values())` dan cetak.',
    starterCode: 'pengeluaran = {"makan": 30000, "transport": 20000}\n\n# Hitung total seluruh nilai dengan sum() dan cetak:\n',
    hint: 'total = sum(pengeluaran.values()) lalu print(total)',
    validate: (output, code) => {
      if (!code.includes('values')) {
        return { pass: false, message: 'Gunakan pengeluaran.values() untuk mengambil semua angka pengeluaran.' };
      }
      if (!output.includes('50000')) {
        return { pass: false, message: 'Total pengeluaran adalah 50000 (30000 + 20000). Pastikan tercetak!' };
      }
      return { pass: true, message: 'Luar biasa! Capstone selesai dan seluruh 20 tantangan Pyto tuntas! 🏆🌟' };
    },
  },
];

export function getChallengeForChapter(chapterNum) {
  return challenges.find((c) => c.chapter === chapterNum) || null;
}
