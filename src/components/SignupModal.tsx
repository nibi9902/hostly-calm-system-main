import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight, Check } from "lucide-react";
import { supabase } from "@/lib/supabase";

const ease = [0.22, 1, 0.36, 1] as const;

type Step = "form" | "success";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export function SignupModal({ isOpen, onClose }: Props) {
  const [step, setStep] = useState<Step>("form");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    apartments_count: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.phone) {
      setError("Completa todos los campos obligatorios.");
      return;
    }

    setLoading(true);
    setError(null);

    const { error: dbError } = await supabase.from("early_access").insert({
      name: form.name,
      email: form.email,
      phone: form.phone,
      apartments_count: form.apartments_count ? parseInt(form.apartments_count) : null,
    });

    if (dbError) {
      setError("Algo ha fallado. Inténtalo de nuevo o escríbenos a hola@hostlylabs.com");
      setLoading(false);
      return;
    }

    setLoading(false);
    setStep("success");
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setStep("form");
      setForm({ name: "", email: "", phone: "", apartments_count: "" });
      setError(null);
    }, 400);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[9998] bg-black/40 backdrop-blur-sm"
            onClick={handleClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ duration: 0.35, ease }}
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
            role="dialog"
            aria-modal="true"
            aria-labelledby="signup-title"
          >
            <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden">

              {/* Cerrar */}
              <button
                type="button"
                onClick={handleClose}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                aria-label="Cerrar"
              >
                <X className="w-4 h-4 text-slate-500" />
              </button>

              <AnimatePresence mode="wait">

                {/* ── STEP: FORM ── */}
                {step === "form" && (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="p-8 md:p-10"
                  >
                    {/* Header */}
                    <div className="mb-8">
                      <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary mb-2">
                        Acceso anticipado
                      </p>
                      <h2 id="signup-title" className="text-2xl font-bold text-foreground tracking-tight leading-tight mb-2">
                        Crea tu cuenta.
                      </h2>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        Déjanos tus datos y en menos de 24 horas te contactamos para hacer el setup juntos.
                      </p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <label htmlFor="name" className="block text-xs font-semibold text-foreground/70 mb-1.5">
                          Nombre completo <span className="text-rose-400">*</span>
                        </label>
                        <input
                          id="name"
                          name="name"
                          type="text"
                          value={form.name}
                          onChange={handleChange}
                          placeholder="Marc García"
                          autoComplete="name"
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-sm text-foreground placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:border-primary transition-all"
                        />
                      </div>

                      <div>
                        <label htmlFor="email" className="block text-xs font-semibold text-foreground/70 mb-1.5">
                          Email <span className="text-rose-400">*</span>
                        </label>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          value={form.email}
                          onChange={handleChange}
                          placeholder="marc@gmail.com"
                          autoComplete="email"
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-sm text-foreground placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:border-primary transition-all"
                        />
                      </div>

                      <div>
                        <label htmlFor="phone" className="block text-xs font-semibold text-foreground/70 mb-1.5">
                          Teléfono <span className="text-rose-400">*</span>
                        </label>
                        <input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={form.phone}
                          onChange={handleChange}
                          placeholder="+34 600 000 000"
                          autoComplete="tel"
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-sm text-foreground placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:border-primary transition-all"
                        />
                      </div>

                      <div>
                        <label htmlFor="apartments_count" className="block text-xs font-semibold text-foreground/70 mb-1.5">
                          ¿Cuántos apartamentos tienes?
                        </label>
                        <select
                          id="apartments_count"
                          name="apartments_count"
                          value={form.apartments_count}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:border-primary transition-all appearance-none"
                        >
                          <option value="">Selecciona...</option>
                          <option value="1">1 apartamento</option>
                          <option value="2">2 apartamentos</option>
                          <option value="3">3 apartamentos</option>
                          <option value="5">4-5 apartamentos</option>
                          <option value="10">6-10 apartamentos</option>
                          <option value="15">Más de 10</option>
                        </select>
                      </div>

                      {error && (
                        <p role="alert" className="text-sm text-rose-500 bg-rose-50 px-4 py-3 rounded-xl">
                          {error}
                        </p>
                      )}

                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition-all disabled:opacity-60 mt-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2"
                      >
                        {loading ? (
                          <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" aria-label="Enviando..." />
                        ) : (
                          <>
                            Crear cuenta
                            <ArrowRight className="w-4 h-4" />
                          </>
                        )}
                      </button>

                      <p className="text-center text-[11px] text-muted-foreground">
                        Sin compromiso. Hablamos antes de cualquier cosa.
                      </p>
                    </form>
                  </motion.div>
                )}

                {/* ── STEP: SUCCESS ── */}
                {step === "success" && (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3, ease }}
                    className="p-8 md:p-10 text-center"
                  >
                    <div className="w-14 h-14 rounded-full bg-[#dcfce7] flex items-center justify-center mx-auto mb-6">
                      <Check className="w-7 h-7 text-[#16a34a]" strokeWidth={2.5} />
                    </div>
                    <h2 className="text-2xl font-bold text-foreground tracking-tight mb-3">
                      Recibido. Gracias, {form.name.split(" ")[0]}.
                    </h2>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-2">
                      En menos de 24 horas te contactamos para hacer el setup juntos y arrancar bien desde el primer día.
                    </p>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-8">
                      Si tienes cualquier duda antes, escríbenos a{" "}
                      <a href="mailto:hola@hostlylabs.com" className="text-primary font-medium hover:underline">
                        hola@hostlylabs.com
                      </a>
                    </p>
                    <button
                      type="button"
                      onClick={handleClose}
                      className="px-6 py-3 rounded-xl border border-slate-200 text-sm font-semibold text-foreground hover:bg-slate-50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                    >
                      Cerrar
                    </button>
                  </motion.div>
                )}

              </AnimatePresence>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
