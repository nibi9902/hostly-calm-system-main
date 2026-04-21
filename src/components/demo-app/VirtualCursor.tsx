import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const ease = [0.22, 1, 0.36, 1] as const;

interface Position {
  x: number;
  y: number;
}

/**
 * Cursor virtual que es mou a l'element que coincideix amb `targetSelector`.
 * Si s'activa `click`, mostra una onada d'impacte i una mini-animació al cursor.
 */
export function VirtualCursor({
  targetSelector,
  click,
  hidden,
}: {
  targetSelector: string | null;
  click: boolean;
  hidden?: boolean;
}) {
  const [pos, setPos] = useState<Position>({ x: 600, y: 500 });
  const [found, setFound] = useState(false);

  useEffect(() => {
    if (!targetSelector) return;
    // Retardem lleugerament perquè el DOM tingui temps d'actualitzar-se
    const t = window.setTimeout(() => {
      const el = document.querySelector<HTMLElement>(targetSelector);
      if (!el) {
        setFound(false);
        return;
      }
      const rect = el.getBoundingClientRect();
      setPos({
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
      });
      setFound(true);
    }, 50);
    return () => window.clearTimeout(t);
  }, [targetSelector]);

  if (hidden) return null;

  return (
    <motion.div
      animate={{ x: pos.x - 8, y: pos.y - 4, scale: click ? 0.88 : 1 }}
      transition={{
        x: { duration: 0.75, ease },
        y: { duration: 0.75, ease },
        scale: { duration: 0.18, ease },
      }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        pointerEvents: 'none',
        zIndex: 9999,
      }}
    >
      {/* Cursor SVG estil macOS */}
      <svg width="20" height="22" viewBox="0 0 20 22" fill="none" style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.25))' }}>
        <path
          d="M3 2.5 L3 18.5 L7.5 14.5 L10.5 20.5 L13 19 L10 13 L16.5 13 Z"
          fill="white"
          stroke="#0B0F1A"
          strokeWidth="1.3"
          strokeLinejoin="round"
        />
      </svg>

      {/* Ripple al fer click */}
      <AnimatePresence>
        {click && found && (
          <motion.div
            initial={{ opacity: 0.6, scale: 0 }}
            animate={{ opacity: 0, scale: 2.4 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease }}
            style={{
              position: 'absolute',
              top: 4,
              left: 8,
              width: 20,
              height: 20,
              borderRadius: '50%',
              border: '2px solid hsl(217 91% 60%)',
              pointerEvents: 'none',
            }}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}
