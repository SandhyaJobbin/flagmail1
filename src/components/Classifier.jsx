import { useState, useRef } from 'react';
import { createPortal } from 'react-dom';
import { L1_CATEGORIES } from '../data/emails.js';

const L1_HELP = {
  'Legitimate': {
    desc: 'Genuine, authorized emails from trusted senders — receipts, alerts, and communications you actually signed up for.',
    signals: 'Verified domain, no urgency tricks, personalized, no requests for credentials.',
  },
  'Phishing & Spoofing': {
    desc: 'Deceptive emails crafted to steal credentials or personal data by impersonating trusted entities.',
    signals: 'Mismatched links, urgency, lookalike domain, asks for passwords or card details.',
  },
  'Spam & Junk': {
    desc: 'Unsolicited bulk email — promotions, prize claims, chain letters — with no targeted malicious intent.',
    signals: 'Mass send, unsolicited offer, exaggerated claims, unknown sender domain.',
  },
};

function HelpTooltip({ tooltip, color, onDismiss }) {
  const help = L1_HELP[tooltip.id];
  const { x, y, above } = tooltip.pos;

  return (
    <div style={{
      position: 'fixed',
      left: x,
      ...(above ? { bottom: window.innerHeight - y } : { top: y }),
      width: 272,
      zIndex: 9999,
      background: 'rgba(255,255,255,0.96)',
      backdropFilter: 'blur(24px) saturate(180%)',
      WebkitBackdropFilter: 'blur(24px) saturate(180%)',
      border: `1.5px solid ${color}40`,
      borderRadius: 14,
      boxShadow: `0 12px 40px rgba(0,0,0,0.14), 0 0 0 1px rgba(255,255,255,0.6), 0 4px 0 ${color}`,
      padding: '14px 16px 12px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
      animation: 'fadeSlideUp 0.18s ease',
      pointerEvents: 'none',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
        <div style={{ width: 8, height: 8, borderRadius: '50%', background: color, flexShrink: 0 }} />
        <span style={{ fontSize: 12, fontWeight: 700, color: '#1C1C1E' }}>{tooltip.id}</span>
        <span style={{ marginLeft: 'auto', fontSize: 9, fontWeight: 600, color: 'rgba(60,60,67,0.4)', letterSpacing: '0.06em' }}>
          CATEGORY
        </span>
      </div>
      <p style={{ fontSize: 12, color: '#3A3A3C', lineHeight: 1.55, margin: '0 0 8px' }}>
        {help.desc}
      </p>
      {help.signals && (
        <div style={{ fontSize: 11, color: 'rgba(60,60,67,0.6)', lineHeight: 1.4 }}>
          <span style={{ fontWeight: 600, color: color }}>Look for: </span>
          {help.signals}
        </div>
      )}
      <div style={{ marginTop: 10, height: 2, borderRadius: 2, background: `${color}20`, overflow: 'hidden' }}>
        <div style={{ height: '100%', background: color, borderRadius: 2, animation: 'tooltipCountdown 5s linear forwards' }} />
      </div>
    </div>
  );
}

export default function Classifier({ selectedL1, onSelectL1, disabled }) {
  const [tooltip, setTooltip] = useState(null);
  const hoverTimer   = useRef(null);
  const dismissTimer = useRef(null);

  function clearAll() {
    clearTimeout(hoverTimer.current);
    clearTimeout(dismissTimer.current);
  }

  function showAfterDelay(id, color, e) {
    clearAll();
    const rect = e.currentTarget.getBoundingClientRect();
    const above = rect.top > 180;
    const pos = {
      x: Math.min(Math.max(rect.left, 8), window.innerWidth - 280),
      y: above ? rect.top - 8 : rect.bottom + 8,
      above,
    };
    hoverTimer.current = setTimeout(() => {
      setTooltip({ id, color, pos });
      dismissTimer.current = setTimeout(() => setTooltip(null), 5000);
    }, 500);
  }

  function hide() { clearAll(); setTooltip(null); }

  const tooltipColor = tooltip
    ? L1_CATEGORIES.find(c => c.id === tooltip.id)?.color || '#0A84FF'
    : '#0A84FF';

  return (
    <div>
      {tooltip && createPortal(
        <HelpTooltip tooltip={tooltip} color={tooltipColor} onDismiss={() => setTooltip(null)} />,
        document.body
      )}

      <div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
          <div style={{ fontSize: 11, fontWeight: 600, color: '#636366', letterSpacing: '0.08em' }}>
            CLASSIFY THIS EMAIL
          </div>
          <div style={{ fontSize: 10, color: 'rgba(60,60,67,0.65)', fontStyle: 'italic' }}>
            Hover for details
          </div>
        </div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {L1_CATEGORIES.map(cat => {
            const isSelected = selectedL1 === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => !disabled && onSelectL1(cat.id)}
                onMouseEnter={e => !disabled && showAfterDelay(cat.id, cat.color, e)}
                onMouseLeave={hide}
                disabled={disabled}
                style={{
                  padding: '8px 16px',
                  borderRadius: 20,
                  fontSize: 13,
                  fontWeight: isSelected ? 600 : 500,
                  cursor: disabled ? 'default' : 'pointer',
                  fontFamily: 'inherit',
                  transition: 'all 0.15s ease',
                  transform: isSelected ? 'scale(1.04)' : 'scale(1)',
                  ...(isSelected ? {
                    background: `${cat.color}1E`,
                    border: `1.5px solid ${cat.color}`,
                    color: cat.color,
                  } : {
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(0,0,0,0.08)',
                    color: '#1C1C1E',
                  }),
                }}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
