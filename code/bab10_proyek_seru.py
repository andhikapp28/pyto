"""
Bab 10: Proyek Seru Fase 1 🚀
==============================
Bukan bab konsep baru — ini adalah pesta kelulusan Fase 1!
Kita akan menggabungkan semua kekuatan yang sudah kita pelajari dari Bab 1
sampai Bab 9 (print, variabel, input, angka, percabangan if, loop, list,
dan membaca error) untuk membangun 3 proyek nyata yang seru:
  1. Game Tebak Angka Rahasia 🎯
  2. Kuis Cerdas Cermat Berhadiah Skor 📝
  3. Kalkulator Serbaguna dengan Fungsi Mini (def) 🧮
"""

import random
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


print("======================================================")
print("  🏆 MARKAS BESAR PROYEK FASE 1: BERSAMA PYTO 🐍🤖  ")
print("======================================================\n")


# ----------------------------------------------------------------------------
# 🎯 PROYEK 1: Game Tebak Angka Rahasia
# Menggabungkan: import random, input(), int(), while loop, if-elif-else
# ----------------------------------------------------------------------------
print("--- [Proyek 1] Game Tebak Angka Rahasia ---")
print("Pyto sudah menyembunyikan satu angka rahasia antara 1 sampai 20.")
print("Ayo tebak sampai benar!")

angka_rahasia = random.randint(1, 20)
tebakan = 0
jumlah_tebakan = 0

while tebakan != angka_rahasia:
    jumlah_tebakan += 1
    # Untuk mode otomatis/demo: coba tebak 10 di tebakan awal, lalu tebak tepat
    nilai_demo = 10 if (jumlah_tebakan == 1 and angka_rahasia != 10) else angka_rahasia

    input_tebakan = tanya("Masukkan tebakanmu (1-20): ", str(nilai_demo))
    try:
        tebakan = int(input_tebakan)
    except ValueError:
        print("  ⚠️ Masukkan angka bulat ya, bukan huruf!")
        continue

    if tebakan < angka_rahasia:
        print("  -> Terlalu KECIL! Coba angka yang lebih besar ⬆️")
    elif tebakan > angka_rahasia:
        print("  -> Terlalu BESAR! Coba angka yang lebih kecil ⬇️")
    else:
        print(f"  -> 🎉 TEPAT SEKALI! Angka rahasianya adalah {angka_rahasia}!")
        print(f"  -> Kamu berhasil menebak dalam {jumlah_tebakan} kali percobaan!\n")


# ----------------------------------------------------------------------------
# 📝 PROYEK 2: Kuis Cerdas Cermat (Sistem Skor)
# Menggabungkan: variabel skor, input(), str comparison, list soal, if-elif-else
# ----------------------------------------------------------------------------
print("--- [Proyek 2] Kuis Cerdas Cermat Pyto ---")
print("Jawab 3 pertanyaan di bawah ini untuk mengumpulkan skor!\n")

skor = 0

# Soal 1:
jwb1 = tanya("1. Apa ibu kota negara Indonesia? ", "Jakarta")
if jwb1.strip().title() == "Jakarta":
    print("   ✓ Benar! Nilai +1")
    skor += 1
else:
    print("   ✗ Kurang tepat. Jawabannya adalah Jakarta.")

# Soal 2:
jwb2 = tanya("2. Berapakah hasil dari 15 + 25? ", "40")
if jwb2.strip() == "40":
    print("   ✓ Hebat, hitunganmu tepat! Nilai +1")
    skor += 1
else:
    print("   ✗ Kurang tepat. 15 + 25 = 40.")

# Soal 3:
jwb3 = tanya("3. Apa warna daun tanaman yang sehat pada umumnya? ", "hijau")
if jwb3.strip().lower() == "hijau":
    print("   ✓ Benar sekali! Nilai +1")
    skor += 1
else:
    print("   ✗ Kurang tepat. Warna daun umumnya hijau.")

print(f"\n📊 Hasil Akhir Kuismu: {skor} dari 3 Soal Benar.")
if skor == 3:
    print("🏅 Luar Biasa Sempurna! Kamu pantas jadi Juara Kuis Pyto! 🌟")
elif skor >= 1:
    print("👍 Hasil yang bagus! Terus asah kemampuanmu ya!")
else:
    print("💪 Jangan patah semangat, coba mainkan lagi ya!\n")


# ----------------------------------------------------------------------------
# 🧮 PROYEK 3: Kalkulator Mini Serbaguna dengan def
# Menggabungkan: fungsi (def), float(), operator (+, -, *, /), percabangan
# ----------------------------------------------------------------------------
print("\n--- [Proyek 3] Kalkulator Sederhana dengan Fungsi def ---")


# Kita membungkus logika hitung ke dalam fungsi mini 'def'
def hitung(bilangan_1, bilangan_2, operator):
    """Fungsi mini untuk menghitung dua angka sesuai simbol operator."""
    if operator == "+":
        return bilangan_1 + bilangan_2
    elif operator == "-":
        return bilangan_1 - bilangan_2
    elif operator == "*":
        return bilangan_1 * bilangan_2
    elif operator == "/":
        if bilangan_2 == 0:
            return "Error: Pembagian dengan 0 tidak diperbolehkan!"
        return bilangan_1 / bilangan_2
    else:
        return f"Error: Simbol operator '{operator}' tidak dikenali!"


inp_a = tanya("Masukkan angka pertama : ", "25")
inp_b = tanya("Masukkan angka kedua   : ", "5")
inp_op = tanya("Pilih operator (+, -, *, /): ", "*")

try:
    angka_1 = float(inp_a)
    angka_2 = float(inp_b)
    hasil_kalkulasi = hitung(angka_1, angka_2, inp_op)
    print(f"\n✨ Hasil Perhitungan: {angka_1} {inp_op} {angka_2} = {hasil_kalkulasi}")
except ValueError:
    print("⚠️ Input yang dimasukkan harus berupa angka!")


# 🎮 Main Yuk! ----------------------------------------------------------------
print("\n--- 🎮 Main Yuk! Tantangan Pengembangan ---")
print("Coba kembangkan proyek-proyek ini:")
print("1. Tebak Angka : Ubah random.randint(1, 20) jadi rentang (1, 100)!")
print("2. Kuis        : Buat daftar pertanyaan baru tentang film atau game favoritmu!")
print("3. Kalkulator  : Tambahkan operator perpangkatan '**' atau modulo '%'!")


# 🔍 Tahu Lebih --------------------------------------------------------------
print("\n--- 🔍 Tahu Lebih ---")
# Mengenal Kata Kunci 'def':
# 'def' adalah singkatan dari 'define' (mendefinisikan).
# Fungsinya seperti membuat cetakan stempel: sekali dibuat, stempel tersebut
# bisa dicap berulang kali kapan pun dibutuhkan tanpa menulis ulang rumusnya!
print("Selamat! Kamu telah menuntaskan seluruh petualangan FASE 1! 🎓🎉")
print("Siap untuk melanjutkan ke petualangan Fase 2 di Bab 11!")
