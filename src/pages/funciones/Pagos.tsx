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
    q: "¿Puedo ver cuánto he ganado por piso y por plataforma?",
    a: "Sí. El panel de ingresos muestra los resultados por propiedad, por plataforma (Airbnb, Booking…) y por periodo. Sin abrir ningún Excel ni cruzar datos manualmente.",
  },
  {
    q: "¿Hostly genera liquidaciones para los propietarios?",
    a: "Sí. Si gestionas pisos de terceros, puedes generar liquidaciones automáticas con el desglose de ingresos, comisiones y gastos de cada mes, enviadas el día que toca.",
  },
  {
    q: "¿Funciona si gestiono pisos que no son míos?",
    a: "Sí. Configuras cada propiedad con su propietario asignado y Hostly genera los reportes y liquidaciones correspondientes de forma automática.",
  },
];

export default function Pagos() {
  const { open: openSignup } = useSignupModal();
  return (
    <PageShell
      title="Pagos y facturas de tu piso turístico | Hostly"
      description="Cierra el mes sin abrir Excel. Ingresos por plataforma, comisiones y liquidaciones dentro de Hostly."
      path="/funciones/pagos"
      schemas={[
        faqPageSchema(faqs),
        breadcrumbSchema([
          { name: "Hostly", url: "/" },
          { name: "Funciones", url: "/funciones/pagos" },
          { name: "Pagos y facturas", url: "/funciones/pagos" },
        ]),
      ]}
    >
      <section className="pt-32 pb-20 px-6 md:px-12 lg:px-20 bg-gradient-to-b from-[#f0f6ff] to-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease }}>
            <h1 className="text-4xl md:text-6xl font-bold text-[#0f172a] tracking-tight mb-6 leading-tight">
              Cierra el mes sin abrir Excel.
            </h1>
            <p className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto mb-10 leading-relaxed">
              Ingresos por plataforma, comisiones de Airbnb y Booking, liquidaciones a propietarios.
              Todo dentro de Hostly. Sin hojas de cálculo.
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
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#1a3a8f] mb-4">Control financiero</p>
          <h2 className="text-3xl md:text-4xl font-bold text-[#0f172a] tracking-tight mb-10">
            Todo lo que cobras, en un solo lugar.
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { icon: "💰", title: "Ingresos por reserva", desc: "Cada reserva registrada con importe, plataforma, comisiones y neto real que recibes." },
              { icon: "📊", title: "Resumen mensual automático", desc: "A final de mes, tienes el resumen listo. Sin sumar manualmente. Sin errores." },
              { icon: "🧾", title: "Liquidaciones a propietarios", desc: "Si gestionas pisos de terceros, las liquidaciones mensuales salen solas el día que toca." },
              { icon: "📥", title: "Exportación para gestor", desc: "Exporta los datos en formato compatible para tu asesor fiscal o gestoría." },
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

      {/* Link a la pàgina completa de Finanzas */}
      <section className="py-10 px-6 md:px-12 lg:px-20">
        <div className="max-w-4xl mx-auto">
          <a
            href="/funcionalidades/finanzas"
            className="flex items-center justify-between gap-4 p-6 rounded-2xl border border-[#1a3a8f]/15 bg-[#eff6ff] hover:border-[#1a3a8f]/30 hover:bg-[#e0eeff] transition-all duration-200 group"
          >
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#1a3a8f]/60 mb-1">Profundiza</p>
              <p className="font-bold text-[#0f172a] text-base group-hover:text-[#1a3a8f] transition-colors">
                Finanzas en orden — liquidaciones, P&L y exportación fiscal detallados
              </p>
              <p className="text-sm text-slate-500 mt-0.5">Comisiones automáticas, informes a propietarios y todo listo para tu gestoría.</p>
            </div>
            <ArrowRight className="w-5 h-5 text-[#1a3a8f] flex-shrink-0 group-hover:translate-x-0.5 transition-transform" />
          </a>
        </div>
      </section>

      <RelatedArticles articles={featureToArticles["pagos"]} />

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
