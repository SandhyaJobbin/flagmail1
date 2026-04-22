# Design Polish Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fix 25 design critique issues across LandingScreen, TutorialScreen, ZoneIntroCard, GameRound, and ResultsScreen — improving consistency, semantics, and clarity.

**Architecture:** All changes are surgical inline-style edits within existing JSX components. One new file (`src/styles/tokens.js`) centralises shared design values to eliminate duplicated magic numbers. No structural refactors; each task is self-contained per component.

**Tech Stack:** React 19, Vite, Framer Motion, inline JSX styles. No unit test framework — verification is visual via `npm run dev`. Lint with `npm run lint`.

---

## File Map

| File | Action | Issues addressed |
|------|--------|-----------------|
| `src/styles/tokens.js` | **Create** | #24, #25 — glass tokens, shared constants |
| `src/components/LandingScreen.jsx` | **Modify** | #1, #2, #3, #4, #5 |
| `src/components/TutorialScreen.jsx` | **Modify** | #6, #7, #8, #9 |
| `src/components/ZoneIntroCard.jsx` | **Modify** | #10, #11, #12, #13, #14 |
| `src/components/GameRound.jsx` | **Modify** | #15, #16, #17, #18 |
| `src/components/ResultsScreen.jsx` | **Modify** | #19, #20, #21, #22, #23 |

---

## Task 1: Create shared design tokens

**Files:**
- Create: `src/styles/tokens.js`

- [ ] **Step 1: Create the tokens file**

```js
// src/styles/tokens.js

/** Canonical glass surface style — use in every screen card */
export const glass = {
  background: 'rgba(255,255,255,0.74)',
  backdropFilter: 'blur(28px) saturate(165%)',
  WebkitBackdropFilter: 'blur(28px) saturate(165%)',
  border: '1px solid rgba(255,255,255,0.86)',
  boxShadow: '0 24px 80px rgba(32,52,89,0.11), 0 8px 24px rgba(32,52,89,0.06)',
};

/** Points per email × 5 emails per zone × 3 zones */
export const POINTS_PER_EMAIL = 5;
export const EMAILS_PER_ZONE = 5;
export const ZONE_COUNT = 3;
export const ZONE_MAX_SCORE = POINTS_PER_EMAIL * EMAILS_PER_ZONE;  // 25
export const MAX_SCORE = ZONE_MAX_SCORE * ZONE_COUNT;               // 75

export const ZONE_META_LIST = [
  { zone: 1, title: 'The Inbox',      difficulty: 'Foundation',   accent: '#0A84FF', endColor: '#0055CC' },
  { zone: 2, title: 'The Queue',      difficulty: 'Intermediate', accent: '#30B0C7', endColor: '#1A8FA8' },
  { zone: 3, title: 'The Escalation', difficulty: 'Advanced',     accent: '#FF7A1A', endColor: '#E56A00' },
];
```

- [ ] **Step 2: Verify build passes**

Run: `npm run lint`
Expected: no errors

- [ ] **Step 3: Commit**

```bash
git add src/styles/tokens.js
git commit -m "feat: add shared design tokens (glass, zone meta, score constants)"
```

---

## Task 2: Fix LandingScreen

**Files:**
- Modify: `src/components/LandingScreen.jsx`

Issues fixed: #1 (centering mismatch), #2 (stats grid orphaned), #3 (color bars fade), #4 ("Candidate Access" label), #5 (zone numbering)

- [ ] **Step 1: Fix hero text alignment — remove centering, align left**

In `LandingScreen.jsx`, find the `div` at line 201 with `justifyItems: 'center', textAlign: 'center'` and remove those two properties:

```jsx
// BEFORE (line 201):
<div style={{ display: 'grid', gap: 12, maxWidth: 680, justifyItems: 'center', textAlign: 'center' }}>

// AFTER:
<div style={{ display: 'grid', gap: 12, maxWidth: 680 }}>
```

Also remove `textAlign: 'center'` from the `<h1>` (line 224) and `<p>` (line 231):

