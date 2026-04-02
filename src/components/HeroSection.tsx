import { motion, AnimatePresence, useScroll, useInView, useMotionValue, animate } from "framer-motion";
import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";
import { useState, useEffect, useRef } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

const appleEase = [0.22, 1, 0.36, 1] as const;

/* ── Animated stat chip ── */
interface StatItem {
  rawValue: number;
  suffix: string;
  label: string;
  emoji: string;
}

const StatChip = ({ stat, delay }: { stat: StatItem; delay: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const motionVal = useMotionValue(0);
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (!inView) return;
    const controls = animate(motionVal, stat.rawValue, {
      duration: 1.4,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => {
        const n = Math.round(v);
        setDisplay(n.toLocaleString("es-ES") + stat.suffix);
      },
    });
    return controls.stop;
  }, [inView, stat.rawValue, stat.suffix]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 10, scale: 0.97 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.45, delay, ease: appleEase }}
      className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-background border border-border/70 shadow-sm cursor-default select-none hover:border-primary/30 hover:shadow-md transition-all duration-300"
    >
      <span className="text-base leading-none">{stat.emoji}</span>
      <span className="text-sm font-bold text-foreground tabular-nums">
        +{inView ? display : "0" + stat.suffix}
      </span>
      <span className="text-sm text-muted-foreground">{stat.label}</span>
    </motion.div>
  );
};

const stats: StatItem[] = [
  { rawValue: 7000,  suffix: "",  emoji: "💬", label: "mensajes respondidos" },
  { rawValue: 4000,  suffix: "",  emoji: "🛡️", label: "registros policiales" },
  { rawValue: 3500,  suffix: "",  emoji: "🧹", label: "limpiezas coordinadas" },
  { rawValue: 3000,  suffix: "",  emoji: "⭐", label: "reseñas de 5 estrellas" },
  { rawValue: 4000,  suffix: "",  emoji: "🏠", label: "huéspedes atendidos" },
  { rawValue: 99000, suffix: "h", emoji: "⏰", label: "devueltas a propietarios" },
];

/* ── Floating notification cards ── */
const floatingNotifs = [
  { icon: "✅", iconBg: "#22c55e", app: "Hostly · Check-in",    text: "Código enviado a Miguel R.",     time: "Ahora",      delay: 0 },
  { icon: "🛡️", iconBg: "#3b82f6", app: "Hostly · Legal",       text: "Registro policial enviado",      time: "Hace 2 min", delay: 0.12 },
  { icon: "🧹", iconBg: "#8b5cf6", app: "Hostly · Limpieza",    text: "Limpiadora notificada · 11:00",  time: "Hace 5 min", delay: 0.22 },
  { icon: "⭐", iconBg: "#f59e0b", app: "Airbnb · Nueva reseña", text: "\"Perfecta experiencia, 5★\"",   time: "Hace 12 min", delay: 0.32 },
];

const FloatingNotifCard = ({
  notif,
  floatOffset,
}: {
  notif: (typeof floatingNotifs)[number];
  floatOffset: number;
}) => (
  <motion.div
    initial={{ opacity: 0, x: 40, scale: 0.95 }}
    animate={{ opacity: 1, x: 0, scale: 1 }}
    transition={{ duration: 0.6, delay: 0.5 + notif.delay, ease: appleEase }}
  >
    <motion.div
      animate={{ y: [0, floatOffset, 0] }}
      transition={{ duration: 3.5 + notif.delay * 4, repeat: Infinity, ease: "easeInOut" }}
      className="flex items-center gap-3 rounded-2xl px-4 py-3"
      style={{
        background: "rgba(255,255,255,0.88)",
        backdropFilter: "blur(32px) saturate(180%)",
        WebkitBackdropFilter: "blur(32px) saturate(180%)",
        border: "1px solid rgba(0,0,0,0.06)",
        boxShadow: "0 8px 32px rgba(0,0,0,0.08), 0 2px 8px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,1)",
      }}
    >
      <div
        className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 text-[17px]"
        style={{ background: notif.iconBg + "18", border: `1px solid ${notif.iconBg}28` }}
      >
        {notif.icon}
      </div>
      <div className="min-w-0">
        <p className="text-[10px] text-gray-400 font-medium leading-none mb-0.5">{notif.app}</p>
        <p className="text-[12px] font-semibold text-gray-800 truncate">{notif.text}</p>
      </div>
      <span className="text-[9px] text-gray-300 flex-shrink-0 ml-1">{notif.time}</span>
    </motion.div>
  </motion.div>
);

/* ── Cycling phrases ── */
const PHRASES: ReactNode[] = [
  "por ti.",
  "para ti.",
  <>en piloto <br className="md:hidden" />automático.</>,
];
const UNDERLINE_WIDTHS = ["52%", "58%", "100%"];

const slotVariants = {
  enter: { y: "-110%", opacity: 0 },
  center: { y: "0%", opacity: 1, transition: { duration: 0.5, ease: appleEase } },
  exit:   { y: "110%", opacity: 0, transition: { duration: 0.38, ease: appleEase } },
};

