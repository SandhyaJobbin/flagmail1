# Flagmail Simplification & Design Enhancement
**Date:** 2026-04-20
**Status:** Approved
**Approach:** Surgical — minimal changes to existing codebase, preserve all polished UI work

---

## Context

Flagmail is a mail-moderation hiring assessment game. Management has flagged it as too challenging. This spec defines a simplified version that:
- Tests core mail moderation instincts (not expert subcategory recall)
- Uses a new, clearer dataset with more accessible signals
- Renames zones to thematic names aligned with email moderation workflows
- Elevates the visual design within the existing Apple ecosystem aesthetic

---

## Section 1: Dataset & Data Model

### New Dataset
Replace `src/data/emails.js` EMAIL_POOL with 30 emails sourced from:
- `Dataset/Low.md` → Zone 1 (10 emails, easy signals)
- `Dataset/Medium.md` → Zone 2 (10 emails, moderate signals)
- `Dataset/hard.md` → Zone 3 (10 emails, sophisticated signals)

### New Email Object Shape
```js
{
  id: "E001",
  zone: 1,                          // 1 | 2 | 3
  from: "money.transfer772@gmail.com",
  subject: "URGENT: YOUR $100,000,000.00 IS READY",
  body: "...",
  clue: "A Prince wouldn't use a random @gmail.com...",  // single string
  level1: "Phishing & Spoofing",    // only field scored
  subCategory: "Email Phishing",    // shown in explanation, not scored
  explanation: "...",               // post-submit learning text
}
```

### L1 Categories (trimmed from 6 → 3)
```js
export const L1_CATEGORIES = [
  { id: "Legitimate",         label: "Legitimate",         color: "#34C759" },
  { id: "Spam & Junk",        label: "Spam & Junk",        color: "#FF9500" },
  { id: "Phishing & Spoofing",label: "Phishing & Spoofing",color: "#FF3B30" },
];
```

### Removed Exports
- `L2_BY_L1` — removed entirely
- `TAXONOMY` — removed entirely
- Categories removed: Malicious Content, Abuse & Harassment, High-Risk Fraud

---

## Section 2: Classification UI & Clue System

### Classifier.jsx
- **L2 row removed entirely** — no subcategory selection
- **3 L1 buttons only** styled as native iOS selection chips
- Section label changes from "L1 — THREAT CATEGORY" → "CLASSIFY THIS EMAIL"
- Tooltips simplified to cover only 3 categories (desc + signals)
- Selected state: spring-animated scale pop + category color fill

### Clue System
- **1 hint per email** (from the `clue` field)
- Rendered as a native iOS "More Info" tap pattern:
  - `ⓘ` icon button labelled "Reveal Hint"
  - On click: smooth spring-animated inset card appears below the email body
  - Button disappears after reveal (one-time use)
- **No point deduction** for using the hint
- `cluesRevealed` state simplified to a boolean `hintRevealed`

### useScoring.js
- Scoring: Correct L1 = **2 pts**, Wrong = **0 pts**
- `l2Points`, `clueDeduction`, `l2Correct` fields removed from record
- `categoryCorrect` initialised with only the 3 active categories
- Max possible score: 30 emails × 2 pts = **60 pts**

---

## Section 3: Zone Names & Structure

### Zone Mapping
| # | Old Name        | New Name           | Difficulty | Emails |
|---|----------------|--------------------|------------|--------|
| 1 | Flag Academy    | **The Inbox**      | Easy       | 10     |
| 2 | Shadow Inbox    | **The Queue**      | Medium     | 10     |
| 3 | Zero-Day Vault  | **The Escalation** | Hard       | 10     |

### Mission Text (ZoneIntroCard.jsx)
- The Inbox: *"Clear the inbox. Trust your instincts."*
- The Queue: *"The queue is getting trickier. Stay sharp."*
- The Escalation: *"These are the hardest calls. Think carefully."*

### Code Changes
- `ZONE_EMAIL_COUNTS` → `{ 1: 10, 2: 10, 3: 10 }` (Zone 3 was 5)
- `zoneEnd` for zone 3 → 30 (was 25)
- All user-facing "Zone 1/2/3" text replaced with zone names
- Early unlock mechanic (3 consecutive perfects) kept unchanged
- `ZONES` array in ZoneIntroCard updated with new titles, missions, icons

### Icons
- The Inbox: 📬
- The Queue: 🗂
- The Escalation: 🚨

---

## Section 4: Results, Competency & Leaderboard

### ResultsScreen.jsx / CompetencySummary.jsx
- Category breakdown shows 3 categories only
- Max score display updated to 60 pts
- Zone score labels use new names
- Category accuracy shown as **circular ring charts** (Activity ring style) instead of bars

