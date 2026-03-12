import { useEffect } from 'react';
import { getProgressTitle } from '../utils/competency.js';

const glass = {
  background: 'rgba(255,255,255,0.65)',
  backdropFilter: 'blur(24px) saturate(180%)',
  WebkitBackdropFilter: 'blur(24px) saturate(180%)',
  border: '1px solid rgba(255,255,255,0.8)',
  borderRadius: 20,
  boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
};

export default function Leaderboard({ playerName, playerScore, entries, loading, error, onFetch, onBack }) {
  useEffect(() => {
    onFetch();
  }, []);

  return (
    <div style={{
      minHeight: '100vh',
      padding: '24px 16px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
      maxWidth: 640,
      margin: '0 auto',
      boxSizing: 'border-box',
    }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
        <button onClick={onBack} style={{
          padding: '8px 14px',
          borderRadius: 20,
          border: '1.5px solid rgba(0,0,0,0.1)',
          background: 'rgba(255,255,255,0.7)',
          fontSize: 13,
          fontWeight: 600,
          color: '#636366',
          cursor: 'pointer',
          fontFamily: 'inherit',
        }}>
          ← Back
        </button>
        <h2 style={{ fontSize: 20, fontWeight: 800, color: '#1C1C1E', margin: 0 }}>
          Global Leaderboard
        </h2>
        <div style={{ fontSize: 12, color: '#AEAEB2', fontWeight: 500 }}>This Week</div>
      </div>

      {loading && (
        <div style={{ ...glass, padding: 40, textAlign: 'center' }}>
          <div style={{ fontSize: 32, marginBottom: 12 }}>⏳</div>
          <div style={{ fontSize: 14, color: '#636366' }}>Fetching leaderboard…</div>
        </div>
      )}

      {error && (
        <div style={{ ...glass, padding: 24, textAlign: 'center', borderLeft: '3px solid #FF3B30' }}>
          <div style={{ fontSize: 14, color: '#FF3B30', marginBottom: 12 }}>{error}</div>
          <button onClick={onFetch} style={{
            padding: '8px 20px',
            borderRadius: 20,
            border: 'none',
            background: '#0A84FF',
            color: '#fff',
            fontSize: 13,
            fontWeight: 600,
            cursor: 'pointer',
            fontFamily: 'inherit',
          }}>
            Retry
          </button>
        </div>
      )}

      {!loading && !error && entries.length === 0 && (
        <div style={{ ...glass, padding: 40, textAlign: 'center' }}>
          <div style={{ fontSize: 32, marginBottom: 12 }}>📋</div>
          <div style={{ fontSize: 14, color: '#636366' }}>
            No leaderboard data yet. Configure the Google Apps Script URL in config.js to enable this feature.
          </div>
        </div>
      )}

      {!loading && !error && entries.length > 0 && (
        <div style={{ ...glass, overflow: 'hidden' }}>
          {/* Column headers */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '40px 1fr 80px 100px',
            padding: '12px 20px',
            borderBottom: '1px solid rgba(0,0,0,0.06)',
            fontSize: 11,
            fontWeight: 600,
            color: '#AEAEB2',
            letterSpacing: '0.06em',
          }}>
            <div>#</div>
            <div>Analyst</div>
            <div style={{ textAlign: 'right' }}>Score</div>
            <div style={{ textAlign: 'right' }}>Date</div>
          </div>

          {entries.map((entry, i) => {
            const isMe = entry.name === playerName && entry.score === playerScore;
            return (
              <div key={i} style={{
                display: 'grid',
                gridTemplateColumns: '40px 1fr 80px 100px',
                padding: '14px 20px',
                borderBottom: i < entries.length - 1 ? '1px solid rgba(0,0,0,0.05)' : 'none',
                background: isMe ? 'rgba(10,132,255,0.06)' : 'transparent',
                animation: `slideInFromLeft 0.4s ease ${i * 40}ms forwards`,
                opacity: 0,
              }} className="anim-slideInLeft">
                <div style={{
                  fontSize: 14,
                  fontWeight: 700,
                  color: i === 0 ? '#FFD60A' : i === 1 ? '#AEAEB2' : i === 2 ? '#CD7F32' : '#AEAEB2',
                }}>
                  {i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : `${i + 1}`}
                </div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: isMe ? 700 : 500, color: isMe ? '#0A84FF' : '#1C1C1E' }}>
                    {entry.name} {isMe && '(You)'}
                  </div>
                  <div style={{ fontSize: 11, color: '#AEAEB2' }}>
                    {entry.title || getProgressTitle(entry.score)}
                  </div>
                </div>
                <div style={{ fontSize: 16, fontWeight: 800, color: '#1C1C1E', textAlign: 'right' }}>
                  {entry.score}
                </div>
                <div style={{ fontSize: 11, color: '#AEAEB2', textAlign: 'right', alignSelf: 'center' }}>
                  {entry.date ? new Date(entry.date).toLocaleDateString() : '—'}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
