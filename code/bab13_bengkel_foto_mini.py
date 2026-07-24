"""
Bab 13: Bengkel Foto Mini (Olah Gambar) 🖼️
=============================================
Foto liburanmu kegedean buat dikirim? Atau mau kasih watermark nama?
Sekarang kita bikin "bengkel foto" sendiri pakai kode - resize,
watermark, hitam-putih, sampai kolase!

Catatan: berkas ini butuh paket Pillow. Install dulu lewat terminal:
    pip install Pillow

Sebelum menjalankan berkas ini, taruh sebuah foto bernama
"foto_contoh.jpg" di folder yang sama dengan berkas ini
(atau ganti nama file di baris Image.open(...) di bawah dengan
nama foto milikmu sendiri).
"""

from PIL import Image, ImageOps, ImageDraw

# Buka foto dari file asli di komputermu.
# .convert("RGB") memastikan fotonya selalu dalam format warna yang sama,
# apa pun format aslinya (JPG, PNG, dst.) - supaya semua contoh di bawah
# selalu berjalan mulus.
foto = Image.open("foto_contoh.jpg").convert("RGB")

print(f"Ukuran asli: {foto.size}")

foto_kecil = foto.resize((300, 300))
print(f"Ukuran baru: {foto_kecil.size}")


# Ubah jadi hitam-putih
foto_hitam_putih = ImageOps.grayscale(foto)


# Kasih watermark - tulisan di atas foto
# ⚠️ Awas: ImageDraw menggambar LANGSUNG di atas foto yang diberikan -
# bukan bikin salinan otomatis. Kalau kita lupa .copy() dulu, foto
# ASLINYA (variabel `foto`) ikut berubah permanen! Makanya kita selalu
# gambar di atas salinannya saja:
foto_watermark = foto.copy()
gambar = ImageDraw.Draw(foto_watermark)
gambar.text((10, 10), "Foto: Kirana", fill="white")


# Simpan hasil-hasil di atas jadi file baru, supaya bisa langsung dilihat
foto_kecil.save("hasil_kecil.jpg")
foto_hitam_putih.save("hasil_hitam_putih.jpg")
foto_watermark.save("hasil_watermark.jpg")
print("Tiga foto hasil sudah disimpan di folder yang sama dengan berkas ini!")


# 🎮 Main Yuk!
# Ganti ukuran & tulisan watermark, lalu simpan hasilnya sendiri.
foto_500 = foto.resize((500, 500))
hasil_main_yuk = foto_500.copy()
gambar_main_yuk = ImageDraw.Draw(hasil_main_yuk)
gambar_main_yuk.text((10, 10), "Ganti dengan namamu", fill="white")
hasil_main_yuk.save("hasil_main_yuk.jpg")


# 🔍 Tahu Lebih - bikin kolase sebelum/sesudah
kecil = foto.resize((200, 200))
abu = ImageOps.grayscale(kecil).convert("RGB")

kolase = Image.new("RGB", (400, 200))
kolase.paste(kecil, (0, 0))
kolase.paste(abu, (200, 0))
kolase.save("hasil_kolase.jpg")
print("Kolase sebelum/sesudah sudah disimpan sebagai hasil_kolase.jpg!")
