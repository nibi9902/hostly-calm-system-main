import hostlyLogo from "@/assets/hostly-logo.png";

const Footer = () => {
  return (
    <footer className="border-t border-border/60 py-10 px-6 md:px-12 lg:px-20 bg-background">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">

        {/* Brand */}
        <div className="flex items-center gap-2">
          <img src={hostlyLogo} alt="Hostly" className="w-6 h-6 rounded" />
          <span className="text-sm font-semibold text-foreground">Hostly™</span>
        </div>

        {/* Links */}
        <nav className="flex items-center gap-6 flex-wrap justify-center">
          {[
            { label: "Política de privacidad", href: "#" },
            { label: "Aviso legal", href: "#" },
            { label: "Contacto", href: "mailto:hola@hostlylabs.com" },
          ].map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="text-xs text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              {l.label}
            </a>
          ))}
        </nav>

        {/* Copyright */}
        <p className="text-xs text-muted-foreground/60">
          © 2026 Hostly™ · Haz que funcione por ti
        </p>
      </div>
    </footer>
  );
};

export default Footer;
