import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView, useReducedMotion } from "framer-motion";
import { Check, X, Play } from "lucide-react";
import { useTranslation } from "react-i18next";

const Sparkline = () => (
  <div className="flex items-end gap-0.5 h-4 mt-1">
    {[3, 5, 4, 7, 6, 8, 7].map((h, i) => (
      <div
        key={i}
        className="w-1.5 rounded-sm bg-primary/40"
        style={{ height: `${h * 2}px` }}
      />
    ))}
  </div>
);

const DemoPreview = ({ onOpenModal }: { onOpenModal: () => void }) => {
  const { t } = useTranslation("demos");
  const [active, setActive] = useState(0);
  const [hovered, setHovered] = useState(false);
  const reducedMotion = useReducedMotion();

  const steps = [
    {
      id: 1,
      event: t("demoVideo.step1Event"),
      detail: t("demoVideo.step1Detail"),
      badge: t("demoVideo.step1Badge"),
      badgeColor: "text-primary bg-primary/8",
      sparkline: true,
    },
    {
      id: 2,
      event: t("demoVideo.step2Event"),
      detail: t("demoVideo.step2Detail"),
      badge: t("demoVideo.step2Badge"),
      badgeColor: "text-emerald-600 bg-emerald-50",
    },
    {
      id: 3,
      event: t("demoVideo.step3Event"),
      detail: t("demoVideo.step3Detail"),
      badge: t("demoVideo.step3Badge"),
      badgeColor: "text-amber-600 bg-amber-50",
    },
    {
      id: 4,
      event: t("demoVideo.step4Event"),
      detail: t("demoVideo.step4Detail"),
      badge: t("demoVideo.step4Badge"),
      badgeColor: "text-sky-600 bg-sky-50",
    },
    {
      id: 5,
      event: t("demoVideo.step5Event"),
      detail: t("demoVideo.step5Detail"),
      badge: t("demoVideo.step5Badge"),
      badgeColor: "text-violet-600 bg-violet-50",
    },
  ];

  useEffect(() => {
    if (reducedMotion) return;
    const id = setInterval(() => {
      setActive((prev) => (prev + 1) % steps.length);
    }, 1500);
    return () => clearInterval(id);
  }, [reducedMotion, steps.length]);

  return (
    <motion.div
      className="relative cursor-pointer"
      animate={{ scale: hovered ? 1.01 : 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      onClick={onOpenModal}
    >
      {/* Card shell */}
      <div
        className="rounded-3xl bg-white border overflow-hidden"
        style={{
          borderColor: "hsl(var(--border) / 0.6)",
          boxShadow: hovered
            ? "0 28px 80px rgba(0,0,0,0.13)"
            : "0 20px 60px rgba(0,0,0,0.08)",
          transition: "box-shadow 0.3s ease",
        }}
      >
        {/* Toolbar */}
        <div className="flex items-center gap-1.5 px-4 py-3 border-b" style={{ borderColor: "hsl(var(--border) / 0.5)" }}>
          <div className="w-2.5 h-2.5 rounded-full bg-red-400/70" />
          <div className="w-2.5 h-2.5 rounded-full bg-amber-400/70" />
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400/70" />
          <span className="ml-3 text-[11px] text-muted-foreground/50 font-mono tracking-wide">Hostly™ · panel</span>
        </div>

        {/* Steps */}
        <div className="p-5 space-y-2.5">
          {steps.map((step, i) => {
            const isActive = i === active;
            return (
              <motion.div
                key={step.id}
                animate={{
                  opacity: isActive ? 1 : 0.32,
                  y: isActive ? -3 : 0,
                  boxShadow: isActive
                    ? "0 4px 20px rgba(0,0,0,0.08)"
                    : "0 0px 0px rgba(0,0,0,0)",
                }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="flex items-center justify-between rounded-xl px-4 py-3 bg-white border"
                style={{ borderColor: isActive ? "hsl(var(--border))" : "hsl(var(--border) / 0.4)" }}
              >
                <div className="flex flex-col">
                  <span className="text-[11px] font-semibold text-muted-foreground/60 tracking-widest uppercase mb-0.5">
                    {step.event}
                  </span>
                  <span className="text-sm font-medium text-foreground">{step.detail}</span>
                  {step.sparkline && isActive && <Sparkline />}
                </div>

                <AnimatePresence mode="wait">
                  {isActive && (
                    <motion.span
                      key={step.id}
                      initial={{ opacity: 0, x: 8 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -4 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                      className={`text-[11px] font-semibold px-2.5 py-1 rounded-full whitespace-nowrap ${step.badgeColor}`}
                    >
                      {step.badge}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Progress bar */}
        <div className="mx-5 mb-4 h-0.5 rounded-full bg-border/40 overflow-hidden">
          <motion.div
            className="h-full bg-primary/40 rounded-full"
            animate={{ width: `${((active + 1) / steps.length) * 100}%` }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          />
        </div>
      </div>

      {/* Hover label */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-4 right-4 flex items-center gap-1.5 bg-foreground/90 text-background text-xs font-medium px-3 py-1.5 rounded-full shadow-lg"
          >
            <Play className="w-3 h-3" />
            {t("demoVideo.ctaHoverLabel")}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const DemoVideo = () => {
  const { t } = useTranslation("demos");
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  const bullets = [
    t("demoVideo.bulletPriceAdjusts"),
    t("demoVideo.bulletBookingEnters"),
    t("demoVideo.bulletCleaningAssigned"),
    t("demoVideo.bulletRegistrationSent"),
    t("demoVideo.bulletMessageReplied"),
  ];

  return (
    <>
      <section
        id="demo-video"
        ref={ref}
        className="py-16 md:py-24 px-6 md:px-12 lg:px-20 bg-muted/30"
      >
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-center mb-16 md:mb-20"
          >
            <span className="inline-block text-[12px] font-semibold tracking-[0.14em] uppercase text-primary mb-4">
              {t("demoVideo.superLabel")}
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground tracking-tight leading-[1.1] mb-5 max-w-3xl mx-auto">
              {t("demoVideo.heading")}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t("demoVideo.subheading")}
            </p>
          </motion.div>

          {/* Main grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
            {/* LEFT — text */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
              className="order-2 md:order-1 flex flex-col gap-8"
            >
              <ul className="space-y-4">
                {bullets.map((b, i) => (
                  <motion.li
                    key={b}
                    initial={{ opacity: 0, x: -12 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 + i * 0.07 }}
                    className="flex items-center gap-3"
                  >
                    <span className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-primary" strokeWidth={2.5} />
                    </span>
                    <span className="text-base text-foreground font-medium">{b}</span>
                  </motion.li>
                ))}
              </ul>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => setIsOpen(true)}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition-opacity"
                >
                  {t("demoVideo.ctaWatchDemo")}
                </button>
                <button
                  onClick={() => {
                    document.querySelector('[data-quiz]')?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
                  }}
                  className="inline-flex items-center justify-center px-6 py-3 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors underline underline-offset-4"
                >
                  {t("demoVideo.ctaApartmentFits")}
                </button>
              </div>
            </motion.div>

            {/* RIGHT — preview */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.05 }}
              className="order-1 md:order-2"
            >
              <DemoPreview onOpenModal={() => setIsOpen(true)} />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-4"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 8 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="w-full max-w-5xl aspect-video relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setIsOpen(false)}
                className="absolute -top-10 right-0 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors cursor-pointer z-10"
              >
                <X className="w-4 h-4 text-white" />
              </button>
              <iframe
                src="https://www.youtube.com/embed/IT96A2_DRh8?autoplay=1"
                title="Demo Hostly"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full rounded-2xl"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default DemoVideo;
