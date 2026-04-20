import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import img1 from '../assets/images/images_page-0001.jpg';
import img2 from '../assets/images/images_page-0002.jpg';
import img3 from '../assets/images/images_page-0003.jpg';
import img4 from '../assets/images/images_page-0004.jpg';
import '../styles/animations.css';

const STEPS = [
  { src: img1, caption: 'Read the email like you\'re the last line of defense' },
  { src: img2, caption: 'Stuck? Tap ⓘ to reveal a hint — no point deduction' },
  { src: img3, caption: 'Classify into one of 3 categories: Legitimate, Spam & Junk, or Phishing & Spoofing' },
  { src: img4, caption: 'Confident? Lock it in before the 45-second clock runs out' },
];

const STEP_DURATION = 5000;

const glassLight = {
  background: 'rgba(255,255,255,0.38)',
  backdropFilter: 'blur(16px) saturate(160%)',
  WebkitBackdropFilter: 'blur(16px) saturate(160%)',
  border: '1px solid rgba(255,255,255,0.55)',
};

export default function TutorialScreen({ onSkip }) {
  const [activeStep, setActiveStep] = useState(0);

  // Auto-advance every 5 s, cycling through steps
  useEffect(() => {
    const t = setInterval(() => {
      setActiveStep(s => (s + 1) % STEPS.length);
    }, STEP_DURATION);
    return () => clearInterval(t);
  }, []);

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '32px 16px 48px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Helvetica Neue", sans-serif',
    }}>

      {/* Skip */}
      <button onClick={onSkip} style={{
        position: 'fixed',
        top: 18,
        right: 20,
        padding: '7px 16px',
        borderRadius: 20,
        ...glassLight,
        fontSize: 13,
        fontWeight: 500,
        color: 'rgba(60,60,67,0.7)',
        cursor: 'pointer',
        zIndex: 999,
        border: '1px solid rgba(255,255,255,0.55)',
        boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
      }}>
        Skip
      </button>

      <div style={{ width: '100%', maxWidth: 560 }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 7,
            ...glassLight,
            borderRadius: 20,
            padding: '5px 16px',
            marginBottom: 14,
            boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
          }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: '#0071e3', letterSpacing: '0.06em' }}>HOW TO PLAY</span>
          </div>
          <h2 style={{ fontSize: 24, fontWeight: 700, color: '#1C1C1E', margin: 0, letterSpacing: '-0.01em' }}>
            Quick guide
          </h2>
        </div>

        {/* 2×2 grid — active step pops, others recede */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 14,
          marginBottom: 24,
        }}>
          {STEPS.map((step, i) => {
            const isActive = i === activeStep;
            return (
              <motion.div
                key={i}
                onClick={() => setActiveStep(i)}
                animate={{
                  scale: isActive ? 1.04 : 0.94,
                  opacity: isActive ? 1 : 0.52,
                }}
                transition={{ type: 'spring', stiffness: 320, damping: 24 }}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 8,
                  cursor: 'pointer',
                  transformOrigin: 'center center',
                }}
              >
                {/* Image wrapper — glow ring when active */}
                <motion.div
                  animate={{
                    boxShadow: isActive
                      ? '0 0 0 2.5px #0071e3, 0 10px 32px rgba(0,113,227,0.28)'
                      : '0 4px 12px rgba(0,0,0,0.09)',
                  }}
                  transition={{ duration: 0.3 }}
                  style={{ borderRadius: 14, overflow: 'hidden' }}
                >
                  <img
                    src={step.src}
                    alt={step.caption}
                    draggable={false}
                    style={{ width: '100%', display: 'block' }}
                  />
                </motion.div>

                {/* Caption row */}
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 7 }}>
                  <motion.div
                    animate={{
                      background: isActive ? 'rgba(0,113,227,0.90)' : 'rgba(0,113,227,0.10)',
                      borderColor: isActive ? 'rgba(0,113,227,0.9)' : 'rgba(0,113,227,0.25)',
                    }}
                    transition={{ duration: 0.25 }}
                    style={{
                      width: 20,
                      height: 20,
                      borderRadius: '50%',
                      border: '1.5px solid rgba(0,113,227,0.25)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 10,
                      fontWeight: 700,
                      color: isActive ? '#fff' : '#0071e3',
                      flexShrink: 0,
                      marginTop: 1,
                      transition: 'color 0.25s',
                    }}
                  >
                    {i + 1}
                  </motion.div>
                  <p style={{
                    margin: 0,
                    fontSize: 12,
                    color: '#3a3a3c',
                    lineHeight: 1.45,
                    fontWeight: isActive ? 600 : 500,
                    transition: 'font-weight 0.2s',
                  }}>
                    {step.caption}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Step dots */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 6, marginBottom: 20 }}>
          {STEPS.map((_, i) => (
            <motion.button
              key={i}
              onClick={() => setActiveStep(i)}
              animate={{
                width: i === activeStep ? 20 : 6,
                background: i === activeStep ? '#0071e3' : 'rgba(0,0,0,0.18)',
              }}
              transition={{ type: 'spring', stiffness: 400, damping: 28 }}
              style={{
                height: 6,
                borderRadius: 3,
                border: 'none',
                padding: 0,
                cursor: 'pointer',
              }}
            />
          ))}
        </div>

        {/* CTA */}
        <button
          onClick={onSkip}
          style={{
            width: '100%',
            padding: '14px 24px',
            borderRadius: 14,
            border: '1px solid rgba(52,199,89,0.45)',
            background: 'rgba(52,199,89,0.90)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            color: '#fff',
            fontSize: 16,
            fontWeight: 600,
            cursor: 'pointer',
            fontFamily: 'inherit',
            boxShadow: '0 4px 18px rgba(52,199,89,0.30)',
            transition: 'opacity 0.15s ease',
          }}
          onMouseEnter={e => e.currentTarget.style.opacity = '0.88'}
          onMouseLeave={e => e.currentTarget.style.opacity = '1'}
        >
          I'm ready — Start playing →
        </button>

      </div>
    </div>
  );
}
