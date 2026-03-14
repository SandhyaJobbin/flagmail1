# Flagmail — GSAP Animation & SVG Badge Brief

> Use this as your master reference for sourcing SVGs and implementing GSAP animations.
> All current CSS animations in `animations.css` are candidates for replacement with GSAP timelines.

---

## Part 1 — Badge Inventory

There are **10 badges** total: 6 Common, 4 Rare.

### Common Badges

| # | ID | Name | Current Icon | Trigger Condition |
|---|-----|------|-------------|-------------------|
| 1 | `LIGHTNING_READ` | Lightning Read | ⚡ | Correct L1 in under 10 seconds (timeLeft > 35) |
| 2 | `ON_FIRE` | On Fire | 🔥 | 5 consecutive correct L1 answers |
| 3 | `ZONE_CLEAR` | Zone Clear | ✅ | Complete a zone with zero wrong L1 answers |
| 4 | `SNIPER` | Sniper | 🎯 | First email: correct L1+L2, no clues used, under 15s |
| 5 | `BEAT_THE_CLOCK` | Beat the Clock | ⏱ | Correct L1 with ≤5 seconds remaining |
| 6 | `EAGLE_EYE` | Eagle Eye | 🦅 | All 6 threat categories correctly identified at least once |

### Rare Badges

| # | ID | Name | Current Icon | Trigger Condition |
|---|-----|------|-------------|-------------------|
| 7 | `GHOST_DETECTIVE` | Ghost Detective | 👻 | Full game (25 emails) — zero clues revealed |
| 8 | `ICE_COLD` | Ice Cold | 🧊 | All 5 Zone 3 hard emails: L1+L2 correct, no clues |
| 9 | `PERFECT_EYE` | Perfect Eye | 🔮 | All 25 emails: L1+L2 both correct |
| 10 | `NO_HINTS_NEEDED` | No Hints Needed | 🕵 | Complete any zone without revealing a single clue |

---

## Part 2 — SVG Sourcing Guide

Each badge needs **one primary SVG icon** designed to live inside a badge frame.
Recommended style: **flat/semi-flat with clean paths** (avoid bitmap fills — GSAP needs distinct SVG path elements to animate).

### Sourcing Checklist
- Download as **SVG**, not PNG
- Prefer files with **named/layered paths** (not a single `<path>` blob)
- Avoid inline rasters or base64 embedded images
- Target size: around **100×100px** viewBox
- Stroke-based icons animate better with GSAP `DrawSVGPlugin` than filled shapes

---

### Badge-by-Badge SVG Search Terms

#### 1. Lightning Read — ⚡ → SVG lightning bolt
**Search terms (Freepik / SVGRepo / Noun Project):**
- `"lightning bolt flat icon SVG"`
- `"electric bolt speed vector"`
- `"thunder strike icon outline SVG"`

**What to look for:** A bold, angled lightning bolt with at least 2–3 separate path segments (top arm, bottom arm, body). Avoid bolts that are a single closed polygon — you need distinct strokes for the draw-in animation.

**Style notes:** Works best as a **stroke icon** on a circular or hexagonal badge background.

---

#### 2. On Fire — 🔥 → SVG flame
**Search terms:**
- `"flame fire icon SVG outline"`
- `"fire wave vector layered"`
- `"campfire icon flat SVG paths"`

**What to look for:** Flame with **2–3 separate inner flame layers** (outer flame, mid flame, core). Multi-layer SVGs animate far better — each layer can oscillate at a different speed to create a realistic flicker.

**Style notes:** Look for a design with a distinct inner glow path and outer shape. Avoid single-path cartoon flames.

---

#### 3. Zone Clear — ✅ → SVG shield with checkmark
**Search terms:**
- `"shield checkmark icon SVG"`
- `"verified shield flat vector"`
- `"security badge check SVG"`

**What to look for:** A shield as one path, and a checkmark as a **separate stroke path**. The checkmark should be drawn as a `<path>` with a `stroke` (not filled) so GSAP `DrawSVGPlugin` can animate it drawing in.

**Style notes:** Thematic fit with the Flagmail shield icon on the landing screen — matching style here would feel cohesive.

---

#### 4. Sniper — 🎯 → SVG crosshair / scope reticle
**Search terms:**
- `"crosshair scope icon SVG"`
- `"target reticle vector flat"`
- `"sniper sight crosshair outline SVG"`

