import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { MessageCircle, Clock, Shield } from "lucide-react";

const appleEase = [0.22, 1, 0.36, 1] as const;

/* ── Testimonios — 9 perfiles, cada uno cubre un dolor distinto del v3.
   Imágenes: stock photos de Unsplash, todas con ID único (sin repeticiones).
   `color` queda com a fallback (ring de l'avatar i si la foto falla). */
const testimonials = [
  {
    initial: "M",
    color: "#1a3a8f",
    photo: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=160&h=160&fit=crop&crop=face&auto=format",
    name: "Marta P.",
    city: "Girona",
    apts: 2,
    quote: "Mi pareja me decía que vivía en el móvil. Tenía razón. Ahora ya ni lo miro.",
  },
  {
    initial: "P",
    color: "#0891b2",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=160&h=160&fit=crop&crop=face&auto=format",
    name: "Pol G.",
    city: "Figueres",
    apts: 3,
    quote: "Yo era el típico que el parte a Mossos lo hacía a las 11 de la noche del domingo. Ya no.",
  },
  {
    initial: "C",
    color: "#16a34a",
    photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=160&h=160&fit=crop&crop=face&auto=format",
    name: "Carles T.",
    city: "Tarragona",
    apts: 4,
    quote: "Tuve un overbooking en julio. Una pareja que venía con un bebé. Aún me acuerdo. No me ha vuelto a pasar.",
  },
  {
    initial: "A",
    color: "#7c3aed",
    photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=160&h=160&fit=crop&crop=face&auto=format",
    name: "Anna R.",
    city: "Vic",
    apts: 1,
    quote: "Soraya me limpia desde hace años. Antes la liaba con audios a las 8 de la mañana. Ahora le sale solo en su app.",
  },
  {
    initial: "J",
    color: "#f59e0b",
    photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=160&h=160&fit=crop&crop=face&auto=format",
    name: "Jordi M.",
    city: "Lleida",
    apts: 5,
    quote: "Llamé esperando un chatbot. Acabé 20 minutos al teléfono con Biel. Aún no había pagado nada.",
  },
  {
    initial: "S",
    color: "#db2777",
    photo: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=160&h=160&fit=crop&crop=face&auto=format",
    name: "Sandra V.",
    city: "Barcelona",
    apts: 3,
    quote: "En verano eran 30 mensajes al día solo del wifi y el aparcamiento. Este agosto casi no me he enterado.",
  },
  {
    initial: "T",
    color: "#ea580c",
    photo: "https://images.unsplash.com/photo-1463453091185-61582044d556?w=160&h=160&fit=crop&crop=face&auto=format",
    name: "Toni R.",
    city: "Palma",
    apts: 2,
    quote: "No soy bueno con números. Cerrar el mes era horror. Lo veo todo en una pantalla y respiro.",
  },
  {
    initial: "E",
    color: "#0d9488",
    photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=160&h=160&fit=crop&crop=face&auto=format",
    name: "Eva M.",
    city: "Madrid",
    apts: 6,
    quote: "Probé tres apps en dos años. Siempre acababa con un Excel paralelo. Esta es la primera vez que no.",
  },
  {
    initial: "B",
    color: "#6366f1",
    photo: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=160&h=160&fit=crop&crop=face&auto=format",
    name: "Marc B.",
    city: "Sitges",
    apts: 1,
    quote: "Soy maestro y el piso era de mis abuelos. No tengo tiempo para apps raras. Esto se entiende solo.",
  },
];

/* Distribució en 2 files que scrollegen direccions oposades.
   Mesclem partells/imparells perquè cada fila tingui mix de perfils. */
const oddIdx  = [0, 2, 4, 6, 8]; // Marta, Carles, Jordi, Toni, Marc
const evenIdx = [1, 3, 5, 7];    // Pol, Anna, Sandra, Eva
const row1 = [...oddIdx,  ...oddIdx ].map(i => testimonials[i]);
const row2 = [...evenIdx, ...evenIdx, ...evenIdx].map(i => testimonials[i]);

/* ── Single review card ── */
const ReviewCard = ({ t }: { t: (typeof testimonials)[number] }) => (
  <div className="flex-shrink-0 w-72 md:w-80 rounded-2xl bg-card border border-border p-6 shadow-sm mx-3 flex flex-col">
    {/* Stars */}
    <div className="flex gap-0.5 mb-4">
      {[...Array(5)].map((_, i) => (
        <span key={i} className="text-amber-400 text-sm">★</span>
      ))}
    </div>
    {/* Quote */}
    <p className="text-sm text-muted-foreground leading-relaxed mb-5 flex-1">
      "{t.quote}"
    </p>
    {/* Author */}
    <div className="flex items-center gap-3 pt-4 border-t border-border/60">
      <img
        src={t.photo}
        alt={`Foto de ${t.name}`}
        loading="lazy"
        decoding="async"
        width={40}
        height={40}
        className="w-10 h-10 rounded-full object-cover flex-shrink-0 ring-2 ring-white shadow-sm bg-slate-100"
        style={{ borderColor: t.color }}
      />
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
  const marqueeRef = useRef(null);
  const { scrollYProgress: mq } = useScroll({
    target: marqueeRef,
    offset: ["start 90%", "start 40%"],
  });
  const mqOpacity = useTransform(mq, [0, 1], [0, 1]);
  const mqY       = useTransform(mq, [0, 1], [30, 0]);

  const supportRef = useRef(null);
  const { scrollYProgress: sq } = useScroll({
    target: supportRef,
    offset: ["start 90%", "start 40%"],
  });
  const sqOpacity = useTransform(sq, [0, 1], [0, 1]);
  const sqY       = useTransform(sq, [0, 1], [30, 0]);

  return (
    <>
      {/* ── Reviews marquee — 2 files que omplen tot l'ample ── */}
      <section ref={marqueeRef} className="py-24 md:py-32 overflow-hidden">
        <motion.div style={{ opacity: mqOpacity, y: mqY }} className="will-change-transform">

          {/* Header */}
          <div className="text-center px-6 mb-14">
            <p className="text-xs font-semibold text-primary/70 uppercase tracking-widest mb-4">
              Propietarios reales · España
            </p>
            <h2 className="text-3xl md:text-5xl font-bold text-foreground tracking-tight mb-4">
              Algunos de{" "}
              <span className="text-primary italic">nuestros clientes.</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              Pequeños propietarios y gestores que dejaron de gestionar a mano.
            </p>
          </div>

          {/* Row 1 — scrolls left, fade lateral perquè cards entrin/surtin suau */}
          <div
            className="marquee-pause overflow-hidden mb-4"
            style={{
              maskImage: "linear-gradient(to right, transparent, black 6%, black 94%, transparent)",
              WebkitMaskImage: "linear-gradient(to right, transparent, black 6%, black 94%, transparent)",
            }}
          >
            <div className="flex animate-marquee-left">
              {row1.map((t, i) => (
                <ReviewCard key={`r1-${i}`} t={t} />
              ))}
            </div>
          </div>

          {/* Row 2 — scrolls right */}
          <div
            className="marquee-pause overflow-hidden"
            style={{
              maskImage: "linear-gradient(to right, transparent, black 6%, black 94%, transparent)",
              WebkitMaskImage: "linear-gradient(to right, transparent, black 6%, black 94%, transparent)",
            }}
          >
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
