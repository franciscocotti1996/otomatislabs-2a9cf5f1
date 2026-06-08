import { MessageCircle, Globe, Smartphone, Instagram, Send } from "lucide-react";
import heroPerson from "@/assets/hero-person.jpg";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { useLanguage } from "@/i18n/LanguageContext";

const HeroSection = () => {
  const { ref, isVisible } = useScrollAnimation(0.1);
  const { t } = useLanguage();
  const channels = [
    { icon: MessageCircle, label: t.hero.channels.whatsapp },
    { icon: Globe, label: t.hero.channels.web },
    { icon: Smartphone, label: t.hero.channels.app },
    { icon: Instagram, label: t.hero.channels.ig },
    { icon: Send, label: t.hero.channels.msg },
  ];

  return (
    <section ref={ref} className={`pt-28 md:pt-36 pb-16 md:pb-24 relative overflow-hidden transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0 is-visible" : "opacity-0 translate-y-8"}`}>
      {/* Decorative circle */}
      <div className="absolute top-20 right-0 w-64 h-64 md:w-96 md:h-96 rounded-full border border-primary/10 opacity-50 translate-x-1/3" />

      <div className="container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Text content */}
          <div className="text-center lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/5 mb-6">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-sm font-medium text-primary font-heading">{t.hero.badge}</span>
            </div>

            {/* Headline */}
            <h1 className="font-heading font-bold text-3xl md:text-5xl lg:text-6xl leading-tight mb-6 max-w-4xl mx-auto lg:mx-0">
              {t.hero.titleA}{" "}
              <span className="text-gradient">{t.hero.titleB}</span>{" "}
              {t.hero.titleC}
            </h1>

            {/* Subtitle */}
            <p className="text-muted-foreground text-base md:text-lg max-w-4xl mx-auto lg:mx-0 mb-8 leading-relaxed">
              {t.hero.subtitle}
            </p>

            {/* CTA Button */}
            <div className="max-w-4xl mx-auto lg:mx-0 mb-8">
              <a
                href="#contact"
                className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
              >
                {t.hero.cta}
              </a>
            </div>

            {/* Channel icons */}
            <div className="flex items-center justify-center lg:justify-start gap-6 md:gap-8 flex-wrap max-w-4xl mx-auto lg:mx-0">
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
                alt={t.hero.imgAlt}
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
