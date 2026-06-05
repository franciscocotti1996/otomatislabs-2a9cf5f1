import { Bot, Globe, Smartphone, Cpu, Workflow, HeadphonesIcon } from "lucide-react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { useLanguage } from "@/i18n/LanguageContext";

const ICONS = [Bot, Globe, Cpu, Workflow, Smartphone, HeadphonesIcon];

const SolutionsSection = () => {
  const { ref, isVisible } = useScrollAnimation();
  const { t } = useLanguage();
  const solutions = t.solutions.items.map((it, i) => ({ ...it, icon: ICONS[i] }));

  return (
    <section ref={ref} id="servicios" className={`py-20 md:py-28 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0 is-visible" : "opacity-0 translate-y-8"}`}>
      <div className="container">
        <div className="text-center mb-14">
          <p className="text-primary font-semibold text-sm tracking-wide uppercase mb-3 font-heading">
            {t.solutions.eyebrow}
          </p>
          <h2 className="font-heading font-bold text-3xl md:text-4xl max-w-2xl mx-auto">
            {t.solutions.title}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {solutions.map((solution) => (
            <div
              key={solution.title}
              className="glass-card rounded-xl p-7 hover:shadow-xl transition-shadow group relative overflow-hidden"
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
                <solution.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-heading font-semibold text-lg">{solution.title}</h3>

              {/* Overlay que aparece al hacer hover */}
              <div className="absolute inset-0 bg-primary/95 rounded-xl p-7 flex flex-col justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <solution.icon className="w-8 h-8 text-primary-foreground mb-4" />
                <h3 className="font-heading font-semibold text-lg text-primary-foreground mb-2">{solution.title}</h3>
                <p className="text-sm text-primary-foreground/90 leading-relaxed">{solution.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SolutionsSection;
