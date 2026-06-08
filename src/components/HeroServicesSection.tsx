import { MessageCircle, Brain, Plug } from "lucide-react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { useLanguage } from "@/i18n/LanguageContext";

const ICONS = [MessageCircle, Brain, Plug];

const HeroServicesSection = () => {
  const { ref, isVisible } = useScrollAnimation();
  const { t } = useLanguage();
  const items = t.heroServices.items.map((it, i) => ({ ...it, icon: ICONS[i] }));

  return (
    <section
      ref={ref}
      className={`py-16 md:py-20 transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0 is-visible" : "opacity-0 translate-y-8"
      }`}
    >
      <div className="container">
        <div className="text-center mb-10">
          <p className="text-primary font-semibold text-sm tracking-wide uppercase mb-3 font-heading">
            {t.heroServices.eyebrow}
          </p>
          <h2 className="font-heading font-bold text-3xl md:text-4xl max-w-2xl mx-auto">
            {t.heroServices.title}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {items.map((item) => (
            <div
              key={item.title}
              className="glass-card rounded-xl p-7 hover:shadow-xl transition-shadow group text-left"
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
                <item.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-heading font-semibold text-lg mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <a
            href="#servicios"
            className="inline-flex items-center justify-center px-6 py-3 rounded-lg border border-primary/30 text-primary font-medium hover:bg-primary/5 transition-colors"
          >
            {t.heroServices.cta}
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroServicesSection;
