import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import PageShell from "@/components/PageShell";
import { breadcrumbSchema } from "@/lib/seo/schemas";

const ease = [0.22, 1, 0.36, 1] as const;

export default function SegundaResidencia() {
  return (
    <PageShell
      title="Hostly para segunda residencia en Airbnb"
      description="Tienes un piso en la costa o la montaña que alquilas cuando no lo usas. Hostly simplifica la gestión para que el verano vuelva a ser verano."
      path="/segunda-residencia"
      schemas={[breadcrumbSchema([{ name: 'Hostly', url: '/' }, { name: 'Segunda residencia', url: '/segunda-residencia' }])]}
    >
      <section className="pt-32 pb-20 px-6 md:px-12 lg:px-20 bg-gradient-to-b from-[#f0f6ff] to-white">
        <div className="max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease }}>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#1a3a8f] mb-4">Segunda residencia</p>
            <h1 className="text-4xl md:text-6xl font-bold text-[#0f172a] tracking-tight mb-6 leading-tight">
              Que el verano<br />vuelva a ser verano.
            </h1>
            <p className="text-lg md:text-xl text-slate-500 max-w-2xl mb-10 leading-relaxed">
              Tienes un piso en la costa que alquilas cuando no lo usas. Cada entrada y salida,
              cada pregunta de los huéspedes, cada neteja coordinada — se convierte en un dolor de cabeza
              que ocupa el verano entero. Hostly lo ordena todo.
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
          <h2 className="text-3xl md:text-4xl font-bold text-[#0f172a] tracking-tight mb-10">
            Configuras una vez en mayo. Funciona todo el verano.
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { icon: "🔑", title: "Check-in sin estar allí", desc: "El huésped recibe su código de acceso solo. No tienes que desplazarte ni quedar con nadie." },
              { icon: "🧹", title: "Limpiezas automáticas", desc: "Tu equipo de limpieza recibe el aviso al checkout. Tú no tienes que gestionar nada." },
              { icon: "💬", title: "Mensajes respondidos", desc: "El sistema contesta las preguntas del verano: wifi, aparcamiento, normas. Sin que abras el móvil." },
              { icon: "🛡️", title: "Compliance automático", desc: "SES, policía y taxa turística enviados solos. Sin acordarte de hacerlo tú." },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.08, ease }}
                className="bg-white rounded-2xl border border-slate-100 p-6 flex gap-4 shadow-sm"
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

      <section className="py-24 px-6 text-center" style={{ background: "linear-gradient(135deg, #0f1f5c 0%, #1a3a8f 100%)" }}>
        <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-6">
          Empieza gratis. 14 días.
        </h2>
        <p className="text-white/60 text-lg mb-10 max-w-lg mx-auto">40 €/mes. Sin tarjeta. Sin permanencia.</p>
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
