import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import PageShell from "@/components/PageShell";
import { faqPageSchema, breadcrumbSchema } from "@/lib/seo/schemas";
import RelatedArticles from "@/components/RelatedArticles";
import { featureToArticles } from "@/lib/data/relatedContent";

import { useSignupModal } from "@/contexts/SignupModalContext";
const ease = [0.22, 1, 0.36, 1] as const;

const faqs = [
  {
    q: "¿Puedo fijar un precio mínimo para no perder dinero?",
    a: "Sí. Configuras el precio mínimo y máximo de cada piso y el sistema opera siempre dentro de ese margen. Tú tienes el control total de los límites.",
  },
  {
    q: "¿Es lo mismo que PriceLabs o Beyond Pricing?",
    a: "Son herramientas especializadas con más opciones avanzadas. Hostly incluye precios dinámicos básicos muy efectivos para la mayoría de propietarios, sin coste adicional y sin añadir otra suscripción.",
  },
  {
    q: "¿Cuánto puede mejorar mis ingresos?",
    a: "Depende de la zona y la temporada. Los propietarios que activan los precios dinámicos suelen ver entre un 10% y un 25% más de ingresos en los primeros meses respecto a tarifas fijas.",
  },
];

export default function Precios() {
  const { open: openSignup } = useSignupModal();
  return (
    <PageShell
      title="Precios dinámicos para apartamentos turísticos | Hostly"
      description="Tarifas ajustadas automáticamente según demanda, temporada y ocupación. Incluido en Hostly, sin add-ons ni PriceLabs aparte."
      path="/funciones/precios"
      schemas={[
        faqPageSchema(faqs),
        breadcrumbSchema([
          { name: "Hostly", url: "/" },
          { name: "Funciones", url: "/funciones/precios" },
          { name: "Precios dinámicos", url: "/funciones/precios" },
        ]),
      ]}
    >
      <section className="pt-32 pb-20 px-6 md:px-12 lg:px-20 bg-gradient-to-b from-[#f0f6ff] to-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease }}>
            <h1 className="text-4xl md:text-6xl font-bold text-[#0f172a] tracking-tight mb-6 leading-tight">
              El precio correcto<br />en cada fecha. Solo.
            </h1>
            <p className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto mb-10 leading-relaxed">
              Hostly ajusta las tarifas según demanda, temporada y ocupación.
              Más ingresos sin más trabajo. Incluido en tu plan, sin add-ons.
            </p>
            <button type="button" onClick={openSignup} className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#1a3a8f] text-white font-semibold text-base hover:shadow-[0_8px_30px_rgba(26,58,143,0.3)] hover:-translate-y-0.5 transition-all duration-300"
            >
              Empezar gratis 14 días
              <ArrowRight className="w-4 h-4" />
            </button>
            <p className="text-sm text-slate-400 mt-3">Sin tarjeta. Cancela cuando quieras.</p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 px-6 md:px-12 lg:px-20 bg-[#f8fafc]">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#1a3a8f] mb-4">Precios dinámicos incluidos</p>
          <h2 className="text-3xl md:text-4xl font-bold text-[#0f172a] tracking-tight mb-10">
            Sin PriceLabs. Sin add-ons. Sin configurar nada extra.
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { icon: "📈", title: "Ajuste automático de tarifas", desc: "El sistema sube el precio cuando hay alta demanda en tu zona. Lo baja cuando conviene para llenar huecos." },
              { icon: "📅", title: "Reglas por temporada", desc: "Configura precios mínimos, máximos y reglas por fechas especiales. El sistema hace el resto." },
              { icon: "🎯", title: "Optimización de ocupación", desc: "Detecta noches sueltas entre reservas y aplica descuentos para llenarlas antes de que queden vacías." },
              { icon: "💸", title: "Incluido en tu plan", desc: "No pagas add-ons ni suscripciones adicionales. Precios dinámicos básicos incluidos desde el primer día." },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.08, ease }}
                className="bg-white rounded-2xl border border-slate-100 p-6 flex gap-4"
              >
                <span className="text-2xl flex-shrink-0">{item.icon}</span>
                <div>
                  <p className="font-bold text-[#0f172a] mb-1">{item.title}</p>
                  <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-6 md:px-12 lg:px-20">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-[#0f172a] tracking-tight mb-10">Preguntas frecuentes</h2>
          <div className="space-y-6">
            {faqs.map((f) => (
              <div key={f.q} className="bg-[#f8fafc] rounded-2xl border border-slate-100 p-6">
                <p className="font-bold text-[#0f172a] mb-2">{f.q}</p>
                <p className="text-slate-500 text-sm leading-relaxed">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <RelatedArticles articles={featureToArticles["precios"]} />

      <section className="py-24 px-6 text-center" style={{ background: "linear-gradient(135deg, #0f1f5c 0%, #1a3a8f 100%)" }}>
        <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-6">
          Empieza gratis. 14 días.
        </h2>
        <p className="text-white/60 text-lg mb-10 max-w-lg mx-auto">Sin tarjeta. Sin permanencia.</p>
        <button type="button" onClick={openSignup} className="inline-flex items-center gap-3 px-10 py-4 rounded-full bg-white text-[#0f1f5c] font-semibold text-base hover:shadow-[0_8px_40px_rgba(255,255,255,0.25)] hover:-translate-y-0.5 transition-all duration-300"
        >
          Empezar gratis 14 días
          <ArrowRight className="w-4 h-4" />
        </button>
      </section>
    </PageShell>
  );
}
