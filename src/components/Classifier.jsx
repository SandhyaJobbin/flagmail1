import { useState, useRef } from 'react';
import { createPortal } from 'react-dom';
import { L1_CATEGORIES, L2_BY_L1 } from '../data/emails.js';

// ── Help content ──────────────────────────────────────────────────────────────

const L1_HELP = {
  'Legitimate': {
    desc: 'Genuine, authorized emails from trusted senders — receipts, alerts, and internal communications you actually signed up for.',
    signals: 'Matches expected domain, no urgency tricks, personalized & contextually relevant.',
  },
  'Phishing & Spoofing': {
    desc: 'Deceptive emails crafted to steal credentials or personal data by impersonating trusted entities.',
    signals: 'Mismatched links, urgency, generic greeting, lookalike domain, suspicious sender.',
  },
  'Spam & Junk': {
    desc: 'Unsolicited bulk email — promotions, prize claims, or chain letters — with no targeted malicious intent.',
    signals: 'Mass send, unsubscribe missing, irrelevant offers, exaggerated claims.',
  },
  'Malicious Content': {
    desc: 'Emails that deliver or link to malware, ransomware, or malicious downloads via files or URLs.',
    signals: 'Unexpected attachments, unusual file types, links to unknown domains, macro prompts.',
  },
  'Abuse & Harassment': {
    desc: 'Harmful, threatening, or illegal content targeting an individual — hate speech, stalking, or self-harm.',
    signals: 'Threatening language, personal details of the target, repeated contact, disturbing content.',
  },
  'High-Risk Fraud': {
    desc: 'Sophisticated financial scams using social engineering — BEC, wire fraud, impersonation, or advance-fee schemes.',
    signals: 'Request for money/transfer, impersonates executive or vendor, unusual urgency, wiring instructions.',
  },
};

const L2_HELP = {
  // Legitimate
  'Subscription Billing':            'Legitimate charge or renewal notice from a service you authorized.',
  'Security Notification':           'Real alert about account activity, password changes, or suspicious logins.',
  'Platform Notification':           'Authentic system-generated notification from a platform or app you use.',
  'Internal Communication':          'Genuine email from within the same organization or team.',
  'Shipping Update':                 'Real tracking or delivery status update from a carrier or retailer.',
  'Bank / Financial Notification':   'Legitimate transaction alert or statement from a financial institution.',
  // Phishing & Spoofing
  'Email Phishing':                  'Mass phishing campaign impersonating a known brand to steal credentials.',
  'Spear Phishing':                  'Targeted phishing crafted for a specific person using personal details.',
  'Spoofed Sender Address':          'Email disguising its true origin to appear from a trusted sender.',
  'Clone Phishing':                  'Malicious copy of a real email with links or attachments swapped out.',
  'Smishing Reference':              'Email referencing or redirecting to an SMS-based phishing scheme.',
  // Spam & Junk
  'Bulk Marketing Spam':             'Unsolicited mass marketing email sent without consent.',
  'Prize & Lottery Spam':            'Fake prize notification designed to extract personal info or fees.',
  'Chain Letter':                    'Email requesting forwarding to others, spreading misinformation or links.',
  'SEO / Referral Spam':             'Fraudulent email to inflate web rankings or drive referral traffic.',
  'Newsletter Spam':                 'Unsolicited subscription content from sources you never signed up for.',
  // Malicious Content
  'Malware Delivery':                'Email used to distribute malicious software via links or infected files.',
  'Ransomware Lure':                 'Tricks the recipient into running ransomware that encrypts their data.',
  'Credential Harvesting':           'Redirects to a fake login page to capture usernames and passwords.',
  'Drive-by Download Link':          'URL that silently installs malware upon visiting the page.',
  'Macro-Embedded Attachment':       'Office document with malicious macros that execute on open.',
  // Abuse & Harassment
  'Direct Harassment':               'Threatening or abusive content directed at a specific individual.',
  'Hate Speech':                     'Discriminatory content targeting race, religion, gender, or identity.',
  'Self-Harm Facilitation':          'Email promoting, encouraging, or providing methods of self-harm.',
  'Child Safety Concern':            'Content that endangers, exploits, or targets minors.',
  'Stalking / Doxxing':              'Reveals personal information or indicates surveillance to intimidate.',
  // High-Risk Fraud
  'Business Email Compromise (BEC)': 'Impersonates an executive or vendor to authorize fraudulent transfers.',
  'Impersonation':                   'Pretends to be a trusted person or authority to manipulate the recipient.',
  'Extortion & Sextortion':          'Threatens to release private content unless payment is made.',
  'Romance Scam':                    'Fake romantic connection cultivated over time to eventually request money.',
  'Job Scam':                        'Fraudulent job offer to extract personal info, fees, or unpaid labor.',
  'Advance Fee Fraud':               'Promises a large sum in exchange for a small upfront payment.',
  'Wire Fraud':                      'Tricks the recipient into transferring funds to a fraudulent account.',
};

