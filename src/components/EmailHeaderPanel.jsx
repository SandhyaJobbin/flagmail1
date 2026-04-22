import { useState } from 'react';

const AUTH_COLOR = { Pass: '#34C759', Fail: '#FF3B30', None: '#AEAEB2' };

export default function EmailHeaderPanel({ email }) {
  const [open, setOpen] = useState(false);

  const { fromName, sender, replyTo, subject, auth = {}, originIp } = email;

  const rows = [
    { label: 'From',      value: fromName || '—' },
    { label: 'Sender',    value: sender   || email.from || '—', mono: true },
    { label: 'Reply-To',  value: replyTo  || sender || '—',     mono: true },
    { label: 'Subject',   value: subject  || '—' },
    { label: 'Origin IP', value: originIp || '—', mono: true },
  ];

  return (
    <div style={{ borderBottom: '1px solid rgba(0,0,0,0.06)', background: '#F9F9FB' }}>
      {/* Toggle row */}
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          width: '100%',
          padding: '8px 20px',
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          fontFamily: 'inherit',
          textAlign: 'left',
        }}
      >
        <span style={{ fontSize: 11, color: '#8E8E93' }}>ℹ</span>
        <span style={{ fontSize: 11, fontWeight: 600, color: '#8E8E93', letterSpacing: '0.04em' }}>
          Email Headers
        </span>
        <span style={{
          marginLeft: 'auto',
          fontSize: 10,
          color: '#AEAEB2',
          transform: open ? 'rotate(180deg)' : 'none',
          transition: 'transform 0.2s',
          display: 'inline-block',
        }}>
          ▾
        </span>
      </button>

      {/* Expanded panel */}
      {open && (
        <div style={{ padding: '0 20px 12px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
            {rows.map(({ label, value, mono }) => (
              <div key={label} style={{ display: 'flex', gap: 8, alignItems: 'baseline' }}>
                <span style={{
                  fontSize: 11,
                  color: '#AEAEB2',
                  fontWeight: 500,
                  width: 64,
                  flexShrink: 0,
                }}>
                  {label}:
                </span>
                <span style={{
                  fontSize: 11,
                  color: '#3A3A3C',
                  fontFamily: mono ? 'ui-monospace, "SF Mono", monospace' : 'inherit',
                  wordBreak: 'break-all',
                }}>
                  {value}
                </span>
              </div>
            ))}

            {/* Auth row */}
            <div style={{ display: 'flex', gap: 8, alignItems: 'baseline' }}>
              <span style={{ fontSize: 11, color: '#AEAEB2', fontWeight: 500, width: 64, flexShrink: 0 }}>
                Auth:
              </span>
              <div style={{ display: 'flex', gap: 8 }}>
                {['spf', 'dkim', 'dmarc'].map(key => (
                  <span key={key} style={{ fontSize: 11 }}>
                    <span style={{ color: '#AEAEB2', textTransform: 'uppercase' }}>{key}: </span>
                    <span style={{
                      fontWeight: 700,
                      color: AUTH_COLOR[auth[key]] || AUTH_COLOR.None,
                    }}>
                      {auth[key] || 'None'}
                    </span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
