import { motion } from 'framer-motion';
import { CheckCircle2, Image as ImageIcon } from 'lucide-react';
import type { EventId } from '../timeline';

const ease = [0.22, 1, 0.36, 1] as const;

interface CleaningRow {
  id: string;
  apartment: string;
  cleaner: string;
  date: string;
  price: number;
  status: 'pending' | 'done';
  photos?: number;
}

const ROWS_BASE: CleaningRow[] = [
  { id: 'n1', apartment: 'Apartament Centre', cleaner: 'Eva', date: '11 abr', price: 70, status: 'done', photos: 6 },
  { id: 'n2', apartment: 'Apartament Mar', cleaner: 'Marta', date: '12 abr · 10:00', price: 85, status: 'pending' },
  { id: 'n3', apartment: 'Estudi Gràcia', cleaner: 'Eva', date: '13 abr', price: 60, status: 'pending' },
];

export function NetejaView({ event }: { event: EventId }) {
  const rows: CleaningRow[] = ROWS_BASE.map((r) =>
    r.id === 'n2' && event === 'cleaning-done' ? { ...r, status: 'done', photos: 8 } : r,
  );

  return (
    <div className="h-full flex flex-col bg-[hsl(var(--demo-card))]">
      <div className="px-8 pt-6 pb-4">
        <h1 className="text-2xl font-semibold text-[hsl(var(--demo-foreground))]">Neteja</h1>
        <p className="text-sm text-[hsl(var(--demo-meta))] mt-0.5">3 apartaments · 2 persones</p>
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto px-8">
        <div className="pt-2 pb-2">
          <span className="text-[10px] font-bold uppercase tracking-[0.08em] text-[hsl(var(--demo-primary))]">
            Programades
          </span>
        </div>

        {rows.map((r) => (
          <motion.div
            layout
            key={r.id}
            className="w-full py-4 flex items-center gap-3"
            style={{ borderBottom: '1px solid hsl(var(--demo-border) / 0.6)' }}
          >
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <p className="text-base font-medium text-[hsl(var(--demo-foreground))] truncate">{r.apartment}</p>
                <motion.span
                  layout
                  key={`${r.id}-${r.status}`}
                  initial={r.id === 'n2' && event === 'cleaning-done' ? { scale: 0.6, opacity: 0 } : false}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5, ease }}
                  className={`text-xs font-medium px-2 py-0.5 rounded-full inline-flex items-center gap-1 ${
                    r.status === 'done'
                      ? 'text-[hsl(var(--demo-success))] bg-[hsl(var(--demo-success-soft))]'
                      : 'text-[hsl(var(--demo-warning))] bg-[hsl(var(--demo-warning-soft))]'
                  }`}
                >
                  {r.status === 'done' && <CheckCircle2 size={11} />}
                  {r.status === 'done' ? 'Feta' : 'Pendent'}
                </motion.span>
              </div>
              <div className="flex items-center gap-3 text-sm text-[hsl(var(--demo-muted-foreground))]">
                <span>{r.cleaner}</span>
                <span>·</span>
                <span>{r.date}</span>
                <span className="ml-auto text-[hsl(var(--demo-foreground))] font-medium">{r.price} €</span>
              </div>
              {r.photos && (
                <motion.div
                  initial={r.id === 'n2' && event === 'cleaning-done' ? { opacity: 0, y: 4 } : false}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3, ease }}
                  className="mt-2 flex items-center gap-1.5 text-xs text-[hsl(var(--demo-success))]"
                >
                  <ImageIcon size={12} />
                  <span>{r.photos} fotos confirmades</span>
                </motion.div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
