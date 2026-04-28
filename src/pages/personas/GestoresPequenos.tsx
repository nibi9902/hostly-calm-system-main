import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import PageShell from "@/components/PageShell";
import { breadcrumbSchema } from "@/lib/seo/schemas";

import { useSignupModal } from "@/contexts/SignupModalContext";
const ease = [0.22, 1, 0.36, 1] as const;

export default function GestoresPequenos() {
  const { open: openSignup } = useSignupModal();
  return (
    <PageShell
      title="Hostly para gestores pequeños de apartamentos"
      description="Llevas 5, 8 o 10 pisos con 4 o 5 suscripciones abiertas. Hostly lo unifica todo. Un login, una factura, una app."
      path="/gestores-pequenos"
      schemas={[breadcrumbSchema([{ name: 'Hostly', url: '/' }, { name: 'Para gestores', url: '/gestores-pequenos' }])]}
    >
      <section className="pt-32 pb-20 px-6 md:px-12 lg:px-20 bg-gradient-to-b from-[#f0f6ff] to-white">
        <div className="max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease }}>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#1a3a8f] mb-4">Para gestores pequeños</p>
            <h1 className="text-4xl md:text-6xl font-bold text-[#0f172a] tracking-tight mb-6 leading-tight">
              Llevas 8 pisos.<br />¿Con cuántas apps?
            </h1>
            <p className="text-lg md:text-xl text-slate-500 max-w-2xl mb-10 leading-relaxed">
              Canal manager por aquí. Chekin por allá. Excel para los cobros. Dropbox para contratos.
              WhatsApp con huéspedes y otro con las limpiadoras. Hostly cierra todo eso en una sola app.
            </p>
            <button type="button" onClick={openSignup} className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#1a3a8f] text-white font-semibold text-base hover:shadow-[0_8px_30px_rgba(26,58,143,0.3)] hover:-translate-y-0.5 transition-all duration-300"
            >
              Empezar gratis 14 días
              <ArrowRight className="w-4 h-4" />
            </button>
            <p className="text-sm text-slate-400 mt-3">Sin tarjeta. Sin permanencia. 37€/ap desde 5 pisos.</p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 px-6 md:px-12 lg:px-20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0f172a] tracking-tight mb-4">
            El stack del gestor pequeño hoy.
          </h2>
          <p className="text-slate-500 text-lg mb-10">Y lo que cuesta al año.</p>
          <div className="space-y-3 mb-8">
            {[
              { name: "Canal manager (Smoobu, Hostify, etc.)", cost: "~280 €/año" },
              { name: "Chekin (compliance y check-in)", cost: "~200 €/año" },
              { name: "Plantillas de mensajes o similar", cost: "~120 €/año" },
              { name: "Excel + Dropbox", cost: "Gratis en dinero, carísimo en tiempo" },
              { name: "Gestoria de taxes y IRPF", cost: "600–1.200 €/año" },
            ].map((item) => (
              <div key={item.name} className="flex items-center justify-between p-4 rounded-xl bg-[#fff7f7] border border-red-100 text-sm">
                <span className="text-slate-700">❌ {item.name}</span>
                <span className="font-semibold text-red-500 flex-shrink-0 ml-4">{item.cost}</span>
              </div>
            ))}
          </div>
          <div className="p-5 rounded-2xl bg-[#f0fdf4] border border-[#bbf7d0]">
            <p className="font-bold text-[#16a34a]">✅ Con Hostly: 37 €/apartamento/mes. Todo incluido. Una sola factura.</p>
          </div>
        </div>
      </section>

      <section className="py-24 px-6 text-center" style={{ background: "linear-gradient(135deg, #0f1f5c 0%, #1a3a8f 100%)" }}>
        <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-6">
          Empieza gratis. 14 días.
        </h2>
        <p className="text-white/60 text-lg mb-10 max-w-lg mx-auto">37 €/ap desde 5 pisos. Sin tarjeta.</p>
        <button type="button" onClick={openSignup} className="inline-flex items-center gap-3 px-10 py-4 rounded-full bg-white text-[#0f1f5c] font-semibold text-base hover:shadow-[0_8px_40px_rgba(255,255,255,0.25)] hover:-translate-y-0.5 transition-all duration-300"
        >
          Empezar gratis 14 días
          <ArrowRight className="w-4 h-4" />
        </button>
      </section>
    </PageShell>
  );
}
