import { useState } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import DemoVideo from "@/components/DemoVideo";
import PainBlock from "@/components/PainBlock";
import { GlassCards } from "@/components/ui/glass-cards";
import StepsBlock from "@/components/StepsBlock";
import TestimonialBlock from "@/components/TestimonialBlock";
import TransformationBlock from "@/components/TransformationBlock";
import PricingBlock from "@/components/PricingBlock";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import QuizModal from "@/components/QuizModal";

const Index = () => {
  const [quizOpen, setQuizOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Navbar onOpenQuiz={() => setQuizOpen(true)} />
      <main>
        <HeroSection onOpenQuiz={() => setQuizOpen(true)} />
        <div className="relative">
          <PainBlock />
          <GlassCards />
        </div>
        <StepsBlock />
        <PricingBlock />
        <TestimonialBlock />
        <DemoVideo />
        <TransformationBlock />
        <FinalCTA onOpenQuiz={() => setQuizOpen(true)} />
      </main>
      <Footer />
      <QuizModal isOpen={quizOpen} onClose={() => setQuizOpen(false)} />
    </div>
  );
};

export default Index;
