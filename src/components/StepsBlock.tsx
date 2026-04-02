import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Plug, Settings, Zap, ArrowRight } from "lucide-react";

const appleEase = [0.22, 1, 0.36, 1] as const;

const steps = [
  {
    num: "01",
    label: "PASO 1 — Conecta",
    icon: Plug,
    title: "Conecta tu ecosistema",
    bullets: [
      "Vincula Airbnb, Booking y VRBO en minutos.",
      "Integra tus cerraduras inteligentes y activa el registro policial automático.",
      "Todo queda centralizado en un único panel.",
      "Sin hojas sueltas. Sin apps paralelas. Sin caos.",
    ],
  },
  {
    num: "02",
    label: "PASO 2 — Configura",
    icon: Settings,
    title: "Define cómo quieres que funcione",
    bullets: [
      "Establece tus reglas una sola vez.",
      "Precios automáticos según demanda.",
      "Mensajes que se envían solos.",
      "Protocolos de limpieza que se activan tras cada reserva.",
      "No estás configurando tareas. Estás diseñando el sistema que trabajará por ti.",
    ],
  },
  {
    num: "03",
    label: "PASO 3 — El sistema ejecuta",
    icon: Zap,
    title: "A partir de aquí, desapareces",
    bullets: [
      "Cuando entra una reserva, todo se activa automáticamente.",
      "Check-in autónomo. Equipo notificado. Precio ajustado. Registro enviado.",
      "Tú solo supervisas. El sistema ejecuta.",
    ],
  },
];

const StepsBlock = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 95%", "end 30%"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0]);
  const translateY = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [30, 0, 0, -30]);
  const blur = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [4, 0, 0, 4]);
  const filterBlur = useTransform(blur, (v) => `blur(${v}px)`);

  return (
    <section ref={ref} id="steps" className="py-28 md:py-40 px-6 md:px-12 lg:px-20 bg-background">
      <motion.div
        style={{ opacity, y: translateY, filter: filterBlur }}
        className="max-w-6xl mx-auto will-change-transform"
      >
        {/* Header */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground tracking-tight mb-4">
            Configura una vez.<br />
            <span className="text-primary italic">Olvídate para siempre.</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mt-6 leading-relaxed">
            No necesitas más herramientas. Necesitas un sistema que trabaje con tus reglas y ejecute sin depender de ti.
          </p>
        </div>

        {/* Cards — desktop: 3 columns with arrows */}
        <div className="hidden md:grid md:grid-cols-3 gap-4 items-start">
          {steps.map((step, i) => (
            <div key={step.num} className="relative flex items-start gap-0">
              {/* Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: appleEase }}
                className="flex-1 rounded-2xl bg-card border border-border p-7 shadow-sm hover:shadow-md transition-shadow duration-300 h-full"
              >
                {/* Step label + icon */}
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-9 h-9 rounded-xl bg-primary/8 flex items-center justify-center flex-shrink-0">
                    <step.icon className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-[11px] font-semibold text-primary/70 tracking-widest uppercase">{step.label}</span>
                </div>

                {/* Big number */}
                <div className="text-6xl font-bold text-foreground/6 tracking-tight mb-3 leading-none select-none">
                  {step.num}
                </div>

                <h3 className="text-xl font-bold text-foreground tracking-tight mb-4 leading-snug">
                  {step.title}
                </h3>

                <ul className="space-y-2">
                  {step.bullets.map((b, bi) => (
                    <li key={bi} className="flex items-start gap-2 text-sm text-muted-foreground leading-relaxed">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-primary/40 flex-shrink-0" />
                      {b}
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Arrow connector between cards */}
              {i < steps.length - 1 && (
                <div className="flex items-start pt-12 px-1 flex-shrink-0">
                  <ArrowRight className="w-5 h-5 text-border" strokeWidth={1.5} />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Cards — mobile: horizontal scroll */}
        <div
          className="md:hidden flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 -mx-6 px-6"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: appleEase }}
              className="snap-center flex-shrink-0 w-[82vw] rounded-2xl bg-card border border-border p-6 shadow-sm"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-xl bg-primary/8 flex items-center justify-center flex-shrink-0">
                  <step.icon className="w-4 h-4 text-primary" />
                </div>
                <span className="text-[10px] font-semibold text-primary/70 tracking-widest uppercase">{step.label}</span>
              </div>
              <div className="text-5xl font-bold text-foreground/6 tracking-tight mb-2 leading-none select-none">
                {step.num}
              </div>
              <h3 className="text-lg font-bold text-foreground tracking-tight mb-3">{step.title}</h3>
              <ul className="space-y-2">
                {step.bullets.map((b, bi) => (
                  <li key={bi} className="flex items-start gap-2 text-sm text-muted-foreground leading-relaxed">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-primary/40 flex-shrink-0" />
                    {b}
                  </li>
                ))}
              </ul>
              {/* Arrow hint for mobile */}
              {i < steps.length - 1 && (
                <div className="flex justify-end mt-4">
                  <ArrowRight className="w-4 h-4 text-border" strokeWidth={1.5} />
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Micro-copy */}
        <p className="text-center text-sm text-muted-foreground/60 mt-14 italic">
          No es automatizar tareas. Es eliminar decisiones repetitivas.
        </p>
      </motion.div>
    </section>
  );
};

export default StepsBlock;
