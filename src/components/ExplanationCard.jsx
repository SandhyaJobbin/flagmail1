import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import EmailCard from './EmailCard.jsx';

// ─────────────────────────────────────────────────────────────────────────────
// Confetti canvas helper
// ─────────────────────────────────────────────────────────────────────────────
function runConfetti(canvas) {
  const W = window.innerWidth;
  const H = window.innerHeight;
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext('2d');
  const COLORS = [
    '#FF3B30', '#34C759', '#0A84FF', '#FF9500',
    '#5856D6', '#FFD60A', '#FF2D55', '#30D158',
  ];

  const pieces = Array.from({ length: 160 }, () => ({
    x: W * 0.15 + Math.random() * W * 0.7,
    y: -20 - Math.random() * 120,
    vx: (Math.random() - 0.5) * 8,
    vy: 2.5 + Math.random() * 5,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    w: 7 + Math.random() * 9,
    h: 4 + Math.random() * 5,
    rotation: Math.random() * 360,
    rotVel: (Math.random() - 0.5) * 9,
  }));

  let raf;
  function draw() {
    ctx.clearRect(0, 0, W, H);
    let alive = false;
    pieces.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.13; // gravity
      p.vx *= 0.995; // subtle air drag
      p.rotation += p.rotVel;
      if (p.y < H + 40) alive = true;

      const alpha = Math.max(0, Math.min(1, 1 - p.y / (H * 1.1)));
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rotation * Math.PI) / 180);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
      ctx.restore();
    });
    if (alive) raf = requestAnimationFrame(draw);
  }
  draw();
  return () => cancelAnimationFrame(raf);
}

// ─────────────────────────────────────────────────────────────────────────────
// Full-screen correct-answer overlay
// ─────────────────────────────────────────────────────────────────────────────
function CorrectAnswerOverlay({ points, onDone }) {
  const canvasRef = useRef(null);

  // Auto-dismiss after 2.4 s
  useEffect(() => {
    const t = setTimeout(onDone, 2400);
    return () => clearTimeout(t);
  }, [onDone]);

  // Kick off confetti once canvas is mounted
  useEffect(() => {
    if (!canvasRef.current) return;
    return runConfetti(canvasRef.current);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.18 }}
      onClick={onDone}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 2000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'rgba(0,0,0,0.60)',
        backdropFilter: 'blur(5px)',
        WebkitBackdropFilter: 'blur(5px)',
        cursor: 'pointer',
      }}
    >
      {/* Confetti layer */}
      <canvas
        ref={canvasRef}
        style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
      />

      {/* Burst ring */}
      <motion.div
        initial={{ scale: 0.3, opacity: 0.7 }}
        animate={{ scale: 3.5, opacity: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        style={{
          position: 'absolute',
          width: 180,
          height: 180,
          borderRadius: '50%',
          border: '3px solid rgba(52,199,89,0.7)',
          pointerEvents: 'none',
        }}
      />

      {/* Center content */}
      <motion.div
        initial={{ scale: 0.45, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.85, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 420, damping: 22, delay: 0.04 }}
        style={{
          position: 'relative',
          textAlign: 'center',
          fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
          userSelect: 'none',
        }}
      >
        {/* Emoji */}
        <motion.div
          animate={{ rotate: [0, -10, 10, -6, 6, 0] }}
          transition={{ delay: 0.18, duration: 0.55, ease: 'easeInOut' }}
          style={{ fontSize: 96, lineHeight: 1, marginBottom: 16 }}
        >
          🎯
        </motion.div>

        {/* "NAILED IT!" */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.22, type: 'spring', stiffness: 300, damping: 20 }}
          style={{
            fontSize: 58,
            fontWeight: 900,
            color: '#fff',
            letterSpacing: '-0.03em',
            lineHeight: 1,
            textShadow: '0 4px 28px rgba(0,0,0,0.45)',
            marginBottom: 14,
          }}
        >
          Nailed it!
        </motion.div>

        {/* Points */}
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', stiffness: 340, damping: 18, delay: 0.36 }}
          style={{
            display: 'inline-block',
            fontSize: 38,
            fontWeight: 800,
            color: '#34C759',
            background: 'rgba(52,199,89,0.15)',
            border: '1.5px solid rgba(52,199,89,0.45)',
            borderRadius: 20,
            padding: '6px 28px',
            textShadow: '0 2px 14px rgba(52,199,89,0.55)',
          }}
        >
          +{points} pts
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.55 }}
          transition={{ delay: 0.55 }}
          style={{
            marginTop: 18,
            fontSize: 13,
            color: '#fff',
            fontWeight: 500,
          }}
        >
          Tap anywhere to continue
        </motion.p>
      </motion.div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Glass style + section variant (unchanged)
