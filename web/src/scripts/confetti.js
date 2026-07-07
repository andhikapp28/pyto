// Konfeti ringan tanpa dependensi luar (lihat plan/bab-01-animasi.md #8).
// Menaruh beberapa div warna-warni yang jatuh & berputar, lalu membersihkan
// dirinya sendiri. Dipicu sekali saat latihan pertama berhasil dijalankan.
const COLORS = ['var(--pyto-green)', 'var(--sunny-yellow)', 'var(--sky-blue)', 'var(--coral)'];

export function launchConfetti(container, { pieces = 26 } = {}) {
  if (!container) return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return; // pengguna sensitif gerakan: lewati efeknya, konten tetap utuh

  for (let i = 0; i < pieces; i++) {
    const piece = document.createElement('span');
    piece.className = 'confetti-piece';
    const size = 6 + Math.random() * 6;
    piece.style.left = `${Math.random() * 100}%`;
    piece.style.width = `${size}px`;
    piece.style.height = `${size * 0.4}px`;
    piece.style.background = COLORS[i % COLORS.length];
    piece.style.animationDuration = `${1.4 + Math.random() * 1.1}s`;
    piece.style.animationDelay = `${Math.random() * 0.3}s`;
    container.appendChild(piece);
  }

  setTimeout(() => {
    container.innerHTML = '';
  }, 2600);
}
