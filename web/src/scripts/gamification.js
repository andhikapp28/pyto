/**
 * Sistem Retensi & Gamifikasi Lokal (Local-First) untuk "Belajar Python Bareng Pyto"
 *
 * Seluruh data disimpan di localStorage browser pengguna:
 * - Tidak butuh server, database, atau autentikasi akun luar (zero-cost, static GitHub Pages).
 * - Bekerja 100% offline.
 * - Mendukung pelacakan bab selesai, streak belajar harian, badge pencapaian, dan brag card.
 */

export const STORAGE_KEYS = {
  COMPLETED_CHAPTERS: 'pyto_completed_chapters',
  COMPLETED_CHALLENGES: 'pyto_completed_challenges',
  STREAK_DATA: 'pyto_streak_data',
  USER_NAME: 'pyto_user_name',
};

export const TOTAL_CHAPTERS = 20;

export const BADGES = [
  {
    id: 'penjelajah',
    title: 'Penjelajah Pertama',
    emoji: '🐣',
    description: 'Menulis kode Python pertama dan menyapa dunia.',
    unlockHint: 'Selesaikan Bab 1 atau Bab 2',
    check: (completed) => completed.includes(1) || completed.includes(2),
  },
  {
    id: 'ahli_hitung',
    title: 'Ahli Hitung',
    emoji: '🧮',
    description: 'Menguasai angka, variabel, dan hitungan komputer.',
    unlockHint: 'Selesaikan Bab 5',
    check: (completed) => completed.includes(5),
  },
  {
    id: 'detektif_kode',
    title: 'Detektif Kode',
    emoji: '🕵️',
    description: 'Menjinakkan pesan error merah dan jago membaca traceback.',
    unlockHint: 'Selesaikan Bab 9',
    check: (completed) => completed.includes(9),
  },
  {
    id: 'kolektor_data',
    title: 'Kolektor Data',
    emoji: '📦',
    description: 'Merapikan data dengan List dan menuntaskan Fase 1.',
    unlockHint: 'Selesaikan Bab 10',
    check: (completed) => completed.includes(10),
  },
  {
    id: 'jawara_tantangan',
    title: 'Jawara Misi Kode',
    emoji: '🎯',
    description: 'Menyelesaikan minimal 5 misi tantangan kode praktis.',
    unlockHint: 'Selesaikan minimal 5 misi tantangan',
    check: (completed, challenges = []) => challenges.length >= 5,
  },
  {
    id: 'seniman_digital',
    title: 'Seniman Digital',
    emoji: '🎨',
    description: 'Melukis karya visual dengan kode di Kanvas Ajaib.',
    unlockHint: 'Selesaikan Bab 17',
    check: (completed) => completed.includes(17),
  },
  {
    id: 'pembuat_game',
    title: 'Pembuat Game',
    emoji: '🎮',
    description: 'Menciptakan game Batu-Gunting-Kertas interaktif.',
    unlockHint: 'Selesaikan Bab 19',
    check: (completed) => completed.includes(19),
  },
  {
    id: 'bintang_python',
    title: 'Bintang Python',
    emoji: '🏆',
    description: 'Menuntaskan Capstone Kalkulator Keuangan Mini!',
    unlockHint: 'Selesaikan Bab 20',
    check: (completed) => completed.includes(20),
  },
];

export function getTodayDateString() {
  const d = new Date();
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}

export function getYesterdayDateString() {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}

export function getCompletedChapters() {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.COMPLETED_CHAPTERS);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      return parsed.map((n) => Number(n)).filter((n) => !isNaN(n) && n >= 1 && n <= TOTAL_CHAPTERS);
    }
    return [];
  } catch {
    return [];
  }
}

export function isChapterCompleted(chapterNum) {
  const completed = getCompletedChapters();
  return completed.includes(Number(chapterNum));
}

export function setChapterCompleted(chapterNum, isCompleted = true) {
  if (typeof window === 'undefined') return [];
  const num = Number(chapterNum);
  let completed = getCompletedChapters();
  const prevCount = completed.length;

  if (isCompleted) {
    if (!completed.includes(num)) {
      completed.push(num);
      completed.sort((a, b) => a - b);
      updateDailyStreak();
    }
  } else {
    completed = completed.filter((n) => n !== num);
  }

  try {
    localStorage.setItem(STORAGE_KEYS.COMPLETED_CHAPTERS, JSON.stringify(completed));
  } catch {}

  notifyProgressChange({ chapter: num, isCompleted, countChanged: completed.length !== prevCount });
  return completed;
}

export function toggleChapterCompleted(chapterNum) {
  const current = isChapterCompleted(chapterNum);
  setChapterCompleted(chapterNum, !current);
  return !current;
}

