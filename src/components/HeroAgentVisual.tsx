import { BrainCircuit, Database, MessageCircle, Workflow } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import "./hero.css";

const HeroAgentVisual = () => {
  const { t } = useLanguage();
  const { ref, isVisible } = useScrollAnimation(0.1);

  return (
    <figure ref={ref} className="w-full min-w-0" aria-label={t.hero.visualAlt}>
      <div className={`hero-agent-visual ${isVisible ? "is-visible" : ""}`}>
        <svg viewBox="0 0 500 400" className="absolute inset-0 h-full w-full" fill="none" aria-hidden="true">
          <path d="M65 98H165Q185 98 185 118V188H250M435 98H335Q315 98 315 118V188H250M250 248V338" className="stroke-primary/20" strokeWidth="1.5" />
          <path d="M65 98H165Q185 98 185 118V188H250M435 98H335Q315 98 315 118V188H250M250 248V338" className="hero-agent-flow stroke-primary" strokeWidth="2" />
        </svg>
        <div className="hero-agent-node hero-agent-whatsapp">
          <MessageCircle className="h-6 w-6 text-primary" aria-hidden="true" />
          <span>WhatsApp</span>
        </div>
        <div className="hero-agent-node hero-agent-crm">
          <Database className="h-6 w-6 text-secondary" aria-hidden="true" />
          <span>CRM</span>
        </div>
        <div className="hero-agent-node hero-agent-core">
          <BrainCircuit className="h-8 w-8 text-teal-light" aria-hidden="true" />
          <span className="font-heading font-semibold">{t.hero.agentLabel}</span>
        </div>
        <div className="hero-agent-node hero-agent-systems">
          <Workflow className="h-6 w-6 text-secondary" aria-hidden="true" />
          <span className="px-1">{t.hero.systemsLabel}</span>
        </div>
      </div>
      <figcaption className="mt-3 text-center text-xs text-muted-foreground">{t.hero.visualCaption}</figcaption>
    </figure>
  );
};

export default HeroAgentVisual;