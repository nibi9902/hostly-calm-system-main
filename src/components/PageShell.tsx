import { useState } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import Footer from "@/components/Footer";
import QuizModal from "@/components/QuizModal";
import SEO from "@/components/SEO";

interface PageShellProps {
  title: string;
  description: string;
  /** Path canonical relatiu, ex: "/funciones/check-in". Fallback: pathname actual. */
  path?: string;
  /** Imatge OG específica de la pàgina. */
  image?: string;
  /** Schemas JSON-LD addicionals per a aquesta pàgina. */
  schemas?: Array<Record<string, unknown>>;
  children: React.ReactNode;
}

export default function PageShell({
  title,
  description,
  path,
  image,
  schemas = [],
  children,
}: PageShellProps) {
  const [quizOpen, setQuizOpen] = useState(false);
  const canonicalPath = path ?? (typeof window !== "undefined" ? window.location.pathname : "/");

  return (
    <div className="min-h-screen bg-white">
      <SEO
        title={title}
        description={description}
        path={canonicalPath}
        image={image}
        schemas={schemas}
      />
      <SiteHeader onOpenQuiz={() => setQuizOpen(true)} />
      <main>{children}</main>
      <Footer />
      <QuizModal isOpen={quizOpen} onClose={() => setQuizOpen(false)} />
    </div>
  );
}
