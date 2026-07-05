import { defineConfig } from 'astro/config';

// Situs di-deploy sebagai GitHub Pages *project site* di
// https://andhikapp28.github.io/pyto/ — karena itu `site` dan `base`
// harus diatur agar semua link/asset internal Astro otomatis benar.
export default defineConfig({
  site: 'https://andhikapp28.github.io',
  base: '/pyto',
});
