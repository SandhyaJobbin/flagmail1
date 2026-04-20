import { useState, useCallback } from 'react';

export function useScoring() {
  const [totalScore, setTotalScore] = useState(0);
  const [perEmail, setPerEmail] = useState([]);
  const [zoneScores, setZoneScores] = useState({ 1: 0, 2: 0, 3: 0 });
  const [categoryCorrect, setCategoryCorrect] = useState({
    'Legitimate':          { correct: 0, total: 0 },
    'Spam & Junk':         { correct: 0, total: 0 },
    'Phishing & Spoofing': { correct: 0, total: 0 },
  });

  const scoreRound = useCallback(({ email, selectedL1, hintRevealed, timedOut }) => {
    const l1Correct = selectedL1 === email.level1;
    const points = l1Correct ? 2 : 0;

    const record = {
      emailId: email.id,
      zone: email.zone,
      selectedL1,
      correctL1: email.level1,
      l1Correct,
      hintUsed: hintRevealed,
      timedOut,
      points,
    };

    setPerEmail(prev => [...prev, record]);
    setTotalScore(prev => prev + points);
    setZoneScores(prev => ({ ...prev, [email.zone]: (prev[email.zone] || 0) + points }));
    setCategoryCorrect(prev => {
      const cat = email.level1;
      return {
        ...prev,
        [cat]: {
          correct: prev[cat].correct + (l1Correct ? 1 : 0),
          total: prev[cat].total + 1,
        },
      };
    });

    return record;
  }, []);

  const resetScoring = useCallback(() => {
    setTotalScore(0);
    setPerEmail([]);
    setZoneScores({ 1: 0, 2: 0, 3: 0 });
    setCategoryCorrect({
      'Legitimate':          { correct: 0, total: 0 },
      'Spam & Junk':         { correct: 0, total: 0 },
      'Phishing & Spoofing': { correct: 0, total: 0 },
    });
  }, []);

  return { totalScore, perEmail, zoneScores, categoryCorrect, scoreRound, resetScoring };
}
