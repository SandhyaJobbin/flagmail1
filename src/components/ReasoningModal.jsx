import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ReasoningModal({ email, l1WasCorrect, onComplete }) {
  const [selected, setSelected] = useState(null);
  const [showPlus, setShowPlus] = useState(false);

  const question = l1WasCorrect
    ? (email.reasoningQuestion || `Why is this "${email.level1}"?`)
    : `The correct category was "${email.level1}". Why?`;

  const options = email.reasoningOptions || [];

  function handleConfirm() {
    if (selected === null) return;
    const correct = selected === email.correctReason;
    if (correct) {
      setShowPlus(true);
      setTimeout(() => onComplete({ skipped: false, selectedIndex: selected, correct }), 600);
    } else {
      onComplete({ skipped: false, selectedIndex: selected, correct });
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.15 }}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1500,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'rgba(0,0,0,0.55)',
        backdropFilter: 'blur(4px)',
        WebkitBackdropFilter: 'blur(4px)',
        padding: '24px 16px',
      }}
    >
      <motion.div
        initial={{ scale: 0.92, opacity: 0, y: 16 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.94, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 380, damping: 28 }}
        style={{
          background: '#FFFFFF',
          borderRadius: 20,
          boxShadow: '0 24px 64px rgba(0,0,0,0.22)',
          padding: '28px 24px 24px',
          width: '100%',
          maxWidth: 480,
          position: 'relative',
        }}
      >
        {/* +1 flash */}
        <AnimatePresence>
          {showPlus && (
            <motion.div
              initial={{ opacity: 1, y: 0, scale: 1 }}
              animate={{ opacity: 0, y: -28, scale: 1.3 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              style={{
                position: 'absolute',
                top: 16,
                right: 24,
                fontSize: 22,
                fontWeight: 800,
                color: '#34C759',
                pointerEvents: 'none',
              }}
            >
              +1
            </motion.div>
          )}
        </AnimatePresence>

        {/* Label */}
        <div style={{
          fontSize: 10,
          fontWeight: 700,
          letterSpacing: '0.1em',
          color: '#AEAEB2',
          marginBottom: 10,
        }}>
          REASONING CHECK · +1 PT
        </div>

        {/* Question */}
        <div style={{
          fontSize: 16,
          fontWeight: 700,
          color: '#1C1C1E',
          lineHeight: 1.4,
          marginBottom: 20,
        }}>
          {question}
        </div>

        {/* Options */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
          {options.map((opt, i) => {
            const isSelected = selected === i;
            return (
              <button
                key={i}
                onClick={() => setSelected(i)}
                style={{
                  width: '100%',
                  textAlign: 'left',
                  padding: '12px 14px',
                  borderRadius: 12,
                  border: isSelected
                    ? '2px solid #0A84FF'
                    : '1.5px solid rgba(0,0,0,0.10)',
                  background: isSelected ? 'rgba(10,132,255,0.07)' : '#FAFAFA',
                  fontSize: 14,
                  color: '#1C1C1E',
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                  fontWeight: isSelected ? 600 : 400,
                  transition: 'all 0.12s',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                }}
              >
                <span style={{
                  width: 18,
                  height: 18,
                  borderRadius: '50%',
                  border: isSelected ? '5px solid #0A84FF' : '1.5px solid #C7C7CC',
                  flexShrink: 0,
                  transition: 'all 0.12s',
                }} />
                {opt}
              </button>
            );
          })}
        </div>

        {/* Buttons */}
        <div style={{ display: 'flex', gap: 10 }}>
          <button
            onClick={() => onComplete({ skipped: true })}
            style={{
              flex: 1,
              padding: '13px',
              borderRadius: 12,
              border: '1.5px solid rgba(0,0,0,0.10)',
              background: 'transparent',
              fontSize: 14,
              fontWeight: 600,
              color: '#636366',
              cursor: 'pointer',
              fontFamily: 'inherit',
            }}
          >
            Skip
          </button>
          <button
            onClick={handleConfirm}
            disabled={selected === null}
            style={{
              flex: 2,
              padding: '13px',
              borderRadius: 12,
              border: 'none',
              background: selected === null ? '#D1D1D6' : '#0A84FF',
              color: '#fff',
              fontSize: 14,
              fontWeight: 700,
              cursor: selected === null ? 'default' : 'pointer',
              fontFamily: 'inherit',
              transition: 'background 0.15s',
              boxShadow: selected !== null ? '0 4px 14px rgba(10,132,255,0.3)' : 'none',
            }}
          >
            Confirm
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
