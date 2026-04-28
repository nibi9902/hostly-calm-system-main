import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import PageShell from "@/components/PageShell";
import { breadcrumbSchema } from "@/lib/seo/schemas";

import { useSignupModal } from "@/contexts/SignupModalContext";
const ease = [0.22, 1, 0.36, 1] as const;

export default function Propietarios() {
  const { open: openSignup } = useSignupModal();
  return (
    <PageShell
      title="Hostly para propietarios de apartamentos turísticos"
      description="Tienes 1, 2 o 3 pisos en Airbnb o Booking. Hostly simplifica todo lo que implica gestionarlos. Check-in, mensajes, limpiezas y compliance. Una sola app."
      path="/propietarios"
      schemas={[breadcrumbSchema([{ name: 'Hostly', url: '/' }, { name: 'Para propietarios', url: '/propietarios' }])]}
    >
      <section className="pt-32 pb-20 px-6 md:px-12 lg:px-20 bg-gradient-to-b from-[#f0f6ff] to-white">
        <div className="max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease }}>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#1a3a8f] mb-4">Para propietarios</p>
            <h1 className="text-4xl md:text-6xl font-bold text-[#0f172a] tracking-tight mb-6 leading-tight">
              Tienes 1 o 2 pisos.<br />No deberías vivir pendiente de ellos.
            </h1>
            <p className="text-lg md:text-xl text-slate-500 max-w-2xl mb-10 leading-relaxed">
              Pusiste el piso en Airbnb para tener ingresos extra. No para responder mensajes
              a las 11 de la noche, coordinar neteges por WhatsApp y acordarte del registro policial.
              Hostly lo simplifica todo.
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

      <section className="py-20 px-6 md:px-12 lg:px-20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0f172a] tracking-tight mb-10">
            Lo que te quita el sueño. Y cómo Hostly lo resuelve.
          </h2>
          <div className="space-y-6">
            {[
              {
                pain: "Mensajes de huéspedes a horas imposibles",
                fix: "Hostly responde automáticamente las preguntas habituales. Tú recibes un resumen cuando quieres mirarlo.",
              },
              {
                pain: "El registro policial que siempre dejas para última hora",
                fix: "Los datos van a SES.Hospedajes solos cuando entra la reserva. Sin logins, sin formularios.",
              },
              {
                pain: "Coordinar a la limpiadora por WhatsApp",
                fix: "Al hacer checkout, tu equipo recibe el aviso automáticamente. Sin que tú hagas nada.",
              },
              {
                pain: "El Excel de cobros que ya no entiendes",
                fix: "Todos los ingresos y comisiones dentro de Hostly. Cierra el mes en dos minutos.",
              },
            ].map((item, i) => (
              <motion.div
                key={item.pain}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.08, ease }}
                className="grid md:grid-cols-2 gap-4"
              >
                <div className="rounded-2xl bg-[#fff7f7] border border-red-100 p-5">
                  <p className="text-xs font-bold uppercase tracking-wider text-red-400 mb-2">Ahora</p>
                  <p className="text-slate-700 text-sm font-medium">{item.pain}</p>
                </div>
                <div className="rounded-2xl bg-[#f0fdf4] border border-[#bbf7d0] p-5">
                  <p className="text-xs font-bold uppercase tracking-wider text-[#16a34a] mb-2">Con Hostly</p>
                  <p className="text-slate-700 text-sm">{item.fix}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6 md:px-12 lg:px-20 bg-[#f8fafc]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-[#0f172a] tracking-tight mb-4">40€/mes. Todo incluido.</h2>
          <p className="text-slate-500 text-lg max-w-xl mx-auto">
            Reservas, check-in, mensajes, limpiezas y compliance. Una sola factura, una sola app.
            Y el check-in, gratis para siempre.
          </p>
        </div>
      </section>

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
