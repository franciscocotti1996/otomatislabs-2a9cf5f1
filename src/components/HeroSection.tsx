import { ArrowRight, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import HeroAgentVisual from "@/components/HeroAgentVisual";
import { useLanguage } from "@/i18n/LanguageContext";

const scrollToContact = (e: React.MouseEvent) => {
  e.preventDefault();
  const el = document.getElementById("contacto");
  if (el) {
    const offset = 120;
    const top = el.getBoundingClientRect().top + window.scrollY - offset;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top, behavior: reduced ? "auto" : "smooth" });
  }
};

const HeroSection = () => {
  const { t } = useLanguage();

  return (
    <section aria-labelledby="hero-title" className="is-visible pt-28 md:pt-40 pb-8 md:pb-12">
      <div className="container">
        <div className="hero-intro grid grid-cols-1 lg:grid-cols-[1.15fr_1fr] gap-6 lg:gap-12 items-center">
          <div className="min-w-0">
            <p className="font-heading text-sm font-semibold text-primary mb-5">Otomatis Labs <span className="text-muted-foreground font-normal">/ {t.hero.badge}</span></p>
            <h1 id="hero-title" className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl xl:text-6xl leading-[1.15] mb-6 max-w-2xl">
              {t.hero.titleA}{" "}
              <span className="text-primary">{t.hero.titleB}</span>{" "}
              {t.hero.titleC}
            </h1>

            <p className="text-muted-foreground text-base md:text-lg max-w-xl mb-8 leading-relaxed">
              {t.hero.subtitle}
            </p>

            <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3 items-stretch sm:items-center">
              <Button asChild size="lg" className="h-auto min-h-12 px-5 py-3 whitespace-normal text-center">
                <a href="#contacto" onClick={scrollToContact}><MessageCircle aria-hidden="true" />{t.hero.cta}</a>
              </Button>
              <Button asChild variant="link" className="h-auto min-h-12 px-0 sm:px-2 py-3 whitespace-normal text-center text-foreground">
                <a href="#agentes-ia">{t.hero.secondaryCta}<ArrowRight aria-hidden="true" /></a>
              </Button>
            </div>
          </div>
          <HeroAgentVisual />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
