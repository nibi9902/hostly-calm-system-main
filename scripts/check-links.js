/**
 * Verifica links interns del projecte.
 * Extreu tots els href="/..." del codi font i comprova si existeixen com a rutes.
 *
 * Ús: node scripts/check-links.js
 */

import { readdir, readFile } from 'fs/promises';
import { join, extname } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const SRC = join(__dirname, '..', 'src');

// Rutes vàlides definides a App.tsx (sense wildcards)
const VALID_ROUTES = new Set([
  '/',
  '/alternativas',
  '/aviso-legal',
  '/blog',
  '/comparativa/chekin',
  '/cookies',
  '/demo',
  '/funcionalidades',
  '/funciones/check-in',
  '/funciones/limpiezas',
  '/funciones/mensajes',
  '/funciones/pagos',
  '/funciones/precios',
  '/funciones/reservas',
  '/gestores-pequenos',
  '/guia',
  '/hereus',
  '/privacidad',
  '/propietarios',
  '/segunda-residencia',
  '/sobre-hostly',
  '/terminos',
  // Dynamic routes (comprovem el prefix)
  // /alternativas/:slug
  // /blog/:slug
  // /funcionalidades/:slug
]);

// Patrons de rutes dinàmiques
const DYNAMIC_PATTERNS = [
  /^\/alternativas\/[^/]+$/,
  /^\/blog\/[^/]+$/,
  /^\/funcionalidades\/[^/]+$/,
];

// Links externs (ignorar)
const EXTERNAL_PREFIXES = ['http://', 'https://', 'mailto:', 'tel:', '#'];

// Fitxers a ignorar
const IGNORE_FILES = ['node_modules', '.git', 'dist', 'scripts'];

async function walkSrc(dir) {
  let files = [];
  const entries = await readdir(dir, { withFileTypes: true });
  for (const e of entries) {
    if (IGNORE_FILES.some(ig => e.name.startsWith(ig))) continue;
    const full = join(dir, e.name);
    if (e.isDirectory()) {
      files = files.concat(await walkSrc(full));
    } else if (['.tsx', '.ts', '.mdx'].includes(extname(e.name))) {
      files.push(full);
    }
  }
  return files;
}

function extractLinks(content) {
  const links = [];
  // href="/..." patterns (JSX)
  const hrefRegex = /href=["']([^"']+)["']/g;
  let m;
  while ((m = hrefRegex.exec(content)) !== null) {
    links.push(m[1]);
  }
  // to="/..." (React Router Link)
  const toRegex = /\bto=["']([^"']+)["']/g;
  while ((m = toRegex.exec(content)) !== null) {
    links.push(m[1]);
  }
  return links;
}

function isValidRoute(link) {
  // Elimina el fragment (#anchor) i els query params abans de validar
  const clean = link.split('#')[0].split('?')[0] || '/';
  if (VALID_ROUTES.has(clean)) return true;
  if (DYNAMIC_PATTERNS.some(p => p.test(clean))) return true;
  return false;
}

function isExternal(link) {
  return EXTERNAL_PREFIXES.some(p => link.startsWith(p));
}

async function main() {
  const files = await walkSrc(SRC);
  const broken = [];
  const seen = new Set();

  for (const file of files) {
    const content = await readFile(file, 'utf-8');
    const links = extractLinks(content);
    for (const link of links) {
      if (isExternal(link)) continue;
      if (seen.has(link)) continue;
      seen.add(link);
      if (!isValidRoute(link)) {
        const relFile = file.replace(SRC + '/', '').replace(SRC + '\\', '');
        broken.push({ link, file: relFile });
      }
    }
  }

  console.log(`\n${'─'.repeat(60)}`);
  console.log(`  CHECK DE LINKS INTERNS — ${new Date().toLocaleDateString('ca-ES')}`);
  console.log(`${'─'.repeat(60)}\n`);
  console.log(`  Fitxers analitzats: ${files.length}`);
  console.log(`  Links únics trobats: ${seen.size}`);

  if (broken.length === 0) {
    console.log(`\n  ✅  Cap link trencat. Tot correcte.\n`);
  } else {
    console.log(`\n  ❌  Links sense ruta vàlida: ${broken.length}\n`);
    for (const { link, file } of broken) {
      console.log(`  • ${link.padEnd(45)}  ← ${file}`);
    }
    console.log('');
  }
}

main().catch(console.error);
