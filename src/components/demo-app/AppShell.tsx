import { motion } from 'framer-motion';
import type { TabId } from './timeline';

const NAV_ITEMS: { id: TabId; label: string }[] = [
  { id: 'today', label: 'Resum' },
  { id: 'cleaning', label: 'Neteja' },
  { id: 'chat', label: 'Xat' },
  { id: 'apartment', label: 'Gestió' },
];

/**
 * Reproducció fidel del DesktopTopNav de l'app real.
 */
export function AppShell({ activeTab, children }: { activeTab: TabId; children: React.ReactNode }) {
  return (
    <div className="demo-scope w-full h-full flex flex-col bg-[hsl(var(--demo-background))]">
      {/* Header h-10 amb logo + nav centrat + apartment selector */}
      <header className="relative flex items-center h-10 px-5 bg-[hsl(var(--demo-card))] border-b border-[hsl(var(--demo-border))] shrink-0">
        <div className="flex items-center gap-1.5 opacity-60">
          <div className="w-[18px] h-[18px] rounded-[5px] bg-[hsl(var(--demo-primary))] flex items-center justify-center">
            <span className="text-white font-bold text-[10px]">H</span>
          </div>
          <span className="text-[13px] font-semibold text-[hsl(var(--demo-foreground))] tracking-tight">hostly</span>
        </div>

        <nav className="absolute left-1/2 -translate-x-1/2 flex items-center gap-10">
          {NAV_ITEMS.map(({ id, label }) => {
            const isActive = activeTab === id;
            return (
              <button
                key={id}
                data-cursor={`tab-${id}`}
                className="relative text-base tracking-wide transition-all duration-300"
                style={{
                  fontWeight: isActive ? 350 : 200,
                  color: isActive ? 'hsl(var(--demo-foreground))' : 'hsl(var(--demo-muted-foreground) / 0.35)',
                  textShadow: isActive ? '0 0 18px rgba(0,0,0,0.12)' : 'none',
                }}
              >
                {label}
                {isActive && (
                  <motion.span
                    layoutId="nav-indicator"
                    className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[hsl(var(--demo-primary))]"
                    transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                  />
                )}
              </button>
            );
          })}
        </nav>

        <div className="ml-auto flex items-center gap-2.5">
          <div className="h-6 px-2.5 rounded-full bg-[hsl(var(--demo-muted))] flex items-center gap-1.5">
            <motion.div
              className="w-1.5 h-1.5 rounded-full bg-[hsl(var(--demo-primary))]"
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
            />
            <span className="text-[11px] text-[hsl(var(--demo-foreground))] font-medium">Apartament Mar</span>
          </div>
          <div className="w-px h-3.5 bg-[hsl(var(--demo-border))]" />
          <span className="text-[11px] text-[hsl(var(--demo-muted-foreground))]/60">Sortir</span>
        </div>
      </header>

      {/* Content */}
      <div className="flex-1 min-h-0 relative overflow-hidden">{children}</div>
    </div>
  );
}
