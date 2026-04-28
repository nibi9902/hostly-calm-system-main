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
    q: "¿Qué pasa si entra una reserva mientras estoy de viaje?",
    a: "Todo es automático: el sistema actualiza calendarios, envía la bienvenida, registra el SES y coordina la limpieza. Sin que hagas nada.",
  },
  {
    q: "¿Funciona con Airbnb y Booking a la vez?",
    a: "Sí. Hostly sincroniza calendarios en tiempo real. Una reserva en Airbnb bloquea automáticamente Booking y el resto de canales activos. Sin dobles reservas.",
  },
  {
    q: "¿Los precios dinámicos están incluidos en el plan?",
    a: "Sí. No necesitas PriceLabs ni Beyond. El motor de precios de Hostly ajusta las tarifas según demanda, temporada y ocupación, incluido en tu plan desde el primer día.",
  },
];

export default function Reservas() {
  const { open: openSignup } = useSignupModal();
  return (
    <PageShell
      title="Gestión de reservas y calendarios | Hostly"
      description="Airbnb y Booking sincronizados en tiempo real. Sin dobles reservas. Precios dinámicos incluidos. Todo en Hostly."
      path="/funciones/reservas"
      schemas={[
        faqPageSchema(faqs),
        breadcrumbSchema([
          { name: "Hostly", url: "/" },
          { name: "Funciones", url: "/funciones/reservas" },
          { name: "Reservas y calendarios", url: "/funciones/reservas" },
        ]),
      ]}
    >
      <section className="pt-32 pb-20 px-6 md:px-12 lg:px-20 bg-gradient-to-b from-[#f0f6ff] to-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease }}>
            <h1 className="text-4xl md:text-6xl font-bold text-[#0f172a] tracking-tight mb-6 leading-tight">
              Un calendario.<br />Todas tus plataformas.
            </h1>
            <p className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto mb-10 leading-relaxed">
              Airbnb y Booking sincronizados en tiempo real. Los precios se actualizan solos según
              la demanda. Sin dobles reservas. Sin pestañas abiertas.
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
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#1a3a8f] mb-4">Todo sincronizado</p>
          <h2 className="text-3xl md:text-4xl font-bold text-[#0f172a] tracking-tight mb-10">
            Sin dobles reservas. Sin actualizaciones manuales.
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { icon: "📅", title: "Calendario unificado", desc: "Todas tus propiedades y plataformas en una sola vista. Bloqueados, reservas y precios en tiempo real." },
              { icon: "🔄", title: "Sincronización bidireccional", desc: "Una reserva en Airbnb bloquea automáticamente Booking y el resto de canales. Sin dobles." },
              { icon: "📈", title: "Precios dinámicos incluidos", desc: "Tarifas ajustadas según demanda, temporada y ocupación. Sin add-ons, sin PriceLabs aparte." },
              { icon: "🔒", title: "Bloqueados y mínimo de noches", desc: "Configura bloqueos, noches mínimas y restricciones por fecha desde un solo lugar." },
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

      <RelatedArticles articles={featureToArticles["reservas"]} />

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