```jsx
// h1 — remove textAlign: 'center'
<h1
  style={{
    margin: 0,
    fontSize: 'clamp(42px, 5.4vw, 68px)',
    lineHeight: 0.96,
    letterSpacing: '-0.05em',
    color: '#111827',
    fontWeight: 700,
    maxWidth: '13.5ch',
    textWrap: 'balance',
  }}
>

// p — remove textAlign: 'center'
<p
  style={{
    margin: 0,
    fontSize: 'clamp(15px, 1.5vw, 18px)',
    lineHeight: 1.55,
    color: 'rgba(17,24,39,0.68)',
    maxWidth: 620,
  }}
>
```

- [ ] **Step 2: Fix stats grid — remove maxWidth so it matches zone cards width**

Find the `landing-stats` div (line 245) and remove `maxWidth: 560`:

```jsx
// BEFORE:
<div
  className="landing-stats"
  style={{
    display: 'grid',
    gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
    gap: 12,
    maxWidth: 560,
  }}
>

// AFTER:
<div
  className="landing-stats"
  style={{
    display: 'grid',
    gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
    gap: 12,
  }}
>
```

- [ ] **Step 3: Fix zone card color bars — use solid color, not transparent gradient**

Find each zone card's accent bar `div` (around line 325). Change the gradient to a solid color:

```jsx
// BEFORE:
<div
  style={{
    position: 'absolute',
    inset: '0 auto 0 0',
    width: 4,
    background: `linear-gradient(180deg, ${card.accent} 0%, rgba(255,255,255,0) 100%)`,
  }}
/>

// AFTER:
<div
  style={{
    position: 'absolute',
    inset: '0 auto 0 0',
    width: 4,
    borderRadius: '4px 0 0 4px',
    background: card.accent,
    opacity: 0.7,
  }}
/>
```

- [ ] **Step 4: Fix "Candidate Access" label — replace with friendly copy**

Find the label text "Candidate Access" (line 393) and replace:

```jsx
// BEFORE:
Candidate Access

// AFTER:
Your Details
```

- [ ] **Step 5: Fix zone numbering — change zero-padded '01' strings to numbers 1/2/3**

Find `ZONE_CARDS` array (line 12). Change `zone: '01'` → `zone: 1`, etc., and update the render to use a plain number:

```jsx
const ZONE_CARDS = [
  { zone: 1, title: 'Inbox',      detail: 'Spot the loud red flags fast and build your rhythm.',               accent: '#0A84FF' },
  { zone: 2, title: 'Queue',      detail: 'The copy gets cleaner here. Trust the details, not the polish.',   accent: '#30B0C7' },
  { zone: 3, title: 'Escalation', detail: 'One subtle inconsistency is usually the whole story.',             accent: '#FF7A1A' },
];
```

In the render, the zone number display (line 340) already renders `{card.zone}` — no change needed there, but confirm the font-size and style still look right with single-digit numbers.

- [ ] **Step 6: Visual verify**

Run `npm run dev` and open the Landing screen.
- Hero text left-aligned ✓
- Stats grid same width as zone cards below ✓
- Zone accent bars are solid, not faded ✓
- Right panel label reads "Your Details" ✓
- Zone numbers show 1, 2, 3 ✓

- [ ] **Step 7: Lint and commit**

```bash
npm run lint
git add src/components/LandingScreen.jsx
git commit -m "fix: landing screen alignment, stats width, accent bars, label copy, zone numbering"
```

---

## Task 3: Fix TutorialScreen

**Files:**
- Modify: `src/components/TutorialScreen.jsx`

Issues fixed: #6 (caption shown twice), #7 (noisy auto-advance hint), #8 (two skip paths), #9 (line-height clips descenders), and "normalized to 100" copy inconsistency

- [ ] **Step 1: Remove caption from main stage — show only in side list**

The main stage panel (around line 323) renders `{current.caption}` below the step title. Remove the entire `<p>` block so the caption only appears in the side step list:

```jsx
// REMOVE this block entirely from the stage caption area (approximately lines 322-333):
<p
  style={{
    margin: '8px 0 0',
    fontSize: 14,
    lineHeight: 1.55,
    color: 'rgba(17,24,39,0.62)',
    maxWidth: 520,
  }}
>
  {current.caption}
</p>
```

