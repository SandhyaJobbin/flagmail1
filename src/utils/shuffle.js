import { EMAIL_POOL as EMAILS } from '../data/emails.js';

// Fisher-Yates shuffle
function fisherYates(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/**
 * Draw 15 emails from the pool, preserving zone distribution:
 * Zone 1: 5 easy emails  (random selection, shuffled)
 * Zone 2: 5 medium emails (random selection, shuffled)
 * Zone 3: 5 hard emails   (random selection, shuffled)
 */
// Shuffle clues for an email and truncate to the zone's allowed count
function withShuffledClues(email) {
  const maxClues = email.zone === 3 ? 2 : email.zone === 2 ? 3 : 4;
  return { ...email, clues: fisherYates([...email.clues]).slice(0, maxClues) };
}

export function shuffleEmails() {
  const zone1 = fisherYates(EMAILS.filter(e => e.zone === 1)).slice(0, 5).map(withShuffledClues);
  const zone2 = fisherYates(EMAILS.filter(e => e.zone === 2)).slice(0, 5).map(withShuffledClues);
  const zone3 = fisherYates(EMAILS.filter(e => e.zone === 3)).slice(0, 5).map(withShuffledClues);
  return [...zone1, ...zone2, ...zone3];
}
