"""
Bab 6: Kalau Begini, Maka Begitu (if) 🚦
=========================================
Program kita sekarang bisa berpikir dan mengambil keputusan!
Dengan perintah if, elif, dan else, Python bisa memilih jalan mana yang
harus diambil berdasarkan syarat yang kita tentukan.
"""

import sys

# Memastikan tampilan teks dan emoji aman di berbagai terminal
if sys.stdout.encoding and sys.stdout.encoding.lower() != "utf-8":
    try:
        sys.stdout.reconfigure(encoding="utf-8")
    except Exception:
        pass


def tanya(pesan, contoh=""):
    """
    Fungsi pembantu: meminta input dari pengguna lewat terminal.
    Jika dijalankan secara otomatis / non-interaktif, fungsi ini akan memakai
    nilai contoh agar program tetap berjalan lancar tanpa macet.
    """
    if sys.stdin and sys.stdin.isatty():
        try:
            jawaban = input(pesan)
            if jawaban.strip():
                return jawaban
            return contoh
        except (EOFError, KeyboardInterrupt):
            print(f"{contoh}  # (nilai otomatis)")
            return contoh
    print(f"{pesan}{contoh}  # (nilai otomatis)")
    return contoh


# 1. Keputusan Paling Dasar: if ----------------------------------------------
# if artinya "kalau". Baris di bawah if hanya dijalankan KALAU syaratnya True.
# Perhatikan titik dua (:) di akhir baris dan indentasi (4 spasi ke dalam)!
cuaca = "hujan"

print("--- 1. Keputusan Dasar (if) ---")
if cuaca == "hujan":
    print("Langit mendung dan hujan... Jangan lupa bawa payung! ☔")

# Baris ini tidak menjorok, jadi SELALU dijalankan setelah blok if selesai:
print("Pyto siap melanjutkan perjalanan.")


# 2. Operator Perbandingan ----------------------------------------------------
# Membandingkan dua nilai menghasilkan True (Benar) atau False (Salah).
# ⚠️ HATI-HATI: Jangan tertukar antara '=' dan '=='!
#   =   -> memasukkan isi ke dalam kotak variabel (Bab 3)
#   ==  -> membandingkan: "apakah isi dua kotak ini sama persis?"
print("\n--- 2. Operator Perbandingan ---")
angka = 10
print(f"Apakah {angka} == 10? : {angka == 10}  (Sama dengan)")
print(f"Apakah {angka} != 5?  : {angka != 5}   (Tidak sama dengan)")
print(f"Apakah {angka} > 7?   : {angka > 7}   (Lebih besar dari)")
print(f"Apakah {angka} < 20?  : {angka < 20}   (Lebih kecil dari)")
print(f"Apakah {angka} >= 10? : {angka >= 10}  (Lebih besar atau sama dengan)")
print(f"Apakah {angka} <= 8?  : {angka <= 8}  (Lebih kecil atau sama dengan)")


# 3. Banyak Pilihan: if, elif, dan else ---------------------------------------
# Python mengecek dari atas ke bawah. Begitu ada SATU cabang yang benar,
# cabang berikutnya dilewati dan diabaikan!
print("\n--- 3. Pengecekan Umur & Nilai ---")
input_umur = tanya("Berapa umurmu? ", "17")
umur = int(input_umur)

if umur >= 17:
    print(f"Umurmu {umur} tahun: Kamu sudah boleh membuat SIM! 🚗")
elif umur >= 15:
    print(f"Umurmu {umur} tahun: Sebentar lagi boleh punya SIM, belajar dulu ya! 🚲")
else:
    print(f"Umurmu {umur} tahun: Belum cukup umur untuk bikin SIM. Sabar ya! 🛴")

# Contoh kedua: Evaluasi Nilai Ujian
nilai = 82
print(f"\nNilai ujian: {nilai}")
if nilai >= 90:
    print("Predikat: Luar Biasa! (Nilai A) 🌟")
elif nilai >= 75:
    print("Predikat: Bagus Sekali! (Nilai B) 👍")
elif nilai >= 60:
    print("Predikat: Cukup Baik, terus berlatih ya! (Nilai C) 📖")
else:
    print("Predikat: Jangan menyerah, ayo coba lagi! (Nilai D) 💪")


# 4. Menggabungkan Syarat: and & or ------------------------------------------
print("\n--- 4. Logika Gabungan (and & or) ---")
punya_tiket = True
pakai_seragam = False

# and -> KEDUA syarat HARUS bernilai True
if punya_tiket and pakai_seragam:
    print("Boleh masuk ke area konser sekolah! 🎟️")
else:
    print("Belum boleh masuk: syarat tiket DAN seragam harus terpenuhi keduanya.")

# or -> SALAH SATU syarat bernilai True sudah cukup
punya_kartu_member = False
punya_kupon_diskon = True

if punya_kartu_member or punya_kupon_diskon:
    print("Selamat! Kamu berhak mendapatkan diskon belanja! 🏷️")
else:
    print("Harga normal, tidak ada diskon.")


# 🎮 Main Yuk! ----------------------------------------------------------------
print("\n--- 🎮 Main Yuk! Lampu Lalu Lintas ---")
warna_lampu = tanya("Masukkan warna lampu (merah/kuning/hijau): ", "kuning").lower()

if warna_lampu == "merah":
    print("🔴 BERHENTI! Tunggu sampai lampu berubah hijau.")
elif warna_lampu == "kuning":
    print("🟡 HATI-HATI! Pelan-pelan dan bersiap berhenti.")
elif warna_lampu == "hijau":
    print("🟢 JALAN! Jalan dengan tertib dan utamakan keselamatan.")
else:
    print("⚪ Warna lampu tidak dikenal! Apakah lampunya padam?")


# 🔍 Tahu Lebih --------------------------------------------------------------
print("\n--- 🔍 Tahu Lebih ---")
# 1. Operator 'not' untuk membalik nilai logika:
sedang_tidur = False
if not sedang_tidur:
    print("Pyto sedang bangun dan siap belajar coding! 🐍👀")

# 2. Percabangan di dalam percabangan (Nested if):
angka_rahasia = 8
if angka_rahasia > 0:
    if angka_rahasia % 2 == 0:
        print(f"{angka_rahasia} adalah bilangan positif dan juga GENAP!")
