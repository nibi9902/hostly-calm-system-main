import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import * as icons from 'lucide-react';
import { FEATURES } from '@/lib/data/features';
import PageShell from '@/components/PageShell';
import { breadcrumbSchema } from '@/lib/seo/schemas';

const ease = [0.22, 1, 0.36, 1] as const;
const IconMap = icons as unknown as Record<string, React.FC<{ className?: string; style?: React.CSSProperties }>>;

export default function FuncionalidadesIndex() {
  return (
    <PageShell
      title="Funcionalidades de Hostly · Software de gestión para apartamentos turísticos"
      description="IA en WhatsApp, check-in online, channel manager, precios dinámicos, gestión de limpiezas, multi-rol y automatizaciones. Todo dentro de Hostly."
      path="/funcionalidades"
      schemas={[
        breadcrumbSchema([
          { name: 'Hostly', url: '/' },
          { name: 'Funcionalidades', url: '/funcionalidades' },
        ]),
      ]}
    >
      {/* Hero */}
      <section className="pt-32 pb-16 px-6 md:px-12 lg:px-20 bg-gradient-to-b from-[#f0f6ff] to-white">
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease }}>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#1a3a8f] mb-4">Funcionalidades</p>
            <h1 className="text-4xl md:text-6xl font-bold text-[#0f172a] tracking-tight mb-6 leading-[1.05]">
              Todo lo que hace Hostly,<br className="hidden md:block" /> una funcionalidad a la vez.
            </h1>
            <p className="text-lg md:text-xl text-slate-500 max-w-2xl leading-relaxed">
              {FEATURES.length} funcionalidades integradas en una sola app. Sin add-ons,
              sin subscripciones extra, sin sorpresas. Lo que ves es lo que tienes desde el primer día.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Features grid */}
      <section className="py-16 px-6 md:px-12 lg:px-20">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-5">
            {FEATURES.map((f, i) => {
              const Icon = IconMap[f.iconName] ?? icons.Sparkles;
              return (
                <motion.a
                  key={f.slug}
                  href={`/funcionalidades/${f.slug}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.45, delay: i * 0.05, ease }}
                  className="group flex flex-col gap-4 p-6 rounded-2xl border border-slate-100 bg-white hover:border-[#1a3a8f]/25 hover:shadow-[0_8px_32px_rgba(26,58,143,0.08)] transition-all duration-250"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl bg-[#eff6ff] flex items-center justify-center">
                      <Icon className="w-5 h-5" style={{ color: '#1a3a8f' }} />
                    </div>
                    <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#1a3a8f]">
                      Hostly ·
                    </span>
                  </div>
                  <h2 className="text-xl font-bold text-[#0f172a] group-hover:text-[#1a3a8f] transition-colors leading-snug">
                    {f.name}
                  </h2>
                  <p className="text-sm text-slate-500 leading-relaxed">{f.shortDescription}</p>
                  <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#1a3a8f] mt-auto pt-2">
                    Ver funcionalidad <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </motion.a>
              );
            })}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 px-6 text-center" style={{ background: 'linear-gradient(135deg, #0f1f5c 0%, #1a3a8f 100%)' }}>
        <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-6">
          Todo esto, por 40 €/apartamento.
        </h2>
        <p className="text-white/60 text-lg mb-10 max-w-xl mx-auto">
          14 días gratis. Sin tarjeta. Check-in y compliance gratis para siempre.
        </p>
        <a
          href="https://app.hostlylabs.com/signup"
          className="inline-flex items-center gap-3 px-10 py-4 rounded-full bg-white text-[#0f1f5c] font-semibold text-base hover:shadow-[0_8px_40px_rgba(255,255,255,0.25)] hover:-translate-y-0.5 transition-all duration-300"
        >
          Empezar gratis 14 días <ArrowRight className="w-4 h-4" />
        </a>
      </section>
    </PageShell>
  );
}
