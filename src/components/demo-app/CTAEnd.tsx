import { motion } from 'framer-motion';
import { ArrowRight, RotateCcw } from 'lucide-react';

const appleEase = [0.22, 1, 0.36, 1] as const;

export function CTAEnd({ onReplay }: { onReplay: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.94, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.5, ease: appleEase }}
      className="w-[min(520px,92vw)] bg-[hsl(var(--demo-card))] rounded-2xl border border-[hsl(var(--demo-border))] shadow-2xl shadow-black/10 overflow-hidden p-8 text-center"
    >
      <motion.h2
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.15, ease: appleEase }}
        className="text-2xl font-semibold text-[hsl(var(--demo-foreground))] tracking-tight mb-2"
      >
        Així treballa Hostly per tu
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.25, ease: appleEase }}
        className="text-sm text-[hsl(var(--demo-muted-foreground))] mb-6"
      >
        Tota l'operativa coordinada en un sol lloc, sense dependre de tu.
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.35, ease: appleEase }}
        className="flex flex-col sm:flex-row gap-2.5 justify-center"
      >
        <button
          className="h-11 px-6 rounded-xl bg-[hsl(var(--demo-primary))] text-white font-medium text-sm inline-flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
          onClick={() => {
            /* Placeholder — aquí anirà el mode demo o formulari de contacte */
          }}
        >
          Provar Hostly
          <ArrowRight size={16} />
        </button>
        <button
          onClick={onReplay}
          className="h-11 px-5 rounded-xl border border-[hsl(var(--demo-border))] text-[hsl(var(--demo-foreground))] font-medium text-sm inline-flex items-center justify-center gap-2 hover:bg-[hsl(var(--demo-muted))] transition-colors"
        >
          <RotateCcw size={15} />
          Tornar a veure
        </button>
      </motion.div>
    </motion.div>
  );
}
