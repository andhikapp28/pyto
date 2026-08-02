"""
Bab 17: Seniman Digital (Menggambar dengan Kode) 🎨
====================================================================
Menggambar kotak, bintang, mandala, dan kembang api di kanvas -
semuanya cuma pakai loop `for _ in range(n):` yang sudah kamu kuasai
sejak Bab 7, digabung dengan perintah gerak (maju, belok kanan/kiri,
dst.).

CATATAN PENTING soal API menggambar di bab ini (baca ini dulu):
Versi WEB bab ini (di halaman buku) memakai "Kanvas Ajaib Pyto" -
sebuah kanvas HTML kustom dengan fungsi-fungsi Indonesia (maju(),
belok_kanan(), dst.) yang dibuat KHUSUS dari nol oleh penulis buku.
Itu terpaksa dibuat sendiri karena Python yang jalan di BROWSER
(lewat Pyodide) tidak bisa membuka jendela Tkinter sungguhan -
`import turtle` MUSTAHIL jalan di sana.

Tapi berkas INI jalan di Python DESKTOP biasa (bukan di browser), di
mana jendela GUI sungguhan tersedia. Karena itu, berkas ini memakai
modul bawaan Python yang SUNGGUHAN untuk menggambar: `turtle`. Supaya
kodenya tetap kelihatan identik dengan versi web di buku, fungsi-
fungsi `turtle` asli (t.forward(), t.right(), dst.) dibungkus tipis
di bawah jadi fungsi bernama Indonesia (maju(), belok_kanan(), dst.).
Anggap berkas ini sebagai "begini rupanya menggambar pakai turtle
SUNGGUHAN", sementara versi web adalah tiruan kustomnya yang dibuat
khusus supaya bisa jalan di dalam browser.

Kebetulan koordinatnya juga langsung cocok: turtle asli SUDAH
menempatkan titik (0, 0) di tengah jendela, sumbu-Y positif ke ATAS,
dan arah 0 derajat menghadap ke KANAN - persis sama seperti kontrak
Kanvas Ajaib Pyto di versi web. Jadi tidak perlu penyesuaian
matematika apa pun di sini, cuma penyesuaian nama fungsi.

PERINGATAN: menjalankan berkas ini akan MEMBUKA JENDELA GUI baru
(jendela turtle) di layarmu. Jendela itu akan tetap terbuka di akhir
berkas (lewat turtle.done()) sampai kamu menutupnya sendiri - ini
perilaku NORMAL/wajar untuk program turtle, bukan berkas yang macet.
Kalau komputermu tidak punya layar/GUI (misalnya server tanpa
tampilan), berkas ini akan gagal saat mencoba membuka jendela - itu
memang wajar terjadi di lingkungan tanpa layar.
"""

import sys
import time
import turtle

# Sebagian terminal Windows tidak memakai UTF-8 secara default, jadi
# emoji di beberapa pesan di bawah bisa memicu error pencetakan. Baris
# ini murni Python inti dan memastikan output emoji tetap aman
# dicetak di terminal mana pun.
sys.stdout.reconfigure(encoding="utf-8")


# Siapkan jendela & turtle, lalu bungkus jadi fungsi bernama Indonesia --
layar = turtle.Screen()
layar.title("Bab 17 - Seniman Digital Pyto")
layar.setup(width=500, height=500)
layar.bgcolor("white")

pyto = turtle.Turtle()
pyto.speed(8)          # cukup cepat supaya tidak menunggu lama, tapi masih kelihatan bergerak
pyto.pensize(2)
pyto.shape("turtle")

# Palet warna WAJIB persis sama dengan tabel di plan/Fase2/design/bab-17-desain.md
# (7 warna, semuanya dipetakan ke token desain yang sudah ada di buku)
_PALET_WARNA = {
    "hitam": "#1E2A32",
    "putih": "#FFFFFF",
    "merah": "#FF7A6B",
    "kuning": "#FFC94D",
    "hijau": "#2FBF71",
    "biru": "#4DA6FF",
    "ungu": "#8B6FE0",
}


def maju(langkah):
    pyto.forward(langkah)


def mundur(langkah):
    pyto.backward(langkah)


def belok_kanan(derajat):
    pyto.right(derajat)


def belok_kiri(derajat):
    pyto.left(derajat)


def arah_ke(derajat):
    pyto.setheading(derajat)


def mulai_dari(x, y):
    # "Meloncat" ke (x, y) TANPA PERNAH menggambar garis, apa pun status
    # pena saat ini - makanya pena selalu diangkat dulu sebelum pindah,
    # lalu dikembalikan ke status semula (turun/naik) sesudahnya.
    pena_sedang_turun = pyto.isdown()
    pyto.penup()
    pyto.goto(x, y)
    if pena_sedang_turun:
        pyto.pendown()


