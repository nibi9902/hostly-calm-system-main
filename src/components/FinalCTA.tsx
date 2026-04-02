import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";

interface FinalCTAProps {
  onOpenQuiz?: () => void;
}

const FinalCTA = ({ onOpenQuiz }: FinalCTAProps) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 95%", "start 40%"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);
  const translateY = useTransform(scrollYProgress, [0, 0.2], [30, 0]);
  const blur = useTransform(scrollYProgress, [0, 0.15], [6, 0]);
  const filterBlur = useTransform(blur, (v) => `blur(${v}px)`);

  return (
    <section ref={ref} id="cta-final" className="py-20 md:py-28 px-6 md:px-12 lg:px-20 relative overflow-hidden bg-foreground">

      {/* Background texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: "radial-gradient(hsl(0 0% 100% / 0.5) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />
      {/* Radial glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: "radial-gradient(ellipse 70% 60% at 50% 50%, hsl(229 65% 52% / 0.20) 0%, transparent 70%)",
        }}
      />
      {/* Bottom gradient fade */}
      <div
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-32"
        style={{
          background: "linear-gradient(to bottom, transparent, hsl(var(--foreground) / 0.15))",
        }}
      />

      <motion.div
        style={{ opacity, y: translateY, filter: filterBlur }}
        className="max-w-3xl mx-auto text-center relative z-10 will-change-transform"
      >
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
          className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-6"
        >
          Empieza hoy
        </motion.p>

        <h2 className="text-4xl md:text-6xl font-bold tracking-[-0.04em] leading-[1.0] mb-6 text-white">
          Recupera tu calma.
        </h2>
        <p className="text-lg md:text-xl text-white/50 mb-12 max-w-lg mx-auto leading-relaxed">
          Evaluación rápida. Sin compromiso. Descubre si tu apartamento puede funcionar solo.
        </p>
        <button
          onClick={onOpenQuiz}
          className="group inline-flex items-center gap-3 px-10 py-5 rounded-full bg-white text-foreground font-semibold text-lg transition-all duration-300 hover:shadow-[0_8px_40px_rgba(255,255,255,0.2)] hover:-translate-y-0.5 active:scale-[0.98]"
        >
          ¿Mi apartamento sirve?
          <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-0.5" />
        </button>
        <p className="text-sm text-white/25 mt-8">
          Primer mes gratis · Soporte 1 a 1 desde el día uno · Sin permanencia
        </p>
      </motion.div>
    </section>
  );
};

export default FinalCTA;