**What to look for:** A design with **concentric rings** and **4 directional lines** as separate path elements. Avoid a single stroke circle+lines combo — you need the rings and lines to be individually addressable for GSAP.

**Style notes:** The crosshair should feel precise and tech-forward, not cartoonish. A dark/monochrome version with a red dot center works well.

---

#### 5. Beat the Clock — ⏱ → SVG stopwatch / countdown timer
**Search terms:**
- `"stopwatch icon SVG outline"`
- `"countdown timer vector paths"`
- `"clock face flat SVG layers"`

**What to look for:** A design with **separate elements**: clock body, clock hands, and ideally a circular progress arc. The arc should be a `<circle>` with `stroke-dasharray` so GSAP can animate the depletion.

**Style notes:** The sweeping hand and depleting arc are the key animated elements.

---

#### 6. Eagle Eye — 🦅 → SVG eagle head or eagle silhouette
**Search terms:**
- `"eagle head icon SVG flat"`
- `"hawk eye vector logo"`
- `"eagle silhouette flat design SVG"`

**What to look for:** An eagle with **wings and head as separate path groups**. If using just an eye, find one with separate iris, pupil, and outer eye shape paths.

**Alternate approach:** A stylized eye with a feather or talon motif works as a simpler icon while staying thematic. Search `"eye feather badge SVG"`.

---

#### 7. Ghost Detective — 👻 (Rare) → SVG ghost with magnifying glass
**Search terms:**
- `"ghost detective SVG icon"`
- `"phantom spy magnifying glass vector"`
- `"cute ghost flat SVG outline"`

**What to look for:** Ghost body as one path, magnifying glass as a **separate path group** (lens ring + handle). Eyes should be individual circles so they can animate independently.

**Style notes:** Rare badge — deserves more detailed illustration. A ghost with a subtle shimmer layer (semi-transparent path overlay) would elevate it.

---

#### 8. Ice Cold — 🧊 (Rare) → SVG ice crystal / snowflake / diamond shard
**Search terms:**
- `"ice crystal SVG flat"`
- `"diamond gem facets vector"`
- `"snowflake geometric SVG paths"`
- `"crystal shard icon outline"`

**What to look for:** A geometric crystal with **visible facets as individual path elements**. Each facet can be revealed sequentially with GSAP stagger. A hexagonal or diamond cut with 4–6 facet paths is ideal.

**Style notes:** Cold blue palette. The rarity of this badge should be reflected in a more intricate, jewel-like shape vs the common badges.

---

#### 9. Perfect Eye — 🔮 (Rare) → SVG crystal ball / all-seeing eye
**Search terms:**
- `"crystal ball SVG flat icon"`
- `"magic orb vector paths"`
- `"all seeing eye SVG geometric"`
- `"third eye diamond vector"`

**What to look for:** Crystal ball with a **distinct sphere outline**, an **inner swirl or pattern**, and ideally a **highlight/glare path**. The swirl should be a separate path so it can rotate continuously via GSAP.

**Style notes:** This is the hardest badge (all 25 perfect) — it deserves the most premium visual. A glowing orb with rotating internal pattern conveys mastery.

---

#### 10. No Hints Needed — 🕵 (Rare) → SVG detective / magnifying glass
**Search terms:**
- `"magnifying glass detective SVG"`
- `"spy detective icon flat"`
- `"private investigator hat coat SVG"`
- `"sherlock magnifying glass vector"`

**What to look for:** Magnifying glass with **lens, rim, and handle as separate paths**. If using a full detective figure, look for hat, coat, and glass as distinct elements.

**Style notes:** This badge is about restraint and skill (no hints used) — the icon should convey sharp focus and confidence.

---

## Part 3 — GSAP Animation Opportunities

### A. Badge Animations (triggered on unlock)

These replace the current emoji + CSS toast system.

---

#### Common Badge Unlock (corner toast)
**Current:** CSS `toastSlideIn` keyframe — slides in from right.
**GSAP upgrade:**
```
Timeline:
1. Card enters from x: 120 → x: 0 with elastic ease (duration 0.5s)
2. Badge SVG scales from 0.5 → 1.15 → 1.0 (spring overshoot)
3. SVG icon plays its specific animation (see per-badge below)
4. Card glows briefly (box-shadow pulse, 0.4s)
5. On exit: slides out to x: 120 with ease-in (duration 0.3s)
```

