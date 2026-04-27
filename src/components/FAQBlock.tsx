import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const ease = [0.22, 1, 0.36, 1] as const;

export const homeFaqs = [
  {
    q: "¿Qué reemplaza Hostly exactamente?",
    a: "Hostly reemplaza Chekin (check-in y compliance), tu canal manager actual, las plantillas de mensajes manuales, el Excel de cobros y el Dropbox de contratos. Una sola app, una sola factura.",
  },
  {
    q: "¿Y si solo tengo 1 o 2 apartamentos?",
    a: "Hostly está pensado especialmente para propietarios con 1 a 10 pisos. A 40 €/mes por apartamento reemplazas varias suscripciones y sales ganando — además del tiempo que dejas de perder.",
  },
  {
    q: "¿El check-in y el envío a la policía son realmente gratis?",
    a: "Sí, gratis de por vida y sin condiciones. El check-in online, el registro a SES.Hospedajes, Mossos y Ertzaintza funcionan desde el plan gratuito, para todos tus apartamentos y sin límite de envíos.",
  },
  {
    q: "¿Funciona con Airbnb y Booking a la vez?",
    a: "Sí. Hostly sincroniza calendarios, precios y reservas de Airbnb, Booking.com y otros canales en tiempo real. Sin dobles reservas ni trabajo manual.",
  },
  {
    q: "¿Cuánto tarda en configurarse?",
    a: "Menos de 15 minutos para el primer apartamento. Respondes el cuestionario del piso una sola vez y el sistema empieza a funcionar. El onboarding 1 a 1 el primer mes te ayuda si tienes dudas.",
  },
  {
    q: "¿Tengo que firmar permanencia?",
    a: "No. Cancelas cuando quieres, sin penalización ni llamada de retención. Si decides que no es para ti, le das a un botón.",
  },
  {
    q: "¿Podré hablar con alguien si tengo un problema?",
    a: "Sí. El primer mes tienes onboarding 1 a 1 con nuestro equipo. Después, soporte humano en español y catalán — no un chatbot.",
  },
];

function FAQItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.04, ease }}
      className="border-b border-border last:border-0"
    >
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 py-5 text-left group"
        aria-expanded={open}
      >
        <span className="text-sm md:text-base font-semibold text-foreground leading-snug group-hover:text-primary transition-colors duration-150">
          {q}
        </span>
        <span className="shrink-0 w-6 h-6 rounded-full border border-border flex items-center justify-center text-muted-foreground group-hover:border-primary group-hover:text-primary transition-colors duration-150">
          {open ? <Minus className="w-3 h-3" /> : <Plus className="w-3 h-3" />}
        </span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-sm text-muted-foreground leading-relaxed">
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQBlock() {
  return (
    <section id="faq" className="py-20 md:py-28 px-6 md:px-12 lg:px-20 bg-background">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease }}
          className="text-center mb-12"
        >
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary/70 mb-3">
            Preguntas frecuentes
          </p>
          <h2 className="text-2xl md:text-4xl font-bold text-foreground tracking-tight mb-3">
            Lo que nos preguntan antes de empezar.
          </h2>
          <p className="text-muted-foreground">
            Si tienes más dudas, escríbenos a{" "}
            <a href="mailto:hola@hostlylabs.com" className="text-primary hover:underline font-medium">
              hola@hostlylabs.com
            </a>
          </p>
        </motion.div>

        <div>
          {homeFaqs.map((faq, i) => (
            <FAQItem key={faq.q} q={faq.q} a={faq.a} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
