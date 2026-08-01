"""
Bab 20: Kalkulator Keuangan Mini (Capstone) 💰
====================================================================
Bab penutup Fase 2 - dan seperti Bab 19, ini bukan konsep baru dari nol,
tapi menggabungkan alat-alat lama jadi sesuatu yang benar-benar dipakai
orang sungguhan: pencatat keuangan pribadi. dictionary (Bab 11),
input()/int() (Bab 4-5), for (Bab 7), if/else (Bab 6) - semua digabung
jadi satu pencatat transaksi lengkap kategori pengeluaran.

Satu-satunya hal BENAR-BENAR baru di bab ini: matplotlib, perpustakaan
Python paling terkenal untuk menggambar grafik dari data.

Catatan: berkas ini butuh paket matplotlib. Install dulu lewat terminal:
    pip install matplotlib

Catatan soal web vs desktop: versi web bab ini (Pyodide, jalan di
browser) tidak punya jendela GUI ataupun filesystem asli untuk ditulisi
bebas, jadi grafiknya harus digambar ke memori (backend "Agg"), diubah
jadi PNG lewat io.BytesIO(), lalu di-encode base64 supaya bisa dikirim
balik ke JavaScript dan ditampilkan sebagai elemen <img> di halaman -
lihat runPythonInteractiveWithChart() di web/src/scripts/pyodide-runner.js
untuk detail jembatan itu. Di sini, di Python desktop biasa, kita tidak
butuh jembatan seperti itu sama sekali: grafiknya langsung disimpan jadi
file PNG ASLI di folder yang sama dengan berkas ini lewat plt.savefig(),
persis seperti Bab 13 menyimpan hasil olah foto jadi file .jpg asli
(hasil_kecil.jpg, dst). Backend "Agg" tetap dipakai di sini juga, tapi
alasannya beda dari versi web: bukan untuk dikirim lewat jembatan
base64, cuma supaya berkas ini tetap jalan mulus tanpa error di
komputer mana pun (termasuk komputer/server tanpa layar aktif), karena
berkas ini memang tidak pernah membuka jendela grafik (tidak ada
plt.show()) - dia cuma menyimpan file. Kalau kamu menjalankan ini di
komputer dengan layar dan ingin melihat jendela grafik langsung sambil
jalan, hapus baris matplotlib.use("Agg") di bawah dan tambahkan
plt.show() setelah tiap bagian yang menggambar grafik.
"""

import sys
import time

import matplotlib

matplotlib.use("Agg")  # render ke memori, simpan jadi file PNG asli - lihat penjelasan di atas
import matplotlib.pyplot as plt

# Sebagian terminal Windows tidak memakai UTF-8 secara default, jadi
# emoji di beberapa pesan di bawah bisa memicu error pencetakan. Baris
# ini murni Python inti (bukan paket tambahan) dan memastikan output
# emoji tetap aman dicetak di terminal mana pun.
sys.stdout.reconfigure(encoding="utf-8")

# Jeda kecil antar contoh biar sempat kebaca sebelum lanjut ke bagian
# berikutnya - bukan "menunggu manusia", cuma jeda tetap yang pasti
# selesai sendiri (mengikuti gaya bab16/bab18/bab19).
JEDA_ANTAR_CONTOH = 1.2


# Selamat Datang di Penutup Fase 2 ----------------------------------------
print("=== Selamat Datang di Penutup Fase 2: Kalkulator Keuangan Mini ===")
print("Bab ini menggabungkan dictionary + input()/int() + for + if/else jadi")
print("satu pencatat keuangan utuh, ditutup dengan satu konsep baru: matplotlib.")
time.sleep(JEDA_ANTAR_CONTOH)


# Kotak Inti #1, Langkah 1: Siapkan Dompet Kosong -------------------------
print()
print("=== Kotak Inti #1, Langkah 1: Siapkan Dompet Kosong ===")

kategori_pengeluaran = {}
saldo = 0

kategori_pengeluaran["jajan"] = 5000
print(kategori_pengeluaran)
# {'jajan': 5000}

kategori_pengeluaran["jajan"] = kategori_pengeluaran["jajan"] + 3000
print(kategori_pengeluaran)
# {'jajan': 8000}
# kategori_pengeluaran = {} bikin dictionary kosong tanpa satu laci pun -
# tetap sah, cuma belum ada isinya. Baris keempat memakai pola "kotak
# yang bisa ditambah" dari Bab 3 (variabel = variabel + tambahan),
# bedanya sekarang polanya dipakai pada ISI dictionary, bukan variabel
# biasa.
time.sleep(JEDA_ANTAR_CONTOH)