---

#### Rare Badge Banner
**Current:** CSS `bannerDrop` + `amberGlow` — drops from top with amber glow.
**GSAP upgrade:**
```
Timeline:
1. Banner drops from y: -100% → y: 0 with spring ease (overshoot to y: 8px then settle)
2. "RARE BADGE UNLOCKED" text letterSpacing animates from 0.3em → 0.1em (snap effect)
3. Badge SVG icon plays its specific animation
4. Amber shimmer sweeps left-to-right across the banner (gradient x position)
5. Gold border pulses 2× with box-shadow glow
6. On exit: slides up to y: -100% (0.3s ease-in)
```

---

#### Per-Badge Icon Animations

**1. Lightning Read** — Draw + spark burst
```
1. gsap.fromTo(boltPath, {drawSVG: "0%"}, {drawSVG: "100%", duration: 0.4, ease: "power2.out"})
2. gsap.to(sparkParticles, {x: "random(-30,30)", y: "random(-30,30)", opacity: 0,
   duration: 0.5, stagger: 0.05, ease: "power2.out"})
3. Bolt scales 1 → 1.2 → 1 (flash pulse, duration: 0.2s)
```

**2. On Fire** — Flickering flame
```
1. gsap.to(outerFlame, {scaleY: 1.08, scaleX: 0.96, yoyo: true, repeat: -1,
   duration: 0.4, ease: "sine.inOut"})
2. gsap.to(innerFlame, {scaleY: 1.12, scaleX: 0.94, yoyo: true, repeat: -1,
   duration: 0.3, ease: "sine.inOut", delay: 0.1})
3. gsap.to(coreFlame, {opacity: 0.7, yoyo: true, repeat: -1, duration: 0.25})
4. 3 ember paths float upward: {y: -40, opacity: 0, duration: 0.8, stagger: 0.15}
```

**3. Zone Clear** — Shield reveal + checkmark draw
```
1. Shield scales from 0 → 1.1 → 1.0 (elastic, duration: 0.5s)
2. gsap.fromTo(checkPath, {drawSVG: "0%"}, {drawSVG: "100%", duration: 0.4,
   ease: "power2.inOut", delay: 0.3})
3. Green particle burst (8 small paths radiate outward, stagger 0.03s, opacity → 0)
4. Shield glows green (filter: drop-shadow, 0.3s pulse)
```

**4. Sniper** — Crosshair zoom in + ring expand
```
1. Outer ring: scale 2 → 1 with ease: "back.out(2)" (duration: 0.5s)
2. Inner ring: scale 3 → 1 with ease: "back.out(2)" (duration: 0.4s, delay: 0.05s)
3. 4 directional lines: each slides in from its edge direction (x/y ±30 → 0, stagger 0.04s)
4. Center dot: pulses scale 1 → 1.5 → 1 once (duration: 0.3s)
5. Red center dot continues slow pulse: repeat: -1, yoyo: true, duration: 1.2s
```

**5. Beat the Clock** — Clock hand sweep + arc
```
1. gsap.fromTo(clockArc, {drawSVG: "100% 100%"}, {drawSVG: "0% 100%", duration: 0.8,
   ease: "power3.inOut"}) // arc depletes rapidly
2. gsap.to(clockHand, {rotation: 270, duration: 0.6, ease: "power2.inOut",
   transformOrigin: "center"})
3. On settle: hand shakes slightly (x: ±2, duration: 0.05, repeat: 4, yoyo: true)
4. Flash: entire badge opacity 1 → 0.5 → 1 (duration: 0.15s)
```

**6. Eagle Eye** — Wing spread + eye focus
```
1. Left wing: gsap.from(leftWing, {scaleX: 0, transformOrigin: "right center",
   ease: "back.out(1.5)", duration: 0.4})
2. Right wing: same, transformOrigin: "left center", delay: 0.05
3. Eye iris: scale 1 → 0.6 → 1 (contracts and dilates, ease: "power2.inOut", duration: 0.4s)
4. Eye pupil: scale 1 → 0.4 → 1 (sharper contraction, delay: 0.1s)
5. Subtle continuous rotation of eagle body: rotation: 0 → 3 → 0 (yoyo, repeat: -1,
   duration: 2s, ease: "sine.inOut")
```

