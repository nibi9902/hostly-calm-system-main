import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import checkinScreen from "@/assets/checkin-screen.png";

const appleEase = [0.22, 1, 0.36, 1] as const;

/* ── Step data ── */
const steps = [
  {
    num: "01",
    tag: "Primero",
    title: "Configura tu apartamento en minutos",
    description:
      "Añade tu propiedad, define las normas, horarios y la guía para el huésped. Una vez. Para siempre. Sin formularios interminables.",
    visual: "setup",
  },
  {
    num: "02",
    tag: "Segundo",
    title: "Conecta tus plataformas",
    description:
      "Vincula Airbnb, Booking y tus cerraduras en un solo clic. El calendario se sincroniza solo. Los precios se actualizan automáticamente según la demanda.",
    visual: "calendar",
  },
  {
    num: "03",
    tag: "Tercero",
    title: "El sistema lo gestiona todo",
    description:
      "Cuando entra una reserva: el check-in se activa, la limpieza queda asignada, el registro policial se envía. Tú no tienes que hacer nada.",
    visual: "checkin",
  },
  {
    num: "04",
    tag: "Resultado",
    title: "Desconecta. Hostly trabaja por ti.",
    description:
      "Abre la app cuando quieras. Todo está en orden. Entradas, salidas, incidencias resueltas. Tu negocio funciona sin que estés pendiente.",
    visual: "dashboard",
  },
];

/* ── Styled mockup screens ── */

const SetupScreen = () => (
  <div style={{
    width: "100%", height: "100%", background: "#fff",
    borderRadius: "20px", padding: "24px", display: "flex", flexDirection: "column", gap: "16px",
  }}>
    <div style={{ fontSize: "13px", fontWeight: 700, color: "#1e293b", marginBottom: "4px" }}>
      Mi apartamento
    </div>
    {[
      { label: "Nombre", value: "Luminoso Eixample", done: true },
      { label: "Normas de casa", value: "Configuradas", done: true },
      { label: "Horarios check-in", value: "14:00 – 22:00", done: true },
      { label: "Guía del huésped", value: "Añadir wifi, acceso…", done: false },
    ].map((item, i) => (
      <div key={i} style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "10px 12px", borderRadius: "10px",
        background: item.done ? "#f0fdf4" : "#f8fafc",
        border: `1px solid ${item.done ? "#bbf7d0" : "#e2e8f0"}`,
      }}>
        <div>
          <div style={{ fontSize: "10px", color: "#94a3b8", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>{item.label}</div>
          <div style={{ fontSize: "13px", color: item.done ? "#16a34a" : "#64748b", fontWeight: 500, marginTop: "1px" }}>{item.value}</div>
        </div>
        <div style={{
          width: "20px", height: "20px", borderRadius: "50%",
          background: item.done ? "#16a34a" : "#e2e8f0",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: "11px", color: item.done ? "#fff" : "#94a3b8",
        }}>
          {item.done ? "✓" : "–"}
        </div>
      </div>
    ))}
    <div style={{
      marginTop: "auto", padding: "11px", borderRadius: "10px",
      background: "hsl(229 65% 52%)", color: "#fff", textAlign: "center",
      fontSize: "13px", fontWeight: 600,
    }}>
      Guardar configuración
    </div>
  </div>
);

