import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import { LangLink } from "@/i18n/LangLink";

interface FinalCTAProps {
  onOpenQuiz?: () => void;
}

const FinalCTA = ({ onOpenQuiz }: FinalCTAProps) => {
  return (
    <section
      id="cta-final"
      className="py-24 md:py-32 px-6 md:px-12 lg:px-20 relative overflow-hidden"
      style={{ background: "linear-gradient(135deg, #0f1f5c 0%, #1a3a8f 100%)" }}
    >
      {/* Dot texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: "radial-gradient(rgba(255,255,255,0.6) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      {/* Radial glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(59,95,217,0.35) 0%, transparent 70%)",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-3xl mx-auto text-center relative z-10"
      >
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/40 mb-5">
          Para propietarios que quieren sistema, no caos
        </p>

        <h2 className="text-4xl md:text-6xl font-bold tracking-[-0.04em] leading-[1.0] mb-6 text-white">
          Empieza gratis. 14 días.
        </h2>

        <p className="text-lg md:text-xl text-white/60 mb-10 max-w-lg mx-auto leading-relaxed">
          Sin tarjeta · Sin permanencia · Cancela cuando quieras
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
          <button
            onClick={onOpenQuiz}
            className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white text-[#0f1f5c] font-semibold text-base transition-all duration-300 hover:shadow-[0_8px_40px_rgba(255,255,255,0.25)] hover:-translate-y-0.5 active:scale-[0.98]"
          >
            Empezar gratis 14 días
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" />
          </button>
          <LangLink
            to="/demo"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-white/25 text-white/80 font-medium text-base transition-all duration-300 hover:border-white/50 hover:text-white"
          >
            <Play className="w-4 h-4 fill-current" />
            Ver demo en vivo
          </LangLink>
        </div>

        {/* Stats */}
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-white/35 text-sm mb-10">
          <span>💬 7.983 mensajes respondidos</span>
          <span>·</span>
          <span>🛡️ 4.271 registros policiales</span>
          <span>·</span>
          <span>🧹 3.548 limpiezas coordinadas</span>
        </div>

        {/* Partner logos */}
        <div className="flex items-center justify-center gap-2 text-white/30 text-xs font-medium uppercase tracking-widest">
          <span>Partner oficial de</span>
          <span className="text-white/50 font-semibold ml-1">Airbnb</span>
          <span>·</span>
          <span className="text-white/50 font-semibold">Booking.com</span>
          <span>·</span>
          <span className="text-white/50 font-semibold">Google</span>
        </div>
      </motion.div>
    </section>
  );
};

export default FinalCTA;
