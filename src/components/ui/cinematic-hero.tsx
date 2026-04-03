import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

const INJECTED_STYLES = `
  .gsap-reveal { visibility: hidden; }

  .film-grain {
    position: absolute; inset: 0; width: 100%; height: 100%;
    pointer-events: none; z-index: 50; opacity: 0.04; mix-blend-mode: overlay;
    background: url('data:image/svg+xml;utf8,<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><filter id="noiseFilter"><feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch"/></filter><rect width="100%" height="100%" filter="url(%23noiseFilter)"/></svg>');
  }

  .bg-grid-hostly {
    background-size: 60px 60px;
    background-image:
      linear-gradient(to right, rgba(0,0,0,0.04) 1px, transparent 1px),
      linear-gradient(to bottom, rgba(0,0,0,0.04) 1px, transparent 1px);
    mask-image: radial-gradient(ellipse at center, black 0%, transparent 70%);
    -webkit-mask-image: radial-gradient(ellipse at center, black 0%, transparent 70%);
  }

  .text-3d-hostly {
    color: #0f172a;
    text-shadow:
      0 10px 30px rgba(15,23,42,0.12),
      0 2px 4px rgba(15,23,42,0.06);
  }

  .text-silver-hostly {
    background: linear-gradient(180deg, #0f172a 0%, rgba(15,23,42,0.4) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    transform: translateZ(0);
    filter:
      drop-shadow(0px 10px 20px rgba(15,23,42,0.10))
      drop-shadow(0px 2px 4px rgba(15,23,42,0.06));
  }

  .text-card-silver {
    background: linear-gradient(180deg, #FFFFFF 0%, #A1A1AA 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    transform: translateZ(0);
    filter:
      drop-shadow(0px 12px 24px rgba(0,0,0,0.8))
      drop-shadow(0px 4px 8px rgba(0,0,0,0.6));
  }

  /* Deep navy card — Hostly brand */
  .hostly-depth-card {
    background: linear-gradient(145deg, #0f2a6e 0%, #080f1f 100%);
    box-shadow:
      0 40px 100px -20px rgba(0,0,0,0.9),
      0 20px 40px -20px rgba(0,0,0,0.8),
      inset 0 1px 2px rgba(255,255,255,0.15),
      inset 0 -2px 4px rgba(0,0,0,0.8);
    border: 1px solid rgba(255,255,255,0.04);
    position: relative;
  }

  .card-sheen {
    position: absolute; inset: 0; border-radius: inherit; pointer-events: none; z-index: 50;
    background: radial-gradient(800px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255,255,255,0.05) 0%, transparent 40%);
    mix-blend-mode: screen;
  }

  .iphone-bezel {
    background-color: #111;
    box-shadow:
      inset 0 0 0 2px #52525B,
      inset 0 0 0 7px #000,
      0 40px 80px -15px rgba(0,0,0,0.9),
      0 15px 25px -5px rgba(0,0,0,0.7);
    transform-style: preserve-3d;
  }

  .hardware-btn {
    background: linear-gradient(90deg, #404040 0%, #171717 100%);
    box-shadow:
      -2px 0 5px rgba(0,0,0,0.8),
      inset -1px 0 1px rgba(255,255,255,0.15),
      inset 1px 0 2px rgba(0,0,0,0.8);
    border-left: 1px solid rgba(255,255,255,0.05);
  }

  .screen-glare {
    background: linear-gradient(110deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0) 45%);
  }

  .floating-ui-badge {
    background: linear-gradient(135deg, rgba(255,255,255,0.09) 0%, rgba(255,255,255,0.02) 100%);
    backdrop-filter: blur(24px);
    -webkit-backdrop-filter: blur(24px);
    box-shadow:
      0 0 0 1px rgba(255,255,255,0.1),
      0 25px 50px -12px rgba(0,0,0,0.8),
      inset 0 1px 1px rgba(255,255,255,0.2),
      inset 0 -1px 1px rgba(0,0,0,0.5);
  }

  .btn-hostly-primary {
    background: linear-gradient(180deg, #FFFFFF 0%, #F1F5F9 100%);
    color: #0f172a;
    box-shadow:
      0 0 0 1px rgba(0,0,0,0.05),
      0 2px 4px rgba(0,0,0,0.1),
      0 12px 24px -4px rgba(0,0,0,0.3),
      inset 0 1px 1px rgba(255,255,255,1),
      inset 0 -3px 6px rgba(0,0,0,0.06);
    transition: all 0.4s cubic-bezier(0.25,1,0.5,1);
  }
  .btn-hostly-primary:hover {
    transform: translateY(-3px);
    box-shadow:
      0 0 0 1px rgba(0,0,0,0.05),
      0 6px 12px -2px rgba(0,0,0,0.15),
      0 20px 32px -6px rgba(0,0,0,0.4),
      inset 0 1px 1px rgba(255,255,255,1);
  }
  .btn-hostly-primary:active { transform: translateY(1px); }

  .btn-hostly-secondary {
    background: linear-gradient(180deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.06) 100%);
    color: #fff;
    border: 1px solid rgba(255,255,255,0.15);
    box-shadow:
      0 2px 4px rgba(0,0,0,0.4),
      inset 0 1px 1px rgba(255,255,255,0.1);
    transition: all 0.4s cubic-bezier(0.25,1,0.5,1);
  }
  .btn-hostly-secondary:hover {
    transform: translateY(-3px);
    background: linear-gradient(180deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.1) 100%);
    border-color: rgba(255,255,255,0.25);
  }
  .btn-hostly-secondary:active { transform: translateY(1px); }

  .progress-ring {
    transform: rotate(-90deg);
    transform-origin: center;
    stroke-dasharray: 402;
    stroke-dashoffset: 402;
    stroke-linecap: round;
  }

  /* Notification feed scroll */
  @keyframes notif-scroll {
    0%   { transform: translateY(0); }
    100% { transform: translateY(-50%); }
  }
  .notif-track {
    animation: notif-scroll 14s linear infinite;
    will-change: transform;
  }
  .notif-track:hover { animation-play-state: paused; }
`;

