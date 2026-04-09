import { ArrowRight, MessageCircle, Globe, Smartphone, Instagram, Send } from "lucide-react";

const channels = [
  { icon: MessageCircle, label: "WhatsApp" },
  { icon: Globe, label: "Webchat" },
  { icon: Smartphone, label: "Chat in App" },
  { icon: Instagram, label: "Instagram" },
  { icon: Send, label: "Messenger" },
];

const HeroSection = () => {
  return (
    <section className="pt-28 md:pt-36 pb-16 md:pb-24 relative overflow-hidden">
      {/* Decorative circle */}
      <div className="absolute top-20 right-0 w-64 h-64 md:w-96 md:h-96 rounded-full border border-primary/10 opacity-50 translate-x-1/3" />

      <div className="container text-center relative z-10">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/5 mb-8">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <span className="text-sm font-medium text-primary font-heading">Chatbots & Agentes de IA</span>
        </div>

        {/* Headline */}
        <h1 className="font-heading font-bold text-3xl md:text-5xl lg:text-6xl leading-tight max-w-4xl mx-auto mb-6">
          Automatiza la relación con tus clientes con{" "}
          <span className="text-gradient">chatbots multicanal</span>{" "}
          potenciados por IA.
        </h1>

        {/* Subtitle */}
        <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
          En Otomatis Labs desarrollamos tecnologías de chatbots de vanguardia que permiten a las empresas automatizar interacciones y mejorar sus servicios.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
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
        <div className="flex items-center justify-center gap-6 md:gap-8 flex-wrap">
          {channels.map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-2 text-muted-foreground">
              <Icon className="w-5 h-5" />
              <span className="text-sm font-medium">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
