export interface Competitor {
  slug: string;
  name: string;
  tagline: string;
  target: string;
  priceNote: string;
  advantages: { title: string; body: string }[];
  comparison: { feature: string; hostly: boolean | string; them: boolean | string }[];
  faqs: { q: string; a: string }[];
}

export const competitors: Competitor[] = [
  {
    slug: 'icnea',
    name: 'Icnea',
    tagline: 'Hostly vs Icnea — La alternativa moderna al PMS ibérico clásico',
    target: 'Gestores de 5-200 unidades en España y Portugal',
    priceNote: 'Icnea: desde ~140 €/mes total · Hostly: 40 €/apartamento/mes',
    advantages: [
      { title: 'IA en WhatsApp nativa', body: 'Hostly responde a huéspedes 24/7 en 25+ idiomas con IA propia. Icnea no tiene IA conversacional integrada.' },
      { title: 'Precios dinámicos incluidos', body: 'Motor de precios dentro del plan. Icnea requiere add-on externo o gestión manual.' },
      { title: 'UI moderna y onboarding rápido', body: 'Listo en menos de 1 hora sin formaciones de pago. Icnea tiene curva de aprendizaje larga.' },
      { title: 'Check-in y compliance gratis', body: 'SES, NRUA, policía y taxa turística incluidos en Hostly sin coste adicional.' },
      { title: 'Precio transparente', body: '40 €/mes por apartamento sin fees por reserva. Ideal desde 1 hasta 50 unidades.' },
    ],
    comparison: [
      { feature: 'IA en WhatsApp', hostly: true, them: false },
      { feature: 'Check-in y SES incluido', hostly: 'Gratis para siempre', them: 'Sí' },
      { feature: 'Precios dinámicos', hostly: 'Incluidos', them: 'Add-on externo' },
      { feature: 'Onboarding sin formación', hostly: true, them: false },
      { feature: 'Precio desde 1 apartamento', hostly: '40 €/mes', them: '~140 €/mes' },
      { feature: 'Catalán nativo', hostly: true, them: true },
    ],
    faqs: [
      { q: '¿Cuánto tarda la migración desde Icnea?', a: 'Entre 2 y 4 semanas. Hacemos migración en paralelo mientras mantienes Icnea activo. No se interrumpen reservas.' },
      { q: '¿Es Hostly más caro que Icnea?', a: 'Para 1-10 apartamentos, Hostly sale más barato (40 €/mes por apartamento). Para 20+ con relación estable, los precios se acercan pero Hostly incluye IA y precios dinámicos.' },
    ],
  },
  {
    slug: 'hostify',
    name: 'Hostify',
    tagline: 'Hostly vs Hostify — IA nativa vs dependencia de terceros',
    target: 'Pequeños-medianos gestores (5-70 unidades) en España',
    priceNote: 'Hostify: $20/unidad/mes · Hostly: 40 €/apartamento/mes (todo incluido)',
    advantages: [
      { title: 'IA WhatsApp propia, no de terceros', body: 'Hostify usa HostBuddy (partner externo). Hostly tiene IA conversacional propia entrenada con tu tono.' },
      { title: 'Precios dinámicos incluidos', body: 'Hostify requiere PriceLabs o Beyond aparte. En Hostly ya vienen dentro del plan.' },
      { title: 'Check-in y compliance gratis', body: 'SES, NRUA, policía y taxa turística en Hostly sin coste adicional. Siempre.' },
      { title: 'Catalán nativo', body: 'Hostify solo tiene UI en español. Hostly atiende en catalán y castellano.' },
      { title: 'Precio más honesto', body: 'Hostify cobra en dólares con tipo de cambio variable. Hostly tiene precio fijo en euros.' },
    ],
    comparison: [
      { feature: 'IA conversacional propia', hostly: true, them: false },
      { feature: 'WhatsApp como canal principal', hostly: true, them: 'Parcial' },
      { feature: 'Precios dinámicos incluidos', hostly: true, them: false },
      { feature: 'Check-in y SES gratis', hostly: true, them: false },
      { feature: 'Catalán nativo', hostly: true, them: false },
      { feature: 'Moneda EUR fija', hostly: true, them: false },
    ],
    faqs: [
      { q: '¿Por qué Hostly si Hostify ya tiene WhatsApp?', a: 'Hostify tiene WhatsApp Business integrado, pero la IA es de un partner externo. Hostly tiene IA propia entrenada para apartamentos turísticos, con mejor contexto y control.' },
      { q: '¿Son comparables en funcionalidades?', a: 'Sí en lo básico (PMS, channel manager, check-in). La diferencia está en la IA nativa y en que Hostly incluye precios dinámicos sin add-ons.' },
    ],
  },
  {
    slug: 'icnea',
    name: 'Icnea',
    tagline: '',
    target: '',
    priceNote: '',
    advantages: [],
    comparison: [],
    faqs: [],
  },
  {
    slug: 'lodgify',
    name: 'Lodgify',
    tagline: 'Hostly vs Lodgify — Gestión completa vs foco en reservas directas',
    target: 'Hosts con 1-15 unidades que quieren web propia y reservas directas',
    priceNote: 'Lodgify: desde $20/mes + 1.9% fee · Hostly: 40 €/mes por apartamento',
    advantages: [
      { title: 'Gestión operativa completa', body: 'Lodgify está centrado en direct bookings y su web builder. Hostly también incluye neteges, mensajería, compliance y pagos.' },
      { title: 'IA conversacional nativa', body: 'Lodgify tiene asistente básico de redacción. Hostly responde mensajes de huéspedes automáticamente 24/7.' },
      { title: 'SES y compliance incluidos gratis', body: 'Lodgify no tiene SES nativo profundo. Hostly incluye SES, NRUA, policía y taxa sin coste adicional.' },
      { title: 'Sin fees por reserva', body: 'Lodgify cobra 1.9% por reserva en el plan Starter. Hostly no tiene fees variables.' },
      { title: 'Precio predecible', body: '40 €/mes por apartamento, sin sorpresas. Sin porcentajes sobre ingresos.' },
    ],
    comparison: [
      { feature: 'Web builder / direct bookings', hostly: 'Básico', them: 'Excelente' },
      { feature: 'IA conversacional 24/7', hostly: true, them: false },
      { feature: 'SES y compliance gratis', hostly: true, them: false },
      { feature: 'Sin fees por reserva', hostly: true, them: false },
      { feature: 'Coordinación de limpiezas', hostly: true, them: 'Limitado' },
      { feature: 'Precios dinámicos', hostly: true, them: true },
    ],
    faqs: [
      { q: '¿Hostly tiene web de reservas directas?', a: 'Hostly tiene una página básica de reservas directas. Si tu principal objetivo es tener una web propia muy bonita con SEO propio, Lodgify puede ser complementario. Para gestión operativa completa, Hostly gana.' },
      { q: '¿Cuánto me ahorro sin el fee del 1.9%?', a: 'Con 100 noches a 100 €/noche, son 190 €/año solo en fees de Lodgify Starter. Con Hostly pagas 40 €/mes (480 €/año) pero sin fees y con más funcionalidades incluidas.' },
    ],
  },
  {
    slug: 'smoobu',
    name: 'Smoobu',
    tagline: 'Hostly vs Smoobu — La alternativa con IA vs el PMS básico europeo',
    target: 'Host individual y pequeño gestor (1-15 unidades), fuerte en DACH',
    priceNote: 'Smoobu: desde 23 €/mes · Hostly: 40 €/apartamento/mes (con IA)',
    advantages: [
      { title: 'IA conversacional (Smoobu no tiene)', body: 'Smoobu no tiene IA de ningún tipo. Hostly responde mensajes automáticamente, gestiona check-ins y coordina limpiezas con IA.' },
      { title: 'Check-in y SES nativos', body: 'Smoobu usa Chekin como partner externo (coste adicional). Hostly lo incluye gratis para siempre.' },
      { title: 'Precios dinámicos incluidos', body: 'Smoobu tiene dynamic pricing básico pero limitado. Hostly lo tiene como parte del plan sin add-ons.' },
      { title: 'WhatsApp como canal principal', body: 'Smoobu no tiene integración WhatsApp. Hostly tiene IA en WhatsApp nativa.' },
      { title: 'Soporte en español y catalán', body: 'Smoobu tiene soporte en varios idiomas pero enfocado en DACH. Hostly es 100% ibérico.' },
    ],
    comparison: [
      { feature: 'IA conversacional', hostly: true, them: false },
      { feature: 'WhatsApp nativo', hostly: true, them: false },
      { feature: 'Check-in y SES sin add-on', hostly: true, them: false },
      { feature: 'Channel manager', hostly: true, them: true },
      { feature: 'Precios dinámicos', hostly: true, them: 'Básico' },
      { feature: 'Precio por apartamento', hostly: '40 €/mes', them: '23 €/mes' },
    ],
    faqs: [
      { q: '¿Por qué Hostly si Smoobu es más barato?', a: 'Smoobu a 23 €/mes parece más barato, pero necesitas Chekin (150-240 €/año por piso) para el check-in legal. Con Hostly lo tienes incluido gratis. El coste real de Smoobu es mayor.' },
      { q: '¿Smoobu tiene integración con el mercado español?', a: 'Tiene canal manager para las OTAs principales, pero no tiene SES nativo, ni IA, ni WhatsApp. Para la operativa española real, Hostly está mucho más completo.' },
    ],
  },
  {
    slug: 'hospitable',
    name: 'Hospitable',
    tagline: 'Hostly vs Hospitable — La alternativa ibérica con compliance legal',
    target: 'Hosts individuales sofisticados (1-30 propiedades), muy fuerte en US/UK',
    priceNote: 'Hospitable: desde $29/mes · Hostly: 40 €/mes por apartamento',
    advantages: [
      { title: 'SES y compliance español nativo', body: 'Hospitable no tiene SES.Hospedajes, Mossos, Ertzaintza ni taxa turística. Hostly los incluye gratis para siempre.' },
      { title: 'WhatsApp como canal principal', body: 'Hospitable tiene IA multicanal pero WhatsApp es secundario. Hostly es WhatsApp-first por diseño.' },
      { title: 'Soporte en español y catalán', body: 'Hospitable tiene UI en inglés. Hostly atiende en castellano y catalán, nativo ibérico.' },
      { title: 'Precio en euros, sin conversión', body: 'Hospitable cobra en dólares. Hostly tiene precio fijo en euros sin fluctuaciones de cambio.' },
      { title: 'Conocimiento regulatorio ibérico', body: 'Normativa CCAA, tipos impositivos municipales, formularios de la AEAT. Hostly los conoce y automatiza.' },
    ],
    comparison: [
      { feature: 'SES y compliance ES', hostly: true, them: false },
      { feature: 'WhatsApp como canal principal', hostly: true, them: 'Secundario' },
      { feature: 'IA conversacional madura', hostly: true, them: true },
      { feature: 'UI en español/catalán', hostly: true, them: false },
      { feature: 'Precio en EUR fijo', hostly: true, them: false },
      { feature: 'Channel manager', hostly: true, them: true },
    ],
    faqs: [
      { q: '¿Hospitable no es mejor en IA que Hostly?', a: 'Hospitable tiene 8+ años de experiencia en IA de mensajería y es excelente. La diferencia es que no cubre el mercado español (sin SES, sin WhatsApp-first, sin catalán). Si operas en España, Hostly te da el mismo nivel de IA con compliance incluido.' },
      { q: '¿Puedo usar Hospitable y Hostly juntos?', a: 'Técnicamente sí, pero no tendría sentido económico. Hostly cubre todo lo que hace Hospitable más el compliance español que Hospitable no tiene.' },
    ],
  },
  {
    slug: 'guesty',
    name: 'Guesty',
    tagline: 'Hostly vs Guesty — Para pequeños gestores, Hostly sin duda',
    target: 'Mid-market y enterprise (10-10.000+ unidades)',
    priceNote: 'Guesty: precio personalizado (estimado 40-70 €/mes Lite) · Hostly: 40 €/mes por apartamento todo incluido',
    advantages: [
      { title: 'Diseñado para 1-20 apartamentos', body: 'Guesty está hecho para enterprise. Su Lite existe pero no es su ADN. Hostly está pensado desde el día 1 para el pequeño gestor.' },
      { title: 'Sin demo obligatoria, self-serve', body: 'Guesty es sales-led con demo y onboarding complejo. Hostly funciona en 15 minutos sin hablar con nadie.' },
      { title: 'Precio transparente sin quote', body: 'Guesty no publica precios. Hostly: 40 €/mes, punto.' },
      { title: 'Check-in y compliance gratis', body: 'Guesty tiene SES vía partners. Hostly lo incluye gratis para siempre en el plan base.' },
      { title: 'Tono humano, no enterprise', body: 'Guesty suena a "command center" y "dashboards". Hostly habla el idioma del propietario real.' },
    ],
    comparison: [
      { feature: 'Diseñado para 1-20 apt.', hostly: true, them: false },
      { feature: 'Self-serve sin demo', hostly: true, them: false },
      { feature: 'Precio público transparente', hostly: true, them: false },
      { feature: 'Check-in y SES gratis', hostly: true, them: false },
      { feature: 'IA conversacional', hostly: true, them: true },
      { feature: 'Channel manager completo', hostly: true, them: true },
    ],
    faqs: [
      { q: '¿Para qué tipo de cliente es Guesty?', a: 'Guesty está optimizado para property managers con 20-500+ unidades que necesitan analytics avanzados, owners portals y integraciones enterprise. Para 1-15 apartamentos es sobredimensionado y caro.' },
      { q: '¿Hostly puede crecer conmigo?', a: 'Hasta 20-30 apartamentos, Hostly está diseñado exactamente para ese perfil. Si llegas a 50+ unidades con un equipo grande, podría tener sentido evaluar opciones más enterprise.' },
    ],
  },
  {
    slug: 'avantio',
    name: 'Avantio',
    tagline: 'Hostly vs Avantio — Modernidad y IA vs PMS tradicional ibérico',
    target: 'Agencias de gestión profesional (20-500+ unidades) en España',
    priceNote: 'Avantio: quote personalizado · Hostly: 40 €/apartamento/mes',
    advantages: [
      { title: 'IA conversacional nativa', body: 'Avantio no tiene IA de mensajería integrada. Hostly responde a huéspedes automáticamente 24/7 con IA propia.' },
      { title: 'Onboarding en horas, no semanas', body: 'Avantio tiene onboarding largo con implantadores. Hostly está listo en menos de 1 hora sin consultoría de pago.' },
      { title: 'Precio transparente', body: 'Avantio es quote-based. Hostly publica su precio: 40 €/mes por apartamento.' },
      { title: 'WhatsApp nativo', body: 'Avantio no tiene WhatsApp como canal de comunicación nativo. Hostly sí.' },
      { title: 'Check-in y compliance gratis', body: 'SES, NRUA, policía y taxa incluidos en Hostly sin coste adicional.' },
    ],
    comparison: [
      { feature: 'IA conversacional', hostly: true, them: false },
      { feature: 'WhatsApp nativo', hostly: true, them: false },
      { feature: 'Onboarding sin consultoría', hostly: true, them: false },
      { feature: 'Precio público', hostly: true, them: false },
      { feature: 'Channel manager completo', hostly: true, them: true },
      { feature: 'SES nativo', hostly: true, them: true },
    ],
    faqs: [
      { q: '¿Para qué perfil es Avantio?', a: 'Avantio está pensado para agencias grandes (20-200+ unidades) con equipo técnico que necesitan integraciones complejas. Para gestores pequeños y medianos, el coste y la complejidad son excesivos.' },
      { q: '¿Hostly es tan completo como Avantio?', a: 'Para el perfil de 1-20 apartamentos, sí. Avantio tiene features avanzadas de revenue management y reporting para grandes volúmenes que Hostly no prioriza. Si tienes menos de 20 unidades, Hostly cubre todo lo que necesitas.' },
    ],
  },
];

// Deduplicar (teníem icnea dos vegades per error)
const seen = new Set<string>();
export const uniqueCompetitors = competitors.filter((c) => {
  if (seen.has(c.slug)) return false;
  seen.add(c.slug);
  return c.advantages.length > 0;
});

export function getCompetitor(slug: string) {
  return uniqueCompetitors.find((c) => c.slug === slug);
}