/* ─────────────────────────────────────────────────────────
   PHONE NOTIFICATION FEED — animated continuous scroll
───────────────────────────────────────────────────────── */

const NOTIFS = [
  {
    icon: '✅',
    iconBg: '#1a3a20',
    iconColor: '#34c759',
    app: 'Hostly · Check-in',
    title: 'Check-in completado',
    detail: 'Laura · Airbnb · Código 4821 enviado',
    time: 'ahora',
  },
  {
    icon: '🤖',
    iconBg: '#0f1f3a',
    iconColor: '#3b7ff5',
    app: 'Hostly · IA',
    title: 'Respuesta automática enviada',
    detail: '"Bienvenida Sarah, tu código es 4821..."',
    time: 'ahora',
  },
  {
    icon: '📈',
    iconBg: '#2a1800',
    iconColor: '#ff9500',
    app: 'Hostly · Revenue',
    title: 'Precio actualizado +40%',
    detail: 'Viernes 18 · Alta demanda · 264€/noche',
    time: 'hace 1 min',
  },
  {
    icon: '🛡️',
    iconBg: '#0a2020',
    iconColor: '#30b0c7',
    app: 'Hostly · Legal',
    title: 'Mossos notificados',
    detail: 'Carlos G. · DNI verificado · 3 noches',
    time: 'hace 2 min',
  },
  {
    icon: '🧹',
    iconBg: '#1a1040',
    iconColor: '#5856d6',
    app: 'Hostly · Neteja',
    title: 'Limpieza coordinada',
    detail: 'Anna López · Mañana 11:00 · Eixample',
    time: 'hace 3 min',
  },
  {
    icon: '⭐',
    iconBg: '#2a2000',
    iconColor: '#ffd60a',
    app: 'Hostly · Reseñas',
    title: 'Nueva reseña 5 estrellas',
    detail: 'Sarah D. · "Perfecte en tot" · Airbnb',
    time: 'hace 4 min',
  },
  {
    icon: '🔑',
    iconBg: '#0f1f3a',
    iconColor: '#60a5fa',
    app: 'Hostly · Acceso',
    title: 'Código de acceso enviado',
    detail: 'YANG TING · Código 8372 · Hoy 14:00',
    time: 'hace 5 min',
  },
  {
    icon: '💰',
    iconBg: '#1a3a20',
    iconColor: '#34c759',
    app: 'Hostly · Reserva',
    title: 'Reserva confirmada · 620€',
    detail: 'Marcos · Booking · 4 noches · Eixample',
    time: 'hace 6 min',
  },
];

