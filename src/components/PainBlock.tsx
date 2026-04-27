import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const ease = [0.22, 1, 0.36, 1] as const;

/* ─────────────────────────────────────────────────────────
   4 moments que representen el cost mental de no tenir sistema.
   Cada parell: el mateix escenari, dues respostes.
   La bombolla 3 integra el missatge "5 apps → 1" sense targes apart.
───────────────────────────────────────────────────────── */
type Notif = {
  icon: string;
  title: string;
  sub: string;
  iconBg: string;
  iconColor: string;
};

const pairs: { before: Notif; after: Notif; rb: number; ra: number }[] = [
  {
    before: {
      icon: "💬",
      title: "¿Hiciste el SES de esta reserva?",
      sub: "Tú mismo · Pendiente desde el viernes",
      iconBg: "#fef3c7", iconColor: "#d97706",
    },
    after: {
      icon: "🛡️",
      title: "SES enviado a Mossos",
      sub: "Automático · Sin tocar nada",
      iconBg: "#dcfce7", iconColor: "#16a34a",
    },
    rb: -1, ra: 1,
  },
  {
    before: {
      icon: "📅",
      title: "Limpieza mañana — ¿avisaste a Anna?",
      sub: "Sin responder · 3h para el check-in",
      iconBg: "#dbeafe", iconColor: "#2563eb",
    },
    after: {
      icon: "✨",
      title: "Anna notificada: mañana 11h",
      sub: "Automático · Confirmado",
      iconBg: "#dcfce7", iconColor: "#16a34a",
    },
    rb: 1, ra: -1,
  },
  {
    before: {
      icon: "🧾",
      title: "Chekin + Smoobu + PriceLabs...",
      sub: "~120€ este mes · 5 facturas distintas",
      iconBg: "#ede9fe", iconColor: "#7c3aed",
    },
    after: {
      icon: "💳",
      title: "40€/mes · Todo incluido",
      sub: "Un pago · Un login · Nada más",
      iconBg: "#dcfce7", iconColor: "#16a34a",
    },
    rb: -1, ra: 1,
  },
  {
    before: {
      icon: "📋",
      title: "¿Declaraste la taxa turística?",
      sub: "Otro trimestre que se cuela entre todo lo demás",
      iconBg: "#fee2e2", iconColor: "#dc2626",
    },
    after: {
      icon: "🏛️",
      title: "Informe listo. Te guiamos paso a paso.",
      sub: "5 minutos · Sin gestoria · Sin errores",
      iconBg: "#dcfce7", iconColor: "#16a34a",
    },
    rb: -1, ra: 1,
  },
  {
    before: {
      icon: "📱",
      title: "30 mensajes de huéspedes sin leer",
      sub: "Wifi, parking, check-out... siempre lo mismo",
      iconBg: "#ffedd5", iconColor: "#ea580c",
    },
    after: {
      icon: "🤖",
      title: "Todos contestados. En segundos.",
      sub: "IA · 5 idiomas · Sin abrir el móvil",
      iconBg: "#dcfce7", iconColor: "#16a34a",
    },
    rb: 1, ra: -1,
  },
];

/* Bombolla individual — alineada amb el visual del cinematic hero */
const Bubble = ({
  n,
  rotate,
  isAfter,
  delay,
}: {
  n: Notif;
  rotate: number;
  isAfter: boolean;
  delay: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20, scale: 0.95 }}
    whileInView={{ opacity: 1, y: 0, scale: 1 }}
    viewport={{ once: true, margin: "-40px" }}
    transition={{ duration: 0.45, delay, ease }}
    style={{ rotate: `${rotate}deg` }}
    className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-white w-full"
    css-note="floating-ui-badge style — consistent with cinematic hero"
    style2={{
      border: isAfter ? "1px solid rgba(34,197,94,0.25)" : "1px solid rgba(15,23,42,0.07)",
      boxShadow: isAfter
        ? "0 4px 20px rgba(34,197,94,0.10), 0 1px 3px rgba(15,23,42,0.04), inset 3px 0 0 #22c55e"
        : "0 4px 20px rgba(15,23,42,0.06), 0 1px 3px rgba(15,23,42,0.04)",
    }}
  >
    <div
      className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 text-lg"
      style={{ background: n.iconBg, border: `1px solid ${n.iconColor}25` }}
    >
      {n.icon}
    </div>
    <div className="min-w-0 flex-1">
      <p className={`text-sm font-bold leading-tight truncate ${isAfter ? "text-emerald-800" : "text-slate-900"}`}>
        {n.title}
      </p>
      <p className="text-[11px] text-slate-400 font-medium truncate mt-0.5">
        {n.sub}
      </p>
    </div>
  </motion.div>
);