- [ ] **Step 2: Remove "Moves automatically unless you choose a step." helper text**

Find the helper `<div>` at approximately line 377 and delete it:

```jsx
// REMOVE:
<div
  style={{
    fontSize: 11,
    color: 'rgba(17,24,39,0.52)',
  }}
>
  Moves automatically unless you choose a step.
</div>
```

- [ ] **Step 3: De-emphasise the top-right Skip button — make it a text link**

The Skip button (line 125) is currently a styled pill. Replace it with a minimal text link so the green CTA is the clear primary action:

```jsx
// BEFORE — styled pill button:
<button
  onClick={onSkip}
  style={{
    position: 'absolute',
    top: 16,
    right: 18,
    zIndex: 2,
    padding: '10px 16px',
    borderRadius: 999,
    border: '1px solid rgba(13,26,51,0.08)',
    background: 'rgba(255,255,255,0.82)',
    color: 'rgba(17,24,39,0.62)',
    fontSize: 13,
    fontWeight: 600,
    boxShadow: '0 10px 24px rgba(32, 52, 89, 0.08)',
  }}
>
  Skip
</button>

// AFTER — minimal text link:
<button
  onClick={onSkip}
  style={{
    position: 'absolute',
    top: 20,
    right: 22,
    zIndex: 2,
    padding: '4px 0',
    border: 'none',
    background: 'transparent',
    color: 'rgba(17,24,39,0.44)',
    fontSize: 13,
    fontWeight: 500,
    cursor: 'pointer',
    textDecoration: 'underline',
    textUnderlineOffset: 3,
  }}
>
  Skip tutorial
</button>
```

- [ ] **Step 4: Fix line-height on "What Matters" headline — change 0.98 to 1.1**

Find the headline div at approximately line 439 in the side panel:

```jsx
// BEFORE:
<div
  style={{
    fontSize: 30,
    lineHeight: 0.98,
    fontWeight: 700,
    letterSpacing: '-0.05em',
    color: '#111827',
    marginBottom: 10,
  }}
>

// AFTER:
<div
  style={{
    fontSize: 30,
    lineHeight: 1.1,
    fontWeight: 700,
    letterSpacing: '-0.04em',
    color: '#111827',
    marginBottom: 10,
  }}
>
```

- [ ] **Step 5: Visual verify**

Run `npm run dev`, navigate to tutorial.
- Caption shows only in side list, not repeated below image ✓
- No "Moves automatically" text ✓
- Top-right is a plain underlined link, green CTA is the clear primary ✓
- "Accuracy first. Hints second. Speed third." heading doesn't clip descenders ✓

- [ ] **Step 5: Fix "normalized to 100" copy in the Ready Check card**

The "Ready Check" card at approximately line 549 still says "normalized to 100." Update to plain language consistent with ResultsScreen (Task 6 Step 5):

```jsx
// BEFORE:
You will get 15 scenarios across 3 zones, with 120 seconds per round and a score normalized to 100.

// AFTER:
You will get 15 scenarios across 3 zones, with 120 seconds per round. Your score reflects accuracy across all three zones.
```

- [ ] **Step 6: Lint and commit**

```bash
npm run lint
git add src/components/TutorialScreen.jsx
git commit -m "fix: tutorial caption dedup, remove noisy hint, demote skip to text link, fix heading line-height, plain score copy"
```

---

## Task 4: Fix ZoneIntroCard

**Files:**
- Modify: `src/components/ZoneIntroCard.jsx`

Issues fixed: #10 (repeated content), #11 (misleading progress bar), #12 (decorative icon), #13 (false signal ordering), #14 (Zone 2 gradient)

- [ ] **Step 1: Remove the decorative rotated-square icon from mission note card**

In the side panel mission note card (around line 548), the `<span>` rotated square and its parent container (the 56×56 box) is purely decorative. Replace the icon `div` with a simpler zone number badge:

