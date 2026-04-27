import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import PageShell from "@/components/PageShell";

const ease = [0.22, 1, 0.36, 1] as const;

const chapters = [
  {
    id: "obligaciones-legales",
    num: "01",
    title: "Obligaciones legales del propietario turístico",
    description: "SES.Hospedajes, NRUA, registro policial y taxa turística: qué es cada cosa, quién debe hacerlo y cómo automatizarlo.",
    links: [
      { label: "SES.Hospedajes: guía completa 2026", href: "/blog/ses-hospedajes-guia-completa-2026" },
      { label: "SES + NRUA + taxa turística: qué es cada cosa", href: "/blog/ses-nrua-taxa-turistica-guia" },
      { label: "Registro de viajeros en Mossos d'Esquadra", href: "/blog/registro-viajeros-mossos-esquadra-cataluna" },
      { label: "Sanciones por no cumplir el registro", href: "/blog/sanciones-por-no-cumplir-registro-viajeros" },
      { label: "Check-in digital en España: opciones y precios", href: "/blog/checkin-digital-comparativa-espana" },
      { label: "Hostly: check-in + compliance gratis para siempre", href: "/funciones/check-in" },
    ],
  },
  {
    id: "gestion-reservas",
    num: "02",
    title: "Gestión de reservas y calendarios",
    description: "Cómo sincronizar Airbnb y Booking sin dobles reservas, gestionar disponibilidad y cobrar automáticamente.",
    links: [
      { label: "Channel manager: guía para elegir el correcto", href: "/blog/channel-manager-alquiler-vacacional-guia" },
      { label: "Precios dinámicos en Airbnb y Booking", href: "/blog/precios-dinamicos-airbnb-booking" },
      { label: "Reservas y calendarios en Hostly", href: "/funciones/reservas" },
      { label: "Precios dinámicos incluidos en Hostly", href: "/funciones/precios" },
    ],
  },
  {
    id: "comunicacion-huespedes",
    num: "03",
    title: "Comunicación con huéspedes",
    description: "Cómo responder mensajes de Airbnb y Booking automáticamente sin perder el tono humano. WhatsApp, email y mensajería unificada.",
    links: [
      { label: "Cómo responder mensajes de Airbnb automáticamente", href: "/blog/responder-mensajes-airbnb-automaticamente" },
      { label: "WhatsApp Business para alquiler vacacional", href: "/blog/whatsapp-business-alquiler-vacacional" },
      { label: "Qué hacer cuando un huésped no responde al check-in", href: "/blog/huesped-no-responde-checkin-online" },
      { label: "Mensajes automáticos en Hostly", href: "/funciones/mensajes" },
    ],
  },
  {
    id: "limpiezas-operativa",
    num: "04",
    title: "Limpiezas y operativa diaria",
    description: "Cómo coordinar al equipo de limpieza, gestionar incidencias y dejar de estar pendiente de cada entrada y salida.",
    links: [
      { label: "Coordinación de limpiezas: de Excel a sistema", href: "/blog/coordinacion-limpiezas-excel-sistema" },
      { label: "Limpiezas coordinadas en Hostly", href: "/funciones/limpiezas" },
    ],
  },
  {
    id: "finanzas-pagos",
    num: "05",
    title: "Pagos, finanzas y fiscalidad",
    description: "Cómo llevar la contabilidad del piso turístico, gestionar cobros y liquidar a propietarios sin pasar horas con Excel.",
    links: [
      { label: "¿Cuánto cuesta realmente gestionar un piso turístico?", href: "/blog/cuanto-cuesta-gestionar-piso-turistico" },
      { label: "Pagos y facturas en Hostly", href: "/funciones/pagos" },
    ],
  },
  {
    id: "herramientas-stack",
    num: "06",
    title: "Herramientas y stack tecnológico",
    description: "Qué herramientas necesitas realmente, cuáles puedes eliminar y cómo consolidar todo en una sola app.",
    links: [
      { label: "El stack real del propietario Airbnb en 2026", href: "/blog/stack-completo-propietario-airbnb" },
      { label: "Cómo gestionar 8 pisos con una sola app", href: "/blog/gestor-pequeno-5-apps-una-app" },
      { label: "Cómo automatizar tu alquiler vacacional con IA", href: "/blog/automatizar-alquiler-vacacional-con-ia" },
      { label: "Hostly vs Chekin: comparativa completa", href: "/comparativa/chekin" },
    ],
  },
  {
    id: "escalar-negocio",
    num: "07",
    title: "Escalar de 1 a 10 apartamentos",
    description: "Qué cambia cuando creces, qué sistemas necesitas tener antes de llegar a 5 pisos y cómo no colapsar en el proceso.",
    links: [
      { label: "Cómo pasar de 3 a 10 apartamentos sin colapsar", href: "/blog/pasar-3-a-10-apartamentos-sin-colapsar" },
      { label: "Las 5 horas semanales que te come un piso turístico", href: "/blog/5-horas-semana-recuperar-apartamento-turistico" },
      { label: "Hostly para gestores pequeños", href: "/gestores-pequenos" },
    ],
  },
  {
    id: "alternativas-herramientas",
    num: "08",
    title: "Alternativas y comparativas de software",
    description: "Análisis honesto de los principales PMS del mercado para el perfil propietario pequeño y gestor ibérico.",
    links: [
      { label: "Los mejores PMS para apartamentos turísticos 2026", href: "/blog/pms-apartamentos-turisticos-mejores-2026" },
      { label: "Hostify vs Lodgify vs Smoobu: comparativa", href: "/blog/hostify-vs-lodgify-vs-smoobu-comparativa" },
      { label: "Hostly vs Icnea", href: "/alternativas/icnea" },
      { label: "Hostly vs Hostify", href: "/alternativas/hostify" },
      { label: "Hostly vs Lodgify", href: "/alternativas/lodgify" },
      { label: "Hostly vs Smoobu", href: "/alternativas/smoobu" },
    ],
  },
];

