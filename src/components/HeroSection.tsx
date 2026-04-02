import { motion, useInView, useMotionValue, animate } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useState, useEffect, useRef } from "react";

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

/* ── Highlighted keyword box ── */
const Highlight = ({
  children,
  color,
  delay = 0,
}: {
  children: React.ReactNode;
  color: "blue" | "amber" | "green";
  delay?: number;
}) => {
  const colorMap = {
    blue:  { text: "hsl(229 65% 52%)", border: "hsl(229 65% 52% / 0.65)" },
    amber: { text: "#d97706",           border: "#d97706aa" },
    green: { text: "#16a34a",           border: "#16a34aaa" },
  };
  const { text, border } = colorMap[color];

  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.45, delay, ease: appleEase }}
      className="inline-block relative"
      style={{ color: text }}
    >
      {/* Dashed border box */}
      <motion.span
        initial={{ opacity: 0, scaleX: 0.6 }}
        animate={{ opacity: 1, scaleX: 1 }}
        transition={{ duration: 0.4, delay: delay + 0.08, ease: appleEase }}
        aria-hidden
        className="absolute inset-0 rounded-[10px] pointer-events-none"
        style={{
          border: `2px dashed ${border}`,
          transformOrigin: "left center",
        }}
      />
      <span className="px-3 py-0.5 font-bold italic">{children}</span>
    </motion.span>
  );
};

const fadeUp = {
  hidden:   { opacity: 0, y: 20 },
  visible: (delay: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.55, delay, ease: appleEase },
  }),
};

interface HeroSectionProps { onOpenQuiz?: () => void; }

const HeroSection = ({ onOpenQuiz }: HeroSectionProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const [mousePos, setMousePos] = useState({ x: 50, y: 30 });

  /* Mouse-following gradient */
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };
    window.addEventListener("mousemove", handler, { passive: true });
    return () => window.removeEventListener("mousemove", handler);
  }, []);

  return (
    <section ref={sectionRef} className="relative bg-background pt-28 pb-16 px-6 md:px-12 lg:px-20">

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

      <div className="max-w-4xl mx-auto relative z-10 text-center">

        {/* Badge */}
        <motion.div
          variants={fadeUp} initial="hidden" animate="visible" custom={0}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-background/80 border border-border/80 backdrop-blur-sm mb-8 shadow-sm"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
          <span className="text-sm text-foreground/75 font-medium tracking-[-0.01em]">
            Para propietarios que no quieren una segunda ocupación
          </span>
        </motion.div>

        {/* ── HEADLINE with colored dashed boxes ── */}
        <h1 className="text-[2.5rem] md:text-[4.2rem] lg:text-[5rem] font-bold tracking-[-0.04em] text-foreground leading-[1.08] mb-8">
          <motion.span
            className="block"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05, ease: appleEase }}
          >
            Tu gestión, en{" "}
            <Highlight color="blue" delay={0.3}>piloto automático</Highlight>.
          </motion.span>
          <motion.span
            className="block"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.18, ease: appleEase }}
          >
            Tus huéspedes,{" "}
            <Highlight color="amber" delay={0.44}>siempre atendidos</Highlight>.
          </motion.span>
          <motion.span
            className="block"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.31, ease: appleEase }}
          >
            Tú, completamente{" "}
            <Highlight color="green" delay={0.58}>tranquilo</Highlight>.
          </motion.span>
        </h1>

        {/* Subtitle */}
        <motion.p
          variants={fadeUp} initial="hidden" animate="visible" custom={0.45}
          className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto mb-10 leading-relaxed tracking-[-0.01em]"
        >
          Deja de llevar el negocio en la cabeza. Hostly convierte tu gestión dispersa
          en un sistema que trabaja solo —{" "}
          <span className="text-foreground font-semibold">de 7 horas a menos de 20 minutos a la semana.</span>
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.55, ease: appleEase }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-5"
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
          variants={fadeUp} initial="hidden" animate="visible" custom={0.7}
          className="text-sm text-muted-foreground/50 tracking-wide mb-16"
        >
          Primer mes gratis · Soporte 1 a 1 desde el día uno · Sin permanencia
        </motion.p>

        {/* ── Stats chips ── */}
        <div className="w-full">
          <div className="w-full h-px bg-gradient-to-r from-transparent via-border to-transparent mb-8" />
          <div className="flex flex-wrap justify-center gap-2.5">
            {stats.map((s, i) => (
              <StatChip key={s.label} stat={s} delay={0.7 + i * 0.07} />
            ))}
          </div>
        </div>

        {/* ── Partner logos ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.1, ease: appleEase }}
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
    </section>
  );
};

export default HeroSection;
