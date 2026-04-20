import { EMAIL_POOL as EMAILS } from '../data/emails.js';

function fisherYates(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Shuffle within each zone independently, then concatenate in order.
// All 10 emails per zone are always played (pool size == game size).
export function shuffleEmails() {
  const zone1 = fisherYates(EMAILS.filter(e => e.zone === 1));
  const zone2 = fisherYates(EMAILS.filter(e => e.zone === 2));
  const zone3 = fisherYates(EMAILS.filter(e => e.zone === 3));
  return [...zone1, ...zone2, ...zone3];
}