# Kotak Inti #1, Langkah 2: Loop Mencatat Beberapa Transaksi --------------
print()
print("=== Kotak Inti #1, Langkah 2: Loop Mencatat Beberapa Transaksi ===")
print("(Demonstrasi di bawah ini memakai daftar transaksi yang sudah")
print("disiapkan, BUKAN input() sungguhan, supaya bagian ini bisa jalan")
print("otomatis tanpa menunggu. Nanti di bagian 'Coba Sendiri' di akhir")
print("berkas ini, kamu akan mencatat transaksi betulan dari keyboard.)")
print()

saldo = 0
jumlah_transaksi = 3
transaksi_siap_pakai = iter([("masuk", 20000), ("keluar", 5000), ("masuk", 15000)])  # pengganti input()

for i in range(jumlah_transaksi):
    print(f"--- Transaksi ke-{i + 1} ---")
    jenis, jumlah = next(transaksi_siap_pakai)
    jenis = jenis.lower()
    print(f"Jenis (masuk/keluar): {jenis}")
    print(f"Jumlah uangnya (Rp): {jumlah}")

    if jenis == "masuk":
        saldo += jumlah
    else:
        saldo -= jumlah

print(f"Saldo akhir: Rp{saldo}")
# for i in range(jumlah_transaksi): mengulang tanya-jawab sebanyak
# transaksi yang diminta (Bab 7), .lower() menyamakan "Masuk"/"MASUK"/
# "masuk" jadi satu bentuk (Bab 19), dan if/else memilih apakah saldo
# bertambah atau berkurang (Bab 6). Belum ada kategori_pengeluaran di
# sini - itu menyusul sebentar lagi.
time.sleep(JEDA_ANTAR_CONTOH)


# 🐍 Kata Pyto
# "Bayangkan kategori_pengeluaran itu seperti dompet kecilku, dan tiap
#  kategori punya amplop sendiri di dalamnya - amplop 'jajan', amplop
#  'transportasi', amplop 'tabungan'. Tapi bedanya sama lemari Bab 11:
#  kadang aku mendadak butuh amplop yang belum pernah kubuat sebelumnya.
#  Nah, ini yang jadi jebakan kecil kalau tidak hati-hati - ayo aku
#  tunjukkan..."


# ⚠️ Awas - KeyError Muncul Lagi: Kategori Baru yang Belum Ada di Kamus --
print()
print("=== ⚠️ Awas: KeyError Muncul Lagi - Kategori Baru yang Belum Ada ===")

# ✗ Jangan begini - nambah isi laci yang BELUM ADA tanpa .get()
# Ditangkap lewat try/except di sini SUPAYA berkas ini tetap bisa
# jalan sampai selesai (bukan menyembunyikan errornya - errornya
# sungguhan terjadi, cuma ditangkap biar tidak menghentikan skrip).
kategori_pengeluaran_awas = {}
kategori_awas = "jajan"
jumlah_awas = 5000

try:
    kategori_pengeluaran_awas[kategori_awas] += jumlah_awas
except KeyError as e:
    print(f"💥 KeyError: {e}")
    print("Kenapa error, padahal kelihatannya cuma 'menambah angka ke laci'?")
    print("Karena kategori_pengeluaran_awas[kategori_awas] += jumlah_awas sama")
    print("saja dengan ...[kategori_awas] = ...[kategori_awas] + jumlah_awas -")
    print("dan bagian KANAN tanda '=' itu tetap harus MEMBACA isi laci 'jajan'")
    print("dulu sebelum bisa ditambah. Masalahnya, laci 'jajan' belum pernah")
    print("dibuat, jadi Python tidak punya apa-apa untuk dibaca.")

# ✓ Begini benar - pakai .get() supaya kategori baru mulai dari 0 dulu
kategori_pengeluaran_awas = {}
kategori_pengeluaran_awas[kategori_awas] = kategori_pengeluaran_awas.get(kategori_awas, 0) + jumlah_awas
print(kategori_pengeluaran_awas)
# {'jajan': 5000}
# kategori_pengeluaran_awas.get(kategori_awas, 0) artinya: "coba ambil
# isi laci ini - kalau belum ada, anggap saja isinya 0 dulu." Karena
# laci "jajan" memang belum ada, .get() memberi 0 sebagai cadangan,
# lalu 0 + 5000 menghasilkan 5000, dan baris itu langsung membuat laci
# baru "jajan" berisi 5000 - tidak ada error sama sekali.
time.sleep(JEDA_ANTAR_CONTOH)


