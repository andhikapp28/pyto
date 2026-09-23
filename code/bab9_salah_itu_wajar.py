"""
Bab 9: Salah itu Wajar (Error & Memperbaiki) 🔍
===============================================
Jangan panik kalau programmu menampilkan tulisan merah berbaris-baris!
Semua programmer hebat di dunia pernah bertemu error setiap hari.
Pesan error (Traceback) bukanlah bencana, melainkan petunjuk detektif dari
Python agar kita tahu persis di mana letak masalahnya dan cara membetulkannya.
"""

import sys

# Memastikan tampilan teks dan emoji aman di berbagai terminal
if sys.stdout.encoding and sys.stdout.encoding.lower() != "utf-8":
    try:
        sys.stdout.reconfigure(encoding="utf-8")
    except Exception:
        pass


print("Selamat datang di Laboratorium Detektif Pyto! 🐍🔎")
print("Kita akan membedah pesan error agar tidak lagi terasa menakutkan.\n")


# 1. Tiga Pertanyaan Emas Membaca Pesan Error (Traceback) ---------------------
# Saat terjadi error, Python memberikan 3 informasi penting:
#   1. DI MANA masalahnya?   -> Lihat tulisan: File "...", line X
#   2. KODE APA yang salah?  -> Baris kode yang dikutip ulang oleh Python
#   3. KENAPA bermasalah?    -> Jenis error dan pesan penjelasannya di baris TERBAWAH
#
# 💡 Trik Rahasia Pyto:
# Saat melihat error panjang, JANGAN BACA DARI ATAS!
# Langsung lompat ke BARIS PALING BAWAH untuk tahu jenis dan penyebabnya!


# 2. Lima Jenis Error Paling Umum bagi Pemula --------------------------------
# Di bawah ini kita sengaja memicu masing-masing error di dalam blok try-except,
# agar kamu bisa melihat pesan aslinya tanpa membuat skrip ini macet.

print("--- Membedah 5 Error Paling Populer ---")

# Kasus 1: NameError (Salah ketik atau lupa bikin variabel)
print("\n[Kasus 1: NameError]")
nama = "Kirana"
try:
    # Sengaja salah ketik jadi 'nam':
    print(nam)  # type: ignore  # noqa: F821
except NameError as e:
    print(f"Pesan Python : {type(e).__name__}: {e}")
    print("Artinya      : Python mencari kotak bernama 'nam', tapi tidak ada.")
    print("Solusi       : Periksa ejaan nama variabelmu (mungkin typo dari 'nama')!")

# Kasus 2: TypeError (Mencampur tipe data yang tidak cocok)
print("\n[Kasus 2: TypeError]")
umur_teks = "10"
try:
    # Sengaja mencampur teks dengan angka menggunakan '+':
    hasil = umur_teks + 5
except TypeError as e:
    print(f"Pesan Python : {type(e).__name__}: {e}")
    print("Artinya      : Teks ('str') dan angka ('int') tidak bisa langsung dijumlahkan.")
    print("Solusi       : Ubah dulu teksnya jadi angka: int(umur_teks) + 5")

# Kasus 3: ValueError (Tipe cocok tapi isinya tidak masuk akal)
print("\n[Kasus 3: ValueError]")
kata = "kucing"
try:
    # Memaksa teks huruf diubah menjadi angka bulat:
    angka = int(kata)
except ValueError as e:
    print(f"Pesan Python : {type(e).__name__}: {e}")
    print("Artinya      : 'kucing' adalah huruf, tidak ada angka yang bisa diambil!")
    print("Solusi       : Pastikan teks yang dimasukkan ke int() benar-benar angka.")

# Kasus 4: IndexError (Memanggil nomor urut di luar batas list)
print("\n[Kasus 4: IndexError]")
buah = ["Apel", "Jeruk"]
try:
    # List cuma punya 2 item (indeks 0 dan 1), tapi kita panggil indeks 5:
    print(buah[5])
except IndexError as e:
    print(f"Pesan Python : {type(e).__name__}: {e}")
    print("Artinya      : Kamu memanggil laci nomor 5, padahal lemarinya cuma punya 2 laci!")
    print(f"Solusi       : Cek panjang list pakai len(buah), panjangnya cuma {len(buah)}.")

# Kasus 5: SyntaxError (Tata bahasa Python dilanggar)
print("\n[Kasus 5: SyntaxError]")
# SyntaxError terjadi sebelum kode dijalankan (saat Python membaca susunan kalimat).
# Contoh paling umum: lupa tanda titik dua (:) di akhir baris if atau while!
kode_rusak = "if 5 > 2\n    print('Halo')"
try:
    compile(kode_rusak, "<string>", "exec")
except SyntaxError as e:
    print(f"Pesan Python : {type(e).__name__}: {e.msg} (di baris {e.lineno})")
    print("Artinya      : Kalimat kode belum sesuai aturan baku Python.")
    print("Solusi       : Jangan lupa tambahkan titik dua (:) di ujung baris if/for/while!")


# 🎮 Main Yuk! Jadi Detektif Bug ----------------------------------------------
print("\n--- 🎮 Main Yuk! Detektif Bug Beraksi ---")
# Kode di bawah ini awalnya punya 3 bug. Sekarang sudah diperbaiki oleh Detektif Pyto!
# Coba perhatikan perbaikannya:

# Bug 1 (typo nama):
skor = 100
print(f"✓ Skor berhasil dibaca: {skor}")  # tadinya: print(skorr)

# Bug 2 (konversi angka):
input_poin = "25"
total = skor + int(input_poin)  # tadinya: skor + input_poin
print(f"✓ Total skor setelah ditambah poin: {total}")

# Bug 3 (indeks aman):
koleksi = ["Bintang", "Mahkota"]
print(f"✓ Hadiah pertama: {koleksi[0]}")  # tadinya: koleksi[2]


# 🔍 Tahu Lebih --------------------------------------------------------------
print("\n--- 🔍 Tahu Lebih ---")
# 1. ZeroDivisionError: Pembagian dengan angka nol
#    Dalam matematika, kita tidak bisa membagi bilangan dengan nol!
try:
    hitung = 10 / 0
except ZeroDivisionError as e:
    print(f"Peringatan matematika: {type(e).__name__} -> {e}")
    print("Komputer bingung jika diminta membagi sesuatu dengan angka 0.")

# 2. Penanganan Error dengan try...except:
#    Kamu bisa memakai try-except untuk mencegah programmu tiba-tiba 'crash'
#    saat menghadapi input yang tidak terduga dari pengguna.
input_pengguna = "bukan_angka"
if not input_pengguna.isdigit():
    print("Pyto mendeteksi input bukan angka, program tetap berjalan tenang! ✨")
