import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import img1 from '../assets/images/images_page-0001.jpg';
import img2 from '../assets/images/images_page-0002.jpg';
import img3 from '../assets/images/images_page-0003.jpg';
import img4 from '../assets/images/images_page-0004.jpg';

const STEPS = [
  {
    src: img1,
    title: 'Read the message first',
    caption: 'Start with sender, request, and pressure before you classify anything.',
  },
  {
    src: img2,
    title: 'Use hints only when needed',
    caption: 'Clues can rescue a tough round, but each one costs a point from your score.',
  },
  {
    src: img3,
    title: 'Classify in two layers',
    caption: 'Choose the primary threat category, then refine to the closest subtype.',
  },
  {
    src: img4,
    title: 'Lock the call in fast',
    caption: 'The timer is generous enough to think, but not enough to drift.',
  },
];

const STEP_DURATION = 5000;

const shell = {
  background: 'rgba(255,255,255,0.72)',
  backdropFilter: 'blur(22px) saturate(150%)',
  WebkitBackdropFilter: 'blur(22px) saturate(150%)',
  border: '1px solid rgba(255,255,255,0.82)',
  boxShadow: '0 24px 80px rgba(32, 52, 89, 0.10), 0 8px 24px rgba(32, 52, 89, 0.05)',
};

