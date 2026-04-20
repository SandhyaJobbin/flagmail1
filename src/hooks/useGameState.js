import { useState, useCallback } from 'react';
import { shuffleEmails } from '../utils/shuffle.js';

export const SCREENS = {
  INTRO:         'intro',
  LANDING:       'landing',
  TUTORIAL:      'tutorial',
  ZONE_INTRO:    'zone_intro',
  ROUND:         'round',
  EXPLANATION:   'explanation',
  ZONE_COMPLETE: 'zone_complete',
  RESULTS:       'results',
  LEADERBOARD:   'leaderboard',
};

const ZONE_EMAIL_COUNTS = { 1: 10, 2: 10, 3: 10 };

function initialRoundState() {
  return {
    hintRevealed: false,
    selectedL1: null,
    submitted: false,
    timedOut: false,
    lastRecord: null,
  };
}

export function useGameState() {
  const [screen, setScreen] = useState(SCREENS.INTRO);
  const [player, setPlayer] = useState({ name: '', email: '' });
  const [emailPool, setEmailPool] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [zone, setZone] = useState(1);
  const [consecutivePerfect, setConsecutivePerfect] = useState(0);
  const [earlyUnlocked, setEarlyUnlocked] = useState(false);
  const [tutorialSeen, setTutorialSeen] = useState(false);
  const [round, setRound] = useState(initialRoundState());

  const currentEmail = emailPool[currentIndex] || null;

  const zoneStart = zone === 1 ? 0 : zone === 2 ? 10 : 20;
  const zoneEnd   = zone === 1 ? 10 : zone === 2 ? 20 : 30;
  const emailInZone = currentIndex - zoneStart + 1;
  const emailsInZone = ZONE_EMAIL_COUNTS[zone];

  const startGame = useCallback((name, email) => {
    setPlayer({ name, email });
    const pool = shuffleEmails();
    setEmailPool(pool);
    setCurrentIndex(0);
    setZone(1);
    setConsecutivePerfect(0);
    setEarlyUnlocked(false);
    setRound(initialRoundState());
    if (!tutorialSeen) {
      setScreen(SCREENS.TUTORIAL);
    } else {
      setScreen(SCREENS.ZONE_INTRO);
    }
  }, [tutorialSeen]);

  const completeIntro = useCallback(() => {
    setScreen(SCREENS.LANDING);
  }, []);

  const completeTutorial = useCallback(() => {
    setTutorialSeen(true);
    setScreen(SCREENS.ZONE_INTRO);
  }, []);

  const startZone = useCallback(() => {
    setRound(initialRoundState());
    setScreen(SCREENS.ROUND);
  }, []);

  const revealHint = useCallback(() => {
    setRound(prev => ({ ...prev, hintRevealed: true }));
  }, []);

  const selectL1 = useCallback((l1) => {
    setRound(prev => ({ ...prev, selectedL1: l1 }));
  }, []);

  const handleTimeout = useCallback(() => {
    setRound(prev => ({ ...prev, timedOut: true }));
  }, []);

  const submitRound = useCallback((record) => {
    setRound(prev => ({ ...prev, submitted: true, lastRecord: record }));

    const perfect = record.points === 2;
    setConsecutivePerfect(prev => {
      const next = perfect ? prev + 1 : 0;
      if (next >= 3 && !earlyUnlocked) {
        setEarlyUnlocked(true);
      }
      return next;
    });

    setScreen(SCREENS.EXPLANATION);
  }, [earlyUnlocked]);

  const nextEmail = useCallback(() => {
    const nextIndex = currentIndex + 1;
    if (nextIndex >= zoneEnd) {
      setScreen(SCREENS.ZONE_COMPLETE);
      return;
    }
    setCurrentIndex(nextIndex);
    setRound(initialRoundState());
    setScreen(SCREENS.ROUND);
  }, [currentIndex, zoneEnd]);

  const advanceZone = useCallback(() => {
    const nextZone = zone + 1;
    if (nextZone > 3) {
      setScreen(SCREENS.RESULTS);
      return;
    }
    setZone(nextZone);
    setCurrentIndex(zoneStart + ZONE_EMAIL_COUNTS[zone]);
    setConsecutivePerfect(0);
    setEarlyUnlocked(false);
    setRound(initialRoundState());
    setScreen(SCREENS.ZONE_INTRO);
  }, [zone, zoneStart]);

  const goToResults = useCallback(() => { setScreen(SCREENS.RESULTS); }, []);
  const goToLeaderboard = useCallback(() => { setScreen(SCREENS.LEADERBOARD); }, []);
  const goBackToResults = useCallback(() => { setScreen(SCREENS.RESULTS); }, []);

  const resetGame = useCallback(() => {
    setScreen(SCREENS.INTRO);
    setPlayer({ name: '', email: '' });
    setEmailPool([]);
    setCurrentIndex(0);
    setZone(1);
    setConsecutivePerfect(0);
    setEarlyUnlocked(false);
    setRound(initialRoundState());
  }, []);

  return {
    screen, player, emailPool, currentIndex, currentEmail,
    zone, zoneStart, zoneEnd, emailInZone, emailsInZone,
    consecutivePerfect, earlyUnlocked, round,
    startGame, completeIntro, completeTutorial, startZone,
    revealHint, selectL1, handleTimeout, submitRound,
    nextEmail, advanceZone, goToResults, goToLeaderboard,
    goBackToResults, resetGame,
  };
}
