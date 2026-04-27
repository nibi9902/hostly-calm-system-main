import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useTranslation } from "react-i18next";
import { Check, Wifi, KeyRound, Euro, CalendarDays, Lock, Shield, Sparkles, MessageSquare, TrendingUp, ArrowUpRight } from "lucide-react";

const appleEase = [0.22, 1, 0.36, 1] as const;

/* ─── Brand tokens (alineats amb la plataforma real) ─── */
const BRAND_BLUE = "#1a3a8f";
const BRAND_SOFT = "#2563EB";
const GRAD_QUICK = "linear-gradient(135deg, #FF7A75 0%, #FFA97A 100%)"; // gradient quick-actions de l'app real

/* ── Step visual configs (non-translated) ── */
const STEP_VISUALS = [
  { num: "01", visual: "setup" },
  { num: "02", visual: "integrations" },
  { num: "03", visual: "live" },
] as const;

/* ─────────────────────────────────────────────────────────
   MOCKUPS — inspirats en el llenguatge visual real de Hostly
───────────────────────────────────────────────────────── */

/** 1. Setup — quick-action cards amb el gradient de la plataforma real */
const SetupScreen = () => (
  <div style={{
    width: "100%", height: "100%", background: "#F7F8FA",
    padding: "18px 14px", display: "flex", flexDirection: "column", gap: "10px",
    fontFamily: 'Inter, -apple-system, sans-serif',
  }}>
    {/* Header breve */}
    <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "4px" }}>
      <div style={{
        width: 32, height: 32, borderRadius: "10px",
        background: "linear-gradient(135deg,#1a3a8f,#2563EB)",
        display: "flex", alignItems: "center", justifyContent: "center",
        color: "#fff", fontWeight: 800, fontSize: 13,
      }}>LE</div>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: "#0B0F1A", lineHeight: 1.1 }}>Luminoso Eixample</div>
        <div style={{ fontSize: 9, color: "#64748b", marginTop: 1 }}>Barcelona · 2 huéspedes</div>
      </div>
      <div style={{
        fontSize: 8, fontWeight: 700, padding: "3px 7px", borderRadius: 6,
        background: "#dcfce7", color: "#16a34a", letterSpacing: "0.04em",
      }}>ACTIVO</div>
    </div>

    {/* Progress bar */}
    <div style={{ margin: "2px 0 4px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 9, color: "#64748b", marginBottom: 4 }}>
        <span>Configuración</span>
        <span style={{ fontWeight: 700, color: "#0B0F1A" }}>3/4</span>
      </div>
      <div style={{ height: 4, borderRadius: 2, background: "#E6E8EC", overflow: "hidden" }}>
        <div style={{ width: "75%", height: "100%", background: "linear-gradient(90deg,#1a3a8f,#2563EB)", borderRadius: 2 }} />
      </div>
    </div>

    {/* Quick action cards — gradient idèntic al de l'app real */}
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
      {[
        { icon: Euro, label: "Preu base", value: "120 €" },
        { icon: Lock, label: "Codi caixa", value: "4821" },
        { icon: KeyRound, label: "Check-in", value: "14:00" },
        { icon: Wifi, label: "Wifi", value: "CasaBCN24" },
      ].map(({ icon: Icon, label, value }) => (
        <div key={label} style={{
          background: GRAD_QUICK, borderRadius: 12,
          padding: "8px 10px", display: "flex", alignItems: "center", gap: 8,
          boxShadow: "0 2px 8px rgba(255,122,117,0.25)",
        }}>
          <Icon style={{ width: 14, height: 14, color: "rgba(255,255,255,0.95)", flexShrink: 0 }} />
          <div style={{ minWidth: 0 }}>
            <div style={{ fontSize: 8, color: "rgba(255,255,255,0.8)", lineHeight: 1 }}>{label}</div>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#fff", lineHeight: 1.1, marginTop: 1, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{value}</div>
          </div>
        </div>
      ))}
    </div>

    {/* Lista de pasos */}
    <div style={{ display: "flex", flexDirection: "column", gap: 4, marginTop: 4 }}>
      {[
        { label: "Normas de casa", done: true },
        { label: "Horarios", done: true },
        { label: "Guía del huésped", done: true },
        { label: "Fotos y descripción", done: false },
      ].map((item) => (
        <div key={item.label} style={{
          display: "flex", alignItems: "center", gap: 8,
          padding: "7px 10px", borderRadius: 10,
          background: "#fff", border: "1px solid #E6E8EC",
        }}>
          <div style={{
            width: 16, height: 16, borderRadius: "50%", flexShrink: 0,
            background: item.done ? "#16a34a" : "#fff",
            border: item.done ? "none" : "1.5px solid #CBD5E1",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            {item.done && <Check style={{ width: 10, height: 10, color: "#fff", strokeWidth: 3 }} />}
          </div>
          <span style={{ fontSize: 11, color: item.done ? "#0B0F1A" : "#64748b", fontWeight: item.done ? 500 : 400 }}>
            {item.label}
          </span>
        </div>
      ))}
    </div>

    {/* CTA */}
    <button style={{
      marginTop: "auto", padding: "10px", borderRadius: 12,
      background: BRAND_BLUE, color: "#fff", fontSize: 11, fontWeight: 700,
      border: "none", boxShadow: "0 4px 12px rgba(26,58,143,0.25)",
    }}>
      Continuar · 1 paso más
    </button>
  </div>
);

/** 2. Integrations — targetes de connexió estil config real */
const IntegrationsScreen = () => {
  const integrations = [
    { name: "Airbnb",     status: "Sincronizado",   color: "#ff5a5f", bg: "#fff5f5" },
    { name: "Booking.com", status: "Sincronizado",   color: "#003580", bg: "#eff6ff" },
    { name: "Nuki",       status: "Conectado · 4821", color: "#6366f1", bg: "#eef2ff" },
    { name: "SES.Hospedajes", status: "Auto-configurado", color: "#16a34a", bg: "#f0fdf4" },
  ];
  return (
    <div style={{
      width: "100%", height: "100%", background: "#F7F8FA",
      padding: "18px 14px", display: "flex", flexDirection: "column", gap: 10,
      fontFamily: 'Inter, -apple-system, sans-serif',
    }}>
      <div>
        <div style={{ fontSize: 13, fontWeight: 700, color: "#0B0F1A" }}>Integraciones</div>
        <div style={{ fontSize: 10, color: "#64748b", marginTop: 2 }}>4 conectadas · listo para recibir</div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        {integrations.map((it) => (
          <div key={it.name} style={{
            background: "#fff", borderRadius: 12, padding: "10px 12px",
            border: "1px solid #E6E8EC", display: "flex", alignItems: "center", gap: 10,
          }}>
            <div style={{
              width: 34, height: 34, borderRadius: 10, background: it.bg,
              display: "flex", alignItems: "center", justifyContent: "center",
              color: it.color, fontWeight: 800, fontSize: 13, flexShrink: 0,
            }}>
              {it.name.substring(0, 2).toUpperCase()}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: "#0B0F1A", lineHeight: 1.1 }}>{it.name}</div>
              <div style={{ fontSize: 9, color: "#16a34a", marginTop: 2, display: "flex", alignItems: "center", gap: 3 }}>
                <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#16a34a", display: "inline-block" }} />
                {it.status}
              </div>
            </div>
            <div style={{
              fontSize: 8, fontWeight: 700, padding: "3px 6px", borderRadius: 4,
              background: "#dcfce7", color: "#16a34a",
            }}>✓</div>
          </div>
        ))}
      </div>

      {/* Sync status */}
      <div style={{
        marginTop: "auto", padding: "10px", borderRadius: 12,
        background: "linear-gradient(135deg,#f0fdf4,#ecfdf5)",
        border: "1px solid #bbf7d0",
        display: "flex", alignItems: "center", gap: 8,
      }}>
        <Sparkles style={{ width: 14, height: 14, color: "#16a34a", flexShrink: 0 }} />
        <div style={{ fontSize: 10, color: "#166534", fontWeight: 600 }}>
          Listo para la próxima reserva
        </div>
      </div>
    </div>
  );
};

/** 3. Live feed — timeline d'accions que passen automàticament */
const LiveFeedScreen = () => {
  const events = [
    { time: "14:32", icon: Euro,          color: "#16a34a", bg: "#f0fdf4", title: "Reserva entrante",         detail: "Carlos · Booking · 4 noches · 620 €" },
    { time: "14:33", icon: MessageSquare, color: "#8b5cf6", bg: "#faf5ff", title: "Bienvenida enviada",        detail: "Inglés · plantilla personal" },
    { time: "17:28", icon: Shield,        color: "#1a3a8f", bg: "#eff6ff", title: "SES enviado a Mossos",     detail: "DNI verificado · huésped dentro" },
    { time: "17:29", icon: Euro,          color: "#f97316", bg: "#fff7ed", title: "Taxa turística cobrada",    detail: "4 € · 2 huéspedes · 4 noches" },
    { time: "Hoy",   icon: Sparkles,      color: "#0891b2", bg: "#ecfeff", title: "Limpieza asignada",         detail: "Anna · sábado 11:00" },
  ];
  return (
    <div style={{
      width: "100%", height: "100%", background: "#F7F8FA",
      padding: "18px 14px", display: "flex", flexDirection: "column", gap: 8,
      fontFamily: 'Inter, -apple-system, sans-serif',
    }}>
      {/* Header amb indicador "en vivo" */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <div style={{ fontSize: 13, fontWeight: 700, color: "#0B0F1A" }}>Actividad</div>
          <div style={{ fontSize: 9, color: "#64748b", marginTop: 1 }}>Últimas acciones · automáticas</div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 4, padding: "3px 7px", borderRadius: 10, background: "#dcfce7" }}>
          <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#16a34a", boxShadow: "0 0 4px #16a34a" }} />
          <span style={{ fontSize: 8, fontWeight: 700, color: "#166534", letterSpacing: "0.03em" }}>EN VIVO</span>
        </div>
      </div>

      {/* Feed */}
      <div style={{ display: "flex", flexDirection: "column", gap: 5, position: "relative" }}>
        {/* Linia connectora */}
        <div style={{
          position: "absolute", left: 18, top: 12, bottom: 12, width: 1.5,
          background: "linear-gradient(to bottom, #cbd5e1 0%, transparent 100%)",
        }} />

        {events.map((e, i) => {
          const Icon = e.icon;
          return (
            <div key={i} style={{
              display: "flex", alignItems: "flex-start", gap: 9,
              background: "#fff", borderRadius: 10, padding: "7px 9px",
              border: "1px solid #E6E8EC", position: "relative", zIndex: 1,
            }}>
              <div style={{
                width: 22, height: 22, borderRadius: 7, background: e.bg,
                display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                border: `1px solid ${e.color}20`,
              }}>
                <Icon style={{ width: 11, height: 11, color: e.color }} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 4 }}>
                  <span style={{ fontSize: 10, fontWeight: 700, color: "#0B0F1A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{e.title}</span>
                  <span style={{ fontSize: 8, color: "#94a3b8", flexShrink: 0, fontVariantNumeric: "tabular-nums" }}>{e.time}</span>
                </div>
                <div style={{ fontSize: 9, color: "#64748b", marginTop: 1, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  {e.detail}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

/** 4. Dashboard — KPI + pròxim event, estil de l'app real */
const DashboardScreen = () => (
  <div style={{
    width: "100%", height: "100%", background: "#F7F8FA",
    padding: "18px 14px", display: "flex", flexDirection: "column", gap: 10,
    fontFamily: 'Inter, -apple-system, sans-serif',
  }}>
    {/* Header */}
    <div>
      <div style={{ fontSize: 9, color: "#64748b", letterSpacing: "0.04em", textTransform: "uppercase", fontWeight: 700 }}>Abril 2026</div>
      <div style={{ fontSize: 15, fontWeight: 800, color: "#0B0F1A", marginTop: 1 }}>3.100 €</div>
      <div style={{ display: "flex", alignItems: "center", gap: 3, marginTop: 2 }}>
        <TrendingUp style={{ width: 10, height: 10, color: "#16a34a" }} />
        <span style={{ fontSize: 9, color: "#16a34a", fontWeight: 700 }}>+15% vs año anterior</span>
      </div>
    </div>

    {/* KPI Grid */}
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
      {[
        { label: "Ocupación", value: "87%",   sub: "26 de 30 noches",  bg: "#eff6ff", val: "#1a3a8f" },
        { label: "Check-ins",  value: "12",    sub: "Todos enviados",   bg: "#f0fdf4", val: "#16a34a" },
        { label: "Mensajes",   value: "47",    sub: "IA respondió 42",   bg: "#faf5ff", val: "#8b5cf6" },
        { label: "Incidencias", value: "0",    sub: "Sin pendientes",   bg: "#fff7ed", val: "#f97316" },
      ].map((k) => (
        <div key={k.label} style={{
          padding: "9px 10px", borderRadius: 10, background: k.bg,
          border: `1px solid ${k.val}18`,
        }}>
          <div style={{ fontSize: 8, fontWeight: 700, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.05em" }}>{k.label}</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: k.val, lineHeight: 1.1, marginTop: 2, fontVariantNumeric: "tabular-nums" }}>{k.value}</div>
          <div style={{ fontSize: 8, color: "#94a3b8", marginTop: 1 }}>{k.sub}</div>
        </div>
      ))}
    </div>

    {/* Next event card */}
    <div style={{
      padding: "10px 12px", borderRadius: 12,
      background: "#fff", border: "1px solid #E6E8EC",
      display: "flex", alignItems: "center", gap: 10,
    }}>
      <div style={{
        width: 28, height: 28, borderRadius: 8,
        background: "linear-gradient(135deg,#1a3a8f,#2563EB)",
        display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
      }}>
        <CalendarDays style={{ width: 14, height: 14, color: "#fff" }} />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 10, fontWeight: 700, color: "#0B0F1A", lineHeight: 1.1 }}>Próximo check-in</div>
        <div style={{ fontSize: 9, color: "#64748b", marginTop: 2 }}>Mañana · 15:00 · Sarah D.</div>
      </div>
      <ArrowUpRight style={{ width: 14, height: 14, color: "#94a3b8", flexShrink: 0 }} />
    </div>

    {/* Status footer */}
    <div style={{
      marginTop: "auto", padding: "8px 10px", borderRadius: 10,
      background: "linear-gradient(135deg,#f0fdf4,#ecfdf5)",
      border: "1px solid #bbf7d0",
      display: "flex", alignItems: "center", gap: 6,
    }}>
      <Check style={{ width: 12, height: 12, color: "#16a34a", strokeWidth: 3 }} />
      <span style={{ fontSize: 10, fontWeight: 600, color: "#166534" }}>Todo al día. Relaja.</span>
    </div>
  </div>
);

/* ─────────────────────────────────────────────────────────
   PHONE FRAME — iPhone 15 Pro inspired (titanium edge + glass)
───────────────────────────────────────────────────────── */

/* SVG icons reals d'iOS per a status bar */
const SignalIcon = () => (
  <svg width="17" height="11" viewBox="0 0 17 11" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <rect x="0"  y="7" width="3" height="4"  rx="0.7" fill="#0B0F1A" />
    <rect x="4.5" y="5" width="3" height="6"  rx="0.7" fill="#0B0F1A" />
    <rect x="9"  y="2.5" width="3" height="8.5" rx="0.7" fill="#0B0F1A" />
    <rect x="13.5" y="0" width="3" height="11" rx="0.7" fill="#0B0F1A" />
  </svg>
);

const WifiIcon = () => (
  <svg width="15" height="11" viewBox="0 0 15 11" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M7.5 2C10 2 12.3 3 14 4.7L13 5.7C11.5 4.2 9.6 3.3 7.5 3.3S3.5 4.2 2 5.7L1 4.7C2.7 3 5 2 7.5 2Z" fill="#0B0F1A"/>
    <path d="M7.5 4.8C9.1 4.8 10.7 5.4 11.8 6.5L10.8 7.5C10 6.7 8.8 6.2 7.5 6.2S5 6.7 4.2 7.5L3.2 6.5C4.3 5.4 5.9 4.8 7.5 4.8Z" fill="#0B0F1A"/>
    <circle cx="7.5" cy="9" r="1.3" fill="#0B0F1A"/>
  </svg>
);

const BatteryIcon = () => (
  <svg width="26" height="12" viewBox="0 0 26 12" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <rect x="0.5" y="0.5" width="22" height="11" rx="3" stroke="#0B0F1A" strokeOpacity="0.4" fill="none" />
    <rect x="2" y="2" width="16.5" height="8" rx="1.5" fill="#0B0F1A" />
    <rect x="23.2" y="3.8" width="2" height="4.4" rx="1" fill="#0B0F1A" opacity="0.4" />
  </svg>
);

const PhoneFrame = ({ children }: { children?: React.ReactNode }) => (
  <div style={{
    position: "relative",
    width: "278px",
    margin: "0 auto",
  }}>
    {/* ── Side buttons (titani) ── */}
    {/* Silent toggle */}
    <div style={{
      position: "absolute", left: "-2px", top: "118px",
      width: "3px", height: "28px",
      background: "linear-gradient(90deg, #8e8e93 0%, #48484a 50%, #2c2c2e 100%)",
      borderRadius: "2px 0 0 2px",
      boxShadow: "inset -1px 0 1px rgba(0,0,0,0.5)",
    }} />
    {/* Volume up */}
    <div style={{
      position: "absolute", left: "-2px", top: "160px",
      width: "3px", height: "52px",
      background: "linear-gradient(90deg, #8e8e93 0%, #48484a 50%, #2c2c2e 100%)",
      borderRadius: "2px 0 0 2px",
      boxShadow: "inset -1px 0 1px rgba(0,0,0,0.5)",
    }} />
    {/* Volume down */}
    <div style={{
      position: "absolute", left: "-2px", top: "224px",
      width: "3px", height: "52px",
      background: "linear-gradient(90deg, #8e8e93 0%, #48484a 50%, #2c2c2e 100%)",
      borderRadius: "2px 0 0 2px",
      boxShadow: "inset -1px 0 1px rgba(0,0,0,0.5)",
    }} />
    {/* Power / side button */}
    <div style={{
      position: "absolute", right: "-2px", top: "180px",
      width: "3px", height: "78px",
      background: "linear-gradient(-90deg, #8e8e93 0%, #48484a 50%, #2c2c2e 100%)",
      borderRadius: "0 2px 2px 0",
      boxShadow: "inset 1px 0 1px rgba(0,0,0,0.5)",
    }} />

    {/* ── Outer chassis (titanium) ── */}
    <div style={{
      position: "relative",
      borderRadius: "54px",
      padding: "4px",
      background: `
        linear-gradient(135deg, #4a4a4f 0%, #2c2c30 20%, #1a1a1e 45%, #0f0f12 70%, #2e2e33 100%)
      `,
      boxShadow: `
        0 80px 100px -30px rgba(15,23,42,0.35),
        0 40px 60px -20px rgba(15,23,42,0.25),
        0 15px 25px -10px rgba(15,23,42,0.15),
        0 3px 6px rgba(15,23,42,0.1),
        inset 0 1.5px 0.5px rgba(255,255,255,0.22),
        inset 0 -1.5px 0.5px rgba(0,0,0,0.5),
        inset 1.5px 0 0.5px rgba(255,255,255,0.05),
        inset -1.5px 0 0.5px rgba(0,0,0,0.3)
      `,
    }}>

      {/* Inner bezel (glass black) */}
      <div style={{
        position: "relative",
        borderRadius: "50px",
        padding: "9px",
        background: "#000",
        boxShadow: "inset 0 0 0 1px rgba(40,40,40,0.6)",
      }}>

        {/* Dynamic Island */}
        <div style={{
          position: "absolute",
          top: "15px",
          left: "50%",
          transform: "translateX(-50%)",
          width: "112px",
          height: "32px",
          background: "linear-gradient(180deg, #0a0a0a 0%, #000 100%)",
          borderRadius: "16px",
          zIndex: 30,
          boxShadow: `
            inset 0 1px 1px rgba(40,40,40,0.6),
            inset 0 -1px 1px rgba(0,0,0,0.8),
            0 1px 2px rgba(0,0,0,0.5)
          `,
        }}>
          {/* Subtle camera dot */}
          <div style={{
            position: "absolute",
            right: "10px", top: "50%",
            transform: "translateY(-50%)",
            width: "7px", height: "7px",
            borderRadius: "50%",
            background: "radial-gradient(circle at 35% 35%, #2a2a2e 0%, #0a0a0a 70%)",
            boxShadow: "inset 0 0 1px rgba(255,255,255,0.1)",
          }} />
        </div>

        {/* Screen */}
        <div style={{
          position: "relative",
          borderRadius: "41px",
          overflow: "hidden",
          background: "#F7F8FA",
          aspectRatio: "9/19.5",
          display: "flex",
          flexDirection: "column",
          boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.4)",
        }}>

          {/* Glass top reflection — subtle */}
          <div style={{
            position: "absolute",
            top: 0, left: 0, right: 0, height: "45%",
            background: "linear-gradient(168deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.04) 30%, transparent 65%)",
            pointerEvents: "none",
            zIndex: 50,
            mixBlendMode: "screen",
          }} />

          {/* Glass edge light — side */}
          <div style={{
            position: "absolute",
            top: 0, left: 0, width: "1px", height: "100%",
            background: "linear-gradient(180deg, rgba(255,255,255,0.35) 0%, transparent 50%)",
            pointerEvents: "none",
            zIndex: 51,
          }} />

          {/* Status bar — iOS authentic */}
          <div style={{
            height: "52px", background: "#F7F8FA", flexShrink: 0,
            display: "flex", alignItems: "flex-end", justifyContent: "space-between",
            padding: "0 28px 10px",
            fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif",
            position: "relative",
            zIndex: 10,
          }}>
            <span style={{ fontSize: "15px", fontWeight: 600, color: "#0B0F1A", letterSpacing: "-0.01em" }}>9:41</span>
            <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
              <SignalIcon />
              <WifiIcon />
              <BatteryIcon />
            </div>
          </div>

          {/* Content */}
          <div style={{ flex: 1, overflow: "hidden", position: "relative" }}>
            {children}
          </div>

          {/* Home indicator bar */}
          <div style={{
            position: "absolute",
            bottom: "6px", left: "50%",
            transform: "translateX(-50%)",
            width: "120px", height: "4px",
            borderRadius: "2px",
            background: "rgba(15, 23, 42, 0.35)",
            zIndex: 10,
          }} />
        </div>
      </div>
    </div>

    {/* ── Reflex floor (mirroir subtle) ── */}
    <div style={{
      position: "absolute",
      bottom: "-40px", left: "10%", right: "10%",
      height: "80px",
      background: "radial-gradient(ellipse at top, rgba(15,23,42,0.15) 0%, transparent 70%)",
      filter: "blur(8px)",
      pointerEvents: "none",
      zIndex: -1,
    }} />
  </div>
);

/* ─────────────────────────────────────────────────────────
   STEP ROW
───────────────────────────────────────────────────────── */
type StepData = { num: string; visual: string; tag: string; title: string; description: string };

const StepRow = ({ step, index }: { step: StepData; index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "start 30%"] });
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [40, 0]);

  const isEven = index % 2 === 1;
  const isResult = index === 3;
  const circleColor = isResult ? "#16a34a" : BRAND_BLUE;

  const visual = (
    <PhoneFrame>
      {step.visual === "setup" && <SetupScreen />}
      {step.visual === "integrations" && <IntegrationsScreen />}
      {step.visual === "live" && <LiveFeedScreen />}
      {step.visual === "dashboard" && <DashboardScreen />}
    </PhoneFrame>
  );

  const text = (
    <div style={{ maxWidth: "440px" }}>
      <div style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
        <span style={{
          display: "inline-flex", alignItems: "center", justifyContent: "center",
          width: 22, height: 22, borderRadius: "50%",
          background: `${circleColor}15`, color: circleColor,
          fontSize: 11, fontWeight: 800, fontVariantNumeric: "tabular-nums",
        }}>{index + 1}</span>
        <span style={{
          fontSize: 11, fontWeight: 700, letterSpacing: "0.12em",
          textTransform: "uppercase", color: circleColor,
        }}>
          {step.tag}
        </span>
      </div>
      <h3 style={{
        fontSize: "clamp(1.6rem, 2.9vw, 2.4rem)", fontWeight: 800,
        letterSpacing: "-0.035em", lineHeight: 1.15,
        color: "#0B0F1A", marginBottom: 18,
      }}>
        {step.title}
      </h3>
      <p style={{
        fontSize: "1.05rem", lineHeight: 1.7,
        color: "#475569",
      }}>
        {step.description}
      </p>
    </div>
  );

  return (
    <motion.div
      ref={ref}
      style={{ opacity, y }}
      className="relative"
    >
      {/* Watermark number */}
      <div style={{
        position: "absolute",
        top: "50%", transform: "translateY(-50%)",
        [isEven ? "right" : "left"]: "-20px",
        fontSize: "clamp(8rem, 15vw, 14rem)",
        fontWeight: 900,
        color: "rgba(15, 23, 42, 0.035)",
        lineHeight: 1,
        letterSpacing: "-0.05em",
        userSelect: "none",
        pointerEvents: "none",
        zIndex: 0,
      }}>
        {step.num}
      </div>

      {/* Desktop alternating grid */}
      <div
        className="hidden md:grid items-center"
        style={{
          gridTemplateColumns: "1fr 40px 1fr",
          gap: "clamp(1rem, 3vw, 3rem)",
          position: "relative",
          zIndex: 1,
        }}
      >
        {isEven ? (
          <>
            <div className="flex justify-center">{visual}</div>
            <div className="flex justify-center">
              <div style={{
                width: 44, height: 44, borderRadius: "50%",
                background: `linear-gradient(135deg, ${circleColor} 0%, ${isResult ? "#22c55e" : "#2563EB"} 100%)`,
                display: "flex", alignItems: "center", justifyContent: "center",
                color: "#fff", fontSize: 14, fontWeight: 800, fontVariantNumeric: "tabular-nums",
                flexShrink: 0, position: "relative", zIndex: 2,
                boxShadow: `0 0 0 5px #fff, 0 0 0 7px ${circleColor}22, 0 10px 24px -6px ${circleColor}55`,
              }}>
                {index + 1}
              </div>
            </div>
            <div className="flex justify-start">{text}</div>
          </>
        ) : (
          <>
            <div className="flex justify-end">{text}</div>
            <div className="flex justify-center">
              <div style={{
                width: 44, height: 44, borderRadius: "50%",
                background: `linear-gradient(135deg, ${circleColor} 0%, ${isResult ? "#22c55e" : "#2563EB"} 100%)`,
                display: "flex", alignItems: "center", justifyContent: "center",
                color: "#fff", fontSize: 14, fontWeight: 800, fontVariantNumeric: "tabular-nums",
                flexShrink: 0, position: "relative", zIndex: 2,
                boxShadow: `0 0 0 5px #fff, 0 0 0 7px ${circleColor}22, 0 10px 24px -6px ${circleColor}55`,
              }}>
                {index + 1}
              </div>
            </div>
            <div className="flex justify-center">{visual}</div>
          </>
        )}
      </div>

      {/* Mobile stacked */}
      <div className="flex flex-col gap-10 items-center md:hidden" style={{ position: "relative", zIndex: 1 }}>
        {visual}
        <div className="text-center">{text}</div>
      </div>
    </motion.div>
  );
};

/* ─────────────────────────────────────────────────────────
   MAIN
───────────────────────────────────────────────────────── */
const StepsBlock = () => {
  const { t } = useTranslation("home");
  const stepList = t("steps.list", { returnObjects: true }) as Array<{ tag: string; title: string; description: string }>;
  const steps: StepData[] = STEP_VISUALS.map((sv, i) => ({
    ...sv,
    tag: stepList[i]?.tag ?? "",
    title: stepList[i]?.title ?? "",
    description: stepList[i]?.description ?? "",
  }));

  const headerRef = useRef(null);
  const { scrollYProgress: headerProgress } = useScroll({
    target: headerRef,
    offset: ["start 90%", "start 40%"],
  });
  const headerOpacity = useTransform(headerProgress, [0, 1], [0, 1]);
  const headerY = useTransform(headerProgress, [0, 1], [30, 0]);

  return (
    <section id="steps" className="py-24 md:py-40 px-6 md:px-12 lg:px-20 bg-white overflow-hidden">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <motion.div
          ref={headerRef}
          style={{ opacity: headerOpacity, y: headerY }}
          className="text-center mb-24 md:mb-36"
        >
          <p style={{
            fontSize: "12px", fontWeight: 700, letterSpacing: "0.12em",
            textTransform: "uppercase", color: BRAND_BLUE, marginBottom: "16px",
          }}>
            {t("steps.eyebrow")}
          </p>
          <h2 style={{
            fontSize: "clamp(2rem, 5vw, 3.8rem)", fontWeight: 800,
            letterSpacing: "-0.04em", lineHeight: 1.1,
            color: "#0B0F1A", marginBottom: "18px",
          }}>
            {t("steps.title_1")}<br />
            <span className="font-accent" style={{ color: BRAND_BLUE, fontWeight: 300, fontSize: "1.15em" }}>
              {t("steps.title_2")}
            </span>
          </h2>
          <p style={{ fontSize: "1.1rem", color: "#64748b", lineHeight: 1.6, maxWidth: "520px", margin: "0 auto" }}>
            {t("steps.subtitle")}
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative flex flex-col gap-24 md:gap-40">

          {/* Connector gradient */}
          <div
            className="hidden md:block"
            style={{
              position: "absolute",
              top: 22,
              bottom: 22,
              left: "50%",
              transform: "translateX(-50%)",
              width: 2,
              background: `linear-gradient(to bottom, ${BRAND_BLUE}30 0%, ${BRAND_BLUE}20 50%, #16a34a30 100%)`,
              zIndex: 0,
              pointerEvents: "none",
            }}
            aria-hidden="true"
          />

          {steps.map((step, i) => (
            <StepRow key={step.num} step={step} index={i} />
          ))}
        </div>

        {/* Footer tagline */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{ marginTop: 80, textAlign: "center" }}
        >
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 12,
            padding: "10px 18px", borderRadius: 999,
            background: "#F7F8FA", border: "1px solid #E6E8EC",
            fontSize: 13, color: "#64748b",
          }}>
            <span style={{ display: "inline-flex", gap: 4 }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#16a34a" }} />
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#16a34a" }} />
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#16a34a" }} />
            </span>
            <span>{t("steps.footer_tagline")}</span>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default StepsBlock;
