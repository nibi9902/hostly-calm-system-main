import { ArrowRight, RotateCcw } from 'lucide-react';

export function CTAEnd({ onReplay }: { onReplay: () => void }) {
  return (
    <div
      className="w-[min(520px,92vw)] bg-[hsl(var(--demo-card))] rounded-2xl border border-[hsl(var(--demo-border))] shadow-2xl shadow-black/10 overflow-hidden p-8 text-center cta-end-enter"
    >
      <h2 className="text-2xl font-semibold text-[hsl(var(--demo-foreground))] tracking-tight mb-2">
        Així treballa Hostly per tu
      </h2>
      <p className="text-sm text-[hsl(var(--demo-muted-foreground))] mb-6">
        Tota l'operativa coordinada en un sol lloc, sense dependre de tu.
      </p>
      <div className="flex flex-col sm:flex-row gap-2.5 justify-center">
        <button
          className="h-11 px-6 rounded-xl bg-[hsl(var(--demo-primary))] text-white font-medium text-sm inline-flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
          onClick={() => {}}
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
      </div>
    </div>
  );
}
