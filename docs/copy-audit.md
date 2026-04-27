# Copy Audit — Hostly main-branch v3
> Data: 21 abril 2026 · Referència: `marca-i-posicionament-hostly.md` v3

**Llegenda veredictes:**
- ✅ KEEP — alineat amb v3, no tocar
- ⚠️ REPHRASE — missatge vàlid però paraules o framing a ajustar
- ❌ REPLACE — contradiu v3 directament (passiu, pricing vell, banned words)
- ➕ ADD — element nou que falta

---

## 1. `index.html` — Meta tags i Schema

| Element | Contingut actual | Veredicte | Acció |
|---|---|---|---|
| `<title>` | "Hostly — Tu apartamento funciona solo. Sin ti." | ❌ REPLACE | "funciona solo. Sin ti." = framing passiu |
| `<meta description>` | "Hostly gestiona check-ins, limpiezas, registros policiales y precios de tus apartamentos turísticos de forma automática. Configura en 15 minutos." | ⚠️ REPHRASE | Falta diferencial check-in gratis + trial 14 dies |
| `og:title` | igual que title | ❌ REPLACE | igual |
| `og:description` | "...registros en piloto automático." | ❌ REPLACE | "piloto automático" = passiu + fred |
| `twitter:title` | igual que title | ❌ REPLACE | igual |
| `twitter:description` | "...en piloto automático." | ❌ REPLACE | igual |
| Schema `price` | 25 EUR | ❌ REPLACE | ha de ser 40 EUR |
| Schema `description` | "Sistema de gestión automatizada..." | ⚠️ REPHRASE | massa tècnic |
| hreflang | absent | ➕ ADD | afegir es-ES, ca-ES, x-default |
| Organization schema | absent | ➕ ADD | schema.org/Organization |
| FAQPage schema | absent | ➕ ADD | 8-10 FAQs |
| og:image | `/og-image.png` | ⚠️ REPHRASE | verificar que l'arxiu existeix i és 1200×630 |

### Nou copy proposat
```html
<title>Hostly — La app que simplifica tu piso turístico | 14 días gratis</title>
<meta name="description" content="Reservas, check-in, mensajes, limpiezas y taxes turísticas en una sola app. Check-in y compliance incluidos gratis para siempre. 14 días gratis, sin tarjeta." />
<meta property="og:title" content="Hostly — Una app para todo tu piso turístico" />
<meta property="og:description" content="Deja de pagar Chekin, Excel y 3 suscripciones más. Hostly lo hace todo desde una sola app. 14 días gratis." />
<meta name="twitter:title" content="Hostly — Una app para todo tu piso turístico" />
<meta name="twitter:description" content="Check-in, compliance, mensajes, limpiezas y precios. Todo en Hostly. 14 días gratis, sin tarjeta." />
```

---

## 2. `CinematicHero` — `/src/components/ui/cinematic-hero.tsx`

### Fase 1 — Headline obertura
| Element | Contingut actual | Veredicte | Motiu |
|---|---|---|---|
| H1 línia 1 | "Tu apartamento debería" | ✅ KEEP | bon inici |
| H1 línia 2 | "trabajar sin ti." | ❌ REPLACE | "sin ti" = passive income frame. Prohibit v3. |

**Proposta H1:** `"trabajar para ti."` — canvi mínim, elimina framing passiu, manté estructura cinematogràfica.

### Fase 2 — Card navy (scroll)
| Element | Contingut actual | Veredicte |
|---|---|---|
| H3 card | "Sistema. No herramienta." | ✅ KEEP — perfecte v3 |
| Sub card | "Hostly gestiona check-ins, limpiezas, precios y registros policiales. Configura una vez. **Desconéctate para siempre.**" | ❌ REPLACE últimes 4 paraules |
| Bubbles (5) | Reserva 620€, Check-in, Preu +40%, Neteja, Resposta IA | ✅ KEEP — concrets i reals |

**Proposta sub card:** `"Configura una vez. Funciona para siempre."`