/* ── Static phone screen with GSAP-controlled notification cards ── */
const PHONE_NOTIFS = [
  { icon: '💰', iconBg: '#0d2b18', iconColor: '#34c759', label: 'Hostly · Reserva', title: 'Reserva confirmada · 620€', detail: 'Marcos · Booking · 4 noches' },
  { icon: '✅', iconBg: '#0a1a30', iconColor: '#3b7ff5', label: 'Hostly · Check-in', title: 'Check-in completado', detail: 'Laura · Airbnb · Código 4821' },
  { icon: '📈', iconBg: '#221200', iconColor: '#ff9500', label: 'Hostly · Revenue', title: 'Precio actualizado +40%', detail: 'Viernes 18 · Alta demanda · 264€' },
  { icon: '🧹', iconBg: '#130d33', iconColor: '#a78bfa', label: 'Hostly · Neteja', title: 'Limpieza coordinada', detail: 'Anna López · Mañana 11:00' },
];

const PhoneScreen: React.FC = () => (
  <div style={{ width: '100%', height: '100%', background: '#04091a', position: 'relative', fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>
    {/* Status bar */}
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 16px 4px' }}>
      <span style={{ fontSize: '12px', fontWeight: 700, color: '#fff', letterSpacing: '-0.02em' }}>17:15</span>
      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
        <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#34c759', boxShadow: '0 0 6px #34c75988' }} />
      </div>
    </div>
    {/* Date */}
    <div style={{ textAlign: 'center', paddingBottom: '8px' }}>
      <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.35)', fontWeight: 500, letterSpacing: '0.02em' }}>Viernes, 18 de Abril</div>
    </div>

    {/* Notification cards — opacity/y controlled by GSAP */}
    {PHONE_NOTIFS.map((n, i) => (
      <div
        key={i}
        className={`phone-notif phone-notif-${i}`}
        style={{
          position: 'absolute',
          left: '8px', right: '8px',
          top: `${52 + i * 88}px`,
          background: 'rgba(255,255,255,0.07)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(255,255,255,0.09)',
          borderRadius: '16px',
          padding: '10px 12px',
          display: 'flex',
          gap: '10px',
          alignItems: 'center',
        }}
      >
        <div style={{
          width: '38px', height: '38px', borderRadius: '10px', flexShrink: 0,
          background: n.iconBg, border: `1px solid ${n.iconColor}25`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '20px', boxShadow: `0 0 10px ${n.iconColor}18`,
        }}>{n.icon}</div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: '9px', fontWeight: 700, color: 'rgba(255,255,255,0.35)', letterSpacing: '0.04em', textTransform: 'uppercase', marginBottom: '2px' }}>{n.label}</div>
          <div style={{ fontSize: '13px', fontWeight: 700, color: '#fff', letterSpacing: '-0.01em', lineHeight: 1.2 }}>{n.title}</div>
          <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.45)', marginTop: '1px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{n.detail}</div>
        </div>
        <div style={{ fontSize: '9px', color: 'rgba(255,255,255,0.25)', flexShrink: 0 }}>ahora</div>
      </div>
    ))}

    {/* Home indicator */}
    <div style={{ position: 'absolute', bottom: '6px', left: '50%', transform: 'translateX(-50%)', width: '100px', height: '4px', background: 'rgba(255,255,255,0.18)', borderRadius: '2px' }} />
  </div>
);

