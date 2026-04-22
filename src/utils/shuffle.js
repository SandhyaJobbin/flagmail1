import { EMAIL_POOL as EMAILS } from '../data/emails.js';

function hashSeed(input) {
  let hash = 2166136261;
  for (let i = 0; i < input.length; i++) {
    hash ^= input.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function createSeededRandom(seedInput) {
  let seed = hashSeed(seedInput) || 1;
  return function nextRandom() {
    seed += 0x6D2B79F5;
    let t = seed;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Fisher-Yates shuffle
function fisherYates(arr, random = Math.random) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

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

function normalizeSeedValue(value) {
  return value.trim().toLowerCase();
}

function buildPlayerSeed({ name = '', email = '' } = {}) {
  const normalizedEmail = normalizeSeedValue(email);
  const normalizedName = normalizeSeedValue(name);
  return normalizedEmail || normalizedName || 'anonymous-analyst';
}

// Keep the active 15-email run curated so the signals are obvious and teachable.
function withShuffledClues(email, random) {
  const maxClues = ZONE_CLUE_LIMITS[email.zone] ?? 4;
  return { ...email, clues: fisherYates([...email.clues], random).slice(0, maxClues) };
}

function withStaticClues(email) {
  const maxClues = ZONE_CLUE_LIMITS[email.zone] ?? 4;
  return { ...email, clues: [...email.clues].slice(0, maxClues) };
}

export function shuffleEmails(player = {}) {
  const byId = new Map(EMAILS.map(email => [email.id, email]));
  const playerSeed = buildPlayerSeed(player);

  return Object.entries(CURATED_ZONE_EMAIL_IDS)
    .flatMap(([zone, ids]) => {
      if (Number(zone) === 1) {
        return ids.map((id) => withStaticClues(byId.get(id)));
      }

      const random = createSeededRandom(`${playerSeed}:zone:${zone}`);
      return fisherYates(ids, random).map((id) => withShuffledClues(byId.get(id), random));
    })
    .filter(Boolean)
}