### Fase 3 — CTA final (fons blanc)
| Element | Contingut actual | Veredicte |
|---|---|---|
| Eyebrow | "Para propietarios que quieren sistema, no caos" | ✅ KEEP |
| H2 | "Empieza gratis hoy." | ⚠️ REPHRASE — afegir durada trial |
| Sub | "Sin permanencia. Sin comisiones. Solo sistema que trabaja por ti." | ⚠️ REPHRASE — "trabaja por ti" adjacent a passiu |
| CTA primari | "Pruébalo gratis" | ⚠️ REPHRASE — falta "14 días" |
| CTA secundari | "Ver cómo funciona" | ✅ KEEP |
| Stats pills | 7.983 mensajes / 4.271 registros / 3.548 limpiezas | ✅ KEEP (xifres pilots confirmades) |
| Badges partners | Booking.com / Airbnb / Google | ✅ KEEP — proof fort |
| Microcopy baix CTA | absent | ➕ ADD — "Sin tarjeta. Cancela cuando quieras." |

**Propostes:**
- H2: `"Empieza gratis. 14 días."`
- Sub: `"Sin permanencia. Sin tarjeta. Una sola app para todo tu piso."`
- CTA primari: `"Empezar gratis 14 días"`

---

## 3. `PainBlock` — `/src/components/PainBlock.tsx`

| Element | Contingut actual | Veredicte |
|---|---|---|
| H2 | "Así se ve gestionarlo sin Hostly. Y con él." | ✅ KEEP — directe i potent |
| Sub | "Los mismos momentos. La misma realidad. Una respuesta completamente distinta." | ✅ KEEP |
| Col. esquerra (sense Hostly) | 5 notifs: llaves, registre pendent, entrega en persona, netejadora sense substituta, 03:14 AM sense aigua | ✅ KEEP — molt concret i real |
| Col. dreta (amb Hostly) | 5 notifs resoltes: codi enviat, registre automàtic, check-in online, netejadora notificada, tècnic avisat | ✅ KEEP — resolució 1 a 1 |

**Veredicte general: ✅ No tocar.** És el bloc v3 millor implementat de tot el lloc.

---

## 4. `FeaturesBlock` — `/src/components/FeaturesBlock.tsx`

| Element | Contingut actual | Veredicte |
|---|---|---|
| Eyebrow | "Todo automático" | ⚠️ REPHRASE — massa abstracte |
| H2 | "Lo que antes te robaba horas, ahora pasa solo." | ⚠️ REPHRASE — "pasa solo" fringa passiu |
| 3 cards actuals | Check-in · Limpiezas · Registro policial | ⚠️ EXPAND — v3 vol 6 categories |
| Badge "Gratis para siempre" | absent | ❌ REPLACE — diferencial clau que falta |

**Propostes:**
- Eyebrow: `"Lo que reemplaza Hostly"`
- H2: `"Cinco suscripciones reemplazadas. Una sola app."`
- 6 cards v3: Reservas y calendarios · Mensajes con huéspedes · **Check-in y compliance** *(badge verd "Gratis para siempre")* · Limpiezas y coordinación · Pagos y facturas · Precios dinámicos

---

## 5. `StepsBlock` — `/src/components/StepsBlock.tsx`

| Element | Contingut actual | Veredicte |
|---|---|---|
| Eyebrow | "Cómo funciona" | ✅ KEEP |
| H2 | "Listo en minutos. Funcionando para siempre." | ✅ KEEP |
| Sub | "Cuatro pasos. Y tu apartamento pasa a **gestionarse solo**." | ⚠️ REPHRASE — "gestionarse solo" = passiu |
| Pas 1 | "Configura tu apartamento en minutos" | ✅ KEEP |
| Pas 2 | "Conecta tus plataformas" | ✅ KEEP — afegir "Airbnb + Booking en 2 min" |
| Pas 3 | "El sistema lo gestiona todo" | ✅ KEEP |
| Pas 4 title | "**Desconecta. Hostly trabaja por ti.**" | ❌ REPLACE — doble banned: "Desconecta" = passiu + "trabaja por ti" |
| Pas 4 desc | "...Tu negocio funciona **sin que estés pendiente**." | ❌ REPLACE — passiu |
| Footer | "Setup guiado en 10 minutos · Soporte humano en cada paso" | ✅ KEEP |