const PainBlock = () => (
  <section id="pain" className="py-20 md:py-28 px-6 md:px-12 lg:px-20 bg-background">
    <div className="max-w-5xl mx-auto">

      {/* ── Header — problema + transformació, alineat amb H1 de la web ── */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease }}
        className="text-center mb-14 md:mb-16"
      >
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary/70 mb-4">
          Antes / Ahora
        </p>
        <h2 className="text-3xl md:text-5xl font-bold text-foreground tracking-tight leading-[1.05] mb-4">
          Sin sistema, el negocio<br className="hidden md:block" /> te gestiona a ti.
        </h2>
        <p className="text-muted-foreground text-base md:text-lg max-w-xl mx-auto">
          Las mismas tareas de cada semana. La diferencia es quién las hace.
        </p>
      </motion.div>

      {/* ── Dues columnes de bombolles ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start">

        {/* SIN SISTEMA */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease }}
        >
          <div className="flex items-center gap-2 mb-5">
            <div className="h-px flex-1 bg-rose-200/70" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-rose-400/80 flex-shrink-0">
              Sin sistema
            </span>
            <div className="h-px flex-1 bg-rose-200/70" />
          </div>
          <div className="flex flex-col gap-3">
            {pairs.map((p, i) => (
              <div key={i} style={{ transform: `rotate(${p.rb}deg)` }}>
                <div
                  className="rounded-2xl bg-white"
                  style={{
                    border: "1px solid rgba(15,23,42,0.07)",
                    boxShadow: "0 4px 20px rgba(15,23,42,0.06), 0 1px 3px rgba(15,23,42,0.04)",
                  }}
                >
                  <Bubble n={p.before} rotate={0} isAfter={false} delay={i * 0.08} />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* CON HOSTLY */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1, ease }}
        >
          <div className="flex items-center gap-2 mb-5">
            <div className="h-px flex-1 bg-emerald-200/70" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-500/80 flex-shrink-0">
              Con Hostly
            </span>
            <div className="h-px flex-1 bg-emerald-200/70" />
          </div>
          <div className="flex flex-col gap-3">
            {pairs.map((p, i) => (
              <div key={i} style={{ transform: `rotate(${p.ra}deg)` }}>
                <div
                  className="rounded-2xl bg-white"
                  style={{
                    border: "1px solid rgba(34,197,94,0.25)",
                    boxShadow: "0 4px 20px rgba(34,197,94,0.10), 0 1px 3px rgba(15,23,42,0.04), inset 3px 0 0 #22c55e",
                  }}
                >
                  <Bubble n={p.after} rotate={0} isAfter={true} delay={i * 0.08 + 0.15} />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

      </div>

      {/* ── Closer + CTA ── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease }}
        className="text-center mt-14 md:mt-16"
      >
        <p className="text-foreground text-base md:text-lg font-semibold mb-2">
          De cinco apps dispersas a una sola que lo hace todo.
        </p>
        <p className="text-muted-foreground text-sm mb-6 max-w-md mx-auto">
          Empieza por la parte gratis. El resto, cuando lo necesites.
        </p>
        <a
          href="https://app.hostlylabs.com/signup"
          className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition-colors shadow-[0_4px_14px_rgba(26,58,143,0.25)]"
        >
          Crear cuenta gratis
          <ArrowRight className="w-4 h-4" />
        </a>
        <p className="text-xs text-muted-foreground/70 mt-3">
          Sin tarjeta · Para siempre
        </p>
      </motion.div>

    </div>
  </section>
);

export default PainBlock;
