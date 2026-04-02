import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { MessageCircle, Clock, Shield } from "lucide-react";

const appleEase = [0.22, 1, 0.36, 1] as const;

/* ── Testimonials data ── */
const allTestimonials = [
  {
    name: "Marta G.",
    city: "Barcelona",
    apts: 3,
    quote: "Llevaba dos años gestionando todo por WhatsApp. Ahora Hostly lo hace solo y yo solo reviso el resumen de la semana.",
  },
  {
    name: "Javi R.",
    city: "Valencia",
    apts: 1,
    quote: "Tengo un solo piso y pensaba que esto no era para mí. Pasaba más tiempo gestionándolo que trabajando. Con Hostly dejé de pensar en él constantemente.",
  },
  {
    name: "Laura M.",
    city: "Sevilla",
    apts: 5,
    quote: "Lo que más me ha cambiado es el registro policial automático. Antes lo dejaba para el último momento y me daba ansiedad. Ahora ni lo pienso.",
  },
  {
    name: "Àlex T.",
    city: "Girona",
    apts: 2,
    quote: "El soporte al principio es lo que me convenció. No es un chatbot, es una persona que te ayuda a configurarlo todo. En dos semanas tenía todo funcionando.",
  },
  {
    name: "Carmen V.",
    city: "Madrid",
    apts: 8,
    quote: "Gestionar 8 pisos sin equipo era imposible. Con Hostly tengo todo centralizado y puedo revisarlo en 20 minutos desde el móvil.",
  },
  {
    name: "Pau S.",
    city: "Palma",
    apts: 4,
    quote: "Las limpiezas coordinadas solas son una locura. Mi limpiadora recibe el aviso automáticamente y yo no tengo que hacer nada. Eso solo ya vale el precio.",
  },
  {
    name: "Raquel F.",
    city: "Málaga",
    apts: 1,
    quote: "Tenía miedo de que fuera complicado de configurar. El equipo de Hostly me ayudó desde cero y en un día estaba todo listo. No esperaba ese nivel de atención.",
  },
  {
    name: "Ignasi C.",
    city: "Tarragona",
    apts: 6,
    quote: "He probado otros software y siempre acababas necesitando más cosas. Hostly lo tiene todo y el precio por piso es muy razonable. Sin sorpresas.",
  },
  {
    name: "Nuria B.",
    city: "Alicante",
    apts: 3,
    quote: "Mis huéspedes tienen mejor experiencia que antes, con menos trabajo de mi parte. El check-in online y la guía automática les llega sola. Las reseñas han mejorado.",
  },
  {
    name: "Tomàs E.",
    city: "Zaragoza",
    apts: 2,
    quote: "Antes perdía una hora cada domingo revisando calendarios y precios. Ahora Hostly me manda un resumen y listo. Recuperé mis domingos.",
  },
  {
    name: "Silvia P.",
    city: "Granada",
    apts: 7,
    quote: "Lo de las liquidaciones automáticas a los propietarios es un cambio brutal. Antes era una tarde de Excel cada mes. Ahora sale solo el día que toca.",
  },
  {
    name: "Marcos D.",
    city: "Bilbao",
    apts: 2,
    quote: "Soy muy escéptico con estas cosas, pero le di una oportunidad. Tres meses después no me imagino sin él. El tiempo que ahorro es real.",
  },
  {
    name: "Cristina O.",
    city: "Tenerife",
    apts: 12,
    quote: "Con 12 pisos era imposible llevar el control sin equipo. Hostly me permite gestionarlo prácticamente sola. Y cuando tengo dudas, el soporte responde rápido.",
  },
  {
    name: "Borja L.",
    city: "San Sebastián",
    apts: 1,
    quote: "Tengo un piso turístico como complemento a mi trabajo. No tenía tiempo para gestionarlo bien. Ahora funciona solo y las valoraciones son mejores.",
  },
  {
    name: "Ana R.",
    city: "Córdoba",
    apts: 4,
    quote: "El primer mes gratis me convenció de probarlo sin presión. A la semana ya sabía que me iba a quedar. No he vuelto a gestionar nada a mano.",
  },
];

/* Split into two rows */
const row1 = [...allTestimonials.slice(0, 8), ...allTestimonials.slice(0, 8)];
const row2 = [...allTestimonials.slice(7, 15), ...allTestimonials.slice(7, 15)];

/* ── Single review card ── */
const ReviewCard = ({ t }: { t: (typeof allTestimonials)[number] }) => (
  <div className="flex-shrink-0 w-72 md:w-80 rounded-2xl bg-card border border-border p-6 shadow-sm mx-3">
    {/* Stars */}
    <div className="flex gap-0.5 mb-4">
      {[...Array(5)].map((_, i) => (
        <span key={i} className="text-amber-400 text-sm">★</span>
      ))}
    </div>
    {/* Quote */}
    <p className="text-sm text-muted-foreground leading-relaxed mb-5 line-clamp-4">
      "{t.quote}"
    </p>
    {/* Author */}
    <div className="flex items-center gap-3 pt-4 border-t border-border/60">
      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs font-bold flex-shrink-0">
        {t.name[0]}
      </div>
      <div>
        <p className="text-sm font-semibold text-foreground leading-none mb-0.5">{t.name}</p>
        <p className="text-xs text-muted-foreground">
          {t.city} · {t.apts} {t.apts === 1 ? "apartamento" : "apartamentos"}
        </p>
      </div>
    </div>
  </div>
);

