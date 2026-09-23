"""
Bab 8: Kumpulan Barang (List) 🧺
=================================
Kalau variabel biasa (Bab 3) cuma bisa menyimpan satu nilai di dalam kotak,
List adalah keranjang serbaguna yang bisa memuat banyak barang sekaligus!
Tiap barang memiliki nomor urut (indeks) yang dimulai dari angka 0.
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


# 1. Membuat List & Indeks 0-based -------------------------------------------
# List ditulis dengan kurung siku [ ], dan tiap item dipisahkan tanda koma.
teman = ["Kirana", "Budi", "Sari"]

print("--- 1. List dan Nomor Urut (Indeks) ---")
print(f"Isi list teman : {teman}")

# Mengambil barang berdasarkan nomor urutnya:
# ⚠️ PENTING: Python selalu menghitung nomor urut mulai dari 0, bukan 1!
print(f"Teman di indeks 0 (pertama) : {teman[0]}")
print(f"Teman di indeks 1 (kedua)   : {teman[1]}")
print(f"Teman di indeks 2 (ketiga)  : {teman[2]}")

# ⚠️ Awas: Mengambil indeks yang tidak ada akan memicu IndexError!
# Karena list ini cuma punya 3 barang (indeks 0, 1, 2), memanggil teman[3]
# akan membuat Python protes: "IndexError: list index out of range".
try:
    print(teman[3])
except IndexError as e:
    print(f"\n[Catatan Detektif Pyto] 🔍 Peringatan IndexError:")
    print(f"  Memanggil teman[3] gagal karena: {e}")
    print("  Barang ke-4 belum ada di keranjang!")


# 2. Manipulasi List: .append() dan len() -------------------------------------
print("\n--- 2. Menambah & Menghitung Barang ---")

# a. .append() selalu menambahkan barang baru di UJUNG AKHIR list:
teman.append("Doni")
print(f"Setelah ditambah Doni: {teman}")

# b. len() menghitung total barang yang ada di dalam list:
print(f"Jumlah teman sekarang: {len(teman)} orang")

# c. Mengubah isi barang di indeks tertentu:
teman[1] = "Bambang"  # Mengganti "Budi" (indeks 1) menjadi "Bambang"
print(f"Setelah nama di indeks 1 diganti: {teman}")


# 3. Indeks Negatif: Menghitung dari Belakang --------------------------------
# Trik keren Python: tanda minus (-) menghitung posisi mulai dari ujung akhir!
# -1 adalah barang paling belakang, -2 adalah barang kedua dari belakang.
print("\n--- 3. Indeks Negatif ---")
print(f"Barang paling akhir (indeks -1)       : {teman[-1]}")
print(f"Barang kedua dari akhir (indeks -2)   : {teman[-2]}")


# 4. Membaca Seluruh List dengan Perulangan for ------------------------------
print("\n--- 4. Membaca Seluruh Isi List ---")
print("Daftar teman bermain Pyto:")
for nama in teman:
    print(f"  🐍 Halo, {nama}!")

# Jika ingin tahu nomor urutnya juga, kita bisa pakai enumerate():
print("\nDengan nomor urut:")
for nomor, nama in enumerate(teman, start=1):
    print(f"  {nomor}. {nama}")


# 🎮 Main Yuk! ----------------------------------------------------------------
print("\n--- 🎮 Main Yuk! Keranjang Belanja ---")
# Membangun daftar belanja dari nol:
keranjang = ["Roti", "Susu", "Telur"]
barang_baru = tanya("Masukkan barang belanja tambahan: ", "Keju")
keranjang.append(barang_baru)

print(f"Keranjangmu sekarang berisi {len(keranjang)} barang:")
for item in keranjang:
    print(f"  🛒 {item}")


# 🔍 Tahu Lebih --------------------------------------------------------------
print("\n--- 🔍 Tahu Lebih ---")
# 1. Mengecek keberadaan barang dengan kata kunci 'in':
if "Susu" in keranjang:
    print("✓ Susu ada di dalam keranjang belanja!")
else:
    print("✗ Susu belum masuk keranjang.")

# 2. Menghapus barang dari list dengan .remove():
hewan = ["Kucing", "Kelinci", "Hamster"]
print(f"Sebelum dihapus: {hewan}")
hewan.remove("Kelinci")
print(f"Setelah 'Kelinci' dihapus: {hewan}")

# 3. Mengurutkan list dengan .sort():
nilai_acak = [50, 90, 70, 80]
nilai_acak.sort()
print(f"Nilai setelah diurutkan dari kecil ke besar: {nilai_acak}")
