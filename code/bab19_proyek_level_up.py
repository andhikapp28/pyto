"""
Bab 19: Proyek Level Up: Game Teks 🎮
====================================================================
Bukan bab konsep baru - ini bab PROYEK GABUNGAN (sintesis). Semua alat
yang sudah kamu kuasai di Fase 1 & 2 (dictionary Bab 11, fungsi Bab 12,
loop Bab 7, random Bab 10) disatukan jadi dua game teks yang benar-benar
bisa dimainkan: Tebak Kata (ala Hangman) dan Batu-Gunting-Kertas dengan
skor berjalan.

Catatan singkat soal web vs desktop: seluruh bab ini cuma memakai
Python inti (stdlib) - modul `random`, `dict`, `def`, dan loop biasa.
Tidak ada paket pihak ketiga, tidak ada canvas, tidak ada file. Kode di
berkas ini jalan IDENTIK PERSIS di browser (lewat Pyodide, versi web
bab ini) maupun di sini, di Python desktop biasa - bahkan lebih
sederhana daripada Bab 18 (modul `re`, tapi tetap stdlib) dan jauh
lebih sederhana daripada Bab 17 (yang punya percabangan turtle-vs-
canvas). Tidak ada satu baris pun yang perlu diubah untuk pindah dari
versi ini ke versi web, atau sebaliknya.
"""

import random
import sys
import time

# Sebagian terminal Windows tidak memakai UTF-8 secara default, jadi
# emoji di beberapa pesan di bawah (❤️, 💔, 🎉, dll.) bisa memicu error
# pencetakan. Baris ini murni Python inti (bukan paket tambahan) dan
# memastikan output emoji tetap aman dicetak di terminal mana pun.
sys.stdout.reconfigure(encoding="utf-8")

# Jeda kecil antar contoh biar sempat kebaca sebelum lanjut ke bagian
# berikutnya - bukan "menunggu manusia", cuma jeda tetap yang pasti
# selesai sendiri (mengikuti gaya bab16/bab18).
JEDA_ANTAR_CONTOH = 1.2


# Selamat Datang: bab proyek gabungan, bukan konsep baru ------------------
print("=== Selamat Datang di Level Up: Waktunya Bikin Game Sungguhan ===")
print("Bab ini menggabungkan dictionary + fungsi + loop + random jadi dua")
print("game teks utuh: Tebak Kata dan Batu-Gunting-Kertas dengan skor.")
time.sleep(JEDA_ANTAR_CONTOH)


# Kotak Inti #1, Langkah 1: Siapkan Bank Kata (dictionary berisi list) ----
print()
print("=== Kotak Inti #1, Langkah 1: Siapkan Bank Kata ===")

kategori_kata = {
    "hewan": ["gajah", "jerapah", "kucing", "musang"],
    "buah": ["mangga", "apel", "nanas", "duku"],
    "negara": ["indonesia", "jepang", "brasil", "mesir"],
}

kategori = random.choice(list(kategori_kata.keys()))
kata_rahasia = random.choice(kategori_kata[kategori])

print(f"Kategori: {kategori}")
print(f"Kata terdiri dari {len(kata_rahasia)} huruf.")
# Dua kali random.choice() dipakai berturut-turut, tugasnya beda:
# - random.choice(list(kategori_kata.keys())) memilih satu LABEL
#   kategori secara acak. Perhatikan .keys() WAJIB dibungkus list(...)
#   dulu - random.choice() butuh sesuatu yang bisa "diambil pakai
#   nomor urut", sementara dict_keys sendirian belum begitu. Coba
#   hilangkan list(...)-nya (baris di bawah ini sengaja dikomentari
#   supaya berkas ini tetap jalan sampai selesai):
#   random.choice(kategori_kata.keys())
#   -> TypeError: 'dict_keys' object is not subscriptable
# - random.choice(kategori_kata[kategori]) mengambil list kata di
#   kategori terpilih, lalu memilih SATU kata secara acak dari list itu.
time.sleep(JEDA_ANTAR_CONTOH)


# Kotak Inti #1, Langkah 2: Fungsi tampilkan_progres() --------------------
print()
print("=== Kotak Inti #1, Langkah 2: Fungsi tampilkan_progres() ===")


def tampilkan_progres(kata, tebakan_benar):
    tampilan = ""
    for huruf in kata:
        if huruf in tebakan_benar:
            tampilan += huruf + " "
        else:
            tampilan += "_ "
    return tampilan.strip()


