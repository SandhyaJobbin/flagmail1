import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import anime from 'animejs';
import Matter from 'matter-js';

// ─── Confetti canvas (Matter.js) — only shown on flawless runs ───────────────
function ConfettiCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const { Engine, Render, Runner, Bodies, Composite, Body } = Matter;

    const engine = Engine.create({ gravity: { y: 1.4 } });
    const render = Render.create({
      canvas: canvasRef.current,
      engine,
      options: {
        width: 480,
        height: 340,
        background: 'transparent',
        wireframes: false,
      },
    });

    const colors = ['#0A84FF', '#34C759', '#FF9500', '#FFD60A', '#FF3B30', '#BF5AF2'];
    const confetti = Array.from({ length: 72 }, () => {
      const x = Math.random() * 480;
      const y = -20 - Math.random() * 160;
      const w = 8 + Math.random() * 10;
      const h = 4 + Math.random() * 6;
      const body = Bodies.rectangle(x, y, w, h, {
        restitution: 0.3,
        friction: 0.01,
        frictionAir: 0.025 + Math.random() * 0.02,
        render: { fillStyle: colors[Math.floor(Math.random() * colors.length)] },
        angle: Math.random() * Math.PI * 2,
      });
      Body.setVelocity(body, {
        x: (Math.random() - 0.5) * 6,
        y: Math.random() * -6 - 2,
      });
      Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.18);
      return body;
    });

    Composite.add(engine.world, confetti);
    Render.run(render);
    const runner = Runner.create();
    Runner.run(runner, engine);

    const cleanup = setTimeout(() => {
      Render.stop(render);
      Runner.stop(runner);
      Engine.clear(engine);
    }, 3200);

    return () => {
      clearTimeout(cleanup);
      Render.stop(render);
      Runner.stop(runner);
      Engine.clear(engine);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        pointerEvents: 'none',
        zIndex: 10,
        maxWidth: 480,
        width: '100%',
      }}
    />
  );
}

// ─── Animated accuracy bar (anime.js) ────────────────────────────────────────
function AnimatedBar({ accuracy, color, delay = 0 }) {
  const barRef = useRef(null);

  useEffect(() => {
    if (!barRef.current) return;
    anime({
      targets: barRef.current,
      width: [`0%`, `${accuracy}%`],
      duration: 900,
      delay,
      easing: 'easeOutQuart',
    });
  }, [accuracy, delay]);

  return (
    <div style={{ height: 5, background: 'rgba(0,0,0,0.06)', borderRadius: 3, overflow: 'hidden' }}>
      <div
        ref={barRef}
        style={{ height: '100%', width: '0%', background: color, borderRadius: 3 }}
      />
    </div>
  );
}

// ─── Animated stat counter (anime.js) ────────────────────────────────────────
function StatCounter({ value, suffix = '', delay = 0 }) {
  const ref = useRef(null);
  const isNumeric = typeof value === 'number';

  useEffect(() => {
    if (!ref.current || !isNumeric) return;
    const obj = { val: 0 };
    anime({
      targets: obj,
      val: value,
      duration: 900,
      delay,
      easing: 'easeOutQuart',
      update: () => {
        if (ref.current) ref.current.textContent = Math.round(obj.val) + suffix;
      },
    });
  }, [value, suffix, delay, isNumeric]);

  if (!isNumeric) {
    return <span ref={ref}>{value}{suffix}</span>;
  }
  return <span ref={ref}>0{suffix}</span>;
}

