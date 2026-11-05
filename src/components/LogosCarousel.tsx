import { useState } from "react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { useLanguage } from "@/i18n/LanguageContext";
import bullMarket from "@/assets/logos/bull-market.png";
import capitalMarkets from "@/assets/logos/capital-markets.png";
import inviu from "@/assets/logos/inviu.png";
import keko from "@/assets/logos/keko.webp";
import legion from "@/assets/logos/legion.png";
import nocnoc from "@/assets/logos/nocnoc.png";

type Logo = { name: string; src?: string };

const logos: Logo[] = [
  { name: "BullMarket", src: bullMarket },
  { name: "Inviu", src: inviu },
  { name: "Capital Markets", src: capitalMarkets },
  { name: "Keko", src: keko },
  { name: "Legión Extranjera", src: legion },
  { name: "nocnoc", src: nocnoc },
];

const LogoItem = ({ logo }: { logo: Logo }) => {
  const [errored, setErrored] = useState(false);
  if (logo.src && !errored) {
    return (
      <img
        src={logo.src}
        alt={logo.name}
        onError={() => setErrored(true)}
        className="h-12 md:h-16 w-auto max-w-[180px] object-contain opacity-60 hover:opacity-100 grayscale hover:grayscale-0 transition-all px-4"
        loading="lazy"
      />
    );
  }
  return (
    <span className="text-xl md:text-2xl font-heading font-bold text-muted-foreground/40 hover:text-primary/70 transition-colors px-4 select-none">
      {logo.name}
    </span>
  );
};

const LogosCarousel = () => {
  const { ref, isVisible } = useScrollAnimation();
  const { t } = useLanguage();

  return (
    <section
      ref={ref}
      className={`py-14 border-y border-border/50 overflow-hidden transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0 is-visible" : "opacity-0 translate-y-8"}`}
    >
      <div className="container mb-6">
        <p className="text-center text-sm text-muted-foreground font-medium font-heading uppercase tracking-wide">
          {t.logos.trust}
        </p>
      </div>

      {/* Infinite scroll track */}
      <div className="relative flex overflow-hidden">
        <div className="flex animate-scroll-left gap-12 items-center whitespace-nowrap">
          {[...logos, ...logos].map((logo, i) => (
            <LogoItem key={i} logo={logo} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default LogosCarousel;