const CalendarScreen = () => {
  const days = ["L", "M", "X", "J", "V", "S", "D"];
  const grid = [
    [null, 1, 2, 3, 4, 5, 6],
    [7, 8, 9, 10, 11, 12, 13],
    [14, 15, 16, 17, 18, 19, 20],
    [21, 22, 23, 24, 25, 26, 27],
    [28, 29, 30, 31, null, null, null],
  ];
  const booked = [8, 9, 10, 11, 18, 19, 20, 21, 22];
  return (
    <div style={{
      width: "100%", height: "100%", background: "#fff",
      borderRadius: "20px", padding: "20px", display: "flex", flexDirection: "column", gap: "12px",
    }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{ fontSize: "13px", fontWeight: 700, color: "#1e293b" }}>Marzo 2026</span>
        <div style={{ display: "flex", gap: "8px" }}>
          {["airbnb", "booking"].map(p => (
            <span key={p} style={{
              fontSize: "9px", fontWeight: 700, padding: "3px 8px", borderRadius: "6px",
              background: p === "airbnb" ? "#fff0ee" : "#003580", color: p === "airbnb" ? "#ff5a5f" : "#fff",
            }}>{p === "airbnb" ? "Airbnb" : "Booking"}</span>
          ))}
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "2px" }}>
        {days.map(d => (
          <div key={d} style={{ textAlign: "center", fontSize: "9px", fontWeight: 700, color: "#94a3b8", padding: "4px 0" }}>{d}</div>
        ))}
        {grid.flat().map((day, i) => {
          const isBooked = day && booked.includes(day);
          const isStart = day === 8 || day === 18;
          const isEnd = day === 11 || day === 22;
          return (
            <div key={i} style={{
              textAlign: "center", fontSize: "11px", fontWeight: 500,
              padding: "5px 2px", borderRadius: isStart || isEnd ? "50%" : "0",
              background: isBooked ? (booked.indexOf(day!) < 4 ? "#ff5a5f22" : "#003580" + "22") : "transparent",
              color: day ? (isBooked ? "#1e293b" : "#64748b") : "transparent",
            }}>
              {day ?? "."}
            </div>
          );
        })}
      </div>
      <div style={{
        padding: "10px 12px", borderRadius: "10px",
        background: "#f0fdf4", border: "1px solid #bbf7d0",
        fontSize: "12px", color: "#16a34a", fontWeight: 600, display: "flex", alignItems: "center", gap: "6px",
      }}>
        <span>⚡</span> Sincronizado · Precios actualizados
      </div>
    </div>
  );
};

