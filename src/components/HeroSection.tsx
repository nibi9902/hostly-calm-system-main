import { motion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import { useState, useEffect, useRef } from "react";

const appleEase = [0.22, 1, 0.36, 1] as const;

/* ── Highlighted keyword box ── */
const Highlight = ({
  children,
  color,
  delay = 0,
}: {
  children: React.ReactNode;
  color: "blue" | "red" | "green";
  delay?: number;
}) => {
  const colorMap = {
    blue:  { text: "hsl(229 65% 52%)",  border: "hsl(229 65% 52% / 0.6)" },
    red:   { text: "#dc2626",            border: "#dc262699" },
    green: { text: "#16a34a",            border: "#16a34a99" },
  };
  const { text, border } = colorMap[color];

  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.45, delay, ease: appleEase }}
      className="inline-block relative"
      style={{ color: text, lineHeight: 1, verticalAlign: "middle" }}
    >
      <motion.span
        initial={{ opacity: 0, scaleX: 0.5 }}
        animate={{ opacity: 1, scaleX: 1 }}
        transition={{ duration: 0.4, delay: delay + 0.1, ease: appleEase }}
        aria-hidden
        className="absolute inset-0 rounded-[10px] pointer-events-none"
        style={{ border: `2px dashed ${border}`, transformOrigin: "left center" }}
      />
      <span className="px-3 py-0.5 font-bold italic whitespace-nowrap">{children}</span>
    </motion.span>
  );
};

interface HeroSectionProps { onOpenQuiz?: () => void; }

const HeroSection = ({ onOpenQuiz }: HeroSectionProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const [mousePos, setMousePos] = useState({ x: 50, y: 30 });

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };
    window.addEventListener("mousemove", handler, { passive: true });
    return () => window.removeEventListener("mousemove", handler);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-background min-h-screen flex flex-col px-5 md:px-8 lg:px-12 pt-16 pb-12"
    >
      {/* Background: subtil glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background: "radial-gradient(ellipse 70% 40% at 50% -5%, hsl(229 65% 52% / 0.06) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute inset-0 transition-[background] duration-1000 ease-out"
          style={{
            background: `radial-gradient(900px at ${mousePos.x}% ${mousePos.y}%, hsl(229 65% 52% / 0.035), transparent 70%)`,
          }}
        />
      </div>

      <div className="relative z-10 flex flex-col flex-1 w-full">

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0, ease: appleEase }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-background/80 border border-border/70 backdrop-blur-sm mb-8 shadow-sm self-start"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
          <span className="text-sm text-foreground/70 font-medium tracking-[-0.01em]">
            Para propietarios que no quieren una segunda ocupación
          </span>
        </motion.div>

        {/* ── Headline: 3 frases separades amb molt d'aire ── */}
        <div className="flex-1 flex flex-col justify-center gap-0">

          {/* Frase 1 */}
          <motion.p
            className="font-bold text-foreground"
            style={{ fontSize: "clamp(1.6rem, 4vw, 5.2rem)", letterSpacing: "-0.04em", lineHeight: 1.35 }}
            initial={{ opacity: 0, y: 36 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: appleEase }}
          >
            Tienes apartamentos turísticos para{" "}
            <Highlight color="blue" delay={0.35}>ganar dinero</Highlight>.
          </motion.p>

          {/* Frase 2 + 3 inline */}
          <motion.p
            className="font-bold text-foreground"
            style={{ fontSize: "clamp(1.6rem, 4vw, 5.2rem)", letterSpacing: "-0.04em", lineHeight: 1.35 }}
            initial={{ opacity: 0, y: 36 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.22, ease: appleEase }}
          >
            No para pasarte el día{" "}
            <Highlight color="red" delay={0.5}>registrando checkins</Highlight>,{" "}
            coordinando limpiezas y{" "}
            <Highlight color="red" delay={0.6}>respondiendo mensajes</Highlight>{" "}
            a deshoras.{" "}
            <Highlight color="green" delay={0.72}>Para eso está Hostly</Highlight>.
          </motion.p>

        </div>

        {/* ── Bottom bar: tagline + CTAs ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.7, ease: appleEase }}
          className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 pt-8 mt-8 border-t border-border/25"
        >
          <div>
            <p className="text-base md:text-lg font-medium text-foreground/70 leading-snug">
              Tu apartamento, finalmente en orden.
            </p>
            <p className="text-sm text-muted-foreground/40 mt-1.5">
              Primer mes gratis · Sin permanencia
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 flex-shrink-0">
            <a
              href="#demo-video"
              className="group inline-flex items-center gap-3 px-7 py-4 rounded-full bg-primary text-primary-foreground font-semibold text-base transition-all duration-300 hover:shadow-[0_8px_32px_hsl(229_65%_52%/0.35)] hover:-translate-y-0.5 active:scale-[0.98]"
            >
              Ver demo de 2 min
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" />
            </a>
            <button
              onClick={onOpenQuiz}
              className="inline-flex items-center gap-2 px-7 py-4 rounded-full border border-border bg-background/70 text-foreground font-medium text-base transition-all duration-300 hover:bg-muted hover:border-primary/30 hover:-translate-y-0.5 active:scale-[0.98] backdrop-blur-sm"
            >
              ¿Cuánto tiempo recuperaría?
            </button>
          </div>
        </motion.div>

      </div>

      {/* ── Scroll arrow ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.2, ease: appleEase }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 cursor-pointer group"
        onClick={() => window.scrollBy({ top: window.innerHeight * 0.9, behavior: "smooth" })}
      >
        <motion.div
          animate={{ y: [0, 7, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown
            className="w-6 h-6 text-muted-foreground/30 group-hover:text-muted-foreground/60 transition-colors duration-300"
            strokeWidth={1.5}
          />
        </motion.div>
      </motion.div>

    </section>
  );
};

export default HeroSection;