def angkat_pena():
    pyto.penup()


def turun_pena():
    pyto.pendown()


def warna_pena(nama_warna):
    if nama_warna in _PALET_WARNA:
        pyto.pencolor(_PALET_WARNA[nama_warna])
    else:
        print(f"Pyto belum kenal warna '{nama_warna}', dipakai warna sebelumnya saja ya.")


def tebal_pena(angka):
    pyto.pensize(max(1, min(12, angka)))


def bersihkan():
    # Bersihkan gambar DAN kembalikan semua state (posisi, arah, pena,
    # warna, tebal) ke keadaan awal - sama seperti bersihkan() versi web
    # yang dipanggil otomatis tiap kali tombol Jalankan ditekan.
    pyto.clear()
    pyto.penup()
    pyto.home()          # balik ke (0, 0), arah 0 derajat - tanpa menggambar (pena sedang naik)
    pyto.pendown()
    pyto.pencolor(_PALET_WARNA["hitam"])
    pyto.pensize(2)


def posisi_sekarang():
    return pyto.position()


def arah_sekarang():
    return pyto.heading()


# Jeda kecil antar contoh biar sempat kelihatan sebelum kanvas
# dibersihkan lagi untuk contoh berikutnya - bukan "menunggu manusia",
# cuma jeda tetap yang pasti selesai sendiri.
JEDA_ANTAR_CONTOH = 1.2


# Dasar: maju() & belok_kanan() menggambar kotak (ditulis manual) --------
bersihkan()
maju(80)
belok_kanan(90)
maju(80)
belok_kanan(90)
maju(80)
belok_kanan(90)
maju(80)
belok_kanan(90)
# Pyto kembali persis ke titik awal sambil menghadap ke arah semula ->
# terlihat sebuah kotak hitam tertutup sempurna.
time.sleep(JEDA_ANTAR_CONTOH)


# angkat_pena() / turun_pena(): garis putus-putus ------------------------
bersihkan()
maju(50)
angkat_pena()
maju(50)
turun_pena()
maju(50)
# Garis 50px, lalu jarak kosong 50px (pena naik), lalu garis 50px lagi.
time.sleep(JEDA_ANTAR_CONTOH)


# 🐍 Kata Pyto
# "Bayangkan aku sedang mengemudikan kapal kecil di atas kanvas.
#  maju() itu seperti menjalankan mesin kapal - badannya benar-benar
#  berpindah. Tapi belok_kanan()/belok_kiri() itu cuma memutar kemudi -
#  hidung kapalnya berubah arah, tapi kapalnya sendiri belum bergerak
#  sama sekali sampai aku maju() lagi."


# Ulangi pakai loop dari Bab 7: kotak yang sama, jauh lebih ringkas -----
bersihkan()
warna_pena("hijau")

for _ in range(4):
    maju(80)
    belok_kanan(90)
# Kotak diulang 4 kali, tiap kali belok 90 derajat (360 / 4 = 90) ->
# hasilnya kotak hijau, identik dengan versi manual di atas.
time.sleep(JEDA_ANTAR_CONTOH)


# Sudut belokan lebih besar dari aturan segi banyak -> jadi bintang -----
bersihkan()
warna_pena("kuning")
tebal_pena(3)

for _ in range(5):
    maju(100)
    belok_kanan(144)
# Bintang bersudut lima kuning, tebal garis 3px, sisinya 100px - tepat
# kembali ke titik awal (menghadap arah semula) di ulangan kelima.
time.sleep(JEDA_ANTAR_CONTOH)


# ⚠️ Awas - lupa turunkan pena lagi setelah angkat_pena() ---------------
# Kesalahan yang sering kejadian: mengangkat pena untuk pindah tempat,
# tapi lupa menurunkannya lagi. Kodenya TIDAK error sama sekali - cuma
# kanvasnya kosong melompong, membingungkan kalau belum tahu sebabnya:
#
# bersihkan()
# angkat_pena()
# maju(50)
# belok_kanan(90)
# maju(50)
# belok_kanan(90)
# maju(50)
# belok_kanan(90)
# maju(50)
# # Kanvas kosong! Padahal tidak ada satu pun pesan error 😳
#
# Sengaja dikomentari supaya berkas ini tetap menggambar sampai
# selesai. Coba hapus tanda pagar di atas sendiri untuk melihat
# kanvas yang kosong itu.
#
# Begini versi yang benar - turunkan lagi penanya sebelum menggambar:
bersihkan()
turun_pena()
maju(50)
belok_kanan(90)
maju(50)
belok_kanan(90)
maju(50)
belok_kanan(90)
maju(50)
# Kotaknya muncul dengan benar, karena pena memang sudah turun sejak awal.
time.sleep(JEDA_ANTAR_CONTOH)


