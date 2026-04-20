import { useState, useCallback, useRef } from 'react';
import {
  ROUND_DURATION_SECONDS,
  LIGHTNING_READ_SECONDS,
  SNIPER_SECONDS,
  BEAT_THE_CLOCK_SECONDS,
} from '../config/game.js';

export const BADGES = {
  LIGHTNING_READ:   { id: 'LIGHTNING_READ',   name: 'Lightning Read',   icon: '⚡', rare: false, desc: 'Correct in under 10 seconds' },
  ON_FIRE:          { id: 'ON_FIRE',          name: 'On Fire',          icon: '🔥', rare: false, desc: '5 correct classifications in a row' },
  ZONE_CLEAR:       { id: 'ZONE_CLEAR',       name: 'Zone Clear',       icon: '✅', rare: false, desc: 'Complete a zone with no wrong answers' },
  SNIPER:           { id: 'SNIPER',           name: 'Sniper',           icon: '🎯', rare: false, desc: 'First email: correct, no hint, with time to spare' },
  BEAT_THE_CLOCK:   { id: 'BEAT_THE_CLOCK',   name: 'Beat the Clock',   icon: '⏱', rare: false, desc: 'Correct with under 5 seconds remaining' },
  EAGLE_EYE:        { id: 'EAGLE_EYE',        name: 'Eagle Eye',        icon: '🦅', rare: false, desc: 'Correctly identified all 3 email categories' },
  GHOST_DETECTIVE:  { id: 'GHOST_DETECTIVE',  name: 'Ghost Detective',  icon: '👻', rare: true,  desc: 'Full game — zero hints revealed' },
  ICE_COLD:         { id: 'ICE_COLD',         name: 'Ice Cold',         icon: '🧊', rare: true,  desc: 'All 10 Escalation emails classified correctly' },
  PERFECT_EYE:      { id: 'PERFECT_EYE',      name: 'Perfect Eye',      icon: '🔮', rare: true,  desc: 'All 30 emails classified correctly' },
  NO_HINTS_NEEDED:  { id: 'NO_HINTS_NEEDED',  name: 'No Hints Needed',  icon: '🕵', rare: true,  desc: 'Completed the full assessment without revealing any hints' },
};

export function useBadges() {
  const [earned, setEarned] = useState([]);
  const [pendingToast, setPendingToast] = useState(null);
  const streakRef = useRef(0);
  const categoriesCorrect = useRef(new Set());
  const firstEmailRef = useRef(true);
  const earnedSetRef = useRef(new Set());

  const earnBadge = useCallback((badgeId) => {
    if (earnedSetRef.current.has(badgeId)) return false;
    earnedSetRef.current.add(badgeId);
    setPendingToast(BADGES[badgeId]);
    setEarned(prev => [...prev, badgeId]);
    return true;
  }, []);

  const dismissToast = useCallback(() => setPendingToast(null), []);

  const checkAfterRound = useCallback(({ record, timeLeft, roundDuration = ROUND_DURATION_SECONDS }) => {
    const { l1Correct, hintUsed } = record;
    let unlockedAny = false;

    if (l1Correct) {
      streakRef.current += 1;
      categoriesCorrect.current.add(record.correctL1);
    } else {
      streakRef.current = 0;
    }

    if (firstEmailRef.current) {
      firstEmailRef.current = false;
      if (l1Correct && !hintUsed && timeLeft >= roundDuration - SNIPER_SECONDS) {
        unlockedAny = earnBadge('SNIPER') || unlockedAny;
      }
    }

    if (l1Correct && timeLeft >= roundDuration - LIGHTNING_READ_SECONDS) {
      unlockedAny = earnBadge('LIGHTNING_READ') || unlockedAny;
    }

    if (l1Correct && timeLeft > 0 && timeLeft <= BEAT_THE_CLOCK_SECONDS) {
      unlockedAny = earnBadge('BEAT_THE_CLOCK') || unlockedAny;
    }

    if (streakRef.current >= 5) {
      unlockedAny = earnBadge('ON_FIRE') || unlockedAny;
    }

    if (categoriesCorrect.current.size >= 3) {
      unlockedAny = earnBadge('EAGLE_EYE') || unlockedAny;
    }

    return { streak: streakRef.current, unlockedAny };
  }, [earnBadge]);

  const checkAfterZone = useCallback(({ zoneEmails, zoneHintsUsed }) => {
    if (!zoneEmails.length) return;
    const allCorrect = zoneEmails.every(r => r.l1Correct);
    if (allCorrect) earnBadge('ZONE_CLEAR');
    if (zoneHintsUsed === 0) earnBadge('NO_HINTS_NEEDED');
  }, [earnBadge]);

  const checkAfterGame = useCallback(({ perEmail, totalHintsUsed }) => {
    if (!perEmail.length) return;
    if (totalHintsUsed === 0) earnBadge('GHOST_DETECTIVE');

    const hardEmails = perEmail.filter(r => r.zone === 3);
    if (hardEmails.length === 10 && hardEmails.every(r => r.l1Correct)) {
      earnBadge('ICE_COLD');
    }

    if (perEmail.length === 30 && perEmail.every(r => r.l1Correct)) {
      earnBadge('PERFECT_EYE');
    }
  }, [earnBadge]);

  const resetBadges = useCallback(() => {
    setEarned([]);
    setPendingToast(null);
    streakRef.current = 0;
    categoriesCorrect.current = new Set();
    firstEmailRef.current = true;
    earnedSetRef.current = new Set();
  }, []);

  return { earned, pendingToast, dismissToast, checkAfterRound, checkAfterZone, checkAfterGame, resetBadges };
}
