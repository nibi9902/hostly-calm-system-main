import hostlyLogo from "@/assets/hostly-logo-new.webp";
import { LangLink } from "@/i18n/LangLink";

const Footer = () => {
  return (
    <footer className="border-t border-border/60 py-12 px-6 md:px-12 lg:px-20 bg-background">
      <div className="max-w-6xl mx-auto">

        {/* Top row: brand + nav */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 mb-8">

          {/* Brand */}
          <div className="flex items-center gap-2">
            <img src={hostlyLogo} alt="Hostly" className="w-7 h-7 object-contain" loading="lazy" />
            <div>
              <span className="text-sm font-semibold text-foreground block leading-none">Hostly™</span>
              <span className="text-[11px] text-muted-foreground/70 leading-none">Simplifica la gestión de tu apartamento turístico.</span>
            </div>
          </div>

          {/* Links */}
          <nav className="flex items-center gap-5 flex-wrap">
            {[
              { label: "Preguntas frecuentes", href: "/#faq", external: true },
              { label: "Privacidad", href: "/privacidad" },
              { label: "Cookies", href: "/cookies" },
              { label: "Términos", href: "/terminos" },
              { label: "Aviso legal", href: "/aviso-legal" },
              { label: "Sobre Hostly", href: "/sobre-hostly" },
              { label: "Contacto", href: "mailto:hola@hostlylabs.com", external: true },
            ].map((l) =>
              l.external ? (
                <a
                  key={l.label}
                  href={l.href}
                  className="text-xs text-muted-foreground hover:text-foreground transition-colors duration-200"
                >
                  {l.label}
                </a>
              ) : (
                <LangLink
                  key={l.label}
                  to={l.href}
                  className="text-xs text-muted-foreground hover:text-foreground transition-colors duration-200"
                >
                  {l.label}
                </LangLink>
              )
            )}
          </nav>
        </div>

        {/* Bottom row: copyright */}
        <div className="border-t border-border/40 pt-6">
          <p className="text-xs text-muted-foreground/50 text-center">
            © 2026 Hostly™ · Orden operativo para propietarios de apartamentos turísticos.
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
