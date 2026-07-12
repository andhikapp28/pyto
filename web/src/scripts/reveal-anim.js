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

// Util kecil dipakai oleh animasi "boleh diulang lewat hover/klik/keyboard"
// di kartu-kartu demo (FStringLinkDemo, InputFlowDemo, ReassignmentDemo,
// dst). Melepas lalu memasang ulang `activeClass` (dengan paksa reflow di
// antaranya) supaya animasi CSS-nya bisa diputar ulang dari awal — dipicu
// lewat mouseenter/click/keydown (Enter/Space) secara default. Kembalikan
// fungsi replay-nya supaya bisa dipakai ulang juga sebagai handler
// "aktifkan pertama kali" (lihat RunDemo.astro).
export function wireReplay(el, activeClass, { events = ['mouseenter', 'click', 'keydown'] } = {}) {
  const replay = () => {
    el.classList.remove(activeClass);
    void el.offsetWidth; // paksa reflow supaya animasi bisa diulang
    el.classList.add(activeClass);
  };

  events.forEach((eventName) => {
    if (eventName === 'keydown') {
      el.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          replay();
        }
      });
    } else {
      el.addEventListener(eventName, replay);
    }
  });

  return replay;
}
