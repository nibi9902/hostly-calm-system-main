export type TabId = 'today' | 'chat' | 'cleaning' | 'apartment';

export type EventId =
  | 'idle'
  | 'price-surge'
  | 'new-booking'
  | 'cleaner-assigned'
  | 'guest-welcome'
  | 'checkin-police'
  | 'cleaning-done'
  | 'door-code'
  | 'finance-summary'
  | 'tax-ready'
  | 'end';

export interface Step {
  tab: TabId;
  event: EventId;
  subTab?: 'legal' | 'finances' | 'tax';
  chatPeer?: 'marta' | 'david';
  duration: number;
  caption?: string;
  /** CSS selector on què el cursor ha d'anar al començament del step */
  cursor?: string;
  /** Temps (ms) des de l'inici del step en què es dispara el ripple de click */
  clickAt?: number;
}

export const TIMELINE: Step[] = [
  // — Resum —
  { tab: 'today', event: 'idle', duration: 1800, cursor: '[data-cursor="tab-today"]' },
  { tab: 'today', event: 'price-surge', duration: 4200, caption: 'Hostly detecta Setmana Santa i ajusta preus +15 %', cursor: '[data-cursor="toast-area"]' },
  { tab: 'today', event: 'new-booking', duration: 4500, caption: 'Nova reserva rebuda · Apartament Mar · David Taisne', cursor: '[data-cursor="new-booking-row"]', clickAt: 800 },

  // — Xats —
  { tab: 'chat', chatPeer: 'marta', event: 'cleaner-assigned', duration: 4500, caption: 'Coordinació automàtica amb la neteja', cursor: '[data-cursor="tab-chat"]', clickAt: 200 },
  { tab: 'chat', chatPeer: 'david', event: 'guest-welcome', duration: 4500, caption: 'Missatge de benvinguda enviat · enllaç de check-in', cursor: '[data-cursor="bubble-latest"]' },

  // — Gestió · Legal —
  { tab: 'apartment', subTab: 'legal', event: 'checkin-police', duration: 5500, caption: 'Check-in complet · enviat als Mossos', cursor: '[data-cursor="tab-apartment"]', clickAt: 200 },

  // — Neteja —
  { tab: 'cleaning', event: 'cleaning-done', duration: 4500, caption: 'Neteja feta · fotos rebudes', cursor: '[data-cursor="tab-cleaning"]', clickAt: 200 },

  // — Xats (codi) —
  { tab: 'chat', chatPeer: 'david', event: 'door-code', duration: 4200, caption: 'Codi de porta enviat al hoste', cursor: '[data-cursor="tab-chat"]', clickAt: 200 },

  // — Gestió · Finances —
  { tab: 'apartment', subTab: 'finances', event: 'finance-summary', duration: 5800, caption: 'Resum del mes actualitzat', cursor: '[data-cursor="tab-apartment"]', clickAt: 200 },

  // — Gestió · Taxa —
  { tab: 'apartment', subTab: 'tax', event: 'tax-ready', duration: 5200, caption: 'Taxa turística Q1 preparada', cursor: '[data-cursor="tax-cta"]', clickAt: 3500 },

  // — End —
  { tab: 'today', event: 'end', duration: 99999999 },
];
