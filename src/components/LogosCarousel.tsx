import { useScrollAnimation } from "@/hooks/use-scroll-animation";

const logos = [
  "BullMarket", "Respaldar", "Inviu", "Capital Markets",
  "Keko", "Legión Extranjera", "nocnoc",
];

const LogosCarousel = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section
      ref={ref}
      className={`py-14 border-y border-border/50 overflow-hidden transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
    >
      <div className="container mb-6">
        <p className="text-center text-sm text-muted-foreground font-medium font-heading uppercase tracking-wide">
          Empresas que confían en nosotros
        </p>
      </div>

      {/* Infinite scroll track */}
      <div className="relative flex overflow-hidden">
        <div className="flex animate-scroll-left gap-12 items-center whitespace-nowrap">
          {[...logos, ...logos].map((name, i) => (
            <span
              key={i}
              className="text-xl md:text-2xl font-heading font-bold text-muted-foreground/30 hover:text-primary/60 transition-colors px-4 select-none"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LogosCarousel;
