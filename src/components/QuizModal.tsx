import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight, ArrowLeft, Clock, TrendingUp, CheckCircle2, Loader2, User, Mail, Phone } from "lucide-react";

const WEBHOOK_URL = "https://caserna13-n8n.f9pppl.easypanel.host/webhook/questionari";

const PA_MAX = 26;

const roundToHalf = (n: number) => Math.round(n * 2) / 2;

const appleEase = [0.22, 1, 0.36, 1] as const;

/* ─── Types ─── */
interface QuizOption { label: string; points: number }
interface QuizQuestion { text: string; options: QuizOption[] }

/* ─── Component ─── */
interface QuizModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type ScreenType = "intro" | "question" | "loading" | "lead" | "result" | "booking" | "booked";

const QuizModal = ({ isOpen, onClose }: QuizModalProps) => {
  const { t } = useTranslation("home");

  /* ── i18n-driven data (must be inside component, depend on t) ── */
  const questions = t("quiz.questions", { returnObjects: true }) as QuizQuestion[];
  const LOADING_STEPS = t("quiz.loading_steps", { returnObjects: true }) as string[];

  const getLevelLabel = (pa: number): { label: string; color: string; bg: string } => {
    if (pa <= 6)  return { label: t("quiz.levels.low"),      color: "text-green-600",  bg: "bg-green-50 border-green-200" };
    if (pa <= 12) return { label: t("quiz.levels.medium"),   color: "text-yellow-600", bg: "bg-yellow-50 border-yellow-200" };
    if (pa <= 18) return { label: t("quiz.levels.high"),     color: "text-orange-600", bg: "bg-orange-50 border-orange-200" };
    return          { label: t("quiz.levels.critical"),      color: "text-red-600",    bg: "bg-red-50 border-red-200" };
  };

  const [screen, setScreen] = useState<ScreenType>("intro");
  const [answers, setAnswers] = useState<number[]>([]);
  const [selected, setSelected] = useState<number | null>(null);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  // Loading state
  const [loadingStep, setLoadingStep] = useState(0);
  const [loadingProgress, setLoadingProgress] = useState(0);

  // Lead form
  const [name, setName] = useState("");
  const [contact, setContact] = useState(""); // email or phone
  const [contactType, setContactType] = useState<"email" | "phone">("email");
  const [formError, setFormError] = useState("");
  const [sending, setSending] = useState(false);

  const totalSteps = questions.length;
  const currentQuestion = screen === "question" ? questions[questionIndex] : null;

  const pa = answers.reduce((sum, p) => sum + p, 0);
  const horasRaw = 1 + (pa / PA_MAX) * 6;
  const horas = Math.min(7, Math.max(1, roundToHalf(horasRaw)));
  const horasMes = Math.round(horas * 4.3 * 10) / 10;
  const horasAno = Math.round(horas * 52);
  const level = getLevelLabel(pa);

  /* ── Calendly event listener ── */
  useEffect(() => {
    const handleMessage = (e: MessageEvent) => {
      if (e.data?.event === "calendly.event_scheduled") {
        setScreen("booked");
      }
    };
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  /* ── Loading animation ── */
  useEffect(() => {
    if (screen !== "loading") return;
    setLoadingStep(0);
    setLoadingProgress(0);

    const duration = 3000;
    const steps = LOADING_STEPS.length;
    const stepInterval = duration / steps;

    const progressInterval = setInterval(() => {
      setLoadingProgress((p) => Math.min(p + 1.2, 100));
    }, 36);

    const stepTimers = LOADING_STEPS.map((_, i) =>
      setTimeout(() => setLoadingStep(i), i * stepInterval)
    );

    const doneTimer = setTimeout(() => {
      clearInterval(progressInterval);
      setLoadingProgress(100);
      setTimeout(() => setScreen("lead"), 400);
    }, duration);

    return () => {
      clearInterval(progressInterval);
      stepTimers.forEach(clearTimeout);
      clearTimeout(doneTimer);
    };
  }, [screen]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleStart = () => {
    setDirection(1);
    setQuestionIndex(0);
    setAnswers([]);
    setSelected(null);
    setScreen("question");
  };

  const handleSelect = (_points: number, idx: number) => setSelected(idx);

  const handleNext = () => {
    if (selected === null) return;
    const points = currentQuestion!.options[selected].points;
    const newAnswers = [...answers, points];
    setAnswers(newAnswers);
    setSelected(null);
    setDirection(1);

    if (questionIndex + 1 >= totalSteps) {
      setScreen("loading");
    } else {
      setQuestionIndex((i) => i + 1);
    }
  };

  const handleBack = () => {
    if (questionIndex === 0) { setScreen("intro"); return; }
    setDirection(-1);
    setAnswers((a) => a.slice(0, -1));
    setSelected(null);
    setQuestionIndex((i) => i - 1);
  };

  const handleLeadSubmit = async () => {
    if (!name.trim()) { setFormError(t("quiz.ui.error_name")); return; }
    if (!contact.trim()) { setFormError(t("quiz.ui.error_contact")); return; }
    if (contactType === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact)) {
      setFormError(t("quiz.ui.error_email")); return;
    }

    setFormError("");
    setSending(true);

    const payload = {
      nombre: name.trim(),
      [contactType]: contact.trim(),
      puntuacion_pa: pa,
      puntuacion_max: PA_MAX,
      nivel: level.label,
      horas_semana: horas,
      horas_mes: horasMes,
      horas_ano: horasAno,
      respuestas: questions.map((q, i) => ({
        pregunta: q.text,
        respuesta: q.options[answers[i] !== undefined ? questions[i].options.findIndex((o) => o.points === answers[i]) : 0]?.label ?? "",
        puntos: answers[i] ?? 0,
      })),
    };

    try {
      await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        mode: "no-cors",
      });
    } catch (_) {
      // Silently fail — show result anyway
    }

    setSending(false);
    setScreen("result");
  };

  const handleReset = () => {
    setScreen("intro");
    setAnswers([]);
    setSelected(null);
    setQuestionIndex(0);
    setName("");
    setContact("");
    setFormError("");
  };

  const handleCTA = () => {
    setScreen("booking");
  };

  const slideVariants = {
    enter: (dir: number) => ({ x: dir > 0 ? 40 : -40, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -40 : 40, opacity: 0 }),
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            onClick={screen === "loading" ? undefined : onClose}
          />

          {/* Modal */}
          <motion.div
            key="modal"
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 16 }}
            transition={{ duration: 0.35, ease: appleEase }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
          >
            <div className={`relative w-full bg-background rounded-3xl shadow-2xl border border-border overflow-hidden pointer-events-auto transition-all duration-300 ${screen === "booking" ? "max-w-2xl" : "max-w-lg"}`}>
              {/* Close */}
              {screen !== "loading" && (
                <button
                  onClick={onClose}
                  className="absolute top-5 right-5 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-muted hover:bg-muted/80 transition-colors text-muted-foreground hover:text-foreground"
                >
                  <X className="w-4 h-4" />
                </button>
              )}

              {/* Progress bar (questions only) */}
              {screen === "question" && (
                <div className="absolute top-0 left-0 right-0 h-1 bg-muted">
                  <motion.div
                    className="h-full bg-primary rounded-full"
                    initial={false}
                    animate={{ width: `${((questionIndex + 1) / totalSteps) * 100}%` }}
                    transition={{ duration: 0.4, ease: appleEase }}
                  />
                </div>
              )}

              {/* Loading progress bar */}
              {screen === "loading" && (
                <div className="absolute top-0 left-0 right-0 h-1 bg-muted">
                  <motion.div
                    className="h-full bg-primary rounded-full"
                    animate={{ width: `${loadingProgress}%` }}
                    transition={{ duration: 0.1 }}
                  />
                </div>
              )}

              <div className="p-8 pt-10 min-h-[420px] flex flex-col">
                <AnimatePresence mode="wait" custom={direction}>

                  {/* ── INTRO ── */}
                  {screen === "intro" && (
                    <motion.div
                      key="intro"
                      custom={direction}
                      variants={slideVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{ duration: 0.32, ease: appleEase }}
                      className="flex flex-col flex-1 items-center justify-center text-center gap-6"
                    >
                      <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                        <Clock className="w-7 h-7 text-primary" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-foreground mb-2 tracking-tight">
                          {t("quiz.ui.intro_title")}
                        </h2>
                        <p className="text-muted-foreground text-base leading-relaxed max-w-sm">
                          {t("quiz.ui.intro_body")}
                        </p>
                      </div>
                      <div className="flex items-center gap-6 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-primary" /> {t("quiz.ui.badge_minutes")}</span>
                        <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-primary" /> {t("quiz.ui.badge_no_register")}</span>
                        <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-primary" /> {t("quiz.ui.badge_immediate")}</span>
                      </div>
                      <button
                        onClick={handleStart}
                        className="mt-2 inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-primary text-primary-foreground font-semibold text-base transition-all duration-300 hover:shadow-[0_8px_30px_hsl(var(--primary)/0.25)] hover:-translate-y-0.5 active:scale-[0.98]"
                      >
                        {t("quiz.ui.btn_start")} <ArrowRight className="w-4 h-4" />
                      </button>
                    </motion.div>
                  )}

                  {/* ── QUESTION ── */}
                  {screen === "question" && currentQuestion && (
                    <motion.div
                      key={`q-${questionIndex}`}
                      custom={direction}
                      variants={slideVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{ duration: 0.32, ease: appleEase }}
                      className="flex flex-col flex-1 gap-6"
                    >
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">
                        {t("quiz.ui.question_label", { current: questionIndex + 1, total: totalSteps })}
                      </p>
                      <h3 className="text-xl font-bold text-foreground leading-snug">
                        {currentQuestion.text}
                      </h3>
                      <div className="flex flex-col gap-2.5 flex-1">
                        {currentQuestion.options.map((opt, i) => (
                          <button
                            key={i}
                            onClick={() => handleSelect(opt.points, i)}
                            className={`w-full text-left px-5 py-4 rounded-2xl border text-sm font-medium transition-all duration-200 ${
                              selected === i
                                ? "border-primary bg-primary/8 text-foreground shadow-[0_0_0_2px_hsl(var(--primary)/0.2)]"
                                : "border-border bg-muted/30 text-muted-foreground hover:border-primary/40 hover:bg-muted/60 hover:text-foreground"
                            }`}
                          >
                            <span className="inline-flex items-center gap-3">
                              <span
                                className={`w-4 h-4 rounded-full border-2 flex-shrink-0 transition-all duration-200 ${
                                  selected === i ? "border-primary bg-primary" : "border-muted-foreground/40"
                                }`}
                              />
                              {opt.label}
                            </span>
                          </button>
                        ))}
                      </div>
                      <div className="flex items-center justify-between pt-2">
                        <button
                          onClick={handleBack}
                          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
                        >
                          <ArrowLeft className="w-4 h-4" /> {t("quiz.ui.btn_prev")}
                        </button>
                        <button
                          onClick={handleNext}
                          disabled={selected === null}
                          className={`inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm transition-all duration-300 ${
                            selected !== null
                              ? "bg-primary text-primary-foreground hover:shadow-[0_6px_20px_hsl(var(--primary)/0.25)] hover:-translate-y-0.5 active:scale-[0.98]"
                              : "bg-muted text-muted-foreground cursor-not-allowed"
                          }`}
                        >
                          {questionIndex + 1 === totalSteps ? t("quiz.ui.btn_see_result") : t("quiz.ui.btn_next")}
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {/* ── LOADING ── */}
                  {screen === "loading" && (
                    <motion.div
                      key="loading"
                      initial={{ opacity: 0, scale: 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.96 }}
                      transition={{ duration: 0.32, ease: appleEase }}
                      className="flex flex-col flex-1 items-center justify-center gap-8 text-center"
                    >
                      {/* Spinner */}
                      <div className="relative w-20 h-20">
                        <motion.div
                          className="absolute inset-0 rounded-full border-4 border-primary/20"
                        />
                        <motion.div
                          className="absolute inset-0 rounded-full border-4 border-transparent border-t-primary"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <TrendingUp className="w-7 h-7 text-primary" />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <h3 className="text-xl font-bold text-foreground">{t("quiz.ui.loading_title")}</h3>
                        <AnimatePresence mode="wait">
                          <motion.p
                            key={loadingStep}
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -8 }}
                            transition={{ duration: 0.3 }}
                            className="text-sm text-muted-foreground"
                          >
                            {LOADING_STEPS[loadingStep]}
                          </motion.p>
                        </AnimatePresence>
                      </div>

                      {/* Progress dots */}
                      <div className="flex gap-2">
                        {LOADING_STEPS.map((_, i) => (
                          <motion.div
                            key={i}
                            className="w-2 h-2 rounded-full"
                            animate={{
                              backgroundColor: i <= loadingStep ? "hsl(var(--primary))" : "hsl(var(--muted-foreground) / 0.3)",
                              scale: i === loadingStep ? 1.3 : 1,
                            }}
                            transition={{ duration: 0.3 }}
                          />
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* ── LEAD CAPTURE ── */}
                  {screen === "lead" && (
                    <motion.div
                      key="lead"
                      custom={1}
                      variants={slideVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{ duration: 0.32, ease: appleEase }}
                      className="flex flex-col flex-1 gap-5"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                          <CheckCircle2 className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">{t("quiz.ui.lead_ready")}</p>
                          <p className="text-sm font-bold text-foreground">{t("quiz.ui.lead_diagnosis_ready")}</p>
                        </div>
                      </div>

                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {t("quiz.ui.lead_intro")}
                      </p>

                      {/* Name */}
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <input
                          type="text"
                          placeholder={t("quiz.ui.lead_name_placeholder")}
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="w-full pl-11 pr-4 py-3.5 rounded-2xl border border-border bg-muted/30 text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                        />
                      </div>

                      {/* Contact type toggle */}
                      <div className="flex gap-2">
                        <button
                          onClick={() => { setContactType("email"); setContact(""); }}
                          className={`flex-1 py-2.5 rounded-xl text-xs font-semibold border transition-all ${contactType === "email" ? "border-primary bg-primary/8 text-primary" : "border-border bg-muted/30 text-muted-foreground hover:border-primary/30"}`}
                        >
                          <Mail className="w-3.5 h-3.5 inline mr-1.5" />Email
                        </button>
                        <button
                          onClick={() => { setContactType("phone"); setContact(""); }}
                          className={`flex-1 py-2.5 rounded-xl text-xs font-semibold border transition-all ${contactType === "phone" ? "border-primary bg-primary/8 text-primary" : "border-border bg-muted/30 text-muted-foreground hover:border-primary/30"}`}
                        >
                          <Phone className="w-3.5 h-3.5 inline mr-1.5" />{t("quiz.ui.lead_phone_label")}
                        </button>
                      </div>

                      {/* Contact input */}
                      <div className="relative">
                        {contactType === "email"
                          ? <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          : <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        }
                        <input
                          type={contactType === "email" ? "email" : "tel"}
                          placeholder={contactType === "email" ? t("quiz.ui.lead_email_placeholder") : t("quiz.ui.lead_phone_placeholder")}
                          value={contact}
                          onChange={(e) => setContact(e.target.value)}
                          className="w-full pl-11 pr-4 py-3.5 rounded-2xl border border-border bg-muted/30 text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                        />
                      </div>

                      {formError && (
                        <p className="text-xs text-red-500 -mt-2">{formError}</p>
                      )}

                      <button
                        onClick={handleLeadSubmit}
                        disabled={sending}
                        className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-primary text-primary-foreground font-semibold text-sm transition-all duration-300 hover:shadow-[0_8px_30px_hsl(var(--primary)/0.25)] hover:-translate-y-0.5 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
                      >
                        {sending ? (
                          <><Loader2 className="w-4 h-4 animate-spin" /> {t("quiz.ui.lead_sending")}</>
                        ) : (
                          <>{t("quiz.ui.lead_see_result")} <ArrowRight className="w-4 h-4" /></>
                        )}
                      </button>

                      <p className="text-[11px] text-muted-foreground text-center -mt-2">
                        {t("quiz.ui.lead_no_spam")}
                      </p>
                    </motion.div>
                  )}

                  {/* ── RESULT ── */}
                  {screen === "result" && (
                    <motion.div
                      key="result"
                      custom={1}
                      variants={slideVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{ duration: 0.32, ease: appleEase }}
                      className="flex flex-col flex-1 gap-5"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                          <TrendingUp className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">{t("quiz.ui.result_header")}</p>
                          <p className="text-sm font-bold text-foreground">{t("quiz.ui.result_algorithm")}</p>
                        </div>
                      </div>

                      <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-semibold w-fit ${level.bg} ${level.color}`}>
                        {level.label} · {pa}/{PA_MAX} pts
                      </div>

                      <div className="grid grid-cols-3 gap-3">
                        {[
                          { value: `${horas}h`, label: t("quiz.ui.result_per_week") },
                          { value: `${horasMes}h`, label: t("quiz.ui.result_per_month") },
                          { value: `${horasAno}h`, label: t("quiz.ui.result_per_year") },
                        ].map((s) => (
                          <div key={s.label} className="flex flex-col items-center justify-center py-4 rounded-2xl bg-primary/5 border border-primary/15">
                            <span className="text-2xl font-bold text-primary tracking-tight">{s.value}</span>
                            <span className="text-[11px] text-muted-foreground mt-0.5">{s.label}</span>
                          </div>
                        ))}
                      </div>

                      <p className="text-sm text-muted-foreground leading-relaxed border-l-2 border-primary/30 pl-4">
                        {t("quiz.ui.result_body", { horas })}
                      </p>

                      <div className="flex flex-col sm:flex-row gap-3 pt-1">
                        <button
                          onClick={handleCTA}
                          className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-primary text-primary-foreground font-semibold text-sm transition-all duration-300 hover:shadow-[0_8px_30px_hsl(var(--primary)/0.25)] hover:-translate-y-0.5 active:scale-[0.98]"
                        >
                          {t("quiz.ui.btn_book_call")} <ArrowRight className="w-4 h-4" />
                        </button>
                        <button
                          onClick={handleReset}
                          className="inline-flex items-center justify-center px-5 py-3.5 rounded-full border border-border bg-background text-foreground text-sm font-medium hover:bg-muted transition-colors"
                        >
                          {t("quiz.ui.btn_repeat")}
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {/* ── BOOKING ── */}
                  {screen === "booking" && (
                    <motion.div
                      key="booking"
                      custom={1}
                      variants={slideVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{ duration: 0.32, ease: appleEase }}
                      className="flex flex-col flex-1 gap-4"
                    >
                      <div className="text-center">
                        <h3 className="text-lg font-bold text-foreground mb-1.5 tracking-tight">
                          {t("quiz.ui.booking_title")}
                        </h3>
                        <p className="text-muted-foreground text-sm leading-relaxed max-w-sm mx-auto">
                          {t("quiz.ui.booking_body")}
                        </p>
                      </div>
                      <div className="w-full rounded-2xl overflow-hidden border border-border bg-muted/20" style={{ minHeight: '380px' }}>
                        <iframe
                          src="https://calendly.com/bielalsinailla/llamada-con-biel-hostly?hide_gdpr_banner=1&background_color=fafafa&text_color=0f172a&primary_color=3b5998"
                          width="100%"
                          height="100%"
                          frameBorder="0"
                          style={{ minHeight: '380px', border: 'none' }}
                          title={t("quiz.ui.booking_calendar_title")}
                        />
                      </div>
                      <p className="text-[11px] text-muted-foreground/60 text-center">
                        {t("quiz.ui.booking_disclaimer")}
                      </p>
                    </motion.div>
                  )}

                  {/* ── BOOKED (confirmation) ── */}
                  {screen === "booked" && (
                    <motion.div
                      key="booked"
                      custom={1}
                      variants={slideVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{ duration: 0.32, ease: appleEase }}
                      className="flex flex-col flex-1 items-center justify-center text-center gap-6 py-8"
                    >
                      <div className="w-16 h-16 rounded-full bg-green-50 border border-green-200 flex items-center justify-center">
                        <CheckCircle2 className="w-8 h-8 text-green-600" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-foreground mb-2 tracking-tight">
                          {t("quiz.ui.booked_title")}
                        </h3>
                        <p className="text-muted-foreground text-sm leading-relaxed max-w-sm mx-auto">
                          {t("quiz.ui.booked_body")}
                        </p>
                      </div>
                      <div className="rounded-2xl bg-primary/5 border border-primary/15 p-5 max-w-sm w-full">
                        <p className="text-sm text-foreground font-medium mb-1">
                          {t("quiz.ui.booked_call_title")}
                        </p>
                        <ul className="text-sm text-muted-foreground leading-relaxed space-y-1.5 text-left">
                          <li className="flex items-start gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-primary mt-0.5 flex-shrink-0" /> {t("quiz.ui.booked_item_1")}</li>
                          <li className="flex items-start gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-primary mt-0.5 flex-shrink-0" /> {t("quiz.ui.booked_item_2")}</li>
                          <li className="flex items-start gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-primary mt-0.5 flex-shrink-0" /> {t("quiz.ui.booked_item_3")}</li>
                        </ul>
                      </div>
                      <p className="text-muted-foreground/60 text-xs">
                        {t("quiz.ui.booked_footer")}
                      </p>
                      <button
                        onClick={onClose}
                        className="inline-flex items-center justify-center px-7 py-3.5 rounded-full bg-primary text-primary-foreground font-semibold text-sm transition-all duration-300 hover:shadow-[0_8px_30px_hsl(var(--primary)/0.25)] hover:-translate-y-0.5 active:scale-[0.98]"
                      >
                        {t("quiz.ui.btn_close")}
                      </button>
                    </motion.div>
                  )}

                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default QuizModal;
