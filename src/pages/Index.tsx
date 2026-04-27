import { useState, lazy, Suspense } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import PageProgress from "@/components/PageProgress";
import SEO from "@/components/SEO";
import { CinematicHero } from "@/components/ui/cinematic-hero";
import PainBlock from "@/components/PainBlock";
import FeaturesBlock from "@/components/FeaturesBlock";
import { GlassCards } from "@/components/ui/glass-cards";
import StepsBlock from "@/components/StepsBlock";
import ComplianceBlock from "@/components/ComplianceBlock";
import TestimonialBlock from "@/components/TestimonialBlock";
import PricingBlock from "@/components/PricingBlock";
import FAQBlock from "@/components/FAQBlock";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";

// Lazy: només es carreguen quan l'usuari obre el modal — redueix el chunk inicial
const QuizModal   = lazy(() => import("@/components/QuizModal"));
const SignupModal = lazy(() => import("@/components/SignupModal").then((m) => ({ default: m.SignupModal })));
import { useTranslation } from "react-i18next";
import {
  organizationSchema,
  softwareAppSchema,
  faqPageSchema,
  howToSchema,
} from "@/lib/seo/schemas";

const Index = () => {
  const [quizOpen, setQuizOpen] = useState(false);
  const [signupOpen, setSignupOpen] = useState(false);
  const { t: tSeo } = useTranslation("seo");
  const { t: tHome } = useTranslation("home");

  const homeFaqs = (tHome("faq.list", { returnObjects: true }) as Array<{ q: string; a: string }>)
    .map((f) => ({ q: f.q, a: f.a }));

  const setupSteps = (tHome("steps.list", { returnObjects: true }) as Array<{ tag: string; title: string; description: string }>)
    .map((s) => ({ name: s.title, text: s.description }));

  return (
    <div className="min-h-screen bg-white">
      <SEO
        title={tSeo("home.title")}
        description={tSeo("home.description")}
        path="/"
        schemas={[
          softwareAppSchema(),
          organizationSchema(),
          faqPageSchema(homeFaqs),
          howToSchema(
            tHome("steps.title_1"),
            tHome("steps.subtitle"),
            setupSteps
          ),
        ]}
      />
      <SiteHeader onOpenQuiz={() => setSignupOpen(true)} />
      <main>
        <CinematicHero onOpenQuiz={() => setSignupOpen(true)} />
        <PainBlock />
        <FeaturesBlock />
        <GlassCards />
        <StepsBlock />
        <ComplianceBlock />
        <TestimonialBlock />
        <PricingBlock />
        <FAQBlock />
        <FinalCTA onOpenQuiz={() => setSignupOpen(true)} />
      </main>
      <Footer />
      <Suspense fallback={null}>
        {quizOpen && <QuizModal isOpen={quizOpen} onClose={() => setQuizOpen(false)} />}
        {signupOpen && <SignupModal isOpen={signupOpen} onClose={() => setSignupOpen(false)} />}
      </Suspense>
      <PageProgress />
    </div>
  );
};

export default Index;
