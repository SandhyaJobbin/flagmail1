import img1 from '../assets/images/images_page-0001.jpg';
import img2 from '../assets/images/images_page-0002.jpg';
import img3 from '../assets/images/images_page-0003.jpg';
import img4 from '../assets/images/images_page-0004.jpg';
import '../styles/animations.css';

const STEPS = [
  { src: img1, caption: 'Read the email' },
  { src: img2, caption: 'When and how to use the clue' },
  { src: img3, caption: 'How to select L1 and L2' },
  { src: img4, caption: 'How to submit your response' },
];

const glassLight = {
  background: 'rgba(255,255,255,0.38)',
  backdropFilter: 'blur(16px) saturate(160%)',
  WebkitBackdropFilter: 'blur(16px) saturate(160%)',
  border: '1px solid rgba(255,255,255,0.55)',
};

export default function TutorialScreen({ onSkip }) {
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

        {/* 2×2 grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 14,
          marginBottom: 24,
        }}>
          {STEPS.map((step, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 8,
                animation: `popIn 0.4s cubic-bezier(0.34,1.56,0.64,1) ${i * 0.07}s both`,
              }}
            >
              <img
                src={step.src}
                alt={step.caption}
                draggable={false}
                style={{
                  width: '100%',
                  borderRadius: 14,
                  boxShadow: '0 6px 20px rgba(0,0,0,0.11)',
                  display: 'block',
                }}
              />
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 7 }}>
                <div style={{
                  width: 20,
                  height: 20,
                  borderRadius: '50%',
                  background: 'rgba(0,113,227,0.10)',
                  border: '1.5px solid rgba(0,113,227,0.25)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 10,
                  fontWeight: 700,
                  color: '#0071e3',
                  flexShrink: 0,
                  marginTop: 1,
                }}>
                  {i + 1}
                </div>
                <p style={{
                  margin: 0,
                  fontSize: 12,
                  color: '#3a3a3c',
                  lineHeight: 1.45,
                  fontWeight: 500,
                }}>
                  {step.caption}
                </p>
              </div>
            </div>
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
