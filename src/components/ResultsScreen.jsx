import { motion, AnimatePresence } from 'framer-motion';
import Lottie from 'lottie-react';
import RankCard from './RankCard.jsx';
import BadgeCollection from './BadgeCollection.jsx';
import CompetencySummary from './CompetencySummary.jsx';
import { getProgressTitle } from '../utils/competency.js';
import CELEBRATION from '../assets/animation/Celebration Update Color.json';

const surface = {
  background: 'rgba(255,255,255,0.76)',
  backdropFilter: 'blur(22px) saturate(150%)',
  WebkitBackdropFilter: 'blur(22px) saturate(150%)',
  border: '1px solid rgba(255,255,255,0.82)',
  boxShadow: '0 24px 80px rgba(32, 52, 89, 0.10), 0 8px 24px rgba(32, 52, 89, 0.05)',
};

const MAX_SCORE = 75;

const zoneMeta = {
  1: { label: 'Zone 1', name: 'Inbox', accent: '#0A84FF' },
  2: { label: 'Zone 2', name: 'Queue', accent: '#30B0C7' },
  3: { label: 'Zone 3', name: 'Escalation', accent: '#FF7A1A' },
};

function titleTone(score) {
  if (score >= 80) return { accent: '#0A84FF', bg: 'rgba(10,132,255,0.10)' };
  if (score >= 50) return { accent: '#FF9500', bg: 'rgba(255,149,0,0.12)' };
  return { accent: '#34C759', bg: 'rgba(52,199,89,0.10)' };
}

