import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { LangLink } from "@/i18n/LangLink";

import { useSignupModal } from "@/contexts/SignupModalContext";
const ease = [0.22, 1, 0.36, 1] as const;

/* Llista del que inclou la cuenta gratis — sense que res del NO-gratis es filtri */
const includes = [
  "Envío automático a SES.Hospedajes",
  "Validación de DNI / NIE / Pasaporte",
  "Firma digital del huésped",
  "Justificantes archivados 5 años",
  "Sin límite de apartamentos",
];

/* Cossos on Hostly envia el parte — apareixen com a trust strip institucional */
const bodies = [
  { label: "Policía Nacional", color: "#1a3a8f" },
  { label: "Mossos d'Esquadra", color: "#0891b2" },
  { label: "Ertzaintza",        color: "#16a34a" },
];

export default function ComplianceBlock() {
  const { open: openSignup } = useSignupModal();
  return (
    <section
      id="compliance"
      className="py-24 md:py-32 px-6 md:px-12 lg:px-20"
      style={{ background: "linear-gradient(180deg, #f8fafc 0%, white 100%)" }}
    >
      <div className="max-w-5xl mx-auto">

        {/* Header — H2 amb price slash visual, crea el moment "ostia" instantani */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease }}
          className="text-center mb-10 md:mb-12"
        >
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#1a3a8f] mb-4">
            El parte de viajeros · Gratis para siempre
          </p>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight leading-[1.18] mb-6">
            <span className="text-slate-400 line-through decoration-slate-300 decoration-[3px]">
              180&nbsp;€ al año en otras apps.
            </span>
            <br />
            <span className="text-[#0f172a]">
              <span
                className="font-black tracking-[-0.05em] inline-block align-baseline"
                style={{ color: "#16a34a", fontSize: "1.25em" }}
              >
                0&nbsp;€
              </span>
              {" "}en Hostly. Para siempre.
            </span>
          </h2>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto leading-relaxed">
            Hostly manda el parte de viajeros a la policía cada vez que entra un huésped.
            Tú no pagas nada — y se queda así.
          </p>
        </motion.div>

        {/* Trust strip — "Connectat oficialment amb" en format institucional, dóna autoritat */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15, ease }}
          className="mb-12 md:mb-14"
        >
          <div className="flex items-center justify-center gap-4 mb-5">
            <div className="h-px flex-1 max-w-[120px] bg-slate-200" />
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-slate-400">
              Conectado con
            </p>
            <div className="h-px flex-1 max-w-[120px] bg-slate-200" />
          </div>
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
            {bodies.map((b) => (
              <div key={b.label} className="flex items-center gap-2.5 text-sm font-semibold tracking-tight" style={{ color: b.color }}>
                <span className="w-2 h-2 rounded-full" style={{ background: b.color }} />
                {b.label}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Conversion card — fa tota la feina de tancament */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease }}
          className="relative rounded-3xl border border-slate-100 bg-white p-6 md:p-12 shadow-[0_4px_32px_rgba(15,23,42,0.04)]"
        >
          {/* Glow institucional càlid */}
          <div
            aria-hidden
            className="pointer-events-none absolute top-0 right-0 w-72 h-72 rounded-full"
            style={{ background: "radial-gradient(circle, rgba(26,58,143,0.08) 0%, transparent 70%)" }}
          />

          <div className="relative grid md:grid-cols-[1.3fr_1fr] gap-10 md:gap-14 items-center">

            {/* Esquerra: hook + claim humà + CTA */}
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#16a34a] mb-3">
                ¿Y dónde está la trampa?
              </p>
              <h3 className="text-2xl md:text-[1.85rem] font-bold text-[#0f172a] tracking-tight leading-[1.1] mb-4">
                No hay trampa.<br />Es gratis y se queda gratis.
              </h3>
              <p className="text-slate-600 text-base leading-relaxed mb-3">
                Crea la cuenta, conecta un piso, y los partes salen solos hacia la policía
                cada vez que llega un huésped. Tú no haces nada.
              </p>
              <p className="text-slate-500 text-sm leading-relaxed mb-8">
                Y si más adelante quieres conectar Airbnb, las limpiezas o las finanzas,
                ya hablaremos.
              </p>

              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <button type="button" onClick={openSignup} className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#1a3a8f] text-white font-semibold text-sm hover:bg-[#142d6e] transition-colors shadow-[0_4px_14px_rgba(26,58,143,0.25)]"
                >
                  Crear cuenta gratis
                  <ArrowRight className="w-4 h-4" />
                </button>
                <p className="text-xs text-slate-400 font-medium">
                  Sin tarjeta · Sin caducidad
                </p>
              </div>
            </div>

            {/* Dreta: checklist concreta del que inclou la cuenta gratis */}
            <div className="md:pl-10 md:border-l md:border-slate-100">
              <div className="flex items-baseline justify-between mb-5">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#16a34a]">
                  Incluido gratis
                </p>
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Para siempre
                </p>
              </div>
              <ul className="space-y-3.5">
                {includes.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-sm text-slate-700 leading-snug"
                  >
                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-[#dcfce7] flex items-center justify-center mt-0.5">
                      <Check className="w-3 h-3 text-[#16a34a]" strokeWidth={3} />
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </motion.div>

        {/* CTA secundari — link suau a detall complet */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2, ease }}
          className="text-center mt-10"
        >
          <LangLink
            to="/funcionalidades/check-in-online"
            className="inline-flex items-center gap-2 text-[#1a3a8f] font-semibold text-sm hover:underline"
          >
            Cómo funciona el check-in
            <ArrowRight className="w-4 h-4" />
          </LangLink>
        </motion.div>

      </div>
    </section>
  );
}
