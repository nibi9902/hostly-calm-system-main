import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";

const ease = [0.22, 1, 0.36, 1] as const;

/* Tier gratis — només el que de veritat fa el plan free.
   Honest: l'usuari només pot enviar partes i veure'n l'estat. */
const freeFeatures = [
  "Envío automático del parte a la policía",
  "Estado de cada check-in (enviado y recibido)",
  "Lista de huéspedes registrados por reserva",
  "Sin límite de apartamentos",
  "Sin caducidad. Sin tarjeta.",
];

/* Tier complet — focus en valor operatiu (no enumerem NRUA/taxa per no
   filtrar que la part legal completa no és al free). */
const paidFeatures = [
  "Todo lo del plan gratis",
  "Sincronización Airbnb + Booking en tiempo real",
  "Mensajes con IA en WhatsApp (5 idiomas)",
  "Coordinación automática de limpiezas",
  "Precios dinámicos según demanda",
  "Cierre de mes y finanzas",
  "Onboarding 1 a 1 el primer mes",
  "Soporte humano. No chatbot.",
];

const PricingBlock = () => {
  return (
    <section
      id="precios"
      className="py-24 md:py-32 px-6 md:px-12 lg:px-20 bg-background"
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease }}
        className="max-w-5xl mx-auto"
      >
        {/* ── Header ── */}
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-5xl font-bold text-foreground tracking-tight leading-[1.1] mb-4">
            Un plan gratis. Otro completo.<br className="hidden md:block" /> Sin packs.
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Una sola app, un solo precio. Y un tier gratis para siempre con la parte legal.
          </p>
        </div>

        {/* ── Two-tier grid ── */}
        <div className="grid lg:grid-cols-2 gap-5 md:gap-6 mb-10">

          {/* ─── TIER GRATIS ─── */}
          <div className="relative rounded-3xl bg-card border border-border p-6 md:p-10 flex flex-col">
            {/* Eyebrow */}
            <div className="flex items-center gap-2 mb-6">
              <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#16a34a] bg-[#dcfce7] px-2.5 py-1 rounded-full">
                Gratis · Para siempre
              </span>
            </div>

            {/* Price */}
            <div className="mb-2">
              <span className="text-5xl md:text-6xl font-black tracking-tight text-foreground" style={{ color: "#16a34a" }}>
                0&nbsp;€
              </span>
            </div>
            <p className="text-sm text-muted-foreground mb-5">
              Sin tarjeta. Sin caducidad.
            </p>

            <p className="text-foreground text-sm leading-relaxed mb-7 max-w-sm">
              Para los que solo quieren cumplir con la policía sin pagar nada al mes.
            </p>

            {/* Features */}
            <ul className="space-y-3 mb-8 flex-1">
              {freeFeatures.map((f) => (
                <li key={f} className="flex items-start gap-3 text-sm text-foreground leading-snug">
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-[#dcfce7] flex items-center justify-center mt-0.5">
                    <Check className="w-3 h-3 text-[#16a34a]" strokeWidth={3} />
                  </span>
                  <span>{f}</span>
                </li>
              ))}
            </ul>

            {/* CTA */}
            <a
              href="https://app.hostlylabs.com/signup"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl border border-border bg-background text-foreground font-semibold text-sm hover:bg-muted transition-colors"
            >
              Crear cuenta gratis
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          {/* ─── TIER COMPLET ─── */}
          <div
            className="relative rounded-3xl p-6 md:p-10 flex flex-col text-white overflow-hidden"
            style={{ background: "linear-gradient(160deg, #1a3a8f 0%, #2563EB 100%)" }}
          >
            {/* Glow accent */}
            <div
              aria-hidden
              className="pointer-events-none absolute -top-20 -right-20 w-60 h-60 rounded-full"
              style={{ background: "radial-gradient(circle, rgba(255,255,255,0.12) 0%, transparent 70%)" }}
            />

            <div className="relative flex flex-col flex-1">
              {/* Eyebrow + popular badge */}
              <div className="flex items-center justify-between gap-2 mb-6">
                <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/90 bg-white/15 px-2.5 py-1 rounded-full">
                  Hostly Completo
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#1a3a8f] bg-[#fde68a] px-2.5 py-1 rounded-full">
                  Recomendado
                </span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-5xl md:text-6xl font-black tracking-tight">40&nbsp;€</span>
                <span className="text-white/70 text-base">/mes por apt.</span>
              </div>
              <p className="text-sm text-white/70 mb-5">
                <span className="font-semibold text-white">35 €/mes</span> por apartamento desde 5 apt.
              </p>

              <p className="text-white/90 text-sm leading-relaxed mb-7 max-w-sm">
                Todo el sistema en una app. Reemplaza Chekin, Smoobu, PriceLabs y Excel.
              </p>

              {/* Features */}
              <ul className="space-y-3 mb-8 flex-1">
                {paidFeatures.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm text-white/95 leading-snug">
                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-white/20 flex items-center justify-center mt-0.5">
                      <Check className="w-3 h-3 text-white" strokeWidth={3} />
                    </span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <a
                href="https://app.hostlylabs.com/signup"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white text-[#1a3a8f] font-semibold text-sm hover:bg-white/90 transition-colors shadow-[0_4px_14px_rgba(0,0,0,0.15)]"
              >
                Probar 14 días gratis
                <ArrowRight className="w-4 h-4" />
              </a>
              <p className="text-xs text-white/60 mt-3 text-center">
                Sin tarjeta · Sin permanencia · Cancela cuando quieras
              </p>
            </div>
          </div>

        </div>

        {/* ── Comparativa preu — anchor visual del valor ── */}
        <div className="text-center mb-10">
          <p className="text-sm text-muted-foreground">
            <span className="line-through decoration-slate-300 decoration-[2px]">~ 120 €/mes pagando 5 apps por separado</span>
            <span className="text-foreground font-semibold"> · 40 €/mes con Hostly</span>
          </p>
        </div>

        {/* ── Referral — formula visual instantània 5 → 1 ── */}
        <div className="rounded-2xl bg-primary/5 border border-primary/12 p-6 md:p-7">
          <div className="flex items-center gap-2 mb-5">
            <span className="text-base">🎁</span>
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary">
              Programa de referidos
            </span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-7">
            {/* Formula visual: 5 usuaris → 1 apartament gratis */}
            <div className="flex items-center gap-4 flex-shrink-0">
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-black text-foreground tabular-nums leading-none">
                  5
                </div>
                <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold mt-1">
                  Usuarios que traes
                </div>
              </div>
              <ArrowRight className="w-6 h-6 text-primary/40 flex-shrink-0" strokeWidth={2.5} />
              <div className="text-center">
                <div
                  className="text-4xl md:text-5xl font-black tabular-nums leading-none"
                  style={{ color: "#16a34a" }}
                >
                  1
                </div>
                <div
                  className="text-[10px] uppercase tracking-wider font-bold mt-1"
                  style={{ color: "#16a34a" }}
                >
                  Apartamento gratis
                </div>
              </div>
            </div>

            {/* Explicació breu — alineada amb la formula */}
            <div className="flex-1 sm:border-l sm:border-primary/12 sm:pl-7">
              <p className="font-semibold text-foreground text-sm leading-snug mb-1">
                Cada 5 propietarios que traigas, 1 apartamento tuyo deja de costarte.
              </p>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Mientras sigan activos en Hostly, no pagas por ese apartamento. Sin límite — trae 10 propietarios y son 2.
              </p>
            </div>
          </div>
        </div>

      </motion.div>
    </section>
  );
};

export default PricingBlock;
