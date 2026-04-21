import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, AlertTriangle, ChevronRight, Sparkles, KeyRound } from 'lucide-react';
import type { EventId } from '../timeline';

const ease = [0.22, 1, 0.36, 1] as const;

function TypingIndicator() {
  return (
    <div className="flex items-center gap-1 mb-2.5">
      <div className="bg-[hsl(var(--demo-muted))] rounded-full px-3 py-2 inline-flex items-center gap-1">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="w-1.5 h-1.5 rounded-full bg-[hsl(var(--demo-meta))]"
            animate={{ opacity: [0.3, 1, 0.3], y: [0, -2, 0] }}
            transition={{ duration: 1, repeat: Infinity, delay: i * 0.15, ease: 'easeInOut' }}
          />
        ))}
      </div>
    </div>
  );
}

interface ConversationItem {
  id: string;
  name: string;
  apartment: string;
  snippet: string;
  time: string;
  needsHelp?: boolean;
  channel: 'airbnb' | 'whatsapp';
}

const CONVERSATIONS: ConversationItem[] = [
  { id: 'c-marta', name: 'Marta · Neteja', apartment: 'Apartament Mar', snippet: 'Neteja 12 abr · 10h', time: 'ara', channel: 'whatsapp' },
  { id: 'c-david', name: 'David Taisne', apartment: 'Apartament Mar', snippet: 'Hola! Benvingut a Barcelona…', time: 'ara', channel: 'airbnb' },
  { id: 'c-sophie', name: 'Sophie Martin', apartment: 'Apartament Centre', snippet: 'Merci beaucoup!', time: '2h', channel: 'airbnb' },
  { id: 'c-tom', name: 'Tom Weber', apartment: 'Àtic Diagonal', snippet: 'Entschuldigung, eine Frage…', time: '1d', channel: 'airbnb', needsHelp: true },
];

/**
 * Quan hi ha chatPeer, mostrem la conversa activa en lloc de la llista.
 */
export function ChatDemoView({ event, chatPeer }: { event: EventId; chatPeer?: 'marta' | 'david' }) {
  if (!chatPeer) return <ChatListView />;
  return <ConversationView event={event} peer={chatPeer} />;
}

