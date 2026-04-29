import { useLang } from '@/i18n/useLang';
import { FEATURES, type Feature } from './features';
import { FEATURES_CA } from './features.ca';

/** Retorna l'array de features en l'idioma actual. */
export function useFeatures(): Feature[] {
  const { lang } = useLang();
  return lang === 'ca' ? FEATURES_CA : FEATURES;
}

/** Retorna una feature concreta per slug en l'idioma actual. */
export function useFeature(slug: string): Feature | undefined {
  const features = useFeatures();
  return features.find((f) => f.slug === slug);
}
