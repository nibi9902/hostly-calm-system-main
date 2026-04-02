import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { useRef } from "react";
import {
  KeyRound,
  SprayCan,
  FileText,
  ShieldAlert,
  Headset,
  CheckCircle,
  TrendingUp,
  ChevronRight,
  Wifi,
  Battery,
  Signal,
} from "lucide-react";

const secondaryCards = [
  {
    icon: KeyRound,
    badge: "Cero Trámites",
    title: "Entrada autónoma.",
    description:
      "Tu huésped completa el registro online y recibe su código de acceso. Sin quedar, sin esperas.",
    visual: "checkin" as const,
  },
  {
    icon: ShieldAlert,
    badge: "100% Legal",
    title: "Registro Policial Automático. 🛡️",
    description:
      "Los datos del DNI se envían a Policía al instante. Cumple la ley sin mover un dedo.",
    visual: "police" as const,
  },
  {
    icon: Headset,
    badge: "Posicionamiento Top",
    title: "Superhost, sin tocar el móvil.",
    description:
      "La velocidad lo es todo. El sistema responde al instante y actúa de guía local recomendando los mejores planes. El algoritmo te premia, el huésped disfruta y tú sumas 5 estrellas.",
    visual: "support" as const,
  },
  {
    icon: SprayCan,
    badge: "Coordinación 100% auto",
    title: "Limpieza en piloto automático.",
    description:
      "Hostly™ coordina a tu equipo con cada nueva reserva. Si una reserva cambia, la agenda se actualiza sola. Sin llamadas, sin errores.",
    visual: "cleaning" as const,
  },
  {
    icon: TrendingUp,
    badge: "Revenue Management",
    title: "Tu calendario siempre optimizado.",
    description:
      "Precios que se ajustan solos a la demanda real. Gana más en temporada alta, llena los huecos en temporada baja. Tu rentabilidad, maximizada.",
    visual: "pricing" as const,
  },
  {
    icon: ShieldAlert,
    badge: "Silencioso",
    title: "Resolución de Incidencias",
    description:
      "Protocolos predefinidos que actúan antes de que tú te enteres. Decisiones automáticas, escalado inteligente y resolución sin fricciones.",
    visual: "incidents" as const,
  },
];

/* ─── Reusable iPhone 15 Pro frame ─── */
/* iPhone 15 Pro: 393×852 pt → aspect ratio ≈ 9:19.5 */
const IPhoneFrame = ({ children, accent = false }: { children: React.ReactNode; accent?: boolean }) => (
  <div
    className="relative flex-shrink-0 scale-[0.75] md:scale-100 origin-center"
    style={{
      width: "180px",
      /* 19.5:9 aspect ratio → height = width × (19.5/9) */
      height: "390px",
      filter: "drop-shadow(0 32px 48px rgba(0,0,0,0.22)) drop-shadow(0 8px 16px rgba(0,0,0,0.12))",
    }}
  >
    {/* Outer titanium frame */}
    <div
      className="absolute inset-0 rounded-[40px] p-[3px]"
      style={{
        background: accent
          ? "linear-gradient(160deg, #3a3a3c 0%, #1c1c1e 40%, #2c2c2e 70%, #3a3a3c 100%)"
          : "linear-gradient(160deg, #4a4a4c 0%, #1c1c1e 40%, #2c2c2e 70%, #4a4a4c 100%)",
        boxShadow: "inset 0 1px 0 rgba(255,255,255,0.15), inset 0 -1px 0 rgba(0,0,0,0.3)",
      }}
    >
      {/* Screen bezel */}
      <div className="w-full h-full rounded-[38px] overflow-hidden bg-black flex flex-col" style={{ boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.05)" }}>
        {/* Status bar with Dynamic Island */}
        <div className="relative bg-black pt-3 pb-1 px-4 flex-shrink-0">
          <div className="flex justify-between items-center">
            <span className="text-white text-[9px] font-semibold" style={{ fontVariantNumeric: "tabular-nums" }}>9:41</span>
            <div
              className="absolute left-1/2 -translate-x-1/2 top-2 w-[80px] h-[24px] bg-black rounded-full z-10"
              style={{ boxShadow: "0 0 0 1px rgba(255,255,255,0.08)" }}
            />
            <div className="flex items-center gap-0.5">
              <Signal className="w-2.5 h-2.5 text-white" />
              <Wifi className="w-2.5 h-2.5 text-white" />
              <Battery className="w-3 h-3 text-white" />
            </div>
          </div>
        </div>
        {/* Screen content — fills remaining height */}
        <div className={`${accent ? "bg-[#1c1c1e]" : "bg-white"} flex-1 overflow-hidden`}>
          {children}
        </div>
      </div>
    </div>
    {/* Side button highlights */}
    <div className="absolute -right-[3px] top-[80px] w-[3px] h-[52px] rounded-r-sm" style={{ background: "linear-gradient(180deg, #4a4a4c, #2c2c2e, #4a4a4c)" }} />
    <div className="absolute -left-[3px] top-[72px] w-[3px] h-[30px] rounded-l-sm" style={{ background: "linear-gradient(180deg, #4a4a4c, #2c2c2e, #4a4a4c)" }} />
    <div className="absolute -left-[3px] top-[112px] w-[3px] h-[30px] rounded-l-sm" style={{ background: "linear-gradient(180deg, #4a4a4c, #2c2c2e, #4a4a4c)" }} />
    <div className="absolute -left-[3px] top-[155px] w-[3px] h-[52px] rounded-l-sm" style={{ background: "linear-gradient(180deg, #4a4a4c, #2c2c2e, #4a4a4c)" }} />
    {/* Screen glare */}
    <div className="absolute inset-[3px] rounded-[38px] pointer-events-none overflow-hidden">
      <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.06) 0%, transparent 50%)" }} />
    </div>
  </div>
);

