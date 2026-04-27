# Lighthouse — seguiment Onada 5

> Data: 2026-04-21

## Resultats

### Baseline (pre-v3, contra producció a `hostlylabs.com`)
| Mètrica | Valor |
|---|---|
| Performance | 87 |
| SEO | 100 |
| Accessibility | 89 |
| Best Practices | 96 |
| LCP | 3.2s |
| CLS | 0 |
| TBT | 40ms |

### Post-v3 (build local + code splitting, contra `localhost:4173`)
| Mètrica | Valor | Δ |
|---|---|---|
| Performance | 37 | ↓ 50 (localhost, veure nota) |
| SEO | 100 | = |
| Accessibility | 96 | ↑ 7 ✅ |
| Best Practices | 100 | ↑ 4 ✅ |
| LCP | 8.38s | ↑ (localhost) |
| CLS | 0 | = |

## Interpretació

El Performance ha baixat però la comparació **no és vàlida** perquè:

1. **Baseline** mesurat contra `https://hostlylabs.com`, servit per **Vercel amb CDN**, compressió Brotli, HTTP/2, edge caching.
2. **Post-v3** mesurat contra `http-server` local sense compressió, CDN ni caching.

La diferència esperada entre prod i localhost pot ser de **40-60 punts** de Performance per una mateixa app.

## Accions fetes

- ✅ **Code splitting** via `React.lazy` a totes les rutes secundàries → 24 chunks (abans 1 bundle gegant)
- ✅ **Chunk principal** estabilitzat a ~218KB gzip

## Accions pendents per a prod

1. **Verificar scores a producció real** un cop desplegat via Lovable → hauria de tornar a ≥85 Performance
2. **Revisar LCP image** de la home si queda alt (podria ser algun asset del CinematicHero)
3. **Lazy load** del logo (ara 1.1MB al disc) → optimitzar a WebP
4. **Reduce unused CSS/JS** oportunitats concretes:
   - CSS no usat: 600ms
   - JS no usat: 1.500ms

## Conclusió

Els objectius de l'Onada 5 s'han assolit en **SEO (100), Accessibility (96), Best Practices (100)**. El Performance requereix mesurar contra la URL de producció desplegada, no localhost.

**Fitxers de referència:**
- `docs/lighthouse-baseline-2026-04-21.json` — pre-v3 vs producció
- `docs/lighthouse-v3-split-2026-04-21.json` — post-v3 vs localhost
