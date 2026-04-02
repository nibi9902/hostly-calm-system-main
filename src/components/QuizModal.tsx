import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight, ArrowLeft, Clock, TrendingUp, CheckCircle2, Loader2, User, Mail, Phone } from "lucide-react";

const WEBHOOK_URL = "https://caserna13-n8n.f9pppl.easypanel.host/webhook/questionari";

/* ─── Quiz data ─── */
const questions = [
  {
    id: "p0",
    text: "¿Cuántos apartamentos gestionas actualmente?",
    options: [
      { label: "1 apartamento", points: 0 },
      { label: "2–3 apartamentos", points: 1 },
      { label: "4–6 apartamentos", points: 2 },
      { label: "7 o más", points: 3 },
    ],
  },
  {
    id: "p1",
    text: "¿Respondes mensajes fuera de horario?",
    options: [
      { label: "Sí, siempre", points: 2 },
      { label: "No", points: 0 },
    ],
  },
  {
    id: "p2",
    text: "Si apagas el móvil en temporada alta, ¿pierdes el control?",
    options: [
      { label: "Sí, totalmente", points: 3 },
      { label: "Probablemente sí", points: 2 },
      { label: "No", points: 0 },
    ],
  },
  {
    id: "p3",
    text: "Cuando entra una nueva reserva, ¿el equipo de limpieza se entera automáticamente o tienes que avisarles tú?",
    options: [
      { label: "Tengo que avisar yo", points: 3 },
      { label: "A veces automático, a veces manual", points: 2 },
      { label: "Es totalmente automático", points: 0 },
    ],
  },
  {
    id: "p4",
    text: "Con varias entradas/salidas el mismo día, ¿depende todo de ti?",
    options: [
      { label: "Sí", points: 2 },
      { label: "En parte", points: 1 },
      { label: "No", points: 0 },
    ],
  },
  {
    id: "p5",
    text: "¿Te ha pasado alguna vez una limpieza mal coordinada?",
    options: [
      { label: "Sí", points: 2 },
      { label: "Casi pasa alguna vez", points: 1 },
      { label: "No, nunca", points: 0 },
    ],
  },
  {
    id: "p6",
    text: "¿Cómo envías los datos de huéspedes a la policía?",
    options: [
      { label: "No lo estoy haciendo correctamente", points: 4 },
      { label: "Manual desde la web", points: 3 },
      { label: "Foto DNI + gestoría", points: 2 },
      { label: "Automatizado", points: 0 },
    ],
  },
  {
    id: "p7",
    text: "¿Te estresa pensar que puedes olvidar el plazo de la policía?",
    options: [
      { label: "Sí", points: 2 },
      { label: "A veces", points: 1 },
      { label: "No", points: 0 },
    ],
  },
  {
    id: "p9",
    text: "¿Cómo decides el precio de cada noche?",
    options: [
      { label: "Intuición", points: 2 },
      { label: "Precio fijo casi siempre", points: 2 },
      { label: "Miro la competencia manualmente", points: 1 },
      { label: "Precios dinámicos", points: 0 },
    ],
  },
  {
    id: "p10",
    text: "¿Podrías desconectar 7 días sin preocuparte?",
    options: [
      { label: "No, imposible", points: 3 },
      { label: "Me costaría mucho", points: 2 },
      { label: "Sí, sin problema", points: 0 },
    ],
  },
];

const PA_MAX = 26;

const getLevelLabel = (pa: number) => {
  if (pa <= 6) return { label: "Gestión bastante optimizada", color: "text-green-600", bg: "bg-green-50 border-green-200" };
  if (pa <= 12) return { label: "Dependencia moderada", color: "text-yellow-600", bg: "bg-yellow-50 border-yellow-200" };
  if (pa <= 18) return { label: "Dependencia alta", color: "text-orange-600", bg: "bg-orange-50 border-orange-200" };
  return { label: "Dependencia crítica", color: "text-red-600", bg: "bg-red-50 border-red-200" };
};

const roundToHalf = (n: number) => Math.round(n * 2) / 2;

const appleEase = [0.22, 1, 0.36, 1] as const;

const LOADING_STEPS = [
  "Analizando tu gestión actual…",
  "Calculando puntos de mejora…",
  "Estimando el ahorro potencial…",
  "Preparando tu diagnóstico…",
];

/* ─── Component ─── */
interface QuizModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type ScreenType = "intro" | "question" | "loading" | "lead" | "result";

