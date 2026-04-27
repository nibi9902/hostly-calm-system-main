import { useParams, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { FEATURES } from '@/lib/data/features';
import FeaturePage from './FeaturePage';
import { useLang } from '@/i18n/useLang';

export default function FeatureRoute() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { localized } = useLang();
  const feature = slug ? FEATURES.find((f) => f.slug === slug) : undefined;

  useEffect(() => {
    if (!feature) navigate(localized('/funcionalidades'), { replace: true });
  }, [feature, navigate, localized]);

  if (!feature) return null;
  return <FeaturePage feature={feature} />;
}
