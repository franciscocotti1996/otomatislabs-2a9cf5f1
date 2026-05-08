import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "¿En qué canales pueden funcionar los chatbots?",
    answer: "Nuestros chatbots operan en WhatsApp, Webchat, Instagram, Facebook Messenger, Telegram y aplicaciones móviles nativas. Todos los canales comparten la misma lógica conversacional para una experiencia unificada.",
  },
  {
    question: "¿Cuánto tiempo toma implementar una solución?",
    answer: "Dependiendo de la complejidad, un chatbot puede estar en producción en 4 a 8 semanas. Proyectos con agentes de IA o integraciones avanzadas pueden tomar entre 8 y 12 semanas.",
  },
  {
    question: "¿Qué tipo de inteligencia artificial utilizan?",
    answer: "Trabajamos con modelos de lenguaje de última generación (LLMs), procesamiento de lenguaje natural (NLP) y agentes autónomos que se integran con las APIs y sistemas de tu empresa.",
  },
  {
    question: "¿Puedo integrar el chatbot con mi CRM o ERP?",
    answer: "Sí. Diseñamos integraciones con sistemas como Salesforce, HubSpot, SAP y cualquier plataforma que exponga APIs REST o webhooks.",
  },
  {
    question: "¿Cómo miden el éxito de una implementación?",
    answer: "Definimos KPIs desde el inicio: tasa de resolución autónoma, NPS, tiempo de respuesta, conversión y reducción de carga operativa. Iteramos en base a datos reales.",
  },
  {
    question: "¿Ofrecen soporte y mejora continua después del lanzamiento?",
    answer: "Sí. Ofrecemos planes de mejora continua que incluyen monitoreo, análisis de conversaciones, reentrenamiento de modelos y evolución del canal.",
  },
];

const FAQSection = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section
      ref={ref}
      className={`py-20 md:py-28 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0 is-visible" : "opacity-0 translate-y-8"}`}
    >
      <div className="container max-w-3xl">
        <div className="text-center mb-14">
          <p className="text-primary font-semibold text-sm tracking-wide uppercase mb-3 font-heading">
            FAQ
          </p>
          <h2 className="font-heading font-bold text-3xl md:text-4xl">
            Preguntas frecuentes
          </h2>
        </div>

        <Accordion type="single" collapsible className="space-y-3">
          {faqs.map((faq, i) => (
            <AccordionItem
              key={i}
              value={`faq-${i}`}
              className="glass-card rounded-xl px-6 border-none"
            >
              <AccordionTrigger className="text-left font-heading font-semibold text-sm md:text-base hover:no-underline py-5">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground leading-relaxed pb-5">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQSection;