// ─── Category breakdown with anime.js bars ───────────────────────────────────
function CategoryBreakdown({ zoneEmails }) {
  const catMap = {};
  zoneEmails.forEach(r => {
    const cat = r.correctL1;
    if (!catMap[cat]) catMap[cat] = { correct: 0, total: 0, missed: {} };
    catMap[cat].total++;
    if (r.l1Correct) {
      catMap[cat].correct++;
    } else if (r.selectedL1) {
      catMap[cat].missed[r.selectedL1] = (catMap[cat].missed[r.selectedL1] || 0) + 1;
    }
  });

  const breakdown = Object.entries(catMap)
    .map(([cat, v]) => ({
      cat,
      accuracy: Math.round((v.correct / v.total) * 100),
      correct: v.correct,
      total: v.total,
      topMiss: Object.entries(v.missed).sort((a, b) => b[1] - a[1])[0]?.[0] || null,
    }))
    .sort((a, b) => b.accuracy - a.accuracy);

  const focusAreas = breakdown.filter(c => c.accuracy < 50);

  if (breakdown.length === 0) return null;

  return (
    <div style={{ marginBottom: 24, textAlign: 'left' }}>
      <div style={{
        fontSize: 10, fontWeight: 700, color: 'rgba(60,60,67,0.45)',
        letterSpacing: '0.08em', marginBottom: 10,
      }}>
        CATEGORY BREAKDOWN
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: focusAreas.length ? 20 : 0 }}>
        {breakdown.map(({ cat, accuracy, correct, total, topMiss }, i) => {
          const barColor = accuracy >= 70 ? '#34C759' : accuracy >= 50 ? '#FF9500' : '#FF3B30';
          return (
            <motion.div
              key={cat}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + i * 0.08, duration: 0.35, ease: 'easeOut' }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 4 }}>
                <span style={{ fontSize: 12, fontWeight: 600, color: '#1C1C1E' }}>{cat}</span>
                <span style={{ fontSize: 12, fontWeight: 700, color: barColor }}>
                  {correct}/{total} · {accuracy}%
                </span>
              </div>
              <AnimatedBar accuracy={accuracy} color={barColor} delay={i * 120} />
              {topMiss && (
                <div style={{ fontSize: 11, color: '#AEAEB2', marginTop: 4 }}>
                  Tagged as <span style={{ color: '#FF3B30', fontWeight: 600 }}>{topMiss}</span>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>

      {focusAreas.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 + breakdown.length * 0.08 }}
          style={{
            background: 'rgba(255,59,48,0.06)',
            border: '1px solid rgba(255,59,48,0.18)',
            borderRadius: 12,
            padding: '12px 14px',
          }}
        >
          <div style={{
            fontSize: 10, fontWeight: 700, color: '#FF3B30',
            letterSpacing: '0.08em', marginBottom: 8,
          }}>
            STUDY UP ON
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {focusAreas.map(({ cat, accuracy }) => (
              <div key={cat} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: 13 }}>📖</span>
                <div>
                  <span style={{ fontSize: 12, fontWeight: 600, color: '#1C1C1E' }}>{cat}</span>
                  <span style={{ fontSize: 11, color: '#8E8E93', marginLeft: 6 }}>
                    {accuracy}% accuracy — needs work
                  </span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const glass = {
  background: 'rgba(255,255,255,0.65)',
  backdropFilter: 'blur(24px) saturate(180%)',
  WebkitBackdropFilter: 'blur(24px) saturate(180%)',
  border: '1px solid rgba(255,255,255,0.8)',
  borderRadius: 20,
  boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
};

const ZONE_META = {
  1: { color: '#0A84FF' },
  2: { color: '#30B0C7' },
  3: { color: '#FF7A1A' },
};

const PERFORMANCE_MESSAGES = {
  1: {
    high: 'Strong start. You cut through the obvious threats cleanly.',
    mid: 'Solid pass. A few clear threats slipped through.',
    low: 'Some obvious flags were missed. Zone 2 demands more.',
  },
  2: {
    high: 'Sharp eye. You handled the polished fakes well.',
    mid: 'The cleaner emails created some uncertainty.',
    low: 'The polished emails caused problems. Slow down in Zone 3.',
  },
  3: {
    high: 'Specialist-level judgment. You found the subtle signals.',
    mid: 'The edge cases tested your limits. A few key details were missed.',
    low: 'The subtle signals in this zone proved difficult.',
  },
};

function getPerformanceTier(correctCount) {
  const pct = correctCount / 5;
  if (pct >= 0.8) return 'high';
  if (pct >= 0.4) return 'mid';
  return 'low';
}

// ─── Main export ──────────────────────────────────────────────────────────────
export default function ZoneComplete({
  zone, zoneScore, maxZoneScore, zoneEmails,
  earlyUnlocked, consecutivePerfect, onContinue,
}) {
  const meta = ZONE_META[zone];
  const correctCount = zoneEmails.filter(r => r.l1Correct).length;
  const accuracy = zoneEmails.length > 0
    ? Math.round((correctCount / zoneEmails.length) * 100)
    : 0;
  const wrongCount = zoneEmails.filter(r => !r.l1Correct).length;
  const isLast = zone === 3;
  const isFlawless = wrongCount === 0;
  const tier = getPerformanceTier(correctCount);
  const performanceMsg = PERFORMANCE_MESSAGES[zone]?.[tier] ?? '';

  const stats = [
    { label: 'Score', value: `${zoneScore} / ${maxZoneScore}`, isNumeric: false },
    { label: 'Accuracy', value: accuracy, suffix: '%', isNumeric: true },
    { label: 'Missed', value: wrongCount, suffix: '', isNumeric: true },
  ];

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px 16px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
      position: 'relative',
      overflow: 'hidden',
    }}>

      {/* Matter.js confetti — only on flawless */}
      <AnimatePresence>
        {isFlawless && <ConfettiCanvas key="confetti" />}
      </AnimatePresence>

      <div style={{ width: '100%', maxWidth: 480, position: 'relative', zIndex: 1 }}>

        {/* Early unlock banner */}
        {earlyUnlocked && !isLast && (
          <motion.div
            initial={{ opacity: 0, y: -16, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ type: 'spring', stiffness: 320, damping: 28 }}
            style={{
              ...glass,
              padding: '12px 20px',
              marginBottom: 16,
              borderLeft: '3px solid #FFD60A',
              display: 'flex',
              alignItems: 'center',
              gap: 10,
            }}
          >
            <motion.span
              animate={{ rotate: [0, -15, 15, -10, 10, 0] }}
              transition={{ delay: 0.3, duration: 0.6 }}
              style={{ fontSize: 20, display: 'inline-block' }}
            >
              ⚡
            </motion.span>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#B8860B' }}>EARLY UNLOCK!</div>
              <div style={{ fontSize: 12, color: '#636366' }}>
                {consecutivePerfect} consecutive perfect scores – next zone unlocked early!
              </div>
            </div>
          </motion.div>
        )}

        {/* Main card */}
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ type: 'spring', stiffness: 280, damping: 26 }}
          style={{ ...glass, padding: 36, textAlign: 'center' }}
        >
          {/* Zone icon */}
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 400, damping: 18, delay: 0.1 }}
            style={{ fontSize: 44, marginBottom: 12, display: 'inline-block' }}
          >
            {isFlawless ? '🏆' : zone === 3 ? '🎯' : '✅'}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.3 }}
            style={{
              display: 'inline-block',
              fontSize: 12,
              fontWeight: 700,
              color: meta.color,
              letterSpacing: '0.08em',
              marginBottom: 8,
            }}
          >
            ZONE {zone} COMPLETE — SECTION {zone} OF 3
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.3 }}
            style={{ fontSize: 28, fontWeight: 800, color: '#1C1C1E', margin: '0 0 24px', letterSpacing: '-0.01em' }}
          >
            {performanceMsg}
          </motion.h2>

          {/* Stat tiles */}
          <div style={{ display: 'flex', gap: 12, marginBottom: 28 }}>
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 + i * 0.08, duration: 0.35, ease: 'easeOut' }}
                style={{
                  flex: 1,
                  background: 'rgba(0,0,0,0.04)',
                  borderRadius: 12,
                  padding: '14px 8px',
                }}
              >
                <div style={{ fontSize: 22, fontWeight: 700, color: '#1C1C1E' }}>
                  {s.isNumeric
                    ? <StatCounter value={s.value} suffix={s.suffix} delay={300 + i * 80} />
                    : <span>{s.value}</span>
                  }
                </div>
                <div style={{ fontSize: 11, color: '#636366', marginTop: 2 }}>{s.label}</div>
              </motion.div>
            ))}
          </div>

          {/* Category breakdown */}
          <CategoryBreakdown zoneEmails={zoneEmails} />

          {/* CTA button */}
          <motion.button
            onClick={onContinue}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.3 }}
            style={{
              width: '100%',
              padding: '15px',
              borderRadius: 12,
              border: 'none',
              background: '#0A84FF',
              color: '#fff',
              fontSize: 15,
              fontWeight: 700,
              cursor: 'pointer',
              fontFamily: 'inherit',
              boxShadow: '0 4px 16px rgba(10,132,255,0.35)',
            }}
          >
            {isLast ? 'See Your Results' : `Enter Zone ${zone + 1}`}
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}