/* ── Support promises ── */
const supportPromises = [
  {
    icon: MessageCircle,
    title: "Respuesta en menos de 2h",
    desc: "Cualquier duda, cualquier día. Sin bots, sin tickets perdidos.",
  },
  {
    icon: Clock,
    title: "Onboarding 1 a 1 el primer mes",
    desc: "Te ayudamos a configurar todo desde cero. Tú no tienes que saber nada de tecnología.",
  },
  {
    icon: Shield,
    title: "Acompañamiento durante todo el primer año",
    desc: "No desaparecemos después de la venta. Estamos contigo mientras creces.",
  },
];

/* ── Main component ── */
const TestimonialBlock = () => {
  /* ── Marquee section scroll reveal ── */
  const marqueeRef = useRef(null);
  const { scrollYProgress: mq } = useScroll({
    target: marqueeRef,
    offset: ["start 90%", "start 40%"],
  });
  const mqOpacity = useTransform(mq, [0, 1], [0, 1]);
  const mqY       = useTransform(mq, [0, 1], [30, 0]);

  /* ── Support section scroll reveal ── */
  const supportRef = useRef(null);
  const { scrollYProgress: sq } = useScroll({
    target: supportRef,
    offset: ["start 90%", "start 40%"],
  });
  const sqOpacity = useTransform(sq, [0, 1], [0, 1]);
  const sqY       = useTransform(sq, [0, 1], [30, 0]);

  return (
    <>
      {/* ── Reviews marquee section ── */}
      <section ref={marqueeRef} className="py-24 md:py-32 overflow-hidden">
        <motion.div style={{ opacity: mqOpacity, y: mqY }} className="will-change-transform">

          {/* Header */}
          <div className="text-center px-6 mb-14">
            <p className="text-xs font-semibold text-primary/70 uppercase tracking-widest mb-4">
              Propietarios reales · España
            </p>
            <h2 className="text-3xl md:text-5xl font-bold text-foreground tracking-tight mb-4">
              Lo que dicen los que ya{" "}
              <span className="text-primary italic">duermen tranquilos.</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              Propietarios con 1 a 12 apartamentos que dejaron de gestionar a mano.
            </p>
          </div>

          {/* Row 1 — scrolls left */}
          <div className="marquee-pause overflow-hidden mb-4">
            <div className="flex animate-marquee-left">
              {row1.map((t, i) => (
                <ReviewCard key={`r1-${i}`} t={t} />
              ))}
            </div>
          </div>

          {/* Row 2 — scrolls right */}
          <div className="marquee-pause overflow-hidden">
            <div className="flex animate-marquee-right">
              {row2.map((t, i) => (
                <ReviewCard key={`r2-${i}`} t={t} />
              ))}
            </div>
          </div>

        </motion.div>
      </section>

      {/* ── "No estás solo" support section ── */}
      <section
        ref={supportRef}
        id="soporte"
        className="py-20 md:py-28 px-6 md:px-12 lg:px-20 bg-card border-y border-border"
      >
        <motion.div
          style={{ opacity: sqOpacity, y: sqY }}
          className="max-w-6xl mx-auto will-change-transform"
        >
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

            {/* Left — founder card */}
            <div className="rounded-2xl bg-background border border-border p-8 md:p-10 shadow-[var(--shadow-card)]">
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-primary/8 text-primary text-xs font-semibold tracking-wider uppercase mb-6">
                Nació de vivirlo
              </span>
              <h3 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight mb-4">
                De propietario a propietario.
              </h3>
              <p className="text-muted-foreground text-base leading-relaxed mb-8">
                "Hostly no nació en una oficina. Nació de la frustración de gestionar
                mis propios apartamentos y no poder desconectar nunca. Lo construí
                para mí — y funciona."
              </p>
              <div className="flex items-center gap-4 pt-6 border-t border-border/60">
                <div className="w-11 h-11 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                  B
                </div>
                <div>
                  <p className="font-semibold text-foreground text-sm">Biel</p>
                  <p className="text-muted-foreground text-xs">Fundador y propietario</p>
                </div>
              </div>
            </div>

            {/* Right — support promises */}
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight mb-3">
                No estás solo en{" "}
                <span className="text-primary italic">ningún momento.</span>
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-10">
                El primer mes trabajamos contigo, no para ti. Setup, dudas, ajustes —
                estamos en cada paso.
              </p>
              <ul className="space-y-6">
                {supportPromises.map((p) => (
                  <li key={p.title} className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-primary/8 flex items-center justify-center">
                      <p.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground text-sm mb-1">{p.title}</p>
                      <p className="text-muted-foreground text-sm leading-relaxed">{p.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      </section>
    </>
  );
};

export default TestimonialBlock;
