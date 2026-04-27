import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import PageShell from "@/components/PageShell";
import { breadcrumbSchema } from "@/lib/seo/schemas";

const ease = [0.22, 1, 0.36, 1] as const;

export default function Hereus() {
  return (
    <PageShell
      title="Heredaste un piso turístico. Hostly lo simplifica."
      description="Heredaste uno o dos pisos y los pusiste en Airbnb sin saber muy bien cómo. Hostly gestiona check-in, mensajes, limpiezas y compliance sin que tengas que aprender nada."
      path="/hereus"
      schemas={[breadcrumbSchema([{ name: 'Hostly', url: '/' }, { name: 'Hereus', url: '/hereus' }])]}
    >
      <section className="pt-32 pb-20 px-6 md:px-12 lg:px-20 bg-gradient-to-b from-[#f0f6ff] to-white">
        <div className="max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease }}>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#1a3a8f] mb-4">Pisos heredados</p>
            <h1 className="text-4xl md:text-6xl font-bold text-[#0f172a] tracking-tight mb-6 leading-tight">
              El piso heredado<br />sin quebraderos de cabeza.
            </h1>
            <p className="text-lg md:text-xl text-slate-500 max-w-2xl mb-10 leading-relaxed">
              Lo pusiste en Airbnb porque no querías venderlo. Pero ahora tienes mensajes,
              check-ins, registros policiales y neteges que gestionar. Tú tienes otra vida.
              Hostly se encarga de lo demás.
            </p>
            <a
              href="https://app.hostlylabs.com/signup"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#1a3a8f] text-white font-semibold text-base hover:shadow-[0_8px_30px_rgba(26,58,143,0.3)] hover:-translate-y-0.5 transition-all duration-300"
            >
              Empezar gratis 14 días
              <ArrowRight className="w-4 h-4" />
            </a>
            <p className="text-sm text-slate-400 mt-3">Sin tarjeta. Sin permanencia. Sin aprender nada nuevo.</p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 px-6 md:px-12 lg:px-20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0f172a] tracking-tight mb-6">
            No tienes que ser un experto en alquiler turístico.
          </h2>
          <p className="text-slate-500 text-lg mb-10 max-w-2xl leading-relaxed">
            Hostly está diseñado para que funcione desde el primer día, sin demos, sin
            documentación, sin aprender un software nuevo. Configuras el piso en 15 minutos
            y el sistema hace el resto.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: "⏱️", title: "Listo en 15 minutos", desc: "Conectas Airbnb, añades el piso y ya está. Sin onboarding de dos semanas." },
              { icon: "🤖", title: "Todo automático por defecto", desc: "Check-in, compliance, mensajes y limpiezas funcionan solos desde el primer día." },
              { icon: "👤", title: "Soporte humano real", desc: "Si tienes dudas, el equipo de Hostly te ayuda en español y catalán. Sin bots." },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.08, ease }}
                className="bg-white rounded-2xl border border-slate-100 p-6 text-center shadow-sm"
              >
                <span className="text-3xl block mb-3">{item.icon}</span>
                <p className="font-bold text-[#0f172a] mb-2">{item.title}</p>
                <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-6 text-center" style={{ background: "linear-gradient(135deg, #0f1f5c 0%, #1a3a8f 100%)" }}>
        <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-6">
          Empieza gratis. 14 días.
        </h2>
        <p className="text-white/60 text-lg mb-10 max-w-lg mx-auto">40 €/mes. Sin tarjeta. Sin aprender nada nuevo.</p>
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
