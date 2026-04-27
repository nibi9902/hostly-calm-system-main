import { useParams, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { getCompetitor } from '@/lib/data/competitors';
import AlternativaPage from './AlternativaPage';
import { useLang } from '@/i18n/useLang';

export default function AlternativaRoute() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { localized } = useLang();
  const competitor = slug ? getCompetitor(slug) : undefined;

  useEffect(() => {
    if (!competitor) navigate(localized('/alternativas'), { replace: true });
  }, [competitor, navigate, localized]);

  if (!competitor) return null;
  return <AlternativaPage competitor={competitor} />;
}
