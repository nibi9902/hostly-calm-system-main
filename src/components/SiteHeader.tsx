import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useNav } from '@/lib/data/useNav';
import { HeaderNav } from './HeaderNav';
import hostlyLogo from '@/assets/hostly-logo-new.webp';
import { cn } from '@/lib/utils';
import { LangLink } from '@/i18n/LangLink';
import { useLang } from '@/i18n/useLang';

interface SiteHeaderProps {
  onOpenQuiz?: () => void;
}

export function SiteHeader({ onOpenQuiz }: SiteHeaderProps) {
  const { pathname } = useLocation();
  const { lang, setLang } = useLang();
  const NAV = useNav();
  // Home: tant `/` com `/es` o `/ca`
  const segments = pathname.split('/').filter(Boolean);
  const isHome = segments.length === 0 || (segments.length === 1 && (segments[0] === 'es' || segments[0] === 'ca'));
  const [visible, setVisible] = useState(!isHome);

  useEffect(() => {
    if (!isHome) {
      setVisible(true);
      return;
    }
    setVisible(false);
    const show = () => setVisible(true);
    window.addEventListener('hostly:hero-cta-visible', show);
    return () => window.removeEventListener('hostly:hero-cta-visible', show);
  }, [isHome]);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50',
        'bg-white/95 backdrop-blur-md border-b border-slate-100',
        'transition-all duration-300 ease-in-out',
        !visible && '-translate-y-full opacity-0 pointer-events-none',
      )}
    >
      <div className="max-w-6xl mx-auto px-6 md:px-8 h-20 flex items-center justify-between gap-6">
        {/* Switcher d'idioma + logo a l'esquerra */}
        <div className="flex items-center gap-4 shrink-0">
          <div className="hidden sm:flex items-center gap-0.5 rounded-full border border-slate-200 bg-white p-0.5 text-[11px] font-semibold">
            {(['es', 'ca'] as const).map((l) => (
              <button
                key={l}
                type="button"
                onClick={() => setLang(l)}
                aria-pressed={lang === l}
                aria-label={l === 'es' ? 'Español' : 'Català'}
                className={cn(
                  'px-3 py-1.5 rounded-full transition-colors min-w-[36px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
                  lang === l ? 'bg-slate-900 text-white' : 'text-slate-500 hover:text-slate-900',
                )}
              >
                {l.toUpperCase()}
              </button>
            ))}
          </div>
          <LangLink to="/" className="flex items-center gap-0.5" aria-label="Hostly">
            <img
              src={hostlyLogo}
              alt=""
              width={32}
              height={32}
              className="h-8 w-auto object-contain"
            />
            <span className="font-semibold text-lg tracking-tight text-foreground">
              Hostly™
            </span>
          </LangLink>
        </div>
        <HeaderNav nav={NAV} onOpenQuiz={onOpenQuiz} />
      </div>
    </header>
  );
}
