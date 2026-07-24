"""
Bab 12: Data dari Internet (API & JSON) 🌐
============================================
Banyak layanan online mau membagikan data GRATIS - asal kamu tahu cara
memintanya dengan sopan. Caranya lewat API, dan hasilnya berbentuk
dictionary yang sudah kamu kenal dari Bab 11!

Catatan: berkas ini butuh paket `requests` dan koneksi internet aktif.
Install dulu lewat terminal:
    pip install requests
"""

import requests

# Minta data cuaca Jakarta dari Open-Meteo (API gratis, tanpa API key)
respons = requests.get(
    "https://api.open-meteo.com/v1/forecast?latitude=-6.2&longitude=106.8&current_weather=true"
)
data = respons.json()

print(data)


# JSON yang dibalas otomatis jadi dictionary biasa begitu diambil lewat .json()
cuaca_sekarang = data["current_weather"]
print(cuaca_sekarang["temperature"])
print(cuaca_sekarang["windspeed"])


# Bungkus jadi mantra sendiri, pakai def - supaya bisa dipanggil ulang
# untuk kota mana pun, tanpa menulis ulang kodenya. Beda dari versi web
# (Pyodide), di sini `requests` berjalan langsung/sinkron, jadi TIDAK
# butuh kata async/await sama sekali - def biasa saja sudah cukup.
def ambil_cuaca(lintang, bujur):
    url = f"https://api.open-meteo.com/v1/forecast?latitude={lintang}&longitude={bujur}&current_weather=true"
    respons = requests.get(url)
    data = respons.json()
    return data["current_weather"]


# Beberapa koordinat kota di Indonesia buat dicoba:
#   Jakarta    : -6.2,  106.8
#   Bandung    : -6.9,  107.6
#   Surabaya   : -7.25, 112.75
#   Medan      :  3.6,   98.7
#   Yogyakarta : -7.8,  110.4

cuaca_jakarta = ambil_cuaca(-6.2, 106.8)
cuaca_bandung = ambil_cuaca(-6.9, 107.6)

print(f"Jakarta: {cuaca_jakarta['temperature']} °C")
print(f"Bandung: {cuaca_bandung['temperature']} °C")


# 🎮 Main Yuk!
# Ganti koordinat di bawah ini dengan koordinat kotamu sendiri (lihat tabel di atas).
cuaca_kotaku = ambil_cuaca(-6.2, 106.8)   # <- ganti dengan lintang, bujur kotamu
print(f"Suhu di kotaku sekarang: {cuaca_kotaku['temperature']} °C")


# 🔍 Tahu Lebih - API lain: foto anjing acak!
respons_anjing = requests.get("https://dog.ceo/api/breeds/image/random")
data_anjing = respons_anjing.json()
print(data_anjing["message"])   # alamat foto anjing, beda tiap kali dijalankan


# ⚠️ Awas - nggak semua situs mau diajak ngobrol!
# Kalau kamu coba alamat API sembarangan yang tidak mengizinkan permintaan
# semacam ini (atau internetmu sedang mati), requests bisa gagal dengan error
# semacam:
#   requests.exceptions.ConnectionError
#   requests.exceptions.HTTPError
# Ini bukan salah kodemu - situsnya memang belum mengizinkannya, atau
# koneksimu sedang bermasalah.
