import { motion } from "framer-motion";
import { ArrowRight, CheckCircle, XCircle } from "lucide-react";
import PageShell from "@/components/PageShell";
import { faqPageSchema, breadcrumbSchema } from "@/lib/seo/schemas";

const ease = [0.22, 1, 0.36, 1] as const;

const comparison = [
  { feature: "Check-in online",              hostly: true,  chekin: true  },
  { feature: "SES.Hospedajes",               hostly: true,  chekin: true  },
  { feature: "NRUA",                         hostly: true,  chekin: true  },
  { feature: "Taxa turística",               hostly: true,  chekin: true  },
  { feature: "Precio por check-in",          hostly: false, chekin: true  },
  { feature: "Channel manager incluido",     hostly: true,  chekin: false },
  { feature: "Mensajes con huéspedes",       hostly: true,  chekin: false },
  { feature: "Coordinación de limpiezas",    hostly: true,  chekin: false },
  { feature: "Precios dinámicos",            hostly: true,  chekin: false },
  { feature: "Gestión de pagos",             hostly: true,  chekin: false },
  { feature: "Soporte en español y catalán", hostly: true,  chekin: true  },
];

const chekinFaqs = [
  {
    q: "¿Hostly hace lo mismo que Chekin?",
    a: "Sí, y mucho más. Hostly incluye check-in online, SES.Hospedajes, NRUA, registro policial y taxa turística exactamente como Chekin, pero gratis para siempre dentro de un plan que también incluye reservas, mensajes, limpiezas y precios.",
  },
  {
    q: "¿Cuánto me ahorro si paso de Chekin a Hostly?",
    a: "Con 60 check-ins al año a 3 € cada uno, Chekin te cuesta ~180 €/año solo en compliance. Con Hostly pagas 40 €/mes (480 €/año) pero obtienes check-in gratis más canal manager, mensajes, limpiezas y precios dinámicos incluidos.",
  },
  {
    q: "¿Pierdo datos o reservas si migro desde Chekin?",
    a: "No. Hacemos la migración en paralelo mientras mantienes Chekin activo. Una vez Hostly está configurado, apagamos Chekin sin interrupción.",
  },
];