/* ─── Frosted glass notification ─── */
const FrostedNotification = ({
  emoji,
  title,
  subtitle,
  delay = 0,
  className = "",
  style: extraStyle = {},
}: {
  emoji: string;
  title: string;
  subtitle: string;
  delay?: number;
  className?: string;
  style?: React.CSSProperties;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 12, scale: 0.95 }}
    whileInView={{ opacity: 1, y: 0, scale: 1 }}
    transition={{ delay, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    viewport={{ once: true }}
    className={`flex items-center gap-2.5 px-3 py-2.5 rounded-2xl ${className}`}
    style={{
      background: "rgba(255,255,255,0.82)",
      backdropFilter: "blur(24px) saturate(180%)",
      WebkitBackdropFilter: "blur(24px) saturate(180%)",
      border: "1px solid rgba(255,255,255,0.9)",
      boxShadow: "0 8px 32px rgba(0,0,0,0.10), 0 2px 8px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,1)",
      width: "153px",
      ...extraStyle,
    }}
  >
    <span className="text-xl leading-none">{emoji}</span>
    <div>
      <p className="text-[12px] font-semibold text-gray-900 leading-tight">{title}</p>
      <p className="text-[11px] text-gray-500 leading-tight">{subtitle}</p>
    </div>
  </motion.div>
);

/* ─── CHECKIN VISUAL ─── */
const CheckinVisual = () => (
  <div className="relative flex items-center justify-center h-full min-h-[520px] py-8">
    {/* Taller iPhone for checkin — scaled down on mobile via IPhoneFrame */}
    <div
      className="relative flex-shrink-0 scale-[0.75] md:scale-100 origin-center"
      style={{
        width: "210px",
        height: "455px",
        filter: "drop-shadow(0 32px 48px rgba(0,0,0,0.22)) drop-shadow(0 8px 16px rgba(0,0,0,0.12))",
      }}
    >
      <div
        className="absolute inset-0 rounded-[44px] p-[3px]"
        style={{
          background: "linear-gradient(160deg, #4a4a4c 0%, #1c1c1e 40%, #2c2c2e 70%, #4a4a4c 100%)",
          boxShadow: "inset 0 1px 0 rgba(255,255,255,0.15), inset 0 -1px 0 rgba(0,0,0,0.3)",
        }}
      >
        <div className="w-full h-full rounded-[42px] overflow-hidden bg-black flex flex-col" style={{ boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.05)" }}>
          {/* Status bar */}
          <div className="relative bg-black pt-3 pb-1 px-4 flex-shrink-0">
            <div className="flex justify-between items-center">
              <span className="text-white text-[9px] font-semibold">9:41</span>
              <div className="absolute left-1/2 -translate-x-1/2 top-2 w-[90px] h-[26px] bg-black rounded-full z-10" style={{ boxShadow: "0 0 0 1px rgba(255,255,255,0.08)" }} />
              <div className="flex items-center gap-0.5">
                <Signal className="w-2.5 h-2.5 text-white" />
                <Wifi className="w-2.5 h-2.5 text-white" />
                <Battery className="w-3 h-3 text-white" />
              </div>
            </div>
          </div>
          {/* Screen content */}
          <div className="bg-white flex-1 overflow-hidden flex flex-col items-center px-4 py-3">
            {/* Language selector */}
            <div className="w-full flex justify-end mb-2">
              <div className="flex items-center gap-1 px-2 py-0.5 rounded-lg bg-gray-100">
                <span className="text-[10px]">🇪🇸</span>
                <span className="text-[8px] text-gray-500">...</span>
                <span className="text-[8px] text-gray-400">∨</span>
              </div>
            </div>

            {/* Red circle checkmark */}
            <div
              className="w-[52px] h-[52px] rounded-full flex items-center justify-center mb-2 flex-shrink-0"
              style={{ border: "3px solid #ef4444" }}
            >
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>

            {/* Title */}
            <p className="text-[14px] font-bold text-center leading-tight mb-1" style={{ color: "#ef4444" }}>
              Código de Acceso
            </p>
            {/* Subtitle */}
            <p className="text-[10px] font-semibold text-center mb-1" style={{ color: "#22c55e" }}>
              Check-in completado
            </p>
            {/* Description */}
            <p className="text-[8px] text-center text-gray-400 mb-3 leading-tight px-1">
              Todos los huéspedes han completado el check-in correctamente.
            </p>

            {/* Apartment card */}
            <div className="w-full rounded-xl p-2.5 mb-2" style={{ background: "#f9f9f9", border: "1px solid #f0f0f0" }}>
              <p className="text-[7.5px] text-gray-400 text-center mb-0.5">Apartamento:</p>
              <p className="text-[9px] font-bold text-gray-900 text-center leading-tight">
                Luminoso Apartamento a 4 min<br />del Museo Dalí
              </p>
            </div>

            {/* Access code card */}
            <div className="w-full rounded-xl p-2" style={{ background: "#fff0f0", border: "1px solid #fecaca" }}>
              <p className="text-[7.5px] text-center mb-0.5" style={{ color: "#ef4444" }}>Código de acceso:</p>
              <p className="text-[18px] font-bold text-center mb-1.5 tracking-wider" style={{ color: "#ef4444" }}>268495</p>
              <button
                className="w-full py-1 rounded-xl flex items-center justify-center gap-1.5"
                style={{ background: "#ef4444" }}
              >
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                </svg>
                <span className="text-white text-[9px] font-semibold">Copiar código</span>
              </button>
            </div>

            {/* Divider + back link */}
            <div className="w-full h-px bg-gray-100 mt-2 mb-1.5" />
            <div className="flex items-center gap-1.5">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
              <span className="text-[8px] font-semibold text-gray-700">Volver al inicio</span>
            </div>
          </div>
        </div>
      </div>
      {/* Side buttons */}
      <div className="absolute -right-[3px] top-[90px] w-[3px] h-[60px] rounded-r-sm" style={{ background: "linear-gradient(180deg, #4a4a4c, #2c2c2e, #4a4a4c)" }} />
      <div className="absolute -left-[3px] top-[82px] w-[3px] h-[34px] rounded-l-sm" style={{ background: "linear-gradient(180deg, #4a4a4c, #2c2c2e, #4a4a4c)" }} />
      <div className="absolute -left-[3px] top-[124px] w-[3px] h-[34px] rounded-l-sm" style={{ background: "linear-gradient(180deg, #4a4a4c, #2c2c2e, #4a4a4c)" }} />
      <div className="absolute -left-[3px] top-[170px] w-[3px] h-[60px] rounded-l-sm" style={{ background: "linear-gradient(180deg, #4a4a4c, #2c2c2e, #4a4a4c)" }} />
      {/* Screen glare */}
      <div className="absolute inset-[3px] rounded-[42px] pointer-events-none overflow-hidden">
        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.06) 0%, transparent 50%)" }} />
      </div>
    </div>
  </div>
);

