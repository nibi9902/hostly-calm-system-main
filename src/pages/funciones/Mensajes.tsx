import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import PageShell from "@/components/PageShell";
import { faqPageSchema, breadcrumbSchema } from "@/lib/seo/schemas";
import RelatedArticles from "@/components/RelatedArticles";
import { featureToArticles } from "@/lib/data/relatedContent";

const ease = [0.22, 1, 0.36, 1] as const;

const faqs = [
  {
    q: "¿En qué idiomas responde el sistema?",
    a: "En más de 25 idiomas de forma automática. El sistema detecta el idioma del huésped por el canal de origen y responde en el mismo, sin que configures nada.",
  },
  {
    q: "¿Puedo revisar los mensajes antes de que se envíen?",
    a: "Sí. Puedes configurar la IA en modo supervisado (te muestra la respuesta antes de enviar) o en modo automático completo. Tú eliges el nivel de control.",
  },
  {
    q: "¿Funciona con Airbnb, Booking y WhatsApp a la vez?",
    a: "Sí. Un solo buzón unificado recibe mensajes de todos los canales. El sistema responde desde allí y tú ves todo el historial en un lugar.",
  },
];

export default function Mensajes() {
  return (
    <PageShell
      title="Mensajes automáticos con huéspedes | Hostly"
      description="Responde a tus huéspedes en segundos, en su idioma, sin tocar el móvil. Airbnb, Booking y WhatsApp sincronizados en Hostly."
      path="/funciones/mensajes"
      schemas={[
        faqPageSchema(faqs),
        breadcrumbSchema([
          { name: "Hostly", url: "/" },
          { name: "Funciones", url: "/funciones/mensajes" },
          { name: "Mensajes automáticos", url: "/funciones/mensajes" },
        ]),
      ]}
    >
      <section className="pt-32 pb-20 px-6 md:px-12 lg:px-20 bg-gradient-to-b from-[#f0f6ff] to-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease }}>
            <h1 className="text-4xl md:text-6xl font-bold text-[#0f172a] tracking-tight mb-6 leading-tight">
              Tu piso responde solo.<br />Tú intervenes cuando quieres.
            </h1>
            <p className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto mb-10 leading-relaxed">
              El sistema contesta preguntas habituales al instante, en el idioma del huésped,
              las 24h. Desde Airbnb, Booking y WhatsApp. Todo en un solo buzón.
            </p>
            <a
              href="https://app.hostlylabs.com/signup"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#1a3a8f] text-white font-semibold text-base hover:shadow-[0_8px_30px_rgba(26,58,143,0.3)] hover:-translate-y-0.5 transition-all duration-300"
            >
              Empezar gratis 14 días
              <ArrowRight className="w-4 h-4" />
            </a>
            <p className="text-sm text-slate-400 mt-3">Sin tarjeta. Cancela cuando quieras.</p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 px-6 md:px-12 lg:px-20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0f172a] tracking-tight mb-6">
            El WhatsApp a las 3 AM que te saca de la cama.
          </h2>
          <p className="text-slate-500 text-lg leading-relaxed max-w-2xl">
            "¿Cuál es el código wifi?" "¿A qué hora puedo hacer el check-out?" "¿Hay aparcamiento cerca?"
            Preguntas repetidas, en horarios imposibles, desde tres plataformas distintas.
            Tú de traductor. Tú disponible siempre.
          </p>
        </div>
      </section>

      <section className="py-20 px-6 md:px-12 lg:px-20 bg-[#f8fafc]">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#1a3a8f] mb-4">Cómo lo resuelve Hostly</p>
          <h2 className="text-3xl md:text-4xl font-bold text-[#0f172a] tracking-tight mb-10">
            Un buzón. Respuestas automáticas. Tú decides cuándo mirar.
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { icon: "💬", title: "Bandeja unificada", desc: "Airbnb, Booking y WhatsApp en un solo lugar. Sin cambiar de app." },
              { icon: "🤖", title: "Respuestas automáticas 24/7", desc: "Las preguntas habituales las responde el sistema al instante, en el idioma del huésped." },
              { icon: "📅", title: "Mensajes programados", desc: "Bienvenida, instrucciones de acceso, recordatorio de salida. Todo se envía solo en el momento correcto." },
              { icon: "🔔", title: "Tú intervenes cuando quieres", desc: "Si el sistema no sabe responder, te avisa. Tú eliges cuándo y cómo contestar." },
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

      <RelatedArticles articles={featureToArticles["mensajes"]} />

      <section className="py-24 px-6 text-center" style={{ background: "linear-gradient(135deg, #0f1f5c 0%, #1a3a8f 100%)" }}>
        <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-6">
          Empieza gratis. 14 días.
        </h2>
        <p className="text-white/60 text-lg mb-10 max-w-lg mx-auto">Sin tarjeta. Sin permanencia.</p>
        <a
          href="https://app.hostlylabs.com/signup"
          className="inline-flex items-center gap-3 px-10 py-4 rounded-full bg-white text-[#0f1f5c] font-semibold text-base hover:shadow-[0_8px_40px_rgba(255,255,255,0.25)] hover:-translate-y-0.5 transition-all duration-300"
        >
          Empezar gratis 14 días
          <ArrowRight className="w-4 h-4" />
        </a>
      </section>
    </PageShell>
  );
}
