"""
Bab 14: Bikin Barcode Ajaib (QR Code) 📱
===========================================
Kode kotak-kotak hitam-putih yang bisa dipindai kamera HP beneran!
Kita bikin QR Code dari teks biasa, dari alamat website, sampai QR Code
yang punya logo kecil di tengahnya - dan tetap bisa dipindai.

Catatan: berkas ini butuh paket qrcode dan Pillow (di balik layar,
qrcode memakai Pillow untuk menggambar gambarnya). Install dulu lewat
terminal:
    pip install qrcode Pillow

Soal logo (dipakai di bagian "Tahu Lebih" saja): kalau kamu sudah
punya gambar logo sendiri, taruh file bernama "logo_contoh.png" di
folder yang sama dengan berkas ini SEBELUM menjalankannya - kodenya
otomatis memakai logo itu. Kalau belum punya, tenang saja - berkas ini
otomatis membuatkan logo contoh sederhana (kotak biru bertuliskan "Py")
memakai Pillow sendiri, supaya tetap bisa dijalankan dari nol tanpa
aset apa pun.
"""

import os

import qrcode
from qrcode.constants import ERROR_CORRECT_H
from PIL import Image, ImageDraw

# Ketik teks, jadi kode kotak-kotak -----------------------------------
# qrcode.make(teks) mengubah teks apa saja jadi gambar QR Code.
pesan = "Halo, aku Pyto!"
kode_qr = qrcode.make(pesan)
kode_qr.save("hasil_qr_sederhana.png")
print("QR Code sederhana disimpan sebagai hasil_qr_sederhana.png")


# QR Code untuk alamat website -----------------------------------------
# Kalau isinya kebetulan alamat website, kebanyakan kamera HP otomatis
# menawarkan "buka tautan" begitu berhasil memindai.
alamat_website = "https://www.python.org"
kode_qr_website = qrcode.make(alamat_website)
kode_qr_website.save("hasil_qr_website.png")
print("QR Code alamat website disimpan sebagai hasil_qr_website.png")


# ⚠️ Awas - teks kepanjangan bikin pola QR makin padat & susah dipindai
teks_pendek = "Halo!"
teks_panjang = (
    "Ini teks yang sangat sangat panjang sekali, isinya bertele-tele "
    "dan sebenarnya tidak perlu semuanya dimasukkan ke dalam satu kode QR..."
)
kode_qr_pendek = qrcode.make(teks_pendek)
kode_qr_panjang = qrcode.make(teks_panjang)
print(f"Ukuran gambar QR dari teks pendek : {kode_qr_pendek.size}")
print(f"Ukuran gambar QR dari teks panjang: {kode_qr_panjang.size}")
# Semakin besar ukurannya, semakin padat & rumit pola kotak-kotaknya -
# makin gampang gagal dipindai kalau dicetak kecil atau difoto dari jauh.
# Aturan aman: kalau alamat website, singkat dulu; kalau pesan, seperlunya saja.


# 🎮 Main Yuk!
# Ganti pesannya jadi kalimat pilihanmu sendiri, lalu simpan hasilnya.
pesan_ku = "Ini kode QR buatan Kirana!"   # <- ganti dengan kalimatmu sendiri
kode_qr_ku = qrcode.make(pesan_ku)
kode_qr_ku.save("hasil_qr_main_yuk.png")


# 🔍 Tahu Lebih - tempel logo di tengah kode QR
# Kalau file logo_contoh.png belum ada, buatkan placeholder sederhana dulu
# pakai Pillow sendiri, supaya bagian ini tetap bisa dijalankan tanpa
# perlu mendownload/menyiapkan aset dari luar.
if not os.path.exists("logo_contoh.png"):
    logo_placeholder = Image.new("RGB", (200, 200), "steelblue")
    gambar_logo = ImageDraw.Draw(logo_placeholder)
    gambar_logo.text((70, 90), "Py", fill="white")
    logo_placeholder.save("logo_contoh.png")
    print("Belum ada logo_contoh.png, jadi dibuatkan logo contoh sederhana otomatis.")
    print("(Mau pakai logo sendiri? Ganti file logo_contoh.png ini dengan logomu.)")

logo = Image.open("logo_contoh.png").convert("RGB")

# error_correction=ERROR_CORRECT_H bikin kode QR tahan sampai ~30%
# areanya rusak/tertutup - cukup aman untuk ditempeli logo kecil di tengah.
qr = qrcode.QRCode(error_correction=ERROR_CORRECT_H, box_size=10, border=4)
qr.add_data("https://www.python.org")
qr.make(fit=True)

kode_qr_logo = qr.make_image(fill_color="black", back_color="white").convert("RGB")

logo_kecil = logo.resize((60, 60))
posisi_x = (kode_qr_logo.size[0] - 60) // 2
posisi_y = (kode_qr_logo.size[1] - 60) // 2
kode_qr_logo.paste(logo_kecil, (posisi_x, posisi_y))

kode_qr_logo.save("hasil_qr_logo.png")
print("QR Code dengan logo di tengah disimpan sebagai hasil_qr_logo.png")