# Kotak Inti #1 (lanjutan): Loop Lengkap: Saldo + Kategori Pengeluaran ----
print()
print("=== Kotak Inti #1 (lanjutan): Loop Lengkap - Saldo + Kategori ===")
print("(Sama seperti sebelumnya, transaksi di demonstrasi ini memakai")
print("daftar siap pakai, bukan input() sungguhan.)")
print()

kategori_pengeluaran = {}
saldo = 0
jumlah_transaksi = 4
# Tiap transaksi: (jenis, jumlah, kategori). kategori bernilai None kalau
# jenisnya "masuk" (transaksi masuk tidak butuh kategori).
transaksi_lengkap_siap_pakai = iter(
    [
        ("masuk", 50000, None),
        ("keluar", 15000, "jajan"),
        ("keluar", 20000, "transportasi"),
        ("keluar", 5000, "jajan"),
    ]
)

for i in range(jumlah_transaksi):
    print(f"--- Transaksi ke-{i + 1} ---")
    jenis, jumlah, kategori_demo = next(transaksi_lengkap_siap_pakai)
    jenis = jenis.lower()
    print(f"Jenis (masuk/keluar): {jenis}")
    print(f"Jumlah uangnya (Rp): {jumlah}")

    if jenis == "masuk":
        saldo += jumlah
    else:
        kategori = kategori_demo.lower()
        print(f"Kategori pengeluaran: {kategori}")
        saldo -= jumlah
        kategori_pengeluaran[kategori] = kategori_pengeluaran.get(kategori, 0) + jumlah

print()
print("=== RINGKASAN KEUANGAN ===")
print(f"Saldo akhir: Rp{saldo:,}".replace(",", "."))

for kategori, total in kategori_pengeluaran.items():
    print(f"- {kategori}: Rp{total:,}".replace(",", "."))
# Trik kecil di f"Rp{saldo:,}".replace(",", "."): tanda :, di dalam
# kurung kurawal itu format bawaan Python yang menyisipkan koma tiap
# tiga digit (15000 jadi 15,000), lalu .replace(",", ".") menukarnya
# jadi titik supaya sesuai gaya penulisan uang Indonesia (15.000).
time.sleep(JEDA_ANTAR_CONTOH)


# Kotak Inti #2: Menggambar Grafik Pengeluaran dengan matplotlib ----------
print()
print("=== Kotak Inti #2: Menggambar Grafik Pengeluaran dengan matplotlib ===")

kategori_pengeluaran = {"jajan": 25000, "transportasi": 10000, "tabungan": 15000}

nama_kategori = list(kategori_pengeluaran.keys())
total_kategori = list(kategori_pengeluaran.values())

plt.figure()
plt.bar(nama_kategori, total_kategori, color="#2FBF71")
plt.title("Grafik Pengeluaran")
plt.xlabel("Kategori")
plt.ylabel("Jumlah (Rp)")
plt.savefig("bab20_grafik_pengeluaran.png", dpi=110, bbox_inches="tight")
plt.close()
print("Grafik batang tersimpan sebagai 'bab20_grafik_pengeluaran.png'.")
# import matplotlib.pyplot as plt - sama seperti import random di Bab 10,
# ini "memanggil" kotak alat tambahan. nama_kategori/total_kategori
# adalah DUA list sejajar dari dictionary yang sama, jadi urutannya
# selalu cocok. plt.bar(nama_kategori, total_kategori, color="#2FBF71")
# adalah baris yang benar-benar menggambar. Di web, Pyto otomatis
# menangkap gambar ini dan menampilkannya di bawah kolom kode begitu
# programnya selesai jalan (tanpa perlu plt.show()) - di desktop di sini,
# kita simpan sungguhan jadi file PNG lewat plt.savefig() sebagai gantinya.
time.sleep(JEDA_ANTAR_CONTOH)


# 🎮 Main Yuk! - Gambar Grafik Warna Favorit -------------------------------
print()
print("=== 🎮 Main Yuk!: Gambar Grafik Warna Favorit ===")

warna_favorit = {"Hijau": 5, "Biru": 3, "Merah": 2}

