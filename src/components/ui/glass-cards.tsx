import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import apartmentBg from '@/assets/apartment-hero.jpg';

gsap.registerPlugin(ScrollTrigger);

/* ── Notification data per card ── */
interface NotifData {
  title: string;
  detail: string;
}

/* ── Hostly feature card data ── */
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
    notif: {
      title: 'Código de acceso enviado',
      detail: 'Laura · Airbnb · Código 4821 · Hoy 15:30',
    },
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
    notif: {
      title: 'Registro enviado a Policía',
      detail: 'Carlos G. · DNI verificado · 3 noches',
    },
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
    notif: {
      title: 'Nueva reseña ⭐⭐⭐⭐⭐',
      detail: 'Sarah D. · "Perfecto en todo" · Airbnb',
    },
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
    notif: {
      title: 'Limpieza asignada',
      detail: 'María López · Mañana 11:00 · Eixample',
    },
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
    notif: {
      title: 'Precio optimizado +40%',
      detail: 'Viernes 18 · Alta demanda · 264€/noche',
    },
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
    notif: {
      title: 'Incidencia resuelta',
      detail: 'Protocolo activado · 0 llamadas · Sin fricciones',
    },
  },
];

/* ── iOS Notification Mockup ── */
const IPhoneMockup: React.FC<{ notif: NotifData; accentColor: string }> = ({ notif, accentColor }) => (
  <div style={{ position: 'relative', width: '155px', flexShrink: 0 }}>

    {/* Phone shell */}
    <div style={{
      background: 'linear-gradient(160deg, #3a3a3c 0%, #1c1c1e 50%, #2a2a2c 100%)',
      borderRadius: '38px',
      padding: '9px',
      boxShadow: [
        '0 0 0 1px rgba(255,255,255,0.12)',
        'inset 0 0 0 1px rgba(0,0,0,0.6)',
        '0 32px 64px rgba(0,0,0,0.25)',
        '0 8px 24px rgba(0,0,0,0.15)',
      ].join(', '),
      position: 'relative',
    }}>
      {/* Side buttons */}
      <div style={{
        position: 'absolute', left: '-3px', top: '72px',
        width: '3px', height: '28px', background: '#2a2a2c', borderRadius: '2px 0 0 2px',
      }} />
      <div style={{
        position: 'absolute', left: '-3px', top: '108px',
        width: '3px', height: '44px', background: '#2a2a2c', borderRadius: '2px 0 0 2px',
      }} />
      <div style={{
        position: 'absolute', left: '-3px', top: '158px',
        width: '3px', height: '44px', background: '#2a2a2c', borderRadius: '2px 0 0 2px',
      }} />
      <div style={{
        position: 'absolute', right: '-3px', top: '118px',
        width: '3px', height: '68px', background: '#2a2a2c', borderRadius: '0 2px 2px 0',
      }} />

      {/* Screen */}
      <div style={{
        borderRadius: '30px',
        overflow: 'hidden',
        width: '100%',
        height: '302px',
        position: 'relative',
        background: '#000',
      }}>
        {/* Apartment background blurred */}
        <img
          src={apartmentBg}
          alt=""
          style={{
            position: 'absolute', inset: 0,
            width: '100%', height: '100%',
            objectFit: 'cover',
            filter: 'blur(2px) brightness(0.75) saturate(0.9)',
            transform: 'scale(1.06)',
          }}
        />

        {/* Dynamic island */}
        <div style={{
          position: 'absolute', top: '10px', left: '50%', transform: 'translateX(-50%)',
          width: '72px', height: '22px',
          background: '#000', borderRadius: '14px',
          zIndex: 2,
        }} />

        {/* Status bar */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0,
          height: '40px', zIndex: 3,
          display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
          padding: '0 14px 5px',
        }}>
          <span style={{ fontSize: '10px', fontWeight: 700, color: 'rgba(255,255,255,0.9)', letterSpacing: '-0.02em' }}>
            17:15
          </span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span style={{ fontSize: '8px', color: 'rgba(255,255,255,0.8)' }}>▶▶▶</span>
            <span style={{ fontSize: '8px', color: 'rgba(255,255,255,0.8)' }}>■</span>
          </div>
        </div>
      </div>
    </div>

    {/* iOS Notification card — overlapping the phone */}
    <div style={{
      position: 'absolute',
      bottom: '52px',
      left: '50%',
      transform: 'translateX(-50%)',
      width: '230px',
      background: 'rgba(255,255,255,0.82)',
      backdropFilter: 'blur(24px)',
      WebkitBackdropFilter: 'blur(24px)',
      borderRadius: '18px',
      padding: '11px 13px',
      boxShadow: '0 12px 40px rgba(0,0,0,0.22), 0 2px 8px rgba(0,0,0,0.1)',
      zIndex: 10,
    }}>
      {/* Top row */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '7px', marginBottom: '6px' }}>
        <div style={{
          width: '28px', height: '28px', borderRadius: '7px', flexShrink: 0,
          background: `linear-gradient(135deg, ${accentColor.replace('0.9', '1').replace('rgba', 'rgb').replace(/, [^)]+\)$/, ')')}, ${accentColor.replace('0.9', '0.7').replace('rgba', 'rgb').replace(/, [^)]+\)$/, ')')})`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '13px', color: '#fff', fontWeight: 700,
        }}>
          ✓
        </div>
        <span style={{ fontSize: '11px', fontWeight: 700, color: '#1c1c1e', flex: 1, letterSpacing: '-0.01em' }}>
          Hostly
        </span>
        <span style={{ fontSize: '10px', color: '#8e8e93', flexShrink: 0 }}>ahora</span>
      </div>

      {/* Title */}
      <div style={{
        fontSize: '13px', fontWeight: 700, color: '#1c1c1e',
        lineHeight: 1.2, marginBottom: '2px', letterSpacing: '-0.02em',
      }}>
        {notif.title}
      </div>

      {/* Subtitle */}
      <div style={{ fontSize: '10px', color: '#8e8e93', marginBottom: '4px' }}>
        from Hostly
      </div>

      {/* Detail */}
      <div style={{ fontSize: '11px', color: '#3a3a3c', lineHeight: 1.4 }}>
        {notif.detail}
      </div>
    </div>
  </div>
);

