"""
Bab 16: Agen Rahasia Pyto (Kode Rahasia & Keamanan Kata Sandi) 🕵️
====================================================================
Jadi agen rahasia sungguhan: bikin sandi Caesar sendiri buat menyandikan
(dan membongkar lagi) pesan rahasia, sekaligus belajar kenapa kata
sandi seperti "123456" itu sama saja dengan pintu markas yang dibiarkan
terbuka.

Catatan: berkas ini TIDAK butuh paket apa pun - semuanya cuma pakai
Python inti (ord(), chr(), string, for, if, def). Tidak perlu
"pip install" apa pun sebelum menjalankan berkas ini.
"""

import sys

# Sebagian terminal Windows tidak memakai UTF-8 secara default, jadi
# emoji di beberapa pesan di bawah (🚨, 💪, dll.) bisa memicu error
# pencetakan. Baris ini murni Python inti (bukan paket tambahan) dan
# memastikan output emoji tetap aman dicetak di terminal mana pun.
sys.stdout.reconfigure(encoding="utf-8")


# Ubah huruf jadi angka rahasia, dan sebaliknya --------------------------
print(ord("A"))   # 65
print(chr(65))     # A

huruf = "C"
angka = ord(huruf) - ord("A")
print(angka)   # 2, karena C adalah huruf ke-2 kalau dihitung dari A = 0

angka = 2
huruf = chr(angka + ord("A"))
print(huruf)   # C


# Bikin sandi Caesar: geser semua huruf N langkah ------------------------
def sandikan(pesan, geseran):
    hasil = ""
    for huruf in pesan:
        if huruf >= "A" and huruf <= "Z":
            angka = ord(huruf) - ord("A")
            angka_baru = (angka + geseran) % 26
            hasil += chr(angka_baru + ord("A"))
        else:
            hasil += huruf
    return hasil


pesan_asli = "AGEN RAHASIA"
pesan_sandi = sandikan(pesan_asli, 3)
print(pesan_sandi)   # DJHQ UDKDVLD


# Pecahkan sandinya lagi: geser balik pakai angka negatif -----------------
pesan_terbuka = sandikan(pesan_sandi, -3)
print(pesan_terbuka)   # AGEN RAHASIA


# ⚠️ Awas - sandi ini cuma kenal huruf BESAR
# Fungsi sandikan() di atas cuma mengenali huruf besar A-Z lewat
# pengecekan "if huruf >= 'A' and huruf <= 'Z'". Kalau pengecekan itu
# dilupakan, huruf kecil ikut dipaksa masuk ke rumus dan hasilnya
# berantakan - bukan sekadar "tidak digeser", tapi huruf yang salah total:
#
# def sandikan_bahaya(pesan, geseran):
#     hasil = ""
#     for huruf in pesan:
#         angka = ord(huruf) - ord("A")
#         angka_baru = (angka + geseran) % 26
#         hasil += chr(angka_baru + ord("A"))
#     return hasil
#
# print(sandikan_bahaya("Ab", 1))
# # BI   💥 huruf kecil "b" malah ikut "digeser" jadi huruf besar "I" yang salah total!
#
# Sengaja dikomentari supaya berkas ini tetap bisa dijalankan sampai
# selesai. Coba hapus tanda pagar di atas sendiri untuk melihat kekacauannya.
#
# Bandingkan dengan versi yang benar (fungsi sandikan() asli kita di atas),
# yang mengecek dulu sebelum menggeser:
print(sandikan("Ab", 1))
# Bb   -- huruf besar "A" digeser jadi "B", huruf kecil "b" dibiarkan apa adanya


# Pintu gerbang kedua: kata sandi yang gampang ditebak --------------------
sandi_lemah = ["123456", "password", "qwerty", "111111", "sandi123"]

kata_sandi = "123456"
if kata_sandi in sandi_lemah:
    print("Waduh, ini kata sandi favorit para pembobol! 🚨")


# Cek kekuatan kata sandi dengan skor --------------------------------------
def cek_kekuatan_sandi(sandi):
    sandi_lemah = ["123456", "password", "qwerty", "111111", "sandi123"]

    if sandi in sandi_lemah:
        return "Lemah banget! Ini kata sandi favorit para pembobol 🚨"

    skor = 0

    if len(sandi) >= 8:
        skor += 1

    ada_angka = False
    for karakter in sandi:
        if karakter >= "0" and karakter <= "9":
            ada_angka = True
    if ada_angka:
        skor += 1

    ada_huruf_besar = False
    for karakter in sandi:
        if karakter >= "A" and karakter <= "Z":
            ada_huruf_besar = True
    if ada_huruf_besar:
        skor += 1

    if skor == 3:
        return "Kuat! Lumayan sulit ditebak 💪"
    elif skor == 2:
        return "Cukup, tapi masih bisa lebih kuat lagi"
    else:
        return "Lemah, coba tambahkan panjang huruf/angka/huruf besar"


print(cek_kekuatan_sandi("Rahasia9x"))   # Kuat! Lumayan sulit ditebak 💪
print(cek_kekuatan_sandi("123456"))      # Lemah banget! Ini kata sandi favorit para pembobol 🚨
print(cek_kekuatan_sandi("rahasia"))     # Lemah, coba tambahkan panjang huruf/angka/huruf besar


# 🎮 Main Yuk! - ganti geserannya
# Ganti angka geseran supaya pesan tersandinya beda dari contoh di atas.
geseran_main_yuk = 5   # <- ganti angka ini sesuka hatimu (0-25)
pesan_sandi_main_yuk = sandikan("PYTO AGEN RAHASIA", geseran_main_yuk)
print(pesan_sandi_main_yuk)


# 🔍 Tahu Lebih - bongkar sandi tanpa tahu geserannya
# Sandi Caesar cuma punya 26 kemungkinan geseran (0-25), jadi komputer
# bisa mencoba SEMUA kemungkinan dalam sekejap dan cari satu-satunya
# baris yang masuk akal sebagai kalimat.
pesan_sandi_misteri = "DJHQ UDKDVLD"

for coba in range(26):
    print(coba, sandikan(pesan_sandi_misteri, -coba))
