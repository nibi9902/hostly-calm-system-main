import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import hostlyLogo from "@/assets/hostly-logo-new.png";

const appleEase = [0.22, 1, 0.36, 1] as const;

interface NavbarProps {
  onOpenQuiz?: () => void;
}

const Navbar = ({ onOpenQuiz }: NavbarProps) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: appleEase }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-background/90 backdrop-blur-xl border-b border-border/60 shadow-sm"
          : "bg-background/60 backdrop-blur-md border-b border-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 md:px-8 h-16 flex items-center justify-between">

        {/* Logo */}
        <div className="flex items-center gap-[5px]">
          <img src={hostlyLogo} alt="Hostly" className="w-10 h-10 object-contain" />
          <span className="text-base font-heading font-semibold tracking-tight text-foreground">
            Hostly™
          </span>
        </div>

        {/* Nav links — desktop */}
        <nav className="hidden md:flex items-center gap-7">
          {[
            { label: "Cómo funciona", href: "#steps" },
            { label: "Precios", href: "#precios" },
            { label: "Soporte", href: "#soporte" },
          ].map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 font-medium"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* CTA */}
        <button
          onClick={onOpenQuiz}
          className="px-5 py-2.5 rounded-full bg-primary text-primary-foreground text-sm font-semibold transition-all duration-300 hover:shadow-[0_4px_20px_hsl(229_65%_52%/0.3)] hover:-translate-y-0.5 active:scale-[0.98]"
        >
          ¿Mi apartamento sirve?
        </button>
      </div>
    </motion.nav>
  );
};

export default Navbar;
