/**
 * Guió de la demo: seqüència de passos que canvien el tab i disparen
 * esdeveniments dins de cada vista. La vista observa `event` per animar-se.
 */
export type TabId = 'today' | 'chat' | 'cleaning' | 'apartment';

export type EventId =
  | 'idle'
  | 'price-surge'       // Today: toast "Setmana Santa +15%"
  | 'new-booking'       // Today: nova reserva s'afegeix a la llista
  | 'cleaner-assigned'  // Chat: Marta confirma la neteja
  | 'guest-welcome'     // Chat: benvinguda a David + enllaç
  | 'checkin-police'    // Gestió: check-in + stamp Mossos
  | 'cleaning-done'     // Cleaning: fila canvia a verd amb fotos
  | 'door-code'         // Chat: codi porta enviat
  | 'finance-summary'   // Gestió: numbers count-up
  | 'tax-ready'         // Gestió: taxa Q1 preparada
  | 'end';

export interface Step {
  tab: TabId;
  event: EventId;
  subTab?: 'legal' | 'finances' | 'tax';  // Per la zona Gestió
  chatPeer?: 'marta' | 'david';            // Per la zona Xats
  duration: number;
  caption?: string;
}

export const TIMELINE: Step[] = [
  // — Resum —
  { tab: 'today', event: 'idle',        duration: 1800 },
  { tab: 'today', event: 'price-surge', duration: 4200, caption: 'Hostly detecta Setmana Santa i ajusta preus +15 %' },
  { tab: 'today', event: 'new-booking', duration: 4500, caption: 'Nova reserva rebuda · Apartament Mar · David Taisne' },

  // — Xats —
  { tab: 'chat', chatPeer: 'marta',  event: 'cleaner-assigned', duration: 4500, caption: 'Coordinació automàtica amb la neteja' },
  { tab: 'chat', chatPeer: 'david',  event: 'guest-welcome',    duration: 4500, caption: 'Missatge de benvinguda enviat · enllaç de check-in' },

  // — Gestió · Legal —
  { tab: 'apartment', subTab: 'legal', event: 'checkin-police', duration: 5200, caption: 'Check-in complet · enviat als Mossos' },

  // — Neteja —
  { tab: 'cleaning', event: 'cleaning-done', duration: 4200, caption: 'Neteja feta · fotos rebudes' },

  // — Xats (codi) —
  { tab: 'chat', chatPeer: 'david', event: 'door-code', duration: 4000, caption: 'Codi de porta enviat al hoste' },

  // — Gestió · Finances —
  { tab: 'apartment', subTab: 'finances', event: 'finance-summary', duration: 5500, caption: 'Resum del mes actualitzat' },

  // — Gestió · Taxa —
  { tab: 'apartment', subTab: 'tax', event: 'tax-ready', duration: 5000, caption: 'Taxa turística Q1 preparada' },

  // — End —
  { tab: 'today', event: 'end', duration: 99999999 },
];

export const STEP_COUNT = TIMELINE.length - 1; // sense la final
