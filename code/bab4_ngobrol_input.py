"""
Bab 4: Ngobrol dengan Komputer (input) 💬
===========================================
Di Bab 2 komputer yang "ngomong" lewat print(). Sekarang giliran dia
yang BERTANYA — lalu sabar menunggu jawaban darimu lewat perintah input()!
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
    (Di kodemu sendiri, kamu cukup menulis: input("Pertanyaanmu: "))
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


# 1. Komputer Bertanya dan Menunggu Jawaban ----------------------------------
# Begitu sampai di perintah input(), program akan berhenti total sampai kamu
# mengetik jawaban dan menekan tombol Enter di keyboard.
print("Selamat datang di markas Pyto! 🐍")
sapaan = tanya("Ketik sapaan untuk Pyto: ", "Halo Pyto!")
print(f"Pyto mendengar: '{sapaan}'")


# 2. Tanya -> Jawab -> Tersimpan di Kotak (Variabel) -------------------------
# Jawaban dari input() biasanya langsung kita simpan ke variabel (Bab 3),
# lalu kita panggil lagi menggunakan f-string (Bab 2).
nama = tanya("Siapa namamu? ", "Kirana")
hobi = tanya("Apa hobimu? ", "menggambar")
print(f"Senang berkenalan denganmu, {nama}! Hobi {hobi} itu seru banget! ✨")


# 3. ⚠️ Jebakan Penting: input() SELALU Menghasilkan Teks (str) -------------
# Apa pun yang kamu ketik — bahkan angka sekalipun — Python selalu
# membungkusnya sebagai teks (str). Kelihatannya angka, tapi ada tanda kutipnya!
umur_teks = tanya("Berapa umurmu? ", "10")
print(f"Isi variabel umur : {repr(umur_teks)}")
print(f"Tipe data         : {type(umur_teks)}")

# Karena tipenya teks (str), kita TIDAK BISA langsung menjumlahkannya dengan angka.
# Coba perhatikan contoh di bawah ini:
#
# umur_teks + 5   <- ini akan menimbulkan TypeError!
#
# Python akan menolak dengan pesan:
# "TypeError: can only concatenate str (not 'int') to str"
#
# Di bawah ini kita tangani agar kamu bisa melihat penjelasannya:
try:
    hasil = umur_teks + 5
except TypeError as error:
    print("\n[Catatan Detektif Pyto] 🔍")
    print(f"Percobaan (umur_teks + 5) gagal karena: {error}")
    print("Python tidak mau menggabung teks dan angka sembarangan!")
    print("Cara mengubah teks menjadi angka sungguhan akan kita buka di Bab 5.")


# 4. 🎮 Main Yuk! -------------------------------------------------------------
# Komputer gantian menanyakan makanan kesukaanmu!
makanan = tanya("Apa makanan favoritmu? ", "nasi goreng")
print(f"Wah, {makanan} enak juga! Pyto jadi ikutan lapar 🤖🍲")


# 5. 🔍 Tahu Lebih -----------------------------------------------------------
# a. Pertanyaan bergilir:
#    Kalau ada beberapa input(), program menjalankannya satu per satu
#    dari atas ke bawah, bukan sekaligus bersamaan.
#
# b. Menggabungkan dua teks hasil input:
#    Tanda '+' pada dua teks akan menyambungkan kata, bukan menjumlahkan angka!
angka_a = "10"
angka_b = "5"
print(f"Jika teks '{angka_a}' + teks '{angka_b}', hasilnya: {angka_a + angka_b}")
# Hasilnya adalah "105", bukan 15!
# Karena keduanya dianggap kata yang digandengkan berdampingan.
