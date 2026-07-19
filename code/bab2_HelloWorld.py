"""
Bab 2: Menyapa Dunia dengan print() 🐍
=======================================
Belajar membuat Python "berbicara" menggunakan perintah print().
"""

# print() adalah perintah untuk menampilkan tulisan ke layar
print("Halo, Dunia!")

# Kamu bisa mencetak banyak baris sekaligus - satu print() untuk satu baris
print("Ini baris pertama")
print("Ini baris kedua")
print("Ini baris ketiga")

# print() juga bisa menampilkan angka, tidak harus tulisan
print(7)
print(3.14)

# Kamu bisa menggabungkan beberapa hal dalam satu print(), dipisah koma
print("Umurku", 10, "tahun")
print("Aku punya", 3, "ekor kucing dan", 1, "ekor anjing")


# 🎮 Main Yuk!
# Coba buat Python mencetak nama, hobi, dan makanan favoritmu di 3 baris terpisah!
print("Namaku Budi")
print("Hobiku bermain sepak bola")
print("Makanan favoritku nasi goreng")


# 🔍 Tahu Lebih
# print() punya "pengaturan rahasia" bernama sep dan end.
# sep menentukan pemisah antar item, end menentukan akhir baris.
print("Pisang", "Apel", "Jeruk", sep=" - ")   # hasil: Pisang - Apel - Jeruk
print("Tanpa pindah baris otomatis", end=" >> ")
print("lanjut di sini!")