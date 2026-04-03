import React, { useEffect, useId, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import appCheckin  from '@/assets/app-checkin.png';
import appReserva  from '@/assets/app-reserva.jpg';
import appAvui     from '@/assets/app-avui.jpg';
import appFinances from '@/assets/app-finances.jpg';

gsap.registerPlugin(ScrollTrigger);

/* ─────────────────────────────────────────────────────────
   APP SCREENS — CSS faithfully mimicking Hostly app style
───────────────────────────────────────────────────────── */

const Blue  = '#3b7ff5';
const Green = '#34c759';
const BG    = '#f2f2f7';

const ChatScreen: React.FC = () => (
  <div style={{ width: '100%', height: '100%', background: BG, display: 'flex', flexDirection: 'column', fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>
    <div style={{ background: '#fff', padding: '10px 14px 8px', borderBottom: '1px solid #e5e5ea', textAlign: 'center', fontSize: '15px', fontWeight: 700, color: '#1c1c1e' }}>Xat</div>
    <div style={{ flex: 1, padding: '10px', display: 'flex', flexDirection: 'column', gap: '8px', overflow: 'hidden' }}>
      <div style={{ alignSelf: 'flex-start', maxWidth: '80%' }}>
        <div style={{ fontSize: '9px', color: '#8e8e93', marginBottom: '2px', paddingLeft: '4px' }}>Sarah · Airbnb</div>
        <div style={{ background: '#fff', borderRadius: '14px 14px 14px 2px', padding: '7px 10px', fontSize: '11px', color: '#1c1c1e', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
          Hola! A quina hora puc fer el check-in?
        </div>
      </div>
      <div style={{ alignSelf: 'flex-end', maxWidth: '82%' }}>
        <div style={{ fontSize: '9px', color: '#8e8e93', marginBottom: '2px', paddingRight: '4px', textAlign: 'right' }}>Hostly · automàtic ⚡</div>
        <div style={{ background: Blue, borderRadius: '14px 14px 2px 14px', padding: '7px 10px', fontSize: '11px', color: '#fff' }}>
          Benvinguda Sarah! Pots fer el check-in a partir de les 15:00. El teu codi és <strong>4821</strong>.
        </div>
      </div>
      <div style={{ alignSelf: 'flex-start', maxWidth: '75%' }}>
        <div style={{ background: '#fff', borderRadius: '14px 14px 14px 2px', padding: '7px 10px', fontSize: '11px', color: '#1c1c1e', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
          Perfecte, gràcies! ⭐⭐⭐⭐⭐
        </div>
      </div>
      <div style={{ alignSelf: 'center', marginTop: '2px' }}>
        <div style={{ background: '#e3f6e8', borderRadius: '10px', padding: '5px 10px', fontSize: '10px', color: '#1c7a38', fontWeight: 600 }}>
          ✓ Resposta automàtica enviada
        </div>
      </div>
    </div>
    <NavBar active={3} />
  </div>
);

const NetejaScreen: React.FC = () => (
  <div style={{ width: '100%', height: '100%', background: BG, display: 'flex', flexDirection: 'column', fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>
    <div style={{ background: '#fff', padding: '10px 14px 8px', borderBottom: '1px solid #e5e5ea', textAlign: 'center', fontSize: '15px', fontWeight: 700, color: '#1c1c1e' }}>Neteja</div>
    <div style={{ flex: 1, padding: '10px', display: 'flex', flexDirection: 'column', gap: '6px', overflow: 'hidden' }}>
      <div style={{ fontSize: '9px', fontWeight: 700, color: '#8e8e93', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '2px' }}>Avui · 3 tasques</div>
      {[
        { apt: 'Luminoso Eixample', who: 'Anna López', time: '11:00', done: true },
        { apt: 'Moderna Casa Gràcia', who: 'Maria R.', time: '12:30', done: true },
        { apt: 'Àtic Barceloneta', who: 'Laura M.', time: '14:00', done: false },
      ].map((item, i) => (
        <div key={i} style={{ background: '#fff', borderRadius: '12px', padding: '9px 11px', boxShadow: '0 1px 3px rgba(0,0,0,0.07)', borderLeft: `3px solid ${item.done ? Green : Blue}` }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: '11px', fontWeight: 700, color: '#1c1c1e' }}>{item.apt}</div>
              <div style={{ fontSize: '10px', color: '#8e8e93', marginTop: '1px' }}>{item.who} · {item.time}</div>
            </div>
            <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: item.done ? Green : '#e5e5ea', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', color: '#fff' }}>
              {item.done ? '✓' : ''}
            </div>
          </div>
        </div>
      ))}
      <div style={{ marginTop: '4px', fontSize: '10px', color: Green, fontWeight: 600, textAlign: 'center' }}>
        Equip notificat automàticament ✓
      </div>
    </div>
    <NavBar active={2} />
  </div>
);

const NavBar: React.FC<{ active: number }> = ({ active }) => (
  <div style={{ display: 'flex', background: '#fff', borderTop: '1px solid #e5e5ea', padding: '6px 0 10px' }}>
    {[['☀️', 'Avui'], ['📅', 'Calendari'], ['✨', 'Neteja'], ['💬', 'Xat'], ['⚙️', 'Gestió']].map(([icon, label], i) => (
      <div key={i} style={{ flex: 1, textAlign: 'center' }}>
        <div style={{ fontSize: '14px' }}>{icon}</div>
        <div style={{ fontSize: '8px', color: i === active ? Blue : '#8e8e93', fontWeight: i === active ? 700 : 400, marginTop: '2px' }}>{label}</div>
      </div>
    ))}
  </div>
);

/* ─────────────────────────────────────────────────────────
   iPHONE 15 PRO — SVG precision mockup
   ViewBox: 0 0 300 614  (≈ 4.25px / mm based on real dims)
   Screen:  x=13 y=13 w=274 h=588 rx=40
───────────────────────────────────────────────────────── */

const IPhone15Pro: React.FC<{ src?: string; children?: React.ReactNode }> = ({ src, children }) => {
  const uid = useId().replace(/:/g, '');

  // Key coordinates
  const W = 300, H = 614, R = 52;     // body
  const sx = 13, sy = 13, sw = 274, sh = 588, sr = 40; // screen
  const diX = 105, diY = 26, diW = 90, diH = 27, diR = 13; // Dynamic Island

  return (
    <div style={{ position: 'relative', width: '158px', flexShrink: 0 }}>
      <svg
        viewBox={`-6 -4 ${W + 12} ${H + 8}`}
        width={158}
        style={{ display: 'block', overflow: 'visible', filter: 'drop-shadow(0 32px 48px rgba(0,0,0,0.28)) drop-shadow(0 8px 20px rgba(0,0,0,0.18))' }}
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
      >
        <defs>
          {/* Titanium frame gradient — left to right catch-lights */}
          <linearGradient id={`ti-${uid}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%"   stopColor="#7e7e80" />
            <stop offset="8%"   stopColor="#5c5c5e" />
            <stop offset="22%"  stopColor="#3e3e40" />
            <stop offset="42%"  stopColor="#1c1c1e" />
            <stop offset="58%"  stopColor="#2e2e30" />
            <stop offset="72%"  stopColor="#4a4a4c" />
            <stop offset="86%"  stopColor="#686869" />
            <stop offset="100%" stopColor="#4c4c4e" />
          </linearGradient>

          {/* Top-edge subtle highlight */}
          <linearGradient id={`top-${uid}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%"   stopColor="rgba(255,255,255,0.22)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </linearGradient>

          {/* Screen glass glare */}
          <linearGradient id={`gl-${uid}`} x1="0%" y1="0%" x2="40%" y2="100%">
            <stop offset="0%"   stopColor="rgba(255,255,255,0.09)" />
            <stop offset="60%"  stopColor="rgba(255,255,255,0.02)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </linearGradient>

          {/* Clip screen content */}
          <clipPath id={`sc-${uid}`}>
            <rect x={sx} y={sy} width={sw} height={sh} rx={sr} />
          </clipPath>
        </defs>

        {/* ── Phone body ── */}
        <rect x={0} y={0} width={W} height={H} rx={R} fill={`url(#ti-${uid})`} />

        {/* Top-edge highlight stripe */}
        <rect x={0} y={0} width={W} height={H} rx={R} fill={`url(#top-${uid})`} />

        {/* Outer edge line (very subtle white) */}
        <rect x={0} y={0} width={W} height={H} rx={R} fill="none" stroke="rgba(255,255,255,0.14)" strokeWidth="1" />

        {/* Inner bezel edge (dark) */}
        <rect x={1} y={1} width={W - 2} height={H - 2} rx={R - 1} fill="none" stroke="rgba(0,0,0,0.5)" strokeWidth="0.8" />

        {/* ── Screen area ── */}
        <rect x={sx} y={sy} width={sw} height={sh} rx={sr} fill="#050505" />

        {/* App screenshot */}
        {src && (
          <image
            href={src}
            x={sx} y={sy} width={sw} height={sh}
            clipPath={`url(#sc-${uid})`}
            preserveAspectRatio="xMidYMin slice"
          />
        )}

        {/* CSS screen via foreignObject */}
        {!src && children && (
          <foreignObject x={sx} y={sy} width={sw} height={sh} clipPath={`url(#sc-${uid})`}>
            <div
              // @ts-ignore
              xmlns="http://www.w3.org/1999/xhtml"
              style={{ width: '100%', height: '100%', overflow: 'hidden' }}
            >
              {children}
            </div>
          </foreignObject>
        )}

        {/* Screen glare overlay */}
        <rect x={sx} y={sy} width={sw} height={sh} rx={sr} fill={`url(#gl-${uid})`} />

        {/* ── Dynamic Island ── */}
        <rect x={diX} y={diY} width={diW} height={diH} rx={diR} fill="#000" />

        {/* ── Left buttons ── */}
        {/* Silent toggle */}
        <rect x={-5} y={118} width={7} height={36} rx={3.5} fill="#3a3a3c" stroke="rgba(255,255,255,0.07)" strokeWidth="0.5" />
        {/* Volume up */}
        <rect x={-5} y={170} width={7} height={68} rx={3.5} fill="#3a3a3c" stroke="rgba(255,255,255,0.07)" strokeWidth="0.5" />
        {/* Volume down */}
        <rect x={-5} y={250} width={7} height={68} rx={3.5} fill="#3a3a3c" stroke="rgba(255,255,255,0.07)" strokeWidth="0.5" />

        {/* ── Right button (power) ── */}
        <rect x={W - 2} y={198} width={7} height={96} rx={3.5} fill="#3a3a3c" stroke="rgba(255,255,255,0.07)" strokeWidth="0.5" />

        {/* Camera module hint (subtle pill, top-right of screen area) */}
        {!src && (
          <circle cx={sx + sw - 28} cy={sy + 22} r={6} fill="rgba(0,0,0,0.5)" />
        )}
      </svg>
    </div>
  );
};

/* ─────────────────────────────────────────────────────────
   CARD DATA
───────────────────────────────────────────────────────── */

const cardData = [
  {
    id: 1,
    badge: 'Cero trámites',
    title: 'Entrada autónoma.',
    description: 'Tu huésped completa el registro online y recibe su código de acceso. Sin quedar, sin esperas, sin llaves en mano.',
    color: 'rgba(59, 130, 246, 0.9)',
    bg: 'linear-gradient(135deg, #ffffff 0%, #f0f6ff 100%)',
    textColor: '#0f172a',
    mutedColor: 'rgba(15, 23, 42, 0.55)',
    imageSrc: appCheckin,
    screen: null,
  },
  {
    id: 2,
    badge: '100% Legal',
    title: 'Registro policial automático.',
    description: 'Los datos del DNI se envían a Policía al instante cuando entra una reserva. Cumple la ley sin mover un dedo.',
    color: 'rgba(34, 197, 94, 0.9)',
    bg: 'linear-gradient(135deg, #ffffff 0%, #f0fdf4 100%)',
    textColor: '#0f172a',
    mutedColor: 'rgba(15, 23, 42, 0.55)',
    imageSrc: appReserva,
    screen: null,
  },
  {
    id: 3,
    badge: 'Posicionamiento top',
    title: 'Superhost, sin tocar el móvil.',
    description: 'El sistema responde al instante y guía al huésped. El algoritmo te premia, el huésped disfruta y tú sumas 5 estrellas.',
    color: 'rgba(168, 85, 247, 0.9)',
    bg: 'linear-gradient(135deg, #ffffff 0%, #faf5ff 100%)',
    textColor: '#0f172a',
    mutedColor: 'rgba(15, 23, 42, 0.55)',
    imageSrc: undefined,
    screen: <ChatScreen />,
  },
  {
    id: 4,
    badge: 'Coordinación 100% auto',
    title: 'Limpieza en piloto automático.',
    description: 'Hostly coordina a tu equipo con cada nueva reserva. Si una reserva cambia, la agenda se actualiza sola. Sin llamadas.',
    color: 'rgba(96, 165, 250, 0.9)',
    bg: 'linear-gradient(135deg, #ffffff 0%, #eff6ff 100%)',
    textColor: '#0f172a',
    mutedColor: 'rgba(15, 23, 42, 0.55)',
    imageSrc: undefined,
    screen: <NetejaScreen />,
  },
  {
    id: 5,
    badge: 'Revenue management',
    title: 'Tu calendario siempre optimizado.',
    description: 'Precios que se ajustan solos a la demanda real. Gana más en temporada alta, llena los huecos en temporada baja.',
    color: 'rgba(251, 146, 60, 0.9)',
    bg: 'linear-gradient(135deg, #ffffff 0%, #fff7ed 100%)',
    textColor: '#0f172a',
    mutedColor: 'rgba(15, 23, 42, 0.55)',
    imageSrc: appFinances,
    screen: null,
  },
  {
    id: 6,
    badge: 'Silencioso',
    title: 'Incidencias resueltas solas.',
    description: 'Protocolos predefinidos que actúan antes de que tú te enteres. Decisiones automáticas, escalado inteligente, sin fricciones.',
    color: 'rgba(99, 102, 241, 0.9)',
    bg: 'linear-gradient(135deg, #ffffff 0%, #eef2ff 100%)',
    textColor: '#0f172a',
    mutedColor: 'rgba(15, 23, 42, 0.55)',
    imageSrc: appAvui,
    screen: null,
  },
];

/* ─────────────────────────────────────────────────────────
   CARD ITEM
───────────────────────────────────────────────────────── */

interface CardItemProps {
  card: typeof cardData[number];
  index: number;
  totalCards: number;
}

const CardItem: React.FC<CardItemProps> = ({ card, index, totalCards }) => {
  const cardRef      = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cardEl    = cardRef.current;
    const container = containerRef.current;
    if (!cardEl || !container) return;

    const targetScale = 1 - (totalCards - index) * 0.04;
    gsap.set(cardEl, { scale: 1, transformOrigin: 'center top' });

    const trigger = ScrollTrigger.create({
      trigger: container,
      start: 'top center',
      end: 'bottom center',
      scrub: 1,
      onUpdate: (self) => {
        gsap.set(cardEl, {
          scale: Math.max(gsap.utils.interpolate(1, targetScale, self.progress), targetScale),
          transformOrigin: 'center top',
        });
      },
    });

    return () => { trigger.kill(); };
  }, [index, totalCards]);

  const solid = card.color.replace('rgba', 'rgb').replace(/,\s*[\d.]+\)$/, ')');

  return (
    <div
      ref={containerRef}
      style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'sticky', top: 0 }}
    >
      <div
        ref={cardRef}
        style={{ position: 'relative', width: '72%', maxWidth: '860px', height: '420px', borderRadius: '28px', isolation: 'isolate', top: `calc(-4vh + ${index * 20}px)`, transformOrigin: 'top' }}
      >
        {/* Conic border glow */}
        <div style={{
          position: 'absolute', inset: '-1px', borderRadius: '30px',
          background: `conic-gradient(from 0deg, transparent 0deg, ${card.color} 60deg, ${card.color.replace('0.9', '0.35')} 120deg, transparent 180deg, ${card.color.replace('0.9', '0.15')} 240deg, transparent 360deg)`,
          zIndex: -1, opacity: 0.45,
        }} />

        {/* Card body */}
        <div style={{
          position: 'relative', width: '100%', height: '100%',
          display: 'grid', gridTemplateColumns: '1fr 1fr',
          borderRadius: '28px', background: card.bg,
          border: `1px solid ${card.color.replace('0.9', '0.12')}`,
          boxShadow: '0 20px 60px rgba(0,0,0,0.07), 0 4px 16px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.9)',
          overflow: 'hidden',
        }}>

          {/* Shine */}
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '50%', background: 'linear-gradient(135deg, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0.15) 50%, transparent 100%)', pointerEvents: 'none', borderRadius: '28px 28px 0 0' }} />

          {/* Left: text */}
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '3rem 2.5rem', position: 'relative', zIndex: 1 }}>
            <span style={{ display: 'inline-block', fontSize: '10px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', padding: '4px 12px', borderRadius: '6px', width: 'fit-content', marginBottom: '1.25rem', background: card.color.replace('0.9', '0.1'), color: solid, border: `1px solid ${card.color.replace('0.9', '0.2')}` }}>
              {card.badge}
            </span>
            <h3 style={{ fontSize: 'clamp(1.3rem, 2.3vw, 1.9rem)', fontWeight: 700, lineHeight: 1.15, letterSpacing: '-0.03em', color: card.textColor, marginBottom: '1rem' }}>
              {card.title}
            </h3>
            <p style={{ fontSize: '0.9rem', lineHeight: 1.65, color: card.mutedColor, maxWidth: '290px' }}>
              {card.description}
            </p>
          </div>

          {/* Right: iPhone */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', zIndex: 1, background: `radial-gradient(ellipse 70% 70% at 50% 50%, ${card.color.replace('0.9', '0.07')} 0%, transparent 70%)`, overflow: 'visible' }}>
            <IPhone15Pro src={card.imageSrc}>
              {card.screen}
            </IPhone15Pro>
          </div>

        </div>
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────────────────
   MAIN EXPORT
───────────────────────────────────────────────────────── */

export const GlassCards: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    gsap.fromTo(el, { opacity: 0 }, { opacity: 1, duration: 0.8, ease: 'power2.out' });
  }, []);

  return (
    <div ref={containerRef} style={{ background: '#f8fafc' }}>
      {cardData.map((card, index) => (
        <CardItem key={card.id} card={card} index={index} totalCards={cardData.length} />
      ))}
    </div>
  );
};

export default GlassCards;
