import { lazy, Suspense, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, Outlet, useParams, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { SUPPORTED_LANGS, DEFAULT_LANG, type Lang } from "./i18n/config";

// Crítiques (part del first-paint)
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

// Lazy — només es carreguen quan l'usuari hi navega
const CheckIn = lazy(() => import("./pages/funciones/CheckIn"));
const Mensajes = lazy(() => import("./pages/funciones/Mensajes"));
const Reservas = lazy(() => import("./pages/funciones/Reservas"));
const Limpiezas = lazy(() => import("./pages/funciones/Limpiezas"));
const Pagos = lazy(() => import("./pages/funciones/Pagos"));
const Precios = lazy(() => import("./pages/funciones/Precios"));
const Guia = lazy(() => import("./pages/Guia"));
const ComparativaChekin = lazy(() => import("./pages/comparativa/Chekin"));
const Propietarios = lazy(() => import("./pages/personas/Propietarios"));
const GestoresPequenos = lazy(() => import("./pages/personas/GestoresPequenos"));
const SegundaResidencia = lazy(() => import("./pages/personas/SegundaResidencia"));
const Hereus = lazy(() => import("./pages/personas/Hereus"));
const BlogIndex = lazy(() => import("./pages/blog/index"));
const BlogArticle = lazy(() => import("./pages/blog/Article"));
const AlternativasIndex = lazy(() => import("./pages/alternativas/index"));
const AlternativaRoute = lazy(() => import("./pages/alternativas/AlternativaRoute"));
const FuncionalidadesIndex = lazy(() => import("./pages/funcionalidades/index"));
const FeatureRoute = lazy(() => import("./pages/funcionalidades/FeatureRoute"));
const BlogBridge = lazy(() => import("./pages/BlogBridge"));
const PreciosPage = lazy(() => import("./pages/Precios"));
const Demo = lazy(() => import("./pages/Demo"));
const SobreHostly = lazy(() => import("./pages/SobreHostly"));
const Privacidad = lazy(() => import("./pages/legal/Privacidad"));
const Cookies = lazy(() => import("./pages/legal/Cookies"));
const Terminos = lazy(() => import("./pages/legal/Terminos"));
const AvisoLegal = lazy(() => import("./pages/legal/AvisoLegal"));

const queryClient = new QueryClient();

const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="w-8 h-8 rounded-full border-2 border-slate-200 border-t-[#1a3a8f] animate-spin" />
  </div>
);

/* ─── Detector inicial d'idioma per redirects arrel ─── */
function detectInitialLang(): Lang {
  if (typeof window === 'undefined') return DEFAULT_LANG;
  // 1. localStorage
  try {
    const stored = localStorage.getItem('hostly_lang');
    if (stored && (SUPPORTED_LANGS as readonly string[]).includes(stored)) return stored as Lang;
  } catch { /* ignora */ }
  // 2. navigator
  const nav = (navigator.language || 'es').toLowerCase();
  if (nav.startsWith('ca')) return 'ca';
  if (nav.startsWith('es')) return 'es';
  return DEFAULT_LANG;
}

/* ─── Layout que valida :lang i sincronitza i18n ─── */
function LangLayout() {
  const { lang } = useParams<{ lang: string }>();
  const { i18n } = useTranslation();
  const isValid = lang && (SUPPORTED_LANGS as readonly string[]).includes(lang);

  useEffect(() => {
    if (isValid && i18n.language !== lang) {
      i18n.changeLanguage(lang);
      try { localStorage.setItem('hostly_lang', lang!); } catch { /* ignora */ }
      document.documentElement.lang = lang === 'ca' ? 'ca-ES' : 'es-ES';
    }
  }, [lang, isValid, i18n]);

  if (!isValid) return <Navigate to={`/${detectInitialLang()}`} replace />;
  return <Outlet />;
}

/* ─── Redirect per rutes legacy (sense prefix d'idioma) ─── */
function LegacyRedirect() {
  const location = useLocation();
  const path = location.pathname + location.search + location.hash;
  return <Navigate to={`/${detectInitialLang()}${path}`} replace />;
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            {/* Arrel → idioma detectat */}
            <Route path="/" element={<Navigate to={`/${detectInitialLang()}`} replace />} />

            {/* Rutes amb prefix d'idioma */}
            <Route path="/:lang" element={<LangLayout />}>
              <Route index element={<Index />} />

              {/* Funciones */}
              <Route path="funciones/check-in" element={<CheckIn />} />
              <Route path="funciones/mensajes" element={<Mensajes />} />
              <Route path="funciones/reservas" element={<Reservas />} />
              <Route path="funciones/limpiezas" element={<Limpiezas />} />
              <Route path="funciones/pagos" element={<Pagos />} />
              <Route path="funciones/precios" element={<Precios />} />

              {/* Super Guia */}
              <Route path="guia" element={<Guia />} />

              {/* Comparatives */}
              <Route path="comparativa/chekin" element={<ComparativaChekin />} />

              {/* Landings per persona */}
              <Route path="propietarios" element={<Propietarios />} />
              <Route path="gestores-pequenos" element={<GestoresPequenos />} />
              <Route path="segunda-residencia" element={<SegundaResidencia />} />
              <Route path="hereus" element={<Hereus />} />

              {/* Blog */}
              <Route path="blog" element={<BlogIndex />} />
              <Route path="blog/:slug" element={<BlogArticle />} />

              {/* Alternativas */}
              <Route path="alternativas" element={<AlternativasIndex />} />
              <Route path="alternativas/:slug" element={<AlternativaRoute />} />

              {/* Funcionalidades */}
              <Route path="funcionalidades" element={<FuncionalidadesIndex />} />
              <Route path="funcionalidades/:slug" element={<FeatureRoute />} />

              {/* Rutes encara no migrades */}
              <Route path="casos-de-uso/*" element={<BlogBridge />} />
              <Route path="casos-de-uso" element={<BlogBridge />} />
              <Route path="integraciones/*" element={<BlogBridge />} />
              <Route path="integraciones" element={<BlogBridge />} />
              <Route path="precios" element={<PreciosPage />} />
              <Route path="sobre-hostly" element={<SobreHostly />} />
              <Route path="privacidad" element={<Privacidad />} />
              <Route path="cookies" element={<Cookies />} />
              <Route path="terminos" element={<Terminos />} />
              <Route path="aviso-legal" element={<AvisoLegal />} />
              <Route path="demo" element={<Demo />} />
              <Route path="para-asesorias-inmobiliarias" element={<BlogBridge />} />
              <Route path="para-empresas-de-limpieza" element={<BlogBridge />} />
              <Route path="software-apartamentos-turisticos" element={<BlogBridge />} />
              <Route path="pms-con-ia" element={<BlogBridge />} />
              <Route path="whatsapp-airbnb" element={<BlogBridge />} />

              {/* Catch-all dins idioma vàlid */}
              <Route path="*" element={<NotFound />} />
            </Route>

            {/* Rutes legacy sense prefix → redirect a /es/path */}
            <Route path="*" element={<LegacyRedirect />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
