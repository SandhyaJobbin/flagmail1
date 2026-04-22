import EmailHeaderPanel from './EmailHeaderPanel.jsx';

function getInitials(name) {
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
  return name.slice(0, 2).toUpperCase();
}

// Deterministic avatar color based on sender string
function avatarColor(str) {
  const colors = ['#0A84FF', '#34C759', '#FF9500', '#FF3B30', '#AF52DE', '#5AC8FA', '#FF2D55'];
  let hash = 0;
  for (let i = 0; i < str.length; i++) hash = str.charCodeAt(i) + ((hash << 5) - hash);
  return colors[Math.abs(hash) % colors.length];
}

export default function EmailCard({ email, giveawayHighlight = false }) {
  if (!email) return null;

  function renderBody(body, phrase, highlight) {
    if (!highlight || !phrase) return body;
    const idx = body.toLowerCase().indexOf(phrase.toLowerCase());
    if (idx === -1) return body;
    return (
      <>
        {body.slice(0, idx)}
        <mark style={{
          background: 'rgba(255,214,10,0.35)',
          borderRadius: 3,
          padding: '1px 2px',
          color: '#7A5F00',
          fontWeight: 600,
        }} className="anim-glowPulse">
          {body.slice(idx, idx + phrase.length)}
        </mark>
        {body.slice(idx + phrase.length)}
      </>
    );
  }

  const displayName = email.fromName || email.from;
  const displayEmail = email.sender || email.from;
  const initials = getInitials(displayName);
  const color = avatarColor(displayName);

  return (
    <div className="anim-envelopeOpen" style={{
      background: '#FFFFFF',
      border: '1px solid rgba(0,0,0,0.09)',
      borderRadius: 16,
      boxShadow: '0 2px 12px rgba(0,0,0,0.07), 0 1px 3px rgba(0,0,0,0.05)',
      overflow: 'hidden',
    }}>
      {/* ── Mail Header ── */}
      <div style={{
        padding: '16px 20px 14px',
        borderBottom: '1px solid rgba(0,0,0,0.07)',
        background: '#FAFAFA',
      }}>
        <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>

          {/* Avatar */}
          <div style={{
            width: 40,
            height: 40,
            borderRadius: '50%',
            background: color,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            fontWeight: 700,
            fontSize: 15,
            color: '#fff',
            letterSpacing: '-0.01em',
          }}>
            {initials}
          </div>

          {/* Sender + subject */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 8 }}>
              <span style={{
                fontSize: 14,
                fontWeight: 600,
                color: '#1C1C1E',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}>
                {displayName}
              </span>
              <span style={{ fontSize: 12, color: '#AEAEB2', flexShrink: 0 }}>
                {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>

            <div style={{
              fontSize: 12,
              color: '#8E8E93',
              marginTop: 1,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              fontFamily: 'ui-monospace, "SF Mono", monospace',
            }}>
              {displayEmail}
            </div>

            <div style={{
              fontSize: 13,
              color: '#3A3A3C',
              marginTop: 6,
              fontWeight: 500,
            }}>
              {email.subject}
            </div>
          </div>
        </div>
      </div>

      {/* ── To field ── */}
      <div style={{
        padding: '8px 20px',
        borderBottom: '1px solid rgba(0,0,0,0.05)',
        background: '#FAFAFA',
        display: 'flex',
        gap: 4,
        alignItems: 'center',
      }}>
        <span style={{ fontSize: 12, color: '#AEAEB2', fontWeight: 500 }}>To:</span>
        <span style={{ fontSize: 12, color: '#636366' }}>Security Analyst (You)</span>
      </div>

      {/* ── Email Header Panel ── */}
      <EmailHeaderPanel email={email} />

      {/* ── User Context bar ── */}
      {email.userContext && (
        <div style={{
          padding: '8px 20px',
          background: 'rgba(0,0,0,0.03)',
          borderBottom: '1px solid rgba(0,0,0,0.05)',
          display: 'flex',
          gap: 6,
          alignItems: 'flex-start',
        }}>
          <span style={{ fontSize: 12, color: '#636366', flexShrink: 0 }}>ℹ</span>
          <span style={{ fontSize: 12, color: '#3A3A3C', lineHeight: 1.5 }}>
            {email.userContext}
          </span>
        </div>
      )}

      {/* ── Body ── */}
      <div style={{
        padding: '18px 20px 20px',
        fontSize: 14,
        color: '#1C1C1E',
        lineHeight: 1.7,
        whiteSpace: 'pre-wrap',
        background: '#FFFFFF',
      }}>
        {renderBody(email.body, email.giveawayPhrase, giveawayHighlight)}
      </div>
    </div>
  );
}
