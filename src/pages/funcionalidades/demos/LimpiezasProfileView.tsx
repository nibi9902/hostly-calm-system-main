import { ArrowLeft, Phone, ChevronDown, Plus, CheckCircle2, Circle, Trash2 } from 'lucide-react';
import { spring } from '@/hooks/usePlaybackFrame';

/* ─── Tokens ─── */
const colors = {
  bg: '#FFFFFF',
  foreground: '#111827',
  mutedFg: '#6B7280',
  meta: '#9CA3AF',
  primary: '#2563EB',
  border: '#E5E7EB',
  success: '#16A34A',
  successSoft: '#ECFDF5',
  orange: '#F97316',
  muted: '#F3F4F6',
} as const;
const fontFamily = 'Inter, -apple-system, sans-serif';

/* ─── Historial entries — replica de la captura ─── */
const HISTORY = [
  {
    id: '1',
    name: 'judit masip parramon',
    date: '20 Abr.',
    apartment: 'Luminoso Apartamento a 4 min del Museo Dalí',
    refCode: '5770048427',
    price: 25,
    paid: false,
  },
  {
    id: '2',
    name: 'Florian Lienhard',
    date: '13 Abr.',
    apartment: 'Luminoso Apartamento a 4 min del Museo Dalí',
    refCode: '5216285784',
    price: 25,
    paid: true,
  },
  {
    id: '3',
    name: 'Rosa Maria Sans',
    date: '10 Abr.',
    apartment: 'Luminoso Apartamento a 4 min del Museo Dalí',
    refCode: 'HM3RNQW43Q',
    price: 25,
    paid: true,
  },
];

/* ─────────────────────────────────────────────────────────────
   MAIN — perfil Eva amb stats + historial
   Timeline:
      5  → header (back, name, phone, + Neteja)
      18 → month pill ("Abril 2026")
      28 → KPIs (3 / 75€ / 25€)
      55 → botó "Marcar tot com pagat"
      75 → label HISTORIAL
      85 → row 1 (judit, pendent)
      95 → row 2 (Florian, pagat)
     105 → row 3 (Rosa, pagat)
───────────────────────────────────────────────────────────── */

export default function LimpiezasProfileView({ frame, fps }: { frame: number; fps: number }) {
  const headerP   = spring(frame - 5,   fps, { damping: 20, stiffness: 180 });
  const monthP    = spring(frame - 18,  fps, { damping: 20, stiffness: 180 });
  const kpi1P     = spring(frame - 28,  fps, { damping: 20, stiffness: 170 });
  const kpi2P     = spring(frame - 33,  fps, { damping: 20, stiffness: 170 });
  const kpi3P     = spring(frame - 38,  fps, { damping: 20, stiffness: 170 });
  const buttonP   = spring(frame - 55,  fps, { damping: 18, stiffness: 170 });
  const labelP    = spring(frame - 75,  fps, { damping: 20, stiffness: 180 });
  const row1P     = spring(frame - 85,  fps, { damping: 20, stiffness: 170 });
  const row2P     = spring(frame - 95,  fps, { damping: 20, stiffness: 170 });
  const row3P     = spring(frame - 105, fps, { damping: 20, stiffness: 170 });

  const rowProgress = [row1P, row2P, row3P];

  return (
    <div style={{
      background: colors.bg,
      padding: '14px 16px 18px',
      fontFamily,
      minHeight: '440px',
      overflow: 'hidden',
    }}>
      {/* ── Header ── */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 8,
        opacity: headerP,
        transform: `translateY(${(1 - headerP) * 4}px)`,
      }}>
        <button style={{
          padding: 4, borderRadius: 8,
          background: 'transparent', border: 'none', cursor: 'pointer',
          color: colors.foreground,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <ArrowLeft size={16} />
        </button>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{
            fontSize: 15, fontWeight: 700, color: colors.foreground,
            textTransform: 'capitalize', lineHeight: 1.1,
          }}>
            Eva
          </div>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 3,
            fontSize: 10, color: colors.mutedFg, marginTop: 2,
          }}>
            <Phone size={10} /> 34679042408
          </div>
        </div>
        <button style={{
          display: 'flex', alignItems: 'center', gap: 4,
          padding: '6px 12px', borderRadius: 999,
          background: colors.primary, color: '#fff',
          fontSize: 11, fontWeight: 600,
          border: 'none', cursor: 'pointer',
          flexShrink: 0,
        }}>
          <Plus size={11} /> Limpieza
        </button>
      </div>

      {/* ── Month pill ── */}
      <div style={{
        display: 'flex', justifyContent: 'center',
        padding: '14px 0 4px',
        opacity: monthP,
        transform: `translateY(${(1 - monthP) * 4}px)`,
      }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 4,
          padding: '5px 12px', borderRadius: 999,
          background: colors.muted,
          fontSize: 11, fontWeight: 600, color: colors.foreground,
        }}>
          Abril 2026 <ChevronDown size={11} strokeWidth={2.5} />
        </div>
      </div>

      {/* ── KPIs ── */}
      <div style={{
        display: 'flex', justifyContent: 'center', gap: 36,
        padding: '24px 0',
        borderBottom: `1px solid ${colors.border}`,
      }}>
        <KPI value="3"       label="Limpiezas" color={colors.foreground} progress={kpi1P} />
        <KPI value="75€"     label="Total"     color={colors.foreground} progress={kpi2P} />
        <KPI value="25€"     label="Pendiente" color={colors.orange}     progress={kpi3P} />
      </div>

      {/* ── Marcar tot com pagat ── */}
      <div style={{
        padding: '16px 0',
        borderBottom: `1px solid ${colors.border}`,
        opacity: buttonP,
        transform: `translateY(${(1 - buttonP) * 4}px)`,
      }}>
        <button style={{
          width: '100%', height: 38,
          borderRadius: 999,
          background: colors.primary,
          color: '#fff',
          fontSize: 12, fontWeight: 600,
          border: 'none', cursor: 'pointer',
        }}>
          Marcar todo como pagado · 25€
        </button>
      </div>

      {/* ── HISTORIAL label ── */}
      <div style={{
        paddingTop: 16, paddingBottom: 4,
        opacity: labelP,
      }}>
        <span style={{
          fontSize: 9, fontWeight: 700,
          textTransform: 'uppercase', letterSpacing: '0.08em',
          color: colors.meta,
        }}>
          Historial
        </span>
      </div>

      {/* ── Historial entries ── */}
      {HISTORY.map((entry, i) => (
        <HistoryRow key={entry.id} entry={entry} progress={rowProgress[i]} />
      ))}
    </div>
  );
}

