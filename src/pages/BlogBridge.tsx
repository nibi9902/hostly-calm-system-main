import { useLocation } from "react-router-dom";
import { ArrowRight, ExternalLink } from "lucide-react";
import PageShell from "@/components/PageShell";

const BLOG_PORT = 3000;

const sectionLabels: Record<string, string> = {
  "/blog": "Blog",
  "/alternativas": "Alternativas",
  "/funcionalidades": "Funcionalidades",
  "/casos-de-uso": "Casos de uso",
  "/integraciones": "Integraciones",
  "/precios": "Precios",
  "/sobre-hostly": "Sobre Hostly",
  "/demo": "Demo",
  "/para-asesorias-inmobiliarias": "Para asesorías",
  "/para-empresas-de-limpieza": "Para empresas de limpieza",
  "/software-apartamentos-turisticos": "Software para apartamentos",
  "/pms-con-ia": "PMS con IA",
  "/whatsapp-airbnb": "WhatsApp para Airbnb",
};

function getSection(pathname: string): string {
  const match = Object.keys(sectionLabels).find((k) => pathname.startsWith(k));
  return match ? sectionLabels[match] : "Esta sección";
}

export default function BlogBridge() {
  const { pathname } = useLocation();
  const section = getSection(pathname);
  const blogUrl = `http://localhost:${BLOG_PORT}${pathname}`;
  const prodUrl = `https://hostlylabs.com${pathname}`;

  return (
    <PageShell
      title={`${section} | Hostly`}
      description={`${section} — disponible en el sitio completo de Hostly.`}
    >
      <section className="min-h-[70vh] flex items-center justify-center px-6 py-32">
        <div className="max-w-lg text-center">

          {/* Icon */}
          <div className="w-16 h-16 rounded-2xl bg-[#eff6ff] flex items-center justify-center mx-auto mb-6">
            <ExternalLink className="w-7 h-7 text-[#1a3a8f]" />
          </div>

          <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#1a3a8f] mb-3">
            {section}
          </p>
          <h1 className="text-3xl font-bold text-[#0f172a] tracking-tight mb-4">
            Esta página está en el blog completo
          </h1>
          <p className="text-slate-500 leading-relaxed mb-8">
            <code className="text-sm bg-slate-100 px-2 py-0.5 rounded font-mono text-slate-700">{pathname}</code>
            {" "}forma parte del proyecto{" "}
            <span className="font-medium text-slate-700">hostlylabs-web</span> (Next.js). En producción estará disponible en{" "}
            <a href={prodUrl} className="text-[#1a3a8f] hover:underline font-medium">{prodUrl}</a>.
          </p>

          {/* Dev instructions */}
          <div className="bg-[#f8fafc] border border-slate-200 rounded-2xl p-5 text-left mb-8">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">Para verla en local</p>
            <p className="text-sm text-slate-600 mb-3">Abre una terminal y arranca el servidor del blog:</p>
            <div className="bg-slate-900 rounded-xl px-4 py-3 font-mono text-sm text-green-400">
              <span className="text-slate-500">cd </span>WEB/hostlylabs-web<br />
              <span className="text-slate-500">&& </span>npm run dev
            </div>
            <p className="text-xs text-slate-400 mt-3">
              Después visita:{" "}
              <a href={blogUrl} className="text-[#1a3a8f] hover:underline font-mono">{blogUrl}</a>
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="/"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#1a3a8f] text-white font-semibold text-sm hover:-translate-y-0.5 transition-all duration-300"
            >
              Volver a la home
            </a>
            <a
              href="/guia"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-slate-200 text-slate-700 font-semibold text-sm hover:bg-slate-50 transition-all duration-300"
            >
              Ver la Super Guía
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