/* ─── POLICE VISUAL ─── */
const PoliceVisual = () => (
  <div className="relative flex items-center justify-center h-full min-h-[480px] py-10">
    <IPhoneFrame>
      <div className="flex flex-col items-center justify-center h-full px-5" style={{ background: "#f2f2f7" }}>

        {/* Big success icon */}
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
          style={{ background: "linear-gradient(135deg, #22c55e, #16a34a)", boxShadow: "0 8px 24px rgba(34,197,94,0.35)" }}
        >
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>

        {/* Title */}
        <p className="text-[15px] font-bold text-gray-900 text-center leading-tight mb-1">Registro enviado</p>
        <p className="text-[10px] text-gray-400 text-center mb-5">Mossos d'Esquadra · automático</p>

        {/* Pills */}
        <div className="w-full rounded-2xl bg-white shadow-sm px-4 py-3 flex items-center justify-between mb-2">
          <span className="text-[10px] text-gray-500">Reserva</span>
          <span className="text-[10px] font-semibold text-gray-900">#HM-20481</span>
        </div>
        <div className="w-full rounded-2xl bg-white shadow-sm px-4 py-3 flex items-center justify-between mb-2">
          <span className="text-[10px] text-gray-500">Número de huéspedes</span>
          <span className="text-[10px] font-semibold text-gray-900">2</span>
        </div>
        <div className="w-full rounded-2xl bg-white shadow-sm px-4 py-3 flex items-center justify-between">
          <span className="text-[10px] text-gray-500">Enviado</span>
          <span className="text-[10px] font-semibold text-green-600">Hace 2 seg. ✅</span>
        </div>

      </div>
    </IPhoneFrame>

    {/* Frosted glass notification */}
    <FrostedNotification
      emoji="✅"
      title="Mossos d'Esquadra:"
      subtitle="Registro de viajero OK."
      delay={0.4}
      className="absolute top-6 right-0 md:top-auto md:bottom-10 md:-right-2"
    />
  </div>
);


/* ─── CLEANING VISUAL ─── */
const CleaningVisual = () => (
  <div className="relative flex items-center justify-center h-full min-h-[480px] py-10">
    <IPhoneFrame>
      <div className="flex flex-col items-center justify-center h-full px-5 gap-4" style={{ background: "#f2f2f7" }}>

        {/* Big avatar */}
        <div className="relative">
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center text-[36px] shadow-lg"
            style={{ background: "linear-gradient(135deg, #a78bfa, #7c3aed)", boxShadow: "0 12px 32px rgba(124,58,237,0.35)" }}
          >
            M
          </div>
          {/* Green checkmark badge */}
          <div
            className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full flex items-center justify-center border-2 border-white"
            style={{ background: "#22c55e" }}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
        </div>

        {/* Name & role */}
        <div className="text-center">
          <p className="text-[15px] font-bold text-gray-900 leading-tight">Marta García</p>
          <p className="text-[10px] text-gray-400">Equipo de limpieza</p>
        </div>

        {/* Completion message card */}
        <div className="w-full rounded-2xl bg-white shadow-sm px-4 py-3.5 text-center">
          <p className="text-[11px] font-semibold text-gray-800 leading-snug">
            Ha completado la limpieza de
          </p>
          <p className="text-[13px] font-bold text-gray-900 mt-0.5">Apt. Gràcia 3-2</p>
          <p className="text-[9px] text-green-600 font-medium mt-1">✅ Listo para los próximos huéspedes</p>
        </div>

        {/* Time pill */}
        <p className="text-[9px] text-gray-400">Hace 8 minutos · 14:52</p>

      </div>
    </IPhoneFrame>

    {/* Frosted push notification */}
    <FrostedNotification
      emoji="🧹"
      title="Marta ha completado la limpieza"
      subtitle="Apt. Gràcia 3-2 · Listo para huéspedes"
      delay={0.35}
      className="absolute top-6 left-1 md:-left-1"
    />
  </div>
);



