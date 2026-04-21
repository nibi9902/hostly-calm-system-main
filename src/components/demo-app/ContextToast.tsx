import { AnimatePresence, motion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';

const ease = [0.22, 1, 0.36, 1] as const;

export function ContextToast({
  show,
  icon: Icon,
  title,
  subtitle,
  tone = 'primary',
}: {
  show: boolean;
  icon: LucideIcon;
  title: string;
  subtitle?: string;
  tone?: 'primary' | 'warning' | 'success' | 'accent';
}) {
  const toneCls =
    tone === 'warning'
      ? { bg: 'bg-[hsl(var(--demo-warning-soft))]', text: 'text-[hsl(var(--demo-warning))]' }
      : tone === 'success'
        ? { bg: 'bg-[hsl(var(--demo-success-soft))]', text: 'text-[hsl(var(--demo-success))]' }
        : { bg: 'bg-[hsl(var(--demo-accent-soft))]', text: 'text-[hsl(var(--demo-primary))]' };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: -14, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -14, scale: 0.96 }}
          transition={{ duration: 0.4, ease }}
          className="absolute top-4 right-4 z-30 w-[320px] bg-[hsl(var(--demo-card))] rounded-xl border border-[hsl(var(--demo-border))] shadow-xl shadow-black/10 overflow-hidden"
        >
          <div className="flex items-start gap-3 p-3.5">
            <div className={`w-9 h-9 rounded-lg ${toneCls.bg} flex items-center justify-center shrink-0`}>
              <Icon size={18} className={toneCls.text} strokeWidth={2} />
            </div>
            <div className="flex-1 min-w-0 pt-0.5">
              <p className="text-[13px] font-semibold text-[hsl(var(--demo-foreground))] leading-tight">
                {title}
              </p>
              {subtitle && (
                <p className="text-xs text-[hsl(var(--demo-muted-foreground))] mt-0.5 leading-snug">
                  {subtitle}
                </p>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