const DashboardScreen = () => (
  <div style={{
    width: "100%", height: "100%", background: "#fff",
    borderRadius: "20px", padding: "20px", display: "flex", flexDirection: "column", gap: "12px",
  }}>
    <div style={{ fontSize: "13px", fontWeight: 700, color: "#1e293b" }}>Esta semana</div>
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
      {[
        { label: "Ingresos", value: "€1.840", sub: "+12% vs semana ant.", color: "#f0fdf4", border: "#bbf7d0", val: "#16a34a" },
        { label: "Ocupación", value: "87%", sub: "6 de 7 noches", color: "#eff6ff", border: "#bfdbfe", val: "#2563eb" },
        { label: "Check-ins", value: "3", sub: "Todos completados", color: "#faf5ff", border: "#e9d5ff", val: "#7c3aed" },
        { label: "Incidencias", value: "0", sub: "Sin pendientes", color: "#f0fdf4", border: "#bbf7d0", val: "#16a34a" },
      ].map((s, i) => (
        <div key={i} style={{
          padding: "10px", borderRadius: "10px",
          background: s.color, border: `1px solid ${s.border}`,
        }}>
          <div style={{ fontSize: "9px", fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.05em" }}>{s.label}</div>
          <div style={{ fontSize: "20px", fontWeight: 800, color: s.val, lineHeight: 1.2, marginTop: "2px" }}>{s.value}</div>
          <div style={{ fontSize: "9px", color: "#94a3b8", marginTop: "2px" }}>{s.sub}</div>
        </div>
      ))}
    </div>
    <div style={{
      padding: "10px 12px", borderRadius: "10px",
      background: "#f8fafc", border: "1px solid #e2e8f0",
      fontSize: "12px", color: "#64748b",
    }}>
      <span style={{ fontWeight: 600, color: "#1e293b" }}>Próximo check-out</span> · Mañana 11:00 · Limpieza asignada ✓
    </div>
  </div>
);

/* ── Phone frame wrapper ── */
const PhoneFrame = ({ children, image }: { children?: React.ReactNode; image?: string }) => (
  <div style={{
    position: "relative",
    width: "260px",
    margin: "0 auto",
    filter: "drop-shadow(0 32px 48px rgba(0,0,0,0.12)) drop-shadow(0 8px 16px rgba(0,0,0,0.08))",
  }}>
    {/* Phone shell */}
    <div style={{
      background: "#1a1a1a",
      borderRadius: "44px",
      padding: "12px",
      position: "relative",
    }}>
      {/* Notch */}
      <div style={{
        position: "absolute", top: "12px", left: "50%", transform: "translateX(-50%)",
        width: "80px", height: "22px", background: "#1a1a1a",
        borderRadius: "0 0 14px 14px", zIndex: 10,
      }} />
      {/* Screen */}
      <div style={{
        borderRadius: "34px",
        overflow: "hidden",
        background: "#f8fafc",
        aspectRatio: "9/19",
        display: "flex",
        flexDirection: "column",
        position: "relative",
      }}>
        {/* Status bar */}
        <div style={{
          height: "32px", background: "#fff", flexShrink: 0,
          display: "flex", alignItems: "flex-end", justifyContent: "space-between",
          padding: "0 20px 4px",
        }}>
          <span style={{ fontSize: "10px", fontWeight: 700, color: "#1e293b" }}>9:41</span>
          <span style={{ fontSize: "10px", color: "#94a3b8" }}>●●●</span>
        </div>
        {/* Content */}
        <div style={{ flex: 1, overflow: "hidden", position: "relative" }}>
          {image ? (
            <img src={image} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top" }} />
          ) : children}
        </div>
      </div>
    </div>
  </div>
);

/* ── Single step row ── */
const StepRow = ({ step, index }: { step: typeof steps[0]; index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "start 30%"] });
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [40, 0]);

  const isEven = index % 2 === 1;

  const visual = (
    <PhoneFrame image={step.visual === "checkin" ? checkinScreen : undefined}>
      {step.visual === "setup" && <SetupScreen />}
      {step.visual === "calendar" && <CalendarScreen />}
      {step.visual === "dashboard" && <DashboardScreen />}
    </PhoneFrame>
  );

  const text = (
    <div style={{ maxWidth: "420px" }}>
      <span style={{
        display: "inline-block", fontSize: "11px", fontWeight: 700,
        letterSpacing: "0.1em", textTransform: "uppercase",
        color: "hsl(229 65% 52%)", marginBottom: "12px",
      }}>
        {step.tag}
      </span>
      <h3 style={{
        fontSize: "clamp(1.5rem, 2.8vw, 2.2rem)", fontWeight: 800,
        letterSpacing: "-0.035em", lineHeight: 1.2,
        color: "#0f172a", marginBottom: "16px",
      }}>
        {step.title}
      </h3>
      <p style={{
        fontSize: "1rem", lineHeight: 1.7,
        color: "#64748b",
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
        color: "rgba(15, 23, 42, 0.04)",
        lineHeight: 1,
        letterSpacing: "-0.05em",
        userSelect: "none",
        pointerEvents: "none",
        zIndex: 0,
      }}>
        {step.num}
      </div>

      {/* Content row */}
      {/* Desktop: alternating grid */}
      <div
        className="hidden md:grid items-center"
        style={{
          gridTemplateColumns: "1fr 1fr",
          gap: "clamp(2rem, 6vw, 6rem)",
          position: "relative",
          zIndex: 1,
        }}
      >
        {isEven ? (
          <>
            <div className="flex justify-center">{visual}</div>
            <div className="flex justify-start">{text}</div>
          </>
        ) : (
          <>
            <div className="flex justify-end">{text}</div>
            <div className="flex justify-center">{visual}</div>
          </>
        )}
      </div>

      {/* Mobile: stacked */}
      <div className="flex flex-col gap-10 items-center md:hidden" style={{ position: "relative", zIndex: 1 }}>
        {visual}
        <div className="text-center">{text}</div>
      </div>
    </motion.div>
  );
};

/* ── Main export ── */
const StepsBlock = () => {
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
            textTransform: "uppercase", color: "hsl(229 65% 52%)", marginBottom: "16px",
          }}>
            Cómo funciona
          </p>
          <h2 style={{
            fontSize: "clamp(2rem, 5vw, 3.8rem)", fontWeight: 800,
            letterSpacing: "-0.04em", lineHeight: 1.1,
            color: "#0f172a", marginBottom: "16px",
          }}>
            Listo en minutos.<br />
            <em style={{ color: "hsl(229 65% 52%)", fontStyle: "italic" }}>Funcionando para siempre.</em>
          </h2>
          <p style={{ fontSize: "1.05rem", color: "#64748b", lineHeight: 1.6, maxWidth: "480px", margin: "0 auto" }}>
            Cuatro pasos. Y tu apartamento pasa a gestionarse solo.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="flex flex-col gap-24 md:gap-40">
          {steps.map((step, i) => (
            <StepRow key={step.num} step={step} index={i} />
          ))}
        </div>

        {/* Footer tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{
            textAlign: "center", marginTop: "80px",
            fontSize: "13px", color: "#94a3b8",
          }}
        >
          Setup guiado en 10 minutos · Soporte humano en cada paso
        </motion.p>

      </div>
    </section>
  );
};

export default StepsBlock;