/* ─── KPI cell ─── */
const KPI: React.FC<{ value: string; label: string; color: string; progress: number }> = ({
  value, label, color, progress,
}) => (
  <div style={{
    textAlign: 'center',
    opacity: progress,
    transform: `translateY(${(1 - progress) * 6}px)`,
  }}>
    <div style={{
      fontSize: 26, fontWeight: 700, color, lineHeight: 1,
      fontVariantNumeric: 'tabular-nums',
    }}>
      {value}
    </div>
    <div style={{ fontSize: 10, color: colors.meta, marginTop: 5 }}>
      {label}
    </div>
  </div>
);

/* ─── History row ─── */
const HistoryRow: React.FC<{
  entry: typeof HISTORY[number];
  progress: number;
}> = ({ entry, progress }) => {
  if (progress <= 0) return null;
  return (
    <div style={{
      padding: '12px 0',
      borderBottom: `1px solid ${colors.border}`,
      opacity: progress,
      transform: `translateY(${(1 - progress) * 6}px)`,
      display: 'flex', alignItems: 'center', gap: 10,
    }}>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{
            fontSize: 11, fontWeight: 600, color: colors.foreground,
            overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
          }}>
            {entry.name}
          </span>
          <span style={{ fontSize: 10, color: colors.meta, flexShrink: 0 }}>
            {entry.date}
          </span>
        </div>
        <div style={{
          fontSize: 9, color: colors.meta, marginTop: 2,
          overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
        }}>
          {entry.apartment} · #{entry.refCode}
        </div>
      </div>

      <div style={{
        fontSize: 13, fontWeight: 700, color: colors.foreground,
        flexShrink: 0, fontVariantNumeric: 'tabular-nums',
      }}>
        {entry.price}€
      </div>

      <div style={{
        width: 22, height: 22, borderRadius: '50%',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexShrink: 0,
        background: entry.paid ? colors.successSoft : colors.muted,
        color: entry.paid ? colors.success : colors.meta,
      }}>
        {entry.paid
          ? <CheckCircle2 size={14} strokeWidth={2.5} />
          : <Circle size={14} strokeWidth={2.5} />}
      </div>

      <button style={{
        width: 22, height: 22, borderRadius: '50%',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: 'transparent', border: 'none', cursor: 'pointer',
        color: colors.meta,
        flexShrink: 0,
      }}>
        <Trash2 size={12} />
      </button>
    </div>
  );
};