**Proposta Pas 4:**
- Títol: `"Todo en orden. Abre la app cuando quieras."`
- Descripció: `"Entradas, salidas, incidencias, limpiezas — dentro de Hostly. No tienes que estar pendiente de nada fuera de la app."`

**Proposta Sub header:** `"Cuatro pasos. Y tu piso queda dentro de Hostly."`

---

## 6. `TestimonialBlock` — `/src/components/TestimonialBlock.tsx`

| Element | Contingut actual | Veredicte |
|---|---|---|
| Eyebrow | "Propietarios reales · España" | ✅ KEEP |
| H2 | "Lo que dicen los que ya duermen tranquilos." | ✅ KEEP — calma com a benefici, alineat v3 |
| Sub | "Propietarios con 1 a 12 apartamentos que dejaron de gestionar a mano." | ✅ KEEP |
| 15 testimonials (Marta G., Javi R., etc.) | Fotos Unsplash, noms genèrics | ⚠️ FLAG — semblen inventats. Verificar si són reals |
| Secció fundador "Biel" | "Nació de vivirlo" · "De propietario a propietario." | ✅ KEEP — autèntic i potent |
| 3 support promises | Resposta <2h · Onboarding 1a1 · Acompanyament 1r any | ✅ KEEP |

**NOTA IMPORTANT:** Si els testimonials no són de clients reals, cal o bé: (a) substituir per clients reals, o (b) afegir placeholder honest. El document de marca v3 prohibeix inventar xifres — per extensió, prohibeix inventar testimonials.

---

## 7. `PricingBlock` — `/src/components/PricingBlock.tsx`

| Element | Contingut actual | Veredicte |
|---|---|---|
| Preu principal | 25€ /mes per apartament | ❌ REPLACE → 40€ |
| Preu volum | 22€/mes si gestionas 4 o más | ❌ REPLACE → 37€ / 5 o más |
| Trial | "Primer mes gratis · Sin tarjeta de crédito" | ❌ REPLACE → "14 días gratis · Sin tarjeta" |
| H2 | "Un solo plan. Todo incluido." | ✅ KEEP |
| Sub | "Gestiona mejor, gana más y deja de depender de ti mismo." | ⚠️ REPHRASE — "deja de depender de ti mismo" és v1/v2 framing |
| Inclòs 1: "Tu propia página de reservas directas" | — | ⚠️ REPHRASE — no és el diferencial principal v3 |
| Inclòs 2: "Check-in online automático" | sense badge "gratis" | ❌ REPLACE — **ha de dir "Check-in + SES + NRUA + taxa GRATIS para siempre"** |
| Inclòs 3: "Acompañamiento 1 a 1 el primer año" | — | ✅ KEEP |
| Referral | "Invita a 5 anfitriones → 1 apartamento gratis" | ✅ KEEP |
| Tachado estalvi | absent | ➕ ADD — `~~150€/mes~~ → 40€/mes amb Hostly` |
| CTA principal | "Empieza ahora" | ⚠️ REPHRASE → "Empezar gratis 14 días" |
| Microcopy | "Sin permanencia · Sin tarjeta de crédito el primer mes..." | ❌ REPLACE → "Sin tarjeta. 14 días gratis. Cancela cuando quieras." |

**Nou `included` array proposat:**
```
1. Check-in + SES + NRUA + taxa turística · GRATIS para siempre [badge verd]
2. Reservas y calendarios · Airbnb + Booking sincronizados
3. Mensajes con huéspedes · Respuesta automática 24/7
4. Limpiezas y coordinación · Aviso automático al equipo
5. Pagos y facturas · Sin Excel
6. Precios dinámicos · Incluidos sin add-ons
```

---

## 8. `FinalCTA` — `/src/components/FinalCTA.tsx`

