import { writeFileSync, readFileSync, readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const BASE = 'https://hostlylabs.com';
const TODAY = new Date().toISOString().split('T')[0];
const ROOT = join(__dirname, '..');

interface UrlEntry {
  loc: string;
  lastmod?: string;
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: number;
}

// Llegeix els slugs dels articles del blog
const blogDir = join(ROOT, 'src', 'content', 'blog');
const blogSlugs = readdirSync(blogDir)
  .filter((f) => f.endsWith('.md'))
  .map((f) => f.replace('.md', ''));

// Parser simple de frontmatter per extreure publishedAt
function getPublishedAt(slug: string): string {
  const raw = readFileSync(join(blogDir, `${slug}.md`), 'utf8');
  const match = raw.match(/publishedAt:\s*["']?([0-9-]+)["']?/);
  return match ? match[1] : TODAY;
}

// Slugs d'alternativas (hardcoded — mateixos que a competitors.ts)
const alternativasSlugs = ['icnea', 'hostify', 'lodgify', 'smoobu', 'hospitable', 'guesty', 'avantio'];

// Slugs de funcionalidades (hardcoded — mateixos que a features.ts, 8 pàgines SEO principals)
const funcionalidadesSlugs = [
  'ia-whatsapp',
  'check-in-online',
  'channel-manager',
  'gestion-de-limpiezas',
  'precios-dinamicos',
  'mensajeria-programada',
  'multi-rol',
  'automatizaciones-n8n',
];

const urls: UrlEntry[] = [
  { loc: '/', changefreq: 'weekly', priority: 1.0 },

  { loc: '/guia', changefreq: 'monthly', priority: 0.95 },
  { loc: '/blog', changefreq: 'weekly', priority: 0.9 },
  { loc: '/alternativas', changefreq: 'monthly', priority: 0.8 },
  { loc: '/funcionalidades', changefreq: 'monthly', priority: 0.9 },

  { loc: '/funciones/check-in', changefreq: 'monthly', priority: 0.9 },
  { loc: '/funciones/mensajes', changefreq: 'monthly', priority: 0.85 },
  { loc: '/funciones/reservas', changefreq: 'monthly', priority: 0.85 },
  { loc: '/funciones/limpiezas', changefreq: 'monthly', priority: 0.85 },
  { loc: '/funciones/pagos', changefreq: 'monthly', priority: 0.85 },
  { loc: '/funciones/precios', changefreq: 'monthly', priority: 0.85 },

  { loc: '/comparativa/chekin', changefreq: 'monthly', priority: 0.9 },

  { loc: '/propietarios', changefreq: 'monthly', priority: 0.85 },
  { loc: '/gestores-pequenos', changefreq: 'monthly', priority: 0.85 },
  { loc: '/segunda-residencia', changefreq: 'monthly', priority: 0.8 },
  { loc: '/hereus', changefreq: 'monthly', priority: 0.8 },

  ...alternativasSlugs.map((slug) => ({
    loc: `/alternativas/${slug}`,
    changefreq: 'monthly' as const,
    priority: 0.75,
  })),

  ...funcionalidadesSlugs.map((slug) => ({
    loc: `/funcionalidades/${slug}`,
    changefreq: 'monthly' as const,
    priority: 0.85,
  })),

  ...blogSlugs.map((slug) => ({
    loc: `/blog/${slug}`,
    lastmod: getPublishedAt(slug),
    changefreq: 'monthly' as const,
    priority: 0.7,
  })),
];

const xml =
  `<?xml version="1.0" encoding="UTF-8"?>\n` +
  `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
  urls
    .map(
      (u) =>
        `  <url>\n` +
        `    <loc>${BASE}${u.loc}</loc>\n` +
        `    <lastmod>${u.lastmod ?? TODAY}</lastmod>\n` +
        `    <changefreq>${u.changefreq}</changefreq>\n` +
        `    <priority>${u.priority}</priority>\n` +
        `  </url>`,
    )
    .join('\n') +
  `\n</urlset>\n`;

const output = join(ROOT, 'public', 'sitemap.xml');
writeFileSync(output, xml);
console.log(`✓ Sitemap generat amb ${urls.length} URLs → ${output}`);
console.log(`   · ${blogSlugs.length} articles de blog`);
console.log(`   · ${alternativasSlugs.length} alternativas`);