**7. Ghost Detective (Rare)** — Float + magnifying glass swing
```
1. Ghost body enters: y: -30 → 0 with ease: "elastic.out(1, 0.5)" (duration: 0.8s)
2. Continuous float: gsap.to(ghost, {y: -8, yoyo: true, repeat: -1, duration: 1.5,
   ease: "sine.inOut"})
3. Magnifying glass: swings in from rotation: -60 → -10 with ease: "back.out(2)" (delay: 0.3s)
4. Ghost eyes blink: scaleY 1 → 0 → 1 (duration: 0.1s, repeat once, delay: 0.8s)
5. Subtle body wobble: skewX ±3° yoyo loop, duration: 2s
6. Flicker effect: opacity 1 → 0.85 → 1, random intervals (simulate ghostly shimmer)
```

**8. Ice Cold (Rare)** — Crystal facet reveal + shimmer
```
1. Facets reveal sequentially: gsap.from(facets, {scale: 0, opacity: 0,
   stagger: {each: 0.06, from: "center"}, ease: "back.out(2)"})
2. Shimmer sweep: a light-colored path animates x: -100% → 100% across the crystal
   (pseudo light reflection, duration: 0.6s, delay: 0.5s)
3. Crystal body: subtle scale pulse 1 → 1.03 → 1 (yoyo, repeat: -1, duration: 2.5s)
4. Ice crack effect on entry: 2–3 thin line paths drawSVG 0% → 100% rapidly (duration: 0.15s)
5. Frost sparkles: 4 small star paths appear and fade (opacity 1 → 0, stagger 0.1s, repeat: -1)
```

**9. Perfect Eye (Rare)** — Orb glow + internal swirl
```
1. Crystal ball scales from 0.3 → 1.15 → 1.0 (elastic, duration: 0.7s)
2. Inner swirl path: continuous rotation (rotation: 360, repeat: -1, duration: 4s, ease: "none")
3. Counter-rotating inner detail: rotation: -360, repeat: -1, duration: 6s
4. Glow: filter drop-shadow pulses from 0px → 12px → 4px (yoyo loop, duration: 2s)
5. Star sparkles (4–6 paths): fade in/out at staggered intervals around the orb
6. Eye iris inside orb: dilates slowly (scale 0.8 → 1.0, yoyo, repeat: -1, duration: 3s)
```

**10. No Hints Needed (Rare)** — Magnifying glass focus sweep
```
1. Detective figure / magnifying glass drops from y: -20 → 0 with spring ease (duration: 0.5s)
2. Lens "focus" effect: inner lens circle pulses scale 1 → 0.8 → 1 (ease: "power2.inOut",
   duration: 0.4s, delay: 0.4s)
3. Handle swings to final angle: rotation: -30 → -10, ease: "back.out(2)"
4. Magnifying glass makes a slow "scan" move: x: -5 → 5 → 0, yoyo, repeat: -1,
   duration: 2.5s (as if actively searching)
5. Question mark paths (2–3 small): fade in then dissolve (opacity 1 → 0, stagger 0.2s)
   — represents "no hints needed"
```

---

### B. Game Screen Animations (non-badge)

These are the in-game moments where GSAP would significantly upgrade feel.

---

#### 1. Timer Bar (GameRound — TimerBar component)
**Current:** CSS `width` transition.
**GSAP upgrade:**
```
- gsap.to(timerFill, {width: "0%", duration: 45, ease: "none"}) — perfectly linear depletion
- At 15s remaining: bar color tweens from green → amber
  gsap.to(timerFill, {backgroundColor: "#FF9500", duration: 0.5})
- At 8s remaining: bar color tweens amber → red
  gsap.to(timerFill, {backgroundColor: "#FF3B30", duration: 0.5})
- At 8s remaining: activate timerPulse on the countdown number
  gsap.to(timerNumber, {opacity: 0.6, yoyo: true, repeat: -1, duration: 0.5})
- On timeout: bar flashes red rapidly (opacity 1→0→1→0→1, duration: 0.6s total)
```

---

