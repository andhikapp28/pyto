"""
Bab 5: Angka & Hitung-hitungan 🔢
=================================
Pyto berubah jadi kalkulator pintar! Kita akan belajar mengubah teks
menjadi angka sungguhan lewat int() dan float(), menguasai operator
hitung (+, -, *, /, //, %, **), dan membuat kalkulator mini sendiri.
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


# 1. Membereskan Jebakan Bab 4: int() dan float() -----------------------------
# Di Bab 4, input() memberi teks "10". Supaya bisa dihitung, kita bungkus
# dengan fungsi int() untuk bilangan bulat atau float() untuk desimal.
teks_angka = "10"
angka_bulat = int(teks_angka)

print("--- 1. Konversi Teks ke Angka ---")
print(f"Sebelum dibungkus int()   : {repr(teks_angka)} (tipe {type(teks_angka).__name__})")
print(f"Setelah dibungkus int()   : {angka_bulat} (tipe {type(angka_bulat).__name__})")
print(f"Sekarang bisa dijumlahkan : {angka_bulat} + 5 = {angka_bulat + 5} 🎉")

# Untuk angka yang berkoma/desimal, gunakan float():
teks_desimal = "15.5"
angka_desimal = float(teks_desimal)
print(f"Teks desimal '{teks_desimal}' diubah jadi float: {angka_desimal}")


# 2. Empat Operator Matematika Dasar (+, -, *, /) ----------------------------
print("\n--- 2. Empat Operator Dasar ---")
a = 12
b = 4

print(f"{a} + {b} = {a + b}   (Penjumlahan)")
print(f"{a} - {b} = {a - b}   (Pengurangan)")
print(f"{a} * {b} = {a * b}  (Perkalian)")
print(f"{a} / {b} = {a / b} (Pembagian)")
# 💡 Catatan Pyto: Pembagian dengan garis miring (/) SELALU menghasilkan
# angka desimal (float), bahkan jika bilangannya habis dibagi (12 / 4 -> 3.0)!


# 3. Tiga Operator Super Tambahan (//, %, **) --------------------------------
print("\n--- 3. Tiga Operator Tambahan ---")
x = 14
y = 4

# // Pembagian bulat (floor division) - membuang angka di belakang koma
print(f"{x} // {y} = {x // y}   (Pembagian bulat, desimalnya dibuang)")

# % Modulo (sisa bagi) - mencari sisa setelah dibagi habis
print(f"{x} % {y}  = {x % y}   (Sisa pembagian 14 dibagi 4, yaitu bersisa 2)")

# ** Pangkat (eksponen)
print(f"2 ** 3  = {2 ** 3}   (2 dipangkatkan 3: 2 * 2 * 2 = 8)")


# 4. Proyek Mini: Kalkulator Dua Angka ----------------------------------------
print("\n--- 4. Kalkulator Mini Pyto ---")
input_1 = tanya("Masukkan angka pertama : ", "20")
input_2 = tanya("Masukkan angka kedua   : ", "5")

# Ubah teks input menjadi angka (bisa bulat atau desimal):
n1 = float(input_1)
n2 = float(input_2)

print(f"Hasil Tambah ({n1} + {n2}) : {n1 + n2}")
print(f"Hasil Kurang ({n1} - {n2}) : {n1 - n2}")
print(f"Hasil Kali   ({n1} * {n2}) : {n1 * n2}")
if n2 != 0:
    print(f"Hasil Bagi   ({n1} / {n2}) : {n1 / n2}")
else:
    print("Pembagian dengan angka 0 tidak bisa dilakukan!")


# 🎮 Main Yuk! ----------------------------------------------------------------
print("\n--- 🎮 Main Yuk! ---")
# Menghitung usia di masa depan dan total harga jajan:
usia_sekarang = int(tanya("Berapa usiamu sekarang? ", "10"))
usia_5_tahun_lagi = usia_sekarang + 5
print(f"Wah, dalam 5 tahun lagi usiamu akan menjadi {usia_5_tahun_lagi} tahun!")

harga_permen = 1500
jumlah_beli = 3
total_bayar = harga_permen * jumlah_beli
print(f"Beli {jumlah_beli} permen @ Rp{harga_permen} = Total Rp{total_bayar}")


# 🔍 Tahu Lebih --------------------------------------------------------------
print("\n--- 🔍 Tahu Lebih ---")
# 1. Mengecek ganjil atau genap dengan modulo (%):
#    Jika angka % 2 bernilai 0, maka angka tersebut GENAP.
#    Jika bersisa 1, maka angka tersebut GANJIL.
angka_tes = 7
print(f"Apakah {angka_tes} genap? Sisa bagi 2 adalah {angka_tes % 2} (maka ganjil)")

# 2. Urutan Berhitung (Kabataku):
#    Python mendahulukan tanda kurung (), lalu perkalian/pembagian (*, /),
#    baru penjumlahan/pengurangan (+, -).
hasil_tanpa_kurung = 2 + 3 * 4     # 2 + 12 = 14
hasil_dengan_kurung = (2 + 3) * 4   # 5 * 4 = 20
print(f"2 + 3 * 4   = {hasil_tanpa_kurung} (kali jalan duluan)")
print(f"(2 + 3) * 4 = {hasil_dengan_kurung} (kurung jalan duluan)")

# 3. Batas int(): int("abc") atau int("15.5") langsung pada teks desimal akan error!
#    Teks berdesimal harus lewat float("15.5") dulu baru int(15.5).
