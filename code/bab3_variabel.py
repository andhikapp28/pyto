"""
Bab 3: Kotak Ajaib (Variabel) 🐍
=================================
Variabel itu seperti kotak ajaib untuk menyimpan data - bisa diisi,
dilihat isinya, dan diganti isinya kapan saja!
"""

# Membuat variabel: nama_kotak = isi_kotak
nama = "Pyto"
umur = 7
tinggi_cm = 25.5
suka_belajar = True

# Menampilkan isi variabel satu per satu
print(nama)
print(umur)
print(tinggi_cm)
print(suka_belajar)

# Menggabungkan variabel dalam satu kalimat
print("Namaku", nama, "dan umurku", umur, "tahun")

# Isi kotak (variabel) bisa diganti kapan saja
umur = 8
print("Setelah ulang tahun, umurku sekarang", umur, "tahun")


# 🎮 Main Yuk!
# Buat 3 kotak ajaib (variabel) tentang dirimu sendiri, lalu tampilkan!
nama_kamu = "Ganti dengan namamu"
kota_asal = "Ganti dengan kotamu"
hobi = "Ganti dengan hobimu"
print("Aku", nama_kamu, ", tinggal di", kota_asal, ", dan hobiku", hobi)


# 🔍 Tahu Lebih
# Python punya beberapa jenis data dasar yang sering dipakai di variabel:
#   str   -> teks,          contoh: "Pyto"
#   int   -> angka bulat,   contoh: 7
#   float -> angka desimal, contoh: 25.5
#   bool  -> benar/salah,   contoh: True atau False
#
# Kamu bisa cek jenis data suatu variabel dengan fungsi type()
print(type(nama))
print(type(umur))
print(type(tinggi_cm))
print(type(suka_belajar))