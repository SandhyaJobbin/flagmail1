import { useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Lottie from 'lottie-react';
import RankCard from './RankCard.jsx';
import BadgeCollection from './BadgeCollection.jsx';
import CompetencySummary from './CompetencySummary.jsx';
import { getProgressTitle } from '../utils/competency.js';
import CELEBRATION from '../assets/animation/Celebration Update Color.json';

const glass = {
  background: 'rgba(255,255,255,0.65)',
  backdropFilter: 'blur(24px) saturate(180%)',
  WebkitBackdropFilter: 'blur(24px) saturate(180%)',
  border: '1px solid rgba(255,255,255,0.8)',
  borderRadius: 20,
  boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
};

const MAX_SCORE = 100; // 40 + 40 + 20

// Staggered section entry variant
const sectionVariant = {
  hidden: { opacity: 0, y: 18 },
  visible: (delay) => ({
    opacity: 1,
    y: 0,
    transition: { delay, type: 'spring', stiffness: 240, damping: 22 },
  }),
};

export default function ResultsScreen({
  player,
  finalScore,
  zoneScores,
  categoryCorrect,
  earned,
  perEmail,
  onLeaderboard,
  onPlayAgain,
}) {
  const title = getProgressTitle(finalScore);
  const isPerfect = finalScore >= MAX_SCORE;

  const zone1Emails = perEmail.filter(r => r.zone === 1);
  const zone2Emails = perEmail.filter(r => r.zone === 2);
  const zone3Emails = perEmail.filter(r => r.zone === 3);

  const zoneAcc = (emails) =>
    emails.length > 0
      ? Math.round((emails.filter(r => r.l1Correct).length / emails.length) * 100)
      : 0;

  return (
    <div style={{
      minHeight: '100vh',
      padding: '24px 16px 40px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
      maxWidth: 640,
      margin: '0 auto',
      boxSizing: 'border-box',
      position: 'relative',
    }}>

      {/* Lottie celebration overlay — perfect score only */}
      <AnimatePresence>
        {isPerfect && (
          <motion.div
            key="celebration"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            style={{
              position: 'fixed',
              inset: 0,
              pointerEvents: 'none',
              zIndex: 50,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Lottie
              animationData={CELEBRATION}
              loop={false}
              autoplay
              style={{ width: '100%', maxWidth: 640, height: 'auto' }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
        style={{ textAlign: 'center', marginBottom: 24 }}
      >
        <div style={{
          fontFamily: 'ui-monospace, "SF Mono", monospace',
          fontSize: 11,
          fontWeight: 600,
          color: '#AEAEB2',
          letterSpacing: '0.12em',
          marginBottom: 6,
        }}>
          MISSION COMPLETE
        </div>
        <h1 style={{ fontSize: 32, fontWeight: 800, color: '#1C1C1E', margin: 0, letterSpacing: '-0.02em' }}>
          Analyst Report
        </h1>
      </motion.div>

      {/* Rank card */}
      <motion.div
        custom={0.05}
        variants={sectionVariant}
        initial="hidden"
        animate="visible"
        style={{ marginBottom: 16 }}
      >
        <RankCard player={player} finalScore={finalScore} badgeCount={earned.length} />
      </motion.div>

      {/* Zone breakdown */}
      <motion.div
        custom={0.14}
        variants={sectionVariant}
        initial="hidden"
        animate="visible"
        style={{ ...glass, padding: 20, marginBottom: 16 }}
      >
        <div style={{ fontSize: 11, fontWeight: 600, color: '#636366', letterSpacing: '0.08em', marginBottom: 12 }}>
          ZONE BREAKDOWN
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          {[
            { zone: 1, score: zoneScores[1], max: 40, acc: zoneAcc(zone1Emails) },
            { zone: 2, score: zoneScores[2], max: 40, acc: zoneAcc(zone2Emails) },
            { zone: 3, score: zoneScores[3], max: 20, acc: zoneAcc(zone3Emails) },
          ].map((z, i) => (
            <motion.div
              key={z.zone}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.08, duration: 0.3, ease: 'easeOut' }}
              style={{
                flex: 1,
                background: 'rgba(0,0,0,0.04)',
                borderRadius: 12,
                padding: '14px 10px',
                textAlign: 'center',
                borderTop: '3px solid #0A84FF',
              }}
            >
              <div style={{ fontSize: 11, fontWeight: 600, color: '#0A84FF', marginBottom: 4 }}>
                ZONE {z.zone}
              </div>
              <div style={{ fontSize: 20, fontWeight: 800, color: '#1C1C1E' }}>
                {z.score}/{z.max}
              </div>
              <div style={{ fontSize: 11, color: '#636366' }}>{z.acc}% accuracy</div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Competency summary */}
      <motion.div
        custom={0.24}
        variants={sectionVariant}
        initial="hidden"
        animate="visible"
        style={{ ...glass, padding: 20, marginBottom: 16 }}
      >
        <CompetencySummary categoryCorrect={categoryCorrect} />
      </motion.div>

      {/* Badge collection */}
      <motion.div
        custom={0.33}
        variants={sectionVariant}
        initial="hidden"
        animate="visible"
        style={{ ...glass, padding: 20, marginBottom: 24 }}
      >
        <BadgeCollection earned={earned} />
      </motion.div>

      {/* CTA row */}
      <motion.div
        custom={0.42}
        variants={sectionVariant}
        initial="hidden"
        animate="visible"
        style={{ display: 'flex', gap: 12 }}
      >
        <motion.button
          onClick={onLeaderboard}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          style={{
            flex: 1,
            padding: '14px',
            borderRadius: 12,
            border: '1.5px solid rgba(0,0,0,0.1)',
            background: 'rgba(255,255,255,0.7)',
            color: '#1C1C1E',
            fontSize: 14,
            fontWeight: 600,
            cursor: 'pointer',
            fontFamily: 'inherit',
          }}
        >
          View Leaderboard
        </motion.button>
        <motion.button
          onClick={onPlayAgain}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          style={{
            flex: 2,
            padding: '14px',
            borderRadius: 12,
            border: 'none',
            background: '#0A84FF',
            color: '#fff',
            fontSize: 14,
            fontWeight: 700,
            cursor: 'pointer',
            fontFamily: 'inherit',
            boxShadow: '0 4px 16px rgba(10,132,255,0.32)',
          }}
        >
          Play Again →
        </motion.button>
      </motion.div>
    </div>
  );
}
