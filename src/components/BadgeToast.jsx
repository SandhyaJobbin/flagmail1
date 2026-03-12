import { useEffect, useState } from 'react';

export default function BadgeToast({ badge, onDismiss }) {
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    if (!badge) return;
    const duration = badge.rare ? 4000 : 2500;
    const t = setTimeout(() => {
      setLeaving(true);
      setTimeout(onDismiss, 350);
    }, duration);
    return () => clearTimeout(t);
  }, [badge, onDismiss]);

  if (!badge) return null;

  if (badge.rare) {
    return (
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        animation: leaving ? 'bannerLift 0.3s ease forwards' : 'bannerDrop 0.5s cubic-bezier(0.34,1.56,0.64,1) forwards',
      }}>
        <div style={{
          background: 'rgba(255,255,255,0.95)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          borderBottom: '2px solid #FFD60A',
          padding: '16px 24px',
          display: 'flex',
          alignItems: 'center',
          gap: 14,
          boxShadow: '0 0 40px rgba(255,214,10,0.3)',
          animation: 'amberGlow 1.5s ease-in-out 2',
        }}>
          <span style={{ fontSize: 32 }}>{badge.icon}</span>
          <div style={{ flex: 1 }}>
            <div style={{
              fontSize: 11,
              fontWeight: 700,
              color: '#B8860B',
              letterSpacing: '0.1em',
              marginBottom: 2,
            }}>
              🌟 RARE BADGE UNLOCKED
            </div>
            <div style={{ fontSize: 17, fontWeight: 700, color: '#1C1C1E' }}>{badge.name}</div>
            <div style={{ fontSize: 13, color: '#636366' }}>{badge.desc}</div>
          </div>
          <button onClick={() => { setLeaving(true); setTimeout(onDismiss, 350); }} style={{
            padding: '6px 12px',
            borderRadius: 20,
            border: '1px solid rgba(0,0,0,0.12)',
            background: 'transparent',
            fontSize: 12,
            color: '#636366',
            cursor: 'pointer',
            fontFamily: 'inherit',
          }}>
            Dismiss
          </button>
        </div>
      </div>
    );
  }

  // Common badge toast
  return (
    <div style={{
      position: 'fixed',
      top: 20,
      right: 20,
      zIndex: 1000,
      maxWidth: 280,
      animation: leaving ? 'toastSlideOut 0.3s ease forwards' : 'toastSlideIn 0.4s ease forwards',
    }}>
      <div style={{
        background: 'rgba(255,255,255,0.92)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        border: '1px solid rgba(255,255,255,0.8)',
        borderRadius: 16,
        boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
        padding: '14px 16px',
        display: 'flex',
        alignItems: 'center',
        gap: 12,
      }}>
        <span style={{ fontSize: 28 }}>{badge.icon}</span>
        <div>
          <div style={{ fontSize: 11, fontWeight: 600, color: '#636366', marginBottom: 2 }}>
            Badge Unlocked
          </div>
          <div style={{ fontSize: 14, fontWeight: 700, color: '#1C1C1E' }}>{badge.name}</div>
          <div style={{ fontSize: 12, color: '#636366' }}>{badge.desc}</div>
        </div>
      </div>
    </div>
  );
}