print(tampilkan_progres("gajah", []))
# _ _ _ _ _

print(tampilkan_progres("gajah", ["a"]))
# _ a _ a _
# Begitu huruf "a" ditebak, KEDUA huruf "a" di "gajah" langsung ikut
# terbuka sekaligus - karena `for huruf in kata` memeriksa tiap huruf
# satu per satu, tanpa peduli itu kemunculan yang keberapa.
time.sleep(JEDA_ANTAR_CONTOH)


# 🐍 Kata Pyto
# "Bayangkan kategori_kata itu seperti rak-rak berlabel di gudang
#  mainanku - rak 'hewan' isinya kartu nama hewan, rak 'buah' isinya
#  kartu nama buah, persis lemari berlabel yang kita kenal di Bab 11.
#  Waktu random.choice() dipanggil dua kali berturut-turut, itu
#  seperti aku menutup mata, menarik SATU rak secara acak, lalu
#  menarik SATU kartu acak lagi dari dalam rak itu. Nah,
#  tampilkan_progres() itu seperti asisten kecilku yang setia
#  kupanggil ulang tiap giliran - tugasnya cuma satu: gambar ulang
#  papan tebakan sesuai huruf yang sudah ketahuan, sesabar apa pun aku
#  memintanya. Rak berlabel, tarikan acak, dan asisten yang setia
#  menggambar ulang - gabungan tiganya itulah mesin di balik game
#  Tebak Kata kita!"


# ⚠️ Awas - Huruf Besar vs Huruf Kecil Bikin Tebakan Benar Dianggap Salah -
print()
print("=== ⚠️ Awas: Huruf Besar vs Huruf Kecil ===")

# ✗ Jangan begini - tebakan pemain tidak diubah ke huruf kecil dulu
kata_rahasia_awas = "gajah"
tebakan_benar_awas = []

tebakan_awas = "A"   # pemain mengetik huruf besar
if tebakan_awas in kata_rahasia_awas:
    tebakan_benar_awas.append(tebakan_awas)
    print("Benar!")
else:
    print("Salah!")
# Salah!   😱 padahal huruf "a" jelas-jelas ada di kata "gajah"!

# ✓ Begini benar - ubah dulu ke huruf kecil sebelum dibandingkan
tebakan_awas = "A".lower()
if tebakan_awas in kata_rahasia_awas:
    tebakan_benar_awas.append(tebakan_awas)
    print("Benar!")
else:
    print("Salah!")
# Benar!   -- "A".lower() jadi "a", baru cocok dengan huruf di kata_rahasia_awas
#
# "A" in "gajah" benar-benar mengecek apakah karakter A (huruf besar)
# muncul di "gajah" - dan memang tidak ada, sebab "gajah" semuanya
# huruf kecil. Bagi Python, "A" dan "a" itu dua karakter yang
# sepenuhnya berbeda. Aturan bab ini: SELALU panggil .lower() pada
# tebakan pemain SEBELUM dibandingkan - itu sebabnya kode game lengkap
# di bawah langsung menulis input("Tebak satu huruf: ").lower(), bukan
# menyimpan tebakan mentah dulu baru dicek belakangan.
time.sleep(JEDA_ANTAR_CONTOH)


# Kotak Inti #1 (lanjutan): Loop Utama Tebak Kata -------------------------
print()
print("=== Kotak Inti #1 (lanjutan): Loop Utama Main Sampai Menang atau Nyawa Habis ===")
print("(Demonstrasi di bawah ini memakai daftar tebakan yang sudah")
print("disiapkan, BUKAN input() sungguhan, supaya bagian ini bisa jalan")
print("otomatis tanpa menunggu. Nanti di bagian 'Coba Sendiri' di akhir")
print("berkas ini, kamu akan main dengan tebakan betulan dari keyboard.)")
print()

kata_rahasia = "gajah"
tebakan_benar = []
sisa_nyawa = 5
menang = False
tebakan_siap_pakai = iter(["a", "z", "g", "j", "h"])   # pengganti input() untuk demo

while sisa_nyawa > 0 and not menang:
    print(tampilkan_progres(kata_rahasia, tebakan_benar))
    print("❤️" * sisa_nyawa + "💔" * (5 - sisa_nyawa))

    tebakan = next(tebakan_siap_pakai).lower()
    print(f"Tebak satu huruf: {tebakan}")

    if tebakan in tebakan_benar:
        print("Huruf itu sudah pernah kamu tebak.")
    elif tebakan in kata_rahasia:
        tebakan_benar.append(tebakan)
        print("Benar! Ada huruf itu di kata rahasia.")
    else:
        sisa_nyawa -= 1
        print(f"Salah! Sisa nyawa: {sisa_nyawa}")

    if "_" not in tampilkan_progres(kata_rahasia, tebakan_benar):
        menang = True

