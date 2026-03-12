import { useState, useCallback, useRef } from 'react';

export const BADGES = {
  LIGHTNING_READ:   { id: 'LIGHTNING_READ',   name: 'Lightning Read',   icon: '⚡', rare: false, desc: 'Correct in under 10 seconds' },
  ON_FIRE:          { id: 'ON_FIRE',           name: 'On Fire',          icon: '🔥', rare: false, desc: '5 correct L1 in a row' },
  ZONE_CLEAR:       { id: 'ZONE_CLEAR',        name: 'Zone Clear',       icon: '✅', rare: false, desc: 'Complete a zone with no wrong answers' },
  SNIPER:           { id: 'SNIPER',            name: 'Sniper',           icon: '🎯', rare: false, desc: 'First email: correct, no clues, under 15s' },
  BEAT_THE_CLOCK:   { id: 'BEAT_THE_CLOCK',   name: 'Beat the Clock',   icon: '⏱', rare: false, desc: 'Correct with under 5 seconds remaining' },
  EAGLE_EYE:        { id: 'EAGLE_EYE',         name: 'Eagle Eye',        icon: '🦅', rare: false, desc: 'All 6 L1 categories identified correctly at least once' },
  GHOST_DETECTIVE:  { id: 'GHOST_DETECTIVE',   name: 'Ghost Detective',  icon: '👻', rare: true,  desc: 'Full game – zero clues revealed' },
  ICE_COLD:         { id: 'ICE_COLD',          name: 'Ice Cold',         icon: '🧊', rare: true,  desc: 'All 5 hard emails correct, no clues' },
  PERFECT_EYE:      { id: 'PERFECT_EYE',       name: 'Perfect Eye',      icon: '🔮', rare: true,  desc: 'All 25 emails: L1 + L2 correct' },
  NO_HINTS_NEEDED:  { id: 'NO_HINTS_NEEDED',   name: 'No Hints Needed',  icon: '🕵', rare: true,  desc: 'Complete a zone without revealing any clue' },
};

export function useBadges() {
  const [earned, setEarned] = useState([]);
  const [pendingToast, setPendingToast] = useState(null);
  const streakRef = useRef(0);
  const categoriesCorrect = useRef(new Set());
  const firstEmailRef = useRef(true);

  const earnBadge = useCallback((badgeId) => {
    setEarned(prev => {
      if (prev.includes(badgeId)) return prev;
      setPendingToast(BADGES[badgeId]);
      return [...prev, badgeId];
    });
  }, []);

  const dismissToast = useCallback(() => {
    setPendingToast(null);
  }, []);

  const checkAfterRound = useCallback(({ record, timeLeft, totalCluesEverUsed, emailPool }) => {
    const { l1Correct, l2Correct, cluesUsed, zone } = record;

    // Track streak
    if (l1Correct) {
      streakRef.current += 1;
    } else {
      streakRef.current = 0;
    }

    // Track categories
    if (l1Correct) {
      categoriesCorrect.current.add(record.correctL1);
    }

    // Sniper – first email, correct, no clues, under 15s
    if (firstEmailRef.current) {
      firstEmailRef.current = false;
      if (l1Correct && l2Correct && cluesUsed === 0 && timeLeft >= 30) {
        earnBadge('SNIPER');
      }
    }

    // Lightning Read – correct in under 10s (timeLeft > 35)
    if (l1Correct && timeLeft > 35) {
      earnBadge('LIGHTNING_READ');
    }

    // Beat the Clock – correct with < 5s remaining
    if (l1Correct && timeLeft > 0 && timeLeft <= 5) {
      earnBadge('BEAT_THE_CLOCK');
    }

    // On Fire – 5 correct L1 in a row
    if (streakRef.current >= 5) {
      earnBadge('ON_FIRE');
    }

    // Eagle Eye – all 6 L1 categories identified
    if (categoriesCorrect.current.size >= 6) {
      earnBadge('EAGLE_EYE');
    }

    return { streak: streakRef.current };
  }, [earnBadge]);

  const checkAfterZone = useCallback(({ zoneEmails, zoneCluesUsed, zone }) => {
    const allCorrect = zoneEmails.every(r => r.l1Correct);
    if (allCorrect) earnBadge('ZONE_CLEAR');
    if (zoneCluesUsed === 0) earnBadge('NO_HINTS_NEEDED');
  }, [earnBadge]);

  const checkAfterGame = useCallback(({ perEmail, totalCluesUsed }) => {
    if (totalCluesUsed === 0) earnBadge('GHOST_DETECTIVE');

    const hardEmails = perEmail.filter(r => r.zone === 3);
    const iceCold = hardEmails.length === 5 &&
      hardEmails.every(r => r.l1Correct && r.l2Correct && r.cluesUsed === 0);
    if (iceCold) earnBadge('ICE_COLD');

    const perfectEye = perEmail.every(r => r.l1Correct && r.l2Correct);
    if (perfectEye) earnBadge('PERFECT_EYE');
  }, [earnBadge]);

  const resetBadges = useCallback(() => {
    setEarned([]);
    setPendingToast(null);
    streakRef.current = 0;
    categoriesCorrect.current = new Set();
    firstEmailRef.current = true;
  }, []);

  return {
    earned,
    pendingToast,
    dismissToast,
    checkAfterRound,
    checkAfterZone,
    checkAfterGame,
    resetBadges,
  };
}