export default function ResultsScreen({
  player,
  finalScore,
  displayScore,
  zoneScores,
  categoryCorrect,
  earned,
  perEmail,
  onLeaderboard,
  onPlayAgain,
}) {
  const normalized = displayScore ?? Math.round((finalScore / MAX_SCORE) * 100);
  const title = getProgressTitle(normalized);
  const perfect = normalized >= 100;
  const tone = titleTone(normalized);

  const zoneAcc = (zone) => {
    const emails = perEmail.filter((record) => record.zone === zone);
    return emails.length ? Math.round((emails.filter((record) => record.l1Correct).length / emails.length) * 100) : 0;
  };

  const zones = [1, 2, 3].map((zone) => ({
    ...zoneMeta[zone],
    score: zoneScores[zone],
    max: 25,
    accuracy: zoneAcc(zone),
  }));

  return (
    <div
      style={{
        minHeight: '100dvh',
        padding: 'clamp(18px, 2.8vw, 28px)',
        fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
        position: 'relative',
      }}
    >
      <style>{`
        @media (max-width: 960px) {
          .results-top-grid,
          .results-mid-grid,
          .results-actions {
            grid-template-columns: 1fr !important;
          }
        }

        @media (max-width: 720px) {
          .results-zone-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>

      <AnimatePresence>
        {perfect && (
          <motion.div
            key="celebration"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 40,
              pointerEvents: 'none',
              display: 'grid',
              placeItems: 'center',
            }}
          >
            <Lottie animationData={CELEBRATION} loop={false} autoplay style={{ width: '100%', maxWidth: 640 }} />
          </motion.div>
        )}
      </AnimatePresence>

      <div
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          background: [
            'radial-gradient(circle at 12% 14%, rgba(10,132,255,0.12), transparent 24%)',
            'radial-gradient(circle at 88% 12%, rgba(255,149,0,0.10), transparent 20%)',
            'radial-gradient(circle at 50% 84%, rgba(52,199,89,0.08), transparent 24%)',
          ].join(','),
        }}
      />

      <div style={{ maxWidth: 1160, margin: '0 auto', position: 'relative', zIndex: 1, display: 'grid', gap: 16 }}>
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.28, ease: 'easeOut' }}
          style={{
            ...surface,
            borderRadius: 34,
            padding: 'clamp(22px, 3vw, 30px)',
            overflow: 'hidden',
          }}
        >
          <div className="results-top-grid" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.08fr) minmax(260px, 0.92fr)', gap: 18, alignItems: 'start' }}>
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(17,24,39,0.46)', marginBottom: 8 }}>
                Assessment complete
              </div>
              <h1 style={{ margin: 0, fontSize: 'clamp(36px, 5vw, 58px)', lineHeight: 0.94, letterSpacing: '-0.06em', color: '#111827' }}>
                {player.name}&apos;s final judgment score.
              </h1>
              <p style={{ margin: '14px 0 0', fontSize: 16, lineHeight: 1.6, color: 'rgba(17,24,39,0.64)', maxWidth: 560 }}>
                Your performance is normalized to 100 and reflects how consistently you identified the correct threat category under pressure.
              </p>
            </div>

            <div
              style={{
                borderRadius: 28,
                padding: '20px',
                background: `linear-gradient(180deg, ${tone.bg} 0%, rgba(255,255,255,0.92) 100%)`,
                border: `1px solid ${tone.accent}20`,
                display: 'grid',
                gap: 10,
                alignContent: 'start',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, color: '#111827' }}>
                <span style={{ fontSize: 'clamp(64px, 9vw, 92px)', lineHeight: 0.9, fontWeight: 800, letterSpacing: '-0.07em' }}>
                  {normalized}
                </span>
                <span style={{ fontSize: 26, fontWeight: 600, color: 'rgba(17,24,39,0.30)' }}>/100</span>
              </div>
              <div
                style={{
                  display: 'inline-flex',
                  justifySelf: 'start',
                  padding: '8px 14px',
                  borderRadius: 999,
                  background: tone.bg,
                  color: tone.accent,
                  fontSize: 12,
                  fontWeight: 700,
                  letterSpacing: '0.10em',
                  textTransform: 'uppercase',
                }}
              >
                {title}
              </div>
              <div style={{ fontSize: 14, lineHeight: 1.55, color: 'rgba(17,24,39,0.62)' }}>
                {earned.length} badge{earned.length !== 1 ? 's' : ''} earned across the full assessment.
              </div>
            </div>
          </div>
        </motion.div>

        <div className="results-zone-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 12 }}>
          {zones.map((zone, index) => (
            <motion.div
              key={zone.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08 + index * 0.05, duration: 0.24, ease: 'easeOut' }}
              style={{
                ...surface,
                borderRadius: 26,
                padding: 18,
                display: 'grid',
                gap: 8,
              }}
            >
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: zone.accent }}>
                {zone.label}
              </div>
              <div style={{ fontSize: 24, lineHeight: 1, fontWeight: 700, letterSpacing: '-0.04em', color: '#111827' }}>{zone.name}</div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
                <span style={{ fontSize: 34, lineHeight: 1, fontWeight: 800, letterSpacing: '-0.05em', color: '#111827' }}>{zone.score}</span>
                <span style={{ fontSize: 16, color: 'rgba(17,24,39,0.34)' }}>/ {zone.max}</span>
              </div>
              <div style={{ fontSize: 13, color: 'rgba(17,24,39,0.58)' }}>{zone.accuracy}% category accuracy</div>
            </motion.div>
          ))}
        </div>

        <div className="results-mid-grid" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 0.95fr) minmax(0, 1.05fr)', gap: 16 }}>
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.16, duration: 0.26, ease: 'easeOut' }}
          >
            <RankCard player={player} finalScore={normalized} badgeCount={earned.length} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.26, ease: 'easeOut' }}
            style={{ ...surface, borderRadius: 28, padding: 20 }}
          >
            <CompetencySummary categoryCorrect={categoryCorrect} />
          </motion.div>
        </div>

        {earned.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.24, duration: 0.26, ease: 'easeOut' }}
            style={{ ...surface, borderRadius: 28, padding: 20 }}
          >
            <BadgeCollection earned={earned} />
          </motion.div>
        )}

        <div className="results-actions" style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 12 }}>
          <motion.button
            onClick={onLeaderboard}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            style={{
              padding: '16px 18px',
              borderRadius: 18,
              border: '1px solid rgba(10,132,255,0.24)',
              background: 'linear-gradient(135deg, #0A84FF 0%, #0066CC 100%)',
              color: '#fff',
              fontSize: 15,
              fontWeight: 700,
              boxShadow: '0 18px 30px rgba(10,132,255,0.24)',
            }}
          >
            View leaderboard
          </motion.button>

          <motion.button
            onClick={onPlayAgain}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            style={{
              padding: '16px 18px',
              borderRadius: 18,
              border: '1px solid rgba(13,26,51,0.08)',
              background: 'rgba(255,255,255,0.82)',
              color: '#111827',
              fontSize: 15,
              fontWeight: 600,
            }}
          >
            Retake assessment
          </motion.button>
        </div>
      </div>
    </div>
  );
}