| Element | Contingut actual | Veredicte |
|---|---|---|
| Eyebrow | "Para propietarios que quieren sistema, no caos" | ✅ KEEP |
| H2 | "Empieza gratis hoy." | ⚠️ REPHRASE → "Empieza gratis. 14 días." |
| Sub | "Sin permanencia · Sin tarjeta el primer mes · Cancela cuando quieras" | ❌ REPLACE — "primer mes" → "Sin tarjeta. 14 días gratis. Cancela cuando quieras." |
| CTA primari | "Pruébalo gratis" | ⚠️ REPHRASE → "Empezar gratis 14 días" |
| CTA secundari | "Ver demo (2 min)" | ✅ KEEP |
| Stats | 7.983 / 4.271 / 3.548 | ✅ KEEP |
| Partner logos | Airbnb · Booking.com · Google | ✅ KEEP |

---

## 9. `Navbar` — `/src/components/Navbar.tsx`

| Element | Contingut actual | Veredicte |
|---|---|---|
| Logo + "Hostly™" | — | ✅ KEEP |
| Link 1 | "Cómo funciona" | ✅ KEEP |
| Link 2 | "Precios" | ✅ KEEP |
| Link 3 | "Soporte" | ✅ KEEP |
| CTA navbar | "¿Mi apartamento sirve?" | ⚠️ REPHRASE — confús. Sembla un qualifier, no un CTA |
| Links nous | absent | ➕ ADD — "Funciones" (quan existeixin pàgines /funciones/) |

**Proposta CTA navbar:** `"Prueba gratis 14 días"` — directe, alineat amb trial v3.

---

## 10. Components renderitzats NO auditats (secondary)

- `GlassCards` (`src/components/ui/glass-cards.tsx`) — no llegit. Afegir a auditoria propera.
- `QuizModal` (`src/components/QuizModal.tsx`) — modal de qualificació, no llegit.

---

## 11. Components NO renderitzats (codi mort)

Existeixen però **no estan a `Index.tsx`**:
- `HeroSection.tsx`
- `TransformationBlock.tsx`
- `OrderBlock.tsx`
- `DemoVideo.tsx`

**Decisió:** no tocar. Avaluar netejar-los en una fase futura.

---

## Resum prioritzat

### ❌ REPLACE immediat (bloquejants)
1. Pricing: 25€/22€ → 40€/37€ + trial "14 dies" + check-in gratis (PricingBlock)
2. H1 Hero: "trabajar sin ti" → "trabajar para ti"
3. StepsBlock pas 4: "Desconecta. Hostly trabaja por ti." → copy sistema
4. Meta tags title/description/og (index.html): treure "funciona solo. Sin ti." + "piloto automático"
5. Schema price: 25 → 40

### ⚠️ REPHRASE (alt impacte)
6. CinematicHero sub card: "Desconéctate para siempre" → "Funciona para siempre"
7. FinalCTA H2 + sub + CTA: afegir "14 días" arreu
8. PricingBlock: revisar `included`, afegir badge check-in gratis, tachado estalvi
9. FeaturesBlock: expandir a 6 categories + badge + eyebrow nou
10. Navbar CTA: "¿Mi apartamento sirve?" → "Prueba gratis 14 días"

### ➕ ADD (SEO + conversió)
11. hreflang + Organization schema + FAQPage schema (index.html)
12. StatsBarBlock nou (entre Hero i PainBlock)
13. ReplacesBlock nou (entre StatsBar i PainBlock)
14. Pàgines `/funciones/*`, `/comparativa/chekin`, `/propietarios`, `/gestores` (Onada 3)

### ✅ NO TOCAR
- PainBlock sencer
- Secció fundador a TestimonialBlock
- Bubbles del CinematicHero
- Stats (7.983 / 4.271 / 3.548)
- Badges partners (Booking/Airbnb/Google)
- StepsBlock passos 1-3
- Footer tagline StepsBlock

---

## Nota sobre testimonials

Els 15 testimonials actuals usen fotos Unsplash i noms genèrics (Marta G., Javi R., etc.). **Si no són clients reals, cal substituir-los** — la v3 de marca prohibeix inventar prova social. Consultar amb Biel si existeixen clients reals disposats a testimoniar.
