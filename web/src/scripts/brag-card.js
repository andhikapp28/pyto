/**
 * Generator Kartu Prestasi Petualang (Brag Card) Berbasis HTML5 Canvas
 * Menghasilkan kartu visual resolusi tinggi (800 x 1000 px) untuk dibagikan
 * ke WhatsApp Status, Instagram Story, atau media sosial.
 */

export function renderBragCard(canvas, { userName, stats, streakData, badges }) {
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const width = 800;
  const height = 1000;
  canvas.width = width;
  canvas.height = height;

  // 1. Latar Belakang Gradasi Deep Emerald & Navy
  const bgGrad = ctx.createLinearGradient(0, 0, width, height);
  bgGrad.addColorStop(0, '#133522');
  bgGrad.addColorStop(0.45, '#192C23');
  bgGrad.addColorStop(1, '#0C1319');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, width, height);

  // Aksen Lingkaran Cahaya Lembut di Pojok Atas
  const glowGrad = ctx.createRadialGradient( width * 0.8, 120, 10, width * 0.8, 120, 320);
  glowGrad.addColorStop(0, 'rgba(47, 191, 113, 0.28)');
  glowGrad.addColorStop(1, 'rgba(47, 191, 113, 0)');
  ctx.fillStyle = glowGrad;
  ctx.fillRect(0, 0, width, height);

  // Frame Border Melingkar
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
  ctx.lineWidth = 2;
  ctx.strokeRect(28, 28, width - 56, height - 56);

  // 2. Header Brand
  ctx.textAlign = 'center';
  ctx.fillStyle = '#2FBF71';
  ctx.font = '800 15px "JetBrains Mono", monospace';
  ctx.fillText('🐍 BELAJAR PYTHON BARENG PYTO', width / 2, 75);

  ctx.fillStyle = '#FFFFFF';
  ctx.font = '800 32px "Baloo 2", "Nunito", sans-serif';
  ctx.fillText('KARTU PRESTASI PETUALANG', width / 2, 115);

  // 3. Kartu Profil Petualang (Panel Tengah Atas)
  const profileCardY = 145;
  const profileCardHeight = 220;
  drawRoundedRect(ctx, 50, profileCardY, width - 100, profileCardHeight, 20);
  ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
  ctx.fill();
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
  ctx.lineWidth = 1.5;
  ctx.stroke();

  // Avatar Pyto Lingkaran
  const avatarCenterX = width / 2;
  const avatarCenterY = profileCardY + 58;
  ctx.beginPath();
  ctx.arc(avatarCenterX, avatarCenterY, 38, 0, Math.PI * 2);
  ctx.fillStyle = '#2FBF71';
  ctx.fill();
  ctx.strokeStyle = '#FFFFFF';
  ctx.lineWidth = 3;
  ctx.stroke();

  ctx.font = '36px "Baloo 2", sans-serif';
  ctx.fillStyle = '#FFFFFF';
  ctx.textBaseline = 'middle';
  ctx.fillText('🐍', avatarCenterX, avatarCenterY + 2);
  ctx.textBaseline = 'alphabetic';

  // Nama Pengguna
  ctx.fillStyle = '#FFFFFF';
  ctx.font = '800 28px "Baloo 2", "Nunito", sans-serif';
  const displayName = userName.length > 24 ? userName.substring(0, 24) + '...' : userName;
  ctx.fillText(displayName, width / 2, profileCardY + 138);

  // Gelar Petualang
  ctx.fillStyle = '#FFC94D';
  ctx.font = '700 18px "Nunito", sans-serif';
  ctx.fillText(stats.title, width / 2, profileCardY + 172);

  // 4. Baris Statistik (3 Kotak Sejajar)
  const statY = 385;
  const statBoxWidth = 216;
  const statBoxHeight = 100;
  const gap = 16;
  const startX = 50 + ((width - 100) - (statBoxWidth * 3 + gap * 2)) / 2;

  const statItems = [
    { label: 'Bab Selesai', value: `${stats.completedCount} / ${stats.totalChapters}`, emoji: '📚', color: '#4DA6FF' },
    { label: 'Streak Belajar', value: `${streakData.streak} Hari`, emoji: '🔥', color: '#FF7A6B' },
    { label: 'Lencana', value: `${badges.filter((b) => b.isUnlocked).length} / ${badges.length}`, emoji: '🏅', color: '#FFC94D' },
  ];

  statItems.forEach((item, idx) => {
    const x = startX + idx * (statBoxWidth + gap);
    drawRoundedRect(ctx, x, statY, statBoxWidth, statBoxHeight, 16);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
    ctx.fill();
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.lineWidth = 1;
    ctx.stroke();

    ctx.textAlign = 'center';
    ctx.font = '700 13px "Nunito", sans-serif';
    ctx.fillStyle = '#A0B2A6';
    ctx.fillText(`${item.emoji} ${item.label}`, x + statBoxWidth / 2, statY + 34);

    ctx.font = '800 24px "Baloo 2", sans-serif';
    ctx.fillStyle = item.color;
    ctx.fillText(item.value, x + statBoxWidth / 2, statY + 74);
  });

  // 5. Bilah Kemajuan Global (Progress Bar)
  const progressY = 510;
  ctx.textAlign = 'left';
  ctx.fillStyle = '#E6E6E6';
  ctx.font = '700 15px "Nunito", sans-serif';
  ctx.fillText('Kemajuan Belajar Keseluruhan', 50, progressY);

  ctx.textAlign = 'right';
  ctx.fillStyle = '#2FBF71';
  ctx.font = '800 15px "JetBrains Mono", monospace';
  ctx.fillText(`${stats.percentage}% Selesai`, width - 50, progressY);

  const barY = progressY + 12;
  const barWidth = width - 100;
  const barHeight = 14;
  drawRoundedRect(ctx, 50, barY, barWidth, barHeight, 7);
  ctx.fillStyle = 'rgba(255, 255, 255, 0.12)';
  ctx.fill();

  const fillWidth = Math.max(14, (barWidth * stats.percentage) / 100);
  drawRoundedRect(ctx, 50, barY, fillWidth, barHeight, 7);
  const fillGrad = ctx.createLinearGradient(50, 0, 50 + fillWidth, 0);
  fillGrad.addColorStop(0, '#2FBF71');
  fillGrad.addColorStop(1, '#FFC94D');
  ctx.fillStyle = fillGrad;
  ctx.fill();

  // 6. Koleksi Lencana (Badges Grid)
  const badgeSectionY = 575;
  ctx.textAlign = 'left';
  ctx.fillStyle = '#FFFFFF';
  ctx.font = '800 20px "Baloo 2", sans-serif';
  ctx.fillText('Koleksi Lencana Petualang', 50, badgeSectionY);

  const badgeCols = 2;
  const badgeItemWidth = (width - 100 - 16) / 2;
  const badgeItemHeight = 44;
  const badgeStartY = badgeSectionY + 18;

  badges.forEach((badge, i) => {
    const col = i % badgeCols;
    const row = Math.floor(i / badgeCols);
    const bx = 50 + col * (badgeItemWidth + 16);
    const by = badgeStartY + row * (badgeItemHeight + 10);

    drawRoundedRect(ctx, bx, by, badgeItemWidth, badgeItemHeight, 10);

    if (badge.isUnlocked) {
      ctx.fillStyle = 'rgba(47, 191, 113, 0.18)';
      ctx.fill();
      ctx.strokeStyle = 'rgba(47, 191, 113, 0.6)';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      ctx.textAlign = 'left';
      ctx.font = '20px sans-serif';
      ctx.fillText(badge.emoji, bx + 12, by + 28);

      ctx.fillStyle = '#FFFFFF';
      ctx.font = '700 14px "Nunito", sans-serif';
      ctx.fillText(badge.title, bx + 42, by + 27);
    } else {
      ctx.fillStyle = 'rgba(255, 255, 255, 0.03)';
      ctx.fill();
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
      ctx.lineWidth = 1;
      ctx.stroke();

      ctx.textAlign = 'left';
      ctx.font = '16px sans-serif';
      ctx.fillText('🔒', bx + 12, by + 27);

      ctx.fillStyle = '#6E8075';
      ctx.font = '600 13px "Nunito", sans-serif';
      ctx.fillText(badge.title, bx + 40, by + 27);
    }
  });

  // 7. Footer Kartu
  const footerY = 925;
  ctx.textAlign = 'center';
  ctx.fillStyle = '#A0B2A6';
  ctx.font = '600 14px "Nunito", sans-serif';
  ctx.fillText('Belajar ngoding Python dari nol — Gratis, langsung coba di browser!', width / 2, footerY);

  ctx.fillStyle = '#2FBF71';
  ctx.font = '700 13px "JetBrains Mono", monospace';
  ctx.fillText('https://andhikapp28.github.io/pyto/', width / 2, footerY + 24);
}

function drawRoundedRect(ctx, x, y, width, height, radius) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
}