# Ubah sudut & warna tiap putaran = mandala (loop di dalam loop) --------
bersihkan()
warna_warni = ["merah", "kuning", "hijau", "biru", "ungu"]

for i in range(12):
    warna_pena(warna_warni[i % len(warna_warni)])
    for _ in range(4):
        maju(80)
        belok_kanan(90)
    belok_kanan(30)
# Loop dalam menggambar satu kotak penuh (selalu balik ke tengah). Loop
# luar mengulang itu 12 kali, ganti warna tiap kali, lalu memutar arah
# 30 derajat lagi (12 x 30 = 360, jadi arahnya kembali persis ke semula
# setelah kotak ke-12) -> 12 kotak warna-warni bertumpuk jadi mandala.
time.sleep(JEDA_ANTAR_CONTOH * 1.5)


# Reset ke tengah: kembang api! (mulai_dari + arah_ke) -------------------
bersihkan()
warna_kembang_api = ["merah", "kuning", "hijau", "biru", "ungu"]

for i in range(24):
    mulai_dari(0, 0)
    arah_ke(i * 15)
    warna_pena(warna_kembang_api[i % len(warna_kembang_api)])
    maju(150)
# Tiap putaran: Pyto diloncatkan balik ke tengah (mulai_dari TIDAK
# pernah menggambar garis loncatannya), diarahkan ke sudut berbeda
# (i * 15 derajat -> 0, 15, 30, ..., 345 = 24 garis mengelilingi penuh
# 360 derajat), diberi warna berikutnya, lalu maju(150) menggambar satu
# garis lurus ke arah itu -> lingkaran garis-garis warna-warni yang
# memancar dari tengah, seperti ledakan kembang api.
time.sleep(JEDA_ANTAR_CONTOH * 1.5)


# 🎮 Main Yuk! - dari kotak jadi bentuk lain ------------------------------
# Ingat aturan segi banyak beraturan: ulangi n kali, belok (360 / n)
# derajat. Isian yang benar untuk segitiga: range(3) dan belok_kanan(120)
# (360 / 3 = 120).
bersihkan()
for _ in range(3):
    maju(80)
    belok_kanan(120)
# Segitiga sama sisi.
time.sleep(JEDA_ANTAR_CONTOH)

# Coba juga range(5) dengan belok_kanan(72) - bentuk apa yang muncul?
# Ini SEGILIMA BERATURAN biasa, BUKAN bintang - bandingkan dengan
# contoh bintang di atas yang belokannya 144 (dua kali lipat dari 72).
bersihkan()
for _ in range(5):
    maju(80)
    belok_kanan(72)
# Segilima beraturan, tertutup rapi tanpa menyilang.
time.sleep(JEDA_ANTAR_CONTOH)


# 🔎 Tahu Lebih - kenapa bintang butuh 144 derajat, bukan 72? ------------
# Untuk segi lima BERATURAN (tertutup biasa, tidak menyilang), aturan
# 360 / n berlaku persis: 360 / 5 = 72 derajat.
#
# Tapi untuk BINTANG bersudut lima, kita sengaja "melompati" satu titik
# tiap kali belok, bukan berhenti di titik tetangga terdekat. Alih-alih
# berputar total 360 derajat (satu putaran penuh) selama lima langkah,
# kita berputar total 720 derajat (DUA putaran penuh) - karena garisnya
# menyilang balik ke titik yang lebih jauh. Itu sebabnya sudutnya jadi
# 720 / 5 = 144 derajat, bukan 72 derajat.
#
# Coba ganti-ganti angka 144 di bawah jadi angka lain (misalnya 150
# atau 100) - perhatikan bagaimana bentuknya berubah drastis, dan cuma
# sudut-sudut tertentu yang menghasilkan bintang yang menutup rapi.
#
# Digambar berdampingan di kanvas yang sama supaya gampang dibandingkan:
# segilima biasa (biru) di sebelah kiri, bintang (kuning) di sebelah kanan.
bersihkan()

mulai_dari(-100, 0)
arah_ke(0)
warna_pena("biru")
tebal_pena(2)
for _ in range(5):
    maju(60)
    belok_kanan(72)

mulai_dari(100, 0)
arah_ke(0)
warna_pena("kuning")
tebal_pena(3)
for _ in range(5):
    maju(60)
    belok_kanan(144)
time.sleep(JEDA_ANTAR_CONTOH * 1.5)


# Selesai! Sembunyikan Pyto biar gambar terakhir kelihatan bersih, lalu
# biarkan jendelanya terbuka sampai kamu tutup sendiri (klik tanda X
# di jendela, atau tekan Ctrl+C di terminal). Ini perilaku NORMAL untuk
# program turtle - turtle.done() memang dirancang menunggu di sini.
print("Semua contoh selesai digambar! Tutup jendela turtle untuk mengakhiri program.")
pyto.hideturtle()
turtle.done()
