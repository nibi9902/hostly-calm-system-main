import { useState } from "react";
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
import QuizModal from "@/components/QuizModal";
import {
  organizationSchema,
  softwareAppSchema,
  faqPageSchema,
  howToSchema,
} from "@/lib/seo/schemas";

const setupSteps = [
  { name: "Añade tu piso", text: "Un cuestionario corto. Responde una sola vez las normas, horarios, accesos y wifi. Listo en menos de 10 minutos." },
  { name: "Conecta Airbnb, Booking y tu cerradura", text: "Un clic por canal. El calendario se sincroniza, los precios se ajustan y la cerradura genera códigos únicos por huésped." },
  { name: "Hostly se ocupa de todo lo que llega", text: "Reservas, mensajes, check-ins, SES, taxa, avisos a limpieza. En tiempo real, sin que tú tengas que intervenir." },
  { name: "Abres la app y todo está en orden", text: "Ingresos del mes, ocupación, check-ins hechos e incidencias en una sola vista. Sin Excel, sin pestañas, sin WhatsApp." },
];

const homeFaqs = [
  {
    q: "¿Qué reemplaza Hostly exactamente?",
    a: "Hostly reemplaza Chekin (check-in y compliance), tu canal manager actual, las plantillas de mensajes manuales, el Excel de cobros y el Dropbox de contratos. Una sola app, una sola factura.",
  },
  {
    q: "¿Cómo funciona el trial de 14 días?",
    a: "Puedes usar Hostly completo durante 14 días sin tarjeta de crédito. Si no te convence, no debes nada.",
  },
  {
    q: "¿Qué es el check-in gratis para siempre?",
    a: "El check-in online, el registro policial (SES), el NRUA y la taxa turística están incluidos sin coste adicional en cualquier plan de pago. No hay límite de check-ins ni precio por unidad.",
  },
  {
    q: "¿Funciona con Airbnb y Booking a la vez?",
    a: "Sí. Hostly sincroniza calendarios, precios y reservas de Airbnb, Booking.com y otros canales en tiempo real. Sin dobles reservas.",
  },
  {
    q: "¿Y si solo tengo 1 apartamento?",
    a: "Hostly está pensado especialmente para propietarios con 1 a 10 apartamentos. A 40€/mes por apartamento, reemplazas varias suscripciones y sales ganando.",
  },
  {
    q: "¿Cumplís con SES, NRUA, policía y taxa turística?",
    a: "Sí. El registro policial (SES.Hospedajes), la comunicación a Mossos o Ertzaintza, el NRUA y la recogida de taxa turística están automatizados dentro de Hostly y son gratuitos para siempre.",
  },
  {
    q: "¿Qué pasa si no me gusta?",
    a: "Puedes cancelar cuando quieras, sin permanencia ni penalización. Los 14 días de prueba no requieren tarjeta.",
  },
  {
    q: "¿Tenéis soporte en español y catalán?",
    a: "Sí. Nuestro equipo atiende en español y catalán. El primer mes hacemos onboarding 1 a 1 contigo.",
  },
];

const Index = () => {
  const [quizOpen, setQuizOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      <SEO
        title="Simplifica la gestión de tu apartamento turístico | Hostly"
        description="Hostly simplifica todo lo que implica tener un piso turístico. Reservas, check-in, mensajes, limpiezas y compliance en una sola app. 14 días gratis, sin tarjeta."
        path="/"
        schemas={[
          softwareAppSchema(),
          organizationSchema(),
          faqPageSchema(homeFaqs),
          howToSchema(
            "Cómo configurar Hostly para tu apartamento turístico",
            "Configura Hostly en menos de 15 minutos y automatiza check-ins, mensajes, limpiezas y compliance.",
            setupSteps
          ),
        ]}
      />
      <SiteHeader onOpenQuiz={() => setQuizOpen(true)} />
      <main>
        <CinematicHero onOpenQuiz={() => setQuizOpen(true)} />
        <PainBlock />
        <FeaturesBlock />
        <GlassCards />
        <StepsBlock />
        <ComplianceBlock />
        <TestimonialBlock />
        <PricingBlock />
        <FAQBlock />
        <FinalCTA onOpenQuiz={() => setQuizOpen(true)} />
      </main>
      <Footer />
      <QuizModal isOpen={quizOpen} onClose={() => setQuizOpen(false)} />
      <PageProgress />
    </div>
  );
};

export default Index;
