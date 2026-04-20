function getInitials(from) {
  // Extract display name before the email address
  const match = from.match(/^([^<@]+)/);
  const name = match ? match[1].trim() : from;
  const parts = name.split(/\s+/);
  if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
  return name.slice(0, 2).toUpperCase();
}

function getSenderName(from) {
  const nameMatch = from.match(/^([^<]+)</) ;
  if (nameMatch) return nameMatch[1].trim();
  const atIdx = from.indexOf('@');
  if (atIdx !== -1) return from.slice(0, atIdx);
  return from;
}

function getSenderEmail(from) {
  const match = from.match(/<([^>]+)>/);
  return match ? match[1] : from;
}

// Deterministic avatar color based on sender string
function avatarColor(from) {
  const colors = ['#0A84FF', '#34C759', '#FF9500', '#FF3B30', '#AF52DE', '#5AC8FA', '#FF2D55'];
  let hash = 0;
  for (let i = 0; i < from.length; i++) hash = from.charCodeAt(i) + ((hash << 5) - hash);
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

  const initials = getInitials(email.from);
  const senderName = getSenderName(email.from);
  const senderEmail = getSenderEmail(email.from);
  const color = avatarColor(email.from);

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
        borderBottom: '0.5px solid rgba(0,0,0,0.1)',
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
                {senderName}
              </span>
              <span style={{ fontSize: 12, color: '#AEAEB2', flexShrink: 0 }}>
                {`Today at ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`}
              </span>
            </div>

            <div style={{
              fontSize: 12,
              color: 'rgba(60,60,67,0.55)',
              marginTop: 1,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}>
              {senderEmail}
            </div>

            <div style={{
              fontSize: 15,
              color: '#1C1C1E',
              marginTop: 6,
              fontWeight: 600,
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

      {/* ── Body ── */}
      <div style={{
        padding: '18px 20px 20px',
        fontSize: 15,
        color: '#3A3A3C',
        lineHeight: 1.65,
        whiteSpace: 'pre-wrap',
        background: '#FFFFFF',
      }}>
        {renderBody(email.body, email.giveawayPhrase, giveawayHighlight)}
      </div>
    </div>
  );
}
