import { useState, useRef } from 'react';
import { createPortal } from 'react-dom';
import { L1_CATEGORIES, L2_BY_L1 } from '../data/emails.js';

const L1_HELP = {
  Legitimate: {
    desc: 'Genuine, authorized emails from trusted senders such as receipts, alerts, and normal account communication.',
    signals: 'Expected domain, calm tone, realistic workflow, and context that matches recent activity.',
  },
  'Phishing & Spoofing': {
    desc: 'Deceptive emails designed to steal credentials or trust by impersonating a brand or person.',
    signals: 'Lookalike domain, mismatched sender, urgency, suspicious links, or a fake sign-in flow.',
  },
  'Spam & Junk': {
    desc: 'Unsolicited promotional or low-quality bulk email without a trustworthy relationship to the recipient.',
    signals: 'Unrealistic offers, irrelevant promotions, strange discounts, and noisy marketing language.',
  },
  'Malicious Content': {
    desc: 'Emails that push malware, dangerous downloads, or execution of unsafe files and links.',
    signals: 'Unexpected attachments, macro prompts, odd file types, or links to risky infrastructure.',
  },
  'Abuse & Harassment': {
    desc: 'Harmful or threatening content targeted at a person or identity group.',
    signals: 'Threats, intimidation, doxxing, hateful language, or repeated unwanted contact.',
  },
  'High-Risk Fraud': {
    desc: 'High-consequence scams such as wire fraud, impersonation, and advance-fee manipulation.',
    signals: 'Money movement, executive impersonation, banking details, or social engineering around urgency.',
  },
};

const L2_HELP = {
  'Subscription Billing': 'Legitimate billing or renewal communication from a real service you use.',
  'Security Notification': 'A genuine alert about account activity, password changes, or sign-in events.',
  'Platform Notification': 'Authentic system communication from a known platform or product.',
  'Internal Communication': 'Real internal email from your team or organization.',
  'Shipping Update': 'A normal delivery or shipment update from a known sender.',
  'Bank / Financial Notification': 'A legitimate financial transaction, fraud, or statement alert.',
  'Promotional Offer': 'A valid promotional or discount email from a known brand.',
  'Email Phishing': 'A broad phishing email built to steal credentials or identity information.',
  'Spear Phishing': 'A more targeted phishing attempt using context or organizational details.',
  'Spoofed Sender Address': 'The sender disguises their origin to appear legitimate.',
  'Clone Phishing': 'A copied version of a real email with the destination changed.',
  Impersonation: 'The attacker pretends to be a trusted person, team, or authority.',
  'Bulk Marketing Spam': 'Mass unsolicited promotional email without clear consent.',
  'Prize & Lottery Spam': 'Fake reward or winnings designed to trigger excitement and disclosure.',
  'Chain Letter': 'A message intended to be forwarded repeatedly with low trust value.',
  'SEO / Referral Spam': 'Traffic-driving or search-ranking spam pretending to be useful.',
  'Newsletter Spam': 'Subscription-style mail that the recipient did not knowingly request.',
  'Malware Delivery': 'A message trying to deliver malware directly to the device.',
  'Ransomware Lure': 'Content designed to trick the recipient into opening ransomware.',
  'Credential Harvesting': 'A fake login or form crafted to steal usernames and passwords.',
  'Drive-by Download Link': 'A link that may install malware just from visiting it.',
  'Macro-Embedded Attachment': 'A document that becomes dangerous when macros are enabled.',
  'Direct Harassment': 'Abusive or threatening content aimed at a specific person.',
  'Hate Speech': 'Attacks a person or group based on identity.',
  'Self-Harm Facilitation': 'Encourages or supports self-harm behavior.',
  'Child Safety Concern': 'Content involving harm, exploitation, or risk to minors.',
  'Stalking / Doxxing': 'Threatening exposure of private information or targeted intimidation.',
  'Business Email Compromise (BEC)': 'Executive or vendor impersonation to trigger fraud or payment.',
  'Extortion & Sextortion': 'Threatens release of sensitive material unless paid.',
  'Romance Scam': 'Manipulative emotional trust-building for financial extraction.',
  'Job Scam': 'A fake job flow intended to take money or sensitive information.',
  'Advance Fee Fraud': 'Promises value in exchange for an upfront payment.',
  'Wire Fraud': 'Attempts to move money into a fraudulent account.',
};

