import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { AppShell } from './AppShell';
import { ResumView } from './views/ResumView';
import { ChatDemoView } from './views/ChatDemoView';
import { NetejaView } from './views/NetejaView';
import { GestioView } from './views/GestioView';
import { CTAEnd } from './CTAEnd';
import { TIMELINE } from './timeline';

const ease = [0.22, 1, 0.36, 1] as const;

export function DemoPlayer() {
  const [stepIdx, setStepIdx] = useState(0);
  const timerRef = useRef<number | null>(null);

  const step = TIMELINE[stepIdx];
  const isEnd = step?.event === 'end';

  useEffect(() => {
    if (!step || isEnd) return;
    timerRef.current = window.setTimeout(() => {
      setStepIdx((i) => Math.min(i + 1, TIMELINE.length - 1));
    }, step.duration);
    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
  }, [step, isEnd]);

  const handleReplay = () => {
    if (timerRef.current) window.clearTimeout(timerRef.current);
    setStepIdx(0);
  };

  if (!step) return null;

  // Clau única per view — força remount quan canvia el subTab o el chatPeer
  const viewKey = `${step.tab}-${step.subTab ?? ''}-${step.chatPeer ?? ''}`;

  return (
    <div className="demo-scope fixed inset-0 bg-[hsl(210,15%,90%)] flex items-center justify-center p-8 overflow-hidden">
      {/* Device frame macOS-like */}
      <div className="w-full max-w-[1180px] h-[720px] bg-[hsl(var(--demo-card))] rounded-2xl shadow-[0_30px_80px_rgba(0,0,0,0.2)] overflow-hidden border border-black/5 relative">
        {/* Browser chrome subtil */}
        <div className="h-7 bg-[hsl(var(--demo-muted))] border-b border-[hsl(var(--demo-border))] flex items-center gap-1.5 px-3">
          <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
          <div className="flex-1 flex justify-center">
            <div className="px-3 py-0.5 rounded-md bg-[hsl(var(--demo-card))] text-[10px] text-[hsl(var(--demo-meta))] font-medium">
              app.hostlylabs.com
            </div>
          </div>
        </div>

        {/* App real */}
        {!isEnd && (
          <AppShell activeTab={step.tab}>
            <motion.div
              key={viewKey}
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.35, ease }}
              className="absolute inset-0"
            >
              {step.tab === 'today' && <ResumView event={step.event} />}
              {step.tab === 'chat' && <ChatDemoView event={step.event} chatPeer={step.chatPeer} />}
              {step.tab === 'cleaning' && <NetejaView event={step.event} />}
              {step.tab === 'apartment' && <GestioView event={step.event} subTab={step.subTab} />}
            </motion.div>
          </AppShell>
        )}

        {/* CTA final cobreix el frame */}
        {isEnd && (
          <div className="absolute inset-0 top-7 flex items-center justify-center bg-[hsl(var(--demo-background))]">
            <CTAEnd onReplay={handleReplay} />
          </div>
        )}
      </div>

      {/* Caption inferior */}
      {!isEnd && step.caption && (
        <motion.div
          key={viewKey + step.event}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease }}
          className="absolute bottom-10 left-0 right-0 text-center px-4"
        >
          <p className="text-sm text-[hsl(var(--demo-muted-foreground))] max-w-xl mx-auto">
            {step.caption}
          </p>
        </motion.div>
      )}

      {/* Progress bar global */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center">
        <div className="flex items-center gap-1.5">
          {TIMELINE.slice(0, -1).map((_, i) => {
            const isActive = i === stepIdx;
            const isDone = i < stepIdx;
            return (
              <div
                key={i}
                className={`transition-all duration-300 rounded-full ${
                  isActive
                    ? 'w-6 h-1.5 bg-[hsl(var(--demo-primary))]'
                    : isDone
                      ? 'w-1.5 h-1.5 bg-[hsl(var(--demo-primary))]/50'
                      : 'w-1.5 h-1.5 bg-[hsl(var(--demo-border))]'
                }`}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
