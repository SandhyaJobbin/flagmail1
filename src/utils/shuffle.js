import { EMAIL_POOL as EMAILS } from '../data/emails.js';

const CURATED_ZONE_EMAIL_IDS = {
  1: ['E003', 'E001', 'E004', 'E017', 'E015'],
  2: ['E031', 'E032', 'E026', 'E029', 'E040'],
  3: ['E046', 'E047', 'E048', 'E050', 'E049'],
};

const ZONE_CLUE_LIMITS = {
  1: 4,
  2: 4,
  3: 4,
};

function withStaticClues(email) {
  const maxClues = ZONE_CLUE_LIMITS[email.zone] ?? 4;
  return { ...email, clues: [...email.clues].slice(0, maxClues) };
}

export function shuffleEmails() {
  const byId = new Map(EMAILS.map(email => [email.id, email]));

  return Object.entries(CURATED_ZONE_EMAIL_IDS)
    .flatMap(([, ids]) => ids.map((id) => withStaticClues(byId.get(id))))
    .filter(Boolean)
}