#### 2. Email Card Reveal (GameRound — EmailCard component)
**Current:** CSS `envelopeOpen` keyframe (scaleY 0.96 → 1).
**GSAP upgrade:**
```
Timeline on new email load:
1. Card slides in from y: 16 with opacity 0 → 1 (ease: "power2.out", duration: 0.3s)
2. Avatar circle scales 0 → 1.1 → 1.0 (elastic, delay: 0.1s)
3. Subject line clips in from left (clipPath or x offset, duration: 0.25s, delay: 0.15s)
4. Body text fades in line by line using stagger (opacity 0 → 1, each: 0.04s, delay: 0.2s)
   — gives a "loading in" feel appropriate to receiving an email
```

---

#### 3. Verdict Banner (ExplanationCard — "✓ Correct" / "✗ Wrong" / "⏱ Timeout")
**Current:** CSS `stampIn` (correct) or `shake` (wrong) on the banner div.
**GSAP upgrade:**

*Correct:*
```
1. Banner scales from 1.5 → 0.9 → 1.0 (stamp, ease: "back.out(3)", duration: 0.4s)
2. Green particles burst outward from banner (8 circles, x/y randomized, opacity → 0)
3. Points number counts up: gsap.to(counter, {innerText: targetPoints, duration: 0.6s,
   snap: {innerText: 1}, ease: "power2.out"}) — requires a custom counter
4. Delta "+X pts" floats up: y: 0 → -30, opacity: 1 → 0 (duration: 0.8s)
```

*Wrong:*
```
1. Banner shakes: x oscillates ±6px, repeat 5, duration: 0.05s each (sharp shake)
2. Red flash: backgroundColor pulses rgba(255,59,48,0.2) → rgba(255,59,48,0) (duration: 0.4s)
3. Screen edge vignette: red border glow fades in/out (box-shadow on root container)
```

*Timeout:*
```
1. Banner slides in slowly from top (y: -20 → 0, ease: "power1.out", duration: 0.4s)
2. Amber pulse on banner border (2×)
3. Timer number at 0 flashes amber rapidly
```

---

#### 4. Score Counter (GameRound header)
**Current:** Score updates instantly via React state.
**GSAP upgrade:**
```
On each score update:
gsap.to(scoreEl, {
  innerText: newScore, duration: 0.4s,
  snap: {innerText: 1},
  ease: "power2.out"
})
+ brief scale bounce: scale 1 → 1.2 → 1.0 (duration: 0.25s, ease: "back.out(2)")
```

---

#### 5. Zone Progress Dots (GameRound header)
**Current:** Dot color changes via React state (no animation).
**GSAP upgrade:**
```
On email submission (dot i completes):
1. Current dot (blue) → completed (green):
   scale 1 → 1.6 → 1.0 with color tween (duration: 0.35s, ease: "elastic.out")
2. Next dot (grey → blue):
   scale 0.8 → 1.0, opacity 0.3 → 1 (duration: 0.25s, delay: 0.1s)
```

---

#### 6. L2 Classifier Reveal (Classifier component)
**Current:** CSS `fadeSlideUp` class on the L2 container div.
**GSAP upgrade:**
```
On L1 selection → L2 appears:
1. L2 container: y: 10 → 0, opacity: 0 → 1 (ease: "power2.out", duration: 0.25s)
2. L2 pill buttons stagger in: each pill y: 8 → 0, opacity: 0 → 1
   (stagger: 0.04s, ease: "back.out(1.5)")
3. Selected L1 button: scale 1 → 0.96 → 1 (brief press feel, duration: 0.15s)
```

---

#### 7. Clue Reveal (ClueSystem component)
**Current:** CSS `fadeIn` on revealed hint.
**GSAP upgrade:**
```
On hint button click:
1. Hint button: brief scale press (1 → 0.92 → 1, duration: 0.15s)
2. Hint card: y: -8 → 0, opacity: 0 → 1 (ease: "power2.out", duration: 0.3s)
3. 💡 icon: rotates -15° → 5° → 0 (wobble, duration: 0.4s, ease: "elastic.out")
4. "-1 pt" text: briefly appears larger then settles (scale 1.3 → 1, duration: 0.2s)
   to reinforce the cost of using a hint
```

---

