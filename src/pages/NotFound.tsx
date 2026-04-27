import { Helmet } from "react-helmet-async";
import { LangLink } from "@/i18n/LangLink";
import { ArrowLeft, Home } from "lucide-react";

const NotFound = () => {
  return (
    <>
      <Helmet>
        <title>Página no encontrada · Hostly</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="flex min-h-screen items-center justify-center bg-background px-6 py-12">
        <div className="text-center max-w-md mx-auto">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary/70 mb-4">
            Error 404
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground tracking-tight mb-4">
            Aquí no hay nada.
          </h1>
          <p className="text-muted-foreground text-base leading-relaxed mb-8">
            La página que buscas no existe o se ha movido. Vuelve al inicio o explora la web desde ahí.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <LangLink
              to="/"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2"
            >
              <Home className="w-4 h-4" />
              Volver al inicio
            </LangLink>
            <button
              type="button"
              onClick={() => window.history.back()}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-border bg-background text-foreground font-semibold text-sm hover:bg-muted transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
            >
              <ArrowLeft className="w-4 h-4" />
              Página anterior
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFound;