// ── Tooltip card ──────────────────────────────────────────────────────────────

function HelpTooltip({ tooltip, color, onDismiss }) {
  const isL1 = tooltip.type === 'l1';
  const help = isL1 ? L1_HELP[tooltip.id] : null;
  const l2Desc = !isL1 ? L2_HELP[tooltip.id] : null;
  const subs = isL1 ? (L2_BY_L1[tooltip.id] || []) : [];

  const { x, y, above } = tooltip.pos;

  return (
    <div style={{
      position: 'fixed',
      left: x,
      ...(above ? { bottom: window.innerHeight - y } : { top: y }),
      width: 288,
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
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
        <div style={{
          width: 8, height: 8, borderRadius: '50%',
          background: color, flexShrink: 0,
        }} />
        <span style={{ fontSize: 12, fontWeight: 700, color: '#1C1C1E', letterSpacing: '-0.01em' }}>
          {tooltip.id}
        </span>
        <span style={{
          marginLeft: 'auto',
          fontSize: 9, fontWeight: 600,
          color: 'rgba(60,60,67,0.4)',
          letterSpacing: '0.06em',
        }}>
          {isL1 ? 'L1 CATEGORY' : 'L2 SUBCATEGORY'}
        </span>
      </div>

      {/* Description */}
      <p style={{
        fontSize: 12, color: '#3A3A3C', lineHeight: 1.55,
        margin: '0 0 8px', fontWeight: 400,
      }}>
        {isL1 ? help.desc : l2Desc}
      </p>

      {/* Signals (L1 only) */}
      {isL1 && help.signals && (
        <div style={{
          fontSize: 11, color: 'rgba(60,60,67,0.6)',
          marginBottom: subs.length ? 10 : 0,
          lineHeight: 1.4,
        }}>
          <span style={{ fontWeight: 600, color: color }}>Look for: </span>
          {help.signals}
        </div>
      )}

      {/* Subcategories (L1 only) */}
      {isL1 && subs.length > 0 && (
        <div>
          <div style={{
            fontSize: 9, fontWeight: 700, color: 'rgba(60,60,67,0.4)',
            letterSpacing: '0.08em', marginBottom: 5,
          }}>
            SUBCATEGORIES
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
            {subs.map(s => (
              <span key={s} style={{
                fontSize: 10, fontWeight: 500,
                color: color,
                background: `${color}12`,
                border: `1px solid ${color}28`,
                borderRadius: 5,
                padding: '2px 6px',
              }}>
                {s}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Dismiss countdown bar */}
      <div style={{
        marginTop: 10,
        height: 2,
        borderRadius: 2,
        background: `${color}20`,
        overflow: 'hidden',
      }}>
        <div style={{
          height: '100%',
          background: color,
          borderRadius: 2,
          animation: 'tooltipCountdown 5s linear forwards',
        }} />
      </div>
    </div>
  );
}

// ── Main classifier ───────────────────────────────────────────────────────────

export default function Classifier({ selectedL1, selectedL2, onSelectL1, onSelectL2, disabled }) {
  const l2Options = selectedL1 ? L2_BY_L1[selectedL1] || [] : [];

  const [tooltip, setTooltip] = useState(null);
  const hoverTimer  = useRef(null);
  const dismissTimer = useRef(null);

  function clearAll() {
    clearTimeout(hoverTimer.current);
    clearTimeout(dismissTimer.current);
  }

  function showAfterDelay(id, type, color, e) {
    clearAll();
    const rect = e.currentTarget.getBoundingClientRect();
    const tooltipH = type === 'l1' ? 200 : 100;
    const above = rect.top > tooltipH + 20;
    const pos = {
      x: Math.min(Math.max(rect.left, 8), window.innerWidth - 296),
      y: above ? rect.top - 8 : rect.bottom + 8,
      above,
    };
    hoverTimer.current = setTimeout(() => {
      setTooltip({ id, type, color, pos });
      dismissTimer.current = setTimeout(() => setTooltip(null), 5000);
    }, 500);
  }

  function hide() {
    clearAll();
    setTooltip(null);
  }

  const tooltipColor = tooltip
    ? (tooltip.type === 'l1'
        ? L1_CATEGORIES.find(c => c.id === tooltip.id)?.color
        : L1_CATEGORIES.find(c => c.id === selectedL1)?.color) || '#0A84FF'
    : '#0A84FF';

  return (
    <div>
      {tooltip && createPortal(
        <HelpTooltip tooltip={tooltip} color={tooltipColor} onDismiss={() => setTooltip(null)} />,
        document.body
      )}

      {/* L1 */}
      <div style={{ marginBottom: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
          <div style={{ fontSize: 11, fontWeight: 600, color: '#636366', letterSpacing: '0.08em' }}>
            L1 — THREAT CATEGORY
          </div>
          <div style={{ fontSize: 10, color: 'rgba(60,60,67,0.4)', fontStyle: 'italic' }}>
            Hold to learn more
          </div>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {L1_CATEGORIES.map(cat => {
            const isSelected = selectedL1 === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => !disabled && onSelectL1(cat.id)}
                onMouseEnter={e => !disabled && showAfterDelay(cat.id, 'l1', cat.color, e)}
                onMouseLeave={hide}
                disabled={disabled}
                style={{
                  padding: '9px 16px',
                  borderRadius: 12,
                  fontSize: 13,
                  fontWeight: 500,
                  cursor: disabled ? 'default' : 'pointer',
                  fontFamily: 'inherit',
                  transition: 'all 0.18s ease',
                  ...(isSelected ? {
                    background: `rgba(${hexToRgb(cat.color)},0.12)`,
                    border: `1.5px solid ${cat.color}`,
                    boxShadow: `0 0 0 4px rgba(${hexToRgb(cat.color)},0.1)`,
                    color: cat.color,
                    fontWeight: 600,
                  } : {
                    background: 'rgba(255,255,255,0.5)',
                    border: '1.5px solid rgba(0,0,0,0.08)',
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

      {/* L2 */}
      {selectedL1 && (
        <div className="anim-fadeSlideUp">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: '#636366', letterSpacing: '0.08em' }}>
              L2 — SUBCATEGORY
            </div>
            <div style={{ fontSize: 10, color: 'rgba(60,60,67,0.4)', fontStyle: 'italic' }}>
              Hold to learn more
            </div>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {l2Options.map(sub => {
              const isSelected = selectedL2 === sub;
              const catColor = L1_CATEGORIES.find(c => c.id === selectedL1)?.color || '#0A84FF';
              return (
                <button
                  key={sub}
                  onClick={() => !disabled && onSelectL2(sub)}
                  onMouseEnter={e => !disabled && showAfterDelay(sub, 'l2', catColor, e)}
                  onMouseLeave={hide}
                  disabled={disabled}
                  style={{
                    padding: '7px 14px',
                    borderRadius: 20,
                    fontSize: 12,
                    fontWeight: 500,
                    cursor: disabled ? 'default' : 'pointer',
                    fontFamily: 'inherit',
                    transition: 'all 0.18s ease',
                    ...(isSelected ? {
                      background: `rgba(${hexToRgb(catColor)},0.12)`,
                      border: `1.5px solid ${catColor}`,
                      color: catColor,
                      fontWeight: 600,
                    } : {
                      background: 'rgba(255,255,255,0.5)',
                      border: '1.5px solid rgba(0,0,0,0.08)',
                      color: '#636366',
                    }),
                  }}
                >
                  {sub}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

function hexToRgb(hex) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `${r},${g},${b}`;
}
