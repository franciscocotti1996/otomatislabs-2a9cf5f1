import { useState } from "react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { useLanguage } from "@/i18n/LanguageContext";
import ResponsiveImage from "@/components/ResponsiveImage";
import { responsiveImages, type ResponsiveImageAsset } from "@/lib/responsive-images";

type Logo = { name: string; asset: ResponsiveImageAsset; sizes: string };

const logos: Logo[] = [
  { name: "BullMarket", asset: responsiveImages.bullMarket, sizes: "148px" },
  { name: "Inviu", asset: responsiveImages.inviu, sizes: "(min-width: 768px) 91px, 69px" },
  { name: "Capital Markets", asset: responsiveImages.capitalMarkets, sizes: "(min-width: 768px) 64px, 48px" },
  { name: "Keko", asset: responsiveImages.keko, sizes: "(min-width: 768px) 148px, 122px" },
  { name: "Legión Extranjera", asset: responsiveImages.legion, sizes: "148px" },
  { name: "nocnoc", asset: responsiveImages.nocnoc, sizes: "148px" },
];

const LogoItem = ({ logo }: { logo: Logo }) => {
  const [errored, setErrored] = useState(false);
  if (!errored) {
    return (
      <ResponsiveImage
        asset={logo.asset}
        sizes={logo.sizes}
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
