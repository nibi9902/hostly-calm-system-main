/**
 * Converteix totes les imatges PNG/JPG de public/assets/ i src/assets/
 * al format WebP al costat de l'original.
 *
 * Ús: node scripts/convert-to-webp.js
 *
 * - Sobreescriu el .webp existent si el PNG/JPG és més nou.
 * - Manté l'original (fallback per navegadors antics).
 * - Qualitat: 85 (bon equilibri mida/qualitat per screenshots d'app).
 */

import sharp from 'sharp';
import { readdir, stat } from 'fs/promises';
import { join, extname, basename } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ROOT = join(__dirname, '..');

const DIRS = [
  join(ROOT, 'public', 'assets'),
  join(ROOT, 'src', 'assets'),
];

const EXTENSIONS = ['.png', '.jpg', '.jpeg'];
const QUALITY = 85;

async function walk(dir) {
  let files = [];
  try {
    const entries = await readdir(dir, { withFileTypes: true });
    for (const entry of entries) {
      const full = join(dir, entry.name);
      if (entry.isDirectory()) {
        files = files.concat(await walk(full));
      } else {
        files.push(full);
      }
    }
  } catch {
    // dir doesn't exist
  }
  return files;
}

async function convert(srcPath) {
  const ext = extname(srcPath).toLowerCase();
  if (!EXTENSIONS.includes(ext)) return;

  const webpPath = srcPath.replace(/\.(png|jpe?g)$/i, '.webp');

  // Skip if WebP exists and is newer than source
  try {
    const [srcStat, webpStat] = await Promise.all([stat(srcPath), stat(webpPath)]);
    if (webpStat.mtimeMs >= srcStat.mtimeMs) {
      console.log(`  skip  ${basename(srcPath)} (WebP up to date)`);
      return;
    }
  } catch {
    // webp doesn't exist yet — proceed
  }

  try {
    const info = await sharp(srcPath)
      .webp({ quality: QUALITY })
      .toFile(webpPath);

    const srcKB = Math.round((await stat(srcPath)).size / 1024);
    const outKB = Math.round(info.size / 1024);
    const saved = Math.round((1 - info.size / (await stat(srcPath)).size) * 100);
    console.log(`  ✓  ${basename(srcPath)}  ${srcKB}KB → ${outKB}KB  (-${saved}%)`);
  } catch (err) {
    console.error(`  ✗  ${basename(srcPath)}: ${err.message}`);
  }
}

async function main() {
  console.log('Convertint imatges a WebP...\n');
  for (const dir of DIRS) {
    const files = await walk(dir);
    for (const file of files) {
      await convert(file);
    }
  }
  console.log('\nFet.');
}

main();