if menang:
    print(f"🎉 Selamat! Kata rahasianya adalah '{kata_rahasia}'.")
else:
    print(f"Nyawa habis! Kata rahasianya adalah '{kata_rahasia}'.")
# while sisa_nyawa > 0 and not menang: loop terus berjalan selama DUA
# syarat sekaligus terpenuhi - nyawa masih ada, DAN belum menang.
# "menang" adalah flag boolean (mirip ada_angka/ada_huruf_besar di
# cek_kekuatan_sandi() Bab 16): mulai False, diset True begitu
# tampilkan_progres() tidak mengandung "_" lagi.
time.sleep(JEDA_ANTAR_CONTOH)


# Kotak Inti #2: Batu-Gunting-Kertas dengan Skor --------------------------
print()
print("=== Kotak Inti #2: Batu-Gunting-Kertas dengan Skor ===")
print("(Sama seperti di atas, 'pilihan_pemain' di demonstrasi ini memakai")
print("daftar siap pakai, bukan input() sungguhan.)")
print()

pilihan_valid = ["batu", "gunting", "kertas"]
skor_pemain = 0
skor_pyto = 0
jumlah_ronde = 3
pilihan_pemain_siap_pakai = iter(["batu", "gunting", "kertas"])   # pengganti input()

for ronde in range(1, jumlah_ronde + 1):
    print(f"--- Ronde {ronde} ---")
    pilihan_pemain = next(pilihan_pemain_siap_pakai).lower()
    print(f"Pilih batu/gunting/kertas: {pilihan_pemain}")
    pilihan_pyto = random.choice(pilihan_valid)
    print(f"Pyto memilih: {pilihan_pyto}")

    if pilihan_pemain == pilihan_pyto:
        print("Seri!")
    elif (
        (pilihan_pemain == "batu" and pilihan_pyto == "gunting")
        or (pilihan_pemain == "gunting" and pilihan_pyto == "kertas")
        or (pilihan_pemain == "kertas" and pilihan_pyto == "batu")
    ):
        print("Kamu menang ronde ini!")
        skor_pemain += 1
    else:
        print("Pyto menang ronde ini!")
        skor_pyto += 1

print(f"Skor akhir -> Kamu: {skor_pemain} | Pyto: {skor_pyto}")

if skor_pemain > skor_pyto:
    print("Kamu menang keseluruhan! 🎉")
elif skor_pemain < skor_pyto:
    print("Pyto menang keseluruhan, coba lagi lain kali!")
else:
    print("Hasil akhir seri!")
# elif (...) panjang itu memeriksa TIGA kombinasi kemenangan pemain
# sekaligus digabung pakai `or`. Kalau tidak seri dan tidak masuk
# salah satu kombinasi kemenangan pemain, otomatis giliran Pyto yang
# menang (else) - tidak perlu menuliskan kombinasi kemenangan Pyto
# secara terpisah.
time.sleep(JEDA_ANTAR_CONTOH)


# 🎮 Main Yuk! - Pilih Gerakan Pyto Secara Acak ---------------------------
print()
print("=== 🎮 Main Yuk!: Pilih Gerakan Pyto Secara Acak ===")

pilihan_valid = ["batu", "gunting", "kertas"]
pilihan_pyto = random.choice(pilihan_valid)   # <- isian yang benar: random.choice
print(pilihan_pyto)
# random.choice(daftar) - persis fungsi yang sudah dipakai dua kali di
# Tebak Kata (memilih kategori, lalu memilih kata) dan sekali lagi di
# sini untuk memilih gerakan Pyto. Selalu mengembalikan satu anggota
# acak dari list yang diberikan, apa pun isinya.
time.sleep(JEDA_ANTAR_CONTOH)


# 🔎 Tahu Lebih - Bikin Levelnya Makin Menantang ---------------------------
print()
print("=== 🔎 Tahu Lebih: hitung_nyawa_awal() Menyesuaikan Tingkat Kesulitan ===")


def hitung_nyawa_awal(kata):
    if len(kata) <= 5:
        return 5
    else:
        return 7