export function getCompletedChallenges() {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.COMPLETED_CHALLENGES);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      return parsed.map((n) => Number(n)).filter((n) => !isNaN(n) && n >= 1 && n <= TOTAL_CHAPTERS);
    }
    return [];
  } catch {
    return [];
  }
}

export function isChallengeCompleted(chapterNum) {
  const challenges = getCompletedChallenges();
  return challenges.includes(Number(chapterNum));
}

export function setChallengeCompleted(chapterNum, isCompleted = true) {
  if (typeof window === 'undefined') return [];
  const num = Number(chapterNum);
  let challenges = getCompletedChallenges();
  const prevCount = challenges.length;

  if (isCompleted) {
    if (!challenges.includes(num)) {
      challenges.push(num);
      challenges.sort((a, b) => a - b);
      updateDailyStreak();
    }
  } else {
    challenges = challenges.filter((n) => n !== num);
  }

  try {
    localStorage.setItem(STORAGE_KEYS.COMPLETED_CHALLENGES, JSON.stringify(challenges));
  } catch {}

  notifyProgressChange({ challenge: num, isCompleted, challengeCountChanged: challenges.length !== prevCount });
  return challenges;
}

export function getStreakData() {
  if (typeof window === 'undefined') return { streak: 0, lastActiveDate: '', isTodayActive: false };
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.STREAK_DATA);
    if (!raw) return { streak: 0, lastActiveDate: '', isTodayActive: false };
    const data = JSON.parse(raw);
    const today = getTodayDateString();
    return {
      streak: Number(data.streak) || 0,
      lastActiveDate: data.lastActiveDate || '',
      isTodayActive: data.lastActiveDate === today,
    };
  } catch {
    return { streak: 0, lastActiveDate: '', isTodayActive: false };
  }
}

export function updateDailyStreak() {
  if (typeof window === 'undefined') return { streak: 0, lastActiveDate: '', isTodayActive: false };
  const today = getTodayDateString();
  const current = getStreakData();

  if (current.lastActiveDate === today) {
    return current;
  }

  const yesterday = getYesterdayDateString();
  let newStreak = 1;

  if (current.lastActiveDate === yesterday) {
    newStreak = (current.streak || 0) + 1;
  } else if (!current.lastActiveDate) {
    newStreak = 1;
  } else {
    // Terlewat lebih dari 1 hari: reset streak ke 1
    newStreak = 1;
  }

  const updated = {
    streak: newStreak,
    lastActiveDate: today,
    isTodayActive: true,
  };

  try {
    localStorage.setItem(STORAGE_KEYS.STREAK_DATA, JSON.stringify(updated));
  } catch {}

  notifyProgressChange();
  return updated;
}

export function getUserName() {
  if (typeof window === 'undefined') return 'Petualang Pyto';
  try {
    return localStorage.getItem(STORAGE_KEYS.USER_NAME) || 'Petualang Pyto';
  } catch {
    return 'Petualang Pyto';
  }
}

export function setUserName(name) {
  if (typeof window === 'undefined') return 'Petualang Pyto';
  const trimmed = (name || '').trim() || 'Petualang Pyto';
  try {
    localStorage.setItem(STORAGE_KEYS.USER_NAME, trimmed);
  } catch {}
  notifyProgressChange();
  return trimmed;
}

export function getProgressStats() {
  const completed = getCompletedChapters();
  const challenges = getCompletedChallenges();
  const count = completed.length;
  const percentage = Math.round((count / TOTAL_CHAPTERS) * 100);

  let title = 'Pemula Penasaran';
  if (count >= 20) {
    title = 'Master Python 🏆';
  } else if (count >= 15) {
    title = 'Pakar Python Kreatif 🚀';
  } else if (count >= 10) {
    title = 'Penjelajah Tangguh ⚔️';
  } else if (count >= 5) {
    title = 'Detektif Kode Berbakat 🕵️';
  } else if (count >= 1) {
    title = 'Petualang Baru 🐣';
  }

  return {
    completed,
    completedCount: count,
    challenges,
    challengesCount: challenges.length,
    totalChapters: TOTAL_CHAPTERS,
    percentage,
    title,
  };
}

export function getBadgeStatus() {
  const completed = getCompletedChapters();
  const challenges = getCompletedChallenges();
  return BADGES.map((badge) => {
    const isUnlocked = badge.check(completed, challenges);
    return {
      ...badge,
      isUnlocked,
    };
  });
}

export function notifyProgressChange(detail = {}) {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new CustomEvent('pyto:progress-updated', { detail }));
}
