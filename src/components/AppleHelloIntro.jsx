import { useEffect, useRef, useState } from 'react';
import opentype from 'opentype.js';
import gsap from 'gsap';
import { AnimatePresence, motion } from 'framer-motion';
import fontUrl    from '../assets/HomemadeApple.ttf?url';
import helloSvgUrl from '../assets/hello-codepen.svg?url';

const SWIPE_THRESHOLD = 80;
const WORDS = ['hello', 'halo', 'namastey'];

const WORD_FONT_SIZES = {
  hello:    155,
  halo:     175,
  namastey: 110,
};

// Apple-style rainbow gradient — warm → cool, readable on black
const WORD_PALETTES = {
  hello:    ['#ff6b6b', '#ff9f43', '#f7d000', '#26de81', '#45aaf2', '#a55eea', '#fd79a8'],
  halo:     ['#fd79a8', '#a55eea', '#45aaf2', '#26de81', '#f7d000', '#ff9f43', '#ff6b6b'],
  namastey: ['#f7d000', '#ff9f43', '#ff6b6b', '#fd79a8', '#a55eea', '#45aaf2', '#26de81'],
};

// Cache the loaded font so we only fetch once
let fontPromise = null;
function getFont() {
  if (!fontPromise) {
    fontPromise = new Promise((resolve, reject) => {
      opentype.load(fontUrl, (err, font) => {
        if (err) reject(err); else resolve(font);
      });
    });
  }
  return fontPromise;
}

// Returns { d, W, H } for a word at a given font size, perfectly centred in its viewBox
async function buildPath(word, fontSize) {
  const font = await getFont();
  const padding = fontSize * 0.3;

  // ── Step 1: measure where the glyph actually lands ──────────────────────
  const probe = font.getPath(word, padding, fontSize + padding * 0.5, fontSize);
  const bb    = probe.getBoundingBox();

  const W = bb.x2 - bb.x1 + padding * 2;
  const H = bb.y2 - bb.y1 + padding * 2;

  // ── Step 2: shift pen so bounding-box starts at (padding, padding) ──────
  // new_bb.x1 = bb.x1 + (newX − oldX)  →  newX = padding + (padding − bb.x1)
  const newX = padding + (padding - bb.x1);

  // new_bb.y1 = bb.y1 + (newBaseline − oldBaseline)
  // oldBaseline = fontSize + padding * 0.5
  // newBaseline = oldBaseline + (padding − bb.y1)
  const newBaseline = fontSize + padding * 0.5 + (padding - bb.y1);

  const finalPath = font.getPath(word, newX, newBaseline, fontSize);
  return { d: finalPath.toPathData(2), W, H };
}

let uidCounter = 0;

