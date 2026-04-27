import { motion } from 'framer-motion';
import { Clock, ArrowRight } from 'lucide-react';
import { blogPosts } from '@/lib/blog';
import PageShell from '@/components/PageShell';
import { breadcrumbSchema } from '@/lib/seo/schemas';

const ease = [0.22, 1, 0.36, 1] as const;

const categories = [
  {
    label: 'Legal y compliance',
    description: 'SES, NRUA, taxa turística, policía. Todo lo que la ley exige, explicado sin jerga.',
    color: 'bg-[#eff6ff] text-[#1a3a8f]',
    slugs: [
      'ses-hospedajes-guia-completa-2026',
      'ses-hospedajes-un-solo-apartamento',
      'ses-nrua-taxa-turistica-guia',
      'sanciones-por-no-cumplir-registro-viajeros',
      'registro-viajeros-mossos-esquadra-cataluna',
      'checkin-digital-comparativa-espana',
    ],
  },
  {
    label: 'Herramientas y stack',
    description: 'Qué herramientas necesitas, cuáles puedes eliminar y cuánto cuestan realmente.',
    color: 'bg-[#faf5ff] text-[#7c3aed]',
    slugs: [
      'cuanto-cuesta-gestionar-piso-turistico',
      'stack-completo-propietario-airbnb',
      'channel-manager-alquiler-vacacional-guia',
      'pms-apartamentos-turisticos-mejores-2026',
      'hostify-vs-lodgify-vs-smoobu-comparativa',
    ],
  },
  {
    label: 'Operativa y gestión',
    description: 'Check-ins, limpiezas, incidencias. Cómo hacer que todo funcione sin estar pendiente.',
    color: 'bg-[#f0fdf4] text-[#16a34a]',
    slugs: [
      'gestor-pequeno-5-apps-una-app',
      'coordinacion-limpiezas-excel-sistema',
      'pasar-3-a-10-apartamentos-sin-colapsar',
      '5-horas-semana-recuperar-apartamento-turistico',
      'huesped-no-responde-checkin-online',
    ],
  },
  {
    label: 'Automatización y IA',
    description: 'Mensajes, precios y respuestas que se gestionan solos. Sin perder el tono humano.',
    color: 'bg-[#fff7f0] text-[#ea580c]',
    slugs: [
      'automatizar-alquiler-vacacional-con-ia',
      'responder-mensajes-airbnb-automaticamente',
      'whatsapp-business-alquiler-vacacional',
      'precios-dinamicos-airbnb-booking',
    ],
  },
];

const featuredSlug = 'ses-hospedajes-guia-completa-2026';

