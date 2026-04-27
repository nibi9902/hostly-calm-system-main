import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import PageShell from "@/components/PageShell";
import PricingBlock from "@/components/PricingBlock";

const ease = [0.22, 1, 0.36, 1] as const;

const faqs = [
  {
    q: "¿El plan gratis es realmente gratis para siempre?",
    a: "Sí. Sin trampa, sin caducidad, sin tarjeta. El envío automático del parte de viajeros a SES, Mossos y Ertzaintza es gratis de por vida. Para todos los apartamentos, sin límite de envíos.",
  },
  {
    q: "¿Puedo empezar gratis y pasarme al plan completo más adelante?",
    a: "Exactamente así está pensado. Crea la cuenta, configura tu apartamento y usa el plan gratis todo el tiempo que quieras. Cuando necesites el resto de Hostly, lo activas en un clic.",
  },
  {
    q: "¿Qué incluye exactamente el plan de 40 €/mes?",
    a: "Todo lo que ves en la lista: sincronización Airbnb + Booking, mensajes con IA en 5 idiomas, coordinación de limpiezas, precios dinámicos, finanzas y cierre de mes, y el onboarding 1 a 1 el primer mes. Sin módulos aparte, sin añadidos.",
  },
  {
    q: "¿Hay permanencia o puedo cancelar cuando quiera?",
    a: "Cancelas cuando quieres. Sin penalización, sin llamada de retención. Si decides que no es para ti, le das a un botón y listo.",
  },
  {
    q: "¿Qué pasa si tengo más de 5 apartamentos?",
    a: "A partir del quinto apartamento pagas 35 €/mes por cada uno en lugar de 40 €. Sin techo — si tienes 20, pagas 700 €/mes.",
  },
  {
    q: "¿Cómo funciona el programa de referidos?",
    a: "Por cada 5 propietarios activos que traigas, dejamos de cobrarte un apartamento cada mes. Traes 10 y te regalamos 2. Sin límite ni condiciones.",
  },
  {
    q: "¿Cuánto tarda en configurarse?",
    a: "Menos de 15 minutos para el primer apartamento. Conectas Airbnb o Booking, configuras las normas del piso una sola vez, y el sistema empieza a funcionar. El onboarding 1 a 1 el primer mes te ayuda si necesitas acompañamiento.",
  },
];

const PreciosPage = () => {
  return (
    <PageShell
      title="Precios — Hostly"
      description="Un plan gratis para siempre con la parte legal. Un plan completo de 40 €/mes por apartamento. Sin packs, sin add-ons, sin sorpresas."
      path="/precios"
    >

      {/* Pricing block — el PricingBlock ja té el seu propi header, evitem duplicar-lo */}
      <PricingBlock />

      {/* FAQ de preus */}
      <section className="py-20 md:py-28 px-6 md:px-12 lg:px-20 bg-background border-t border-border">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease }}
            className="text-center mb-14"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight mb-3">
              Preguntas sobre el precio
            </h2>
            <p className="text-muted-foreground">
              Lo que nos preguntan casi todos antes de empezar.
            </p>
          </motion.div>

          <div className="flex flex-col divide-y divide-border">
            {faqs.map((faq, i) => (
              <motion.div
                key={faq.q}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05, ease }}
                className="py-6"
              >
                <p className="font-semibold text-foreground text-sm md:text-base mb-2 leading-snug">
                  {faq.q}
                </p>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {faq.a}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="py-20 md:py-24 px-6 md:px-12 lg:px-20 bg-primary text-white text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease }}
          className="max-w-2xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Empieza por lo que es gratis.
          </h2>
          <p className="text-white/75 text-lg mb-8">
            Crea tu cuenta, conecta un apartamento y empieza a enviar partes a la policía automáticamente. Sin tarjeta. Para siempre.
          </p>
          <a
            href="https://app.hostlylabs.com/signup"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white text-primary font-semibold text-base hover:bg-white/90 transition-colors shadow-[0_4px_20px_rgba(0,0,0,0.15)]"
          >
            Crear cuenta gratis
            <ArrowRight className="w-5 h-5" />
          </a>
          <p className="text-white/50 text-sm mt-4">
            Sin tarjeta · Sin caducidad · Sin compromiso
          </p>
        </motion.div>
      </section>

    </PageShell>
  );
};

export default PreciosPage;
