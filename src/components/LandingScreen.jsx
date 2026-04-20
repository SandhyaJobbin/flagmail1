import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';

const glass = {
  background: 'rgba(255,255,255,0.60)',
  backdropFilter: 'blur(28px) saturate(180%)',
  WebkitBackdropFilter: 'blur(28px) saturate(180%)',
  border: '1px solid rgba(255,255,255,0.75)',
  boxShadow: '0 8px 32px rgba(0,0,0,0.08), 0 2px 8px rgba(0,0,0,0.04)',
};

const ZONE_CARDS = [
  { zone: 3, title: 'The Escalation', emails: 10, color: '#0A84FF', locked: true,  desc: 'Advanced threat analysis', top: 32, zIndex: 1, scale: 0.94, rot: 2   },
  { zone: 2, title: 'The Queue',      emails: 10, color: '#0A84FF', locked: true,  desc: 'Spot deceptive patterns',  top: 16, zIndex: 2, scale: 0.97, rot: 1   },
  { zone: 1, title: 'The Inbox',      emails: 10, color: '#0A84FF', locked: false, desc: 'Identify common threats',  top: 0,  zIndex: 3, scale: 1.0,  rot: 0   },
];

export default function LandingScreen({ onStart }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [focusedField, setFocusedField] = useState(null);

  // Refs for GSAP card fan
  const cardRefs = useRef([]);
  const isFannedRef = useRef(false);

  function handleSubmit(e) {
    e.preventDefault();
    if (!name.trim() || !email.trim()) {
      setError('Both fields are required to begin.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    setError('');
    onStart(name.trim(), email.trim());
  }

  function handleStackEnter() {
    if (isFannedRef.current) return;
    isFannedRef.current = true;
    // Fan cards upward: back card fans left, middle fans right, front stays
    const offsets = [
      { y: -24, rotation: -6, scale: 0.96 }, // zone 3 (back)
      { y: -16, rotation:  4, scale: 0.98 }, // zone 2 (middle)
      { y: -8,  rotation:  0, scale: 1.0  }, // zone 1 (front)
    ];
    cardRefs.current.forEach((el, i) => {
      if (!el) return;
      gsap.to(el, {
        y: offsets[i].y,
        rotation: offsets[i].rotation,
        scale: offsets[i].scale,
        duration: 0.4,
        ease: 'back.out(1.4)',
        delay: i * 0.04,
      });
    });
  }

  function handleStackLeave() {
    isFannedRef.current = false;
    cardRefs.current.forEach((el, i) => {
      if (!el) return;
      gsap.to(el, {
        y: 0,
        rotation: 0,
        scale: ZONE_CARDS[i].scale,
        duration: 0.35,
        ease: 'power2.out',
        delay: i * 0.03,
      });
    });
  }

  const inputStyle = (field) => ({
    width: '100%',
    padding: '11px 14px',
    borderRadius: 12,
    border: focusedField === field
      ? '1.5px solid rgba(0,113,227,0.8)'
      : '1.5px solid rgba(255,255,255,0.6)',
    background: focusedField === field
      ? 'rgba(255,255,255,0.75)'
      : 'rgba(255,255,255,0.50)',
    backdropFilter: 'blur(12px)',
    WebkitBackdropFilter: 'blur(12px)',
    fontSize: 15,
    color: '#1C1C1E',
    outline: 'none',
    boxSizing: 'border-box',
    fontFamily: 'inherit',
    transition: 'border-color 0.15s ease, background 0.15s ease',
    boxShadow: focusedField === field
      ? '0 0 0 3px rgba(0,113,227,0.15)'
      : 'none',
  });

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px 16px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Helvetica Neue", sans-serif',
    }}>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 260, damping: 24 }}
        style={{ width: '100%', maxWidth: 400 }}
      >

        {/* App identity */}
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          {/* Icon mark */}
          <motion.div
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 380, damping: 20, delay: 0.1 }}
            style={{
              width: 72,
              height: 72,
              margin: '0 auto 20px',
              borderRadius: 20,
              background: 'linear-gradient(145deg, rgba(26,115,232,0.85) 0%, rgba(0,87,184,0.90) 100%)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              border: '1px solid rgba(255,255,255,0.35)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 8px 24px rgba(0, 87, 184, 0.35), 0 2px 8px rgba(0,0,0,0.12)',
            }}
          >
            <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
              <path d="M18 4L30 10V20C30 26.627 24.627 32 18 32C11.373 32 6 26.627 6 20V10L18 4Z"
                fill="rgba(255,255,255,0.15)" stroke="white" strokeWidth="1.5"/>
              <path d="M13 18.5L16.5 22L23 15" stroke="white" strokeWidth="2"
                strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.18, duration: 0.35 }}
          >
            <div style={{
              fontSize: 11,
              fontWeight: 600,
              color: 'rgba(60,60,67,0.65)',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              marginBottom: 8,
            }}>
              Veridian Security
            </div>
            <h1 style={{
              fontSize: 44,
              fontWeight: 700,
              color: '#1C1C1E',
              margin: 0,
              letterSpacing: '-0.02em',
            }}>
              Flagmail
            </h1>
            <p style={{
              fontSize: 16,
              color: 'rgba(60,60,67,0.6)',
              margin: '8px 0 0',
              fontWeight: 400,
            }}>
              Read between the lines. Flag what doesn't belong.
            </p>
          </motion.div>
        </div>

        {/* Sign-in card */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.22, type: 'spring', stiffness: 240, damping: 22 }}
          style={{ ...glass, borderRadius: 20, padding: '32px 28px', marginBottom: 14 }}
        >
          <h2 style={{
            fontSize: 21,
            fontWeight: 600,
            color: '#1C1C1E',
            margin: '0 0 4px',
            textAlign: 'center',
          }}>
            Analyst Briefing
          </h2>
          <p style={{
            fontSize: 13,
            color: 'rgba(60,60,67,0.6)',
            margin: '0 0 24px',
            textAlign: 'center',
            lineHeight: 1.55,
          }}>
            You've been hired as an Email Security Analyst.<br/>
            Classify every email. Prove your instincts.
          </p>

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: 14 }}>
              <label style={{
                display: 'block',
                fontSize: 12,
                fontWeight: 600,
                color: '#1C1C1E',
                marginBottom: 6,
              }}>
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                onFocus={() => setFocusedField('name')}
                onBlur={() => setFocusedField(null)}
                placeholder="Your full name"
                style={inputStyle('name')}
              />
            </div>

            <div style={{ marginBottom: 8 }}>
              <label style={{
                display: 'block',
                fontSize: 12,
                fontWeight: 600,
                color: '#1C1C1E',
                marginBottom: 6,
              }}>
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                onFocus={() => setFocusedField('email')}
                onBlur={() => setFocusedField(null)}
                placeholder="your@email.com"
                style={inputStyle('email')}
              />
            </div>

            {error && (
              <p style={{
                fontSize: 12,
                color: '#FF3B30',
                margin: '8px 0 0',
                textAlign: 'center',
              }}>
                {error}
              </p>
            )}

            <button
              type="submit"
              style={{
                width: '100%',
                marginTop: 22,
                padding: '13px',
                borderRadius: 12,
                border: '1px solid rgba(0,113,227,0.5)',
                background: 'rgba(0,113,227,0.88)',
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
                color: '#fff',
                fontSize: 15,
                fontWeight: 600,
                cursor: 'pointer',
                fontFamily: 'inherit',
                letterSpacing: '0.01em',
                transition: 'background 0.15s ease',
                boxShadow: '0 4px 16px rgba(0,113,227,0.30)',
              }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(0,119,237,0.95)'}
              onMouseLeave={e => e.currentTarget.style.background = 'rgba(0,113,227,0.88)'}
            >
              Begin Briefing
            </button>
          </form>
        </motion.div>

        {/* Zone cards — stacked deck with GSAP fan hover */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.36, duration: 0.35 }}
          style={{ display: 'flex', flexDirection: 'column' }}
        >
          <div style={{
            fontSize: 10,
            fontWeight: 700,
            color: 'rgba(60,60,67,0.5)',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            textAlign: 'center',
            marginBottom: 12,
          }}>
            3 Zones · 30 Emails
          </div>

          {/* Stacked cards with GSAP fan hover */}
          <div
            style={{ position: 'relative', height: 108, cursor: 'default' }}
            onMouseEnter={handleStackEnter}
            onMouseLeave={handleStackLeave}
          >
            {ZONE_CARDS.map((z, i) => (
              <div
                key={z.zone}
                ref={el => cardRefs.current[i] = el}
                style={{
                  ...glass,
                  borderRadius: 14,
                  padding: '14px 16px',
                  borderLeft: `3px solid ${z.locked ? 'rgba(0,0,0,0.12)' : z.color}`,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 14,
                  position: 'absolute',
                  left: 0,
                  right: 0,
                  top: z.top,
                  zIndex: z.zIndex,
                  transform: `scale(${z.scale})`,
                  transformOrigin: 'top center',
                  opacity: z.locked ? 0.75 : 1,
                  overflow: 'hidden',
                  willChange: 'transform',
                }}
              >
                {/* Zone number badge */}
                <div style={{
                  width: 40,
                  height: 40,
                  borderRadius: 12,
                  background: z.locked ? 'rgba(0,0,0,0.06)' : `${z.color}18`,
                  border: `1.5px solid ${z.locked ? 'rgba(0,0,0,0.10)' : `${z.color}40`}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  {z.locked
                    ? <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <rect x="3" y="7" width="10" height="8" rx="2" fill="rgba(60,60,67,0.35)"/>
                        <path d="M5 7V5a3 3 0 0 1 6 0v2" stroke="rgba(60,60,67,0.35)" strokeWidth="1.5" strokeLinecap="round"/>
                      </svg>
                    : <span style={{ fontSize: 14, fontWeight: 800, color: z.color }}>Z{z.zone}</span>
                  }
                </div>

                {/* Text */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 2 }}>
                    <span style={{
                      fontSize: 10, fontWeight: 700,
                      color: z.locked ? 'rgba(60,60,67,0.4)' : z.color,
                      letterSpacing: '0.06em',
                    }}>
                      ZONE {z.zone}
                    </span>
                    {z.locked && (
                      <span style={{
                        fontSize: 9, fontWeight: 700,
                        color: 'rgba(60,60,67,0.4)',
                        background: 'rgba(0,0,0,0.07)',
                        padding: '1px 6px',
                        borderRadius: 6,
                        letterSpacing: '0.05em',
                      }}>LOCKED</span>
                    )}
                  </div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: z.locked ? 'rgba(60,60,67,0.5)' : '#1C1C1E' }}>
                    {z.title}
                  </div>
                  <div style={{ fontSize: 11, color: 'rgba(60,60,67,0.5)', marginTop: 1 }}>
                    {z.desc} · {z.emails} emails
                  </div>
                </div>

                {/* Active indicator */}
                {!z.locked && (
                  <div style={{
                    fontSize: 11, fontWeight: 600,
                    color: z.color,
                    background: `${z.color}15`,
                    border: `1px solid ${z.color}30`,
                    padding: '4px 10px',
                    borderRadius: 8,
                    flexShrink: 0,
                  }}>
                    Start →
                  </div>
                )}
              </div>
            ))}
          </div>
        </motion.div>

      </motion.div>
    </div>
  );
}
