import { useScrollAnimation } from "@/hooks/use-scroll-animation";

const stats = [
  { value: "+100K", label: "conversaciones gestionadas", highlight: "por mes" },
  { value: "+30", label: "chatbots productivos en operación", highlight: "" },
  { value: "8+", label: "años impulsando soluciones", highlight: "" },
];

const StatsSection = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section ref={ref} className={`py-16 bg-gradient-hero transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0 is-visible" : "opacity-0 translate-y-8"}`}>
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {stats.map((stat) => (
            <div key={stat.value} className="text-center">
              <p className="font-heading font-bold text-4xl md:text-5xl text-teal-light mb-2">
                {stat.value}
              </p>
              <p className="text-sm text-primary-foreground/70">
                {stat.label}{" "}
                {stat.highlight && (
                  <span className="text-teal-light font-medium">{stat.highlight}</span>
                )}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
