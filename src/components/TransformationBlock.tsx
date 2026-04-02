import { motion } from "framer-motion";

const blocks = [
  {
    number: "90%",
    title: "Menos tiempo operativo.",
    copy: "La mayoría de propietarios pasan de horas diarias a minutos semanales. No trabajas más rápido. Trabajas menos.",
  },
  {
    number: "~30 min",
    title: "Supervisión, no ejecución.",
    copy: "Hostly ejecuta reglas, precios y protocolos automáticamente. Tú solo revisas el sistema cuando quieres.",
  },
  {
    number: "100%",
    title: "Legal y comunicación automatizados.",
    copy: "Registros enviados. Mensajes respondidos. Procesos trazables. Sin abrir WhatsApp.",
  },
];

const TransformationBlock = () => {
  return (
    <section
      id="transformacion"
      className="py-16 md:py-24 px-6 md:px-12 lg:px-20 bg-background"
    >
      <div className="max-w-[1100px] mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.3 }}
            className="inline-block text-[13px] font-semibold tracking-[0.12em] uppercase text-primary mb-4"
          >
            Resultados reales
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.08 }}
            viewport={{ once: true, amount: 0.3 }}
            className="text-[42px] md:text-[52px] font-bold text-foreground leading-[1.1] tracking-tight max-w-[800px] mx-auto mb-6"
          >
            Lo que cambia cuando dejas de gestionar manualmente.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.14 }}
            viewport={{ once: true, amount: 0.3 }}
            className="text-lg text-muted-foreground max-w-[640px] mx-auto"
          >
            No son funciones. Es una nueva forma de operar.
          </motion.p>
        </div>

        {/* Blocks */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
          {blocks.map((block, i) => (
            <motion.div
              key={block.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: i * 0.1 }}
              viewport={{ once: true, amount: 0.3 }}
              className="relative pt-8"
            >
              {/* Watermark number */}
              <span
                aria-hidden="true"
                className="absolute top-0 left-0 text-[72px] font-bold leading-none select-none pointer-events-none"
                style={{ color: "hsl(var(--foreground) / 0.05)" }}
              >
                {block.number}
              </span>

              {/* Content */}
              <div className="relative z-10 pt-10">
                <h3 className="text-2xl font-semibold text-foreground mb-3 leading-snug tracking-tight">
                  {block.title}
                </h3>
                <p className="text-base text-muted-foreground leading-relaxed whitespace-pre-line">
                  {block.copy}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TransformationBlock;
