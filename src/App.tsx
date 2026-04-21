import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

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
const BlogBridge = lazy(() => import("./pages/BlogBridge"));
const Demo = lazy(() => import("./pages/Demo"));

const queryClient = new QueryClient();

// Spinner minimalista mentre carrega el chunk
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="w-8 h-8 rounded-full border-2 border-slate-200 border-t-[#1a3a8f] animate-spin" />
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Index />} />

            {/* Funciones */}
            <Route path="/funciones/check-in" element={<CheckIn />} />
            <Route path="/funciones/mensajes" element={<Mensajes />} />
            <Route path="/funciones/reservas" element={<Reservas />} />
            <Route path="/funciones/limpiezas" element={<Limpiezas />} />
            <Route path="/funciones/pagos" element={<Pagos />} />
            <Route path="/funciones/precios" element={<Precios />} />

            {/* Super Guia */}
            <Route path="/guia" element={<Guia />} />

            {/* Comparatives */}
            <Route path="/comparativa/chekin" element={<ComparativaChekin />} />

            {/* Landings per persona */}
            <Route path="/propietarios" element={<Propietarios />} />
            <Route path="/gestores-pequenos" element={<GestoresPequenos />} />
            <Route path="/segunda-residencia" element={<SegundaResidencia />} />
            <Route path="/hereus" element={<Hereus />} />

            {/* Blog */}
            <Route path="/blog" element={<BlogIndex />} />
            <Route path="/blog/:slug" element={<BlogArticle />} />

            {/* Alternativas */}
            <Route path="/alternativas" element={<AlternativasIndex />} />
            <Route path="/alternativas/:slug" element={<AlternativaRoute />} />

            {/* Rutes encara no migrades de hostlylabs-web */}
            <Route path="/funcionalidades/*" element={<BlogBridge />} />
            <Route path="/funcionalidades" element={<BlogBridge />} />
            <Route path="/casos-de-uso/*" element={<BlogBridge />} />
            <Route path="/casos-de-uso" element={<BlogBridge />} />
            <Route path="/integraciones/*" element={<BlogBridge />} />
            <Route path="/integraciones" element={<BlogBridge />} />
            <Route path="/precios" element={<BlogBridge />} />
            <Route path="/sobre-hostly" element={<BlogBridge />} />
            <Route path="/demo" element={<Demo />} />
            <Route path="/para-asesorias-inmobiliarias" element={<BlogBridge />} />
            <Route path="/para-empresas-de-limpieza" element={<BlogBridge />} />
            <Route path="/software-apartamentos-turisticos" element={<BlogBridge />} />
            <Route path="/pms-con-ia" element={<BlogBridge />} />
            <Route path="/whatsapp-airbnb" element={<BlogBridge />} />

            {/* Catch-all */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
