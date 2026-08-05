// Fase 3 masih tahap RISET (lihat plan/Fase3/plan.md & riset-topik-fase3.md) — belum
// ada keputusan final soal topik, jumlah bab, atau urutan. Karena itu di beranda cuma
// ditampilkan sebagai kartu placeholder abu-abu "TBA", TANPA judul/nomor bab spesifik,
// supaya tidak mengesankan komitmen yang belum ada. Begitu kurikulum Fase 3 diputuskan,
// buat fase1.js/fase2.js-nya (judul, blurb, emoji per bab) lalu tinggal tambahkan ke
// array `fases` di ChapterList.astro — komponen itu otomatis lepas mode "coming soon"
// begitu meta.comingSoon dihapus/false.

export const fase3Meta = {
  label: 'Fase 3',
  name: 'Segera Hadir',
  tagline: 'Topiknya masih diriset — pantau terus, ya!',
  comingSoon: true,
};

// Jumlah kartu placeholder murni kosmetik (sekadar kasih gambaran "beberapa bab lagi
// nyusul"), bukan janji jumlah bab final.
export const fase3PlaceholderCount = 6;
