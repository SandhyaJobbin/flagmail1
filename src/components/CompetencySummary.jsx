import { generateCompetency } from '../utils/competency.js';

export default function CompetencySummary({ categoryCorrect }) {
  const summary = generateCompetency(categoryCorrect);

  const categories = Object.entries(categoryCorrect)
    .filter(([, v]) => v.total > 0)
    .map(([cat, v]) => ({
      cat,
      accuracy: v.total > 0 ? Math.round((v.correct / v.total) * 100) : 0,
      correct: v.correct,
      total: v.total,
    }))
    .sort((a, b) => b.accuracy - a.accuracy);

  return (
    <div>
      <div style={{ fontSize: 11, fontWeight: 600, color: '#636366', letterSpacing: '0.08em', marginBottom: 12 }}>
        COMPETENCY SUMMARY
      </div>

      <p style={{
        fontSize: 14,
        color: '#1C1C1E',
        lineHeight: 1.7,
        margin: '0 0 16px',
        fontStyle: 'italic',
      }}>
        "{summary}"
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {categories.map(({ cat, accuracy, correct, total }) => {
          const barColor = accuracy >= 70 ? '#34C759' : accuracy >= 50 ? '#FF9500' : '#FF3B30';
          return (
            <div key={cat}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                <span style={{ fontSize: 12, fontWeight: 600, color: '#1C1C1E' }}>{cat}</span>
                <span style={{ fontSize: 12, color: '#636366' }}>{correct}/{total} correct · {accuracy}%</span>
              </div>
              <div style={{ height: 4, background: 'rgba(0,0,0,0.06)', borderRadius: 2, overflow: 'hidden' }}>
                <div style={{
                  height: '100%',
                  width: `${accuracy}%`,
                  background: barColor,
                  borderRadius: 2,
                  transition: 'width 0.8s ease',
                }} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