function HelpTooltip({ tooltip, color }) {
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
      width: 296,
      zIndex: 9999,
      background: 'rgba(255,255,255,0.97)',
      backdropFilter: 'blur(24px) saturate(180%)',
      WebkitBackdropFilter: 'blur(24px) saturate(180%)',
      border: `1.5px solid ${color}36`,
      borderRadius: 18,
      boxShadow: '0 22px 44px rgba(18, 28, 45, 0.14)',
      padding: '15px 16px 14px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
      animation: 'fadeSlideUp 0.18s ease',
      pointerEvents: 'none',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 9 }}>
        <div style={{ width: 8, height: 8, borderRadius: '50%', background: color, flexShrink: 0 }} />
        <span style={{ fontSize: 12, fontWeight: 700, color: '#111827', letterSpacing: '-0.01em' }}>
          {tooltip.id}
        </span>
        <span style={{
          marginLeft: 'auto',
          fontSize: 9,
          fontWeight: 700,
          color: 'rgba(17,24,39,0.42)',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
        }}>
          {isL1 ? 'Primary' : 'Secondary'}
        </span>
      </div>

      <p style={{
        fontSize: 12,
        color: '#334155',
        lineHeight: 1.58,
        margin: '0 0 9px',
      }}>
        {isL1 ? help.desc : l2Desc}
      </p>

      {isL1 && help?.signals && (
        <div style={{
          fontSize: 11,
          color: 'rgba(17,24,39,0.60)',
          marginBottom: subs.length ? 10 : 0,
          lineHeight: 1.45,
        }}>
          <span style={{ fontWeight: 700, color }}>Look for: </span>
          {help.signals}
        </div>
      )}

      {isL1 && subs.length > 0 && (
        <div>
          <div style={{
            fontSize: 9,
            fontWeight: 700,
            color: 'rgba(17,24,39,0.42)',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            marginBottom: 6,
          }}>
            Related diagnoses
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
            {subs.map((sub) => (
              <span key={sub} style={{
                fontSize: 10,
                fontWeight: 600,
                color,
                background: `${color}12`,
                border: `1px solid ${color}22`,
                borderRadius: 999,
                padding: '4px 8px',
              }}>
                {sub}
              </span>
            ))}
          </div>
        </div>
      )}

      <div style={{
        marginTop: 12,
        height: 2,
        borderRadius: 2,
        background: `${color}18`,
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

export default function Classifier({ selectedL1, selectedL2, onSelectL1, onSelectL2, disabled }) {
  const l2Options = selectedL1 ? L2_BY_L1[selectedL1] || [] : [];
  const [tooltip, setTooltip] = useState(null);
  const hoverTimer = useRef(null);
  const dismissTimer = useRef(null);

  function clearAll() {
    clearTimeout(hoverTimer.current);
    clearTimeout(dismissTimer.current);
  }

  function showAfterDelay(id, type, color, e) {
    clearAll();
    const rect = e.currentTarget.getBoundingClientRect();
    const tooltipH = type === 'l1' ? 220 : 116;
    const above = rect.top > tooltipH + 20;
    const pos = {
      x: Math.min(Math.max(rect.left, 8), window.innerWidth - 304),
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
        ? L1_CATEGORIES.find((cat) => cat.id === tooltip.id)?.color
        : L1_CATEGORIES.find((cat) => cat.id === selectedL1)?.color) || '#0A84FF'
    : '#0A84FF';

  return (
    <div>
      {tooltip && createPortal(
        <HelpTooltip tooltip={tooltip} color={tooltipColor} />,
        document.body
      )}

      <div style={{ marginBottom: 18 }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 12,
          marginBottom: 10,
          flexWrap: 'wrap',
        }}>
          <div style={{
            fontSize: 11,
            fontWeight: 700,
            color: 'rgba(17,24,39,0.52)',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
          }}>
            Primary classification
          </div>
          <div style={{ fontSize: 11, color: 'rgba(17,24,39,0.54)' }}>
            Choose the strongest category
          </div>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {L1_CATEGORIES.map((cat) => {
            const isSelected = selectedL1 === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => !disabled && onSelectL1(cat.id)}
                onMouseEnter={(e) => !disabled && showAfterDelay(cat.id, 'l1', cat.color, e)}
                onMouseLeave={hide}
                disabled={disabled}
                style={{
                  padding: '11px 16px',
                  borderRadius: 16,
                  fontSize: 13,
                  fontWeight: 600,
                  cursor: disabled ? 'default' : 'pointer',
                  transition: 'all 0.18s ease',
                  ...(isSelected ? {
                    background: `linear-gradient(180deg, rgba(${hexToRgb(cat.color)},0.18) 0%, rgba(255,255,255,0.94) 100%)`,
                    border: `1.5px solid ${cat.color}`,
                    boxShadow: `0 10px 24px rgba(${hexToRgb(cat.color)},0.16), 0 0 0 4px rgba(${hexToRgb(cat.color)},0.08)`,
                    color: cat.color,
                    transform: 'translateY(-1px)',
                  } : {
                    background: 'rgba(255,255,255,0.78)',
                    border: '1.5px solid rgba(13,26,51,0.08)',
                    color: '#111827',
                    boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.72)',
                  }),
                }}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {selectedL1 && (
        <div className="anim-fadeSlideUp">
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 12,
            marginBottom: 10,
            flexWrap: 'wrap',
          }}>
            <div style={{
              fontSize: 11,
              fontWeight: 700,
              color: 'rgba(17,24,39,0.52)',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
            }}>
              Secondary diagnosis
            </div>
            <div style={{ fontSize: 11, color: 'rgba(17,24,39,0.54)' }}>
              Optional — refine if confident
            </div>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {l2Options.map((sub) => {
              const isSelected = selectedL2 === sub;
              const catColor = L1_CATEGORIES.find((cat) => cat.id === selectedL1)?.color || '#0A84FF';
              return (
                <button
                  key={sub}
                  onClick={() => !disabled && onSelectL2(sub)}
                  onMouseEnter={(e) => !disabled && showAfterDelay(sub, 'l2', catColor, e)}
                  onMouseLeave={hide}
                  disabled={disabled}
                  style={{
                    padding: '9px 14px',
                    borderRadius: 999,
                    fontSize: 12,
                    fontWeight: 600,
                    cursor: disabled ? 'default' : 'pointer',
                    transition: 'all 0.18s ease',
                    ...(isSelected ? {
                      background: `linear-gradient(180deg, rgba(${hexToRgb(catColor)},0.16) 0%, rgba(255,255,255,0.94) 100%)`,
                      border: `1.5px solid ${catColor}`,
                      color: catColor,
                      boxShadow: `0 8px 18px rgba(${hexToRgb(catColor)},0.14)`,
                    } : {
                      background: 'rgba(255,255,255,0.78)',
                      border: '1.5px solid rgba(13,26,51,0.08)',
                      color: 'rgba(17,24,39,0.66)',
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