/* ─── PRICING VISUAL ─── */
// Desembre 2025: comença en Dilluns (dia 1 = DL)
// Grid 7 cols: DL DT DC DJ DV DS DG
// Setmana 1:  1   2   3   4   5   6   7
// Setmana 2:  8   9  10  11  12  13  14
// Setmana 3: 15  16  17  18  19  20  21
// Setmana 4: 22  23  24  25  26  27  28
// Setmana 5: 29  30  31  --  --  --  --
//
// Preu base: 115€/nit
// Cap de setmana (DS/DG): 145€ — lleugerament alt, ressaltat
// Festius (24,25,26,31): 210€ — alta demanda, ressaltat groc/ambre
// Seleccionat: dia 5 (DV) — preu dinàmic 195€, ressaltat blau

type DayType = "normal" | "weekend" | "festiu" | "selected" | "empty";

const calendarDays: { day: number | null; price: string; type: DayType; col?: number }[] = [
  // Setmana 1
  { day: 1,  price: "115€", type: "normal" },
  { day: 2,  price: "115€", type: "normal" },
  { day: 3,  price: "115€", type: "normal" },
  { day: 4,  price: "115€", type: "normal" },
  { day: 5,  price: "195€", type: "selected" },
  { day: 6,  price: "145€", type: "weekend" },
  { day: 7,  price: "145€", type: "weekend" },
  // Setmana 2
  { day: 8,  price: "115€", type: "normal" },
  { day: 9,  price: "115€", type: "normal" },
  { day: 10, price: "115€", type: "normal" },
  { day: 11, price: "115€", type: "normal" },
  { day: 12, price: "115€", type: "normal" },
  { day: 13, price: "145€", type: "weekend" },
  { day: 14, price: "145€", type: "weekend" },
  // Setmana 3
  { day: 15, price: "115€", type: "normal" },
  { day: 16, price: "115€", type: "normal" },
  { day: 17, price: "115€", type: "normal" },
  { day: 18, price: "115€", type: "normal" },
  { day: 19, price: "115€", type: "normal" },
  { day: 20, price: "145€", type: "weekend" },
  { day: 21, price: "145€", type: "weekend" },
  // Setmana 4
  { day: 22, price: "115€", type: "normal" },
  { day: 23, price: "115€", type: "normal" },
  { day: 24, price: "210€", type: "festiu" },
  { day: 25, price: "210€", type: "festiu" },
  { day: 26, price: "210€", type: "festiu" },
  { day: 27, price: "145€", type: "weekend" },
  { day: 28, price: "145€", type: "weekend" },
  // Setmana 5
  { day: 29, price: "115€", type: "normal" },
  { day: 30, price: "115€", type: "normal" },
  { day: 31, price: "210€", type: "festiu" },
  { day: null, price: "", type: "empty" },
  { day: null, price: "", type: "empty" },
  { day: null, price: "", type: "empty" },
  { day: null, price: "", type: "empty" },
];

const weekdays = ["DL", "DT", "DC", "DJ", "DV", "DS", "DG"];

