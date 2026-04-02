import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, CheckCircle, Globe, Key, Users } from "lucide-react";

const appleEase = [0.22, 1, 0.36, 1] as const;

const included = [
  {
    icon: Globe,
    title: "Tu propia página de reservas directas",
    desc: "Deja de depender al 100% de Airbnb o Booking.",
  },
  {
    icon: Key,
    title: "Check-in online automático",
    desc: "Tus huéspedes hacen todo desde el móvil. Sin llaves en mano.",
  },
  {
    icon: Users,
    title: "Acompañamiento 1 a 1 el primer año",
    desc: "No desaparecemos al tercer día. Estamos contigo mientras creces.",
  },
];

const PricingBlock = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 90%", "start 35%"],
  });
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const y       = useTransform(scrollYProgress, [0, 1], [30, 0]);

  return (
    <section
      ref={ref}
      id="precios"
      className="py-24 md:py-36 px-6 md:px-12 lg:px-20 bg-background"
    >
      <motion.div
        style={{ opacity, y }}
        className="max-w-4xl mx-auto will-change-transform"
      >
        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-xs font-semibold text-primary/70 uppercase tracking-widest mb-4">
            Precios
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground tracking-tight mb-4">
            Un solo plan.{" "}
            <span className="text-primary italic">Todo incluido.</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-lg mx-auto">
            Gestiona mejor, gana más y deja de depender de ti mismo.
          </p>
        </div>

        {/* Pricing card */}
        <div className="rounded-3xl bg-card border border-border shadow-[var(--shadow-card)] overflow-hidden">

          {/* Price header */}
          <div className="p-8 md:p-12 border-b border-border">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
              <div>
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-5xl md:text-6xl font-bold text-foreground tracking-tight">
                    25€
                  </span>
                  <span className="text-muted-foreground text-lg">/mes por apartamento</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  <span className="font-semibold text-primary">22€/mes</span> por apartamento
                  si gestionas 4 o más
                </p>
              </div>

              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/8 border border-primary/15">
                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                <span className="text-sm text-primary font-semibold">Primer mes gratis</span>
              </div>
            </div>
          </div>

          {/* Included features */}
          <div className="p-8 md:p-12">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-8">
              Cada suscripción incluye
            </p>
            <div className="grid md:grid-cols-3 gap-6 mb-10">
              {included.map((item) => (
                <div key={item.title} className="flex flex-col gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/8 flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground text-sm leading-snug mb-1">
                      {item.title}
                    </p>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Referral */}
            <div className="rounded-2xl bg-primary/5 border border-primary/12 px-6 py-5 flex flex-col sm:flex-row sm:items-center gap-3 mb-10">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 text-base">
                🎁
              </div>
              <div>
                <p className="font-semibold text-foreground text-sm">
                  Invita a 5 anfitriones → 1 apartamento gratis
                </p>
                <p className="text-muted-foreground text-sm">
                  Mientras sigan activos en Hostly, ese apartamento no te cuesta nada.
                </p>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <button className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-primary text-primary-foreground font-semibold text-base transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:shadow-[0_8px_30px_hsl(var(--primary)/0.25)] hover:-translate-y-0.5 active:scale-[0.98]">
                Empieza ahora
                <ArrowRight className="w-4 h-4" />
              </button>
              <a
                href="#demo-video"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border border-border bg-background text-foreground font-medium text-base transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-muted hover:-translate-y-0.5 active:scale-[0.98]"
              >
                Ver cómo funciona
              </a>
            </div>

            <p className="text-sm text-muted-foreground/60 mt-5">
              Sin permanencia · Sin tarjeta de crédito el primer mes · Cancela cuando quieras
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default PricingBlock;
