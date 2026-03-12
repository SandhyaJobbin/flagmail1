import { useEffect, useRef } from 'react';
import { useTimer } from '../hooks/useTimer.js';
import TimerBar from './TimerBar.jsx';
import EmailCard from './EmailCard.jsx';
import ClueSystem from './ClueSystem.jsx';
import Classifier from './Classifier.jsx';

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
  useEffect(() => { roundRef.current = round; }, [round]);

  function handleTimeout() {
    onSubmit(0, true);
  }

  const { timeLeft, phase, progress, start, stop } = useTimer(45, handleTimeout);

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

  return (
    <div style={{
      height: '100vh',
      display: 'flex',
      alignItems: 'stretch',
      justifyContent: 'center',
      padding: '20px 8vw',
      fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
      boxSizing: 'border-box',
    }}>
      {/* Desktop app card */}
      <div style={{
        ...glassCard,
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}>

        {/* ── Card header ── */}
        <div style={{
          padding: '16px 28px 0',
          borderBottom: '1px solid rgba(255,255,255,0.55)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
            {/* Brand */}
            <span style={{ fontSize: 17, fontWeight: 800, color: '#1C1C1E', letterSpacing: '-0.02em' }}>
              Flagmail
            </span>

            {/* Zone progress */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              {Array.from({ length: emailsInZone }).map((_, i) => (
                <div key={i} style={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  background: i < emailInZone - 1
                    ? '#34C759'
                    : i === emailInZone - 1
                      ? '#0A84FF'
                      : 'rgba(0,0,0,0.12)',
                  transition: 'background 0.3s',
                }} />
              ))}
              <span style={{ fontSize: 12, fontWeight: 600, color: '#636366', marginLeft: 4 }}>
                Zone {zone} · {emailInZone}/{emailsInZone}
              </span>
            </div>

            {/* Score */}
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: 10, color: '#AEAEB2', fontWeight: 600, letterSpacing: '0.06em' }}>SCORE</div>
              <div style={{ fontSize: 20, fontWeight: 800, color: '#1C1C1E', lineHeight: 1 }}>{totalScore}</div>
            </div>
          </div>

          {/* Timer */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, paddingBottom: 14 }}>
            <TimerBar timeLeft={timeLeft} phase={phase} progress={progress} />
            <span style={{
              fontSize: 13,
              fontWeight: 700,
              color: phaseColor,
              minWidth: 30,
              textAlign: 'right',
              transition: 'color 0.3s',
            }}>
              {timeLeft}s
            </span>
          </div>
        </div>

        {/* ── Two-column body ── */}
        <div style={{ display: 'flex', flex: 1, minHeight: 0 }}>

          {/* Left — Email */}
          <div style={{
            flex: '0 0 58%',
            padding: '20px 24px 24px',
            overflowY: 'auto',
          }}>
            <EmailCard email={email} giveawayHighlight={false} />
          </div>

          {/* Divider */}
          <div style={glassDivider} />

          {/* Right — Controls */}
          <div style={{
            flex: 1,
            padding: '20px 24px 24px',
            display: 'flex',
            flexDirection: 'column',
            gap: 16,
            overflowY: 'auto',
          }}>

            {/* Hints section */}
            <div style={{
              background: '#ffffff',
              borderRadius: 16,
              padding: '14px 16px',
              border: '1px solid rgba(0,0,0,0.06)',
              boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
            }}>
              <div style={{
                fontSize: 10,
                fontWeight: 700,
                color: 'rgba(60,60,67,0.5)',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                marginBottom: 10,
              }}>
                Analyst Hints
              </div>
              <ClueSystem
                clues={email?.clues || []}
                revealed={round.cluesRevealed}
                onReveal={onRevealClue}
                disabled={round.submitted}
              />
            </div>

            {/* Classifier section */}
            <div style={{
              background: '#ffffff',
              borderRadius: 16,
              padding: '16px',
              border: '1px solid rgba(0,0,0,0.06)',
              boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
            }}>
              <Classifier
                selectedL1={round.selectedL1}
                selectedL2={round.selectedL2}
                onSelectL1={onSelectL1}
                onSelectL2={onSelectL2}
                disabled={round.submitted}
              />
            </div>

            {/* Submit */}
            <button
              onClick={handleSubmit}
              disabled={!canSubmit}
              style={{
                width: '100%',
                padding: '14px',
                borderRadius: 14,
                border: 'none',
                background: canSubmit
                  ? 'linear-gradient(135deg, #0A84FF 0%, #007AFF 100%)'
                  : 'rgba(0,0,0,0.07)',
                color: canSubmit ? '#fff' : '#AEAEB2',
                fontSize: 15,
                fontWeight: 700,
                cursor: canSubmit ? 'pointer' : 'not-allowed',
                fontFamily: 'inherit',
                transition: 'all 0.18s ease',
                boxShadow: canSubmit ? '0 4px 16px rgba(10,132,255,0.35)' : 'none',
                marginTop: 'auto',
              }}
              onMouseEnter={e => canSubmit && (e.currentTarget.style.opacity = '0.88')}
              onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
            >
              Submit Classification
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
