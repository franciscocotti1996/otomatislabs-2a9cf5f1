import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { useLanguage } from "@/i18n/LanguageContext";
import { Brain, Zap, Target, Workflow, Shield, TrendingUp, ArrowRight } from "lucide-react";
import { MessageCircle, Mail, Database, ShoppingCart, Phone, Calendar } from "lucide-react";
import { useState, useEffect } from "react";

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

  // Interactive agent network
  const nodes = [
    { id: "wa", label: "WhatsApp", icon: MessageCircle, angle: -90 },
    { id: "mail", label: "Email", icon: Mail, angle: -30 },
    { id: "crm", label: "CRM", icon: Database, angle: 30 },
    { id: "shop", label: "E-commerce", icon: ShoppingCart, angle: 90 },
    { id: "call", label: "Llamadas", icon: Phone, angle: 150 },
    { id: "cal", label: "Agenda", icon: Calendar, angle: 210 },
  ];
  const activityFeed = [
    "→ Respondiendo consulta en WhatsApp",
    "→ Actualizando contacto en CRM",
    "→ Agendando reunión automáticamente",
    "→ Enviando seguimiento por email",
    "→ Procesando pedido de e-commerce",
    "→ Calificando lead entrante",
  ];
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [activeNodeIdx, setActiveNodeIdx] = useState(0);
  const [feedIdx, setFeedIdx] = useState(0);

  useEffect(() => {
    const a = setInterval(() => setActiveNodeIdx((i) => (i + 1) % nodes.length), 1600);
    const b = setInterval(() => setFeedIdx((i) => (i + 1) % activityFeed.length), 2200);
    return () => { clearInterval(a); clearInterval(b); };
  }, []);

  const activeId = hoveredNode ?? nodes[activeNodeIdx].id;

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
              <div className="md:w-2/5 bg-[#041424] relative min-h-[360px] md:min-h-full overflow-hidden flex flex-col">
                {/* Subtle grid background */}
                <div
                  className="absolute inset-0 opacity-[0.07]"
                  style={{
                    backgroundImage:
                      "linear-gradient(rgba(46,169,152,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(46,169,152,0.6) 1px, transparent 1px)",
                    backgroundSize: "22px 22px",
                  }}
                />
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-primary/20 rounded-full blur-3xl" />

                {/* Interactive node network */}
                <div className="relative flex-1 flex items-center justify-center py-8">
                  <div className="relative w-[260px] h-[260px]">
                    {/* SVG connection lines */}
                    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 260 260">
                      {nodes.map((node) => {
                        const rad = (node.angle * Math.PI) / 180;
                        const x = 130 + Math.cos(rad) * 100;
                        const y = 130 + Math.sin(rad) * 100;
                        const isActive = node.id === activeId;
                        return (
                          <line
                            key={node.id}
                            x1="130"
                            y1="130"
                            x2={x}
                            y2={y}
                            stroke={isActive ? "#2ea998" : "rgba(46,169,152,0.18)"}
                            strokeWidth={isActive ? 1.5 : 1}
                            strokeDasharray={isActive ? "0" : "3 4"}
                            className="transition-all duration-300"
                          />
                        );
                      })}
                      <circle cx="130" cy="130" r="55" fill="none" stroke="rgba(46,169,152,0.15)" />
                      <circle cx="130" cy="130" r="100" fill="none" stroke="rgba(46,169,152,0.08)" strokeDasharray="2 6" />
                    </svg>

                    {/* Central brain core */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-primary to-primary/60 flex items-center justify-center shadow-[0_0_40px_rgba(46,169,152,0.45)] relative">
                        <Brain className="w-8 h-8 text-white" />
                        <span className="absolute inset-0 rounded-2xl border border-primary/60 animate-ping" />
                      </div>
                    </div>

                    {/* Orbiting channel nodes */}
                    {nodes.map((node) => {
                      const rad = (node.angle * Math.PI) / 180;
                      const x = 50 + Math.cos(rad) * 38.46;
                      const y = 50 + Math.sin(rad) * 38.46;
                      const isActive = node.id === activeId;
                      const Icon = node.icon;
                      return (
                        <button
                          key={node.id}
                          type="button"
                          onMouseEnter={() => setHoveredNode(node.id)}
                          onMouseLeave={() => setHoveredNode(null)}
                          onFocus={() => setHoveredNode(node.id)}
                          onBlur={() => setHoveredNode(null)}
                          aria-label={node.label}
                          className="absolute -translate-x-1/2 -translate-y-1/2 group/node focus:outline-none"
                          style={{ left: `${x}%`, top: `${y}%` }}
                        >
                          <div
                            className={`w-11 h-11 rounded-xl flex items-center justify-center border transition-all duration-300 ${
                              isActive
                                ? "bg-primary border-primary scale-110 shadow-[0_0_20px_rgba(46,169,152,0.6)]"
                                : "bg-[#0a2030] border-primary/30 hover:border-primary/70"
                            }`}
                          >
                            <Icon className={`w-5 h-5 ${isActive ? "text-white" : "text-primary/80"}`} />
                          </div>
                          <span
                            className={`absolute left-1/2 -translate-x-1/2 top-full mt-1.5 text-[10px] font-heading font-semibold tracking-wider uppercase whitespace-nowrap transition-colors ${
                              isActive ? "text-primary" : "text-white/40"
                            }`}
                          >
                            {node.label}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Live activity feed */}
                <div className="relative mx-5 mb-5 rounded-xl border border-primary/20 bg-black/30 backdrop-blur-sm p-3">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                    <span className="text-[9px] font-heading font-bold tracking-[0.25em] uppercase text-primary">
                      Agente activo
                    </span>
                  </div>
                  <p
                    key={feedIdx}
                    className="text-xs text-white/80 font-mono leading-snug animate-fade-in"
                  >
                    {activityFeed[feedIdx]}
                  </p>
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