plt.figure()
plt.bar(list(warna_favorit.keys()), list(warna_favorit.values()))  # <- isian yang benar: plt.bar
plt.title("Warna Favorit Teman-teman")
plt.savefig("bab20_grafik_warna_favorit.png", dpi=110, bbox_inches="tight")
plt.close()
print("Grafik tersimpan sebagai 'bab20_grafik_warna_favorit.png'.")
# plt.bar() selalu menerima DUA list: yang pertama jadi label tiap
# batang (sumbu mendatar), yang kedua jadi tinggi tiap batang (sumbu
# tegak) - persis pola yang baru saja dipakai untuk grafik pengeluaran.
time.sleep(JEDA_ANTAR_CONTOH)


# 🔎 Tahu Lebih - Ganti Jadi Grafik Lingkaran (Pie Chart) ------------------
print()
print("=== 🔎 Tahu Lebih: Ganti Jadi Grafik Lingkaran (Pie Chart) ===")

warna_pyto = ["#2FBF71", "#4DA6FF", "#FFC94D", "#FF7A6B", "#8B6FE0"]

plt.figure()
plt.pie(
    total_kategori,
    labels=nama_kategori,
    autopct="%1.0f%%",
    colors=warna_pyto,
)
plt.title("Grafik Pengeluaran (Pie)")
plt.savefig("bab20_grafik_pengeluaran_pie.png", dpi=110, bbox_inches="tight")
plt.close()
print("Grafik lingkaran tersimpan sebagai 'bab20_grafik_pengeluaran_pie.png'.")
# labels=nama_kategori menempelkan nama kategori di tiap potongan,
# autopct="%1.0f%%" otomatis menghitung dan menuliskan persentase tiap
# potongan (mis. 42%), dan colors=warna_pyto mengecat tiap potongan
# dengan warna-warna khas Pyto secara berurutan. data-nya (total_kategori,
# nama_kategori) SAMA PERSIS dengan grafik batang di atas - cuma
# plt.bar() diganti plt.pie(), sisanya nyaris tidak berubah.
time.sleep(JEDA_ANTAR_CONTOH)


# Coba Sendiri: catat transaksi sungguhan lewat input() -------------------
print()
print("=== Coba Sendiri: Kalkulator Keuangan Mini ===")
print("Catat transaksimu sungguhan lewat keyboard, lihat ringkasannya, lalu")
print("grafik pengeluaranmu akan disimpan sebagai file PNG asli.")
print()

kategori_pengeluaran = {}
saldo = 0

jumlah_transaksi = int(input("Mau catat berapa transaksi? "))

for i in range(jumlah_transaksi):
    print(f"--- Transaksi ke-{i + 1} ---")
    jenis = input("Jenis (masuk/keluar): ").lower()
    jumlah = int(input("Jumlah uangnya (Rp): "))

    if jenis == "masuk":
        saldo += jumlah
    else:
        kategori = input("Kategori pengeluaran: ").lower()
        saldo -= jumlah
        kategori_pengeluaran[kategori] = kategori_pengeluaran.get(kategori, 0) + jumlah

print()
print("=== RINGKASAN KEUANGAN ===")
print(f"Saldo akhir: Rp{saldo:,}".replace(",", "."))

for kategori, total in kategori_pengeluaran.items():
    print(f"- {kategori}: Rp{total:,}".replace(",", "."))

nama_kategori = list(kategori_pengeluaran.keys())
total_kategori = list(kategori_pengeluaran.values())

plt.figure()
plt.bar(nama_kategori, total_kategori, color="#2FBF71")
plt.title("Grafik Pengeluaran")
plt.xlabel("Kategori")
plt.ylabel("Jumlah (Rp)")
plt.savefig("grafik_pengeluaran.png", dpi=110, bbox_inches="tight")
plt.close()

print()
print("Grafik pengeluaranmu sudah disimpan sebagai 'grafik_pengeluaran.png'")
print("di folder yang sama dengan berkas ini - buka filenya untuk melihat")
print("hasilnya, unduh, tunjukkan ke orang tua, atau cetak sebagai laporan")
print("keuangan mini beneran!")
print()
print("🎉 Kamu baru saja membuat kalkulator keuangan sungguhan, lengkap")
print("dengan grafik pengeluaran - selamat, Fase 2 resmi selesai! 🐍💚")
# ✏️ Catatan: ketik jumlah uangnya polos tanpa titik/koma pemisah ribuan -
# misalnya 5000, bukan 5.000. int() tidak bisa membaca teks yang ada
# titiknya sama sekali, bukan cuma titik desimal (kalau dicoba, muncul
# ValueError, bukan KeyError - beda jenis error dari Kotak Awas di atas).
