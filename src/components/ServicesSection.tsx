import { Bot, Layers, Zap, BarChart3, MessageSquare, Brain } from "lucide-react";
import teamCollab from "@/assets/team-collab.jpg";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

const services = [
  {
    icon: Layers,
    title: "End to End",
    description: "Acompañamos todo el ciclo de vida del canal conversacional: desde la estrategia hasta la mejora continua.",
  },
  {
    icon: Bot,
    title: "Chatbots Multicanal",
    description: "Diseñamos chatbots que operan en WhatsApp, Web, Instagram y más, con una experiencia unificada.",
  },
  {
    icon: Zap,
    title: "Time-to-Market Acelerado",
    description: "Nuestra experiencia multi-industria nos permite acelerar la implementación y garantizar soluciones sólidas.",
  },
  {
    icon: BarChart3,
    title: "Data & Performance",
    description: "Cada solución se diseña con foco en métricas de negocio. Medimos, iteramos y optimizamos continuamente.",
  },
  {
    icon: MessageSquare,
    title: "Expertos en WhatsApp",
    description: "Conocemos el canal más relevante de la región. Diseñamos soluciones pensadas para cómo interactúan los usuarios.",
  },
  {
    icon: Brain,
    title: "Agentes de IA",
    description: "Integramos agentes de inteligencia artificial que resuelven problemas concretos de negocio de forma autónoma.",
  },
];

const ServicesSection = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section ref={ref} id="diferencial" className={`py-20 md:py-28 bg-gradient-hero transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-14">
          <div>
            <p className="text-teal-light font-semibold text-sm tracking-wide uppercase mb-3 font-heading">
              Por qué elegirnos
            </p>
            <h2 className="font-heading font-bold text-3xl md:text-4xl max-w-2xl text-primary-foreground">
              Lo que hace diferente a Otomatis Labs
            </h2>
          </div>
          <div className="hidden lg:block">
            <div className="relative">
              <div className="absolute -inset-3 bg-primary/10 rounded-2xl blur-xl" />
              <img
                src={teamCollab}
                alt="Equipo colaborando en soluciones de IA"
                width={1280}
                height={720}
                loading="lazy"
                className="relative rounded-2xl shadow-lg object-cover w-full h-64 object-center"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <div
              key={service.title}
              className="rounded-xl p-7 hover:shadow-xl transition-shadow group bg-primary-foreground/5 border border-primary-foreground/10 backdrop-blur-md"
            >
              <div className="w-12 h-12 rounded-lg bg-teal/20 flex items-center justify-center mb-5 group-hover:bg-teal/30 transition-colors">
                <service.icon className="w-6 h-6 text-teal-light" />
              </div>
              <h3 className="font-heading font-semibold text-lg mb-3 text-primary-foreground">{service.title}</h3>
              <p className="text-sm text-primary-foreground/70 leading-relaxed">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
