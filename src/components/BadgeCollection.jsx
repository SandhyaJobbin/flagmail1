import { BADGES } from '../hooks/useBadges.js';

export default function BadgeCollection({ earned }) {
  const all = Object.values(BADGES);
  const common = all.filter(b => !b.rare);
  const rare = all.filter(b => b.rare);

  function BadgeChip({ badge }) {
    const isEarned = earned.includes(badge.id);
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 6,
        padding: '14px 10px',
        borderRadius: 16,
        background: isEarned
          ? badge.rare ? 'rgba(255,214,10,0.12)' : 'rgba(10,132,255,0.08)'
          : 'rgba(0,0,0,0.04)',
        border: isEarned
          ? badge.rare ? '1.5px solid rgba(255,214,10,0.5)' : '1.5px solid rgba(10,132,255,0.3)'
          : '1.5px solid rgba(0,0,0,0.06)',
        opacity: isEarned ? 1 : 0.4,
        transition: 'all 0.3s ease',
        minWidth: 80,
        flex: '1 1 80px',
      }}>
        <span style={{ fontSize: 28, filter: isEarned ? 'none' : 'grayscale(1)' }}>
          {badge.icon}
        </span>
        <span style={{
          fontSize: 11,
          fontWeight: 600,
          color: isEarned ? (badge.rare ? '#B8860B' : '#0A84FF') : '#AEAEB2',
          textAlign: 'center',
          lineHeight: 1.3,
        }}>
          {badge.name}
        </span>
        {badge.rare && isEarned && (
          <span style={{
            fontSize: 9,
            fontWeight: 700,
            color: '#B8860B',
            letterSpacing: '0.06em',
          }}>
            RARE
          </span>
        )}
      </div>
    );
  }

  return (
    <div>
      <div style={{ fontSize: 11, fontWeight: 600, color: '#636366', letterSpacing: '0.08em', marginBottom: 12 }}>
        BADGES EARNED ({earned.length}/{all.length})
      </div>

      <div style={{ marginBottom: 14 }}>
        <div style={{ fontSize: 12, fontWeight: 600, color: '#AEAEB2', marginBottom: 8 }}>Common</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {common.map(b => <BadgeChip key={b.id} badge={b} />)}
        </div>
      </div>

      <div>
        <div style={{ fontSize: 12, fontWeight: 600, color: '#AEAEB2', marginBottom: 8 }}>Rare</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {rare.map(b => <BadgeChip key={b.id} badge={b} />)}
        </div>
      </div>
    </div>
  );
}
