// Util kecil dipakai oleh animasi "sekali putar saat terlihat" di halaman
// bab (magic-helper, typewriter, interpreter, dst). Pola sama persis dengan
// reveal.js: pakai IntersectionObserver, berhenti mengamati setelah sekali
// jalan, dan langsung aktifkan semuanya kalau prefers-reduced-motion atau
// IntersectionObserver tidak tersedia.
export function observeOnce(elements, activate, { threshold = 0.3 } = {}) {
  const els = Array.from(elements).filter(Boolean);
  if (els.length === 0) return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion || !('IntersectionObserver' in window)) {
    els.forEach((el) => activate(el));
    return;
  }

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          activate(entry.target);
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold }
  );

  els.forEach((el) => observer.observe(el));
}
