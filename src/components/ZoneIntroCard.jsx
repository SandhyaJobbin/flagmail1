import { motion } from 'framer-motion';
import { ZONE_CONFIG, MAX_POINTS_PER_ZONE } from '../data/emails.js';

const glass = {
  background: 'rgba(255,255,255,0.65)',
  backdropFilter: 'blur(24px) saturate(180%)',
  WebkitBackdropFilter: 'blur(24px) saturate(180%)',
  border: '1px solid rgba(255,255,255,0.8)',
  borderRadius: 20,
  boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
};

const BRAND = '#0A84FF';

export default function ZoneIntroCard({ zone, onStart, earlyUnlocked }) {
  const meta = ZONE_CONFIG[zone];
  const zones = [1, 2, 3];

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '24px 16px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
    }}>
      <motion.div
        initial={{ opacity: 0, y: 28, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 24 }}
        style={{ width: '100%', maxWidth: 400 }}
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08, duration: 0.3, ease: 'easeOut' }}
          style={{ textAlign: 'center', marginBottom: 24 }}
        >
          <div style={{ fontSize: 11, fontWeight: 600, color: 'rgba(60,60,67,0.5)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 10 }}>
            Veridian Security
          </div>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: 'rgba(10,132,255,0.1)', border: `1.5px solid ${BRAND}`,
            borderRadius: 20, padding: '6px 16px',
          }}>
            <span style={{ fontSize: 16 }}>{meta.icon}</span>
            <span style={{ fontSize: 13, fontWeight: 700, color: BRAND, letterSpacing: '0.06em' }}>
              {meta.difficulty.toUpperCase()} · {meta.emails} EMAILS
            </span>
          </div>
        </motion.div>

        {/* Early unlock banner */}
        {earlyUnlocked && zone > 1 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', stiffness: 320, damping: 26, delay: 0.1 }}
            style={{ ...glass, padding: '12px 20px', marginBottom: 16, borderLeft: '3px solid #FFD60A', display: 'flex', alignItems: 'center', gap: 10 }}
          >
            <motion.span animate={{ rotate: [0, -12, 12, -8, 8, 0] }} transition={{ delay: 0.4, duration: 0.55 }} style={{ fontSize: 20, display: 'inline-block' }}>⚡</motion.span>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#B8860B' }}>EARLY UNLOCK</div>
              <div style={{ fontSize: 12, color: '#636366' }}>3 consecutive perfect scores unlocked this zone early!</div>
            </div>
          </motion.div>
        )}

        {/* 3-column zone grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, marginBottom: 14 }}>
          {zones.map((z, idx) => {
            const zData = ZONE_CONFIG[z];
            const isCompleted = z < zone;
            const isLocked    = z > zone;
            return (
              <motion.div
                key={z}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: isLocked ? 0.55 : isCompleted ? 0.80 : 1, y: 0 }}
                transition={{ delay: 0.12 + idx * 0.07, duration: 0.3, ease: 'easeOut' }}
                style={{
                  ...glass, borderRadius: 14, padding: '16px 10px 14px', textAlign: 'center',
                  borderTop: `3px solid ${isLocked ? 'rgba(0,0,0,0.10)' : BRAND}`,
                  position: 'relative', overflow: 'hidden',
                }}
              >
                <div style={{
                  width: 44, height: 44, borderRadius: 14,
                  background: isLocked ? 'rgba(0,0,0,0.05)' : `${BRAND}18`,
                  border: `1.5px solid ${isLocked ? 'rgba(0,0,0,0.08)' : `${BRAND}40`}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 10px',
                }}>
                  {isLocked ? (
                    <svg width="18" height="18" viewBox="0 0 16 16" fill="none">
                      <rect x="3" y="7" width="10" height="8" rx="2" fill="rgba(60,60,67,0.30)"/>
                      <path d="M5 7V5a3 3 0 0 1 6 0v2" stroke="rgba(60,60,67,0.30)" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                  ) : isCompleted ? (
                    <svg width="18" height="18" viewBox="0 0 16 16" fill="none">
                      <path d="M4 8.5L7 11.5L12 5.5" stroke={BRAND} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  ) : (
                    <span style={{ fontSize: 20 }}>{zData.icon}</span>
                  )}
                </div>
                <div style={{ fontSize: 11, fontWeight: 700, color: isLocked ? 'rgba(60,60,67,0.4)' : '#1C1C1E', lineHeight: 1.3, marginBottom: 6 }}>
                  {zData.name}
                </div>
                <div style={{
                  display: 'inline-block', fontSize: 9, fontWeight: 700, letterSpacing: '0.05em',
                  padding: '2px 7px', borderRadius: 6,
                  color: isLocked ? 'rgba(60,60,67,0.4)' : BRAND,
                  background: isLocked ? 'rgba(0,0,0,0.06)' : `${BRAND}18`,
                }}>
                  {isLocked ? 'LOCKED' : isCompleted ? 'DONE' : 'UP NEXT'}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Mission briefing card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.32, type: 'spring', stiffness: 240, damping: 22 }}
          style={{ ...glass, padding: '28px 28px 24px', textAlign: 'center' }}
        >
          <motion.h1
            initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.42, duration: 0.3 }}
            style={{ fontSize: 26, fontWeight: 800, color: '#1C1C1E', margin: '0 0 6px', letterSpacing: '-0.02em' }}
          >
            {meta.name}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.35 }}
            style={{ fontSize: 14, color: '#636366', margin: '0 0 24px', fontStyle: 'italic', lineHeight: 1.5 }}
          >
            {meta.mission}
          </motion.p>

          <div style={{ display: 'flex', gap: 12, marginBottom: 24 }}>
            {[
              { label: 'Emails', value: meta.emails },
              { label: 'Max Points', value: MAX_POINTS_PER_ZONE },
              { label: 'Time / Email', value: '45s' },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.52 + i * 0.07, duration: 0.3, ease: 'easeOut' }}
                style={{ flex: 1, background: 'rgba(0,0,0,0.04)', borderRadius: 12, padding: '14px 8px' }}
              >
                <div style={{ fontSize: 20, fontWeight: 700, color: '#1C1C1E' }}>{stat.value}</div>
                <div style={{ fontSize: 11, color: '#636366', marginTop: 2 }}>{stat.label}</div>
              </motion.div>
            ))}
          </div>

          <motion.button
            onClick={onStart}
            whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
            initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65, duration: 0.3 }}
            style={{
              width: '100%', padding: '15px', borderRadius: 12, border: 'none',
              background: BRAND, color: '#fff', fontSize: 16, fontWeight: 700,
              cursor: 'pointer', fontFamily: 'inherit',
              boxShadow: '0 4px 16px rgba(10,132,255,0.35)',
            }}
          >
            Start {meta.name} →
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
}