export default function TutorialScreen({ onSkip }) {
  const [activeStep, setActiveStep] = useState(0);
  const [stepProgress, setStepProgress] = useState(0);
  const stepStartRef = useRef(Date.now());

  useEffect(() => {
    stepStartRef.current = Date.now();
    setStepProgress(0);

    const timer = setTimeout(() => {
      setActiveStep((step) => (step + 1) % STEPS.length);
    }, STEP_DURATION);

    let frameId;

    const updateProgress = () => {
      const elapsed = Date.now() - stepStartRef.current;
      setStepProgress(Math.min(elapsed / STEP_DURATION, 1));
      frameId = window.requestAnimationFrame(updateProgress);
    };

    frameId = window.requestAnimationFrame(updateProgress);

    return () => {
      clearTimeout(timer);
      window.cancelAnimationFrame(frameId);
    };
  }, [activeStep]);

  const current = STEPS[activeStep];
  const secondsRemaining = Math.max(1, Math.ceil((1 - stepProgress) * STEP_DURATION / 1000));

  function handleSelectStep(index) {
    setActiveStep(index);
  }

  return (
    <div
      style={{
        minHeight: '100dvh',
        padding: 'clamp(16px, 2.5vw, 28px)',
        fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Helvetica Neue", sans-serif',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <style>{`
        @media (max-width: 980px) {
          .tutorial-shell {
            grid-template-columns: 1fr !important;
            max-width: 860px !important;
          }
        }

        @media (max-width: 720px) {
          .tutorial-main,
          .tutorial-side {
            padding: 20px !important;
            border-radius: 26px !important;
          }

          .tutorial-stage {
            min-height: 0 !important;
          }

          .tutorial-step-button {
            grid-template-columns: 30px minmax(0, 1fr) !important;
          }
        }
      `}</style>

      <div
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          background: [
            'radial-gradient(circle at 12% 14%, rgba(10,132,255,0.14), transparent 24%)',
            'radial-gradient(circle at 84% 12%, rgba(52,199,89,0.12), transparent 20%)',
            'radial-gradient(circle at 50% 84%, rgba(255,149,0,0.10), transparent 24%)',
          ].join(','),
        }}
      />

      <button
        onClick={onSkip}
        style={{
          position: 'absolute',
          top: 20,
          right: 22,
          zIndex: 2,
          padding: '4px 0',
          border: 'none',
          background: 'transparent',
          color: 'rgba(17,24,39,0.44)',
          fontSize: 13,
          fontWeight: 500,
          cursor: 'pointer',
          textDecoration: 'underline',
          textUnderlineOffset: 3,
        }}
      >
        Skip tutorial
      </button>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 200, damping: 26 }}
        className="tutorial-shell"
        style={{
          maxWidth: 1180,
          minHeight: 'calc(100dvh - (2 * clamp(16px, 2.5vw, 28px)))',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1.08fr) minmax(340px, 0.92fr)',
          gap: 18,
          alignItems: 'stretch',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <div
          className="tutorial-main"
          style={{
            ...shell,
            borderRadius: 34,
            padding: 'clamp(22px, 2.8vw, 30px)',
            display: 'grid',
            gap: 18,
            alignContent: 'start',
          }}
        >
          <div style={{ display: 'grid', gap: 12 }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 10,
                padding: '8px 14px',
                borderRadius: 999,
                background: 'rgba(255,255,255,0.86)',
                border: '1px solid rgba(13,26,51,0.06)',
                justifySelf: 'start',
              }}
            >
              <span
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: '50%',
                  background: '#0A84FF',
                  boxShadow: '0 0 0 6px rgba(10,132,255,0.12)',
                }}
              />
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: 'rgba(17,24,39,0.56)',
                }}
              >
                How The Assessment Works
              </span>
            </div>

            <div style={{ maxWidth: 700 }}>
              <h1
                style={{
                  margin: 0,
                  fontSize: 'clamp(34px, 4.8vw, 58px)',
                  lineHeight: 0.96,
                  letterSpacing: '-0.06em',
                  color: '#111827',
                }}
              >
                A fast briefing before the first zone.
              </h1>
            </div>
          </div>

          <div
            className="tutorial-stage"
            style={{
              position: 'relative',
              minHeight: 420,
              borderRadius: 30,
              overflow: 'hidden',
              border: '1px solid rgba(13,26,51,0.06)',
              background: 'linear-gradient(180deg, rgba(248,250,253,0.98) 0%, rgba(241,245,251,0.94) 100%)',
              boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.72)',
            }}
          >
            <div
              style={{
                position: 'absolute',
                inset: 0,
                pointerEvents: 'none',
                background: 'linear-gradient(135deg, rgba(10,132,255,0.06) 0%, transparent 36%, rgba(52,199,89,0.06) 100%)',
              }}
            />

            <div
              style={{
                position: 'relative',
                height: '100%',
                display: 'grid',
                gridTemplateRows: 'minmax(0, 1fr) auto',
              }}
            >
              <div
                style={{
                  padding: 'clamp(18px, 2vw, 24px)',
                  display: 'grid',
                  placeItems: 'center',
                }}
              >
                <motion.div
                  key={current.src}
                  initial={{ opacity: 0, y: 18, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                  style={{
                    width: '100%',
                    maxWidth: 760,
                    borderRadius: 24,
                    overflow: 'hidden',
                    border: '1px solid rgba(13,26,51,0.08)',
                    boxShadow: '0 24px 60px rgba(20, 35, 65, 0.14)',
                    background: '#fff',
                  }}
                >
                  <img
                    src={current.src}
                    alt={current.title}
                    draggable={false}
                    style={{ width: '100%', display: 'block' }}
                  />
                </motion.div>
              </div>

              <div
                style={{
                  position: 'relative',
                  padding: '18px 22px 20px',
                  borderTop: '1px solid rgba(13,26,51,0.06)',
                  background: 'rgba(255,255,255,0.84)',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: 12,
                    flexWrap: 'wrap',
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontSize: 12,
                        fontWeight: 700,
                        letterSpacing: '0.12em',
                        textTransform: 'uppercase',
                        color: '#0A84FF',
                        marginBottom: 6,
                      }}
                    >
                      Step {activeStep + 1} of {STEPS.length}
                    </div>
                    <div
                      style={{
                        fontSize: 'clamp(22px, 3vw, 30px)',
                        fontWeight: 700,
                        letterSpacing: '-0.04em',
                        color: '#111827',
                      }}
                    >
                      {current.title}
                    </div>
                  </div>

                  <div
                    style={{
                      minWidth: 220,
                      display: 'grid',
                      gap: 10,
                      justifyItems: 'end',
                      flex: '1 1 220px',
                    }}
                  >
                    <div
                      style={{
                        fontSize: 12,
                        fontWeight: 600,
                        color: 'rgba(17,24,39,0.62)',
                      }}
                    >
                      Next step in {secondsRemaining}s
                    </div>
                    <div
                      aria-hidden="true"
                      style={{
                        width: '100%',
                        maxWidth: 220,
                        height: 8,
                        borderRadius: 999,
                        overflow: 'hidden',
                        background: 'rgba(17,24,39,0.10)',
                        boxShadow: 'inset 0 1px 2px rgba(17,24,39,0.08)',
                      }}
                    >
                      <div
                        style={{
                          width: `${Math.max(stepProgress * 100, 4)}%`,
                          height: '100%',
                          borderRadius: 999,
                          background: 'linear-gradient(90deg, #0A84FF 0%, #30B0C7 100%)',
                          transition: stepProgress === 0 ? 'none' : 'width 0.1s linear',
                        }}
                      />
                    </div>
                    <div style={{ display: 'flex', gap: 6 }}>
                      {STEPS.map((_, index) => (
                        <button
                          key={index}
                          type="button"
                          onClick={() => handleSelectStep(index)}
                          aria-label={`Go to tutorial step ${index + 1}`}
                          aria-pressed={index === activeStep}
                          title={`Go to step ${index + 1}`}
                          style={{
                            width: index === activeStep ? 26 : 8,
                            height: 8,
                            borderRadius: 999,
                            border: 'none',
                            background: index === activeStep ? '#0A84FF' : 'rgba(17,24,39,0.16)',
                            transition: 'all 0.18s ease',
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          className="tutorial-side"
          style={{
            ...shell,
            borderRadius: 32,
            padding: 'clamp(22px, 2.5vw, 28px)',
            display: 'grid',
            gap: 16,
            alignContent: 'start',
          }}
        >
          <div>
            <div
              style={{
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'rgba(17,24,39,0.52)',
                marginBottom: 8,
              }}
            >
              What Matters
            </div>
            <div
              style={{
                fontSize: 30,
                lineHeight: 1.1,
                fontWeight: 700,
                letterSpacing: '-0.04em',
                color: '#111827',
                marginBottom: 10,
              }}
            >
              Accuracy first. Hints second. Speed third.
            </div>
            <p
              style={{
                margin: 0,
                fontSize: 14,
                lineHeight: 1.6,
                color: 'rgba(17,24,39,0.64)',
              }}
            >
              The strongest performers read for trust signals, avoid overusing clues, and keep a steady pace
              instead of rushing every email.
            </p>
          </div>

          <div style={{ display: 'grid', gap: 10 }}>
            {STEPS.map((step, index) => {
              const active = index === activeStep;
              return (
                <button
                  key={step.title}
                  className="tutorial-step-button"
                  onClick={() => handleSelectStep(index)}
                  type="button"
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '34px minmax(0, 1fr)',
                    gap: 12,
                    alignItems: 'start',
                    width: '100%',
                    padding: '14px',
                    borderRadius: 20,
                    textAlign: 'left',
                    border: active ? '1px solid rgba(10,132,255,0.20)' : '1px solid rgba(13,26,51,0.06)',
                    background: active
                      ? 'linear-gradient(180deg, rgba(10,132,255,0.10) 0%, rgba(255,255,255,0.90) 100%)'
                      : 'rgba(255,255,255,0.76)',
                    boxShadow: active ? '0 16px 34px rgba(10,132,255,0.10)' : 'none',
                  }}
                >
                  <div
                    style={{
                      width: 34,
                      height: 34,
                      borderRadius: 999,
                      display: 'grid',
                      placeItems: 'center',
                      fontSize: 12,
                      fontWeight: 700,
                      color: active ? '#0A84FF' : 'rgba(17,24,39,0.48)',
                      background: active ? 'rgba(255,255,255,0.84)' : 'rgba(17,24,39,0.06)',
                    }}
                  >
                    {index + 1}
                  </div>

                  <div>
                    <div
                      style={{
                        fontSize: 16,
                        fontWeight: 700,
                        letterSpacing: '-0.02em',
                        color: '#111827',
                        marginBottom: 4,
                      }}
                    >
                      {step.title}
                    </div>
                    <div
                      style={{
                        fontSize: 13,
                        lineHeight: 1.5,
                        color: 'rgba(17,24,39,0.60)',
                      }}
                    >
                      {step.caption}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          <div
            style={{
              borderRadius: 22,
              padding: '16px',
              background: 'linear-gradient(180deg, rgba(52,199,89,0.10) 0%, rgba(255,255,255,0.90) 100%)',
              border: '1px solid rgba(52,199,89,0.16)',
              display: 'grid',
              gap: 8,
            }}
          >
            <div
              style={{
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: '#1F8A49',
              }}
            >
              Ready Check
            </div>
            <div
              style={{
                fontSize: 15,
                lineHeight: 1.55,
                color: 'rgba(17,24,39,0.68)',
              }}
            >
              You will get 15 scenarios across 3 zones, with 120 seconds per round. Your score reflects accuracy across all three zones.
            </div>
          </div>

          <motion.button
            onClick={onSkip}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            style={{
              width: '100%',
              marginTop: 'auto',
              padding: '16px 18px',
              borderRadius: 18,
              border: '1px solid rgba(52,199,89,0.24)',
              background: 'linear-gradient(135deg, #34C759 0%, #23A345 100%)',
              color: '#fff',
              fontSize: 15,
              fontWeight: 700,
              letterSpacing: '0.01em',
              boxShadow: '0 18px 30px rgba(52,199,89,0.22)',
            }}
          >
            I&apos;m ready. Start the assessment
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
