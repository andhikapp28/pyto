"""
Bab 18: Detektif Teks (Pengenalan Pola/Regex) 🔍
====================================================================
Jadi detektif teks sungguhan: pakai modul `re` bawaan Python untuk
menemukan alamat email tersembunyi di dalam paragraf panjang, dan
memeriksa apakah nomor HP sudah berformat benar - semuanya cuma
dengan mendeskripsikan "bentuk" teks yang dicari, bukan membandingkan
huruf demi huruf secara manual.

Catatan singkat soal web vs desktop: modul `re` adalah bagian INTI
Python (stdlib) - dia jalan persis sama saja baik di browser (lewat
Pyodide, versi web bab ini) maupun di sini, di Python desktop biasa.
Tidak ada perbedaan mekanisme sama sekali seperti turtle-vs-kanvas di
Bab 17 - kode di berkas ini bisa disalin langsung ke versi web dan
akan berjalan identik, begitu juga sebaliknya.
"""

import re
import sys
import time

# Sebagian terminal Windows tidak memakai UTF-8 secara default, jadi
# emoji di beberapa pesan di bawah (✅, ❌, dll.) bisa memicu error
# pencetakan. Baris ini murni Python inti (bukan paket tambahan) dan
# memastikan output emoji tetap aman dicetak di terminal mana pun.
sys.stdout.reconfigure(encoding="utf-8")

# Jeda kecil antar contoh biar sempat kebaca sebelum lanjut ke bagian
# berikutnya - bukan "menunggu manusia", cuma jeda tetap yang pasti
# selesai sendiri (mengikuti gaya bab16/bab17).
JEDA_ANTAR_CONTOH = 1.2


# Kenalan dengan modul re: re.search() dasar -----------------------------
print("=== Kenalan dengan Modul re: Detektif Pola Python ===")

kalimat = "Nomor pesanan saya adalah INV-2024-5871"

if re.search(r"[0-9]+", kalimat):
    print("Ada angka di kalimat ini!")
else:
    print("Tidak ada angka sama sekali.")
# r"[0-9]+" itu polanya: [0-9] artinya "satu karakter angka", dan +
# artinya "satu atau lebih berturut-turut". re.search() menyisir
# seluruh `kalimat` dan berhenti begitu menemukan kecocokan PERTAMA,
# di mana saja letaknya - di sini dia berhenti di "2024" (atau bagian
# angka mana pun yang ditemukan lebih dulu).
time.sleep(JEDA_ANTAR_CONTOH)


# Kotak Inti #1: validasi format nomor HP dengan re.fullmatch() ---------
print()
print("=== Kotak Inti #1: Cek Format Nomor HP dengan re.fullmatch() ===")

pola_hp_valid = r"^08\d{2}-\d{4}-\d{4}$"

daftar_nomor = ["0812-3456-7890", "021-7890123", "08123456789", "0813-9999-0000"]

for nomor in daftar_nomor:
    if re.fullmatch(pola_hp_valid, nomor):
        print(f"{nomor} -> format nomor HP valid ✅")
    else:
        print(f"{nomor} -> BUKAN format nomor HP yang dikenali ❌")
# re.fullmatch() mewajibkan SELURUH teks cocok pola dari awal (^)
# sampai akhir ($), tanpa sisa - itu sebabnya "021-7890123" (bukan
# diawali 08) dan "08123456789" (tanpa tanda hubung) ditolak, walau
# sekilas kelihatan seperti nomor HP juga.
time.sleep(JEDA_ANTAR_CONTOH)


# 🐍 Kata Pyto
# "Bayangkan pola regex itu seperti bentuk anak kunci untuk gembok
#  tertentu. re.search() itu detektif yang santai - dia cuma
#  mengecek 'apakah ada bentuk yang cocok DI MANA SAJA di dalam teks
#  ini?' Tapi re.fullmatch() itu detektif yang teliti banget - dia
#  bertanya 'apakah SELURUH teks ini, dari awal sampai akhir, pas
#  persis dengan bentuk kuncinya, tanpa kelebihan atau kekurangan
#  sedikit pun?' Untuk memvalidasi format (nomor HP harus PAS sesuai
#  aturan), kita butuh detektif yang teliti - itu sebabnya kita pakai
#  fullmatch(), bukan cuma search()."


# ⚠️ Awas - re.match() bukan re.fullmatch() ------------------------------
print()
print("=== ⚠️ Awas: re.match() Bukan re.fullmatch() ===")

# ✗ Jangan begini - pola ini lupa diberi $ di akhir, dan re.match() cuma
# mengecek AWAL teks (pola_ceroboh ini KHUSUS untuk demo ini - beda dari
# pola_hp_valid di Kotak Inti #1, yang sudah punya "$" sendiri dan
# karena itu TIDAK cocok dipakai untuk menunjukkan jebakan re.match()):
pola_ceroboh = r"^08\d{2}-\d{4}-\d{4}"   # <- perhatikan: TIDAK ada $ di akhir!

nomor_aneh = "0812-3456-7890 (WhatsApp saja ya, jangan telepon)"

if re.match(pola_ceroboh, nomor_aneh):
    print("Valid!")
# Valid!   😱 padahal ada tambahan teks aneh di belakang nomornya!