/* Keep NOTIFS array to avoid TS error but no longer used in render */
const _NOTIFS_UNUSED = NOTIFS;
void _NOTIFS_UNUSED;

const PhoneNotificationFeed_UNUSED: React.FC = () => {
  const items = [...NOTIFS, ...NOTIFS];
  return (
    <div style={{
      width: '100%', height: '100%',
      background: 'linear-gradient(180deg, #04091a 0%, #060d22 100%)',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
    }}>

      {/* Status bar */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '10px 16px 6px',
        flexShrink: 0,
      }}>
        <span style={{ fontSize: '12px', fontWeight: 700, color: '#fff', letterSpacing: '-0.02em' }}>17:15</span>
        <div style={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
          <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
            <rect x="0" y="4" width="3" height="8" rx="1" fill="rgba(255,255,255,0.4)" />
            <rect x="4.5" y="2.5" width="3" height="9.5" rx="1" fill="rgba(255,255,255,0.6)" />
            <rect x="9" y="1" width="3" height="11" rx="1" fill="rgba(255,255,255,0.8)" />
            <rect x="13" y="0" width="3" height="12" rx="1" fill="#fff" />
          </svg>
          <svg width="15" height="12" viewBox="0 0 15 12" fill="white" opacity="0.9">
            <path d="M7.5 2.5C9.8 2.5 11.9 3.5 13.3 5.1L14.8 3.4C12.9 1.3 10.3 0 7.5 0S2.1 1.3 0.2 3.4L1.7 5.1C3.1 3.5 5.2 2.5 7.5 2.5Z"/>
            <path d="M7.5 5.5C9 5.5 10.3 6.1 11.2 7.1L12.7 5.4C11.3 3.9 9.5 3 7.5 3S3.7 3.9 2.3 5.4L3.8 7.1C4.7 6.1 6 5.5 7.5 5.5Z"/>
            <circle cx="7.5" cy="10" r="1.8"/>
          </svg>
          <div style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
            <div style={{ width: '22px', height: '11px', border: '1px solid rgba(255,255,255,0.35)', borderRadius: '3px', padding: '1px', display: 'flex', alignItems: 'center', position: 'relative' }}>
              <div style={{ width: '75%', height: '100%', background: '#34c759', borderRadius: '1.5px' }} />
              <div style={{ position: 'absolute', right: '-3px', top: '50%', transform: 'translateY(-50%)', width: '2px', height: '5px', background: 'rgba(255,255,255,0.4)', borderRadius: '0 1px 1px 0' }} />
            </div>
          </div>
        </div>
      </div>

      {/* Date */}
      <div style={{ textAlign: 'center', padding: '4px 0 10px', flexShrink: 0 }}>
        <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.45)', fontWeight: 500 }}>
          Viernes, 18 de Abril
        </div>
      </div>

      {/* Notification feed — continuous scroll */}
      <div style={{ flex: 1, overflow: 'hidden', padding: '0 8px', position: 'relative' }}>
        {/* Fade top */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: '32px', zIndex: 10,
          background: 'linear-gradient(180deg, #04091a 0%, transparent 100%)',
          pointerEvents: 'none',
        }} />
        {/* Fade bottom */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: '48px', zIndex: 10,
          background: 'linear-gradient(0deg, #060d22 0%, transparent 100%)',
          pointerEvents: 'none',
        }} />

        <div className="notif-track">
          {items.map((n, i) => (
            <div key={i} style={{
              background: 'rgba(255,255,255,0.07)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '16px',
              padding: '10px 12px',
              marginBottom: '8px',
              display: 'flex',
              gap: '10px',
              alignItems: 'flex-start',
            }}>
              {/* App icon */}
              <div style={{
                width: '36px', height: '36px', borderRadius: '10px', flexShrink: 0,
                background: n.iconBg,
                border: `1px solid ${n.iconColor}30`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '18px',
                boxShadow: `0 0 12px ${n.iconColor}20`,
              }}>
                {n.icon}
              </div>

              {/* Content */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2px' }}>
                  <span style={{ fontSize: '10px', fontWeight: 700, color: 'rgba(255,255,255,0.45)', letterSpacing: '0.02em' }}>
                    {n.app}
                  </span>
                  <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.3)', flexShrink: 0, marginLeft: '6px' }}>
                    {n.time}
                  </span>
                </div>
                <div style={{ fontSize: '13px', fontWeight: 700, color: '#fff', lineHeight: 1.2, marginBottom: '2px', letterSpacing: '-0.01em' }}>
                  {n.title}
                </div>
                <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.3, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {n.detail}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Home indicator */}
      <div style={{ display: 'flex', justifyContent: 'center', padding: '8px 0 6px', flexShrink: 0 }}>
        <div style={{ width: '100px', height: '4px', background: 'rgba(255,255,255,0.2)', borderRadius: '2px' }} />
      </div>
    </div>
  );
};

