import { motion } from 'framer-motion';

const glass = {
  background: 'rgba(255,255,255,0.74)',
  backdropFilter: 'blur(30px) saturate(165%)',
  WebkitBackdropFilter: 'blur(30px) saturate(165%)',
  border: '1px solid rgba(255,255,255,0.84)',
  boxShadow: '0 24px 80px rgba(32, 52, 89, 0.11), 0 8px 24px rgba(32, 52, 89, 0.06)',
};

const ZONES = [
  {
    zone: 1,
    title: 'The Inbox',
    subtitle: 'Section 1 of 3',
    emails: 5,
    icon: '✦',
    accent: '#0A84FF',
    mission: 'Spot the loud red flags fast and build your rhythm.',
    contextCopy: 'Start with the obvious ones and find your footing.',
    signals: ['Urgent asks', 'Mismatched senders', 'Low-trust promotions'],
  },
  {
    zone: 2,
    title: 'The Queue',
    subtitle: 'Section 2 of 3',
    emails: 5,
    icon: '◌',
    accent: '#30B0C7',
    mission: 'The copy gets cleaner here. Trust the details, not the polish.',
    contextCopy: 'Polish can hide a lot. Read slower.',
    signals: ['Lookalike domains', 'Workflow mismatches', 'Suspicious requests'],
  },
  {
    zone: 3,
    title: 'The Escalation',
    subtitle: 'Section 3 of 3',
    emails: 5,
    icon: '◎',
    accent: '#FF7A1A',
    mission: 'One subtle inconsistency is usually the whole story.',
    contextCopy: 'High stakes. One detail changes everything.',
    signals: ['Subtle social engineering', 'Operational realism', 'One decisive clue'],
  },
];

