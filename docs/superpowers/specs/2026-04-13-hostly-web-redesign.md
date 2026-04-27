# Hostly Web — Design Spec
**Data:** 2026-04-13  
**Estat:** Aprovat per l'usuari  
**Branca:** WEB/main-branch  
**Domini:** hostlylabs.com

---

## 1. Visió general

Redisseny i cohesió de la landing page de Hostly per portar-la a producció. L'objectiu és una web professional, escanejable en 3 segons, que transmeti clarament el problema del propietari, la solució de Hostly i com funciona — amb un estil clar i modern inspirat en Airbnb, no carregat.

**Principi central:** L'usuari ha d'entendre en un sol scroll: *qui ets → quin és el teu problema → aquí hi ha la solució → així funciona → preu → comença.*

---

## 2. Direcció visual

### Estil
- **Inspiració:** Airbnb, Stripe, Notion — clar, net, molt espai en blanc
- **Hero:** Fosc (blau `#0f1f5c → #1a3a8f`) — es manté, és el ganxo diferenciador
- **Seccions de contingut:** Blanc `#ffffff` i gris molt clar `#f8fafc`
- **CTA final:** Fosc (`#0f1f5c`) per tancar el cercle visualment
- **Accent únic:** Blau Hostly `#1a3a8f` per a botons, links i highlights
- **Cap altre color dominant** — màxim 1 color secundari verd `#22c55e` per a checkmarks/èxit

### Tokens CSS (variables a unificar)
```css
:root {
  --color-primary: #1a3a8f;
  --color-primary-dark: #0f1f5c;
  --color-primary-light: #3b5fd9;
  --color-success: #22c55e;
  --color-bg: #ffffff;
  --color-bg-subtle: #f8fafc;
  --color-text: #0f172a;
  --color-text-muted: #64748b;
  --color-border: #e2e8f0;

  --font-display: 'Inter', sans-serif;
  --font-body: 'Inter', sans-serif;

  --space-1: 0.25rem;
  --space-2: 0.5rem;
  --space-4: 1rem;
  --space-6: 1.5rem;
  --space-8: 2rem;
  --space-12: 3rem;
  --space-16: 4rem;
  --space-24: 6rem;

  --radius-sm: 6px;
  --radius-md: 12px;
  --radius-lg: 20px;
  --radius-full: 999px;

  --shadow-sm: 0 1px 3px rgba(0,0,0,0.08);
  --shadow-md: 0 4px 16px rgba(0,0,0,0.10);
  --shadow-lg: 0 8px 40px rgba(0,0,0,0.12);
}
```

### Tipografia
- Display: Inter Bold/Black, mides grans (48-80px), tracking negatiu
- Body: Inter Regular/Medium, 15-16px, line-height 1.6
- Labels: Inter SemiBold uppercase, letter-spacing 1.5px, 11px

---

## 3. Estructura de la pàgina (ordre definitiu)

### Secció 1 — NAVBAR
- Transparent sobre el hero, fix en scroll
- En fer scroll: fons blanc + ombra subtil
- Logo esquerra | Links centre (Cómo funciona · Precios · Soporte) | CTA dreta
- CTA: "¿Mi apartamento sirve?" — blau, pill shape
- **Estat actual:** Funciona. Refinar transició scroll.

### Secció 2 — HERO CINEMATOGRÀFIC
- Es manté íntegrament — és el punt fort
- Afegir: stats en línia sota els CTAs (7.983 mensajes · 4.271 registros · 3.548 limpiezas)
- Afegir: badges "Partner oficial Airbnb · Booking · Google" sota els stats
- **Estat actual:** Bé. Afegir stats + badges.

### Secció 3 — PROBLEMA (redisseny)
- Títol: "¿Te suena esto?" o similar
- 2 columnes simètriques: **Sin Hostly** (fons rose-50) / **Con Hostly** (fons green-50)
- 5 ítems per columna amb icona + text curt
- Estil: cards arrodonides, lleugeres, molt espai interior
- **Estat actual:** Exists però massa carregat. Redissenyar.

### Secció 4 — FEATURES (redisseny)
- Títol centrat: "Todo lo que necesitas, sin complicaciones"
- 3 cards en grid: Check-in online · Limpiezas coordinadas · Registro policial
- Cada card: icona gran + títol + 1 frase + screenshot real de l'app (captura Playwright)
- Estil: border-1 solid, border-radius-lg, hover shadow
- **Estat actual:** Cards amb estil beige inconsistent. Redissenyar completament.

### Secció 5 — COM FUNCIONA (refinar)
- 4 passos numerats en horitzontal
- Número gran blau + títol + 1 línia descripció
- Connector visual entre passos (línia puntejada)
- **Estat actual:** Existe. Refinar estil i connectors.

