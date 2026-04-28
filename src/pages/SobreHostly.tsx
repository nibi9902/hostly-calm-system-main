import { motion } from "framer-motion";
import { ArrowRight, Mail } from "lucide-react";
import PageShell from "@/components/PageShell";
import { breadcrumbSchema } from "@/lib/seo/schemas";

import { useSignupModal } from "@/contexts/SignupModalContext";
const ease = [0.22, 1, 0.36, 1] as const;

const values = [
  {
    title: "Una sola app, no cinco",
    body: "El propietario no debería necesitar saber qué es un channel manager. Debería tener una app que lo haga todo.",
  },
  {
    title: "La opción por defecto es correcta",
    body: "El 95% de las configuraciones tienen que funcionar sin tocar nada. Hostly toma decisiones por ti cuando la respuesta es obvia.",
  },
  {
    title: "Proactivo, no reactivo",
    body: "No te avisamos cuando ya ha pasado el problema. Te avisamos antes. La taxa turística que vence mañana. El precio que conviene subir esta semana.",
  },
  {
    title: "Ibérico de verdad",
    body: "SES.Hospedajes, Mossos, Ertzaintza, NRUA, taxa turística. No traducciones de un producto americano. Construido para el mercado español desde el primer día.",
  },
];

export default function SobreHostly() {
  const { open: openSignup } = useSignupModal();
  return (
    <PageShell
      title="Sobre Hostly — La app que simplifica tener un piso turístico"
      description="Hostly nació de la frustración de gestionar apartamentos turísticos con cinco herramientas distintas. Somos un equipo ibérico obsesionado con simplificar todo lo que implica tener un piso turístico."
      path="/sobre-hostly"
      schemas={[
        breadcrumbSchema([
          { name: "Hostly", url: "/" },
          { name: "Sobre Hostly", url: "/sobre-hostly" },
        ]),
      ]}
    >
      {/* Hero */}
      <section className="pt-32 pb-20 px-6 md:px-12 lg:px-20 bg-gradient-to-b from-[#f0f6ff] to-white">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
          >
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#1a3a8f] mb-5">
              Sobre Hostly
            </p>
            <h1 className="text-4xl md:text-6xl font-bold text-[#0f172a] tracking-tight leading-[1.05] mb-6">
              Nació de vivirlo.
            </h1>
            <p className="text-lg md:text-xl text-slate-500 leading-relaxed">
              Hostly no surgió en una oficina ni de un estudio de mercado.
              Surgió de la frustración de gestionar apartamentos turísticos
              con cinco herramientas distintas y no poder desconectar nunca.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Historia */}
      <section className="py-20 px-6 md:px-12 lg:px-20">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, ease }}
            className="prose prose-slate prose-lg max-w-none"
          >
            <p>
              Tenía mis propios apartamentos en Airbnb y Booking. El canal manager aquí,
              Chekin allá, las plantillas de mensajes en otro sitio, el Excel de cobros abierto
              siempre, el grupo de WhatsApp con la limpiadora.
            </p>
            <p>
              Cada reserva implicaba tocar seis herramientas distintas. Cada check-in,
              entrar a SES.Hospedajes a mano. Cada fin de mes, una tarde de Excel.
              Y la sensación constante de que si me despistaba, algo se rompía.
            </p>
            <p>
              No encontré ninguna herramienta que lo hiciera todo de forma sencilla
              para el mercado español. Las que existían eran complejas, caras,
              o no entendían la burocracia ibérica.
            </p>
            <p className="font-semibold text-[#0f172a]">
              Así que lo construí yo. Primero para mí. Luego, cuando funcionó,
              para todos los que estaban en la misma situación.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Founder card */}
      <section className="py-12 px-6 md:px-12 lg:px-20 bg-[#f8fafc]">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease }}
            className="flex items-start gap-5 p-8 rounded-3xl bg-white border border-slate-100 shadow-[0_4px_24px_rgba(15,23,42,0.05)]"
          >
            <div className="w-14 h-14 rounded-full bg-[#1a3a8f] flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
              B
            </div>
            <div>
              <p className="font-bold text-[#0f172a] text-lg mb-0.5">Biel Alsina</p>
              <p className="text-sm text-slate-400 mb-4">Fundador · Barcelona</p>
              <p className="text-slate-600 text-sm leading-relaxed italic">
                "Hostly no nació en una oficina. Nació de la frustración de gestionar
                mis propios apartamentos y no poder desconectar nunca.
                Lo construí para mí — y funciona."
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Valores */}
      <section className="py-20 px-6 md:px-12 lg:px-20">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#1a3a8f] mb-4">
            Cómo pensamos
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-[#0f172a] tracking-tight mb-12">
            Los principios que guían cada decisión.
          </h2>
          <div className="space-y-8">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.07, ease }}
                className="flex gap-5"
              >
                <div className="w-8 h-8 rounded-full bg-[#eff6ff] flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-[#1a3a8f] font-bold text-sm">{i + 1}</span>
                </div>
                <div>
                  <p className="font-bold text-[#0f172a] mb-1">{v.title}</p>
                  <p className="text-slate-500 text-sm leading-relaxed">{v.body}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contacto */}
      <section className="py-20 px-6 md:px-12 lg:px-20 bg-[#f8fafc] border-t border-slate-100">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-[#0f172a] tracking-tight mb-4">
            ¿Hablamos?
          </h2>
          <p className="text-slate-500 text-lg leading-relaxed mb-8 max-w-xl">
            Si tienes pisos en Airbnb o Booking y crees que Hostly puede ayudarte,
            escríbenos. Respondemos rápido y en castellano o catalán.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="mailto:hola@hostlylabs.com"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#1a3a8f] text-white font-semibold text-base hover:shadow-[0_8px_30px_rgba(26,58,143,0.3)] hover:-translate-y-0.5 transition-all duration-300"
            >
              <Mail className="w-4 h-4" />
              hola@hostlylabs.com
            </a>
            <button type="button" onClick={openSignup} className="inline-flex items-center gap-3 px-8 py-4 rounded-full border border-slate-200 text-[#0f172a] font-medium text-base hover:bg-[#f8fafc] hover:-translate-y-0.5 transition-all duration-300"
            >
              Empezar gratis 14 días
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