export default function ZoneIntroCard({ zone, onStart, earlyUnlocked }) {
  const meta = ZONES.find((item) => item.zone === zone);

  return (
    <div
      style={{
        height: '100dvh',
        padding: 'clamp(18px, 3vw, 30px)',
        fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <style>{`
        @media (max-width: 900px) {
          .zone-intro-shell {
            grid-template-columns: 1fr !important;
            overflow: auto !important;
          }
        }

        @media (max-width: 640px) {
          .zone-intro-main,
          .zone-intro-side {
            padding: 22px !important;
          }

          .zone-intro-stats {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>

      <div
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          background: [
            `radial-gradient(circle at 14% 18%, ${meta.accent}18, transparent 24%)`,
            'radial-gradient(circle at 85% 14%, rgba(255,255,255,0.65), transparent 20%)',
            'radial-gradient(circle at 50% 82%, rgba(17,24,39,0.06), transparent 28%)',
          ].join(','),
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 200, damping: 24 }}
        className="zone-intro-shell"
        style={{
          width: '100%',
          maxWidth: 1120,
          height: '100%',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1.15fr) minmax(320px, 0.85fr)',
          gap: 20,
          alignItems: 'stretch',
          position: 'relative',
        }}
      >
        <motion.div
          className="zone-intro-main"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08, duration: 0.4 }}
          style={{
            ...glass,
            borderRadius: 34,
            padding: 'clamp(24px, 3vw, 34px)',
            display: 'grid',
            gap: 22,
            alignContent: 'space-between',
            minHeight: 0,
          }}
        >
          <div style={{ display: 'grid', gap: 16 }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 10,
                padding: '8px 14px',
                borderRadius: 999,
                background: `${meta.accent}12`,
                border: `1px solid ${meta.accent}24`,
                justifySelf: 'start',
              }}
            >
              <span
                style={{
                  fontSize: 12,
                  fontWeight: 700,
                  color: meta.accent,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                }}
              >
                Zone {meta.zone}
              </span>
              <span
                style={{
                  width: 1,
                  height: 14,
                  background: `${meta.accent}35`,
                }}
              />
              <span
                style={{
                  fontSize: 12,
                  fontWeight: 700,
                  color: 'rgba(17,24,39,0.56)',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                }}
              >
                {meta.subtitle}
              </span>
            </div>

            <div style={{ display: 'grid', gap: 12, maxWidth: 650 }}>
              <h1
                style={{
                  margin: 0,
                  fontSize: 'clamp(42px, 6vw, 76px)',
                  lineHeight: 0.95,
                  letterSpacing: '-0.055em',
                  color: '#111827',
                  fontWeight: 700,
                }}
              >
                {meta.title}
              </h1>

              <p
                style={{
                  margin: 0,
                  fontSize: 'clamp(16px, 1.8vw, 19px)',
                  lineHeight: 1.55,
                  color: 'rgba(17,24,39,0.66)',
                  maxWidth: 560,
                }}
              >
                {meta.mission}
              </p>
            </div>

            <div
              className="zone-intro-stats"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
                gap: 12,
                maxWidth: 620,
              }}
            >
              {[
                { label: 'Emails', value: 5 },
                { label: 'Max points', value: 25 },
                { label: 'Time each', value: '45s' },
              ].map((stat) => (
                <div
                  key={stat.label}
                  style={{
                    borderRadius: 22,
                    padding: '18px 16px',
                    background: 'rgba(255,255,255,0.82)',
                    border: '1px solid rgba(13,26,51,0.06)',
                  }}
                >
                  <div
                    style={{
                      fontSize: 28,
                      lineHeight: 1,
                      fontWeight: 700,
                      letterSpacing: '-0.05em',
                      color: '#111827',
                    }}
                  >
                    {stat.value}
                  </div>
                  <div
                    style={{
                      marginTop: 6,
                      fontSize: 11,
                      textTransform: 'uppercase',
                      letterSpacing: '0.10em',
                      fontWeight: 700,
                      color: 'rgba(17,24,39,0.50)',
                    }}
                  >
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: 'grid', gap: 10 }}>
            <div
              style={{
                fontSize: 11,
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                color: 'rgba(17,24,39,0.50)',
              }}
            >
              What to watch for
            </div>

            {meta.signals.map((signal, index) => (
              <div
                key={signal}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '32px minmax(0, 1fr)',
                  gap: 10,
                  alignItems: 'start',
                  borderRadius: 18,
                  padding: '12px 14px',
                  background: 'rgba(255,255,255,0.8)',
                  border: '1px solid rgba(13,26,51,0.06)',
                }}
              >
                <div
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 999,
                    background: `${meta.accent}12`,
                    color: meta.accent,
                    display: 'grid',
                    placeItems: 'center',
                    fontSize: 12,
                    fontWeight: 700,
                  }}
                >
                  {index + 1}
                </div>
                <div
                  style={{
                    fontSize: 14,
                    lineHeight: 1.5,
                    color: 'rgba(17,24,39,0.66)',
                  }}
                >
                  {signal}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="zone-intro-side"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.12, type: 'spring', stiffness: 190, damping: 24 }}
          style={{
            ...glass,
            borderRadius: 32,
            padding: 'clamp(24px, 3vw, 30px)',
            display: 'grid',
            gap: 18,
            alignContent: 'start',
            minHeight: 0,
          }}
        >
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: 22,
              background: `${meta.accent}18`,
              border: `1px solid ${meta.accent}24`,
              display: 'grid',
              placeItems: 'center',
              boxShadow: `inset 0 1px 0 rgba(255,255,255,0.75), 0 16px 32px ${meta.accent}18`,
            }}
          >
            <span
              style={{
                fontSize: 36,
                lineHeight: 1,
                color: meta.accent,
              }}
            >
              {meta.icon}
            </span>
          </div>

          <div style={{ display: 'grid', gap: 10 }}>
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
          </div>

          {earlyUnlocked && zone > 1 && (
            <div
              style={{
                padding: '10px 14px',
                borderRadius: 999,
                background: 'rgba(255,184,0,0.12)',
                border: '1px solid rgba(255,184,0,0.24)',
                color: '#A16207',
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                justifySelf: 'start',
              }}
            >
              Early unlock earned
            </div>
          )}

          <motion.button
            onClick={onStart}
            whileHover={{ scale: 1.015 }}
            whileTap={{ scale: 0.985 }}
            style={{
              width: '100%',
              marginTop: 'auto',
              padding: '16px 18px',
              borderRadius: 18,
              border: '1px solid rgba(255,255,255,0.5)',
              background: `linear-gradient(135deg, ${meta.accent} 0%, ${meta.zone === 3 ? '#E56A00' : '#0066CC'} 100%)`,
              boxShadow: `0 18px 32px ${meta.accent}2E`,
              color: '#fff',
              fontSize: 15,
              fontWeight: 700,
              letterSpacing: '0.01em',
            }}
          >
            Start Zone {meta.zone}
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
}