/* ── Card item ── */
interface CardItemProps {
  card: typeof cardData[number];
  index: number;
  totalCards: number;
}

const CardItem: React.FC<CardItemProps> = ({ card, index, totalCards }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cardEl = cardRef.current;
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

  return (
    <div
      ref={containerRef}
      style={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'sticky',
        top: 0,
      }}
    >
      <div
        ref={cardRef}
        style={{
          position: 'relative',
          width: '72%',
          maxWidth: '860px',
          height: '420px',
          borderRadius: '28px',
          isolation: 'isolate',
          top: `calc(-4vh + ${index * 20}px)`,
          transformOrigin: 'top',
        }}
      >
        {/* Subtle conic border */}
        <div style={{
          position: 'absolute', inset: '-1px', borderRadius: '30px',
          background: `conic-gradient(
            from 0deg,
            transparent 0deg,
            ${card.color} 60deg,
            ${card.color.replace('0.9', '0.4')} 120deg,
            transparent 180deg,
            ${card.color.replace('0.9', '0.2')} 240deg,
            transparent 360deg
          )`,
          zIndex: -1, opacity: 0.45,
        }} />

        {/* Card body */}
        <div style={{
          position: 'relative', width: '100%', height: '100%',
          display: 'grid', gridTemplateColumns: '1fr 1fr',
          borderRadius: '28px',
          background: card.bg,
          border: `1px solid ${card.color.replace('0.9', '0.12')}`,
          boxShadow: '0 20px 60px rgba(0,0,0,0.07), 0 4px 16px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.9)',
          overflow: 'hidden',
        }}>
          {/* Glass shine */}
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0, height: '50%',
            background: 'linear-gradient(135deg, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0.15) 50%, transparent 100%)',
            pointerEvents: 'none', borderRadius: '28px 28px 0 0',
          }} />

          {/* Left: text */}
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '3rem 2.5rem' }}>
            <span style={{
              display: 'inline-block', fontSize: '10px', fontWeight: 700, letterSpacing: '0.12em',
              textTransform: 'uppercase', padding: '4px 12px', borderRadius: '6px', width: 'fit-content',
              marginBottom: '1.25rem',
              background: card.color.replace('0.9', '0.1'),
              color: card.color.replace('0.9', '1').replace('rgba', 'rgb').replace(/, [^)]+\)$/, ')'),
              border: `1px solid ${card.color.replace('0.9', '0.2')}`,
            }}>
              {card.badge}
            </span>
            <h3 style={{
              fontSize: 'clamp(1.4rem, 2.5vw, 2rem)', fontWeight: 700, lineHeight: 1.15,
              letterSpacing: '-0.03em', color: card.textColor, marginBottom: '1rem',
            }}>
              {card.title}
            </h3>
            <p style={{ fontSize: '0.95rem', lineHeight: 1.6, color: card.mutedColor, maxWidth: '300px' }}>
              {card.description}
            </p>
          </div>

          {/* Right: iPhone mockup */}
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative',
            background: `radial-gradient(ellipse 70% 70% at 50% 50%, ${card.color.replace('0.9', '0.06')} 0%, transparent 70%)`,
            overflow: 'visible',
          }}>
            <IPhoneMockup notif={card.notif} accentColor={card.color} />
          </div>
        </div>
      </div>
    </div>
  );
};

/* ── Main export ── */
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
        <CardItem
          key={card.id}
          card={card}
          index={index}
          totalCards={cardData.length}
        />
      ))}
    </div>
  );
};

export default GlassCards;
