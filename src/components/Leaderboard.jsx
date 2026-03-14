import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import anime from 'animejs';
import { getProgressTitle } from '../utils/competency.js';

const glass = {
  background: 'rgba(255,255,255,0.65)',
  backdropFilter: 'blur(24px) saturate(180%)',
  WebkitBackdropFilter: 'blur(24px) saturate(180%)',
  border: '1px solid rgba(255,255,255,0.8)',
  borderRadius: 20,
  boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
};

// Medal emoji refs for bounce animation
function MedalCell({ rank, isMe }) {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current || rank > 2) return;
    anime({
      targets: ref.current,
      scale: [0.4, 1.25, 0.9, 1.08, 1],
      opacity: [0, 1],
      duration: 700,
      delay: rank * 80,
      easing: 'easeOutElastic(1, 0.6)',
    });
  }, [rank]);

  const medals = ['🥇', '🥈', '🥉'];
  const colors = ['#FFD60A', '#AEAEB2', '#CD7F32'];

  if (rank <= 2) {
    return (
      <div
        ref={ref}
        style={{
          fontSize: 18,
          display: 'inline-block',
          opacity: 0, // anime will set it
        }}
      >
        {medals[rank]}
      </div>
    );
  }

  return (
    <div style={{
      fontSize: 14,
      fontWeight: 700,
      color: '#AEAEB2',
    }}>
      {rank + 1}
    </div>
  );
}

export default function Leaderboard({ playerName, playerScore, entries, loading, error, onFetch, onBack }) {
  const rowsRef = useRef(null);

  useEffect(() => {
    onFetch();
  }, []);

  // Stagger rows once entries arrive
  useEffect(() => {
    if (!entries || entries.length === 0) return;
    // Small delay so rows have rendered
    const t = setTimeout(() => {
      const rows = document.querySelectorAll('.lb-row');
      if (!rows.length) return;
      anime({
        targets: rows,
        translateX: [-32, 0],
        opacity: [0, 1],
        duration: 380,
        delay: anime.stagger(45),
        easing: 'easeOutQuart',
      });
    }, 80);
    return () => clearTimeout(t);
  }, [entries]);

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
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}
      >
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
        <div style={{ fontSize: 12, color: '#AEAEB2', fontWeight: 500 }}>All Time</div>
      </motion.div>

      {loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{ ...glass, padding: 40, textAlign: 'center' }}
        >
          <div style={{ fontSize: 32, marginBottom: 12 }}>⏳</div>
          <div style={{ fontSize: 14, color: '#636366' }}>Fetching leaderboard…</div>
        </motion.div>
      )}

      {error && (
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          style={{ ...glass, padding: 24, textAlign: 'center', borderLeft: '3px solid #FF3B30' }}
        >
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
        </motion.div>
      )}

      {!loading && !error && entries.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 260, damping: 22 }}
          style={{ ...glass, padding: 40, textAlign: 'center' }}
        >
          <div style={{ fontSize: 32, marginBottom: 12 }}>📋</div>
          <div style={{ fontSize: 15, fontWeight: 600, color: '#1C1C1E', marginBottom: 6 }}>
            No scores yet — be the first!
          </div>
          <div style={{ fontSize: 13, color: '#636366' }}>
            Complete the game to claim the top spot.
          </div>
        </motion.div>
      )}

      {!loading && !error && entries.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 240, damping: 22 }}
          style={{ ...glass, overflow: 'hidden' }}
          ref={rowsRef}
        >
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
              <div
                key={i}
                className="lb-row"
                style={{
                  display: 'grid',
                  gridTemplateColumns: '40px 1fr 80px 100px',
                  padding: '14px 20px',
                  borderBottom: i < entries.length - 1 ? '1px solid rgba(0,0,0,0.05)' : 'none',
                  background: isMe ? 'rgba(10,132,255,0.06)' : 'transparent',
                  opacity: 0, // anime will set it
                  alignItems: 'center',
                }}
              >
                <MedalCell rank={i} isMe={isMe} />

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

                <div style={{ fontSize: 11, color: '#AEAEB2', textAlign: 'right' }}>
                  {entry.date ? new Date(entry.date).toLocaleDateString() : '—'}
                </div>
              </div>
            );
          })}
        </motion.div>
      )}
    </div>
  );
}
