import { motion, AnimatePresence } from 'framer-motion';
import { Users, ChevronRight, Sparkles, CalendarPlus } from 'lucide-react';
import type { EventId } from '../timeline';
import { ContextToast } from '../ContextToast';

const ease = [0.22, 1, 0.36, 1] as const;

interface ResRow {
  id: string;
  nom: string;
  persones: number;
  typeLabel: 'Entrada' | 'Sortida';
  type: 'checkin' | 'checkout';
  checkInDone: boolean;
  cleaningConfirmed: boolean;
  apartament: string;
  highlight?: boolean;
}

const INITIAL_ROWS: ResRow[] = [
  {
    id: 'r1', nom: 'Sophie Martin', persones: 2, typeLabel: 'Entrada', type: 'checkin',
    checkInDone: true, cleaningConfirmed: true, apartament: 'Apartament Centre',
  },
  {
    id: 'r2', nom: 'Anna Rossi', persones: 2, typeLabel: 'Entrada', type: 'checkin',
    checkInDone: false, cleaningConfirmed: true, apartament: 'Estudi Gràcia',
  },
  {
    id: 'r3', nom: 'Tom Weber', persones: 3, typeLabel: 'Sortida', type: 'checkout',
    checkInDone: true, cleaningConfirmed: false, apartament: 'Àtic Diagonal',
  },
];

const NEW_RESERVATION: ResRow = {
  id: 'r-new',
  nom: 'David Taisne',
  persones: 3,
  typeLabel: 'Entrada',
  type: 'checkin',
  checkInDone: false,
  cleaningConfirmed: false,
  apartament: 'Apartament Mar',
  highlight: true,
};

export function ResumView({ event }: { event: EventId }) {
  const showPriceSurge = event === 'price-surge';
  const showNewBooking = event === 'new-booking';
  const rows = event === 'new-booking' ? [NEW_RESERVATION, ...INITIAL_ROWS] : INITIAL_ROWS;

  return (
    <div className="h-full bg-[hsl(var(--demo-card))] flex flex-col relative" data-cursor="toast-area">
      {/* Header */}
      <div className="shrink-0 px-8 pt-6 pb-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-[hsl(var(--demo-foreground))]">Resum</h1>
          <div className="flex items-center gap-1">
            {[3, 5, 7].map((n) => (
              <button
                key={n}
                className={`px-2.5 py-1 rounded-full text-xs font-medium transition-colors ${
                  n === 3
                    ? 'bg-[hsl(var(--demo-primary))] text-white'
                    : 'text-[hsl(var(--demo-meta))]'
                }`}
              >
                {n}d
              </button>
            ))}
          </div>
        </div>
        <p className="text-sm text-[hsl(var(--demo-meta))] mt-0.5">8 abr – 10 abr 2026</p>
      </div>

      {/* Toasts contextual */}
      <ContextToast
        show={showPriceSurge}
        icon={Sparkles}
        tone="warning"
        title="Setmana Santa detectada"
        subtitle="Preus ajustats automàticament +15 %"
      />
      <ContextToast
        show={showNewBooking}
        icon={CalendarPlus}
        tone="primary"
        title="Nova reserva rebuda"
        subtitle="David Taisne · Apartament Mar · 840 €"
      />

      {/* Content */}
      <div className="flex-1 min-h-0 overflow-y-auto px-8">
        {/* Day header */}
        <div className="pt-2 pb-2 flex items-baseline gap-2">
          <span className="text-[10px] font-bold uppercase tracking-[0.08em] text-[hsl(var(--demo-primary))]">
            Avui
          </span>
          <span className="text-[10px] text-[hsl(var(--demo-meta))] font-medium">
            {rows.filter((r) => r.type === 'checkin').length} entrades · {rows.filter((r) => r.type === 'checkout').length} sortides
          </span>
        </div>

        <AnimatePresence initial={false}>
          {rows.map((r) => (
            <ReservationRow key={r.id} row={r} />
          ))}
        </AnimatePresence>

        {/* Demà header */}
        <div
          className="pt-5 pb-2 flex items-baseline gap-2 capitalize"
          style={{ borderTop: '1px solid hsl(var(--demo-border) / 0.4)' }}
        >
          <span className="text-[10px] font-bold uppercase tracking-[0.08em] text-[hsl(var(--demo-meta))]">
            Demà
          </span>
          <span className="text-[10px] text-[hsl(var(--demo-meta))] font-medium">2 entrades</span>
        </div>
        <ReservationRow
          row={{
            id: 'r4', nom: 'Lucas Silva', persones: 4, typeLabel: 'Entrada', type: 'checkin',
            checkInDone: false, cleaningConfirmed: true, apartament: 'Apartament Mar',
          }}
        />
      </div>
    </div>
  );
}

function ReservationRow({ row }: { row: ResRow }) {
  const leftAccent = !row.checkInDone || !row.cleaningConfirmed
    ? 'border-l-2 border-l-[hsl(var(--demo-warning))]/60 pl-3'
    : '';

  return (
    <motion.div
      layout
      data-cursor={row.highlight ? 'new-booking-row' : undefined}
      initial={row.highlight ? { opacity: 0, y: -16, scale: 0.98 } : false}
      animate={{
        opacity: 1,
        y: 0,
        scale: 1,
        backgroundColor: row.highlight
          ? ['hsla(217,91%,60%,0)', 'hsla(217,91%,60%,0.14)', 'hsla(217,91%,60%,0.06)', 'hsla(217,91%,60%,0)']
          : 'hsla(0,0%,100%,0)',
      }}
      transition={{ duration: 0.55, ease, backgroundColor: { duration: 2.8, times: [0, 0.25, 0.5, 1] } }}
      className={`w-full py-4 flex items-center gap-3 ${leftAccent}`}
      style={{ borderBottom: '1px solid hsl(var(--demo-border) / 0.6)' }}
    >
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <p className="text-base font-medium text-[hsl(var(--demo-foreground))] truncate">{row.nom}</p>
          <span
            className={`text-xs font-medium px-2 py-0.5 rounded-full ${
              row.type === 'checkin'
                ? 'text-[hsl(var(--demo-primary))] bg-[hsl(var(--demo-accent-soft))]'
                : 'text-[hsl(24,94%,50%)] bg-[hsl(33,100%,96%)]'
            }`}
          >
            {row.typeLabel}
          </span>
          <div className="flex items-center gap-1 text-sm text-[hsl(var(--demo-meta))] shrink-0 ml-auto">
            <Users className="w-3.5 h-3.5" />
            <span>{row.persones}</span>
          </div>
        </div>
        <div className="flex items-center gap-3 mt-1.5 text-sm text-[hsl(var(--demo-muted-foreground))]">
          {row.type === 'checkin' && (
            <div className="flex items-center gap-1.5">
              <div
                className={`w-1.5 h-1.5 rounded-full ${row.checkInDone ? 'bg-[hsl(var(--demo-success))]' : 'bg-[hsl(var(--demo-warning))]'}`}
              />
              <span>Check-in</span>
            </div>
          )}
          <div className="flex items-center gap-1.5">
            <div
              className={`w-1.5 h-1.5 rounded-full ${row.cleaningConfirmed ? 'bg-[hsl(var(--demo-success))]' : 'bg-[hsl(var(--demo-warning))]'}`}
            />
            <span>Neteja</span>
          </div>
          <span className="text-[hsl(var(--demo-meta))] ml-auto truncate max-w-[140px]">{row.apartament}</span>
        </div>
      </div>
      <ChevronRight className="h-4 w-4 text-[hsl(var(--demo-muted-foreground))]/30 shrink-0" />
    </motion.div>
  );
}
