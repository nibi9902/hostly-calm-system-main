import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { MessageCircle, Clock, Shield } from "lucide-react";
import { useTranslation } from "react-i18next";

const appleEase = [0.22, 1, 0.36, 1] as const;

const testimonialProfiles = [
  { initial: "M", color: "#1a3a8f", photo: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=160&h=160&fit=crop&crop=face&auto=format", name: "Marta P.", city: "Girona", apts: 2 },
  { initial: "P", color: "#0891b2", photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=160&h=160&fit=crop&crop=face&auto=format", name: "Pol G.", city: "Figueres", apts: 3 },
  { initial: "C", color: "#16a34a", photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=160&h=160&fit=crop&crop=face&auto=format", name: "Carles T.", city: "Tarragona", apts: 4 },
  { initial: "A", color: "#7c3aed", photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=160&h=160&fit=crop&crop=face&auto=format", name: "Anna R.", city: "Vic", apts: 1 },
  { initial: "J", color: "#f59e0b", photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=160&h=160&fit=crop&crop=face&auto=format", name: "Jordi M.", city: "Lleida", apts: 5 },
  { initial: "S", color: "#db2777", photo: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=160&h=160&fit=crop&crop=face&auto=format", name: "Sandra V.", city: "Barcelona", apts: 3 },
  { initial: "T", color: "#ea580c", photo: "https://images.unsplash.com/photo-1463453091185-61582044d556?w=160&h=160&fit=crop&crop=face&auto=format", name: "Toni R.", city: "Palma", apts: 2 },
  { initial: "E", color: "#0d9488", photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=160&h=160&fit=crop&crop=face&auto=format", name: "Eva M.", city: "Madrid", apts: 6 },
  { initial: "B", color: "#6366f1", photo: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=160&h=160&fit=crop&crop=face&auto=format", name: "Marc B.", city: "Sitges", apts: 1 },
];

const supportIcons = [MessageCircle, Clock, Shield];

const oddIdx  = [0, 2, 4, 6, 8];
const evenIdx = [1, 3, 5, 7];

const ReviewCard = ({ profile, quote, aptSingular, aptPlural }: {
  profile: typeof testimonialProfiles[number];
  quote: string;
  aptSingular: string;
  aptPlural: string;
}) => (
  <div className="flex-shrink-0 w-[260px] md:w-80 rounded-2xl bg-card border border-border p-5 md:p-6 shadow-sm mx-2 flex flex-col">
    <div className="flex gap-0.5 mb-4">
      {[...Array(5)].map((_, i) => (
        <span key={i} className="text-amber-400 text-sm">★</span>
      ))}
    </div>
    <p className="text-sm text-muted-foreground leading-relaxed mb-5 flex-1">
      "{quote}"
    </p>
    <div className="flex items-center gap-3 pt-4 border-t border-border/60">
      <img
        src={profile.photo}
        alt={`Foto de ${profile.name}`}
        loading="lazy"
        decoding="async"
        width={40}
        height={40}
        className="w-10 h-10 rounded-full object-cover flex-shrink-0 ring-2 ring-white shadow-sm bg-slate-100"
        style={{ borderColor: profile.color }}
      />
      <div>
        <p className="text-sm font-semibold text-foreground leading-none mb-0.5">{profile.name}</p>
        <p className="text-xs text-muted-foreground">
          {profile.city} · {profile.apts} {profile.apts === 1 ? aptSingular : aptPlural}
        </p>
      </div>
    </div>
  </div>
);

const TestimonialBlock = () => {
  const { t } = useTranslation("home");

  const quotes = t("testimonials.quotes", { returnObjects: true }) as string[];
  const promises = t("support.promises", { returnObjects: true }) as Array<{ title: string; desc: string }>;

  const aptSingular = t("testimonials.apt_singular");
  const aptPlural = t("testimonials.apt_plural");

  const row1 = [...oddIdx, ...oddIdx].map(i => ({ profile: testimonialProfiles[i], quote: quotes[i] }));
  const row2 = [...evenIdx, ...evenIdx, ...evenIdx].map(i => ({ profile: testimonialProfiles[i], quote: quotes[i] }));

  const marqueeRef = useRef(null);
  const { scrollYProgress: mq } = useScroll({ target: marqueeRef, offset: ["start 90%", "start 40%"] });
  const mqOpacity = useTransform(mq, [0, 1], [0, 1]);
  const mqY       = useTransform(mq, [0, 1], [30, 0]);

  const supportRef = useRef(null);
  const { scrollYProgress: sq } = useScroll({ target: supportRef, offset: ["start 90%", "start 40%"] });
  const sqOpacity = useTransform(sq, [0, 1], [0, 1]);
  const sqY       = useTransform(sq, [0, 1], [30, 0]);

  return (
    <>
      <section ref={marqueeRef} className="py-24 md:py-32 overflow-hidden">
        <motion.div style={{ opacity: mqOpacity, y: mqY }} className="will-change-transform">

          <div className="text-center px-6 mb-14">
            <p className="text-xs font-semibold text-primary/70 uppercase tracking-widest mb-4">
              {t("testimonials.eyebrow")}
            </p>
            <h2 className="text-3xl md:text-5xl font-bold text-foreground tracking-tight mb-4">
              {t("testimonials.title_start")}{" "}
              <span className="text-primary italic">{t("testimonials.title_accent")}</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              {t("testimonials.subtitle")}
            </p>
          </div>

          <div
            className="marquee-pause overflow-hidden mb-4"
            style={{
              maskImage: "linear-gradient(to right, transparent, black 12%, black 88%, transparent)",
              WebkitMaskImage: "linear-gradient(to right, transparent, black 12%, black 88%, transparent)",
            }}
          >
            <div className="flex animate-marquee-left">
              {row1.map(({ profile, quote }, i) => (
                <ReviewCard key={`r1-${i}`} profile={profile} quote={quote} aptSingular={aptSingular} aptPlural={aptPlural} />
              ))}
            </div>
          </div>

          <div
            className="marquee-pause overflow-hidden"
            style={{
              maskImage: "linear-gradient(to right, transparent, black 12%, black 88%, transparent)",
              WebkitMaskImage: "linear-gradient(to right, transparent, black 12%, black 88%, transparent)",
            }}
          >
            <div className="flex animate-marquee-right">
              {row2.map(({ profile, quote }, i) => (
                <ReviewCard key={`r2-${i}`} profile={profile} quote={quote} aptSingular={aptSingular} aptPlural={aptPlural} />
              ))}
            </div>
          </div>

        </motion.div>
      </section>

      <section
        ref={supportRef}
        id="soporte"
        className="py-20 md:py-28 px-6 md:px-12 lg:px-20 bg-card border-y border-border"
      >
        <motion.div
          style={{ opacity: sqOpacity, y: sqY }}
          className="max-w-6xl mx-auto will-change-transform"
        >
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

            <div className="rounded-2xl bg-background border border-border p-8 md:p-10 shadow-[var(--shadow-card)]">
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-primary/8 text-primary text-xs font-semibold tracking-wider uppercase mb-6">
                {t("support.founder_badge")}
              </span>
              <h3 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight mb-4">
                {t("support.founder_title")}
              </h3>
              <p className="text-muted-foreground text-base leading-relaxed mb-8">
                {t("support.founder_quote")}
              </p>
              <div className="flex items-center gap-4 pt-6 border-t border-border/60">
                <div className="w-11 h-11 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                  B
                </div>
                <div>
                  <p className="font-semibold text-foreground text-sm">{t("support.founder_name")}</p>
                  <p className="text-muted-foreground text-xs">{t("support.founder_role")}</p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight mb-3">
                {t("support.promises_title_start")}{" "}
                <span className="text-primary italic">{t("support.promises_title_accent")}</span>
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-10">
                {t("support.promises_subtitle")}
              </p>
              <ul className="space-y-6">
                {promises.map((p, i) => {
                  const Icon = supportIcons[i];
                  return (
                    <li key={p.title} className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-primary/8 flex items-center justify-center">
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground text-sm mb-1">{p.title}</p>
                        <p className="text-muted-foreground text-sm leading-relaxed">{p.desc}</p>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </motion.div>
      </section>
    </>
  );
};

export default TestimonialBlock;
