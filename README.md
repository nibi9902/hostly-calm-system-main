# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS (+ @tailwindcss/typography per articles del blog)
- React Router DOM 6
- Framer Motion + GSAP (hero animat)
- React Markdown + remark-gfm (blog)

---

## Brand & messaging

Aquest projecte segueix el posicionament definit a `../../marca-i-posicionament-hostly.md` (v3, abril 2026).

**Regla d'or:** cap copy nou sense checklist de "banned words":
- ❌ "ingreso pasivo" / "pasivo" / "trabajar sin ti" / "Desconéctate"
- ❌ "copilot" / "humà intel·ligent" / "PMS amb IA"
- ❌ "piloto automático" / "transforma" / "revolucionario"

**Pricing canònic:** 40€/apartament (37€ des de 5) · 14 dies gratis · check-in gratis per sempre · referral 5→1.

**H1 de marca:** *"Tu apartamento debería trabajar para ti."* (hero cinematogràfic)
**Claim secundari:** *"Sistema. No herramienta."*

---

## Scripts

```bash
npm run dev        # servidor local port 8080
npm run build      # genera sitemap + build de producció
npm run sitemap    # només regenera public/sitemap.xml
npm run lint       # ESLint
```

El `prebuild` hook regenera el sitemap automàticament abans de cada build, per assegurar que tots els articles i pàgines noves s'indexen.

---

## Estructura de rutes

- `/` — home (cinematic hero + secciones)
- `/guia` — Super Guía de gestió (amb links a tots els recursos)
- `/blog` + `/blog/:slug` — 20 articles agrupats per 4 categories
- `/alternativas` + `/alternativas/:slug` — 7 comparatives (Icnea, Hostify, Lodgify, Smoobu, Hospitable, Guesty, Avantio)
- `/funciones/:feature` — 6 pàgines de feature (check-in, mensajes, reservas, limpiezas, pagos, precios)
- `/comparativa/chekin` — comparativa detallada vs Chekin
- `/propietarios` · `/gestores-pequenos` · `/segunda-residencia` · `/hereus` — landings per persona

---

## Analytics

- **GA4**: placeholder `G-XXXXXXXXXX` a `index.html`. Substituir pel Measurement ID real abans de desplegar.
- **Events** definits a `src/lib/analytics.ts`:
  - `cta_primary_click` — clic a "Empezar gratis"
  - `article_read_percent` — scroll depth 25/50/75/100 als articles
  - `quiz_open`, `pricing_view`, `nav_dropdown_open`, etc.
- En dev, els events van a `console.log` amb prefix `[analytics]`.

---

## Changelog v3 (abril 2026)

**Migració completa de posicionament v2 → v3:**
- Preu 25€/22€ → **40€/37€** + 14 dies gratis + check-in gratis per sempre
- Copy "trabajar sin ti / Desconéctate" → "trabajar para ti / Funciona"
- `index.html`: title, meta, OG, Twitter, hreflang, Schema SoftwareApp + Organization + FAQPage
- 6 pàgines `/funciones/*` + `/comparativa/chekin` + 4 landings per persona
- Nou mega-menú "Recursos" amb 3 grups (Guías, Alternativas, Funcionalidades)
- Blog migrat de Next.js a Vite amb `react-markdown`: 20 articles + listing per categories
- 7 pàgines d'alternativas migrades amb plantilla compartida
- Super Guía a `/guia` amb 8 capítols i 38 recursos enllaçats
- `sitemap.xml` generat dinàmicament amb 42 URLs

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)
