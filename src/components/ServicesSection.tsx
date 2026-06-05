import { Bot, Layers, Zap, BarChart3, MessageSquare, Brain } from "lucide-react";
import teamCollab from "@/assets/team-collab.jpg";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { useLanguage } from "@/i18n/LanguageContext";

const ICONS = [Layers, Bot, Zap, BarChart3, MessageSquare, Brain];

const ServicesSection = () => {
  const { ref, isVisible } = useScrollAnimation();
  const { t } = useLanguage();
  const services = t.services.items.map((it, i) => ({ ...it, icon: ICONS[i] }));

  return (
    <section ref={ref} id="diferencial" className={`py-20 md:py-28 bg-gradient-hero transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0 is-visible" : "opacity-0 translate-y-8"}`}>
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-14">
          <div>
            <p className="text-teal-light font-semibold text-sm tracking-wide uppercase mb-3 font-heading">
              {t.services.eyebrow}
            </p>
            <h2 className="font-heading font-bold text-3xl md:text-4xl max-w-2xl text-primary-foreground">
              {t.services.title}
            </h2>
          </div>
          <div className="hidden lg:block">
            <div className="relative">
              <div className="absolute -inset-3 bg-primary/10 rounded-2xl blur-xl" />
              <img
                src={teamCollab}
                alt={t.services.imgAlt}
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