export default function ComparativaChekin() {
  return (
    <PageShell
      title="Chekin vs Hostly — Check-in turístico en España | Hostly"
      description="Compara Chekin y Hostly para la gestión de check-in y compliance en apartamentos turísticos. Check-in incluido gratis en Hostly."
      path="/comparativa/chekin"
      schemas={[
        faqPageSchema(chekinFaqs),
        breadcrumbSchema([
          { name: "Hostly", url: "/" },
          { name: "Comparativa", url: "/comparativa/chekin" },
          { name: "Chekin vs Hostly", url: "/comparativa/chekin" },
        ]),
      ]}
    >
      {/* Hero */}
      <section className="pt-32 pb-20 px-6 md:px-12 lg:px-20 bg-gradient-to-b from-[#f8fafc] to-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease }}>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400 mb-4">Comparativa</p>
            <h1 className="text-4xl md:text-6xl font-bold text-[#0f172a] tracking-tight mb-6 leading-tight">
              Chekin vs Hostly
            </h1>
            <p className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed">
              Chekin automatiza el check-in legal. Hostly lo incluye gratis dentro de
              una plataforma completa de gestión. Esta es la diferencia.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Quiénes son */}
      <section className="py-16 px-6 md:px-12 lg:px-20">
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, ease }}
            className="rounded-2xl border border-slate-200 p-8"
          >
            <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">Chekin</p>
            <h2 className="text-xl font-bold text-[#0f172a] mb-4">Especialista en check-in y compliance legal</h2>
            <p className="text-slate-500 text-sm leading-relaxed">
              Chekin automatiza el check-in online, el registro policial (SES.Hospedajes),
              el NRUA y la taxa turística. Es muy bueno en lo que hace.
              Cobra entre 2 y 4 € por check-in o una cuota mensual por propiedad.
            </p>
            <p className="text-slate-500 text-sm leading-relaxed mt-3">
              No gestiona reservas, mensajes, limpiezas ni precios. Para eso necesitas otras herramientas.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1, ease }}
            className="rounded-2xl border border-[#1a3a8f]/20 bg-[#f0f6ff] p-8"
          >
            <p className="text-xs font-bold uppercase tracking-widest text-[#1a3a8f] mb-3">Hostly</p>
            <h2 className="text-xl font-bold text-[#0f172a] mb-4">La app que reemplaza cinco suscripciones</h2>
            <p className="text-slate-500 text-sm leading-relaxed">
              Hostly incluye el check-in completo (SES, NRUA, policía, taxa) gratis para siempre
              dentro de una plataforma que también gestiona reservas, mensajes, limpiezas,
              precios y pagos.
            </p>
            <p className="text-slate-500 text-sm leading-relaxed mt-3">
              Una app. Una factura. Sin suscripciones adicionales.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Tabla comparativa */}
      <section className="py-16 px-6 md:px-12 lg:px-20 bg-[#f8fafc]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-[#0f172a] tracking-tight mb-10 text-center">Comparativa directa</h2>
          <div className="rounded-2xl overflow-hidden border border-slate-200 bg-white">
            {/* Header */}
            <div className="grid grid-cols-3 bg-[#0f172a] text-white text-sm font-semibold">
              <div className="p-4">Funcionalidad</div>
              <div className="p-4 text-center border-l border-white/10">Hostly</div>
              <div className="p-4 text-center border-l border-white/10">Chekin</div>
            </div>
            {/* Rows */}
            {comparison.map((row, i) => (
              <div
                key={row.feature}
                className={`grid grid-cols-3 text-sm border-t border-slate-100 ${i % 2 === 0 ? "bg-white" : "bg-slate-50/50"}`}
              >
                <div className="p-4 text-slate-700 font-medium">{row.feature}</div>
                <div className="p-4 flex justify-center items-center border-l border-slate-100">
                  {row.hostly
                    ? <CheckCircle className="w-5 h-5 text-[#16a34a]" />
                    : <span className="text-xs font-semibold text-[#16a34a] bg-[#dcfce7] px-2 py-0.5 rounded-full">Gratis</span>}
                </div>
                <div className="p-4 flex justify-center items-center border-l border-slate-100">
                  {row.chekin
                    ? <CheckCircle className="w-5 h-5 text-slate-400" />
                    : <XCircle className="w-5 h-5 text-slate-200" />}
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs text-slate-400 text-center mt-4">
            Datos verificados a abril 2026. Precios y funcionalidades pueden cambiar.
          </p>
        </div>
      </section>

      {/* Coste anual */}
      <section className="py-16 px-6 md:px-12 lg:px-20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-[#0f172a] tracking-tight mb-4 text-center">El coste real por piso al año</h2>
          <p className="text-slate-500 text-center max-w-xl mx-auto mb-10">Ejemplo: 1 piso con 60 check-ins al año.</p>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="rounded-2xl border border-slate-200 p-8">
              <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">Con Chekin + otras herramientas</p>
              <div className="space-y-3 text-sm text-slate-600">
                <div className="flex justify-between"><span>Chekin (60 check-ins × 3 €)</span><span className="font-semibold">180 €/año</span></div>
                <div className="flex justify-between"><span>Canal manager (Smoobu básico)</span><span className="font-semibold">280 €/año</span></div>
                <div className="flex justify-between"><span>Plantillas mensajes</span><span className="font-semibold">120 €/año</span></div>
                <div className="flex justify-between"><span>Excel + Dropbox (tiempo real)</span><span className="font-semibold">— €</span></div>
                <div className="border-t border-slate-200 pt-3 flex justify-between font-bold text-[#0f172a]">
                  <span>Total estimado</span><span>580 €/año</span>
                </div>
              </div>
            </div>
            <div className="rounded-2xl border border-[#1a3a8f]/20 bg-[#f0f6ff] p-8">
              <p className="text-xs font-bold uppercase tracking-widest text-[#1a3a8f] mb-4">Con Hostly</p>
              <div className="space-y-3 text-sm text-slate-600">
                <div className="flex justify-between"><span>Plan Hostly (40 € × 12 meses)</span><span className="font-semibold">480 €/año</span></div>
                <div className="flex justify-between"><span>Check-in + SES + NRUA + taxa</span><span className="font-semibold text-[#16a34a]">Gratis</span></div>
                <div className="flex justify-between"><span>Canal manager incluido</span><span className="font-semibold text-[#16a34a]">Gratis</span></div>
                <div className="flex justify-between"><span>Mensajes, limpiezas, pagos</span><span className="font-semibold text-[#16a34a]">Gratis</span></div>
                <div className="border-t border-[#1a3a8f]/20 pt-3 flex justify-between font-bold text-[#0f172a]">
                  <span>Total</span><span>480 €/año</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-6 md:px-12 lg:px-20">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-[#0f172a] tracking-tight mb-10">Preguntas frecuentes</h2>
          <div className="space-y-6">
            {chekinFaqs.map((f) => (
              <div key={f.q} className="bg-[#f8fafc] rounded-2xl border border-slate-100 p-6">
                <p className="font-bold text-[#0f172a] mb-2">{f.q}</p>
                <p className="text-slate-500 text-sm leading-relaxed">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 text-center" style={{ background: "linear-gradient(135deg, #0f1f5c 0%, #1a3a8f 100%)" }}>
        <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-6">
          Check-in gratis para siempre.<br />Y mucho más.
        </h2>
        <p className="text-white/60 text-lg mb-10 max-w-xl mx-auto">
          14 días gratis. Sin tarjeta. Si no simplifica nada, no nos debes nada.
        </p>
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