const QuizModal = ({ isOpen, onClose }: QuizModalProps) => {
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
  }, [screen]);

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
    if (!name.trim()) { setFormError("Por favor, introduce tu nombre."); return; }
    if (!contact.trim()) { setFormError("Por favor, introduce tu email o teléfono."); return; }
    if (contactType === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact)) {
      setFormError("El email no es válido."); return;
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
    onClose();
    setTimeout(() => {
      document.getElementById("cta-final")?.scrollIntoView({ behavior: "smooth" });
    }, 300);
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
            <div className="relative w-full max-w-lg bg-background rounded-3xl shadow-2xl border border-border overflow-hidden pointer-events-auto">
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
                          Calcula tu tiempo libre
                        </h2>
                        <p className="text-muted-foreground text-base leading-relaxed max-w-sm">
                          9 preguntas rápidas. Te decimos exactamente cuántas horas a la semana podrías recuperar con Hostly.
                        </p>
                      </div>
                      <div className="flex items-center gap-6 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-primary" /> 2 minutos</span>
                        <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-primary" /> Sin registro</span>
                        <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-primary" /> Resultado inmediato</span>
                      </div>
                      <button
                        onClick={handleStart}
                        className="mt-2 inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-primary text-primary-foreground font-semibold text-base transition-all duration-300 hover:shadow-[0_8px_30px_hsl(var(--primary)/0.25)] hover:-translate-y-0.5 active:scale-[0.98]"
                      >
                        Empezar <ArrowRight className="w-4 h-4" />
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
                        Pregunta {questionIndex + 1} de {totalSteps}
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
                          <ArrowLeft className="w-4 h-4" /> Anterior
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
                          {questionIndex + 1 === totalSteps ? "Ver resultado" : "Siguiente"}
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
                        <h3 className="text-xl font-bold text-foreground">Analizando tu caso</h3>
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
                          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">¡Listo!</p>
                          <p className="text-sm font-bold text-foreground">Tu diagnóstico está preparado</p>
                        </div>
                      </div>

                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Introduce tus datos para ver el resultado. Te lo enviamos también por si quieres consultarlo más tarde.
                      </p>

                      {/* Name */}
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <input
                          type="text"
                          placeholder="Tu nombre"
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
                          <Phone className="w-3.5 h-3.5 inline mr-1.5" />Teléfono
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
                          placeholder={contactType === "email" ? "tu@email.com" : "+34 600 000 000"}
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
                          <><Loader2 className="w-4 h-4 animate-spin" /> Enviando…</>
                        ) : (
                          <>Ver mi resultado <ArrowRight className="w-4 h-4" /></>
                        )}
                      </button>

                      <p className="text-[11px] text-muted-foreground text-center -mt-2">
                        Sin spam. Solo usamos tus datos para enviarte el diagnóstico.
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
                          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">Tu resultado</p>
                          <p className="text-sm font-bold text-foreground">Algoritmo Hostly</p>
                        </div>
                      </div>

                      <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-semibold w-fit ${level.bg} ${level.color}`}>
                        {level.label} · {pa}/{PA_MAX} pts
                      </div>

                      <div className="grid grid-cols-3 gap-3">
                        {[
                          { value: `${horas}h`, label: "por semana" },
                          { value: `${horasMes}h`, label: "al mes" },
                          { value: `${horasAno}h`, label: "al año" },
                        ].map((s) => (
                          <div key={s.label} className="flex flex-col items-center justify-center py-4 rounded-2xl bg-primary/5 border border-primary/15">
                            <span className="text-2xl font-bold text-primary tracking-tight">{s.value}</span>
                            <span className="text-[11px] text-muted-foreground mt-0.5">{s.label}</span>
                          </div>
                        ))}
                      </div>

                      <p className="text-sm text-muted-foreground leading-relaxed border-l-2 border-primary/30 pl-4">
                        Tus respuestas indican que gran parte del sistema vive en tu cabeza y en tu móvil. Eso cuesta{" "}
                        <span className="text-foreground font-semibold">{horas} horas cada semana</span>. Si lo conviertes en procesos automáticos, no solo ahorras tiempo: recuperas tranquilidad y reduces el riesgo de errores en días de estrés y temporada.
                      </p>

                      <div className="flex flex-col sm:flex-row gap-3 pt-1">
                        <button
                          onClick={handleCTA}
                          className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-primary text-primary-foreground font-semibold text-sm transition-all duration-300 hover:shadow-[0_8px_30px_hsl(var(--primary)/0.25)] hover:-translate-y-0.5 active:scale-[0.98]"
                        >
                          Quiero recuperar esas horas <ArrowRight className="w-4 h-4" />
                        </button>
                        <button
                          onClick={handleReset}
                          className="inline-flex items-center justify-center px-5 py-3.5 rounded-full border border-border bg-background text-foreground text-sm font-medium hover:bg-muted transition-colors"
                        >
                          Repetir
                        </button>
                      </div>
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
