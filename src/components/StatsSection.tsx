const stats = [
  { value: "+10K", label: "conversaciones gestionadas", highlight: "por mes" },
  { value: "+15", label: "chatbots productivos en operación", highlight: "" },
  { value: "3+", label: "años impulsando soluciones", highlight: "" },
];

const StatsSection = () => {
  return (
    <section className="py-16 bg-gradient-hero">
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
