import { useState } from 'react';

const glass = {
  background: 'rgba(255,255,255,0.60)',
  backdropFilter: 'blur(28px) saturate(180%)',
  WebkitBackdropFilter: 'blur(28px) saturate(180%)',
  border: '1px solid rgba(255,255,255,0.75)',
  boxShadow: '0 8px 32px rgba(0,0,0,0.08), 0 2px 8px rgba(0,0,0,0.04)',
};


export default function LandingScreen({ onStart }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [focusedField, setFocusedField] = useState(null);

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
      <div style={{ width: '100%', maxWidth: 400 }} className="anim-fadeSlideUp">

        {/* App identity */}
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          {/* Icon mark — glass shell */}
          <div style={{
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
          }}>
            <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
              <path d="M18 4L30 10V20C30 26.627 24.627 32 18 32C11.373 32 6 26.627 6 20V10L18 4Z"
                fill="rgba(255,255,255,0.15)" stroke="white" strokeWidth="1.5"/>
              <path d="M13 18.5L16.5 22L23 15" stroke="white" strokeWidth="2"
                strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>

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
        </div>

        {/* Sign-in card */}
        <div style={{ ...glass, borderRadius: 20, padding: '32px 28px', marginBottom: 14 }}>
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
        </div>

        {/* Zone cards - stacked deck */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{
            fontSize: 10,
            fontWeight: 700,
            color: 'rgba(60,60,67,0.5)',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            textAlign: 'center',
            marginBottom: 12,
          }}>
            3 Zones · 25 Emails
          </div>

          {/* Stacked cards container — render back-to-front */}
          <div style={{ position: 'relative', height: 108 }}>
            {[
              { zone: 3, title: 'Zero-Day Vault', emails: 5,  color: '#FF3B30', locked: true,  desc: 'Advanced threat analysis', top: 32, zIndex: 1, scale: 0.94 },
              { zone: 2, title: 'Shadow Inbox',   emails: 10, color: '#FF9500', locked: true,  desc: 'Spot deceptive patterns',  top: 16, zIndex: 2, scale: 0.97 },
              { zone: 1, title: 'Flag Academy',   emails: 10, color: '#34C759', locked: false, desc: 'Identify common threats',  top: 0,  zIndex: 3, scale: 1.0  },
            ].map(z => (
              <div key={z.zone} style={{
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
              }}>
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
        </div>

      </div>
    </div>
  );
}
