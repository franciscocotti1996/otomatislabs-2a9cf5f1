import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { useLanguage } from "@/i18n/LanguageContext";
import { Brain, Zap, Target, Workflow, Shield, TrendingUp, ArrowRight } from "lucide-react";

const FEATURE_ICONS = [Brain, Zap, Target, Workflow, Shield, TrendingUp];

const WHATSAPP_URL =
  "https://wa.me/5491134213579?text=Hola%2C%20quiero%20solicitar%20una%20demo%20gratuita%20de%20agentes%20de%20IA";

const AIAgentsSection = () => {
  const { ref, isVisible } = useScrollAnimation(0.1);
  const { t } = useLanguage();
  const features = t.aiAgents.features.map((f, i) => ({ ...f, icon: FEATURE_ICONS[i] }));

  return (
    <section
      ref={ref}
      id="agentes-ia"
      className={`relative py-20 md:py-28 overflow-hidden transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0 is-visible" : "opacity-0 translate-y-8"
      }`}
    >
      {/* Background gradient & glow */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background via-muted/30 to-background" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 h-96 w-[50rem] max-w-full rounded-full bg-primary/10 blur-3xl" />

      <div className="container">
        {/* Header */}
        <div className="text-center mb-14 md:mb-16 max-w-3xl mx-auto">
          <p className="text-primary font-semibold text-sm tracking-wide uppercase mb-3 font-heading">
            {t.aiAgents.eyebrow}
          </p>
          <h2 className="font-heading font-bold text-3xl md:text-5xl leading-tight">
            {t.aiAgents.titleA}{" "}
            <span className="text-gradient">{t.aiAgents.titleB}</span>
          </h2>
          <p className="mt-5 text-muted-foreground text-base md:text-lg leading-relaxed">
            {t.aiAgents.intro}
          </p>
        </div>

        {/* Central definition card */}
        <div className="max-w-3xl mx-auto mb-14">
          <div className="glass-card rounded-2xl p-8 md:p-10 border border-primary/20 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
            <div className="relative">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Brain className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-heading font-bold text-xl md:text-2xl">
                  {t.aiAgents.definition.title}
                </h3>
              </div>
              <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-4">
                {t.aiAgents.definition.body}
              </p>
              <div className="flex flex-wrap gap-2">
                {t.aiAgents.definition.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Feature grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="glass-card rounded-xl p-7 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-heading font-semibold text-lg mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
        {/* CTA */}
        <div className="mt-14 md:mt-16 max-w-2xl mx-auto text-center">
          <div className="glass-card rounded-2xl p-8 md:p-10 border border-primary/20 relative overflow-hidden">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/10 rounded-full blur-2xl" />
            <div className="relative">
              <h3 className="font-heading font-bold text-xl md:text-2xl mb-3">
                {t.aiAgents.cta.title}
              </h3>
              <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-6">
                {t.aiAgents.cta.body}
              </p>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
              >
                {t.aiAgents.cta.button}
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIAgentsSection;
