import { useLang } from '@/i18n/useLang';
import { NAV, type NavConfig } from './nav';
import { NAV_CA } from './nav.ca';

/** Retorna el NAV amb les labels en l'idioma actual. */
export function useNav(): NavConfig {
  const { lang } = useLang();
  return lang === 'ca' ? NAV_CA : NAV;
}