# ✓ Begini benar - re.fullmatch() TETAP aman walau polanya lupa diberi $ di akhir:
if re.fullmatch(pola_ceroboh, nomor_aneh):
    print("Valid!")
else:
    print("Bukan format yang dikenali")
# Bukan format yang dikenali   -- fullmatch() selalu memeriksa sampai
# akhir, apa pun polanya.
time.sleep(JEDA_ANTAR_CONTOH)


# Kotak Inti #2: temukan semua email dengan re.findall() -----------------
print()
print("=== Kotak Inti #2: Menemukan Semua Pola dengan re.findall() ===")

pola_email = r"[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]+"

pesan_pelanggan = (
    "Halo, saya butuh bantuan soal pesanan saya. Bisa dibalas ke "
    "budi.santoso@email.com atau cs.cabang2@toko-baju.co.id ya, terima kasih!"
)

email_ditemukan = re.findall(pola_email, pesan_pelanggan)
print(email_ditemukan)
# ['budi.santoso@email.com', 'cs.cabang2@toko-baju.co.id']
#
# Beda dari re.search() yang berhenti di kecocokan pertama,
# re.findall() menyisir SAMPAI SELESAI dan mengumpulkan SEMUA
# kecocokan jadi satu list - cocok kalau kita tidak tahu sebelumnya
# ada berapa banyak dan di mana letaknya.
time.sleep(JEDA_ANTAR_CONTOH)


# 🎮 Main Yuk! - hitung berapa email yang ditemukan ----------------------
print()
print("=== 🎮 Main Yuk!: Hitung Berapa Email yang Ditemukan ===")

pesan_pelanggan_main_yuk = (
    "Hubungi kami di admin@tokokita.com atau owner@tokokita.com untuk komplain."
)

# Isian yang benar: len - karena re.findall() mengembalikan list,
# tinggal pakai len() dari Bab 8 untuk menghitung jumlah anggotanya.
jumlah_email = len(re.findall(pola_email, pesan_pelanggan_main_yuk))
print(f"Ada {jumlah_email} email ditemukan di pesan ini.")
time.sleep(JEDA_ANTAR_CONTOH)


# 🔎 Tahu Lebih - sensor nomor HP dengan re.sub() -------------------------
print()
print("=== 🔎 Tahu Lebih: Sensor Nomor HP dengan re.sub() ===")

pola_hp_cari = r"08\d{2}-\d{4}-\d{4}"   # perhatikan: TANPA ^ dan $


def sensor_nomor(cocok):
    nomor = cocok.group()
    return nomor[:4] + "-XXXX-XXXX"


pesan_asli = "Nomor WhatsApp saya 0812-3456-7890, silakan hubungi kalau ada pertanyaan."
pesan_tersensor = re.sub(pola_hp_cari, sensor_nomor, pesan_asli)

print(pesan_tersensor)
# Nomor WhatsApp saya 0812-XXXX-XXXX, silakan hubungi kalau ada pertanyaan.
#
# Perhatikan pola_hp_cari di sini TIDAK memakai ^/$ seperti
# pola_hp_valid di Kotak Inti #1 - itu sengaja! Di Kotak Inti #1 kita
# mau MEMVALIDASI (nomor harus PAS sama semua, makanya dikunci
# ^...$), sementara di sini kita mau MENEMUKAN nomor di tengah
# kalimat yang lebih panjang, jadi anchor-nya dilepas supaya re.sub()
# bisa menemukannya di mana saja dalam kalimat.
#
# re.sub() memanggil sensor_nomor(cocok) setiap kali dia menemukan
# kecocokan - cocok.group() mengembalikan teks nomor HP yang
# ditemukan itu sendiri, lalu kita potong 4 karakter pertamanya
# (slicing dari Bab 8) dan tempelkan "-XXXX-XXXX" di belakangnya.
time.sleep(JEDA_ANTAR_CONTOH)


# Coba Sendiri: jadi detektif teks dengan teksmu sendiri ------------------
print()
print("=== Coba Sendiri: Jadi Detektif Teks! ===")
print("Tempel sebuah paragraf, biar Pyto cari semua emailnya. Lalu coba")
print("ketik satu nomor HP untuk dicek formatnya.")
print()

teks = input("Tempel pesan/paragraf yang mau diperiksa: ")
email_ditemukan_sendiri = re.findall(pola_email, teks)

if email_ditemukan_sendiri:
    print(f"Ditemukan {len(email_ditemukan_sendiri)} email:")
    for email in email_ditemukan_sendiri:
        print(f"- {email}")
else:
    print("Tidak ada email ditemukan di teks ini.")

nomor_hp = input("Sekarang coba ketik satu nomor HP (format 08xx-xxxx-xxxx): ")
if re.fullmatch(pola_hp_valid, nomor_hp):
    print(f"{nomor_hp} -> format nomor HP valid ✅")
else:
    print(f"{nomor_hp} -> BUKAN format nomor HP yang dikenali ❌ (harus 08xx-xxxx-xxxx)")

print()
print("Selesai! Kamu resmi jadi detektif teks Pyto, siap menemukan pola")
print("tersembunyi di teks apa pun 🔍")
