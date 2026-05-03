'use client';

import { useEffect, useRef, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import './cognitive-fragments.css';

/* ================================================================
   CARD DEFINITIONS — 18 types across 3 categories
   ================================================================ */

type Category = 'cognitive' | 'behavioral' | 'postquantum';

interface CardDef {
  id: string;
  category: Category;
  label: string;
  render: () => string; // returns innerHTML
}

const CARD_DEFS: CardDef[] = [
  // ── Cognitive (8) ──
  {
    id: 'stroop',
    category: 'cognitive',
    label: 'Stroop test',
    render: () => `
      <div class="cf-stroop">
        <span class="cf-stroop-word" style="color:#e05252">BLUE</span>
        <span class="cf-stroop-word" style="color:#52c87a">RED</span>
        <span class="cf-stroop-word" style="color:#5296e0">GREEN</span>
        <div class="cf-meter"><div class="cf-meter-fill cf-pulse" style="width:78%"></div></div>
        <div class="cf-val">interference: <span class="cf-accent">127ms</span></div>
      </div>`,
  },
  {
    id: 'nback',
    category: 'cognitive',
    label: 'N-Back · level 5',
    render: () => `
      <div class="cf-nback">
        <div class="cf-seq">
          <span>7</span><span>3</span><span>9</span><span>1</span><span class="cf-blink">?</span>
        </div>
        <div class="cf-meter"><div class="cf-meter-fill cf-pulse" style="width:92%"></div></div>
        <div class="cf-val">accuracy: <span class="cf-accent">94.2%</span></div>
      </div>`,
  },
  {
    id: 'reaction',
    category: 'cognitive',
    label: 'Reaction time',
    render: () => `
      <div class="cf-reaction">
        <svg viewBox="0 0 60 60" class="cf-circle-svg">
          <circle cx="30" cy="30" r="24" fill="none" stroke="rgba(82,150,224,0.2)" stroke-width="3"/>
          <circle cx="30" cy="30" r="24" fill="none" stroke="#5296e0" stroke-width="3"
            stroke-dasharray="151" stroke-dashoffset="40" class="cf-circle-anim"/>
        </svg>
        <div class="cf-val cf-big"><span class="cf-accent">218</span>ms</div>
        <div class="cf-val">σ: 14ms · cv: 0.06</div>
      </div>`,
  },
  {
    id: 'pattern',
    category: 'cognitive',
    label: 'Pattern recognition',
    render: () => {
      const cells = [1, 1, 0, 1, 0, 1, 0, 1, 1];
      const grid = cells
        .map((c, i) =>
          c
            ? `<div class="cf-grid-cell cf-on"></div>`
            : i === 4
              ? `<div class="cf-grid-cell cf-missing cf-blink"></div>`
              : `<div class="cf-grid-cell"></div>`
        )
        .join('');
      return `
        <div class="cf-pattern">
          <div class="cf-grid3">${grid}</div>
          <div class="cf-val">score: <span class="cf-accent">9/10</span></div>
        </div>`;
    },
  },
  {
    id: 'digitspan',
    category: 'cognitive',
    label: 'Digit span',
    render: () => `
      <div class="cf-digitspan">
        <div class="cf-digits">
          <span class="cf-dfade" style="--d:0">4</span>
          <span class="cf-dfade" style="--d:1">8</span>
          <span class="cf-dfade" style="--d:2">2</span>
          <span class="cf-dfade" style="--d:3">7</span>
          <span class="cf-dfade" style="--d:4">1</span>
          <span class="cf-dfade" style="--d:5">9</span>
          <span class="cf-dfade" style="--d:6">5</span>
        </div>
        <div class="cf-val">span: <span class="cf-accent">7</span></div>
      </div>`,
  },
  {
    id: 'inhibition',
    category: 'cognitive',
    label: 'Inhibition control',
    render: () => `
      <div class="cf-inhibition">
        <div class="cf-gono">
          <span class="cf-go">GO</span>
          <span class="cf-nogo cf-blink">NO-GO</span>
          <span class="cf-go">GO</span>
        </div>
        <div class="cf-meter"><div class="cf-meter-fill" style="width:88%"></div></div>
        <div class="cf-val">commission errors: <span class="cf-accent">2/40</span></div>
      </div>`,
  },
  {
    id: 'neural',
    category: 'cognitive',
    label: 'Neural signal',
    render: () => {
      const bars = Array.from({ length: 16 }, () =>
        `<div class="cf-eeg-bar cf-eeg-pulse" style="--h:${20 + Math.random() * 60}%"></div>`
      ).join('');
      return `
        <div class="cf-neural">
          <div class="cf-eeg">${bars}</div>
          <div class="cf-val">δ:12Hz θ:6Hz α:<span class="cf-accent">11Hz</span></div>
        </div>`;
    },
  },
  {
    id: 'verdict',
    category: 'cognitive',
    label: 'HCS-U7 verdict',
    render: () => `
      <div class="cf-verdict">
        <svg viewBox="0 0 80 80" class="cf-gauge-svg">
          <circle cx="40" cy="40" r="32" fill="none" stroke="rgba(82,200,122,0.15)" stroke-width="5"/>
          <circle cx="40" cy="40" r="32" fill="none" stroke="#52c87a" stroke-width="5"
            stroke-dasharray="201" stroke-dashoffset="18" stroke-linecap="round" class="cf-gauge-anim"/>
          <text x="40" y="38" text-anchor="middle" fill="#52c87a" font-size="14" font-weight="700">91</text>
          <text x="40" y="50" text-anchor="middle" fill="rgba(255,255,255,0.5)" font-size="6">/100</text>
        </svg>
        <div class="cf-verdict-label">HUMAN CERTIFIED</div>
      </div>`,
  },

  // ── Behavioral biometrics (4) ──
  {
    id: 'gyroscope',
    category: 'behavioral',
    label: 'Gyroscope · live',
    render: () => `
      <div class="cf-gyro">
        <div class="cf-cube-wrap"><div class="cf-cube cf-cube-spin">
          <div class="cf-face cf-front"></div><div class="cf-face cf-back"></div>
          <div class="cf-face cf-left"></div><div class="cf-face cf-right"></div>
          <div class="cf-face cf-top"></div><div class="cf-face cf-bottom"></div>
        </div></div>
        <div class="cf-val">X:<span class="cf-accent">12°</span> Y:−4° Z:87°</div>
      </div>`,
  },
  {
    id: 'accelerometer',
    category: 'behavioral',
    label: 'Accelerometer · 100Hz',
    render: () => {
      const bars = Array.from({ length: 12 }, (_, i) =>
        `<div class="cf-spec-bar cf-spec-pulse" style="--h:${15 + Math.random() * 70}%;--d:${i}"></div>`
      ).join('');
      return `
        <div class="cf-accel">
          <div class="cf-spectrum">${bars}</div>
          <div class="cf-val">Gx:<span class="cf-accent">0.02</span> Gy:−0.81 Gz:9.78</div>
        </div>`;
    },
  },
  {
    id: 'touch',
    category: 'behavioral',
    label: 'Touch dynamics',
    render: () => {
      const dots = Array.from({ length: 7 }, () => {
        const x = 10 + Math.random() * 80;
        const y = 10 + Math.random() * 80;
        const r = 3 + Math.random() * 5;
        return `<circle cx="${x}%" cy="${y}%" r="${r}" fill="rgba(155,93,229,0.4)" class="cf-touch-dot"/>`;
      }).join('');
      return `
        <div class="cf-touch">
          <svg viewBox="0 0 100 50" class="cf-touch-map">${dots}</svg>
          <div class="cf-val">pressure σ: <span class="cf-accent">0.034</span></div>
        </div>`;
    },
  },
  {
    id: 'swipe',
    category: 'behavioral',
    label: 'Swipe dynamics',
    render: () => `
      <div class="cf-swipe">
        <svg viewBox="0 0 100 40" class="cf-swipe-svg">
          <polyline points="0,35 15,30 30,28 45,10 55,5 65,8 80,25 100,32"
            fill="none" stroke="rgba(82,180,224,0.6)" stroke-width="1.5"/>
          <circle cx="55" cy="5" r="3" fill="#52b4e0" class="cf-blink"/>
        </svg>
        <div class="cf-val">peak velocity: <span class="cf-accent">1840</span>px/s</div>
      </div>`,
  },

  // ── Post-quantum (4) ──
  {
    id: 'mlkem',
    category: 'postquantum',
    label: 'ML-KEM-768 · FIPS 203',
    render: () => {
      const hex = Array.from({ length: 48 }, () =>
        Math.floor(Math.random() * 256).toString(16).padStart(2, '0')
      );
      const rows = [hex.slice(0, 12).join(' '), hex.slice(12, 24).join(' '), hex.slice(24, 36).join(' ')];
      return `
        <div class="cf-mlkem">
          <div class="cf-hex-grid cf-lattice-pulse">
            ${rows.map(r => `<div class="cf-hex-row">${r}</div>`).join('')}
          </div>
          <div class="cf-val">lattice dim: <span class="cf-accent">768</span></div>
        </div>`;
    },
  },
  {
    id: 'celestial',
    category: 'postquantum',
    label: 'Celestial entropy',
    render: () => `
      <div class="cf-celestial">
        <div class="cf-orbit-system">
          <div class="cf-sun"></div>
          <div class="cf-orbit cf-orbit1"><div class="cf-planet"></div></div>
          <div class="cf-orbit cf-orbit2"><div class="cf-planet cf-planet2"></div></div>
        </div>
        <div class="cf-val">RA:<span class="cf-accent">14h23m</span> Dec:−11°32′</div>
        <div class="cf-val">JD: 2460742.8</div>
      </div>`,
  },
  {
    id: 'mldsa',
    category: 'postquantum',
    label: 'ML-DSA-65 · FIPS 204',
    render: () => {
      const sig = Array.from({ length: 32 }, () =>
        Math.floor(Math.random() * 256).toString(16).padStart(2, '0')
      );
      return `
        <div class="cf-mldsa">
          <div class="cf-sig cf-shimmer">${sig.join('')}</div>
          <div class="cf-meter"><div class="cf-meter-fill cf-pulse" style="width:100%"></div></div>
          <div class="cf-val">sig verified: <span class="cf-accent">✓ valid</span></div>
        </div>`;
    },
  },
  {
    id: 'hieroglyphic',
    category: 'postquantum',
    label: 'Hieroglyphic Shield',
    render: () => `
      <div class="cf-hiero">
        <div class="cf-hiero-row cf-shimmer">𓂀 𓃭 𓅃 𓆣 𓇋 𓈖 𓉐 𓊝</div>
        <div class="cf-hiero-bar"><div class="cf-hiero-fill cf-gradient-slide"></div></div>
        <div class="cf-val">AES-256-GCM · <span class="cf-accent">armed</span></div>
      </div>`,
  },
];

/* ================================================================
   COLOR MAP
   ================================================================ */

const COLORS: Record<Category, [string, string]> = {
  cognitive: ['rgba(82,150,224,0.85)', 'rgba(82,200,122,0.85)'],
  behavioral: ['rgba(155,93,229,0.85)', 'rgba(82,180,224,0.85)'],
  postquantum: ['rgba(224,165,82,0.85)', 'rgba(155,93,229,0.85)'],
};

function categoryBorder(cat: Category): string {
  const [a, b] = COLORS[cat];
  return `linear-gradient(135deg, ${a}, ${b})`;
}

/* ================================================================
   SPAWN LOGIC
   ================================================================ */

interface SpawnedCard {
  el: HTMLDivElement;
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  duration: number;
  peakOpacity: number;
  startTime: number;
}

function pickEdge(w: number, h: number): { x: number; y: number; oppositeX: number; oppositeY: number } {
  const edge = Math.floor(Math.random() * 4);
  const jitter = () => 0.15 + Math.random() * 0.7;
  switch (edge) {
    case 0: return { x: jitter() * w, y: -200, oppositeX: jitter() * w, oppositeY: h + 200 };
    case 1: return { x: w + 200, y: jitter() * h, oppositeX: -200, oppositeY: jitter() * h };
    case 2: return { x: jitter() * w, y: h + 200, oppositeX: jitter() * w, oppositeY: -200 };
    default: return { x: -200, y: jitter() * h, oppositeX: w + 200, oppositeY: jitter() * h };
  }
}

function easeInOutQuad(t: number): number {
  return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
}

/* ================================================================
   COMPONENT
   ================================================================ */

export function CognitiveFragmentsHero() {
  const t = useTranslations('cognitiveHero');
  const params = useParams();
  const locale = (params?.locale as string) || 'en';

  const containerRef = useRef<HTMLDivElement>(null);
  const fieldRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<SpawnedCard[]>([]);
  const rafRef = useRef<number>(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const cardIndexRef = useRef(0);
  const mountedRef = useRef(true);

  const isMobile = useRef(false);

  const spawnCard = useCallback(() => {
    const field = fieldRef.current;
    if (!field || !mountedRef.current) return;

    const mobile = isMobile.current;
    const w = field.offsetWidth;
    const h = field.offsetHeight;

    const def = CARD_DEFS[cardIndexRef.current % CARD_DEFS.length];
    cardIndexRef.current++;

    const { x, y, oppositeX, oppositeY } = pickEdge(w, h);
    const baseWidth = mobile ? 130 : 158 + Math.random() * 37;
    const duration = mobile
      ? 10000 + Math.random() * 8000
      : 14000 + Math.random() * 10000;
    const peakOpacity = 0.82 + Math.random() * 0.15;

    const el = document.createElement('div');
    el.className = `cf-card cf-cat-${def.category}`;
    el.style.cssText = `
      position:absolute;left:0;top:0;width:${baseWidth}px;
      opacity:0;pointer-events:none;will-change:transform,opacity;
    `;
    el.innerHTML = `
      <div class="cf-card-border" style="background:${categoryBorder(def.category)}"></div>
      <div class="cf-card-inner">
        <div class="cf-clabel">${def.label}</div>
        ${def.render()}
      </div>
    `;
    field.appendChild(el);

    cardsRef.current.push({
      el,
      startX: x,
      startY: y,
      endX: oppositeX,
      endY: oppositeY,
      duration,
      peakOpacity,
      startTime: performance.now(),
    });
  }, []);

  const animate = useCallback((now: number) => {
    if (!mountedRef.current) return;

    const toRemove: number[] = [];
    for (let i = 0; i < cardsRef.current.length; i++) {
      const c = cardsRef.current[i];
      const elapsed = now - c.startTime;
      const progress = Math.min(elapsed / c.duration, 1);
      const eased = easeInOutQuad(progress);

      const cx = c.startX + (c.endX - c.startX) * eased;
      const cy = c.startY + (c.endY - c.startY) * eased;

      let opacity: number;
      if (progress < 0.1) opacity = (progress / 0.1) * c.peakOpacity;
      else if (progress > 0.85) opacity = ((1 - progress) / 0.15) * c.peakOpacity;
      else opacity = c.peakOpacity;

      c.el.style.transform = `translate3d(${cx}px,${cy}px,0)`;
      c.el.style.opacity = String(opacity);

      if (progress >= 1) {
        toRemove.push(i);
      }
    }

    for (let i = toRemove.length - 1; i >= 0; i--) {
      const idx = toRemove[i];
      cardsRef.current[idx].el.remove();
      cardsRef.current.splice(idx, 1);
    }

    rafRef.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    mountedRef.current = true;

    const mq = window.matchMedia('(max-width: 767px)');
    isMobile.current = mq.matches;
    const onMq = (e: MediaQueryListEvent) => { isMobile.current = e.matches; };
    mq.addEventListener('change', onMq);

    const mobile = isMobile.current;
    const initialCount = mobile ? 5 : 8;
    const interval = mobile ? 2800 : 1900;

    for (let i = 0; i < initialCount; i++) {
      setTimeout(() => spawnCard(), i * 220);
    }

    intervalRef.current = setInterval(spawnCard, interval);
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      mountedRef.current = false;
      mq.removeEventListener('change', onMq);
      if (intervalRef.current) clearInterval(intervalRef.current);
      cancelAnimationFrame(rafRef.current);
      cardsRef.current.forEach(c => c.el.remove());
      cardsRef.current = [];
    };
  }, [spawnCard, animate]);

  return (
    <section
      ref={containerRef}
      className="cf-hero"
    >
      {/* Floating card field */}
      <div ref={fieldRef} className="cf-field" aria-hidden="true" />

      {/* Vignette overlay */}
      <div className="cf-vignette" />

      {/* Hero content */}
      <div className="cf-content">
        <span className="cf-badge">
          <span className="cf-badge-dot" />
          {t('badge')}
        </span>

        <h1 className="cf-h1">{t('h1')}</h1>

        <p className="cf-sub">{t('sub')}</p>

        <Link href={`/${locale}/products/hcs-u7`} className="cf-cta">
          {t('cta')}
        </Link>

        <div className="cf-tags">
          <span>9 Guard modules</span>
          <span>Cognitive engine</span>
          <span>ML-KEM-768</span>
          <span>iOS &amp; Android</span>
        </div>
      </div>
    </section>
  );
}
