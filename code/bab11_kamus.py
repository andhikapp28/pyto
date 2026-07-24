"""
Bab 11: Kamus / Kotak Berlabel (Dictionary) 🗂️
================================================
Kalau List (Bab 8) itu rak dengan nomor urut, Dictionary itu lemari
dengan LABEL di tiap laci - tinggal panggil namanya, nggak perlu
ingat nomornya!
"""

# Membuat dictionary: {"label": isi, "label": isi, ...}
murid = {
    "nama": "Kirana",
    "kelas": 5,
    "hobi": "melukis"
}

# Mengambil isi lewat labelnya (bukan nomor urut seperti list)
print(murid["nama"])
print(murid["kelas"])
print(murid["hobi"])


# Isi dictionary bisa diubah, dan bisa ditambah label baru kapan saja
murid["hobi"] = "berenang"        # ubah isi laci yang sudah ada
murid["sekolah"] = "SD Ceria"     # laci baru, otomatis dibuat

print(murid)


# ⚠️ Awas - memanggil label yang belum ada bikin error!
# print(murid["umur"])   # <- kalau baris ini diaktifkan, Python akan berhenti dengan:
#                              KeyError: 'umur'
# Sengaja dikomentari supaya berkas ini tetap bisa dijalankan sampai selesai.
# Coba hapus tanda pagar di depan baris itu sendiri untuk melihat errornya.


# Jalan-jalan ke semua laci sekaligus, pakai for + .items()
for label, isi in murid.items():
    print(f"{label}: {isi}")


# 🎮 Main Yuk!
# Buat kamus profil dirimu sendiri, lalu cetak salah satu bagiannya.
profil = {"nama": "Ganti dengan namamu", "kota": "Ganti dengan kotamu"}
print(f"Aku dari {profil['kota']}")


# 🔍 Tahu Lebih
# .get() adalah cara aman mengambil isi dictionary - kalau labelnya
# tidak ada, dia kasih nilai cadangan, bukan bikin program berhenti.
print(murid.get("umur", "belum diisi"))