```jsx
// BEFORE — the 56x56 icon box with rotated square span:
<div
  style={{
    width: 56,
    height: 56,
    borderRadius: 18,
    background: 'rgba(255,255,255,0.7)',
    border: `1px solid ${meta.accent}22`,
    boxShadow: `inset 0 1px 0 rgba(255,255,255,0.75), 0 12px 24px ${meta.accent}14`,
    position: 'relative',
  }}
>
  <span
    style={{
      position: 'absolute',
      inset: '50% auto auto 50%',
      width: 18,
      height: 18,
      transform: 'translate(-50%, -50%) rotate(45deg)',
      borderRadius: 6,
      background: meta.accent,
    }}
  />
</div>

// AFTER — zone number badge:
<div
  style={{
    width: 48,
    height: 48,
    borderRadius: 14,
    background: `${meta.accent}14`,
    border: `1px solid ${meta.accent}30`,
    display: 'grid',
    placeItems: 'center',
    fontSize: 20,
    fontWeight: 800,
    color: meta.accent,
    letterSpacing: '-0.04em',
  }}
>
  {meta.zone}
</div>
```

- [ ] **Step 2: Remove the "Focus for this zone" progress bar and its labels**

In the hero right sub-card (around line 315), delete the progress bar div and the "Start here / Section X of 3" labels below it. Replace with a simpler difficulty badge pill:

```jsx
// REMOVE these elements (approximately lines 315-346):
<div
  style={{
    marginTop: 2,
    height: 8,
    borderRadius: 999,
    background: 'rgba(17,24,39,0.08)',
    overflow: 'hidden',
  }}
>
  <div
    style={{
      width: progressWidth,
      height: '100%',
      borderRadius: 999,
      background: `linear-gradient(90deg, ${meta.accent} 0%, rgba(255,255,255,0.9) 140%)`,
    }}
  />
</div>
<div
  style={{
    display: 'flex',
    justifyContent: 'space-between',
    gap: 10,
    fontSize: 11,
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    color: 'rgba(17,24,39,0.48)',
  }}
>
  <span>Start here</span>
  <span>{meta.subtitle}</span>
</div>

// REPLACE with a divider line only:
<div style={{ height: 1, background: `${meta.accent}18`, borderRadius: 1 }} />
```

Also remove the `const progressWidth = ...` line near the top of the component (line 88) since it's no longer used.

- [ ] **Step 3: Remove contextCopy from the side panel mission note — it already appears in the hero**

In the side panel mission note card (around line 598), the `<p>` that renders `{meta.contextCopy}` is a duplicate of what's in the hero sub-card. Delete it:

```jsx
// REMOVE from the mission note card:
<p
  style={{
    margin: 0,
    fontSize: 14,
    lineHeight: 1.6,
    color: 'rgba(17,24,39,0.66)',
  }}
>
  {meta.contextCopy}
</p>
```

Replace the mission note text with `{meta.mission}` so it reinforces the zone goal instead:

```jsx
<p
  style={{
    margin: 0,
    fontSize: 14,
    lineHeight: 1.6,
    color: 'rgba(17,24,39,0.66)',
  }}
>
  {meta.mission}
</p>
```

- [ ] **Step 4: Replace numbered circles in signals with coloured bullets**

In the signals grid (around line 463), the `<div>` rendering `{index + 1}` in a numbered circle implies ordered steps. Replace with a filled bullet circle:

```jsx
// BEFORE — numbered circle:
<div
  style={{
    width: 38,
    height: 38,
    borderRadius: 999,
    background: `${meta.accent}12`,
    color: meta.accent,
    display: 'grid',
    placeItems: 'center',
    fontSize: 13,
    fontWeight: 700,
  }}
>
  {index + 1}
</div>

// AFTER — small bullet circle:
<div
  style={{
    width: 10,
    height: 10,
    borderRadius: '50%',
    background: meta.accent,
    opacity: 0.7,
    marginTop: 6,
    flexShrink: 0,
  }}
/>
```

Also update the parent signal card to remove the `gridTemplateColumns: '38px minmax(0, 1fr)'` since the bullet is now much smaller:

```jsx
<div
  key={signal.title}
  style={{
    display: 'flex',
    alignItems: 'flex-start',   // ← required: prevents bullet from stretching to full card height
    gap: 12,
    borderRadius: 20,
    padding: '14px 16px',
    background: 'rgba(255,255,255,0.8)',
    border: '1px solid rgba(13,26,51,0.06)',
    width: '100%',
  }}
>
```

- [ ] **Step 5: Fix Zone 2 gradient endpoint on the Start button**

The start button gradient (line 798) uses:
```jsx
background: `linear-gradient(135deg, ${meta.accent} 0%, ${meta.zone === 3 ? '#E56A00' : '#0066CC'} 100%)`
```

This makes Zone 2 (teal #30B0C7) fade to blue (#0066CC), which is wrong. Use the `endColor` from the `ZONE_META_LIST` tokens created in Task 1, or inline the fix:

Update the `ZONES` array data to include `endColor`:

```jsx
// In ZoneIntroCard.jsx, update the ZONES array:
const ZONES = [
  { zone: 1, ..., endColor: '#0055CC' },
  { zone: 2, ..., endColor: '#1A8FA8' },
  { zone: 3, ..., endColor: '#E56A00' },
];
```

Then update the button:

```jsx
// BEFORE:
background: `linear-gradient(135deg, ${meta.accent} 0%, ${meta.zone === 3 ? '#E56A00' : '#0066CC'} 100%)`

// AFTER:
background: `linear-gradient(135deg, ${meta.accent} 0%, ${meta.endColor} 100%)`
```

- [ ] **Step 6: Visual verify**

Run `npm run dev`, visit Zone 1, 2, 3 intros.
- Mission note shows zone number badge, not rotating square ✓
- No misleading progress bar in focus sub-card ✓
- Side panel mission note shows mission text, not repeated contextCopy ✓
- Signal items have small bullets, not 1/2/3 numbers ✓
- Zone 2 Start button fades teal→dark-teal (not teal→blue) ✓
- Zone 3 Start button fades orange→dark-orange ✓

- [ ] **Step 7: Lint and commit**

```bash
npm run lint
git add src/components/ZoneIntroCard.jsx
git commit -m "fix: zone intro icon, progress bar, content dedup, signal bullets, zone 2 gradient"
```

---

## Task 5: Fix GameRound

**Files:**
- Modify: `src/components/GameRound.jsx`

Issues fixed: #15 (zone icon size), #16 (redundant submission state text), #17 (disabled button contrast), #18 (Hints/Clues terminology)

- [ ] **Step 1: Shrink zone icon in topbar**

The zone icon box (line 228) is 58×58px with font-size 22. Reduce it:

```jsx
// BEFORE:
<div
  style={{
    width: 58,
    height: 58,
    borderRadius: 18,
    background: `${meta.accent}14`,
    border: `1px solid ${meta.accent}24`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: meta.accent,
    fontSize: 22,
    fontWeight: 700,
    boxShadow: `inset 0 1px 0 rgba(255,255,255,0.6), 0 12px 28px ${meta.accent}18`,
  }}
>
  {zone}
</div>

// AFTER:
<div
  style={{
    width: 40,
    height: 40,
    borderRadius: 12,
    background: `${meta.accent}14`,
    border: `1px solid ${meta.accent}24`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: meta.accent,
    fontSize: 16,
    fontWeight: 700,
  }}
>
  {zone}
</div>
```

- [ ] **Step 2: Replace redundant "X selected" text with scoring guidance**

In the "Ready to submit" section (line 506), replace the state-restating text with scoring context:

```jsx
// BEFORE:
<div style={{ fontSize: 13, color: 'rgba(17,24,39,0.60)' }}>
  {round.selectedL1 ? `${round.selectedL1} selected` : 'Pick a primary category to unlock submission.'}
</div>

// AFTER:
<div style={{ fontSize: 13, color: 'rgba(17,24,39,0.60)' }}>
  {round.selectedL1
    ? 'Add a secondary diagnosis for a bonus point.'
    : 'Pick a primary category to unlock submission.'}
</div>
```

- [ ] **Step 3: Fix disabled submit button contrast**

The button currently has an unconditional `border: '1px solid rgba(255,255,255,0.45)'` at line 520, and a ternary on `background` and `color` only. To also change the border when disabled, you must make border conditional too. Update all three props together in the ternary:

```jsx
// BEFORE — the three style props that change when disabled:
border: '1px solid rgba(255,255,255,0.45)',
background: canSubmit
  ? `linear-gradient(135deg, ${meta.accent} 0%, ${zone === 3 ? '#E56A00' : '#0066CC'} 100%)`
  : 'rgba(17,24,39,0.08)',
color: canSubmit ? '#fff' : 'rgba(17,24,39,0.36)',

// AFTER:
border: canSubmit ? '1px solid rgba(255,255,255,0.45)' : '1px solid rgba(17,24,39,0.10)',
background: canSubmit
  ? `linear-gradient(135deg, ${meta.accent} 0%, ${zone === 3 ? '#E56A00' : '#0066CC'} 100%)`
  : 'rgba(17,24,39,0.06)',
color: canSubmit ? '#fff' : 'rgba(17,24,39,0.50)',
```

- [ ] **Step 4: Fix Zone 2 gradient on submit button (same bug as ZoneIntroCard)**

Line 522 of GameRound uses the same broken pattern `${zone === 3 ? '#E56A00' : '#0066CC'}` which makes Zone 2's teal button fade to blue. Add a `ZONE_END_COLORS` lookup and use it:

```jsx
// Add near the top of GameRound.jsx, after ZONE_META:
const ZONE_END_COLOR = { 1: '#0055CC', 2: '#1A8FA8', 3: '#E56A00' };

// Then update the submit button background (around line 522):
// BEFORE:
background: canSubmit
  ? `linear-gradient(135deg, ${meta.accent} 0%, ${zone === 3 ? '#E56A00' : '#0066CC'} 100%)`

// AFTER:
background: canSubmit
  ? `linear-gradient(135deg, ${meta.accent} 0%, ${ZONE_END_COLOR[zone]} 100%)`
```

- [ ] **Step 5: Standardise terminology — rename "Hints" label to "Clues"**

Find the section label "Hints" (line 455) and change it:

```jsx
// BEFORE:
<div style={sectionLabelStyle}>Hints</div>

// AFTER:
<div style={sectionLabelStyle}>Clues</div>
```

- [ ] **Step 6: Visual verify**

Run `npm run dev`, start a game round.
- Zone icon in topbar is compact (40×40) ✓
- When L1 selected, helper says "Add a secondary diagnosis..." ✓
- When nothing selected, disabled button is still readable (>3:1 contrast) ✓
- Section header reads "Clues" not "Hints" ✓

- [ ] **Step 7: Lint and commit**

```bash
npm run lint
git add src/components/GameRound.jsx
git commit -m "fix: shrink zone topbar icon, submit state copy, disabled contrast, zone 2 gradient, clues label"
```

---

## Task 6: Fix ResultsScreen

**Files:**
- Modify: `src/components/ResultsScreen.jsx`

Issues fixed: #19 (inverted color semantics), #20 (invisible /100), #21 (hardcoded max score), #22 (action button asymmetry), #23 (normalization jargon)

- [ ] **Step 1: Import ZONE_MAX_SCORE and MAX_SCORE from tokens instead of hardcoding**

At the top of `ResultsScreen.jsx`, replace the hardcoded constants:

```jsx
// REMOVE:
const MAX_SCORE = 75;
// and wherever zone max 25 is used

// ADD import:
import { MAX_SCORE, ZONE_MAX_SCORE } from '../styles/tokens.js';
```

In the zones array (line 52), replace `max: 25` with `max: ZONE_MAX_SCORE`:

```jsx
const zones = [1, 2, 3].map((zone) => ({
  ...zoneMeta[zone],
  score: zoneScores[zone],
  max: ZONE_MAX_SCORE,
  accuracy: zoneAcc(zone),
}));
```

- [ ] **Step 2: Fix inverted color semantics in titleTone**

The current mapping gives green to low scores. Fix so:
- High (≥80) → green (success)
- Mid (≥50) → amber (caution)
- Low (<50) → muted/neutral (not green)

```jsx
// BEFORE:
function titleTone(score) {
  if (score >= 80) return { accent: '#0A84FF', bg: 'rgba(10,132,255,0.10)' };
  if (score >= 50) return { accent: '#FF9500', bg: 'rgba(255,149,0,0.12)' };
  return { accent: '#34C759', bg: 'rgba(52,199,89,0.10)' };
}

// AFTER:
function titleTone(score) {
  if (score >= 80) return { accent: '#34C759', bg: 'rgba(52,199,89,0.10)' };
  if (score >= 50) return { accent: '#FF9500', bg: 'rgba(255,149,0,0.12)' };
  return { accent: '#8E8E93', bg: 'rgba(142,142,147,0.10)' };
}
```

- [ ] **Step 3: Fix invisible "/100" denominator contrast**

Find the `/100` span (line 159):

```jsx
// BEFORE:
<span style={{ fontSize: 26, fontWeight: 600, color: 'rgba(17,24,39,0.30)' }}>/100</span>

// AFTER:
<span style={{ fontSize: 22, fontWeight: 500, color: 'rgba(17,24,39,0.48)' }}>/100</span>
```

- [ ] **Step 4: Make action buttons equal width and visually distinct**

The results actions grid (line 242) uses `gridTemplateColumns: '1.2fr 1fr'`. Change to equal columns, and make "Retake" clearly secondary (ghost style):

```jsx
// BEFORE:
<div className="results-actions" style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 12 }}>

// AFTER:
<div className="results-actions" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
```

The "Retake assessment" button is already styled as a ghost. No style change needed — equal columns alone fixes the sizing asymmetry.

- [ ] **Step 5: Replace normalization jargon with outcome-focused copy**

Find the `<p>` under the results headline (line 139):

```jsx
// BEFORE:
<p style={{ margin: '14px 0 0', fontSize: 16, lineHeight: 1.6, color: 'rgba(17,24,39,0.64)', maxWidth: 560 }}>
  Your performance is normalized to 100 and reflects how consistently you identified the correct threat category under pressure.
</p>

// AFTER:
<p style={{ margin: '14px 0 0', fontSize: 16, lineHeight: 1.6, color: 'rgba(17,24,39,0.64)', maxWidth: 560 }}>
  Based on how accurately you classified each email across all three zones, under real time pressure.
</p>
```

- [ ] **Step 6: Visual verify**

Run `npm run dev`, complete a game and view results.
- Score ≥80 shows green badge, 50-79 shows amber, <50 shows neutral grey ✓
- "/100" denominator is legible (not near-invisible) ✓
- Both action buttons are equal width ✓
- Body text no longer mentions "normalized" ✓
- Zone max score uses imported constant (check by verifying zone cards still show "/25") ✓

- [ ] **Step 7: Lint and commit**

```bash
npm run lint
git add src/components/ResultsScreen.jsx src/styles/tokens.js
git commit -m "fix: results color semantics, denominator contrast, equal action buttons, outcome copy, use token constants"
```

---

## Task 7: Final verification pass

- [ ] **Step 1: Full lint run**

```bash
npm run lint
```
Expected: 0 errors, 0 warnings

- [ ] **Step 2: Build check**

```bash
npm run build
```
Expected: build completes with no errors

- [ ] **Step 3: Full visual walkthrough**

Run `npm run dev` and walk through the full flow:
- Landing screen: left-aligned hero, stats same width as zones, solid accent bars, "Your Details", zones numbered 1/2/3 ✓
- Tutorial: no doubled captions, no "Moves automatically" text, skip is a text link ✓
- Zone intros: number badge icon, no progress bar, no repeated contextCopy, bullet signals, correct gradients ✓
- Game round: compact zone badge, scoring hint when L1 selected, readable disabled button, "Clues" label ✓
- Results: green for high scores, readable /100, equal-width buttons, plain outcome copy ✓

- [ ] **Step 4: Final commit**

```bash
git add -A
git commit -m "chore: final design polish verification pass — all 25 issues addressed"
```