const lineReveal = {
  hidden: { y: "100%" },
  visible: (i: number) => ({
    y: "0%",
    transition: { duration: 0.65, delay: i * 0.09, ease: appleEase },
  }),
};
const fadeUp = {
  hidden:   { opacity: 0, y: 24 },
  visible: (delay: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.55, delay, ease: appleEase },
  }),
};

interface HeroSectionProps { onOpenQuiz?: () => void; }

const HeroSection = ({ onOpenQuiz }: HeroSectionProps) => {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const isMobile = useIsMobile();
  const [mousePos, setMousePos] = useState({ x: 50, y: 30 });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  useEffect(() => {
    const unsub = scrollYProgress.on("change", (v) => {
      setPhraseIndex(v >= 0.52 ? 2 : v >= 0.28 ? 1 : 0);
    });
    return unsub;
  }, [scrollYProgress]);

  /* Mouse-following gradient */
  useEffect(() => {
    if (isMobile) return;
    const handler = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };
    window.addEventListener("mousemove", handler, { passive: true });
    return () => window.removeEventListener("mousemove", handler);
  }, [isMobile]);

  return (
    <section ref={sectionRef} className="relative bg-background" style={{ minHeight: "420vh" }}>

      {/* ── Background layers ── */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage: "radial-gradient(hsl(229 65% 52% / 0.18) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: "radial-gradient(ellipse 90% 55% at 50% -5%, hsl(229 65% 52% / 0.10) 0%, transparent 65%)",
          }}
        />
        <div
          className="absolute inset-0 transition-[background] duration-700 ease-out"
          style={{
            background: `radial-gradient(700px at ${mousePos.x}% ${mousePos.y}%, hsl(229 65% 52% / 0.07), transparent 70%)`,
          }}
        />
        <div
          className="absolute -bottom-32 -left-32 w-[500px] h-[500px] rounded-full opacity-[0.06]"
          style={{ background: "hsl(20 100% 59%)", filter: "blur(80px)" }}
        />
        <div
          className="absolute -bottom-20 -right-20 w-[400px] h-[400px] rounded-full opacity-[0.05]"
          style={{ background: "hsl(229 65% 52%)", filter: "blur(80px)" }}
        />
      </div>

      {/* ── Sticky panel ── */}
      <div className="sticky top-0 min-h-screen flex flex-col items-center justify-center pt-24 pb-10 px-6 md:px-12 lg:px-20 overflow-hidden">
        <div className="max-w-6xl mx-auto relative z-10 w-full">
          <div className="grid lg:grid-cols-[1fr_420px] gap-12 xl:gap-20 items-center mb-16">

            {/* LEFT */}
            <div className="text-center lg:text-left">
              {/* Badge */}
              <motion.div
                variants={fadeUp} initial="hidden" animate="visible" custom={0}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-background/80 border border-border/80 backdrop-blur-sm mb-10 shadow-sm"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                <span className="text-sm text-foreground/75 font-medium tracking-[-0.01em]">
                  Para propietarios que no quieren una segunda ocupación
                </span>
              </motion.div>

              {/* H1 with rotating phrase */}
              <h1 className="text-[2.5rem] md:text-[5rem] lg:text-[5.5rem] font-bold tracking-[-0.04em] text-foreground mb-6 leading-[0.94]">
                <span className="overflow-hidden block">
                  <motion.span variants={lineReveal} initial="hidden" animate="visible" custom={0} className="block">
                    Haz que funcione
                  </motion.span>
                </span>
                <span className="block">
                  <motion.span variants={lineReveal} initial="hidden" animate="visible" custom={1} className="relative inline-block italic">
                    <span
                      className="relative overflow-hidden inline-block align-bottom"
                      style={{
                        height: isMobile && phraseIndex === 2 ? "2.5em" : "1.08em",
                        maxWidth: "100vw",
                        transition: "height 0.3s ease",
                      }}
                    >
                      <AnimatePresence mode="popLayout" initial={false}>
                        <motion.span
                          key={phraseIndex}
                          variants={slotVariants}
                          initial="enter" animate="center" exit="exit"
                          className="inline-block text-primary whitespace-nowrap"
                        >
                          {PHRASES[phraseIndex]}
                        </motion.span>
                      </AnimatePresence>
                    </span>
                    <AnimatePresence mode="wait" initial={false}>
                      <motion.span
                        key={`ul-${phraseIndex}`}
                        initial={{ scaleX: 0, opacity: 0 }}
                        animate={{ scaleX: 1, opacity: 1 }}
                        exit={{ scaleX: 0, opacity: 0 }}
                        transition={{ duration: 0.42, ease: appleEase }}
                        style={{ transformOrigin: "left center", width: UNDERLINE_WIDTHS[phraseIndex] }}
                        className="absolute left-0 -bottom-1 h-[5px] bg-primary/15 rounded-full"
                      />
                    </AnimatePresence>
                  </motion.span>
                </span>
              </h1>

              {/* Subtitle */}
              <motion.p
                variants={fadeUp} initial="hidden" animate="visible" custom={0.2}
                className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0 mb-10 leading-relaxed tracking-[-0.01em]"
              >
                Deja de llevar el negocio en la cabeza. Hostly convierte tu gestión dispersa
                en un sistema que trabaja solo —{" "}
                <span className="text-foreground font-semibold">de 7 horas a menos de 20 minutos a la semana.</span>
              </motion.p>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.35, ease: appleEase }}
                className="flex flex-col sm:flex-row items-center lg:items-start justify-center lg:justify-start gap-3 mb-5"
              >
                <a
                  href="#demo-video"
                  className="group inline-flex items-center gap-3 px-7 py-4 rounded-full bg-primary text-primary-foreground font-semibold text-base transition-all duration-300 hover:shadow-[0_8px_32px_hsl(229_65%_52%/0.35)] hover:-translate-y-0.5 active:scale-[0.98]"
                >
                  Ver demo de 2 min
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                </a>
                <button
                  onClick={onOpenQuiz}
                  className="inline-flex items-center gap-2 px-7 py-4 rounded-full border border-border bg-background/70 text-foreground font-medium text-base transition-all duration-300 hover:bg-muted hover:border-primary/30 hover:-translate-y-0.5 active:scale-[0.98] backdrop-blur-sm"
                >
                  ¿Cuánto tiempo recuperaría?
                </button>
              </motion.div>

              {/* Friction */}
              <motion.p
                variants={fadeUp} initial="hidden" animate="visible" custom={0.5}
                className="text-sm text-muted-foreground/50 tracking-wide text-center lg:text-left"
              >
                Primer mes gratis · Soporte 1 a 1 desde el día uno · Sin permanencia
              </motion.p>
            </div>

            {/* RIGHT: floating notifications (desktop only) */}
            <div className="hidden lg:flex flex-col gap-3 relative">
              <div
                className="absolute inset-0 -inset-x-8 rounded-3xl pointer-events-none"
                style={{
                  background: "radial-gradient(ellipse 80% 60% at 50% 50%, hsl(229 65% 52% / 0.06), transparent 70%)",
                }}
              />
              {floatingNotifs.map((notif, i) => (
                <FloatingNotifCard key={notif.app} notif={notif} floatOffset={i % 2 === 0 ? -6 : 6} />
              ))}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1, duration: 0.5, ease: appleEase }}
                className="flex items-center gap-2 mt-2 pl-1"
              >
                <div className="flex -space-x-1">
                  {["✅","🛡️","🧹","⭐"].map((e, i) => (
                    <div key={i} className="w-6 h-6 rounded-full bg-background border border-border flex items-center justify-center text-[10px]">{e}</div>
                  ))}
                </div>
                <span className="text-xs text-muted-foreground/60">Todo ejecutado automáticamente</span>
              </motion.div>
            </div>
          </div>

          {/* ── Stats chips ── */}
          <div className="w-full">
            <div className="w-full h-px bg-gradient-to-r from-transparent via-border to-transparent mb-8" />
            <div className="flex flex-wrap justify-center gap-2.5">
              {stats.map((s, i) => (
                <StatChip key={s.label} stat={s} delay={0.65 + i * 0.07} />
              ))}
            </div>
          </div>

          {/* ── Partner logos ── */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0, ease: appleEase }}
            className="w-full mt-10"
          >
            <div className="rounded-2xl border border-border/60 bg-muted/30 backdrop-blur-sm px-6 py-5 flex flex-col items-center gap-4">
              <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/50">
                Partner oficial de
              </p>
              <div className="flex items-center justify-center gap-8 md:gap-14 flex-wrap">
                <img
                  src="https://www.hostaway.com/static/booking-com-premier-partner-vacation-rental-management-badge-2025-ccb7ea3d74f5a4dde9d42897a494e5b6.svg"
                  alt="Booking.com Premier Partner"
                  className="h-11 md:h-14 w-auto opacity-80 hover:opacity-100 transition-opacity duration-300"
                  loading="lazy"
                />
                <img
                  src="https://www.hostaway.com/static/airbnb-preferred-partner-vacation-rental-channel-manager-badge-2025-45e7cfa26c4a9956c8f05baae5d97503.svg"
                  alt="Airbnb Preferred Partner"
                  className="h-11 md:h-14 w-auto opacity-80 hover:opacity-100 transition-opacity duration-300"
                  loading="lazy"
                />
                <img
                  src="https://www.hostaway.com/static/google-vacation-rentals-travel-partner-integration-badge-0b2185bdcd454a4f8537eb06840417ec.svg"
                  alt="Google Vacation Rentals Partner"
                  className="h-11 md:h-14 w-auto opacity-80 hover:opacity-100 transition-opacity duration-300"
                  loading="lazy"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
