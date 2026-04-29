import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import PageShell from "@/components/PageShell";
import { faqPageSchema, breadcrumbSchema } from "@/lib/seo/schemas";
import RelatedArticles from "@/components/RelatedArticles";
import { featureToArticles } from "@/lib/data/relatedContent";
import { useTranslation } from 'react-i18next';

import { useSignupModal } from "@/contexts/SignupModalContext";
const ease = [0.22, 1, 0.36, 1] as const;

interface FaqItem { q: string; a: string }
interface FeatureItem { icon: string; title: string; desc: string }

export default function Limpiezas() {
  const { open: openSignup } = useSignupModal();
  const { t } = useTranslation('funciones');

  const faqs = t('limpiezas.faqs', { returnObjects: true }) as FaqItem[];
  const features = t('limpiezas.features', { returnObjects: true }) as FeatureItem[];

  return (
    <PageShell
      title={t('limpiezas.meta_title')}
      description={t('limpiezas.meta_description')}
      path="/funciones/limpiezas"
      schemas={[
        faqPageSchema(faqs),
        breadcrumbSchema([
          { name: "Hostly", url: "/" },
          { name: t('limpiezas.breadcrumb_funciones'), url: "/funciones/limpiezas" },
          { name: t('limpiezas.breadcrumb_name'), url: "/funciones/limpiezas" },
        ]),
      ]}
    >
      <section className="pt-32 pb-20 px-6 md:px-12 lg:px-20 bg-gradient-to-b from-[#f0f6ff] to-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease }}>
            <h1 className="text-4xl md:text-6xl font-bold text-[#0f172a] tracking-tight mb-6 leading-tight">
              {t('limpiezas.h1')}
            </h1>
            <p className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto mb-10 leading-relaxed">
              {t('limpiezas.subtitle')}
            </p>
            <button type="button" onClick={openSignup} className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#1a3a8f] text-white font-semibold text-base hover:shadow-[0_8px_30px_rgba(26,58,143,0.3)] hover:-translate-y-0.5 transition-all duration-300"
            >
              {t('common.cta_start')}
              <ArrowRight className="w-4 h-4" />
            </button>
            <p className="text-sm text-slate-400 mt-3">{t('common.no_card')}</p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 px-6 md:px-12 lg:px-20 bg-[#f8fafc]">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#1a3a8f] mb-4">{t('limpiezas.sol_eyebrow')}</p>
          <h2 className="text-3xl md:text-4xl font-bold text-[#0f172a] tracking-tight mb-10">
            {t('limpiezas.sol_h2')}
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {features.map((item, i) => (
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

      {/* FAQ */}
      <section className="py-20 px-6 md:px-12 lg:px-20">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-[#0f172a] tracking-tight mb-10">{t('common.faq_heading')}</h2>
          <div className="space-y-6">
            {faqs.map((f) => (
              <div key={f.q} className="bg-[#f8fafc] rounded-2xl border border-slate-100 p-6">
                <p className="font-bold text-[#0f172a] mb-2">{f.q}</p>
                <p className="text-slate-500 text-sm leading-relaxed">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <RelatedArticles articles={featureToArticles["limpiezas"]} />

      <section className="py-24 px-6 text-center" style={{ background: "linear-gradient(135deg, #0f1f5c 0%, #1a3a8f 100%)" }}>
        <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-6">
          {t('common.start_free')}
        </h2>
        <p className="text-white/60 text-lg mb-10 max-w-lg mx-auto">{t('common.no_card_no_perm')}</p>
        <button type="button" onClick={openSignup} className="inline-flex items-center gap-3 px-10 py-4 rounded-full bg-white text-[#0f1f5c] font-semibold text-base hover:shadow-[0_8px_40px_rgba(255,255,255,0.25)] hover:-translate-y-0.5 transition-all duration-300"
        >
          {t('common.cta_start')}
          <ArrowRight className="w-4 h-4" />
        </button>
      </section>
    </PageShell>
  );
}
