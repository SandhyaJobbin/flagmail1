import { getProgressTitle } from '../utils/competency.js';

export default function RankCard({ player, finalScore, badgeCount }) {
  const title = getProgressTitle(finalScore);
  const maxScore = 100;
  const pct = Math.round((finalScore / maxScore) * 100);

  const titleColor = finalScore >= 80 ? '#FF3B30' : finalScore >= 50 ? '#FF9500' : '#34C759';

  return (
    <div style={{
      background: 'rgba(255,255,255,0.75)',
      backdropFilter: 'blur(24px) saturate(180%)',
      WebkitBackdropFilter: 'blur(24px) saturate(180%)',
      border: '1px solid rgba(255,255,255,0.8)',
      borderRadius: 20,
      boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
      padding: 28,
      textAlign: 'center',
      animation: 'rankGlow 1.2s ease-in-out',
    }} className="anim-rankGlow">
      {/* Flagmail badge */}
      <div style={{
        fontFamily: 'ui-monospace, "SF Mono", monospace',
        fontSize: 11,
        fontWeight: 600,
        color: '#AEAEB2',
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        marginBottom: 16,
      }}>
        Flagmail Assessment
      </div>

      {/* Avatar placeholder */}
      <div style={{
        width: 60,
        height: 60,
        borderRadius: '50%',
        background: `linear-gradient(135deg, ${titleColor}30, ${titleColor}10)`,
        border: `2px solid ${titleColor}40`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '0 auto 14px',
        fontSize: 24,
      }}>
        {finalScore >= 80 ? '🎯' : finalScore >= 50 ? '🛡' : '🔍'}
      </div>

      {/* Name */}
      <div style={{ fontSize: 20, fontWeight: 800, color: '#1C1C1E', marginBottom: 4 }}>
        {player.name}
      </div>

      {/* Title – stamp animation */}
      <div style={{
        display: 'inline-block',
        padding: '6px 16px',
        borderRadius: 20,
        background: `${titleColor}15`,
        border: `2px solid ${titleColor}`,
        fontSize: 14,
        fontWeight: 800,
        color: titleColor,
        letterSpacing: '0.04em',
        marginBottom: 20,
        animation: 'stampIn 0.3s ease forwards',
      }} className="anim-stampIn">
        {title}
      </div>

      {/* Score */}
      <div style={{ marginBottom: 16 }}>
        <div style={{ fontSize: 48, fontWeight: 800, color: '#1C1C1E', lineHeight: 1, letterSpacing: '-0.02em' }}>
          {finalScore}
        </div>
        <div style={{ fontSize: 14, color: '#636366' }}>out of {maxScore} points</div>
      </div>

      {/* Score bar */}
      <div style={{ height: 6, background: 'rgba(0,0,0,0.06)', borderRadius: 3, overflow: 'hidden', marginBottom: 16 }}>
        <div style={{
          height: '100%',
          width: `${pct}%`,
          background: `linear-gradient(90deg, ${titleColor}, ${titleColor}99)`,
          borderRadius: 3,
          transition: 'width 1s ease',
        }} />
      </div>

      {/* Badges */}
      <div style={{ fontSize: 13, color: '#636366' }}>
        {badgeCount} badge{badgeCount !== 1 ? 's' : ''} earned
      </div>

      {/* Watermark */}
      <div style={{
        marginTop: 20,
        paddingTop: 14,
        borderTop: '1px solid rgba(0,0,0,0.06)',
        fontFamily: 'ui-monospace, "SF Mono", monospace',
        fontSize: 10,
        color: '#AEAEB2',
        letterSpacing: '0.08em',
      }}>
        FLAGMAIL ASSESSMENT
      </div>
    </div>
  );
}