// ─────────────────────────────────────────────────────────────────────────────
const glass = {
  background: 'rgba(255,255,255,0.65)',
  backdropFilter: 'blur(24px) saturate(180%)',
  WebkitBackdropFilter: 'blur(24px) saturate(180%)',
  border: '1px solid rgba(255,255,255,0.8)',
  borderRadius: 20,
  boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
};

const section = {
  hidden: { opacity: 0, y: 14 },
  visible: (delay) => ({
    opacity: 1,
    y: 0,
    transition: { delay, type: 'spring', stiffness: 260, damping: 22 },
  }),
};

// ─────────────────────────────────────────────────────────────────────────────
// Main ExplanationCard
// ─────────────────────────────────────────────────────────────────────────────
export default function ExplanationCard({ email, record, totalScore, onNext }) {
  const [showDelta, setShowDelta] = useState(false);
  const [showOverlay, setShowOverlay] = useState(record.l1Correct);

  useEffect(() => {
    const t = setTimeout(() => setShowDelta(true), 300);
    return () => clearTimeout(t);
  }, []);

  const { l1Correct, timedOut, points } = record;

  const verdict = timedOut && !l1Correct
    ? { label: '⏱ Ran out of time', color: '#FF9500', bg: 'rgba(255,149,0,0.1)' }
    : l1Correct
    ? { label: '✓ Nailed it!', color: '#34C759', bg: 'rgba(52,199,89,0.1)' }
    : { label: '↗ Missed it', color: '#FF3B30', bg: 'rgba(255,59,48,0.1)' };

  const deltaStr = points > 0 ? `+${points}` : '0';

  function buildScoreBreak() {
    if (points > 0) return `+${points} pts — L1 correct`;
    return '0 pts';
  }

  return (
    <>
      {/* ── Correct-answer celebration overlay ── */}
      <AnimatePresence>
        {showOverlay && (
          <CorrectAnswerOverlay
            points={points}
            onDone={() => setShowOverlay(false)}
          />
        )}
      </AnimatePresence>

      <div style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
        padding: '20px 16px',
      }}>
        <div style={{ maxWidth: 680, margin: '0 auto', width: '100%', boxSizing: 'border-box' }}>

          {/* Verdict banner */}
          <motion.div
            initial={l1Correct ? { opacity: 0, scale: 0.88, y: -8 } : { opacity: 0, x: -10 }}
            animate={l1Correct ? { opacity: 1, scale: 1, y: 0 } : { opacity: 1, x: 0 }}
            transition={
              l1Correct
                ? { type: 'spring', stiffness: 420, damping: 22 }
                : { type: 'spring', stiffness: 380, damping: 18 }
            }
            style={{
              ...glass,
              padding: '16px 20px',
              marginBottom: 14,
              background: verdict.bg,
              border: `1px solid ${verdict.color}30`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <span style={{ fontSize: 18, fontWeight: 700, color: verdict.color }}>
              {verdict.label}
            </span>
            <div style={{ textAlign: 'right', position: 'relative' }}>
              <div style={{ fontSize: 24, fontWeight: 800, color: verdict.color }}>
                {deltaStr} pts
              </div>
              <div style={{ fontSize: 12, color: '#636366' }}>
                {buildScoreBreak()}
              </div>

              {/* Floating delta */}
              <AnimatePresence>
                {showDelta && (
                  <motion.div
                    key="delta"
                    initial={{ opacity: 1, y: 0 }}
                    animate={{ opacity: 0, y: -24 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.7, ease: 'easeOut' }}
                    style={{
                      position: 'absolute',
                      top: -20,
                      right: 0,
                      fontSize: 14,
                      fontWeight: 700,
                      color: verdict.color,
                      pointerEvents: 'none',
                    }}
                  >
                    {deltaStr}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Email with giveaway highlights */}
          <motion.div
            custom={0.08}
            variants={section}
            initial="hidden"
            animate="visible"
            style={{ marginBottom: 14 }}
          >
            <EmailCard email={email} giveawayHighlight={true} />
          </motion.div>

          {/* Analysis card */}
          <motion.div
            custom={0.16}
            variants={section}
            initial="hidden"
            animate="visible"
            style={{ ...glass, padding: 20, marginBottom: 14, borderLeft: '3px solid #0A84FF' }}
          >
            <div style={{ fontSize: 11, fontWeight: 600, color: '#636366', letterSpacing: '0.08em', marginBottom: 8 }}>
              ANALYSIS
            </div>
            <div style={{ fontSize: 14, color: '#1C1C1E', lineHeight: 1.6, marginBottom: 12 }}>
              {email.explanation}
            </div>

            {email.subCategory && (
              <div style={{ marginBottom: 16 }}>
                <span style={{
                  fontSize: 11, fontWeight: 600, letterSpacing: '0.04em',
                  color: '#636366', background: 'rgba(0,0,0,0.06)',
                  border: '1px solid rgba(0,0,0,0.1)', borderRadius: 20,
                  padding: '3px 10px',
                }}>
                  {email.subCategory}
                </span>
              </div>
            )}

            {/* Classification comparison rows */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>

              {/* L1 row */}
              {(!record.l1Correct && (record.selectedL1 || record.timedOut)) && (
                <motion.div
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.28, duration: 0.3 }}
                  style={{ borderRadius: 10, overflow: 'hidden', border: '1px solid rgba(255,59,48,0.35)' }}
                >
                  <div style={{
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    padding: '7px 12px', background: 'rgba(255,59,48,0.08)',
                  }}>
                    <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', color: '#636366' }}>
                      CATEGORY (L1)
                    </span>
                    <span style={{ fontSize: 12, fontWeight: 700, color: '#FF3B30' }}>
                      {record.timedOut && !record.selectedL1 ? '⏱ Ran out of time' : '↗ Missed it'}
                    </span>
                  </div>
                  <div style={{ padding: '8px 12px', display: 'flex', flexDirection: 'column', gap: 6 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: 12, color: '#8E8E93' }}>You selected</span>
                      <span style={{ fontSize: 13, fontWeight: 600, color: '#FF3B30' }}>
                        {record.selectedL1 || '— (timed out)'}
                      </span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: 12, color: '#8E8E93' }}>Correct answer</span>
                      <span style={{ fontSize: 13, fontWeight: 600, color: '#34C759' }}>
                        {record.correctL1}
                      </span>
                    </div>
                  </div>
                </motion.div>
              )}

            </div>
          </motion.div>

          {/* Running total */}
          <motion.div
            custom={0.24}
            variants={section}
            initial="hidden"
            animate="visible"
            style={{
              ...glass,
              padding: '12px 20px',
              marginBottom: 14,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <span style={{ fontSize: 13, color: '#636366', fontWeight: 500 }}>Running total</span>
            <span style={{ fontSize: 20, fontWeight: 800, color: '#1C1C1E' }}>{totalScore} pts</span>
          </motion.div>

          {/* Next button */}
          <motion.button
            onClick={onNext}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            custom={0.3}
            variants={section}
            initial="hidden"
            animate="visible"
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
              boxShadow: '0 4px 16px rgba(10,132,255,0.32)',
            }}
          >
            Next Email →
          </motion.button>

        </div>
      </div>
    </>
  );
}
