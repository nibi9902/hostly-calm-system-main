import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Users, Landmark, ChevronRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import type { EventId, Step } from '../timeline';

const ease = [0.22, 1, 0.36, 1] as const;

export function GestioView({ event, subTab }: { event: EventId; subTab?: Step['subTab'] }) {
  if (subTab === 'legal') return <LegalView event={event} />;
  if (subTab === 'finances') return <FinancesView event={event} />;
  if (subTab === 'tax') return <TaxView event={event} />;
  return <GestioHome />;
}

/* ──────────────────────────────────────
 * Gestió home (fall-back, rarament usat)
 * ─────────────────────────────────── */
function GestioHome() {
  return (
    <div className="h-full flex flex-col bg-[hsl(var(--demo-card))]">
      <div className="px-8 pt-6 pb-4">
        <h1 className="text-2xl font-semibold text-[hsl(var(--demo-foreground))]">Gestió</h1>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────
 * Legal — Check-in + Mossos
 * ─────────────────────────────────── */
function LegalView({ event }: { event: EventId }) {
  const stamped = event === 'checkin-police';

  return (
    <div className="h-full flex flex-col bg-[hsl(var(--demo-card))]">
      <div className="px-8 pt-6 pb-4">
        <div className="flex items-center gap-2 text-xs text-[hsl(var(--demo-meta))] mb-2">
          <span>Gestió</span>
          <ChevronRight size={12} />
          <span className="text-[hsl(var(--demo-foreground))]">Legal</span>
        </div>
        <h1 className="text-2xl font-semibold text-[hsl(var(--demo-foreground))]">Check-in · Mossos</h1>
        <p className="text-sm text-[hsl(var(--demo-meta))] mt-0.5">Registre d'hostes i enviament legal</p>
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto px-8">
        <div className="pt-2 pb-2">
          <span className="text-[10px] font-bold uppercase tracking-[0.08em] text-[hsl(var(--demo-primary))]">Darrer check-in</span>
        </div>

        <div className="relative bg-[hsl(var(--demo-muted))] rounded-2xl p-5 mb-4">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-base font-semibold text-[hsl(var(--demo-foreground))]">David Taisne</p>
              <p className="text-sm text-[hsl(var(--demo-muted-foreground))] mt-0.5">Apartament Mar · 6 nits</p>
            </div>
            <Users size={18} className="text-[hsl(var(--demo-muted-foreground))]" />
          </div>

          <div className="space-y-2">
            {[
              { name: 'David Taisne', dni: '85-XXXXX-FR' },
              { name: 'Claire Taisne', dni: '85-XXXXX-FR' },
              { name: 'Lucas Taisne (menor)', dni: '85-XXXXX-FR' },
            ].map((p) => (
              <div
                key={p.name}
                className="bg-[hsl(var(--demo-card))] rounded-xl px-4 py-2.5 flex items-center gap-3 border border-[hsl(var(--demo-border))]"
              >
                <div className="w-8 h-8 rounded-full bg-[hsl(var(--demo-accent-soft))] flex items-center justify-center">
                  <span className="text-xs font-semibold text-[hsl(var(--demo-primary))]">
                    {p.name.split(' ').slice(0, 2).map((n) => n[0]).join('')}
                  </span>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-[hsl(var(--demo-foreground))]">{p.name}</p>
                  <p className="text-xs text-[hsl(var(--demo-meta))]">{p.dni}</p>
                </div>
                <div className="w-5 h-5 rounded-full bg-[hsl(var(--demo-success-soft))] flex items-center justify-center">
                  <motion.svg
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.5, delay: 0.3, ease }}
                    width="10"
                    height="10"
                    viewBox="0 0 10 10"
                    fill="none"
                  >
                    <motion.path
                      d="M2 5 L4.5 7.5 L8 3"
                      stroke="hsl(var(--demo-success))"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      fill="none"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.45, delay: 0.35, ease }}
                    />
                  </motion.svg>
                </div>
              </div>
            ))}
          </div>

          {/* Stamp Mossos */}
          <AnimatePresence>
            {stamped && (
              <motion.div
                initial={{ opacity: 0, scale: 1.4, rotate: -8 }}
                animate={{ opacity: 1, scale: 1, rotate: -8 }}
                transition={{ duration: 0.5, delay: 1.8, ease }}
                className="absolute -top-3 -right-3 px-3 py-1.5 rounded-lg border-2 border-[hsl(var(--demo-success))] bg-[hsl(var(--demo-card))] flex items-center gap-1.5 shadow-lg"
              >
                <ShieldCheck size={14} className="text-[hsl(var(--demo-success))]" />
                <span className="text-[11px] font-bold text-[hsl(var(--demo-success))] uppercase tracking-wider">
                  Enviat a Mossos
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {stamped && (
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 2.3, ease }}
            className="text-xs text-[hsl(var(--demo-success))] font-medium text-center"
          >
            Completat automàticament en 2 minuts
          </motion.p>
        )}
      </div>
    </div>
  );
}

