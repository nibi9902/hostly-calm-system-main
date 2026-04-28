import { motion } from "framer-motion";
import { ArrowRight, Shield, CheckCircle } from "lucide-react";
import PageShell from "@/components/PageShell";
import { faqPageSchema, breadcrumbSchema } from "@/lib/seo/schemas";
import RelatedArticles from "@/components/RelatedArticles";
import { featureToArticles } from "@/lib/data/relatedContent";

import { useSignupModal } from "@/contexts/SignupModalContext";
const ease = [0.22, 1, 0.36, 1] as const;

const replaces = [
  { name: "Chekin", cost: "2–4 € por check-in (150–240 €/año por piso)" },
  { name: "Gestoria de registros", cost: "50–100 €/mes" },
  { name: "Logins manuales a SES, NRUA y policía", cost: "horas perdidas cada semana" },
];

const faqs = [
  {
    q: "¿Qué es el check-in gratis para siempre?",
    a: "El check-in online, el registro policial (SES.Hospedajes), el NRUA y la taxa turística están incluidos sin coste adicional en cualquier plan de pago. Sin límite de check-ins. Sin precio por unidad.",
  },
  {
    q: "¿Funciona con Mossos, Ertzaintza y Policía Nacional?",
    a: "Sí. Hostly envía los datos a las autoridades competentes según la comunidad autónoma. Barcelona (Mossos), País Vasco (Ertzaintza) y el resto (Policía Nacional).",
  },
  {
    q: "¿El huésped recibe el código de acceso solo?",
    a: "Sí. Al completar el check-in online, el sistema genera y envía automáticamente el código de la cerradura al huésped. Sin que tú hagas nada.",
  },
  {
    q: "¿Qué pasa si el huésped no completa el check-in?",
    a: "Hostly envía recordatorios automáticos. Si no completa en el plazo, te avisa para que puedas intervenir.",
  },
];

const PAGE_FAQS = faqs.map((f) => ({ q: f.q, a: f.a }));

