import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

// Stack reemplaçat — mateixa llista que a GlassCards per coherència
const stackItems = [
  { tool: "Smoobu / Hostify",          price: "20 €/mes" },
  { tool: "ChatGPT Plus + plantillas", price: "22 €/mes" },
  { tool: "Chekin",                    price: "15 €/mes" },
  { tool: "Turno / Properly",          price: "15 €/mes" },
  { tool: "Gestoría + Excel",          price: "40 €/mes" },
  { tool: "PriceLabs",                 price: "25 €/mes" },
];

const TOTAL_STACK = stackItems.reduce((sum, item) => {
  const n = parseInt(item.price.replace(/\D/g, ''));
  return sum + n;
}, 0);

const HOSTLY_PRICE = 40;
const SAVINGS = TOTAL_STACK - HOSTLY_PRICE;
const SAVINGS_YEARLY = SAVINGS * 12;

const ease = [0.22, 1, 0.36, 1] as const;

const FeaturesBlock = () => (
  <section id="features" className="py-20 md:py-28 px-6 md:px-12 lg:px-20 bg-[#f8fafc]">
    <div className="max-w-5xl mx-auto">

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.55, ease }}
        className="text-center mb-12"
      >
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#1a3a8f] mb-3">
          Lo que reemplaza Hostly
        </p>
        <h2 className="text-3xl md:text-5xl font-bold text-[#0f172a] tracking-tight leading-tight">
          De 6 suscripciones a una.<br className="hidden md:block" />
          De <span className="line-through text-slate-400 font-light">{TOTAL_STACK} €</span> a <span className="font-accent italic text-[#1a3a8f]">{HOSTLY_PRICE} €</span>.
        </h2>
      </motion.div>

      {/* Banner comparatiu */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease, delay: 0.1 }}
        className="mb-14 rounded-3xl bg-white border border-slate-100 p-8 md:p-10 shadow-[0_8px_32px_rgba(15,23,42,0.04)]"
      >
        <div className="grid md:grid-cols-[1fr_auto_1fr] gap-8 md:gap-10 items-center">

          {/* ANTES */}
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-400 mb-4">
              Tu stack actual
            </p>
            <div className="space-y-1.5 mb-4">
              {stackItems.map((item) => (
                <div key={item.tool} className="flex items-center justify-between text-sm">
                  <span className="text-slate-500">{item.tool}</span>
                  <span className="font-medium text-slate-600 tabular-nums">{item.price}</span>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-between pt-3 border-t border-slate-100">
              <span className="text-sm font-semibold text-slate-700">Total</span>
              <span className="text-xl font-bold text-slate-700 tabular-nums">~{TOTAL_STACK} €/mes</span>
            </div>
          </div>

          {/* Arrow */}
          <div className="flex justify-center">
            <div className="w-12 h-12 rounded-full bg-[#eff6ff] flex items-center justify-center border border-[#dbeafe]">
              <ArrowRight className="w-5 h-5 text-[#1a3a8f]" />
            </div>
          </div>

          {/* DESPUÉS */}
          <div className="text-center md:text-left">
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#1a3a8f] mb-4">
              Con Hostly
            </p>
            <div className="flex items-baseline gap-2 justify-center md:justify-start mb-2">
              <span className="text-5xl md:text-6xl font-bold text-[#0f172a] tabular-nums">{HOSTLY_PRICE} €</span>
              <span className="text-slate-400">/mes</span>
            </div>
            <p className="text-sm text-[#16a34a] font-medium mb-5">
              + check-in y compliance gratis para siempre
            </p>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#dcfce7] text-[#166534]">
              <span className="text-sm font-bold">Ahorras {SAVINGS} €/mes</span>
              <span className="text-xs text-[#16a34a]">· {SAVINGS_YEARLY} €/año</span>
            </div>
          </div>
        </div>
      </motion.div>

    </div>
  </section>
);

export default FeaturesBlock;