### useScoring.js — Reset State
```js
categoryCorrect: {
  'Legitimate':          { correct: 0, total: 0 },
  'Spam & Junk':         { correct: 0, total: 0 },
  'Phishing & Spoofing': { correct: 0, total: 0 },
}
```

### ExplanationCard.jsx
- L2 correct/incorrect row removed
- `subCategory` shown as a read-only pill label (e.g., "Email Phishing") for learning context
- Scoring breakdown: L1 correct ✓/✗ and pts earned only

### Leaderboard
- No structural changes — name, email, total score submitted as before
- Score ceiling changes from 100 → 60; ranking logic unaffected

### Badges
- No changes — all badge conditions remain valid without L2

---

## Section 5: Apple Design Enhancements

All enhancements stay strictly within the Apple ecosystem aesthetic (glassmorphism, spring physics, SF Pro fonts, Apple semantic colours). No aesthetic direction change — elevation only.

### 5.1 Email Card → Mail.app Fidelity
Make `EmailCard.jsx` look like a native macOS Mail.app message:
- **Sender avatar**: circular badge with initials, coloured by first letter hash
- **Timestamp**: formatted as "Today at 3:42 PM" (relative, Apple-style)
- **Header/body separator**: 0.5px hairline divider (`rgba(0,0,0,0.1)`)
- **Body typography**: `SF Pro Text` at 15px, `#3A3A3C`, line-height 1.65
- **Subject**: `SF Pro Display` semibold, `#1C1C1E`
- **From field**: sender name in `#1C1C1E`, email address in `rgba(60,60,67,0.55)` inline

### 5.2 Classifier → iOS Chip Selection
- Buttons restyled as compact iOS tag/chip components
- **Unselected**: white/5% opacity, 1px `rgba(0,0,0,0.08)` border, `#1C1C1E` text
- **Selected**: category color at 12% opacity fill, 1.5px solid category color border, spring scale pop to 1.04 on select
- Chips laid out in a single horizontal row (3 categories fit cleanly)

### 5.3 Zone Intro → Apple Arcade Hero Screen
- Zone name rendered in **SF Pro Rounded** (rounder, used in Apple gaming contexts)
- Zone name as oversized display hero (font-size 38px, weight 800)
- Zone icon enlarged to 52px with layered depth: icon sits in a 72×72 pill with category-colored glow shadow
- Background: subtle animated gradient mesh behind the glass card (slow drift, 8s loop)

### 5.4 Hint Reveal → iOS Disclosure Pattern
- Hint trigger: `ⓘ` icon + "Reveal Hint" label, styled as a tappable iOS info row
- Reveal animation: spring-in inset card slides down from above the email body
- Hint card: `rgba(255,193,7,0.08)` background, amber left-border accent, italic hint text
- Once revealed, trigger button replaced with a subtle "Hint shown" ghost label

### 5.5 Results → Apple Health Summary Aesthetic
- Per-category accuracy shown as three **circular progress rings** (Activity ring style)
  - Ring color matches category color (green/orange/red)
  - Animated draw-on using `stroke-dasharray` / `stroke-dashoffset`
  - Accuracy % displayed in center of each ring
- Zone scores displayed in a 3-column stat card row with zone name, score, and a mini bar
- Overall score shown as a large hero number with a contextual tier label (e.g., "Strong Candidate")

---

## Files to Modify

| File | Change |
|------|--------|
| `src/data/emails.js` | Replace EMAIL_POOL (30 new emails), trim L1_CATEGORIES to 3, remove L2_BY_L1 & TAXONOMY |
| `src/components/Classifier.jsx` | Remove L2 row, update tooltips, restyle as iOS chips |
| `src/components/GameRound.jsx` | Replace multi-clue system with single hint reveal |
| `src/components/ZoneIntroCard.jsx` | New zone names, SF Pro Rounded title, hero layout |
| `src/components/ZoneComplete.jsx` | Update zone name display |
| `src/components/ExplanationCard.jsx` | Remove L2 row, add subCategory pill, simplify scoring |
| `src/components/EmailCard.jsx` | Mail.app fidelity redesign |
| `src/components/ResultsScreen.jsx` | Ring charts, zone name labels, 60pt max |
| `src/components/CompetencySummary.jsx` | 3 categories only, ring chart visualization |
| `src/hooks/useGameState.js` | ZONE_EMAIL_COUNTS updated, hintRevealed boolean |
| `src/hooks/useScoring.js` | Remove L2/clue deduction logic, 3 categories only |

---

## What Does Not Change

- Badge system and animations
- Timer mechanic
- Leaderboard submission
- Early unlock mechanic (3 consecutive perfects)
- Overall app routing / screen flow
- Background gradient
- Spring animation physics
- Framer Motion usage