function ChatListView() {
  return (
    <div className="h-full flex flex-col bg-[hsl(var(--demo-card))]">
      <div className="px-8 pt-6 pb-4">
        <h1 className="text-2xl font-semibold text-[hsl(var(--demo-foreground))]">Xat</h1>
      </div>
      <div className="flex-1 min-h-0 overflow-y-auto px-8">
        {CONVERSATIONS.map((c) => (
          <button
            key={c.id}
            className="w-full flex items-center gap-3 py-4 text-left"
            style={{ borderBottom: '1px solid hsl(var(--demo-border) / 0.6)' }}
          >
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 relative ${
                c.needsHelp ? 'bg-[hsl(var(--demo-destructive-soft))]' : 'bg-[hsl(var(--demo-muted))]'
              }`}
            >
              <span
                className={`text-xs font-semibold ${
                  c.needsHelp ? 'text-[hsl(var(--demo-destructive))]' : 'text-[hsl(var(--demo-muted-foreground))]'
                }`}
              >
                {c.name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()}
              </span>
              {c.needsHelp && (
                <div className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-[hsl(var(--demo-destructive))] rounded-full flex items-center justify-center">
                  <AlertTriangle size={10} className="text-white" />
                </div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2 mb-0.5">
                <span className="text-base font-medium text-[hsl(var(--demo-foreground))] truncate">{c.name}</span>
                <span className="text-xs text-[hsl(var(--demo-meta))] shrink-0">{c.time}</span>
              </div>
              <p className="text-sm text-[hsl(var(--demo-meta))] mb-0.5 truncate">{c.apartment}</p>
              <p className="text-sm text-[hsl(var(--demo-muted-foreground))] truncate">{c.snippet}</p>
            </div>
            <ChevronRight size={16} className="text-[hsl(var(--demo-muted-foreground))]/40 shrink-0" />
          </button>
        ))}
      </div>
    </div>
  );
}

interface Bubble {
  id: string;
  side: 'guest' | 'host';
  text: string;
  time: string;
  icon?: 'sparkles' | 'key';
}

function ConversationView({ event, peer }: { event: EventId; peer: 'marta' | 'david' }) {
  const peerName = peer === 'marta' ? 'Marta · Neteja' : 'David Taisne';
  const apartment = 'Apartament Mar';

  // Bombolles inicials + nova segons event
  const bubbles = buildBubbles(peer, event);

  // Typing indicator abans de la última bombolla "host" (IA escrivint)
  const [showTyping, setShowTyping] = useState(true);
  useEffect(() => {
    setShowTyping(true);
    const t = setTimeout(() => setShowTyping(false), 1400);
    return () => clearTimeout(t);
  }, [event, peer]);

  const lastBubble = bubbles[bubbles.length - 1];
  const showIndicator = showTyping && lastBubble?.side === 'host';
  const visibleBubbles = showTyping && lastBubble?.side === 'host' ? bubbles.slice(0, -1) : bubbles;

  return (
    <div className="h-full flex flex-col bg-[hsl(var(--demo-card))]">
      {/* Header conversa */}
      <div className="flex items-center gap-3 px-6 py-3 bg-[hsl(var(--demo-card))] shrink-0 border-b border-[hsl(var(--demo-border))]/60">
        <ArrowLeft size={20} className="text-[hsl(var(--demo-foreground))]" />
        <div className="flex-1 min-w-0">
          <h2 className="text-base font-semibold text-[hsl(var(--demo-foreground))] truncate">{peerName}</h2>
          <p className="text-xs text-[hsl(var(--demo-muted-foreground))] truncate">{apartment}</p>
        </div>
      </div>

      {/* Messages area */}
      <div className="flex-1 min-h-0 overflow-y-auto px-6 py-5">
        <div className="text-center mb-4">
          <span className="text-[10px] font-semibold text-[hsl(var(--demo-meta))] uppercase tracking-wider">
            Avui
          </span>
        </div>
        <AnimatePresence initial={false}>
          {visibleBubbles.map((b, i) => (
            <motion.div
              key={b.id}
              data-cursor={i === visibleBubbles.length - 1 ? 'bubble-latest' : undefined}
              layout
              initial={{ opacity: 0, y: 12, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.45, ease }}
              className={`flex flex-col mb-2.5 ${b.side === 'host' ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`max-w-[78%] rounded-xl px-3.5 py-2.5 ${
                  b.side === 'host'
                    ? 'bg-[hsl(var(--demo-accent-soft))] text-[hsl(var(--demo-foreground))]'
                    : 'bg-[hsl(var(--demo-card))] text-[hsl(var(--demo-foreground))] border border-[hsl(var(--demo-border))]'
                }`}
              >
                {b.icon === 'sparkles' && <Sparkles size={13} className="inline text-[hsl(var(--demo-primary))] mr-1.5 -mt-0.5" />}
                {b.icon === 'key' && <KeyRound size={13} className="inline text-[hsl(var(--demo-primary))] mr-1.5 -mt-0.5" />}
                <span className="text-sm leading-[1.45] whitespace-pre-wrap">{b.text}</span>
                <div className={`flex items-center gap-1.5 mt-1 ${b.side === 'host' ? 'justify-end' : 'justify-start'}`}>
                  <span className="text-xs text-[hsl(var(--demo-meta))]">{b.time}</span>
                  {b.side === 'host' && (
                    <span className="text-xs text-[hsl(var(--demo-primary))]">· IA</span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        {showIndicator && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-start"
          >
            <TypingIndicator />
          </motion.div>
        )}
      </div>

      {/* Composer */}
      <div className="bg-[hsl(var(--demo-card))] px-4 py-3 shrink-0 border-t border-[hsl(var(--demo-border))]/60">
        <div className="h-11 bg-[hsl(var(--demo-muted))] rounded-xl px-4 flex items-center">
          <span className="text-sm text-[hsl(var(--demo-meta))]">Escriu un missatge…</span>
        </div>
      </div>
    </div>
  );
}

function buildBubbles(peer: 'marta' | 'david', event: EventId): Bubble[] {
  if (peer === 'marta') {
    const base: Bubble[] = [
      { id: 'm1', side: 'guest', text: 'Bon dia! Quan és la pròxima neteja?', time: '09:12' },
    ];
    if (event === 'cleaner-assigned') {
      base.push({
        id: 'm2',
        side: 'host',
        text: '12 abr · Apartament Mar · check-out 10 h. Confirmat amb el client ✓',
        time: '09:13',
        icon: 'sparkles',
      });
    }
    return base;
  }
  // david
  const base: Bubble[] = [];
  if (event === 'guest-welcome' || event === 'door-code') {
    base.push({
      id: 'd1',
      side: 'host',
      text: 'Hola David! Benvingut a Barcelona. El check-in es fa aquí 👉 hostly.app/c/d-mar',
      time: '10:02',
    });
  }
  if (event === 'door-code') {
    base.push({
      id: 'd2',
      side: 'guest',
      text: 'Hemos llegado al edificio, gracias!',
      time: '14:55',
    });
    base.push({
      id: 'd3',
      side: 'host',
      text: 'Codi de la porta: 4872. Benvinguts!',
      time: '14:56',
      icon: 'key',
    });
  }
  return base;
}
