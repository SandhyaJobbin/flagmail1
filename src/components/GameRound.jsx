import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTimer } from '../hooks/useTimer.js';
import TimerBar from './TimerBar.jsx';
import EmailCard from './EmailCard.jsx';
import Classifier from './Classifier.jsx';
import gsap from 'gsap';
import { ROUND_DURATION_SECONDS } from '../config/game.js';
import { ZONE_CONFIG } from '../data/emails.js';

const glassCard = {
  background: 'rgba(255,255,255,0.62)',
  backdropFilter: 'blur(32px) saturate(180%)',
  WebkitBackdropFilter: 'blur(32px) saturate(180%)',
  border: '1px solid rgba(255,255,255,0.80)',
  borderRadius: 28,
  boxShadow: '0 20px 60px rgba(0,0,0,0.14), 0 4px 16px rgba(0,0,0,0.08)',
};

const glassDivider = {
  width: 1,
  background: 'rgba(255,255,255,0.55)',
  alignSelf: 'stretch',
  flexShrink: 0,
};

export default function GameRound({
  email, zone, emailInZone, emailsInZone, totalScore,
  round, onRevealHint, onSelectL1, onSubmit,
}) {
  const roundRef = useRef(round);
  useEffect(() => { roundRef.current = round; }, [round]);

  const scoreDisplayRef = useRef(null);
  const prevScoreRef = useRef(totalScore);
  useEffect(() => {
    if (!scoreDisplayRef.current) return;
    const from = prevScoreRef.current;
    const to = totalScore;
    if (from === to) return;
    gsap.fromTo(
      { val: from },
      { val: to, duration: 0.5, ease: 'power2.out',
        onUpdate: function () {
          if (scoreDisplayRef.current)
            scoreDisplayRef.current.textContent = Math.round(this.targets()[0].val);
        },
      }
    );
    gsap.fromTo(scoreDisplayRef.current,
      { scale: 1.25, color: '#34C759' },
      { scale: 1, color: '#1C1C1E', duration: 0.4, ease: 'back.out(2)' }
    );
    prevScoreRef.current = to;
  }, [totalScore]);

  function handleTimeout() { onSubmit(0, true); }

  const { timeLeft, phase, progress, start, stop } = useTimer(ROUND_DURATION_SECONDS, handleTimeout);

  useEffect(() => {
    start();
    return () => stop();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [email?.id]);

  const canSubmit = !!round.selectedL1 && !round.submitted;

  function handleSubmit() {
    if (!canSubmit) return;
    stop();
    onSubmit(timeLeft, false);
  }

  const phaseColor = phase === 'green' ? '#34C759' : phase === 'amber' ? '#FF9500' : '#FF3B30';
  const urgencyLabel = phase === 'red' ? '⚠ Hurry!' : phase === 'amber' ? 'Running low' : null;
  const zoneName = ZONE_CONFIG[zone]?.name || `Zone ${zone}`;

  return (
    <div style={{
      height: '100vh', display: 'flex', alignItems: 'stretch', justifyContent: 'center',
      padding: '20px 8vw',
      fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
      boxSizing: 'border-box',
    }}>
      <div style={{ ...glassCard, width: '100%', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>

        {/* ── Card header ── */}
        <div style={{ padding: '16px 28px 0', borderBottom: '1px solid rgba(255,255,255,0.55)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
            <span style={{ fontSize: 17, fontWeight: 800, color: '#1C1C1E', letterSpacing: '-0.02em' }}>
              Flagmail
            </span>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
              <div style={{ display: 'flex', gap: 3 }}>
                {Array.from({ length: emailsInZone }).map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{
                      background: i < emailInZone - 1 ? '#34C759' : i === emailInZone - 1 ? '#0A84FF' : 'rgba(0,0,0,0.10)',
                      scale: i === emailInZone - 1 ? 1.2 : 1,
                    }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                    style={{ width: 18, height: 4, borderRadius: 2 }}
                  />
                ))}
              </div>
              <span style={{ fontSize: 11, fontWeight: 600, color: '#8E8E93' }}>
                {zoneName} · {emailInZone}/{emailsInZone}
              </span>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: 10, color: '#AEAEB2', fontWeight: 600, letterSpacing: '0.06em' }}>SCORE</div>
              <div ref={scoreDisplayRef} style={{ fontSize: 20, fontWeight: 800, color: '#1C1C1E', lineHeight: 1, display: 'inline-block' }}>
                {totalScore}
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, paddingBottom: 14 }}>
            <TimerBar timeLeft={timeLeft} phase={phase} progress={progress} />
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, minWidth: 80, justifyContent: 'flex-end' }}>
              <AnimatePresence mode="wait">
                {urgencyLabel && (
                  <motion.span
                    key={urgencyLabel}
                    initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 4 }}
                    style={{ fontSize: 11, fontWeight: 700, color: phaseColor }}
                  >
                    {urgencyLabel}
                  </motion.span>
                )}
              </AnimatePresence>
              <span style={{ fontSize: 13, fontWeight: 700, color: phaseColor, minWidth: 30, textAlign: 'right', transition: 'color 0.3s' }}
                className={phase === 'red' ? 'anim-timerPulse' : ''}
              >
                {timeLeft}s
              </span>
            </div>
          </div>
        </div>

        {/* ── Two-column body ── */}
        <div style={{ display: 'flex', flex: 1, minHeight: 0 }}>

          {/* Left — Email + inline hint */}
          <AnimatePresence mode="wait">
            <motion.div
              key={email?.id}
              initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 12 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              style={{ flex: '0 0 58%', padding: '20px 24px 24px', overflowY: 'auto' }}
            >
              <EmailCard email={email} giveawayHighlight={false} />

              {/* ── Inline hint UI ── */}
              {!round.submitted && (
                <div style={{ marginTop: 12 }}>
                  {!round.hintRevealed ? (
                    <button
                      onClick={onRevealHint}
                      style={{
                        display: 'flex', alignItems: 'center', gap: 6,
                        background: 'none', border: 'none', cursor: 'pointer',
                        padding: '6px 0', fontFamily: 'inherit',
                        color: 'rgba(60,60,67,0.55)', fontSize: 13,
                      }}
                    >
                      <span style={{ fontSize: 15 }}>ⓘ</span>
                      <span style={{ textDecoration: 'underline', textDecorationStyle: 'dotted' }}>Reveal Hint</span>
                    </button>
                  ) : (
                    <span style={{ fontSize: 11, color: 'rgba(60,60,67,0.35)', fontStyle: 'italic' }}>Hint shown</span>
                  )}

                  <AnimatePresence>
                    {round.hintRevealed && (
                      <motion.div
                        initial={{ opacity: 0, height: 0, y: -6 }}
                        animate={{ opacity: 1, height: 'auto', y: 0 }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ type: 'spring', stiffness: 340, damping: 28 }}
                        style={{
                          marginTop: 8,
                          background: 'rgba(255,193,7,0.08)',
                          borderLeft: '3px solid #FF9500',
                          borderRadius: '0 8px 8px 0',
                          padding: '10px 14px',
                          fontSize: 13,
                          color: '#3A3A3C',
                          fontStyle: 'italic',
                          lineHeight: 1.55,
                          overflow: 'hidden',
                        }}
                      >
                        {email?.clue}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          <div style={glassDivider} />

          {/* Right — Classifier + Submit */}
          <div style={{ flex: 1, padding: '20px 24px 24px', display: 'flex', flexDirection: 'column', gap: 16, overflowY: 'auto' }}>
            <div style={{
              background: '#ffffff', borderRadius: 16, padding: '16px',
              border: '1px solid rgba(0,0,0,0.06)', boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
            }}>
              <Classifier
                selectedL1={round.selectedL1}
                onSelectL1={onSelectL1}
                disabled={round.submitted}
              />
            </div>

            <motion.button
              onClick={handleSubmit}
              disabled={!canSubmit}
              whileHover={canSubmit ? { scale: 1.02 } : {}}
              whileTap={canSubmit ? { scale: 0.97 } : {}}
              style={{
                width: '100%', padding: '14px', borderRadius: 14, border: 'none',
                background: canSubmit ? 'linear-gradient(135deg, #0A84FF 0%, #007AFF 100%)' : 'rgba(0,0,0,0.07)',
                color: canSubmit ? '#fff' : '#AEAEB2',
                fontSize: 15, fontWeight: 700,
                cursor: canSubmit ? 'pointer' : 'not-allowed',
                fontFamily: 'inherit',
                transition: 'background 0.18s ease, box-shadow 0.18s ease',
                boxShadow: canSubmit ? '0 4px 16px rgba(10,132,255,0.35)' : 'none',
                marginTop: 'auto',
              }}
            >
              Submit Classification
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
}