export interface CinematicHeroProps extends React.HTMLAttributes<HTMLDivElement> {
  onOpenQuiz?: () => void;
}

export function CinematicHero({ onOpenQuiz, className, ...props }: CinematicHeroProps) {
  const containerRef  = useRef<HTMLDivElement>(null);
  const mainCardRef   = useRef<HTMLDivElement>(null);
  const mockupRef     = useRef<HTMLDivElement>(null);
  const requestRef    = useRef<number>(0);

  /* Mouse tilt + card sheen */
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (window.scrollY > window.innerHeight * 2) return;
      cancelAnimationFrame(requestRef.current);
      requestRef.current = requestAnimationFrame(() => {
        if (!mainCardRef.current || !mockupRef.current) return;
        const rect  = mainCardRef.current.getBoundingClientRect();
        mainCardRef.current.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
        mainCardRef.current.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
        const xVal = (e.clientX / window.innerWidth  - 0.5) * 2;
        const yVal = (e.clientY / window.innerHeight - 0.5) * 2;
        gsap.to(mockupRef.current, { rotationY: xVal * 10, rotationX: -yVal * 10, ease: "power3.out", duration: 1.2 });
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => { window.removeEventListener("mousemove", handleMouseMove); cancelAnimationFrame(requestRef.current); };
  }, []);

  /* Cinematic scroll timeline */
  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    const ctx = gsap.context(() => {

      gsap.set(".text-track",    { autoAlpha: 0, y: 60, scale: 0.85, filter: "blur(20px)", rotationX: -20 });
      gsap.set(".text-days",     { autoAlpha: 1, clipPath: "inset(0 100% 0 0)" });
      gsap.set(".main-card",     { y: window.innerHeight + 200, autoAlpha: 1 });
      gsap.set([".card-left-text", ".card-right-text", ".mockup-scroll-wrapper"], { autoAlpha: 0 });
      gsap.set([".floating-badge-1", ".floating-badge-2"], { autoAlpha: 0 });
      gsap.set(".phone-notif",   { autoAlpha: 0, y: 40 });
      gsap.set(".cta-wrapper",   { autoAlpha: 0, scale: 0.8, filter: "blur(30px)" });

      // Intro
      const introTl = gsap.timeline({ delay: 0.3 });
      introTl
        .to(".text-track", { duration: 1.8, autoAlpha: 1, y: 0, scale: 1, filter: "blur(0px)", rotationX: 0, ease: "expo.out" })
        .to(".text-days",  { duration: 1.4, clipPath: "inset(0 0% 0 0)", ease: "power4.inOut" }, "-=1.0");

      // Scroll-driven
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=7000",
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        },
      });

      scrollTl
        // ── Phase 0: hero text fades, card rises ──
        .to([".hero-text-wrapper", ".bg-grid-hostly"], { scale: 1.15, filter: "blur(20px)", opacity: 0.2, ease: "power2.inOut", duration: 2 }, 0)
        .to(".main-card", { y: 0, ease: "power3.inOut", duration: 2 }, 0)

        // ── Phase 1: card expands to fullscreen ──
        .to(".main-card", { width: "100%", height: "100%", borderRadius: "0px", ease: "power3.inOut", duration: 1.5 })

        // ── Phase 2: iPhone appears ──
        .fromTo(".mockup-scroll-wrapper",
          { y: 300, z: -500, rotationX: 50, rotationY: -30, autoAlpha: 0, scale: 0.6 },
          { y: 0, z: 0, rotationX: 0, rotationY: 0, autoAlpha: 1, scale: 1, ease: "expo.out", duration: 2 }, "-=0.5"
        )

        // ── Phase 3: notificacions apareixen dins el telèfon una a una ──
        .to(".phone-notif-0", { autoAlpha: 1, y: 0, duration: 0.7, ease: "back.out(1.3)" }, "+=0.4")
        .to(".phone-notif-1", { autoAlpha: 1, y: 0, duration: 0.7, ease: "back.out(1.3)" }, "+=0.3")
        .to(".phone-notif-2", { autoAlpha: 1, y: 0, duration: 0.7, ease: "back.out(1.3)" }, "+=0.3")
        .to(".phone-notif-3", { autoAlpha: 1, y: 0, duration: 0.7, ease: "back.out(1.3)" }, "+=0.3")

        // ── Pausa: totes visibles ──
        .to({}, { duration: 1.2 })

        // ── Phase 4: TRANSFORMACIÓ — notifs es converteixen en bubbles ──
        // Les notificacions s'esvaeixen cap endins
        .to(".phone-notif", { autoAlpha: 0, scale: 0.7, y: -20, duration: 0.7, ease: "power2.in" })

        // Les bubbles "surten volant" del centre del telèfon cap a les seves posicions
        .fromTo(".floating-badge-1",
          { autoAlpha: 0, x: "90px", y: "110px", scale: 0.15, rotationZ: 10 },
          { autoAlpha: 1, x: 0, y: 0, scale: 1, rotationZ: 0, ease: "expo.out", duration: 2.2 }, "-=0.3"
        )
        .fromTo(".floating-badge-2",
          { autoAlpha: 0, x: "-90px", y: "-90px", scale: 0.15, rotationZ: -10 },
          { autoAlpha: 1, x: 0, y: 0, scale: 1, rotationZ: 0, ease: "expo.out", duration: 2.2 }, "-=1.8"
        )

        // ── Phase 5: text entra ──
        .fromTo(".card-left-text",  { x: -50, autoAlpha: 0 }, { x: 0, autoAlpha: 1, ease: "power4.out", duration: 1.5 }, "-=1.2")
        .fromTo(".card-right-text", { x: 50, autoAlpha: 0, scale: 0.8 }, { x: 0, autoAlpha: 1, scale: 1, ease: "expo.out", duration: 1.5 }, "<")

        // ── Pausa final ──
        .to({}, { duration: 2.5 })

        // ── Phase 6: sortida cap al CTA ──
        .set(".hero-text-wrapper", { autoAlpha: 0 })
        .set(".cta-wrapper", { autoAlpha: 1 })
        .to({}, { duration: 1.5 })
        .to([".mockup-scroll-wrapper", ".floating-badge-1", ".floating-badge-2", ".card-left-text", ".card-right-text"], {
          scale: 0.9, y: -40, z: -200, autoAlpha: 0, ease: "power3.in", duration: 1.2, stagger: 0.05,
        })
        .to(".main-card", {
          width: isMobile ? "92vw" : "85vw",
          height: isMobile ? "92vh" : "85vh",
          borderRadius: isMobile ? "32px" : "40px",
          ease: "expo.inOut", duration: 1.8,
        }, "pullback")
        .to(".cta-wrapper", { scale: 1, filter: "blur(0px)", ease: "expo.inOut", duration: 1.8 }, "pullback")
        .to(".main-card", { y: -window.innerHeight - 300, ease: "power3.in", duration: 1.5 });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn("relative w-screen h-screen overflow-hidden flex items-center justify-center bg-background font-sans antialiased", className)}
      style={{ perspective: "1500px" }}
      {...props}
    >
      <style dangerouslySetInnerHTML={{ __html: INJECTED_STYLES }} />
      <div className="film-grain" aria-hidden="true" />
      <div className="bg-grid-hostly absolute inset-0 z-0 pointer-events-none opacity-60" aria-hidden="true" />

      {/* ── Background: hero tagline ── */}
      <div className="hero-text-wrapper absolute z-10 flex flex-col items-center justify-center text-center w-screen px-4 will-change-transform">
        <h1 className="text-track gsap-reveal text-3d-hostly text-5xl md:text-7xl lg:text-[6rem] font-bold tracking-tight mb-2">
          Tu apartamento debería
        </h1>
        <h1 className="text-days gsap-reveal text-silver-hostly text-5xl md:text-7xl lg:text-[6rem] font-extrabold tracking-tighter">
          trabajar sin ti.
        </h1>
      </div>

      {/* ── Background: CTA final ── */}
      <div className="cta-wrapper absolute z-10 flex flex-col items-center justify-center text-center w-screen px-4 gsap-reveal pointer-events-auto will-change-transform">
        <p className="text-xs font-bold tracking-[0.15em] uppercase text-blue-400 mb-6">
          Para propietarios que quieren sistema, no caos
        </p>
        <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight text-card-silver">
          Empieza gratis hoy.
        </h2>
        <p className="text-blue-100/60 text-lg md:text-xl mb-12 max-w-xl mx-auto font-light leading-relaxed">
          Sin permanencia. Sin comisiones. Solo sistema que trabaja por ti.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={onOpenQuiz}
            className="btn-hostly-primary flex items-center justify-center gap-3 px-10 py-4 rounded-[1.25rem] text-base font-bold"
          >
            Pruébalo gratis
          </button>
          <button
            onClick={() => document.getElementById("steps")?.scrollIntoView({ behavior: "smooth" })}
            className="btn-hostly-secondary flex items-center justify-center gap-3 px-10 py-4 rounded-[1.25rem] text-base font-semibold"
          >
            Ver cómo funciona
          </button>
        </div>
      </div>

      {/* ── Foreground: deep navy card ── */}
      <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none" style={{ perspective: "1500px" }}>
        <div
          ref={mainCardRef}
          className="main-card hostly-depth-card relative overflow-hidden gsap-reveal flex items-center justify-center pointer-events-auto w-[92vw] md:w-[85vw] h-[92vh] md:h-[85vh] rounded-[32px] md:rounded-[40px]"
        >
          <div className="card-sheen" aria-hidden="true" />

          <div className="relative w-full h-full max-w-7xl mx-auto px-4 lg:px-12 flex flex-col justify-evenly lg:grid lg:grid-cols-3 items-center lg:gap-8 z-10 py-6 lg:py-0">

            {/* Top (mobile) / Right (desktop): Brand */}
            <div className="card-right-text gsap-reveal order-1 lg:order-3 flex justify-center lg:justify-end z-20 w-full">
              <h2 className="text-6xl md:text-[6rem] lg:text-[8rem] font-black uppercase tracking-tighter text-card-silver">
                Hostly
              </h2>
            </div>

            {/* Center: iPhone mockup */}
            <div className="mockup-scroll-wrapper order-2 lg:order-2 relative w-full h-[380px] lg:h-[600px] flex items-center justify-center z-10" style={{ perspective: "1000px" }}>
              <div className="relative w-full h-full flex items-center justify-center transform scale-[0.65] md:scale-85 lg:scale-100">

                {/* iPhone bezel */}
                <div
                  ref={mockupRef}
                  className="relative w-[280px] h-[580px] rounded-[3rem] iphone-bezel flex flex-col will-change-transform"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  {/* Hardware buttons */}
                  <div className="absolute top-[120px] -left-[3px] w-[3px] h-[25px] hardware-btn rounded-l-md" aria-hidden="true" />
                  <div className="absolute top-[160px] -left-[3px] w-[3px] h-[45px] hardware-btn rounded-l-md" aria-hidden="true" />
                  <div className="absolute top-[220px] -left-[3px] w-[3px] h-[45px] hardware-btn rounded-l-md" aria-hidden="true" />
                  <div className="absolute top-[170px] -right-[3px] w-[3px] h-[70px] hardware-btn rounded-r-md" style={{ transform: "scaleX(-1)" }} aria-hidden="true" />

                  {/* Screen */}
                  <div className="absolute inset-[7px] rounded-[2.5rem] overflow-hidden z-10">
                    <div className="absolute inset-0 screen-glare z-40 pointer-events-none" aria-hidden="true" />

                    {/* Dynamic Island */}
                    <div className="absolute top-[5px] left-1/2 -translate-x-1/2 w-[100px] h-[28px] bg-black rounded-full z-50" />

                    {/* Static notifications — GSAP controlled */}
                    <PhoneScreen />
                  </div>
                </div>

                {/* Bubble 1 — surt del telèfon cap a dalt-esquerra */}
                <div className="floating-badge-1 absolute top-6 lg:top-12 left-[-15px] lg:left-[-90px] floating-ui-badge rounded-xl lg:rounded-2xl p-3 lg:p-4 flex items-center gap-3 z-30">
                  <div className="w-9 h-9 rounded-full bg-green-500/20 flex items-center justify-center border border-green-400/30 flex-shrink-0">
                    <span className="text-lg" aria-hidden="true">💰</span>
                  </div>
                  <div>
                    <p className="text-white text-xs lg:text-sm font-bold tracking-tight">Reserva confirmada · 620€</p>
                    <p className="text-blue-200/50 text-[10px] lg:text-xs font-medium">Marcos · Booking · 4 noches</p>
                  </div>
                </div>

                {/* Bubble 2 — surt del telèfon cap a baix-dreta */}
                <div className="floating-badge-2 absolute bottom-12 lg:bottom-20 right-[-15px] lg:right-[-90px] floating-ui-badge rounded-xl lg:rounded-2xl p-3 lg:p-4 flex items-center gap-3 z-30">
                  <div className="w-9 h-9 rounded-full bg-purple-500/20 flex items-center justify-center border border-purple-400/30 flex-shrink-0">
                    <span className="text-lg" aria-hidden="true">🧹</span>
                  </div>
                  <div>
                    <p className="text-white text-xs lg:text-sm font-bold tracking-tight">Limpieza coordinada</p>
                    <p className="text-blue-200/50 text-[10px] lg:text-xs font-medium">Anna López · Mañana 11:00</p>
                  </div>
                </div>

              </div>
            </div>

            {/* Bottom (mobile) / Left (desktop): Description */}
            <div className="card-left-text gsap-reveal order-3 lg:order-1 flex flex-col justify-center text-center lg:text-left z-20 w-full px-4 lg:px-0">
              <h3 className="text-white text-2xl md:text-3xl lg:text-4xl font-bold mb-0 lg:mb-5 tracking-tight">
                Sistema. No herramienta.
              </h3>
              <p className="hidden md:block text-blue-100/60 text-sm md:text-base lg:text-lg font-normal leading-relaxed max-w-sm lg:max-w-none">
                <span className="text-white font-semibold">Hostly</span> gestiona check-ins, limpiezas, precios y registros policiales. Configura una vez. Desconéctate para siempre.
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