for kata_contoh in ["duku", "gajah", "indonesia"]:
    nyawa_awal = hitung_nyawa_awal(kata_contoh)
    print(f"'{kata_contoh}' ({len(kata_contoh)} huruf) -> jatah nyawa: {nyawa_awal}")
# Ide bonus ini berdiri sendiri - hitung_nyawa_awal(kata) TIDAK
# disuntikkan ke game utama di bagian "Coba Sendiri" di bawah (yang
# tetap memakai sisa_nyawa = 5 tetap), persis seperti disebutkan di
# naskah/desain: murni ide pengembangan lanjutan, bukan bagian wajib.
time.sleep(JEDA_ANTAR_CONTOH)


# Coba Sendiri: mainkan kedua game sungguhan lewat input() -----------------
print()
print("=== Coba Sendiri: Mainkan Kedua Game! ===")
print("Tebak Kata jalan duluan (tebak huruf sampai menang atau nyawa habis),")
print("lalu disusul Batu-Gunting-Kertas 3 ronde.")
print()

kategori_kata = {
    "hewan": ["gajah", "jerapah", "kucing", "musang"],
    "buah": ["mangga", "apel", "nanas", "duku"],
    "negara": ["indonesia", "jepang", "brasil", "mesir"],
}


def tampilkan_progres(kata, tebakan_benar):
    tampilan = ""
    for huruf in kata:
        if huruf in tebakan_benar:
            tampilan += huruf + " "
        else:
            tampilan += "_ "
    return tampilan.strip()


print("=== TEBAK KATA ===")

kategori = random.choice(list(kategori_kata.keys()))
kata_rahasia = random.choice(kategori_kata[kategori])
tebakan_benar = []
sisa_nyawa = 5
menang = False

print(f"Kategori: {kategori}")
print(f"Kata terdiri dari {len(kata_rahasia)} huruf.")

while sisa_nyawa > 0 and not menang:
    print(tampilkan_progres(kata_rahasia, tebakan_benar))
    print("❤️" * sisa_nyawa + "💔" * (5 - sisa_nyawa))

    tebakan = input("Tebak satu huruf: ").lower()

    if tebakan in tebakan_benar:
        print("Huruf itu sudah pernah kamu tebak.")
    elif tebakan in kata_rahasia:
        tebakan_benar.append(tebakan)
        print("Benar! Ada huruf itu di kata rahasia.")
    else:
        sisa_nyawa -= 1
        print(f"Salah! Sisa nyawa: {sisa_nyawa}")

    if "_" not in tampilkan_progres(kata_rahasia, tebakan_benar):
        menang = True

if menang:
    print(f"🎉 Selamat! Kata rahasianya adalah '{kata_rahasia}'.")
else:
    print(f"Nyawa habis! Kata rahasianya adalah '{kata_rahasia}'.")

print()
print("=== BATU-GUNTING-KERTAS ===")

pilihan_valid = ["batu", "gunting", "kertas"]
skor_pemain = 0
skor_pyto = 0
jumlah_ronde = 3

for ronde in range(1, jumlah_ronde + 1):
    print(f"--- Ronde {ronde} ---")
    pilihan_pemain = input("Pilih batu/gunting/kertas: ").lower()
    pilihan_pyto = random.choice(pilihan_valid)
    print(f"Pyto memilih: {pilihan_pyto}")

    if pilihan_pemain == pilihan_pyto:
        print("Seri!")
    elif (
        (pilihan_pemain == "batu" and pilihan_pyto == "gunting")
        or (pilihan_pemain == "gunting" and pilihan_pyto == "kertas")
        or (pilihan_pemain == "kertas" and pilihan_pyto == "batu")
    ):
        print("Kamu menang ronde ini!")
        skor_pemain += 1
    else:
        print("Pyto menang ronde ini!")
        skor_pyto += 1

print(f"Skor akhir -> Kamu: {skor_pemain} | Pyto: {skor_pyto}")

if skor_pemain > skor_pyto:
    print("Kamu menang keseluruhan! 🎉")
elif skor_pemain < skor_pyto:
    print("Pyto menang keseluruhan, coba lagi lain kali!")
else:
    print("Hasil akhir seri!")

print()
print("Selesai! Kamu resmi lulus jadi pembuat game Pyto, menggabungkan")
print("dictionary, fungsi, loop, dan random jadi dua permainan yang bisa")
print("langsung kamu ajak main teman atau keluarga 🎉")
