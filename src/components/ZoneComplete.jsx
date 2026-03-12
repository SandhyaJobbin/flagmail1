function CategoryBreakdown({ zoneEmails }) {
  // Group by correct L1 category
  const catMap = {};
  zoneEmails.forEach(r => {
    const cat = r.correctL1;
    if (!catMap[cat]) catMap[cat] = { correct: 0, total: 0, missed: {} };
    catMap[cat].total++;
    if (r.l1Correct) {
      catMap[cat].correct++;
    } else if (r.selectedL1) {
      catMap[cat].missed[r.selectedL1] = (catMap[cat].missed[r.selectedL1] || 0) + 1;
    }
  });

  const breakdown = Object.entries(catMap)
    .map(([cat, v]) => ({
      cat,
      accuracy: Math.round((v.correct / v.total) * 100),
      correct: v.correct,
      total: v.total,
      topMiss: Object.entries(v.missed).sort((a, b) => b[1] - a[1])[0]?.[0] || null,
    }))
    .sort((a, b) => b.accuracy - a.accuracy);

  const focusAreas = breakdown.filter(c => c.accuracy < 50);

  if (breakdown.length === 0) return null;

  return (
    <div style={{ marginBottom: 24, textAlign: 'left' }}>
      {/* Category accuracy bars */}
      <div style={{
        fontSize: 10, fontWeight: 700, color: 'rgba(60,60,67,0.45)',
        letterSpacing: '0.08em', marginBottom: 10,
      }}>
        CATEGORY BREAKDOWN
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: focusAreas.length ? 20 : 0 }}>
        {breakdown.map(({ cat, accuracy, correct, total, topMiss }, i) => {
          const barColor = accuracy >= 70 ? '#34C759' : accuracy >= 50 ? '#FF9500' : '#FF3B30';
          return (
            <div key={cat} style={{
              animation: `staggerFadeIn 0.3s ease ${i * 70}ms forwards`,
              opacity: 0,
            }} className="anim-staggerFadeIn">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 4 }}>
                <span style={{ fontSize: 12, fontWeight: 600, color: '#1C1C1E' }}>{cat}</span>
                <span style={{ fontSize: 12, fontWeight: 700, color: barColor }}>
                  {correct}/{total} · {accuracy}%
                </span>
              </div>
              <div style={{ height: 5, background: 'rgba(0,0,0,0.06)', borderRadius: 3, overflow: 'hidden', marginBottom: topMiss ? 4 : 0 }}>
                <div style={{
                  height: '100%', width: `${accuracy}%`,
                  background: barColor, borderRadius: 3,
                  transition: 'width 0.8s ease',
                }} />
              </div>
              {topMiss && (
                <div style={{ fontSize: 11, color: '#AEAEB2' }}>
                  Tagged as <span style={{ color: '#FF3B30', fontWeight: 600 }}>{topMiss}</span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Focus areas */}
      {focusAreas.length > 0 && (
        <div style={{
          background: 'rgba(255,59,48,0.06)',
          border: '1px solid rgba(255,59,48,0.18)',
          borderRadius: 12,
          padding: '12px 14px',
        }}>
          <div style={{
            fontSize: 10, fontWeight: 700, color: '#FF3B30',
            letterSpacing: '0.08em', marginBottom: 8,
          }}>
            STUDY UP ON
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {focusAreas.map(({ cat, accuracy }) => (
              <div key={cat} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: 13 }}>📖</span>
                <div>
                  <span style={{ fontSize: 12, fontWeight: 600, color: '#1C1C1E' }}>{cat}</span>
                  <span style={{ fontSize: 11, color: '#8E8E93', marginLeft: 6 }}>{accuracy}% accuracy — needs work</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

const glass = {
  background: 'rgba(255,255,255,0.65)',
  backdropFilter: 'blur(24px) saturate(180%)',
  WebkitBackdropFilter: 'blur(24px) saturate(180%)',
  border: '1px solid rgba(255,255,255,0.8)',
  borderRadius: 20,
  boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
};

const ZONE_META = {
  1: { color: '#34C759', next: 'Zone 2 – Shadow Inbox' },
  2: { color: '#FF9500', next: 'Zone 3 – Zero-Day Vault' },
  3: { color: '#FF3B30', next: 'Final Results' },
};

export default function ZoneComplete({ zone, zoneScore, maxZoneScore, zoneEmails, earlyUnlocked, consecutivePerfect, onContinue }) {
  const meta = ZONE_META[zone];
  const accuracy = zoneEmails.length > 0
    ? Math.round((zoneEmails.filter(r => r.l1Correct).length / zoneEmails.length) * 100)
    : 0;
  const wrongCount = zoneEmails.filter(r => !r.l1Correct).length;
  const isLast = zone === 3;

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px 16px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
    }}>
      <div style={{ width: '100%', maxWidth: 480 }}>

        {/* Early unlock badge */}
        {earlyUnlocked && !isLast && (
          <div style={{
            ...glass,
            padding: '12px 20px',
            marginBottom: 16,
            borderLeft: '3px solid #FFD60A',
            display: 'flex',
            alignItems: 'center',
            gap: 10,
          }}>
            <div style={{ position: 'relative' }}>
              <div style={{
                position: 'absolute',
                inset: -6,
                borderRadius: '50%',
                border: '2px solid #FFD60A',
                animation: 'burstRing 0.6s ease-out forwards',
              }} className="anim-burstRing" />
              <span style={{ fontSize: 20 }}>⚡</span>
            </div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#B8860B' }}>EARLY UNLOCK!</div>
              <div style={{ fontSize: 12, color: '#636366' }}>
                {consecutivePerfect} consecutive perfect scores – next zone unlocked early!
              </div>
            </div>
          </div>
        )}

        <div style={{ ...glass, padding: 36, textAlign: 'center' }}>
          {/* Zone icon */}
          <div style={{ fontSize: 40, marginBottom: 12 }}>
            {wrongCount === 0 ? '🏆' : zone === 3 ? '🎯' : '✅'}
          </div>

          <div style={{
            display: 'inline-block',
            fontSize: 12,
            fontWeight: 700,
            color: meta.color,
            letterSpacing: '0.08em',
            marginBottom: 8,
          }}>
            ZONE {zone} COMPLETE
          </div>

          <h2 style={{ fontSize: 28, fontWeight: 800, color: '#1C1C1E', margin: '0 0 24px', letterSpacing: '-0.01em' }}>
            {wrongCount === 0 ? 'Flawless!' : 'Zone cleared'}
          </h2>

          {/* Stats row */}
          <div style={{ display: 'flex', gap: 12, marginBottom: 28 }}>
            {[
              { label: 'Score', value: `${zoneScore}/${maxZoneScore}` },
              { label: 'Accuracy', value: `${accuracy}%` },
              { label: 'Wrong', value: wrongCount },
            ].map(s => (
              <div key={s.label} style={{
                flex: 1,
                background: 'rgba(0,0,0,0.04)',
                borderRadius: 12,
                padding: '14px 8px',
              }}>
                <div style={{ fontSize: 22, fontWeight: 700, color: '#1C1C1E' }}>{s.value}</div>
                <div style={{ fontSize: 11, color: '#636366', marginTop: 2 }}>{s.label}</div>
              </div>
            ))}
          </div>

          {/* Category breakdown */}
          <CategoryBreakdown zoneEmails={zoneEmails} />


          <button
            onClick={onContinue}
            style={{
              width: '100%',
              padding: '15px',
              borderRadius: 12,
              border: 'none',
              background: isLast ? '#1C1C1E' : meta.color,
              color: '#fff',
              fontSize: 15,
              fontWeight: 700,
              cursor: 'pointer',
              fontFamily: 'inherit',
            }}
            onMouseEnter={e => e.target.style.opacity = '0.88'}
            onMouseLeave={e => e.target.style.opacity = '1'}
          >
            {isLast ? 'View Results →' : `Continue to ${meta.next} →`}
          </button>
        </div>
      </div>
    </div>
  );
}
