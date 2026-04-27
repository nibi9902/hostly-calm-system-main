import { motion } from 'framer-motion';
import { ArrowRight, Check, X, Minus } from 'lucide-react';
import { uniqueCompetitors } from '@/lib/data/competitors';
import PageShell from '@/components/PageShell';
import { breadcrumbSchema } from '@/lib/seo/schemas';

type Cell = true | false | 'partial';

interface BenchmarkRow {
  feature: string;
  hostly: Cell;
  hostify: Cell;
  icnea: Cell;
  hospitable: Cell;
  smoobu: Cell;
  lodgify: Cell;
  guesty: Cell;
}

const benchmarkRows: BenchmarkRow[] = [
  { feature: "IA en WhatsApp nativa",          hostly: true,    hostify: 'partial', icnea: false,    hospitable: 'partial', smoobu: false,    lodgify: false,    guesty: false },
  { feature: "Check-in y SES gratis",          hostly: true,    hostify: false,     icnea: 'partial', hospitable: false,     smoobu: false,    lodgify: false,    guesty: false },
  { feature: "Compliance SES/NRUA nativo",     hostly: true,    hostify: true,      icnea: true,     hospitable: false,     smoobu: false,    lodgify: false,    guesty: false },
  { feature: "Precios dinámicos incluidos",    hostly: true,    hostify: false,     icnea: false,    hospitable: true,      smoobu: 'partial', lodgify: true,    guesty: true  },
  { feature: "Channel manager",               hostly: true,    hostify: true,      icnea: true,     hospitable: true,      smoobu: true,     lodgify: true,     guesty: true  },
  { feature: "Coordinación de limpiezas",     hostly: true,    hostify: true,      icnea: true,     hospitable: true,      smoobu: true,     lodgify: 'partial', guesty: true },
  { feature: "Soporte en español y catalán",  hostly: true,    hostify: false,     icnea: true,     hospitable: false,     smoobu: false,    lodgify: false,    guesty: false },
  { feature: "Precio desde 1 apartamento",    hostly: true,    hostify: true,      icnea: false,    hospitable: true,      smoobu: true,     lodgify: 'partial', guesty: false },
  { feature: "Self-serve sin demo obligatoria", hostly: true,   hostify: false,     icnea: false,    hospitable: true,      smoobu: true,     lodgify: true,     guesty: false },
  { feature: "Precio público transparente",   hostly: true,    hostify: true,      icnea: false,    hospitable: true,      smoobu: true,     lodgify: true,     guesty: false },
];

const competitors = ['Hostly', 'Hostify', 'Icnea', 'Hospitable', 'Smoobu', 'Lodgify', 'Guesty'];

function CellIcon({ value, isHostly }: { value: Cell; isHostly: boolean }) {
  if (value === true) return <Check className={`w-4 h-4 mx-auto ${isHostly ? 'text-[#16a34a]' : 'text-slate-400'}`} />;
  if (value === false) return <X className="w-4 h-4 mx-auto text-slate-200" />;
  return <Minus className="w-4 h-4 mx-auto text-amber-400" />;
}

const ease = [0.22, 1, 0.36, 1] as const;

export default function AlternativasIndex() {
  return (
    <PageShell
      title="Alternativas a los PMS más populares | Hostly"
      description="Compara Hostly con Icnea, Hostify, Lodgify, Smoobu, Hospitable, Guesty y Avantio. La alternativa ibérica con IA, check-in gratis y compliance español."
      path="/alternativas"
      schemas={[
        breadcrumbSchema([
          { name: 'Hostly', url: '/' },
          { name: 'Alternativas', url: '/alternativas' },
        ]),
      ]}
    >
      <section className="pt-32 pb-16 px-6 md:px-12 lg:px-20 bg-gradient-to-b from-[#f8fafc] to-white">
        <div className="max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease }}>
            <p className="text-xs font-bold uppercase tracking-[0.15em] text-slate-400 mb-4">Comparativas</p>
            <h1 className="text-4xl md:text-5xl font-bold text-[#0f172a] tracking-tight mb-5 leading-tight">
              Hostly vs los demás PMS
            </h1>
            <p className="text-lg text-slate-500 max-w-2xl leading-relaxed">
              Análisis honestos de los principales PMS del mercado para el perfil de propietario pequeño y gestor ibérico.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Taula mestra benchmark */}
      <section className="py-16 px-6 md:px-12 lg:px-20 bg-[#f8fafc] border-y border-slate-100">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, ease }}
          >
            <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#1a3a8f] mb-3">
              Comparativa completa
            </p>
            <h2 className="text-2xl md:text-3xl font-bold text-[#0f172a] tracking-tight mb-8">
              Hostly es el único con las 10 casillas. ✓
            </h2>

            <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white">
              <table className="w-full text-sm min-w-[640px]">
                <thead>
                  <tr className="border-b border-slate-100">
                    <th className="text-left p-4 font-semibold text-[#0f172a] w-48">Funcionalidad</th>
                    {competitors.map((name) => (
                      <th
                        key={name}
                        className={`p-4 text-center font-bold text-xs ${name === 'Hostly' ? 'bg-[#eff6ff] text-[#1a3a8f]' : 'text-slate-400'}`}
                      >
                        {name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {benchmarkRows.map((row, i) => (
                    <tr key={row.feature} className={`border-t border-slate-50 ${i % 2 === 1 ? 'bg-slate-50/50' : ''}`}>
                      <td className="p-4 text-slate-700 font-medium text-xs">{row.feature}</td>
                      {(['hostly', 'hostify', 'icnea', 'hospitable', 'smoobu', 'lodgify', 'guesty'] as const).map((key) => (
                        <td
                          key={key}
                          className={`p-4 text-center ${key === 'hostly' ? 'bg-[#eff6ff]/60' : ''}`}
                        >
                          <CellIcon value={row[key]} isHostly={key === 'hostly'} />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="border-t border-slate-200 bg-[#f0fdf4]">
                    <td className="p-4 text-xs font-bold text-[#166534]">Total ✓</td>
                    {['hostly', 'hostify', 'icnea', 'hospitable', 'smoobu', 'lodgify', 'guesty'].map((key) => {
                      const count = benchmarkRows.filter((r) => (r as Record<string, Cell>)[key] === true).length;
                      return (
                        <td key={key} className={`p-4 text-center text-xs font-bold ${key === 'hostly' ? 'text-[#16a34a] bg-[#eff6ff]/60' : 'text-slate-400'}`}>
                          {count}/{benchmarkRows.length}
                        </td>
                      );
                    })}
                  </tr>
                </tfoot>
              </table>
            </div>
            <p className="text-xs text-slate-400 mt-3">
              ✓ completo &nbsp;·&nbsp; ⚠ parcial o via tercers &nbsp;·&nbsp; ✗ no disponible. Dades verificades abril 2026.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 px-6 md:px-12 lg:px-20">
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-5">
          {uniqueCompetitors.map((c, i) => (
            <motion.a
              key={c.slug}
              href={`/alternativas/${c.slug}`}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.06, ease }}
              className="group flex items-center justify-between p-6 rounded-2xl border border-slate-100 bg-white hover:border-[#1a3a8f]/20 hover:shadow-md transition-all duration-200"
            >
              <div>
                <p className="font-bold text-[#0f172a] group-hover:text-[#1a3a8f] transition-colors mb-1">Hostly vs {c.name}</p>
                <p className="text-sm text-slate-500 line-clamp-1">{c.target}</p>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-[#1a3a8f] shrink-0 transition-colors ml-4" />
            </motion.a>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