export default function Guia() {
  return (
    <PageShell
      title="Super Guía de gestión de apartamentos turísticos 2026 | Hostly"
      description="La guía completa y actualizada para propietarios y gestores de apartamentos turísticos en España. Obligaciones legales, herramientas, operativa y más."
    >
      {/* Hero */}
      <section className="pt-32 pb-16 px-6 md:px-12 lg:px-20 bg-gradient-to-b from-[#f0f6ff] to-white">
        <div className="max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease }}>
            <div className="flex items-center gap-3 mb-6">
              <span className="text-xs font-bold uppercase tracking-[0.15em] text-[#1a3a8f] bg-[#eff6ff] px-3 py-1.5 rounded-full">
                Guía completa
              </span>
              <span className="text-xs font-bold uppercase tracking-[0.15em] text-[#16a34a] bg-[#dcfce7] px-3 py-1.5 rounded-full">
                Actualizada 2026
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-[#0f172a] tracking-tight mb-6 leading-tight">
              Todo lo que implica tener<br className="hidden md:block" /> un piso turístico.
            </h1>
            <p className="text-lg md:text-xl text-slate-500 max-w-2xl leading-relaxed mb-8">
              Desde las obligaciones legales hasta las herramientas del día a día. Esta guía cubre todo lo que necesita saber un propietario o gestor de apartamentos turísticos en España en 2026. La vamos actualizando a medida que cambia la normativa y el mercado.
            </p>
            <div className="flex flex-wrap gap-4 text-sm text-slate-500">
              <span>📖 8 capítulos</span>
              <span>·</span>
              <span>🔗 {chapters.reduce((acc, c) => acc + c.links.length, 0)} recursos enlazados</span>
              <span>·</span>
              <span>🔄 Actualizada abril 2026</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Índex ràpid */}
      <section className="py-12 px-6 md:px-12 lg:px-20 bg-[#f8fafc] border-y border-slate-100">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs font-bold uppercase tracking-[0.15em] text-slate-400 mb-5">Índice de contenidos</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {chapters.map((ch) => (
              <a
                key={ch.id}
                href={`#${ch.id}`}
                className="flex items-center gap-3 p-3 rounded-xl hover:bg-white hover:shadow-sm transition-all duration-200 group"
              >
                <span className="text-xs font-mono font-bold text-slate-300 w-6 shrink-0">{ch.num}</span>
                <span className="text-sm font-medium text-slate-700 group-hover:text-[#1a3a8f] transition-colors">{ch.title}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Capítols */}
      <section className="py-16 px-6 md:px-12 lg:px-20">
        <div className="max-w-4xl mx-auto space-y-16">
          {chapters.map((ch, i) => (
            <motion.div
              key={ch.id}
              id={ch.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: 0.05, ease }}
            >
              {/* Chapter header */}
              <div className="flex items-start gap-5 mb-8">
                <span className="text-3xl font-black text-slate-100 font-mono leading-none mt-1 shrink-0">{ch.num}</span>
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-[#0f172a] tracking-tight mb-3">{ch.title}</h2>
                  <p className="text-slate-500 leading-relaxed">{ch.description}</p>
                </div>
              </div>

              {/* Links */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 ml-0 md:ml-14">
                {ch.links.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="group flex items-center justify-between p-4 rounded-2xl bg-[#f8fafc] border border-slate-100 hover:bg-white hover:border-[#1a3a8f]/20 hover:shadow-sm transition-all duration-200"
                  >
                    <span className="text-sm font-medium text-slate-700 group-hover:text-[#1a3a8f] transition-colors leading-snug pr-3">
                      {link.label}
                    </span>
                    <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-[#1a3a8f] shrink-0 transition-colors" />
                  </a>
                ))}
              </div>

              {i < chapters.length - 1 && <div className="mt-16 border-t border-slate-100" />}
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 text-center" style={{ background: "linear-gradient(135deg, #0f1f5c 0%, #1a3a8f 100%)" }}>
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/40 mb-4">Para propietarios que quieren sistema, no caos</p>
        <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-6">
          Deja de gestionar 5 apps.<br />Prueba Hostly 14 días gratis.
        </h2>
        <p className="text-white/60 text-lg mb-10 max-w-xl mx-auto">
          Check-in, mensajes, limpiezas, compliance y precios. Todo en una sola app. Sin tarjeta.
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