const PricingVisual = () => (
  <div className="relative flex items-center justify-center h-full min-h-[480px] py-10">
    <IPhoneFrame>
      <div className="flex flex-col h-full overflow-hidden" style={{ background: "#f2f2f7" }}>
        {/* App header */}
        <div className="px-4 pt-2 pb-2 bg-white flex items-center justify-between border-b border-gray-100">
          <p className="text-[13px] font-bold text-gray-900">Calendari</p>
          <div className="flex items-center gap-0.5">
            <span className="text-[9px] text-blue-500">⚡</span>
            <span className="text-[9px] text-blue-500 font-medium">Automàtic</span>
            <span className="text-[9px] text-blue-400"> ›</span>
          </div>
        </div>

        {/* Calendar card */}
        <div className="mx-2 mt-2 bg-white rounded-2xl shadow-sm overflow-hidden flex-1">
          {/* Month nav */}
          <div className="flex items-center justify-between px-3 py-2">
            <span className="text-[10px] text-gray-400 font-medium">‹</span>
            <span className="text-[10px] font-semibold text-gray-900">Desembre 2025</span>
            <span className="text-[10px] text-gray-400 font-medium">›</span>
          </div>

          {/* Weekday headers */}
          <div className="grid grid-cols-7 px-1 pb-1">
            {weekdays.map((d, i) => (
              <div key={d} className="flex flex-col items-center gap-0.5">
                <span
                  className="text-[7px] font-semibold"
                  style={{ color: i === 4 ? "#2563eb" : "#9ca3af" }}
                >
                  {d}
                </span>
                {i === 4 && <div className="w-3 h-[1.5px] rounded-full" style={{ background: "#2563eb" }} />}
              </div>
            ))}
          </div>

          {/* Calendar grid */}
          <div className="grid grid-cols-7 px-1 pb-2 gap-y-0.5">
            {calendarDays.map((cell, i) => {
              if (cell.type === "empty") {
                return <div key={i} className="py-1" />;
              }
              if (cell.type === "selected") {
                return (
                  <div
                    key={i}
                    className="flex flex-col items-center justify-center py-1 rounded-xl mx-px"
                    style={{
                      background: "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)",
                      boxShadow: "0 4px 12px rgba(59,130,246,0.45)",
                    }}
                  >
                    <span className="text-[12px] font-bold text-white leading-none">{cell.day}</span>
                    <span className="text-[6px] font-semibold text-blue-100 mt-0.5">{cell.price}</span>
                  </div>
                );
              }
              if (cell.type === "festiu") {
                return (
                  <div
                    key={i}
                    className="flex flex-col items-center justify-center py-1 rounded-xl mx-px"
                    style={{ background: "#fef9c3", border: "1px solid #fde68a" }}
                  >
                    <span className="text-[12px] font-bold leading-none" style={{ color: "#92400e" }}>{cell.day}</span>
                    <span className="text-[6px] font-semibold mt-0.5" style={{ color: "#b45309" }}>{cell.price}</span>
                  </div>
                );
              }
              if (cell.type === "weekend") {
                return (
                  <div key={i} className="flex flex-col items-center py-1">
                    <span className="text-[12px] font-semibold leading-none text-gray-500">{cell.day}</span>
                    <span className="text-[6px] text-gray-400 mt-0.5">{cell.price}</span>
                  </div>
                );
              }
              // normal
              return (
                <div key={i} className="flex flex-col items-center py-1">
                  <span className="text-[12px] font-bold text-gray-800 leading-none">{cell.day}</span>
                  <span className="text-[6px] text-gray-400 mt-0.5">{cell.price}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </IPhoneFrame>

    {/* Floating badge */}
    <motion.div
      initial={{ opacity: 0, scale: 0.85, y: -8 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true }}
      className="absolute top-6 right-0 md:-right-4"
      style={{
        background: "rgba(255,255,255,0.88)",
        backdropFilter: "blur(20px) saturate(180%)",
        WebkitBackdropFilter: "blur(20px) saturate(180%)",
        border: "1px solid rgba(255,255,255,0.9)",
        boxShadow: "0 8px 32px rgba(0,0,0,0.10), 0 2px 8px rgba(0,0,0,0.06)",
        borderRadius: "14px",
        padding: "8px 14px",
      }}
    >
      <p className="text-[10px] font-bold text-gray-900">🔥 Nadal · Alta Demanda</p>
      <p className="text-[9px] text-gray-500">+€95 vs preu base</p>
    </motion.div>
  </div>
);

/* ─── SUPPORT VISUAL ─── */
const SupportVisual = () => (
  <div className="relative flex items-center justify-center h-full min-h-[480px] py-10">
    <IPhoneFrame>
      <div className="flex flex-col h-full" style={{ background: "#f0f0f5" }}>

        {/* Chat header */}
        <div className="bg-white px-3 pt-2 pb-2 border-b border-gray-100 flex-shrink-0">
          <div className="flex items-center justify-between">
            <span className="text-[14px] text-blue-500">‹</span>
            <div className="text-center">
              <p className="text-[11px] font-bold text-gray-900 leading-tight">Lola Carbone</p>
              <p className="text-[8px] text-gray-400 leading-tight truncate max-w-[120px]">Luminoso Apartamento · Dalí</p>
            </div>
            <div className="w-5 h-5 rounded-full border border-gray-300 flex items-center justify-center">
              <span className="text-[8px] text-gray-400">ℹ</span>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 px-2.5 py-2 flex flex-col gap-2 overflow-hidden">

          {/* IA sent timestamp */}
          <div className="flex justify-end">
            <span className="text-[7px] text-gray-400">14:18 · IA</span>
          </div>
          {/* IA bubble (right, light blue) */}
          <div className="flex justify-end">
            <div className="rounded-2xl rounded-tr-sm px-2.5 py-1.5 max-w-[82%]" style={{ background: "#dce8fb" }}>
              <p className="text-[8.5px] text-gray-800 leading-snug">Bonjour! 👉 caserna13.com<br />Saisis ton téléphone avec l'indicatif <span className="italic">sans</span> espaces. Ex: +34 644 969 299 → 34644969299</p>
            </div>
          </div>

          {/* Guest bubble (left, white) */}
          <div className="flex justify-start">
            <div className="rounded-2xl rounded-tl-sm px-2.5 py-1.5 max-w-[78%] shadow-sm" style={{ background: "#ffffff" }}>
              <p className="text-[8.5px] text-gray-800 leading-snug">J'essaie ça de suite merci</p>
              <p className="text-[7px] text-gray-400 mt-0.5">14:27</p>
            </div>
          </div>

          {/* IA bubble (right) */}
          <div className="flex justify-end">
            <div className="rounded-2xl rounded-tr-sm px-2.5 py-1.5 max-w-[82%]" style={{ background: "#dce8fb" }}>
              <p className="text-[8.5px] text-gray-800 leading-snug">Super — tiens-moi au courant 😊<br />Si ça ne s'affiche pas, dis-le et je regarde tout de suite.</p>
              <p className="text-[7px] text-gray-500 mt-0.5 text-right">14:28 · IA</p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="bg-white border-t border-gray-100 px-2.5 py-2 flex-shrink-0">
          <div className="flex items-center gap-1.5">
            <div className="flex items-center gap-1 flex-shrink-0">
              <div className="px-2.5 py-1 rounded-full text-[8px] font-semibold text-white" style={{ background: "#5b8def" }}>IA</div>
              <div className="px-2.5 py-1 rounded-full text-[8px] font-medium text-gray-500 bg-gray-100">Humà</div>
            </div>
            <div className="flex-1 rounded-full bg-gray-100 px-2.5 py-1 flex items-center justify-between">
              <span className="text-[8px] text-gray-400">Escriu un missatge...</span>
              <span className="text-[10px] text-gray-300">➤</span>
            </div>
          </div>
        </div>

      </div>
    </IPhoneFrame>

    {/* Airbnb Superhost badge */}
    <motion.div
      initial={{ opacity: 0, scale: 0.85, y: 10 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: 0.45, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true }}
      className="absolute top-6 left-1 md:top-auto md:bottom-8 md:-left-6"
      style={{
        background: "rgba(255,255,255,0.92)",
        backdropFilter: "blur(24px) saturate(180%)",
        WebkitBackdropFilter: "blur(24px) saturate(180%)",
        border: "1px solid rgba(255,255,255,0.95)",
        boxShadow: "0 12px 40px rgba(0,0,0,0.14), 0 2px 8px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,1)",
        borderRadius: "18px",
        padding: "12px 16px",
        minWidth: "150px",
      }}
    >
      {/* Airbnb logo row */}
      <div className="flex items-center gap-1.5 mb-1">
        {/* Airbnb Superhost medal icon */}
        <svg width="18" height="22" viewBox="0 0 48 58" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Shield outline */}
          <path d="M24 3 L42 11 L42 30 C42 40 34 48 24 52 C14 48 6 40 6 30 L6 11 Z" fill="none" stroke="#3d3d3d" strokeWidth="3" strokeLinejoin="round"/>
          {/* Red/coral triangle (left+top) */}
          <clipPath id="shieldClip">
            <path d="M24 3 L42 11 L42 30 C42 40 34 48 24 52 C14 48 6 40 6 30 L6 11 Z"/>
          </clipPath>
          <polygon points="6,11 42,11 6,52" fill="#FF5A5F" clipPath="url(#shieldClip)"/>
          {/* Gold triangle (right) */}
          <polygon points="42,11 42,30 6,52" fill="#FFB400" clipPath="url(#shieldClip)"/>
          {/* Circle pendant */}
          <circle cx="24" cy="55" r="4.5" fill="none" stroke="#3d3d3d" strokeWidth="3"/>
          <circle cx="24" cy="55" r="2" fill="#FFB400"/>
        </svg>
        <span className="text-[10px] font-bold" style={{ color: "#FF385C" }}>airbnb</span>
      </div>
      {/* Superhost text */}
      <p className="text-[15px] font-extrabold leading-tight mb-1.5" style={{ color: "#484848", letterSpacing: "-0.3px" }}>
        Super<span style={{ color: "#FF385C" }}>h</span>ost
      </p>
      {/* 5 stars */}
      <div className="flex items-center gap-0.5">
        {[...Array(5)].map((_, i) => (
          <svg key={i} width="12" height="12" viewBox="0 0 24 24" fill="#FFB400">
            <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
          </svg>
        ))}
      </div>
    </motion.div>
  </div>
);

/* ─── INCIDENTS VISUAL ─── */
const IncidentsVisual = () => (
  <div className="relative flex items-center justify-center h-full min-h-[480px] py-10">
    <IPhoneFrame>
      <div className="px-3 py-4 h-full overflow-y-auto" style={{ background: "#f2f2f7" }}>
        <p className="text-[12px] font-bold text-gray-900 mb-3">Incidencias · Activas</p>

        {[
          {
            icon: "🚿",
            title: "Sin agua caliente",
            apt: "Eixample 2-3 · 03:14 AM",
            status: "Resuelto",
            statusColor: "text-green-600 bg-green-50",
            action: "Técnico notificado automáticamente",
          },
          {
            icon: "🔇",
            title: "Queja por ruido",
            apt: "Gràcia 1-1 · 01:55 AM",
            status: "En gestión",
            statusColor: "text-amber-600 bg-amber-50",
            action: "Protocolo silencio activado",
          },
          {
            icon: "🗝️",
            title: "Llave no funciona",
            apt: "Born 4-2 · 11:20 PM",
            status: "Resuelto",
            statusColor: "text-green-600 bg-green-50",
            action: "Código de emergencia enviado",
          },
        ].map((inc, i) => (
          <div key={i} className="rounded-2xl bg-white p-3 mb-2 shadow-sm">
            <div className="flex items-start gap-2.5">
              <span className="text-base leading-none mt-0.5">{inc.icon}</span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-1 mb-1">
                  <p className="text-[10px] font-bold text-gray-900">{inc.title}</p>
                  <span className={`text-[7px] font-semibold px-1.5 py-0.5 rounded-full flex-shrink-0 ${inc.statusColor}`}>{inc.status}</span>
                </div>
                <p className="text-[8px] text-gray-400 mb-1">{inc.apt}</p>
                <div className="flex items-center gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                  <p className="text-[8px] text-blue-600 font-medium">{inc.action}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </IPhoneFrame>

    <FrostedNotification
      emoji="⚡️"
      title="Incidencia resuelta"
      subtitle="Sin intervención manual · 4 min"
      delay={0.35}
      className="absolute top-8 right-0 md:-right-2"
    />
  </div>
);

/* ─── CARD ACCENT CONFIGS ─── */
const cardAccents: Record<string, { bg: string; visualBg: string; badgeStyle: React.CSSProperties; titleColor: string }> = {
  checkin: {
    bg: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
    visualBg: "linear-gradient(135deg, #1e293b 0%, #0f1f3d 100%)",
    badgeStyle: { background: "rgba(59,130,246,0.15)", color: "#93c5fd", border: "1px solid rgba(59,130,246,0.25)" },
    titleColor: "#f8fafc",
  },
  police: {
    bg: "linear-gradient(135deg, #052e16 0%, #14532d 60%, #166534 100%)",
    visualBg: "linear-gradient(135deg, #14532d 0%, #052e16 100%)",
    badgeStyle: { background: "rgba(34,197,94,0.15)", color: "#86efac", border: "1px solid rgba(34,197,94,0.25)" },
    titleColor: "#f0fdf4",
  },
  support: {
    bg: "linear-gradient(135deg, #1a0533 0%, #2e1065 60%, #3b0764 100%)",
    visualBg: "linear-gradient(135deg, #2e1065 0%, #1a0533 100%)",
    badgeStyle: { background: "rgba(168,85,247,0.18)", color: "#d8b4fe", border: "1px solid rgba(168,85,247,0.3)" },
    titleColor: "#faf5ff",
  },
  cleaning: {
    bg: "linear-gradient(135deg, #0c1a3a 0%, #1e3a6a 60%, #1a3461 100%)",
    visualBg: "linear-gradient(135deg, #1e3a6a 0%, #0c1a3a 100%)",
    badgeStyle: { background: "rgba(96,165,250,0.15)", color: "#93c5fd", border: "1px solid rgba(96,165,250,0.25)" },
    titleColor: "#eff6ff",
  },
  pricing: {
    bg: "linear-gradient(135deg, #1c0a00 0%, #431407 60%, #3a1208 100%)",
    visualBg: "linear-gradient(135deg, #431407 0%, #1c0a00 100%)",
    badgeStyle: { background: "rgba(251,146,60,0.15)", color: "#fdba74", border: "1px solid rgba(251,146,60,0.25)" },
    titleColor: "#fff7ed",
  },
  incidents: {
    bg: "linear-gradient(135deg, #0f172a 0%, #1e1b4b 60%, #1e1b4b 100%)",
    visualBg: "linear-gradient(135deg, #1e1b4b 0%, #0f172a 100%)",
    badgeStyle: { background: "rgba(129,140,248,0.15)", color: "#a5b4fc", border: "1px solid rgba(129,140,248,0.25)" },
    titleColor: "#eef2ff",
  },
};

/* ─── HERO CONTENT ─── */
const HeroContent = () => (
  <div
    className="w-full h-full flex items-center justify-center px-4 md:px-12 lg:px-20 pt-16 md:pt-0"
    style={{ background: "hsl(var(--primary))" }}
  >
    <div className="w-full max-w-5xl mx-auto flex flex-col justify-center">
      <div className="flex justify-center mb-8">
        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-white/80 text-xs font-medium tracking-widest uppercase border border-white/10">
          <CheckCircle className="w-3.5 h-3.5" />
          Sistema 360 para gestores
        </span>
      </div>
      <h2 className="text-center text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-[-0.03em] mb-4 md:mb-6 text-primary-foreground">
        Un sistema que trabaje{" "}
        <span className="italic text-accent">para ti.</span>
      </h2>
      <p className="text-center text-base md:text-lg text-white/60 max-w-2xl mx-auto mb-8 md:mb-10 leading-relaxed">
        Delega la microgestión diaria en una tecnología que coordina a tu equipo, recibe a tus huéspedes y cumple la ley mientras duermes.
      </p>

      {/* Progress indicators — one pill per secondary card */}
      <div className="flex flex-row flex-wrap justify-center gap-2 mb-8 md:mb-10">
        {secondaryCards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.title}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.08] border border-white/[0.08]"
            >
              <Icon className="w-3.5 h-3.5 text-white/50" />
              <span className="text-[11px] text-white/50 font-medium">{card.badge}</span>
            </div>
          );
        })}
      </div>

    </div>
  </div>
);

/* ─── SECONDARY CARD CONTENT (pure content, no sticky wrapper) ─── */
const SecondaryCardContent = ({ card, index }: { card: typeof secondaryCards[number]; index: number }) => {
  const accent = cardAccents[card.visual] ?? cardAccents.checkin;

  const renderVisual = () => {
    switch (card.visual) {
      case "checkin":   return <CheckinVisual />;
      case "police":    return <PoliceVisual />;
      case "cleaning":  return <CleaningVisual />;
      case "pricing":   return <PricingVisual />;
      case "support":   return <SupportVisual />;
      case "incidents": return <IncidentsVisual />;
      default:          return null;
    }
  };

  const textCol = (
    <div className="h-full pt-20 pb-8 px-8 md:pt-12 md:px-12 lg:px-16 lg:pt-16 flex flex-col justify-center">
      <span
        className="inline-block text-[11px] font-semibold tracking-widest uppercase px-3 py-1 rounded-md w-fit mb-6"
        style={accent.badgeStyle}
      >
        {card.badge}
      </span>
      <h3
        className="text-2xl md:text-3xl lg:text-4xl font-bold leading-[1.1] tracking-[-0.02em] mb-4"
        style={{ color: accent.titleColor }}
      >
        {card.title}
      </h3>
      <p className="text-base md:text-lg leading-relaxed" style={{ color: `${accent.titleColor}88` }}>
        {card.description}
      </p>
    </div>
  );

  const visualCol = (
    <div
      className="relative h-full flex items-center justify-center"
      style={{ background: accent.visualBg }}
    >
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none overflow-hidden"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none overflow-hidden"
        style={{ background: "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(255,255,255,0.04) 0%, transparent 70%)" }}
      />
      {renderVisual()}
    </div>
  );

  return (
    <div className="w-full h-full grid grid-cols-1 md:grid-cols-2 gap-0" style={{ background: accent.bg }}>
      {/* Text always first (top) on mobile, alternates on desktop */}
      <div className={`order-1 ${index % 2 === 0 ? "md:order-1" : "md:order-2"}`}>
        {textCol}
      </div>
      <div className={`order-2 ${index % 2 === 0 ? "md:order-2" : "md:order-1"} relative`}>
        {visualCol}
      </div>
    </div>
  );
};

/* ─── CARD LAYER — single-scroll 3D depth stacking ─── */
const TOTAL_CARDS = 1 + secondaryCards.length; // 7
const STEP = 1 / TOTAL_CARDS;

// Apple-style easing (cubic bezier approximation via JS)
const appleEaseFn = (t: number): number => {
  // Approximates cubic-bezier(0.16, 1, 0.3, 1) — fast start, smooth settle
  const c1 = 0.16, c2 = 1, c3 = 0.3, c4 = 1;
  return (
    3 * (1 - t) * (1 - t) * t * c2 +
    3 * (1 - t) * t * t * c3 +
    t * t * t * c4
  ) * (1 - (1 - t) * (1 - t) * (1 - t) * (1 - c1));
};

const CardLayer = ({
  index,
  scrollYProgress,
  children,
}: {
  index: number;
  scrollYProgress: MotionValue<number>;
  children: React.ReactNode;
}) => {
  // Slide in from bottom over ~65% of total scroll budget — Apple-style smooth
  const enterStart = index === 0 ? 0 : index * STEP - STEP * 0.02;
  const enterEnd   = index === 0 ? 0 : Math.min(index * STEP + STEP * 0.65, 1);

  const y = useTransform(scrollYProgress, (p: number) => {
    if (index === 0) return "0%";
    if (p <= enterStart) return "100%";
    if (p >= enterEnd) return "0%";
    const t = (p - enterStart) / (enterEnd - enterStart);
    const eased = appleEaseFn(t);
    return `${(1 - eased) * 100}%`;
  });

  // Scale down when the next card slides over (depth illusion) — same smooth range
  const scaleStart = index >= TOTAL_CARDS - 1 ? 0 : (index + 1) * STEP - STEP * 0.02;
  const scaleEnd   = index >= TOTAL_CARDS - 1 ? 1 : Math.min((index + 1) * STEP + STEP * 0.65, 1);

  const scale = useTransform(scrollYProgress, (p: number) => {
    if (index >= TOTAL_CARDS - 1) return 1;
    if (p <= scaleStart) return 1;
    if (p >= scaleEnd) return 0.92;
    const t = (p - scaleStart) / (scaleEnd - scaleStart);
    const eased = appleEaseFn(t);
    return 1 - eased * 0.08;
  });

  // Rounded corners appear as card scales back (Apple-style)
  const borderRadius = useTransform(scale, [0.92, 1], ["20px", "0px"]);

  return (
    <motion.div
      className="absolute inset-0 overflow-hidden"
      style={{
        y,
        scale,
        borderRadius,
        zIndex: index + 1,
        transformOrigin: "top center",
        boxShadow: "0 -32px 80px rgba(0,0,0,0.6), 0 -4px 20px rgba(0,0,0,0.3)",
      }}
    >
      {children}
    </motion.div>
  );
};

/* ─── MAIN COMPONENT ─── */
const OrderBlock = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <div ref={containerRef} style={{ height: `${TOTAL_CARDS * 100}vh` }}>
      {/* Single sticky viewport — all cards live here as absolute layers */}
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Hero — layer 0 */}
        <CardLayer index={0} scrollYProgress={scrollYProgress}>
          <HeroContent />
        </CardLayer>

        {/* Feature cards — layers 1–6 */}
        {secondaryCards.map((card, i) => (
          <CardLayer key={card.title} index={i + 1} scrollYProgress={scrollYProgress}>
            <SecondaryCardContent card={card} index={i} />
          </CardLayer>
        ))}
      </div>
    </div>
  );
};

export default OrderBlock;


