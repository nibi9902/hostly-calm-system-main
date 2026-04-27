import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import { SUPPORTED_LANGS, DEFAULT_LANG, type Lang } from './config';

/**
 * Hook unificat per gestió d'idioma.
 *  - `lang`         → idioma actiu
 *  - `setLang(l)`   → canvia idioma + URL (preserva la ruta) + persisteix
 *  - `localized(p)` → genera URL amb prefix d'idioma actiu
 *  - `t`            → translate function
 */
export function useLang() {
  const { i18n, t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();

  const segment = location.pathname.split('/').filter(Boolean)[0];
  const urlLang = (SUPPORTED_LANGS as readonly string[]).includes(segment) ? (segment as Lang) : DEFAULT_LANG;
  const lang: Lang = urlLang;

  // Sincronitza i18n amb l'idioma de la URL si difereixen
  if (i18n.language !== lang) {
    i18n.changeLanguage(lang);
  }

  function setLang(next: Lang) {
    if (next === lang) return;
    // Substitueix el primer segment de l'URL
    const parts = location.pathname.split('/').filter(Boolean);
    if ((SUPPORTED_LANGS as readonly string[]).includes(parts[0])) parts[0] = next;
    else parts.unshift(next);
    const newPath = '/' + parts.join('/');
    i18n.changeLanguage(next);
    try { localStorage.setItem('hostly_lang', next); } catch { /* ignora */ }
    navigate(newPath + location.search + location.hash);
  }

  function localized(path: string): string {
    if (!path.startsWith('/')) path = '/' + path;
    // Si ja porta prefix d'idioma, retorna tal qual
    const seg = path.split('/').filter(Boolean)[0];
    if ((SUPPORTED_LANGS as readonly string[]).includes(seg)) return path;
    return `/${lang}${path === '/' ? '' : path}`;
  }

  return { lang, setLang, localized, t, i18n };
}

/** Helper sense hook (per useEffect, llocs sense React context) */
export function getLangFromPath(pathname: string): Lang {
  const seg = pathname.split('/').filter(Boolean)[0];
  return (SUPPORTED_LANGS as readonly string[]).includes(seg) ? (seg as Lang) : DEFAULT_LANG;
}

export type { Lang };
