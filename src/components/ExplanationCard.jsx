import { useState, useEffect } from 'react';
import EmailCard from './EmailCard.jsx';

const glass = {
  background: 'rgba(255,255,255,0.65)',
  backdropFilter: 'blur(24px) saturate(180%)',
  WebkitBackdropFilter: 'blur(24px) saturate(180%)',
  border: '1px solid rgba(255,255,255,0.8)',
  borderRadius: 20,
  boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
};

export default function ExplanationCard({ email, record, totalScore, onNext }) {
  const [showDelta, setShowDelta] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShowDelta(true), 300);
    return () => clearTimeout(t);
  }, []);

  const { l1Correct, timedOut, points, l1Points, l2Points, clueDeduction } = record;

  const verdict = timedOut && !l1Correct
    ? { label: '⏱ Timeout', color: '#FF9500', bg: 'rgba(255,149,0,0.1)' }
    : l1Correct
    ? { label: '✓ Correct', color: '#34C759', bg: 'rgba(52,199,89,0.1)' }
    : { label: '✗ Wrong', color: '#FF3B30', bg: 'rgba(255,59,48,0.1)' };

  const deltaStr = points > 0 ? `+${points}` : '0';

  function buildScoreBreak() {
    const parts = [];
    if (l1Points > 0) parts.push(`+${l1Points} L1`);
    if (l2Points > 0) parts.push(`+${l2Points} L2`);
    if (clueDeduction > 0) parts.push(`−${clueDeduction} clue${clueDeduction > 1 ? 's' : ''}`);
    if (parts.length === 0) parts.push('0 pts');
    return parts.join(' · ');
  }

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
      padding: '20px 16px',
    }}>
      <div style={{ maxWidth: 680, margin: '0 auto', width: '100%', boxSizing: 'border-box' }}>

        {/* Verdict banner */}
        <div style={{
          ...glass,
          padding: '16px 20px',
          marginBottom: 14,
          background: verdict.bg,
          border: `1px solid ${verdict.color}30`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }} className={l1Correct ? 'anim-stampIn' : 'anim-shake'}>
          <span style={{ fontSize: 18, fontWeight: 700, color: verdict.color }}>
            {verdict.label}
          </span>
          <div style={{ textAlign: 'right', position: 'relative' }}>
            <div style={{ fontSize: 24, fontWeight: 800, color: verdict.color }}>
              {deltaStr} pts
            </div>
            <div style={{ fontSize: 12, color: '#636366' }}>
              {buildScoreBreak()}
            </div>
            {showDelta && (
              <div style={{
                position: 'absolute',
                top: -20,
                right: 0,
                fontSize: 14,
                fontWeight: 700,
                color: verdict.color,
                animation: 'floatUp 0.8s ease forwards',
              }} className="anim-floatUp">
                {deltaStr}
              </div>
            )}
          </div>
        </div>

        {/* Email with highlight */}
        <div style={{ marginBottom: 14 }}>
          <EmailCard email={email} giveawayHighlight={true} />
        </div>

        {/* Explanation */}
        <div style={{ ...glass, padding: 20, marginBottom: 14, borderLeft: `3px solid #0A84FF` }}>
          <div style={{ fontSize: 11, fontWeight: 600, color: '#636366', letterSpacing: '0.08em', marginBottom: 8 }}>
            ANALYSIS
          </div>
          <div style={{ fontSize: 14, color: '#1C1C1E', lineHeight: 1.6, marginBottom: 16 }}>
            {email.explanation}
          </div>

          {/* Classification comparison */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>

            {/* L1 row — show if wrong or timed out without a selection */}
            {(!record.l1Correct && (record.selectedL1 || record.timedOut)) && (
              <div style={{
                borderRadius: 10,
                overflow: 'hidden',
                border: '1px solid rgba(255,59,48,0.35)',
              }}>
                {/* Header */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '7px 12px',
                  background: 'rgba(255,59,48,0.08)',
                }}>
                  <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', color: '#636366' }}>
                    CATEGORY (L1)
                  </span>
                  <span style={{ fontSize: 12, fontWeight: 700, color: '#FF3B30' }}>
                    {record.timedOut && !record.selectedL1 ? '⏱ No answer' : '✗ Wrong'}
                  </span>
                </div>
                {/* Rows */}
                <div style={{ padding: '8px 12px', display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: 12, color: '#8E8E93' }}>You selected</span>
                    <span style={{ fontSize: 13, fontWeight: 600, color: '#FF3B30' }}>
                      {record.selectedL1 || '— (timed out)'}
                    </span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: 12, color: '#8E8E93' }}>Correct answer</span>
                    <span style={{ fontSize: 13, fontWeight: 600, color: '#34C759' }}>
                      {record.correctL1}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* L2 row — show if L1 correct but L2 wrong or not selected due to timeout */}
            {(record.l1Correct && (record.timedOut || (record.selectedL2 && !record.l2Correct))) && (
              <div style={{
                borderRadius: 10,
                overflow: 'hidden',
                border: record.l2Correct
                  ? '1px solid rgba(52,199,89,0.35)'
                  : '1px solid rgba(255,59,48,0.35)',
              }}>
                {/* Header */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '7px 12px',
                  background: record.l2Correct
                    ? 'rgba(52,199,89,0.1)'
                    : 'rgba(255,59,48,0.08)',
                }}>
                  <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', color: '#636366' }}>
                    SUBCATEGORY (L2)
                  </span>
                  <span style={{ fontSize: 12, fontWeight: 700, color: '#FF3B30' }}>
                    {record.timedOut && !record.selectedL2 ? '⏱ No answer' : '✗ Wrong'}
                  </span>
                </div>
                {/* Rows */}
                <div style={{ padding: '8px 12px', display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: 12, color: '#8E8E93' }}>You selected</span>
                    <span style={{ fontSize: 13, fontWeight: 600, color: '#FF3B30' }}>
                      {record.selectedL2 || '— (timed out)'}
                    </span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: 12, color: '#8E8E93' }}>Correct answer</span>
                    <span style={{ fontSize: 13, fontWeight: 600, color: '#34C759' }}>
                      {record.correctL2}
                    </span>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>

        {/* Score total */}
        <div style={{ ...glass, padding: '12px 20px', marginBottom: 14, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: 13, color: '#636366', fontWeight: 500 }}>Running total</span>
          <span style={{ fontSize: 20, fontWeight: 800, color: '#1C1C1E' }}>{totalScore} pts</span>
        </div>

        {/* Next button */}
        <button
          onClick={onNext}
          style={{
            width: '100%',
            padding: '15px',
            borderRadius: 12,
            border: 'none',
            background: '#0A84FF',
            color: '#fff',
            fontSize: 15,
            fontWeight: 700,
            cursor: 'pointer',
            fontFamily: 'inherit',
          }}
          onMouseEnter={e => e.target.style.opacity = '0.88'}
          onMouseLeave={e => e.target.style.opacity = '1'}
        >
          Next Email →
        </button>
      </div>
    </div>
  );
}