#### 8. Zone Complete Category Bars (ZoneComplete component)
**Current:** CSS `transition: width 0.8s` on the bar fill.
**GSAP upgrade:**
```
gsap.from(bars, {
  width: "0%",
  duration: 0.8,
  ease: "power2.out",
  stagger: 0.1,
  delay: 0.2,
})
+ Bar color: if accuracy < 50, tween bar color red with a subtle pulse after fill
+ Counter next to bar: innerText animates from 0 → actual% using snap
```

---

#### 9. ZoneIntroCard spring entry
**Current:** CSS `springIn` (scale 0.96 → 1.02 → 1.0).
**GSAP upgrade:**
```
Timeline:
1. Card: scale 0.85 → 1.0, opacity 0 → 1 (elastic.out(1, 0.6), duration: 0.6s)
2. Zone title: y: 12 → 0, opacity 0 → 1 (delay: 0.15s, ease: "power2.out")
3. Stat tiles stagger in: scale 0 → 1.05 → 1 (stagger: 0.08s, ease: "back.out(2)")
4. Zone color badge pill: slides in from left (x: -20 → 0, delay: 0.1s)
5. Start button: pulses once gently after all elements settle (scale 1 → 1.04 → 1, delay: 0.6s)
   — draws attention to the CTA
```

---

#### 10. Landing Screen Zone Card Stack — hover interaction
**Current:** Static stacked deck (no interaction).
**GSAP upgrade:**
```
On mouse hover over the card stack:
gsap.to(cards, {
  y: (i) => i * -14, // fan the cards upward
  rotation: (i) => (i - 1) * -3, // slight fan rotation
  stagger: 0.05,
  ease: "power2.out",
  duration: 0.3
})
On mouse leave: reverse back to stacked position
```

---

#### 11. Leaderboard Row Entry
**Current:** CSS `slideInFromLeft` with staggered `animation-delay`.
**GSAP upgrade:**
```
gsap.from(rows, {
  x: -40,
  opacity: 0,
  duration: 0.4,
  stagger: 0.07,
  ease: "power2.out"
})
+ Medal icons (🥇🥈🥉): scale 0 → 1.2 → 1.0, ease: "back.out(2)", stagger 0.1s
+ "You" highlighted row: subtle pulse after entry (scale 1 → 1.02 → 1, box-shadow flash)
```

---

#### 12. Giveaway Phrase Highlight (ExplanationCard — EmailCard with giveawayHighlight)
**Current:** CSS `glowPulse` keyframe on the `<mark>` element.
**GSAP upgrade:**
```
On ExplanationCard mount:
1. Brief delay (0.4s) then highlight mark background animates from transparent → yellow
   gsap.to(mark, {backgroundColor: "rgba(255,214,10,0.35)", duration: 0.3, delay: 0.4})
2. Glow pulse: boxShadow 0px → 12px yellow → 4px (yoyo, repeat: 2)
3. Scroll into view if below fold (gsap.to(window, {scrollTo: markEl, duration: 0.5}))
   — requires ScrollToPlugin
```

---

## Part 3 Summary — GSAP Plugins Needed

| Plugin | Used For |
|--------|----------|
| `DrawSVGPlugin` | Lightning bolt, checkmark, clock arc, ice cracks |
| `MorphSVGPlugin` | Flame shape morphing (optional enhancement) |
| `ScrollToPlugin` | Auto-scroll to giveaway highlight in explanation |
| `CustomEase` | Fine-tuned badge spring eases |
| Core GSAP (free) | All color tweens, position, scale, stagger, countTo |

> `DrawSVGPlugin` and `MorphSVGPlugin` require **GSAP Club GreenSock** (paid tier).
> All stagger, position, scale, and color animations use **core GSAP** which is free.
> Consider starting with free plugins and adding Club features only for the DrawSVG badge animations.

---

## Implementation Order (Recommended)

1. Install GSAP: `npm install gsap`
2. Source all 10 SVG files (see Part 2 above)
3. Build badge SVG components (each badge as its own React component with `useRef` handles on path elements)
4. Implement badge toast GSAP timeline (replaces CSS `toastSlideIn/Out`)
5. Implement timer bar GSAP (most visible in-game improvement)
6. Implement verdict banner GSAP (stamp/shake with particles)
7. Implement per-badge icon animations
8. Implement score counter, progress dots, clue reveal
9. Zone transitions (ZoneIntroCard, ZoneComplete bars)
10. Landing screen hover on card stack