/* ──────────────────────────────────────
 * Finances — Resum mes amb count-up
 * ─────────────────────────────────── */
function useCountUp(target: number, active: boolean, duration = 1800) {
  const [val, setVal] = useState(active ? 0 : target);
  useEffect(() => {
    if (!active) {
      setVal(target);
      return;
    }
    setVal(0);
    let raf = 0;
    const start = performance.now();
    const tick = (t: number) => {
      const p = Math.min((t - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(target * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, active, duration]);
  return val;
}

function FinancesView({ event }: { event: EventId }) {
  const active = event === 'finance-summary';
  const gross = useCountUp(4320, active);
  const reservations = useCountUp(8, active, 1200);
  const occupancy = useCountUp(82, active, 1500);

  return (
    <div className="h-full flex flex-col bg-[hsl(var(--demo-card))]">
      <div className="px-8 pt-6 pb-4">
        <div className="flex items-center gap-2 text-xs text-[hsl(var(--demo-meta))] mb-2">
          <span>Gestió</span>
          <ChevronRight size={12} />
          <span className="text-[hsl(var(--demo-foreground))]">Finances</span>
        </div>
        <h1 className="text-2xl font-semibold text-[hsl(var(--demo-foreground))]">Resum del mes</h1>
        <p className="text-sm text-[hsl(var(--demo-meta))] mt-0.5">Març 2026</p>
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto px-8 space-y-4">
        <div className="grid grid-cols-3 gap-3">
          <StatCard label="Ingressos bruts" value={`${gross.toLocaleString('ca-ES')} €`} accent />
          <StatCard label="Reserves" value={reservations.toString()} />
          <StatCard label="Ocupació" value={`${occupancy} %`} />
        </div>

        <div className="rounded-2xl border border-[hsl(var(--demo-border))] overflow-hidden">
          <div className="px-5 py-3 border-b border-[hsl(var(--demo-border))] flex items-center justify-between">
            <h3 className="text-sm font-semibold text-[hsl(var(--demo-foreground))]">Per plataforma</h3>
          </div>
          {[
            { platform: 'Airbnb', amount: 2640, color: 'hsl(0 85% 60%)' },
            { platform: 'Booking', amount: 1380, color: 'hsl(var(--demo-primary))' },
            { platform: 'Directes', amount: 300, color: 'hsl(var(--demo-meta))' },
          ].map((p, i) => (
            <div
              key={p.platform}
              className="px-5 py-3 flex items-center justify-between"
              style={{ borderBottom: i < 2 ? '1px solid hsl(var(--demo-border) / 0.6)' : 'none' }}
            >
              <div className="flex items-center gap-2.5">
                <div className="w-1.5 h-1.5 rounded-full" style={{ background: p.color }} />
                <span className="text-sm text-[hsl(var(--demo-foreground))]">{p.platform}</span>
              </div>
              <span className="text-sm font-medium text-[hsl(var(--demo-foreground))]">{p.amount.toLocaleString('ca-ES')} €</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div
      className={`rounded-2xl border p-5 ${
        accent
          ? 'border-[hsl(var(--demo-accent-border))] bg-[hsl(var(--demo-accent-soft))]'
          : 'border-[hsl(var(--demo-border))] bg-[hsl(var(--demo-card))]'
      }`}
    >
      <p className="text-xs text-[hsl(var(--demo-muted-foreground))]">{label}</p>
      <p
        className={`text-3xl font-semibold mt-1 tracking-tight ${
          accent ? 'text-[hsl(var(--demo-primary))]' : 'text-[hsl(var(--demo-foreground))]'
        }`}
      >
        {value}
      </p>
    </div>
  );
}

/* ──────────────────────────────────────
 * Taxa turística Q1
 * ─────────────────────────────────── */
function TaxView({ event }: { event: EventId }) {
  const ready = event === 'tax-ready';

  return (
    <div className="h-full flex flex-col bg-[hsl(var(--demo-card))]">
      <div className="px-8 pt-6 pb-4">
        <div className="flex items-center gap-2 text-xs text-[hsl(var(--demo-meta))] mb-2">
          <span>Gestió</span>
          <ChevronRight size={12} />
          <span className="text-[hsl(var(--demo-foreground))]">Taxa turística</span>
        </div>
        <h1 className="text-2xl font-semibold text-[hsl(var(--demo-foreground))]">Taxa turística</h1>
        <p className="text-sm text-[hsl(var(--demo-meta))] mt-0.5">Primer trimestre 2026</p>
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto px-8">
        <motion.div
          initial={ready ? { opacity: 0, y: 12 } : false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease }}
          className="rounded-2xl border border-[hsl(var(--demo-border))] bg-[hsl(var(--demo-card))] p-5 mb-4"
        >
          <div className="flex items-start gap-4">
            <div className="w-11 h-11 rounded-xl bg-[hsl(var(--demo-warning-soft))] flex items-center justify-center shrink-0">
              <Landmark size={20} className="text-[hsl(var(--demo-warning))]" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-base font-semibold text-[hsl(var(--demo-foreground))]">Presentació Q1</h3>
                <AnimatePresence>
                  {ready && (
                    <motion.span
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4, delay: 0.6, ease }}
                      className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[hsl(var(--demo-success-soft))] text-[hsl(var(--demo-success))] uppercase tracking-wider"
                    >
                      Preparada
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
              <p className="text-sm text-[hsl(var(--demo-muted-foreground))]">Termini fins al 20 d'abril</p>
            </div>
          </div>

          <div className="mt-5 pt-4 border-t border-[hsl(var(--demo-border))] grid grid-cols-3 gap-4">
            <Mini label="Hostes" value="48" delay={0.7} ready={ready} />
            <Mini label="Nits" value="184" delay={0.8} ready={ready} />
            <Mini label="Taxa total" value="276 €" delay={0.9} ready={ready} />
          </div>
        </motion.div>

        {ready && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 1.1, ease }}
            className="text-center"
          >
            <button
              data-cursor="tax-cta"
              className="h-11 px-6 rounded-xl bg-[hsl(var(--demo-primary))] text-white text-sm font-medium"
            >
              Veure pas a pas
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}

function Mini({ label, value, delay, ready }: { label: string; value: string; delay: number; ready: boolean }) {
  return (
    <motion.div
      initial={ready ? { opacity: 0, y: 6 } : false}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay, ease }}
    >
      <p className="text-xs text-[hsl(var(--demo-muted-foreground))]">{label}</p>
      <p className="text-lg font-semibold text-[hsl(var(--demo-foreground))] mt-0.5">{value}</p>
    </motion.div>
  );
}