// ── "hello": use the authentic Apple SVG asset with a draw-on animation ──
function HelloSvgPath() {
  const imgRef = useRef(null);
  const [loaded, setLoaded] = useState(false);

  return (
    <div style={{ width: '100%', maxWidth: 860, margin: '0 auto' }}>
      <motion.img
        ref={imgRef}
        src={helloSvgUrl}
        alt="hello"
        onLoad={() => setLoaded(true)}
        initial={{ opacity: 0, scale: 0.94 }}
        animate={loaded ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        style={{ width: '100%', display: 'block', filter: 'brightness(1.15)' }}
      />
    </div>
  );
}

// ── Other words: dynamically rendered with HomemadeApple font ────────────
function WordPath({ word }) {
  const pathRef = useRef(null);
  const svgRef  = useRef(null);
  const [shape, setShape] = useState(null);
  const uid = useRef(`wg${++uidCounter}`).current;
  const palette  = WORD_PALETTES[word] || WORD_PALETTES.hello;
  const fontSize = WORD_FONT_SIZES[word] ?? 155;

  useEffect(() => {
    buildPath(word, fontSize).then(setShape);
  }, [word, fontSize]);

  useEffect(() => {
    if (!shape || !pathRef.current || !svgRef.current) return;

    const el    = pathRef.current;
    const total = el.getTotalLength();

    // Stretch gradient across the full path width
    const grad = svgRef.current.querySelector(`#${uid}`);
    if (grad) {
      grad.setAttribute('x1', '0');
      grad.setAttribute('x2', String(shape.W));
      grad.setAttribute('y1', '0');
      grad.setAttribute('y2', '0');
      grad.setAttribute('gradientUnits', 'userSpaceOnUse');
    }

    gsap.set(el, { strokeDasharray: total, strokeDashoffset: total });
    gsap.to(el, { strokeDashoffset: 0, duration: 3.6, ease: 'none' });
  }, [shape, uid]);

  if (!shape) return null;

  const strokeW = fontSize * 0.072;

  return (
    <svg
      ref={svgRef}
      viewBox={`0 0 ${shape.W} ${shape.H}`}
      style={{ width: '100%', maxWidth: 860, display: 'block', margin: '0 auto', overflow: 'visible' }}
    >
      <defs>
        <linearGradient id={uid}>
          {palette.map((color, i) => (
            <stop key={i} offset={`${(i / (palette.length - 1)) * 100}%`} stopColor={color} />
          ))}
        </linearGradient>
      </defs>

      {/* Ghost fill — faint tint so the final shape is readable on black */}
      <path d={shape.d} fill={`url(#${uid})`} opacity={0.12} />

      {/* Animated handwriting stroke */}
      <path
        ref={pathRef}
        d={shape.d}
        fill="none"
        stroke={`url(#${uid})`}
        strokeWidth={strokeW}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function WordDisplay({ word }) {
  if (word === 'hello') return <HelloSvgPath />;
  return <WordPath word={word} />;
}

export default function AppleHelloIntro({ onContinue }) {
  const [dragY, setDragY]     = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [wordIndex, setWordIndex]   = useState(0);
  const startYRef   = useRef(0);
  const triggeredRef = useRef(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % WORDS.length);
    }, 5200);
    return () => clearInterval(timer);
  }, []);

  function finishIntro() {
    if (triggeredRef.current) return;
    triggeredRef.current = true;
    onContinue();
  }

  function onPointerDown(e) { setIsDragging(true); startYRef.current = e.clientY; }
  function onPointerMove(e) {
    if (!isDragging) return;
    const upDrag = Math.min(0, e.clientY - startYRef.current);
    setDragY(upDrag);
    if (Math.abs(upDrag) > SWIPE_THRESHOLD) finishIntro();
  }
  function onPointerUp() { setIsDragging(false); setDragY(0); }

  return (
    <div
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        userSelect: 'none',
        touchAction: 'none',
        position: 'relative',
        overflow: 'hidden',
        background: '#000000',
      }}
    >
      <motion.div
        animate={{ y: dragY * 0.22 }}
        transition={{ type: 'spring', stiffness: 240, damping: 28 }}
        style={{
          width: '100%',
          maxWidth: 1100,
          padding: '0 32px 120px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={WORDS[wordIndex]}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            style={{ width: '100%' }}
          >
            <WordDisplay word={WORDS[wordIndex]} />
          </motion.div>
        </AnimatePresence>
      </motion.div>

      <div style={{ position: 'absolute', left: 0, right: 0, bottom: 34, textAlign: 'center' }}>
        <div
          style={{
            fontFamily: '"SF Pro Text","Helvetica Neue",-apple-system,BlinkMacSystemFont,sans-serif',
            color: 'rgba(255,255,255,0.65)',
            fontSize: 15,
            fontWeight: 400,
            letterSpacing: '0.02em',
          }}
        >
          Swipe up anywhere to continue
        </div>
        <button
          type="button"
          onClick={finishIntro}
          style={{
            marginTop: 8,
            border: 'none',
            background: 'transparent',
            color: 'rgba(255,255,255,0.4)',
            fontSize: 12,
            textDecoration: 'underline',
            cursor: 'pointer',
            fontFamily: '"SF Pro Text","Helvetica Neue",-apple-system,BlinkMacSystemFont,sans-serif',
          }}
        >
          Skip
        </button>
      </div>
    </div>
  );
}
