const glass = {
  background: 'rgba(255,255,255,0.65)',
  backdropFilter: 'blur(24px) saturate(180%)',
  WebkitBackdropFilter: 'blur(24px) saturate(180%)',
  border: '1px solid rgba(255,255,255,0.8)',
  borderRadius: 20,
  boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
};

const ZONES = [
  { zone: 1, title: 'Flag Academy',   emails: 10, color: '#34C759', desc: 'Identify common threats',  difficulty: 'Easy',   mission: 'Clear the queue. Prove your instincts.',        icon: '🔍' },
  { zone: 2, title: 'Shadow Inbox',   emails: 10, color: '#FF9500', desc: 'Spot deceptive patterns',  difficulty: 'Medium', mission: 'Threats get smarter. So do you.',               icon: '🛡' },
  { zone: 3, title: 'Zero-Day Vault', emails: 5,  color: '#FF3B30', desc: 'Advanced threat analysis', difficulty: 'Hard',   mission: 'The hardest emails in the queue. Trust nothing.', icon: '🎯' },
];

export default function ZoneIntroCard({ zone, onStart, earlyUnlocked }) {
  const meta = ZONES.find(z => z.zone === zone);

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px 16px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
    }}>
      <div style={{ width: '100%', maxWidth: 400 }} className="anim-springIn">

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <div style={{
            fontSize: 11,
            fontWeight: 600,
            color: 'rgba(60,60,67,0.5)',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            marginBottom: 10,
          }}>
            Veridian Security
          </div>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            background: `rgba(${meta.color === '#34C759' ? '52,199,89' : meta.color === '#FF9500' ? '255,149,0' : '255,59,48'},0.1)`,
            border: `1.5px solid ${meta.color}`,
            borderRadius: 20,
            padding: '6px 16px',
          }}>
            <span style={{ fontSize: 16 }}>{meta.icon}</span>
            <span style={{ fontSize: 13, fontWeight: 700, color: meta.color, letterSpacing: '0.06em' }}>
              {meta.difficulty.toUpperCase()} · {meta.emails} EMAILS
            </span>
          </div>
        </div>

        {/* Early unlock banner */}
        {earlyUnlocked && zone > 1 && (
          <div style={{
            ...glass,
            padding: '12px 20px',
            marginBottom: 16,
            borderLeft: '3px solid #FFD60A',
            display: 'flex',
            alignItems: 'center',
            gap: 10,
          }}>
            <span style={{ fontSize: 20 }}>⚡</span>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#B8860B' }}>EARLY UNLOCK</div>
              <div style={{ fontSize: 12, color: '#636366' }}>3 consecutive perfect scores unlocked this zone early!</div>
            </div>
          </div>
        )}

        {/* 3-column zone grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, marginBottom: 14 }}>
          {ZONES.map(zData => {
            const isCompleted = zData.zone < zone;
            const isLocked    = zData.zone > zone;

            return (
              <div key={zData.zone} style={{
                ...glass,
                borderRadius: 14,
                padding: '16px 10px 14px',
                textAlign: 'center',
                borderTop: `3px solid ${isLocked ? 'rgba(0,0,0,0.10)' : zData.color}`,
                opacity: isLocked ? 0.55 : isCompleted ? 0.80 : 1,
                position: 'relative',
                overflow: 'hidden',
              }}>
                {/* Icon badge */}
                <div style={{
                  width: 44,
                  height: 44,
                  borderRadius: 14,
                  background: isLocked ? 'rgba(0,0,0,0.05)' : `${zData.color}18`,
                  border: `1.5px solid ${isLocked ? 'rgba(0,0,0,0.08)' : `${zData.color}40`}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 10px',
                }}>
                  {isLocked ? (
                    <svg width="18" height="18" viewBox="0 0 16 16" fill="none">
                      <rect x="3" y="7" width="10" height="8" rx="2" fill="rgba(60,60,67,0.30)"/>
                      <path d="M5 7V5a3 3 0 0 1 6 0v2" stroke="rgba(60,60,67,0.30)" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                  ) : isCompleted ? (
                    <svg width="18" height="18" viewBox="0 0 16 16" fill="none">
                      <path d="M4 8.5L7 11.5L12 5.5" stroke={zData.color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  ) : (
                    <span style={{ fontSize: 20 }}>{zData.icon}</span>
                  )}
                </div>

                {/* Title */}
                <div style={{
                  fontSize: 11,
                  fontWeight: 700,
                  color: isLocked ? 'rgba(60,60,67,0.4)' : '#1C1C1E',
                  lineHeight: 1.3,
                  marginBottom: 6,
                }}>
                  {zData.title}
                </div>

                {/* Status pill */}
                <div style={{
                  display: 'inline-block',
                  fontSize: 9,
                  fontWeight: 700,
                  letterSpacing: '0.05em',
                  padding: '2px 7px',
                  borderRadius: 6,
                  color: isLocked ? 'rgba(60,60,67,0.4)' : isCompleted ? zData.color : zData.color,
                  background: isLocked ? 'rgba(0,0,0,0.06)' : `${zData.color}18`,
                }}>
                  {isLocked ? 'LOCKED' : isCompleted ? 'DONE' : 'UP NEXT'}
                </div>
              </div>
            );
          })}
        </div>

        {/* Mission briefing card */}
        <div style={{ ...glass, padding: '28px 28px 24px', textAlign: 'center' }}>
          <h1 style={{ fontSize: 26, fontWeight: 800, color: '#1C1C1E', margin: '0 0 6px', letterSpacing: '-0.02em' }}>
            {meta.title}
          </h1>
          <p style={{ fontSize: 14, color: '#636366', margin: '0 0 24px', fontStyle: 'italic', lineHeight: 1.5 }}>
            {meta.mission}
          </p>

          {/* Stats */}
          <div style={{ display: 'flex', gap: 12, marginBottom: 24 }}>
            {[
              { label: 'Emails', value: meta.emails },
              { label: 'Max Points', value: meta.emails * 4 },
              { label: 'Time / Email', value: '45s' },
            ].map(stat => (
              <div key={stat.label} style={{
                flex: 1,
                background: 'rgba(0,0,0,0.04)',
                borderRadius: 12,
                padding: '14px 8px',
              }}>
                <div style={{ fontSize: 20, fontWeight: 700, color: '#1C1C1E' }}>{stat.value}</div>
                <div style={{ fontSize: 11, color: '#636366', marginTop: 2 }}>{stat.label}</div>
              </div>
            ))}
          </div>

          <button
            onClick={onStart}
            style={{
              width: '100%',
              padding: '15px',
              borderRadius: 12,
              border: 'none',
              background: meta.color,
              color: '#fff',
              fontSize: 16,
              fontWeight: 700,
              cursor: 'pointer',
              fontFamily: 'inherit',
              transition: 'opacity 0.15s ease',
            }}
            onMouseEnter={e => e.target.style.opacity = '0.88'}
            onMouseLeave={e => e.target.style.opacity = '1'}
          >
            Start {meta.title} →
          </button>
        </div>

      </div>
    </div>
  );
}
