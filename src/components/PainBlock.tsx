import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { useRef } from "react";

/* ── ANTES — one short, punchy line each ── */
const beforeNotifs = [
  { id: "b1", icon: "💬", iconBg: "#25D366", label: "WhatsApp · Hace 3 min",
    headline: "¿Dónde están las llaves?" },
  { id: "b2", icon: "⚠️", iconBg: "#f59e0b", label: "Compliance · Urgente",
    headline: "Registro policial sin enviar", urgent: true },
  { id: "b3", icon: "📅", iconBg: "#3b82f6", label: "Calendario · Hoy 16:00",
    headline: "Entrega de llaves en persona" },
  { id: "b4", icon: "🧹", iconBg: "#8b5cf6", label: "Limpieza · 11:45",
    headline: "¿Reprogramamos la limpieza?" },
  { id: "b5", icon: "🌙", iconBg: "#ff385c", label: "Airbnb · 03:14 AM",
    headline: "Sin agua caliente. 40 min esperando.", urgent: true },
];

/* ── CON HOSTLY — same 5 situations, solved instantly ── */
const afterNotifs = [
  { id: "a1", icon: "✅", iconBg: "#22c55e", label: "Hostly · Automático",
    headline: "Código enviado al huésped" },
  { id: "a2", icon: "🛡️", iconBg: "#22c55e", label: "Hostly · Legal",
    headline: "Registro enviado a Policía" },
  { id: "a3", icon: "🔑", iconBg: "#22c55e", label: "Hostly · Check-in",
    headline: "Check-in completado online" },
  { id: "a4", icon: "🧹", iconBg: "#22c55e", label: "Hostly · Limpieza",
    headline: "Limpiadora notificada sola" },
  { id: "a5", icon: "⚡", iconBg: "#22c55e", label: "Hostly · Incidencias",
    headline: "Técnico avisado. Tú, dormido." },
];

const CARD_COUNT = beforeNotifs.length;

/* ── Shared animated card ── */
const NotifCard = ({
  notif,
  index,
  scrollYProgress,
  variant,
}: {
  notif: (typeof beforeNotifs)[number];
  index: number;
  scrollYProgress: MotionValue<number>;
  variant: "before" | "after";
}) => {
  const isFirst   = index === 0;
  const step      = 0.20;
  const enterStart = isFirst ? 0 : 0.08 + (index - 1) * step;
  const enterEnd   = isFirst ? 0 : enterStart + 0.10;

  const getEnter = (p: number) => {
    if (isFirst) return 1;
    if (p <= enterStart) return 0;
    if (p >= enterEnd)   return 1;
    return (p - enterStart) / (enterEnd - enterStart);
  };

  const opacity    = useTransform(() => Math.min(Math.max(getEnter(scrollYProgress.get()), 0), 1));
  const y          = useTransform(() => (1 - getEnter(scrollYProgress.get())) * 36);
  const scale      = useTransform(() => 0.97 + getEnter(scrollYProgress.get()) * 0.03);
  const filterBlur = useTransform(() => `blur(${(1 - getEnter(scrollYProgress.get())) * 3}px)`);

  const isAfter = variant === "after";

  return (
    <motion.div
      style={{ opacity, y, scale, filter: filterBlur, zIndex: index + 1 }}
      className="absolute inset-x-0 top-0 will-change-transform"
    >
      <div
        className="w-full rounded-2xl flex items-center gap-3 px-4 py-3.5"
        style={{
          background: isAfter ? "rgba(240,253,244,0.97)" : "rgba(255,255,255,0.92)",
          backdropFilter: "blur(40px) saturate(180%)",
          WebkitBackdropFilter: "blur(40px) saturate(180%)",
          border: isAfter
            ? "1px solid rgba(34,197,94,0.2)"
            : (notif as any).urgent
            ? "1px solid rgba(245,158,11,0.2)"
            : "1px solid rgba(0,0,0,0.06)",
          boxShadow: isAfter
            ? "0 4px 24px rgba(34,197,94,0.08), 0 1px 4px rgba(0,0,0,0.04), inset 3px 0 0 #22c55e"
            : (notif as any).urgent
            ? "0 4px 24px rgba(245,158,11,0.08), 0 1px 4px rgba(0,0,0,0.06), inset 3px 0 0 #f59e0b"
            : "0 4px 24px rgba(0,0,0,0.07), 0 1px 4px rgba(0,0,0,0.04)",
        }}
      >
        {/* App icon */}
        <div
          className="flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center"
          style={{ background: notif.iconBg + "18", border: `1px solid ${notif.iconBg}28` }}
        >
          <span className="text-[17px] leading-none">{notif.icon}</span>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <p className="text-[10px] text-gray-400 font-medium mb-0.5 truncate">{notif.label}</p>
          <p className={`text-[13px] font-semibold truncate ${isAfter ? "text-emerald-700" : "text-gray-800"}`}>
            {notif.headline}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

/* ── Main section ── */
const PainBlock = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  return (
    <section
      ref={sectionRef}
      style={{ height: `${CARD_COUNT * 100}vh` }}
      className="relative"
    >
      <div
        className="sticky top-0 h-screen flex items-center justify-center px-6 md:px-12 lg:px-20 bg-background"
        style={{ zIndex: 1 }}
      >
        <div className="max-w-6xl mx-auto w-full">

          {/* Section header */}
          <div className="text-center mb-10 md:mb-14">
            <h2 className="text-3xl md:text-5xl lg:text-[3.5rem] font-bold text-foreground tracking-tight leading-[1.05] mb-4">
              Así se ve gestionarlo <span className="text-muted-foreground/50">sin</span> Hostly.{" "}
              <span className="text-primary italic">Y con él.</span>
            </h2>
            <p className="text-muted-foreground text-base md:text-lg max-w-lg mx-auto">
              Los mismos momentos. La misma realidad. Una respuesta completamente distinta.
            </p>
          </div>

          {/* Two-column notification stacks */}
          <div className="grid grid-cols-2 gap-5 md:gap-10 items-start max-w-3xl mx-auto">

            {/* SIN HOSTLY */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="h-px flex-1 bg-red-200/60" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-red-400/80 flex-shrink-0">
                  Sin Hostly
                </span>
                <div className="h-px flex-1 bg-red-200/60" />
              </div>
              <div className="relative w-full h-[68px]">
                {beforeNotifs.map((n, i) => (
                  <NotifCard key={n.id} notif={n} index={i} scrollYProgress={scrollYProgress} variant="before" />
                ))}
              </div>
            </div>

            {/* CON HOSTLY */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="h-px flex-1 bg-emerald-200/60" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-500/80 flex-shrink-0">
                  Con Hostly
                </span>
                <div className="h-px flex-1 bg-emerald-200/60" />
              </div>
              <div className="relative w-full h-[68px]">
                {afterNotifs.map((n, i) => (
                  <NotifCard key={n.id} notif={n} index={i} scrollYProgress={scrollYProgress} variant="after" />
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default PainBlock;