export default function BlogIndex() {
  const featured = blogPosts.find((p) => p.slug === featuredSlug);

  return (
    <PageShell
      title="Blog Hostly — Guías de gestión de apartamentos turísticos"
      description="Guías prácticas, comparativas y análisis sobre la gestión de apartamentos turísticos en España. Compliance, herramientas, operativa y más."
      path="/blog"
      schemas={[
        breadcrumbSchema([
          { name: 'Hostly', url: '/' },
          { name: 'Blog', url: '/blog' },
        ]),
      ]}
    >
      {/* Hero */}
      <section className="pt-32 pb-20 px-6 md:px-12 lg:px-20 bg-gradient-to-b from-[#f0f6ff] to-white">
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease }}>
            <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#1a3a8f] mb-5">Blog · Recursos</p>
            <h1 className="text-4xl md:text-6xl font-bold text-[#0f172a] tracking-tight leading-[1.05] mb-6">
              Todo lo que implica<br className="hidden md:block" /> tener un piso turístico.
            </h1>
            <p className="text-lg md:text-xl text-slate-500 max-w-2xl leading-relaxed mb-10">
              {blogPosts.length} guías escritas para propietarios y gestores reales.
              Sin lenguaje corporativo. Sin fluff. Solo lo que necesitas saber.
            </p>
            {/* Stats */}
            <div className="flex flex-wrap gap-6">
              {[
                { num: `${blogPosts.length}`, label: 'guías publicadas' },
                { num: '4', label: 'categorías' },
                { num: '2026', label: 'actualizado' },
              ].map((s) => (
                <div key={s.label} className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-[#0f172a]">{s.num}</span>
                  <span className="text-sm text-slate-400">{s.label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Article destacat */}
      {featured && (
        <section className="py-12 px-6 md:px-12 lg:px-20 bg-white border-b border-slate-100">
          <div className="max-w-5xl mx-auto">
            <p className="text-xs font-bold uppercase tracking-[0.15em] text-slate-400 mb-6">Artículo destacado</p>
            <motion.a
              href={`/blog/${featured.slug}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, ease }}
              className="group grid md:grid-cols-[1fr_auto] gap-8 p-8 rounded-3xl border border-slate-100 bg-gradient-to-br from-[#f8fafc] to-white hover:border-[#1a3a8f]/20 hover:shadow-lg transition-all duration-300"
            >
              <div>
                <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#eff6ff] text-[#1a3a8f] mb-4">
                  Legal y compliance
                </span>
                <h2 className="text-2xl md:text-3xl font-bold text-[#0f172a] group-hover:text-[#1a3a8f] transition-colors tracking-tight leading-snug mb-3">
                  {featured.title}
                </h2>
                <p className="text-slate-500 leading-relaxed mb-5 max-w-xl">{featured.description}</p>
                <span className="inline-flex items-center gap-2 text-sm font-semibold text-[#1a3a8f]">
                  Leer guía completa <ArrowRight className="w-4 h-4" />
                </span>
              </div>
              <div className="flex flex-col items-end justify-center gap-2 text-sm text-slate-400 whitespace-nowrap">
                <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> {featured.readingTime} min</span>
              </div>
            </motion.a>
          </div>
        </section>
      )}

      {/* Articles per categoria */}
      <section className="py-16 px-6 md:px-12 lg:px-20">
        <div className="max-w-5xl mx-auto space-y-20">
          {categories.map((cat, ci) => {
            const posts = cat.slugs.map((s) => blogPosts.find((p) => p.slug === s)).filter(Boolean);
            if (!posts.length) return null;
            return (
              <motion.div
                key={cat.label}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: ci * 0.05, ease }}
              >
                {/* Category header */}
                <div className="flex items-start justify-between mb-8 gap-6">
                  <div>
                    <span className={`inline-flex items-center text-[10px] font-bold uppercase tracking-[0.15em] px-2.5 py-1 rounded-full mb-3 ${cat.color}`}>
                      {cat.label}
                    </span>
                    <p className="text-sm text-slate-500 max-w-sm">{cat.description}</p>
                  </div>
                </div>

                {/* Grid d'articles */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {posts.map((post, pi) => (
                    <motion.a
                      key={post!.slug}
                      href={`/blog/${post!.slug}`}
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: pi * 0.06, ease }}
                      className="group flex flex-col gap-3 p-5 rounded-2xl border border-slate-100 bg-white hover:border-[#1a3a8f]/25 hover:shadow-[0_8px_32px_rgba(26,58,143,0.08)] transition-all duration-250"
                    >
                      <h3 className="text-sm font-bold text-[#0f172a] group-hover:text-[#1a3a8f] transition-colors leading-snug">
                        {post!.title}
                      </h3>
                      <p className="text-xs text-slate-500 leading-relaxed line-clamp-3 flex-1">
                        {post!.description}
                      </p>
                      <div className="flex items-center justify-between pt-2 border-t border-slate-50">
                        <span className="flex items-center gap-1 text-[11px] text-slate-400">
                          <Clock className="w-3 h-3" /> {post!.readingTime} min
                        </span>
                        <ArrowRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-[#1a3a8f] transition-colors" />
                      </div>
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* CTA final */}
      <section className="py-20 px-6 md:px-12 lg:px-20 bg-[#f8fafc] border-t border-slate-100">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#1a3a8f] mb-4">Hostly</p>
          <h2 className="text-3xl md:text-4xl font-bold text-[#0f172a] tracking-tight mb-4">
            La app que simplifica todo lo que lees aquí.
          </h2>
          <p className="text-slate-500 text-lg mb-8 max-w-xl mx-auto">
            SES, NRUA, mensajes, limpiezas y precios. Todo dentro de una sola app. 14 días gratis, sin tarjeta.
          </p>
          <a
            href="https://app.hostlylabs.com/signup"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#1a3a8f] text-white font-semibold hover:shadow-[0_8px_30px_rgba(26,58,143,0.3)] hover:-translate-y-0.5 transition-all duration-300"
          >
            Empezar gratis 14 días <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </section>
    </PageShell>
  );
}
