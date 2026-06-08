import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { useLanguage } from "@/i18n/LanguageContext";
import { Brain, Zap, Target, Workflow, Shield, TrendingUp, ArrowRight } from "lucide-react";
import { useState } from "react";

const FEATURE_ICONS = [Brain, Zap, Target, Workflow, Shield, TrendingUp];

const WHATSAPP_PHONE = "5491134213579";
const buildWhatsAppUrl = (message: string) =>
  `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`;

const AIAgentsSection = () => {
  const { ref, isVisible } = useScrollAnimation(0.1);
  const { t } = useLanguage();
  const features = t.aiAgents.features.map((f, i) => ({ ...f, icon: FEATURE_ICONS[i] }));
  const services = t.aiAgents.cta.services;
  const [selectedServiceId, setSelectedServiceId] = useState<string>(services[0].id);
  const selectedService = services.find((s) => s.id === selectedServiceId) ?? services[0];
  const whatsappUrl = buildWhatsAppUrl(selectedService.message);

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

        {/* Central definition card — creative split layout */}
        <div className="max-w-4xl mx-auto mb-14">
          <div className="glass-card rounded-2xl md:rounded-[2rem] border border-primary/20 relative overflow-hidden">
            <div className="flex flex-col md:flex-row">
              {/* Content side */}
              <div className="md:w-3/5 p-8 md:p-10 lg:p-12 relative">
                <div className="absolute top-0 right-0 w-48 h-48 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                <div className="relative">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary/10 rounded-full mb-5">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                    <span className="text-primary font-heading font-semibold text-[10px] uppercase tracking-widest">
                      {t.aiAgents.eyebrow}
                    </span>
                  </div>
                  <h3 className="font-heading font-bold text-xl md:text-2xl lg:text-[1.65rem] leading-tight mb-4">
                    {t.aiAgents.definition.title}
                  </h3>
                  <p className="text-muted-foreground text-base md:text-[0.97rem] leading-relaxed mb-8">
                    {t.aiAgents.definition.body}
                  </p>

                  {/* Benefit micro-cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      { icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" /></svg>, label: t.aiAgents.definition.tags[0] },
                      { icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>, label: t.aiAgents.definition.tags[1] },
                      { icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" /></svg>, label: t.aiAgents.definition.tags[2] },
                      { icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>, label: t.aiAgents.definition.tags[3] },
                    ].map((item) => (
                      <div
                        key={item.label}
                        className="flex items-center gap-3 p-3 rounded-xl bg-background/50 border border-primary/10 hover:border-primary/30 transition-colors group/item"
                      >
                        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover/item:bg-primary/20 transition-colors shrink-0">
                          {item.icon}
                        </div>
                        <span className="text-sm font-medium text-foreground/90 leading-snug">
                          {item.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Visual engine side */}
              <div className="md:w-2/5 bg-[#041424] relative flex items-center justify-center min-h-[300px] md:min-h-full overflow-hidden">
                {/* Orbital rings */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-40 h-40 rounded-full border border-primary/20 animate-[spin_12s_linear_infinite]" />
                  <div className="absolute w-56 h-56 rounded-full border border-dashed border-primary/10 animate-[spin_18s_linear_infinite_reverse]" />
                  <div className="absolute w-28 h-28 rounded-full border border-primary/30 animate-ping" style={{ animationDuration: '3s' }} />
                </div>
                {/* Cross lines */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="absolute w-[140%] h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent rotate-45" />
                  <div className="absolute w-[140%] h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent -rotate-45" />
                </div>
                {/* Floating dots */}
                <div className="absolute top-1/4 left-1/4 w-1.5 h-1.5 rounded-full bg-primary/60 animate-pulse" />
                <div className="absolute bottom-1/3 right-1/4 w-1 h-1 rounded-full bg-primary/40 animate-pulse" style={{ animationDelay: '0.7s' }} />
                <div className="absolute top-2/3 left-1/2 w-1 h-1 rounded-full bg-white/20 animate-pulse" style={{ animationDelay: '1.2s' }} />

                {/* Central core */}
                <div className="relative z-10 flex flex-col items-center">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-primary to-primary/70 flex items-center justify-center shadow-[0_0_40px_rgba(46,169,152,0.35)]">
                    <Brain className="w-10 h-10 text-white" />
                  </div>
                  <p className="mt-5 text-white/40 text-[10px] font-heading font-semibold tracking-[0.25em] uppercase">
                    Inteligencia Activa
                  </p>
                  <div className="mt-2 flex gap-1">
                    <div className="w-1 h-1 rounded-full bg-primary animate-bounce" style={{ animationDuration: '1.2s' }} />
                    <div className="w-1 h-1 rounded-full bg-primary animate-bounce" style={{ animationDuration: '1.2s', animationDelay: '0.2s' }} />
                    <div className="w-1 h-1 rounded-full bg-primary animate-bounce" style={{ animationDuration: '1.2s', animationDelay: '0.4s' }} />
                  </div>
                </div>
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
              <p className="text-sm font-medium mb-3 text-foreground/80">
                {t.aiAgents.cta.servicePrompt}
              </p>
              <div className="flex flex-wrap justify-center gap-2 mb-6">
                {services.map((service) => {
                  const isSelected = service.id === selectedServiceId;
                  return (
                    <button
                      key={service.id}
                      type="button"
                      onClick={() => setSelectedServiceId(service.id)}
                      aria-pressed={isSelected}
                      className={`px-3 py-1.5 rounded-full text-xs md:text-sm font-medium border transition-colors ${
                        isSelected
                          ? "bg-primary text-primary-foreground border-primary"
                          : "bg-background/50 text-foreground/80 border-primary/20 hover:border-primary/50 hover:text-foreground"
                      }`}
                    >
                      {service.label}
                    </button>
                  );
                })}
              </div>
              <a
                href={whatsappUrl}
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
