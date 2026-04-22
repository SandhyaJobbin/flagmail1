import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { useTimer } from '../hooks/useTimer.js';
import TimerBar from './TimerBar.jsx';
import EmailCard from './EmailCard.jsx';
import ClueSystem from './ClueSystem.jsx';
import Classifier from './Classifier.jsx';
import { ROUND_DURATION_SECONDS } from '../config/game.js';

const surface = {
  background: 'rgba(255,255,255,0.74)',
  backdropFilter: 'blur(30px) saturate(165%)',
  WebkitBackdropFilter: 'blur(30px) saturate(165%)',
  border: '1px solid rgba(255,255,255,0.84)',
  boxShadow: '0 24px 80px rgba(32, 52, 89, 0.11), 0 8px 24px rgba(32, 52, 89, 0.06)',
};

const ZONE_META = {
  1: { name: 'The Inbox', accent: '#0A84FF', tone: 'Clean out the obvious noise.' },
  2: { name: 'The Queue', accent: '#30B0C7', tone: 'Trust the details, not the polish.' },
  3: { name: 'The Escalation', accent: '#FF7A1A', tone: 'The final calls need specialist eyes.' },
};

export default function GameRound({
  email,
  zone,
  emailInZone,
  emailsInZone,
  totalScore,
  round,
  onRevealClue,
  onSelectL1,
  onSelectL2,
  onSubmit,
}) {
  const roundRef = useRef(round);
  const scoreDisplayRef = useRef(null);
  const prevScoreRef = useRef(totalScore);
  const meta = ZONE_META[zone] || ZONE_META[1];

  useEffect(() => {
    roundRef.current = round;
  }, [round]);

  useEffect(() => {
    if (!scoreDisplayRef.current) return;
    const from = prevScoreRef.current;
    const to = totalScore;
    if (from === to) return;

    gsap.fromTo(
      { val: from },
      {
        val: to,
        duration: 0.45,
        ease: 'power2.out',
        onUpdate() {
          if (scoreDisplayRef.current) {
            scoreDisplayRef.current.textContent = Math.round(this.targets()[0].val);
          }
        },
      }
    );

    gsap.fromTo(
      scoreDisplayRef.current,
      { scale: 1.15, color: meta.accent },
      { scale: 1, color: '#111827', duration: 0.35, ease: 'back.out(2)' }
    );

    prevScoreRef.current = to;
  }, [meta.accent, totalScore]);

  function handleTimeout() {
    onSubmit(0, true);
  }

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
  const clueCount = Array.isArray(email?.clues) ? email.clues.length : 0;
  const cluesSeen = Array.isArray(round.cluesRevealed) ? round.cluesRevealed.length : 0;

  return (
    <div
      style={{
        height: '100dvh',
        padding: '18px clamp(12px, 2.5vw, 24px)',
        fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <style>{`
        @media (max-width: 1200px) {
          .game-round-main {
            grid-template-columns: minmax(0, 1fr) 360px !important;
          }
        }

        @media (max-width: 980px) {
          .game-round-main {
            grid-template-columns: 1fr !important;
            overflow: auto !important;
          }

          .game-round-email-wrap,
          .game-round-side {
            min-height: fit-content !important;
          }
        }
      `}</style>

      <div
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          background: [
            `radial-gradient(circle at 14% 18%, ${meta.accent}16, transparent 24%)`,
            'radial-gradient(circle at 82% 12%, rgba(255,255,255,0.62), transparent 20%)',
            'radial-gradient(circle at 48% 84%, rgba(17,24,39,0.06), transparent 28%)',
          ].join(','),
        }}
      />

      <div
        style={{
          maxWidth: 1400,
          margin: '0 auto',
          display: 'grid',
          gap: 14,
          position: 'relative',
          height: '100%',
          minHeight: 0,
        }}
      >
        <div
          style={{
            ...surface,
            borderRadius: 30,
            padding: '16px 18px',
          }}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: 14,
              alignItems: 'center',
            }}
          >
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'auto minmax(0, 1fr)',
                gap: 14,
                alignItems: 'center',
              }}
            >
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

              <div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                    flexWrap: 'wrap',
                    marginBottom: 4,
                  }}
                >
                  <span
                    style={{
                      fontSize: 28,
                      fontWeight: 700,
                      letterSpacing: '-0.04em',
                      color: '#111827',
                    }}
                  >
                    {meta.name}
                  </span>
                  <span
                    style={{
                      padding: '4px 10px',
                      borderRadius: 999,
                      background: `${meta.accent}12`,
                      color: meta.accent,
                      fontSize: 11,
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      letterSpacing: '0.08em',
                    }}
                  >
                    Email {emailInZone} of {emailsInZone}
                  </span>
                </div>
              </div>
            </div>

            <div
              style={{
                padding: '12px 14px',
                borderRadius: 22,
                background: 'rgba(249,250,252,0.84)',
                border: '1px solid rgba(13,26,51,0.06)',
              }}
            >
              <div style={{ display: 'grid', gap: 10 }}>
                <TimerBar timeLeft={timeLeft} phase={phase} progress={progress} />
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    gap: 12,
                    alignItems: 'center',
                  }}
                >
                  <span
                    className={phase === 'red' ? 'anim-timerPulse' : ''}
                    style={{
                      minWidth: 48,
                      textAlign: 'right',
                      fontSize: 22,
                      lineHeight: 1,
                      fontWeight: 700,
                      color: phaseColor,
                    }}
                  >
                    {timeLeft}s
                  </span>
                </div>
              </div>
            </div>

            <div
              style={{
                justifySelf: 'stretch',
                padding: '14px 16px',
                borderRadius: 22,
                background: 'linear-gradient(180deg, rgba(255,255,255,0.94) 0%, rgba(246,249,253,0.96) 100%)',
                border: '1px solid rgba(13,26,51,0.06)',
              }}
            >
              <div
                ref={scoreDisplayRef}
                style={{
                  fontSize: 34,
                  lineHeight: 1,
                  fontWeight: 700,
                  letterSpacing: '-0.05em',
                  color: '#111827',
                }}
              >
                {totalScore}
              </div>
            </div>
          </div>
        </div>

        <div
          className="game-round-main"
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1.08fr) minmax(340px, 0.92fr)',
            gap: 14,
            alignItems: 'stretch',
            flex: 1,
            minHeight: 0,
          }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              className="game-round-email-wrap"
              key={email?.id}
              initial={{ opacity: 0, x: -14 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 12 }}
              transition={{ duration: 0.28, ease: 'easeOut' }}
              style={{
                ...surface,
                borderRadius: 30,
                padding: 16,
                minHeight: 0,
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
              }}
            >
              <div style={{ minHeight: 0, overflow: 'auto', paddingRight: 4 }}>
                <EmailCard email={email} giveawayHighlight={false} />
              </div>
            </motion.div>
          </AnimatePresence>

          <div
            className="game-round-side"
            style={{
              ...surface,
              borderRadius: 28,
              padding: '18px',
              display: 'grid',
              gap: 18,
              alignContent: 'start',
              minHeight: 0,
              overflow: 'auto',
            }}
          >
            {/* A+B — Classification (Primary + Secondary) */}
            <div>
              <Classifier
                selectedL1={round.selectedL1}
                selectedL2={round.selectedL2}
                onSelectL1={onSelectL1}
                onSelectL2={onSelectL2}
                disabled={round.submitted}
              />
            </div>

            {/* C — Hints */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8, marginBottom: 10 }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: 'rgba(17,24,39,0.52)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                  Hints
                </div>
                <div style={{
                  padding: '3px 10px',
                  borderRadius: 999,
                  background: 'rgba(255,184,0,0.12)',
                  color: '#A16207',
                  fontSize: 11,
                  fontWeight: 700,
                }}>
                  {cluesSeen}/{clueCount}
                </div>
              </div>
              <div style={{ borderRadius: 16, background: 'rgba(249,250,252,0.88)', border: '1px solid rgba(13,26,51,0.06)', padding: '12px 12px 8px', overflow: 'auto' }}>
                <ClueSystem
                  clues={email?.clues || []}
                  revealed={round.cluesRevealed}
                  onReveal={onRevealClue}
                  disabled={round.submitted}
                />
              </div>
              <div style={{ fontSize: 11, color: 'rgba(17,24,39,0.48)', marginTop: 6 }}>
                Using hints reduces your score
              </div>
            </div>

            {/* D — Submit */}
            <div>
              <div style={{ fontSize: 13, color: 'rgba(17,24,39,0.52)', marginBottom: 10 }}>
                {round.selectedL1 ? `${round.selectedL1} selected` : 'No category selected'}
              </div>
              <motion.button
                onClick={handleSubmit}
                disabled={!canSubmit}
                whileHover={canSubmit ? { scale: 1.015 } : {}}
                whileTap={canSubmit ? { scale: 0.985 } : {}}
                style={{
                  width: '100%',
                  padding: '16px 18px',
                  borderRadius: 18,
                  border: '1px solid rgba(255,255,255,0.45)',
                  background: canSubmit
                    ? `linear-gradient(135deg, ${meta.accent} 0%, ${zone === 3 ? '#E56A00' : '#0066CC'} 100%)`
                    : 'rgba(17,24,39,0.08)',
                  color: canSubmit ? '#fff' : 'rgba(17,24,39,0.36)',
                  fontSize: 15,
                  fontWeight: 700,
                  letterSpacing: '0.01em',
                  boxShadow: canSubmit ? `0 18px 30px ${meta.accent}2E` : 'none',
                  cursor: canSubmit ? 'pointer' : 'default',
                }}
              >
                Submit
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
