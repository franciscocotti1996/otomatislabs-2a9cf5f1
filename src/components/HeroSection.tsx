import { ArrowRight, MessageCircle, Globe, Smartphone, Instagram, Send } from "lucide-react";
import heroPerson from "@/assets/hero-person.jpg";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

const channels = [
  { icon: MessageCircle, label: "WhatsApp" },
  { icon: Globe, label: "Webchat" },
  { icon: Smartphone, label: "Chat in App" },
  { icon: Instagram, label: "Instagram" },
  { icon: Send, label: "Messenger" },
];

const HeroSection = () => {
  const { ref, isVisible } = useScrollAnimation(0.1);

  return (
    <section ref={ref} className={`pt-28 md:pt-36 pb-16 md:pb-24 relative overflow-hidden transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
      {/* Decorative circle */}
      <div className="absolute top-20 right-0 w-64 h-64 md:w-96 md:h-96 rounded-full border border-primary/10 opacity-50 translate-x-1/3" />

      <div className="container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Text content */}
          <div className="text-center lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/5 mb-8">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-sm font-medium text-primary font-heading">Chatbots & Agentes de IA</span>
            </div>

            {/* Headline */}
            <h1 className="font-heading font-bold text-3xl md:text-5xl lg:text-6xl leading-tight mb-6">
              Automatiza la relación con tus clientes con{" "}
              <span className="text-gradient">chatbots multicanal</span>{" "}
              potenciados por IA.
            </h1>

            {/* Subtitle */}
            <p className="text-muted-foreground text-base md:text-lg max-w-2xl mb-10 leading-relaxed">
              En Otomatis Labs desarrollamos tecnologías de chatbots de vanguardia que permiten a las empresas automatizar interacciones y mejorar sus servicios.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center lg:items-start gap-4 mb-12">
              <a
                href="#servicios"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-lg bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition-opacity"
              >
                Nuestros servicios
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="#proceso"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-lg border border-primary text-primary font-semibold text-sm hover:bg-primary/5 transition-colors"
              >
                Metodología
              </a>
            </div>

            {/* Channel icons */}
            <div className="flex items-center justify-center lg:justify-start gap-6 md:gap-8 flex-wrap">
              {channels.map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2 text-muted-foreground">
                  <Icon className="w-5 h-5" />
                  <span className="text-sm font-medium">{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Image */}
          <div className="hidden lg:flex justify-center">
            <div className="relative">
              <div className="absolute -inset-4 bg-primary/10 rounded-2xl blur-2xl" />
              <img
                src={heroPerson}
                alt="Profesional usando chatbot en smartphone"
                width={1024}
                height={1024}
                className="relative rounded-2xl shadow-2xl object-cover w-full max-w-md"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
