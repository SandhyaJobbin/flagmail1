export default function ClueSystem({ clues, revealed, onReveal, disabled }) {
  const nextIndex = revealed.length;
  const hasMore = nextIndex < clues.length && !disabled;
  const remaining = clues.length - revealed.length;

  function handleHintClick() {
    if (hasMore) onReveal(nextIndex);
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>

      {/* Revealed hints as dialogue bubbles */}
      {revealed.map(i => (
        <div key={i} style={{
          display: 'flex',
          alignItems: 'flex-start',
          gap: 8,
          padding: '9px 13px',
          borderRadius: 12,
          background: 'rgba(255,214,10,0.13)',
          border: '1px solid rgba(255,214,10,0.40)',
          fontSize: 12.5,
          lineHeight: 1.55,
          color: '#7A5A00',
          fontWeight: 500,
          animation: 'fadeIn 0.25s ease',
        }}>
          <span style={{ fontSize: 14, flexShrink: 0, marginTop: 1 }}>💡</span>
          <span>{clues[i]}</span>
        </div>
      ))}

      {/* Hint button */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <button
          onClick={handleHintClick}
          disabled={!hasMore}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 7,
            padding: '8px 16px',
            borderRadius: 20,
            border: hasMore
              ? '1.5px solid rgba(10,132,255,0.45)'
              : '1.5px solid rgba(0,0,0,0.10)',
            background: hasMore
              ? 'rgba(10,132,255,0.09)'
              : 'rgba(0,0,0,0.04)',
            color: hasMore ? '#0A84FF' : '#AEAEB2',
            fontSize: 13,
            fontWeight: 600,
            fontFamily: 'inherit',
            cursor: hasMore ? 'pointer' : 'default',
            transition: 'all 0.18s ease',
          }}
          onMouseEnter={e => hasMore && (e.currentTarget.style.background = 'rgba(10,132,255,0.15)')}
          onMouseLeave={e => hasMore && (e.currentTarget.style.background = 'rgba(10,132,255,0.09)')}
        >
          <span style={{ fontSize: 13 }}>🔍</span>
          <span>Hint</span>
          {remaining > 0 && (
            <span style={{
              background: hasMore ? '#0A84FF' : '#C7C7CC',
              color: '#fff',
              borderRadius: 10,
              padding: '1px 8px',
              fontSize: 11,
              fontWeight: 700,
              minWidth: 20,
              textAlign: 'center',
            }}>
              {remaining}
            </span>
          )}
        </button>
        {hasMore && (
          <span style={{ fontSize: 11, color: '#AEAEB2', fontWeight: 500 }}>−1 pt each</span>
        )}
        {!hasMore && revealed.length === 0 && clues.length === 0 && null}
        {!hasMore && revealed.length > 0 && remaining === 0 && (
          <span style={{ fontSize: 11, color: '#AEAEB2' }}>All hints used</span>
        )}
      </div>
    </div>
  );
}
