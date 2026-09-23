"""
Bab 7: Ulang-ulang (Loop) 🔁
=============================
Komputer adalah pekerja yang luar biasa tekun: ia bisa mengulang tugas
ribuan kali tanpa pernah bosan atau capek. Di bab ini, kita belajar dua
senjata perulangan di Python: for dan while!
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


# 1. Perulangan for + range() ------------------------------------------------
# Cocok dipakai saat kita sudah tahu berapa kali mau mengulang.
# ⚠️ PENTING: range(1, 6) menghasilkan angka 1 sampai 5. Angka 6 TIDAK IKUT!
print("--- 1. Perulangan for dengan range() ---")
for angka in range(1, 6):
    print(f"Lompatan Pyto ke-{angka} 🐍")

# Jika cuma satu angka, range(3) mulai dari 0 sampai 2 (total 3 kali):
print("\nrange(3) dimulai dari angka 0:")
for i in range(3):
    print(f"Nilai i: {i}")


# 2. Perulangan while: Mengulang Selama Syarat Masih Benar --------------------
# while akan berputar SELAMA kondisinya bernilai True.
# Begitu kondisinya menjadi False, perulangan berhenti.
print("\n--- 2. Perulangan while ---")
hitung = 1
while hitung <= 3:
    print(f"Putaran while ke-{hitung}")
    # ⚠️ JANGAN LUPA memperbarui variabel hitung di dalam blok!
    # Kalau baris ini lupa ditulis, komputer akan mengulang selamanya (infinite loop).
    hitung = hitung + 1

print("Selesai! Syarat hitung <= 3 sudah tidak terpenuhi lagi.")


# 3. Kontrol Perulangan: break dan continue ----------------------------------
print("\n--- 3. Mengontrol Loop (break & continue) ---")

# a. break -> Menghentikan paksa perulangan seketika
print("Mencari angka target (stop di angka 3):")
for nomor in range(1, 6):
    if nomor == 3:
        print("  -> Angka 3 ditemukan! Berhenti sekarang (break).")
        break
    print(f"  Memeriksa nomor {nomor}...")

# b. continue -> Melewatkan putaran ini dan lanjut ke putaran berikutnya
print("\nMelewatkan angka 2 (continue):")
for nomor in range(1, 5):
    if nomor == 2:
        print("  -> Nomor 2 dilewati!")
        continue
    print(f"  Memproses nomor {nomor}...")


# 🎮 Main Yuk! ----------------------------------------------------------------
print("\n--- 🎮 Main Yuk! ---")
# 1. Hitung mundur roket peluncuran:
print("Hitung mundur roket Pyto: 🚀")
for detik in range(5, 0, -1):
    print(f"{detik}...")
print("💥 WUUUSH! Roket meluncur ke angkasa!\n")

# 2. Perulangan sesuai keinginanmu:
kali = int(tanya("Mau cetak sapaan berapa kali? (misal 3): ", "3"))
for n in range(1, kali + 1):
    print(f"[{n}] Aku makin jago belajar Python! 🐍✨")


# 🔍 Tahu Lebih --------------------------------------------------------------
print("\n--- 🔍 Tahu Lebih ---")
# 1. Parameter ketiga range(awal, batas, langkah/step):
#    range(2, 11, 2) artinya lompat 2 angka (mencetak bilangan genap)
print("Bilangan genap dari 2 sampai 10:")
for genap in range(2, 11, 2):
    print(genap, end=" ")
print()

# 2. Menghitung total dengan akumulator:
total_kelereng = 0
for kantong in [5, 3, 7]:
    total_kelereng += kantong
print(f"Total kelereng dari 3 kantong: {total_kelereng}")
