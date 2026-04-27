import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import type { RelatedArticle } from "@/lib/data/relatedContent";

interface Props {
  articles: RelatedArticle[];
}

export default function RelatedArticles({ articles }: Props) {
  if (!articles.length) return null;

  return (
    <section className="py-16 px-6 md:px-12 lg:px-20 bg-[#f8fafc] border-t border-slate-100">
      <div className="max-w-4xl mx-auto">
        <p className="text-xs font-bold uppercase tracking-[0.15em] text-slate-400 mb-6">
          Guías relacionadas
        </p>
        <div className="grid sm:grid-cols-3 gap-4">
          {articles.map((a, i) => (
            <motion.a
              key={a.slug}
              href={`/blog/${a.slug}`}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
              className="group flex items-start justify-between gap-3 p-4 rounded-2xl border border-slate-100 bg-white hover:border-[#1a3a8f]/20 hover:shadow-sm transition-all duration-200"
            >
              <p className="text-sm font-medium text-[#0f172a] group-hover:text-[#1a3a8f] transition-colors leading-snug">
                {a.title}
              </p>
              <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-[#1a3a8f] flex-shrink-0 mt-0.5 transition-colors" />
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
