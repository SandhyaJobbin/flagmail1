import RankCard from './RankCard.jsx';
import BadgeCollection from './BadgeCollection.jsx';
import CompetencySummary from './CompetencySummary.jsx';
import { getProgressTitle } from '../utils/competency.js';

const glass = {
  background: 'rgba(255,255,255,0.65)',
  backdropFilter: 'blur(24px) saturate(180%)',
  WebkitBackdropFilter: 'blur(24px) saturate(180%)',
  border: '1px solid rgba(255,255,255,0.8)',
  borderRadius: 20,
  boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
};

export default function ResultsScreen({
  player,
  finalScore,
  zoneScores,
  categoryCorrect,
  earned,
  perEmail,
  onLeaderboard,
  onPlayAgain,
}) {
  const title = getProgressTitle(finalScore);
  const zone1Emails = perEmail.filter(r => r.zone === 1);
  const zone2Emails = perEmail.filter(r => r.zone === 2);
  const zone3Emails = perEmail.filter(r => r.zone === 3);

  const zoneAcc = (emails) =>
    emails.length > 0
      ? Math.round((emails.filter(r => r.l1Correct).length / emails.length) * 100)
      : 0;

  return (
    <div style={{
      minHeight: '100vh',
      padding: '24px 16px 40px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
      maxWidth: 640,
      margin: '0 auto',
      boxSizing: 'border-box',
    }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: 24 }}>
        <div style={{
          fontFamily: 'ui-monospace, "SF Mono", monospace',
          fontSize: 11,
          fontWeight: 600,
          color: '#AEAEB2',
          letterSpacing: '0.12em',
          marginBottom: 6,
        }}>
          MISSION COMPLETE
        </div>
        <h1 style={{ fontSize: 32, fontWeight: 800, color: '#1C1C1E', margin: 0, letterSpacing: '-0.02em' }}>
          Analyst Report
        </h1>
      </div>

      {/* Rank card */}
      <div style={{ marginBottom: 16 }}>
        <RankCard player={player} finalScore={finalScore} badgeCount={earned.length} />
      </div>

      {/* Zone breakdown */}
      <div style={{ ...glass, padding: 20, marginBottom: 16 }}>
        <div style={{ fontSize: 11, fontWeight: 600, color: '#636366', letterSpacing: '0.08em', marginBottom: 12 }}>
          ZONE BREAKDOWN
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          {[
            { zone: 1, score: zoneScores[1], max: 40, acc: zoneAcc(zone1Emails), color: '#34C759' },
            { zone: 2, score: zoneScores[2], max: 40, acc: zoneAcc(zone2Emails), color: '#FF9500' },
            { zone: 3, score: zoneScores[3], max: 20, acc: zoneAcc(zone3Emails), color: '#FF3B30' },
          ].map(z => (
            <div key={z.zone} style={{
              flex: 1,
              background: 'rgba(0,0,0,0.04)',
              borderRadius: 12,
              padding: '14px 10px',
              textAlign: 'center',
              borderTop: `3px solid ${z.color}`,
            }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: z.color, marginBottom: 4 }}>
                ZONE {z.zone}
              </div>
              <div style={{ fontSize: 20, fontWeight: 800, color: '#1C1C1E' }}>
                {z.score}/{z.max}
              </div>
              <div style={{ fontSize: 11, color: '#636366' }}>{z.acc}% accuracy</div>
            </div>
          ))}
        </div>
      </div>

      {/* Competency summary */}
      <div style={{ ...glass, padding: 20, marginBottom: 16 }}>
        <CompetencySummary categoryCorrect={categoryCorrect} />
      </div>

      {/* Badge collection */}
      <div style={{ ...glass, padding: 20, marginBottom: 24 }}>
        <BadgeCollection earned={earned} />
      </div>

      {/* CTA row */}
      <div style={{ display: 'flex', gap: 12 }}>
        <button
          onClick={onLeaderboard}
          style={{
            flex: 1,
            padding: '14px',
            borderRadius: 12,
            border: '1.5px solid rgba(0,0,0,0.1)',
            background: 'rgba(255,255,255,0.7)',
            color: '#1C1C1E',
            fontSize: 14,
            fontWeight: 600,
            cursor: 'pointer',
            fontFamily: 'inherit',
          }}
        >
          View Leaderboard
        </button>
        <button
          onClick={onPlayAgain}
          style={{
            flex: 2,
            padding: '14px',
            borderRadius: 12,
            border: 'none',
            background: '#0A84FF',
            color: '#fff',
            fontSize: 14,
            fontWeight: 700,
            cursor: 'pointer',
            fontFamily: 'inherit',
          }}
          onMouseEnter={e => e.target.style.opacity = '0.88'}
          onMouseLeave={e => e.target.style.opacity = '1'}
        >
          Play Again →
        </button>
      </div>
    </div>
  );
}
