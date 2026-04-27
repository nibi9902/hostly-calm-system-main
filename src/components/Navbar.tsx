import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import hostlyLogo from "@/assets/hostly-logo-new.webp";
import { LangLink } from "@/i18n/LangLink";

const appleEase = [0.22, 1, 0.36, 1] as const;

interface NavbarProps {
  onOpenQuiz?: () => void;
}

const Navbar = ({ onOpenQuiz }: NavbarProps) => {
  const { pathname } = useLocation();
  const isHome = pathname === "/";

  // Inner pages start already scrolled (fons clar des del principi)
  const [scrolled, setScrolled] = useState(!isHome);

  useEffect(() => {
    if (!isHome) {
      setScrolled(true);
      return;
    }
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  // Links: anchor a la home si estem a pàgina interior
  const links = [
    { label: "Cómo funciona", href: isHome ? "#steps"   : "/#steps"   },
    { label: "Precios",       href: isHome ? "#precios" : "/precios"  },
    { label: "Soporte",       href: isHome ? "#soporte" : "/#soporte" },
  ];

  return (
    <motion.nav
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: appleEase }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-[0_1px_0_rgba(0,0,0,0.06)]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 md:px-8 h-16 flex items-center justify-between">

        {/* Logo */}
        <LangLink to="/" className="flex items-center gap-[5px]">
          <img src={hostlyLogo} alt="Hostly" className="w-10 h-10 object-contain" />
          <span
            className={`text-base font-heading font-semibold tracking-tight transition-colors duration-300 ${
              scrolled ? "text-[#0f172a]" : "text-white"
            }`}
          >
            Hostly™
          </span>
        </LangLink>

        {/* Nav links — desktop */}
        <nav className="hidden md:flex items-center gap-7">
          {links.map((link) =>
            link.href.startsWith('/') ? (
              /* Link intern: usa LangLink per evitar que el router interpreti /precios com a /:lang */
              <LangLink
                key={link.label}
                to={link.href}
                className={`text-sm font-medium transition-colors duration-300 ${
                  scrolled
                    ? "text-[#0f172a]/70 hover:text-[#0f172a]"
                    : "text-white/80 hover:text-white"
                }`}
              >
                {link.label}
              </LangLink>
            ) : (
              /* Anchor (#steps, #precios a la home): raw <a> per scroll */
              <a
                key={link.label}
                href={link.href}
                className={`text-sm font-medium transition-colors duration-300 ${
                  scrolled
                    ? "text-[#0f172a]/70 hover:text-[#0f172a]"
                    : "text-white/80 hover:text-white"
                }`}
              >
                {link.label}
              </a>
            )
          )}
        </nav>

        {/* CTA */}
        <button
          onClick={onOpenQuiz}
          className="px-5 py-2.5 rounded-full bg-primary text-primary-foreground text-sm font-semibold transition-all duration-300 hover:shadow-[0_4px_20px_hsl(229_65%_52%/0.3)] hover:-translate-y-0.5 active:scale-[0.98]"
        >
          Prueba gratis 14 días
        </button>
      </div>
    </motion.nav>
  );
};

export default Navbar;