### Secció 6 — TESTIMONIALS (redisseny)
- Títol: "Lo que dicen propietarios reales · España"
- Carousel o grid de 3 columnes
- Cada testimonial: foto avatar (IA generada, realista) + ⭐⭐⭐⭐⭐ + cita curta + nom + ubicació + nº apartaments
- **Estat actual:** Avatars amb inicials grises. Redissenyar amb fotos.

### Secció 7 — PRICING (refinar)
- 1 pla únic, centrat, destacat
- Preu gran: "25€/mes por apartamento"
- Destacar: primer mes gratis, sense targeta, sense permanència
- Llista d'inclosos amb checkmarks verds
- Referral: "Invita 5 → 1 apartamento gratis"
- CTA: "Empieza gratis hoy"
- **Estat actual:** Existeix. Refinar visualment.

### Secció 8 — CTA FINAL (arreglar — CRÍTIC)
- Secció fosca: `--color-primary-dark`
- Headline gran: "Empieza gratis hoy."
- Subtítol: "Sin permanencia · Sin tarjeta el primer mes · Cancela cuando quieras"
- 2 botons: "Pruébalo gratis →" (blanc) + "Ver demo (2 min)" (ghost)
- Logos partner: Airbnb · Booking · Google
- **Estat actual:** Completament buit/negre. Arreglar urgent.

### Secció 9 — FLUX POST-QUIZ (nou)
- Al finalitzar el quiz (QuizModal.tsx), afegir pas addicional:
  - "¡Perfecto! Tu apartamento encaja con Hostly."
  - Embed de Calendly o link directe per reservar trucada del dia següent
  - Alternativa: botó "Reservar llamada de 15 min" → URL externa Calendly
- **Estat actual:** Quiz envia webhook a n8n però lead no rep res. Afegir CTA post-quiz.

---

## 4. Assets de la plataforma (captures reals)

Obtenir captures de pantalla de l'app Hostly (localhost:8080) amb Playwright:
- Dashboard principal — vista calendari
- Vista de finances (ingressos setmanals)
- Vista de check-ins/reserves
- Vista de neteges coordinades
- Notificació WhatsApp automàtica

Usar en: Secció Features (una per card) i Secció Hero (mockup mòbil si escau).

---

## 5. SEO i metadades

- `<title>`: "Hostly — Tu apartamento funciona solo. Sin ti."
- Meta description: "Hostly gestiona check-ins, limpiezas, registros policiales y precios de tus apartamentos turísticos de forma automática. Configura en 15 minutos."
- Open Graph: imatge 1200x630 amb headline + logo
- Canonical: https://hostlylabs.com
- Schema markup: SoftwareApplication + Organization
- sitemap.xml + robots.txt

---

## 6. Rendiment i tècnic

- Imatges: WebP, lazy loading, max 200kb per imatge
- LCP objectiu: < 2.5s
- Variables CSS unificades a `index.css` (eliminar valors hardcoded)
- Comprovar tots els `alt` texts a imatges
- Mobile-first: revisar totes les seccions en 375px i 390px

---

## 7. Prioritat d'execució

| Prioritat | Tasca |
|-----------|-------|
| 🔴 1 | Arreglar CTA final buit (Secció 8) |
| 🔴 2 | Unificar sistema de variables CSS |
| 🟠 3 | Capturar screenshots de l'app (Playwright) |
| 🟠 4 | Redissenyar Secció 3 (Problema) |
| 🟠 5 | Redissenyar Secció 4 (Features + screenshots app) |
| 🟠 6 | Redissenyar Secció 6 (Testimonials + avatars) |
| 🟡 7 | Refinar Secció 2 (Hero + stats + badges) |
| 🟡 8 | Refinar Secció 5 (Steps + connectors) |
| 🟡 9 | Refinar Secció 7 (Pricing) |
| 🟡 10 | Refinar Secció 1 (Navbar scroll transition) |
| 🟢 11 | Flux post-quiz amb booking call (Secció 9) |
| 🟢 12 | Meta tags + Open Graph + Schema markup |
| 🟢 13 | sitemap.xml + robots.txt |
| 🟢 14 | Auditoria mobile (375px) |

---

## 8. Fitxers principals a modificar

```
src/
├── index.css                    ← Variables CSS unificades
├── pages/Index.tsx              ← Orquestració de seccions
├── components/
│   ├── Navbar.tsx               ← Transició scroll
│   ├── CinematicHero.tsx        ← Afegir stats + badges
│   ├── PainBlock.tsx            ← Redisseny complet
│   ├── GlassCards.tsx           ← Substituir per Features net
│   ├── StepsBlock.tsx           ← Refinar connectors
│   ├── TestimonialBlock.tsx     ← Redisseny amb fotos
│   ├── PricingBlock.tsx         ← Refinar
│   ├── FinalCTA.tsx             ← Arreglar (crític)
│   └── QuizModal.tsx            ← Afegir pas post-quiz
public/
├── sitemap.xml                  ← Nou
├── robots.txt                   ← Nou
└── assets/app-screenshots/      ← Captures de l'app
```
