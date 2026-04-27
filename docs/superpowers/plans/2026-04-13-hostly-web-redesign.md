# Hostly Web Redesign — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Portar la landing page de Hostly a producció — cohesionada, professional i escanejable en 3 segons, estil Airbnb clar i modern.

**Architecture:** Refactor dels components React existents a `src/components/`. El Hero cinematogràfic es manté intacte. La resta de seccions es redissenyen o refinen per tenir una paleta unificada (blanc + blau `#1a3a8f`). Captures reals de l'app s'obtenen via Playwright i es desen a `public/assets/app-screenshots/`. L'ordre de seccions a `Index.tsx` es reorganitza seguint el flux narratiu aprovat.

**Tech Stack:** React 18 · TypeScript · Tailwind CSS · Framer Motion · shadcn/ui · Playwright MCP (captures) · Vite

---

## File Map

| Fitxer | Acció | Responsabilitat |
|--------|-------|-----------------|
| `src/index.css` | Modify | Afegir tokens CSS Hostly (`--hostly-*`) |
| `src/pages/Index.tsx` | Modify | Reordenar seccions, afegir FeaturesBlock |
| `src/components/FinalCTA.tsx` | Modify | Arreglar animació scroll (bug opacity=0) |
| `src/components/CinematicHero.tsx` | — no existeix com a component directe | — |
| `src/components/ui/cinematic-hero.tsx` | Modify | Afegir stats + partner badges |
| `src/components/PainBlock.tsx` | Modify | Afegir fons subtil, fixar `style2` bug |
| `src/components/ui/glass-cards.tsx` | Replace | Substituir per FeaturesBlock net |
| `src/components/FeaturesBlock.tsx` | Create | 3 cards clean + screenshots reals |
| `src/components/StepsBlock.tsx` | Modify | Afegir connectors visuals |
| `src/components/TestimonialBlock.tsx` | Modify | Avatars amb fotos (URL Unsplash) |
| `src/components/PricingBlock.tsx` | Modify | Refinar visual, destacar primer mes gratis |
| `src/components/Navbar.tsx` | Modify | Transició scroll transparent→blanc |
| `src/components/QuizModal.tsx` | Modify | Afegir pas final post-quiz amb CTA trucada |
| `public/sitemap.xml` | Create | Sitemap per a SEO |
| `public/robots.txt` | Create | robots.txt |
| `index.html` | Modify | Meta tags, OG, canonical, schema markup |
| `public/assets/app-screenshots/` | Create | Captures reals de l'app via Playwright |

---

## Task 1: Tokens CSS Hostly — Unificar sistema de color

**Files:**
- Modify: `src/index.css` (línies 8-64)

- [ ] **Step 1: Afegir tokens Hostly a `:root` dins el bloc `@layer base`**

  Afegir just després de la línia `--sidebar-ring: 229 65% 52%;` i abans del tancament `}`:

  ```css
  /* ── Hostly Design Tokens ── */
  --hostly-primary: #1a3a8f;
  --hostly-primary-dark: #0f1f5c;
  --hostly-primary-light: #3b5fd9;
  --hostly-success: #22c55e;
  --hostly-bg: #ffffff;
  --hostly-bg-subtle: #f8fafc;
  --hostly-text: #0f172a;
  --hostly-text-muted: #64748b;
  --hostly-border: #e2e8f0;
  --hostly-radius-sm: 6px;
  --hostly-radius-md: 12px;
  --hostly-radius-lg: 20px;
  --hostly-radius-full: 999px;
  --hostly-shadow-sm: 0 1px 3px rgba(0,0,0,0.08);
  --hostly-shadow-md: 0 4px 16px rgba(0,0,0,0.10);
  --hostly-shadow-lg: 0 8px 40px rgba(0,0,0,0.12);
  ```

- [ ] **Step 2: Verificar que el servidor compila sense errors**

  Obre `http://localhost:57506` (o el port actiu) i comprova que no hi ha errors de compilació a la consola del navegador.

- [ ] **Step 3: Commit**

  ```bash
  cd "WEB/main-branch"
  git add src/index.css
  git commit -m "feat: add Hostly design tokens to CSS variables"
  ```

---

## Task 2: Capturar screenshots reals de l'app (Playwright)