export default function CheckIn() {
  const { open: openSignup } = useSignupModal();
  return (
    <PageShell
      title="Check-in automático gratis para siempre | Hostly"
      description="SES.Hospedajes, NRUA, taxa turística y registro policial dentro de Hostly. Sin Chekin, sin gestoria. Gratis para siempre con cualquier plan."
      path="/funciones/check-in"
      schemas={[
        faqPageSchema(PAGE_FAQS),
        breadcrumbSchema([
          { name: "Hostly", url: "/" },
          { name: "Funciones", url: "/funciones/check-in" },
          { name: "Check-in automático", url: "/funciones/check-in" },
        ]),
      ]}
    >
      {/* Hero */}
      <section className="pt-32 pb-20 px-6 md:px-12 lg:px-20 bg-gradient-to-b from-[#f0f6ff] to-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease }}>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#dcfce7] text-[#16a34a] text-xs font-bold uppercase tracking-wider mb-6">
              Gratis para siempre
            </span>
            <h1 className="text-4xl md:text-6xl font-bold text-[#0f172a] tracking-tight mb-6 leading-tight">
              Check-in automático.<br />Sin Chekin. Sin gestoria.
            </h1>
            <p className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto mb-10 leading-relaxed">
              SES.Hospedajes, NRUA, registro policial y taxa turística incluidos en Hostly.
              Gratis para siempre, sin límite de check-ins.
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

      {/* Dolor */}
      <section className="py-20 px-6 md:px-12 lg:px-20">
        <div className="max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55, ease }}>
            <h2 className="text-3xl md:text-4xl font-bold text-[#0f172a] tracking-tight mb-6">
              El registro policial es obligatorio.<br />Hacerlo a mano, no.
            </h2>
            <p className="text-slate-500 text-lg leading-relaxed max-w-2xl">
              Cada reserva implica: pedir datos al huésped, entrar a SES.Hospedajes,
              rellenar el formulario, enviarlo, guardar el justificante. Repetir por cada check-in.
              Por cada piso. Cada semana del año.
            </p>
            <p className="text-slate-500 text-lg leading-relaxed max-w-2xl mt-4">
              Chekin lo automatiza — y te cobra entre 2 y 4 euros por check-in. En un piso con
              60 entradas al año, son hasta <strong className="text-[#0f172a]">240 € solo en compliance</strong>.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Solución */}
      <section className="py-20 px-6 md:px-12 lg:px-20 bg-[#f8fafc]">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#1a3a8f] mb-4">Cómo lo resuelve Hostly</p>
          <h2 className="text-3xl md:text-4xl font-bold text-[#0f172a] tracking-tight mb-10">
            El huésped entra. Las autoridades reciben los datos. Tú no haces nada.
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { icon: "✅", title: "Check-in online completo", desc: "El huésped rellena sus datos desde el móvil antes de llegar. Código de acceso enviado automáticamente." },
              { icon: "🛡️", title: "SES.Hospedajes automático", desc: "Los datos van a las autoridades al instante. Sin entrar en la web del SES manualmente." },
              { icon: "📋", title: "NRUA sin intervención", desc: "La comunicación al Registro de Alojamientos se hace sola cuando entra la reserva." },
              { icon: "💶", title: "Taxa turística recogida", desc: "La taxa municipal se cobra automáticamente al huésped durante el check-in." },
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

      {/* Qué reemplaza */}
      <section className="py-20 px-6 md:px-12 lg:px-20">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#1a3a8f] mb-4">Lo que Hostly reemplaza</p>
          <h2 className="text-3xl md:text-4xl font-bold text-[#0f172a] tracking-tight mb-10">
            Ya no necesitas Chekin. Ni la gestoria de registros.
          </h2>
          <div className="space-y-4">
            {replaces.map((r) => (
              <div key={r.name} className="flex items-start gap-4 p-5 rounded-2xl bg-[#fff7f7] border border-red-100">
                <span className="text-red-400 text-lg flex-shrink-0 line-through">❌</span>
                <div>
                  <p className="font-semibold text-[#0f172a]">{r.name}</p>
                  <p className="text-sm text-slate-500">{r.cost}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 p-5 rounded-2xl bg-[#f0fdf4] border border-[#bbf7d0] flex items-center gap-4">
            <CheckCircle className="w-6 h-6 text-[#16a34a] flex-shrink-0" />
            <p className="font-semibold text-[#16a34a]">Con Hostly: check-in + compliance gratis para siempre, incluido en tu plan.</p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-6 md:px-12 lg:px-20 bg-[#f8fafc]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-[#0f172a] tracking-tight mb-10">Preguntas frecuentes</h2>
          <div className="space-y-6">
            {faqs.map((f) => (
              <div key={f.q} className="bg-white rounded-2xl border border-slate-100 p-6">
                <p className="font-bold text-[#0f172a] mb-2">{f.q}</p>
                <p className="text-slate-500 text-sm leading-relaxed">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <RelatedArticles articles={featureToArticles["check-in"]} />

      {/* CTA final */}
      <section className="py-24 px-6 text-center" style={{ background: "linear-gradient(135deg, #0f1f5c 0%, #1a3a8f 100%)" }}>
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/40 mb-4">Check-in y compliance gratis para siempre</p>
        <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-6">
          Empieza gratis. 14 días.
        </h2>
        <p className="text-white/60 text-lg mb-10 max-w-lg mx-auto">Sin tarjeta. Sin Chekin. Sin gestoria.</p>
        <button type="button" onClick={openSignup} className="inline-flex items-center gap-3 px-10 py-4 rounded-full bg-white text-[#0f1f5c] font-semibold text-base hover:shadow-[0_8px_40px_rgba(255,255,255,0.25)] hover:-translate-y-0.5 transition-all duration-300"
        >
          Empezar gratis 14 días
          <ArrowRight className="w-4 h-4" />
        </button>
      </section>
    </PageShell>
  );
}