**Files:**
- Create: `public/assets/app-screenshots/` (directori)
- Create: `public/assets/app-screenshots/checkin.png`
- Create: `public/assets/app-screenshots/finances.png`
- Create: `public/assets/app-screenshots/limpiezas.png`
- Create: `public/assets/app-screenshots/calendario.png`

- [ ] **Step 1: Crear el directori**

  ```bash
  mkdir -p "WEB/main-branch/public/assets/app-screenshots"
  ```

- [ ] **Step 2: Arrencar l'app si no està corrent**

  Arrencar `Hostly App (hostlylabs1.2)` al port 8081 si no està activa. Si cal, usar `preview_start` o `npm run dev -- --port 8081` a `APP/hostlylabs1.2-main/`.

- [ ] **Step 3: Demanar a l'usuari que es loguegi**

  Navega amb Playwright a `http://localhost:8080` (app existent o port actiu de l'app). Si requereix login, demanar a l'usuari que es loguegi al Chrome existent i després prendre les captures.

- [ ] **Step 4: Captures de pantalla — Dashboard/Calendari**

  Usar Playwright MCP:
  - Navegar a la vista de calendari/dashboard principal
  - `browser_take_screenshot` → desar a `public/assets/app-screenshots/calendario.png`

- [ ] **Step 5: Captures — Check-in / Reserves**

  - Navegar a la vista de check-ins o reserves
  - `browser_take_screenshot` → desar a `public/assets/app-screenshots/checkin.png`

- [ ] **Step 6: Captures — Finances**

  - Navegar a la vista de finances
  - `browser_take_screenshot` → desar a `public/assets/app-screenshots/finances.png`

- [ ] **Step 7: Captures — Neteges**

  - Navegar a la vista de neteges coordinades
  - `browser_take_screenshot` → desar a `public/assets/app-screenshots/limpiezas.png`

- [ ] **Step 8: Optimitzar imatges (WebP)**

  ```bash
  # Si tens cwebp instal·lat:
  for f in WEB/main-branch/public/assets/app-screenshots/*.png; do
    cwebp -q 85 "$f" -o "${f%.png}.webp"
  done
  # Si no: usar les .png directament
  ```

- [ ] **Step 9: Commit**

  ```bash
  cd "WEB/main-branch"
  git add public/assets/app-screenshots/
  git commit -m "feat: add real app screenshots for features section"
  ```

---

## Task 3: Arreglar FinalCTA (bug crític — secció buida)

**Files:**
- Modify: `src/components/FinalCTA.tsx`

**Diagnòstic:** El `motion.div` principal té `opacity` basada en `scrollYProgress` que comença a 0 i mai arriba a 1 perquè el scroll offset `["start 95%", "start 40%"]` no es compleix quan l'usuari ha scrollat fins al final. A més, cal afegir contingut: 2 botons + logos partners.

- [ ] **Step 1: Reescriure FinalCTA.tsx**

  ```tsx
  import { motion } from "framer-motion";
  import { ArrowRight, Play } from "lucide-react";

  interface FinalCTAProps {
    onOpenQuiz?: () => void;
  }

  const FinalCTA = ({ onOpenQuiz }: FinalCTAProps) => {
    return (
      <section
        id="cta-final"
        className="py-24 md:py-32 px-6 md:px-12 lg:px-20 relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #0f1f5c 0%, #1a3a8f 100%)" }}
      >
        {/* Dot texture */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: "radial-gradient(rgba(255,255,255,0.6) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
        {/* Radial glow */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(59,95,217,0.35) 0%, transparent 70%)",
          }}
        />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl mx-auto text-center relative z-10"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/40 mb-5">
            Para propietarios que quieren sistema, no caos
          </p>

          <h2 className="text-4xl md:text-6xl font-bold tracking-[-0.04em] leading-[1.0] mb-6 text-white">
            Empieza gratis hoy.
          </h2>

          <p className="text-lg md:text-xl text-white/60 mb-10 max-w-lg mx-auto leading-relaxed">
            Sin permanencia · Sin tarjeta el primer mes · Cancela cuando quieras
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
            <button
              onClick={onOpenQuiz}
              className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white text-[#0f1f5c] font-semibold text-base transition-all duration-300 hover:shadow-[0_8px_40px_rgba(255,255,255,0.25)] hover:-translate-y-0.5 active:scale-[0.98]"
            >
              Pruébalo gratis
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" />
            </button>
            <a
              href="#como-funciona"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-white/25 text-white/80 font-medium text-base transition-all duration-300 hover:border-white/50 hover:text-white"
            >
              <Play className="w-4 h-4 fill-current" />
              Ver demo (2 min)
            </a>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-white/35 text-sm mb-10">
            <span>💬 7.983 mensajes respondidos</span>
            <span>·</span>
            <span>🛡️ 4.271 registros policiales</span>
            <span>·</span>
            <span>🧹 3.548 limpiezas coordinadas</span>
          </div>

          {/* Partner logos */}
          <div className="flex items-center justify-center gap-2 text-white/30 text-xs font-medium uppercase tracking-widest">
            <span>Partner oficial de</span>
            <span className="text-white/50 font-semibold ml-1">Airbnb</span>
            <span>·</span>
            <span className="text-white/50 font-semibold">Booking.com</span>
            <span>·</span>
            <span className="text-white/50 font-semibold">Google</span>
          </div>
        </motion.div>
      </section>
    );
  };

  export default FinalCTA;
  ```

- [ ] **Step 2: Verificar al navegador**

  Scrollar fins al final de `http://localhost:57506` — la secció ha d'estar visible amb contingut, fons blau gradient i els dos botons.

- [ ] **Step 3: Commit**

  ```bash
  cd "WEB/main-branch"
  git add src/components/FinalCTA.tsx
  git commit -m "fix: FinalCTA section was empty due to scroll opacity bug — rewrite with visible content"
  ```

---

## Task 4: Crear FeaturesBlock (substituir GlassCards)

**Files:**
- Create: `src/components/FeaturesBlock.tsx`
- Modify: `src/pages/Index.tsx` (importar FeaturesBlock, treure GlassCards)

- [ ] **Step 1: Crear `src/components/FeaturesBlock.tsx`**

  ```tsx
  import { motion } from "framer-motion";
  import { Key, Brush, Shield } from "lucide-react";

  // Substituir els paths quan les captures reals estiguin disponibles
  // Per ara usar captures existents de @/assets/ o placeholders
  const features = [
    {
      icon: Key,
      label: "Check-in automático",
      title: "El huésped entra solo. Tú ni te enteras.",
      body: "Código de acceso único generado y enviado automáticamente. Sin entregar llaves, sin quedar en persona.",
      screenshot: "/assets/app-screenshots/checkin.png",
      screenshotAlt: "Vista check-in app Hostly",
    },
    {
      icon: Brush,
      label: "Limpiezas coordinadas",
      title: "Tu limpiadora recibe el aviso sola.",
      body: "Al hacer checkout, el sistema asigna y notifica a tu equipo de limpieza automáticamente. Sin llamadas.",
      screenshot: "/assets/app-screenshots/limpiezas.png",
      screenshotAlt: "Vista limpiezas app Hostly",
    },
    {
      icon: Shield,
      label: "Registro policial",
      title: "100% legal y automático. Sin intervención.",
      body: "Los datos del viajero se envían solos a las autoridades. Cumple con la normativa sin pensar en ello.",
      screenshot: "/assets/app-screenshots/checkin.png",
      screenshotAlt: "Vista registro policial app Hostly",
    },
  ];

  const FeaturesBlock = () => (
    <section id="features" className="py-20 md:py-28 px-6 md:px-12 lg:px-20 bg-[#f8fafc]">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-14"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#1a3a8f] mb-3">
            Todo automático
          </p>
          <h2 className="text-3xl md:text-5xl font-bold text-[#0f172a] tracking-tight leading-tight">
            Lo que antes te robaba horas,<br className="hidden md:block" /> ahora pasa solo.
          </h2>
        </motion.div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <motion.div
                key={f.label}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="bg-white rounded-2xl border border-[#e2e8f0] overflow-hidden hover:shadow-[0_8px_32px_rgba(0,0,0,0.08)] transition-shadow duration-300"
              >
                {/* Screenshot */}
                <div className="w-full aspect-[16/10] overflow-hidden bg-[#f1f5f9]">
                  <img
                    src={f.screenshot}
                    alt={f.screenshotAlt}
                    loading="lazy"
                    className="w-full h-full object-cover object-top"
                    onError={(e) => {
                      // Fallback si la imatge no existeix
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 rounded-lg bg-[#eff6ff] flex items-center justify-center">
                      <Icon className="w-4 h-4 text-[#1a3a8f]" />
                    </div>
                    <span className="text-xs font-semibold uppercase tracking-widest text-[#1a3a8f]">
                      {f.label}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-[#0f172a] mb-2 leading-snug">
                    {f.title}
                  </h3>
                  <p className="text-sm text-[#64748b] leading-relaxed">
                    {f.body}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );

  export default FeaturesBlock;
  ```

- [ ] **Step 2: Actualitzar `src/pages/Index.tsx`**

  Substituir la importació de `GlassCards` per `FeaturesBlock`:

  ```tsx
  // Treure:
  import { GlassCards } from "@/components/ui/glass-cards";
  // Afegir:
  import FeaturesBlock from "@/components/FeaturesBlock";
  ```

  I al JSX, substituir `<GlassCards />` per `<FeaturesBlock />`:

  ```tsx
  <div className="relative">
    <PainBlock />
    <FeaturesBlock />
  </div>
  ```

- [ ] **Step 3: Verificar al navegador**

  Les 3 cards han d'aparèixer sobre fons gris molt clar (`#f8fafc`), amb estil net. Si les captures no existeixen, les imatges es mostren amb fallback (div ocult).

- [ ] **Step 4: Commit**

  ```bash
  cd "WEB/main-branch"
  git add src/components/FeaturesBlock.tsx src/pages/Index.tsx
  git commit -m "feat: replace GlassCards with clean FeaturesBlock — 3 feature cards with app screenshots"
  ```

---

## Task 5: Reordenar seccions a Index.tsx

**Files:**
- Modify: `src/pages/Index.tsx`

**Ordre actual:** Hero → PainBlock → GlassCards → StepsBlock → PricingBlock → TestimonialBlock → DemoVideo → TransformationBlock → FinalCTA

**Ordre nou:** Hero → PainBlock → FeaturesBlock → StepsBlock → TestimonialBlock → PricingBlock → FinalCTA

> `DemoVideo` i `TransformationBlock` s'eliminen del flux principal (es pot deixar DemoVideo dins FinalCTA o eliminar del tot per simplificar).

- [ ] **Step 1: Reescriure el JSX de `Index.tsx`**

  ```tsx
  import { useState } from "react";
  import Navbar from "@/components/Navbar";
  import { CinematicHero } from "@/components/ui/cinematic-hero";
  import PainBlock from "@/components/PainBlock";
  import FeaturesBlock from "@/components/FeaturesBlock";
  import StepsBlock from "@/components/StepsBlock";
  import TestimonialBlock from "@/components/TestimonialBlock";
  import PricingBlock from "@/components/PricingBlock";
  import FinalCTA from "@/components/FinalCTA";
  import Footer from "@/components/Footer";
  import QuizModal from "@/components/QuizModal";

  const Index = () => {
    const [quizOpen, setQuizOpen] = useState(false);

    return (
      <div className="min-h-screen bg-white">
        <Navbar onOpenQuiz={() => setQuizOpen(true)} />
        <main>
          <CinematicHero onOpenQuiz={() => setQuizOpen(true)} />
          <PainBlock />
          <FeaturesBlock />
          <StepsBlock />
          <TestimonialBlock />
          <PricingBlock />
          <FinalCTA onOpenQuiz={() => setQuizOpen(true)} />
        </main>
        <Footer />
        <QuizModal isOpen={quizOpen} onClose={() => setQuizOpen(false)} />
      </div>
    );
  };

  export default Index;
  ```

- [ ] **Step 2: Verificar scroll complet**

  Fer scroll de dalt a baix a `http://localhost:57506` i confirmar que l'ordre és correcte i no hi ha seccions trencades.

- [ ] **Step 3: Commit**

  ```bash
  cd "WEB/main-branch"
  git add src/pages/Index.tsx
  git commit -m "feat: reorder landing sections — Hero→Pain→Features→Steps→Testimonials→Pricing→CTA"
  ```

---

## Task 6: Refinar Navbar — transició scroll

**Files:**
- Modify: `src/components/Navbar.tsx`

- [ ] **Step 1: Llegir el fitxer actual**

  Llegir `src/components/Navbar.tsx` per entendre l'estructura actual.

- [ ] **Step 2: Afegir hook de scroll i classes condicionals**

  Localitzar on es defineix l'estat del component i afegir:

  ```tsx
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  ```

  Al `<nav>` o element arrel, afegir classes condicionals:

  ```tsx
  className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
    scrolled
      ? "bg-white/95 backdrop-blur-md shadow-[0_1px_0_rgba(0,0,0,0.06)]"
      : "bg-transparent"
  }`}
  ```

  I els links del nav, canviar color quan `scrolled`:

  ```tsx
  className={`transition-colors duration-300 ${
    scrolled ? "text-[#0f172a]" : "text-white"
  }`}
  ```

- [ ] **Step 3: Verificar**

  Scroll lleuger a la web — el navbar ha de passar de transparent a blanc amb ombra subtil.

- [ ] **Step 4: Commit**

  ```bash
  cd "WEB/main-branch"
  git add src/components/Navbar.tsx
  git commit -m "feat: navbar scroll transition — transparent on hero, white+shadow on scroll"
  ```

---

## Task 7: Afegir stats i partner badges al Hero

**Files:**
- Modify: `src/components/ui/cinematic-hero.tsx`

- [ ] **Step 1: Llegir cinematic-hero.tsx per localitzar on estan els CTAs**

  Llegir `src/components/ui/cinematic-hero.tsx` per trobar els botons CTA.

- [ ] **Step 2: Afegir stats sota els CTAs**

  Just sota el bloc de botons CTA, afegir:

  ```tsx
  {/* Stats */}
  <motion.div
    initial={{ opacity: 0, y: 12 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 1.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 mt-6 text-white/40 text-xs"
  >
    <span>💬 7.983 mensajes respondidos</span>
    <span className="hidden sm:inline">·</span>
    <span>🛡️ 4.271 registros policiales</span>
    <span className="hidden sm:inline">·</span>
    <span>🧹 3.548 limpiezas coordinadas</span>
  </motion.div>

  {/* Partner badges */}
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 1.5, duration: 0.6 }}
    className="flex items-center justify-center gap-1 mt-4 text-white/25 text-[10px] uppercase tracking-widest"
  >
    <span>Partner oficial</span>
    <span className="text-white/40 font-semibold mx-1">Airbnb</span>
    <span>·</span>
    <span className="text-white/40 font-semibold mx-1">Booking.com</span>
    <span>·</span>
    <span className="text-white/40 font-semibold mx-1">Google</span>
  </motion.div>
  ```

- [ ] **Step 3: Verificar**

  Les stats i partner badges han d'aparèixer subtilment sota els CTAs al hero.

- [ ] **Step 4: Commit**

  ```bash
  cd "WEB/main-branch"
  git add src/components/ui/cinematic-hero.tsx
  git commit -m "feat: add social proof stats and partner badges to hero"
  ```

---

## Task 8: Redissenyar TestimonialBlock — avatars reals

**Files:**
- Modify: `src/components/TestimonialBlock.tsx`

- [ ] **Step 1: Llegir el fitxer complet**

  Llegir `src/components/TestimonialBlock.tsx` per entendre l'estructura actual.

- [ ] **Step 2: Afegir URLs d'avatar a les dades**

  Localitzar l'array `allTestimonials` i afegir un camp `avatar` a cada entrada usant Unsplash (fotos de persones reals, aleatòries però consistents via seed):

  ```tsx
  const allTestimonials = [
    {
      name: "Marta G.", city: "Barcelona", apts: 3,
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=80&h=80&fit=crop&crop=face",
      quote: "Llevaba dos años gestionando todo por WhatsApp. Ahora Hostly lo hace solo y yo solo reviso el resumen de la semana.",
    },
    {
      name: "Javi R.", city: "Valencia", apts: 1,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face",
      quote: "Tenía un solo piso y pensaba que esto no era para mí. Con Hostly dejé de pensar en él constantemente.",
    },
    {
      name: "Laura M.", city: "Sevilla", apts: 5,
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face",
      quote: "Lo que más me ha cambiado es el registro policial automático. Ahora ni lo pienso.",
    },
    {
      name: "Àlex T.", city: "Girona", apts: 2,
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face",
      quote: "El soporte al principio es lo que me convenció. No es un chatbot, es una persona que te ayuda.",
    },
    {
      name: "Carmen V.", city: "Madrid", apts: 8,
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&h=80&fit=crop&crop=face",
      quote: "Gestionar 8 pisos sin equipo era imposible. Con Hostly tengo todo en 20 minutos desde el móvil.",
    },
    {
      name: "Pau S.", city: "Palma", apts: 4,
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=face",
      quote: "Las limpiezas coordinadas solas son una locura. Mi limpiadora recibe el aviso y yo no hago nada.",
    },
    {
      name: "Raquel F.", city: "Málaga", apts: 1,
      avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=80&h=80&fit=crop&crop=face",
      quote: "Tenía miedo de que fuera complicado. El equipo me ayudó desde cero y en un día estaba listo.",
    },
    {
      name: "Ignasi C.", city: "Tarragona", apts: 6,
      avatar: "https://images.unsplash.com/photo-1463453091185-61582044d556?w=80&h=80&fit=crop&crop=face",
      quote: "He probado otros software y siempre necesitabas más cosas. Hostly lo tiene todo sin sorpresas.",
    },
    {
      name: "Nuria B.", city: "Alicante", apts: 3,
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=80&h=80&fit=crop&crop=face",
      quote: "Mis huéspedes tienen mejor experiencia que antes, con menos trabajo de mi parte.",
    },
  ];
  ```

- [ ] **Step 3: Substituir els avatars amb inicials per `<img>`**

  Localitzar on es renderitza l'avatar (probablement un div amb initial) i substituir per:

  ```tsx
  <img
    src={testimonial.avatar}
    alt={`Foto de ${testimonial.name}`}
    loading="lazy"
    className="w-10 h-10 rounded-full object-cover ring-2 ring-white shadow-sm"
  />
  ```

- [ ] **Step 4: Verificar**

  Les fotos d'avatars han d'aparèixer a les cards de testimonials.

- [ ] **Step 5: Commit**

  ```bash
  cd "WEB/main-branch"
  git add src/components/TestimonialBlock.tsx
  git commit -m "feat: testimonials — replace initial avatars with real photos from Unsplash"
  ```

---

## Task 9: Refinar StepsBlock — connectors visuals

**Files:**
- Modify: `src/components/StepsBlock.tsx`

- [ ] **Step 1: Llegir StepsBlock.tsx**

  Llegir el fitxer per entendre l'estructura HTML actual dels 4 passos.

- [ ] **Step 2: Afegir línia connector entre passos**

  Localitzar el contenidor del grid de passos. Envolicar-lo en un `relative` i afegir una línia connector entre els números:

  ```tsx
  {/* Connector — visible només en md+ */}
  <div
    className="hidden md:block absolute top-[20px] left-[calc(12.5%+16px)] right-[calc(12.5%+16px)] h-[1px]"
    style={{
      background: "repeating-linear-gradient(90deg, #e2e8f0 0, #e2e8f0 6px, transparent 6px, transparent 14px)"
    }}
  />
  ```

  Assegurar que cada número de pas és `relative z-10` per estar sobre la línia.

- [ ] **Step 3: Canviar estil dels números**

  Cada número ha de tenir:
  ```tsx
  className="w-10 h-10 rounded-full bg-[#1a3a8f] text-white font-bold text-sm flex items-center justify-center mx-auto mb-4 relative z-10"
  ```

  El pas 4 (resultat) ha de tenir `bg-[#22c55e]` en lloc de blau.

- [ ] **Step 4: Verificar**

  Els 4 passos han de tenir una línia puntejada connectant els números en pantalla desktop.

- [ ] **Step 5: Commit**

  ```bash
  cd "WEB/main-branch"
  git add src/components/StepsBlock.tsx
  git commit -m "feat: StepsBlock — add dotted connector line between steps"
  ```

---

## Task 10: Refinar PricingBlock

**Files:**
- Modify: `src/components/PricingBlock.tsx`

- [ ] **Step 1: Llegir PricingBlock.tsx**

  Llegir el fitxer per entendre l'estructura actual.

- [ ] **Step 2: Destacar "Primer mes gratis" com a badge**

  Afegir un badge prominent sobre la card de preu:

  ```tsx
  <div className="inline-flex items-center gap-1.5 bg-[#dcfce7] text-[#16a34a] text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-6">
    🎁 Primer mes gratis · Sin tarjeta de crédito
  </div>
  ```

- [ ] **Step 3: Assegurar que el preu és prominent**

  El preu principal ha de tenir:
  ```tsx
  <span className="text-5xl font-black text-[#0f172a] tracking-tight">25€</span>
  <span className="text-[#64748b] text-sm">/mes por apartamento</span>
  ```

- [ ] **Step 4: Assegurar checkmarks verds a la llista**

  Cada ítem de la llista d'inclosos ha d'usar `text-[#22c55e]` per al checkmark.

- [ ] **Step 5: Commit**

  ```bash
  cd "WEB/main-branch"
  git add src/components/PricingBlock.tsx
  git commit -m "feat: PricingBlock — highlight free first month badge, clean visual refinements"
  ```

---

## Task 11: Afegir pas post-quiz (booking de trucada)

**Files:**
- Modify: `src/components/QuizModal.tsx`

- [ ] **Step 1: Llegir QuizModal.tsx complet**

  Llegir per entendre on acaba el flux actual (la pantalla de resultat/enviament de lead).

- [ ] **Step 2: Localitzar la pantalla de resultat**

  Buscar el render de la pantalla final (probablement quan `step === questions.length` o equivalent). Afegir un pas addicional just després de l'enviament del webhook.

- [ ] **Step 3: Afegir pantalla de booking**

  Substituir o afegir just després de la confirmació d'enviament:

  ```tsx
  {/* Pantalla post-quiz: booking call */}
  <motion.div
    key="booking"
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -20 }}
    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    className="text-center py-8 px-4"
  >
    <div className="text-4xl mb-4">🎉</div>
    <h3 className="text-xl font-bold text-[#0f172a] mb-2">
      ¡Tu apartamento encaja con Hostly!
    </h3>
    <p className="text-[#64748b] text-sm mb-8 max-w-xs mx-auto">
      Reserva una llamada de 15 minutos con nuestro equipo. Te ayudamos a configurarlo todo desde cero.
    </p>
    <a
      href="https://calendly.com/hostlylabs/15min"
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#1a3a8f] text-white font-semibold text-sm hover:bg-[#0f1f5c] transition-colors duration-200"
    >
      📅 Reservar llamada gratuita
    </a>
    <p className="text-[#94a3b8] text-xs mt-4">
      También nos pondremos en contacto contigo en las próximas horas.
    </p>
  </motion.div>
  ```

  > ⚠️ Substituir `https://calendly.com/hostlylabs/15min` per la URL real de Calendly quan estigui disponible.

- [ ] **Step 4: Commit**

  ```bash
  cd "WEB/main-branch"
  git add src/components/QuizModal.tsx
  git commit -m "feat: add post-quiz booking call step — Calendly CTA after lead capture"
  ```

---

## Task 12: SEO — Meta tags, Open Graph, Schema markup

**Files:**
- Modify: `index.html`

- [ ] **Step 1: Llegir `index.html` actual**

  Llegir `/WEB/main-branch/index.html`.

- [ ] **Step 2: Substituir el `<head>` amb meta tags complets**

  ```html
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    <!-- SEO Primary -->
    <title>Hostly — Tu apartamento funciona solo. Sin ti.</title>
    <meta name="description" content="Hostly gestiona check-ins, limpiezas, registros policiales y precios de tus apartamentos turísticos de forma automática. Configura en 15 minutos." />
    <link rel="canonical" href="https://hostlylabs.com" />
    <meta name="robots" content="index, follow" />

    <!-- Open Graph -->
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://hostlylabs.com" />
    <meta property="og:title" content="Hostly — Tu apartamento funciona solo. Sin ti." />
    <meta property="og:description" content="Gestión automatizada de apartamentos turísticos. Check-ins, limpiezas, registros y precios en piloto automático." />
    <meta property="og:image" content="https://hostlylabs.com/og-image.png" />
    <meta property="og:locale" content="es_ES" />
    <meta property="og:site_name" content="Hostly" />

    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="Hostly — Tu apartamento funciona solo. Sin ti." />
    <meta name="twitter:description" content="Gestión automatizada de apartamentos turísticos. Check-ins, limpiezas y registros en piloto automático." />
    <meta name="twitter:image" content="https://hostlylabs.com/og-image.png" />

    <!-- Schema markup -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "Hostly",
      "url": "https://hostlylabs.com",
      "description": "Sistema de gestión automatizada para propietarios de apartamentos turísticos.",
      "applicationCategory": "BusinessApplication",
      "operatingSystem": "Web",
      "offers": {
        "@type": "Offer",
        "price": "25",
        "priceCurrency": "EUR",
        "priceSpecification": {
          "@type": "UnitPriceSpecification",
          "price": "25",
          "priceCurrency": "EUR",
          "unitText": "mes por apartamento"
        }
      },
      "publisher": {
        "@type": "Organization",
        "name": "Hostly",
        "url": "https://hostlylabs.com"
      }
    }
    </script>
  </head>
  ```

- [ ] **Step 3: Commit**

  ```bash
  cd "WEB/main-branch"
  git add index.html
  git commit -m "feat: add SEO meta tags, Open Graph, Twitter Card and Schema markup"
  ```

---

## Task 13: sitemap.xml + robots.txt

**Files:**
- Create: `public/sitemap.xml`
- Create: `public/robots.txt`

- [ ] **Step 1: Crear `public/sitemap.xml`**

  ```xml
  <?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
      <loc>https://hostlylabs.com/</loc>
      <lastmod>2026-04-13</lastmod>
      <changefreq>weekly</changefreq>
      <priority>1.0</priority>
    </url>
  </urlset>
  ```

- [ ] **Step 2: Crear `public/robots.txt`**

  ```
  User-agent: *
  Allow: /

  Sitemap: https://hostlylabs.com/sitemap.xml
  ```

- [ ] **Step 3: Commit**

  ```bash
  cd "WEB/main-branch"
  git add public/sitemap.xml public/robots.txt
  git commit -m "feat: add sitemap.xml and robots.txt for SEO"
  ```

---

## Task 14: Auditoria mobile (375px)

**Files:**
- Modify: qualsevol component que necessiti ajustos responsive

- [ ] **Step 1: Verificar a 375px amb Playwright**

  ```
  browser_resize → width: 375, height: 812
  browser_navigate → http://localhost:57506
  browser_take_screenshot (full page)
  ```

- [ ] **Step 2: Identificar problemes**

  Fer scroll complet i detectar:
  - Textos truncats o sortint del viewport
  - Botons massa petits (mínim 44px height)
  - Cards que desborden horitzontalment
  - Padding insuficient als laterals

- [ ] **Step 3: Corregir cada problema trobat**

  Per cada problema: editar el component afectat afegint o corregint classes Tailwind responsive (`sm:`, `md:`). Regla: padding mínim `px-4` en mobile, botons `py-3 px-6 min-h-[44px]`.

- [ ] **Step 4: Verificar de nou**

  Repetir captura a 375px fins que no hi hagi problemes visuals.

- [ ] **Step 5: Commit**

  ```bash
  cd "WEB/main-branch"
  git add src/
  git commit -m "fix: mobile responsive audit at 375px — fix overflow and touch target issues"
  ```

---

## Self-Review

### Spec coverage
- ✅ Task 1 → Tokens CSS (spec §2)
- ✅ Task 2 → Captures app (spec §4)
- ✅ Task 3 → FinalCTA fix (spec §3 Secció 8)
- ✅ Task 4 → FeaturesBlock (spec §3 Secció 4)
- ✅ Task 5 → Reordenació seccions (spec §3)
- ✅ Task 6 → Navbar scroll (spec §3 Secció 1)
- ✅ Task 7 → Hero stats+badges (spec §3 Secció 2)
- ✅ Task 8 → Testimonials avatars (spec §3 Secció 6)
- ✅ Task 9 → Steps connectors (spec §3 Secció 5)
- ✅ Task 10 → Pricing refine (spec §3 Secció 7)
- ✅ Task 11 → Post-quiz booking (spec §3 Secció 9)
- ✅ Task 12 → SEO meta tags (spec §5)
- ✅ Task 13 → sitemap + robots (spec §5)
- ✅ Task 14 → Mobile audit (spec §6)

### Placeholder scan
- Task 11: URL Calendly marcada com a ⚠️ pending real URL — acceptable, comentat explícitament.
- Task 2: Screenshots depenen de l'app corrent i login — acceptable, instruccions clares.

### Type consistency
- `FeaturesBlock.tsx`: prop `onOpenQuiz` no necessari (no és un CTA de quiz), no s'ha afegit.
- `FinalCTA.tsx`: manté la mateixa interface `{ onOpenQuiz?: () => void }`.
- `Index.tsx`: importacions coherents amb els noms de fitxers definits.
