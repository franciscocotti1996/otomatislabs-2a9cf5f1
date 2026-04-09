const steps = [
  {
    number: "01",
    title: "Discovery",
    description: "Entendemos tu negocio, definimos objetivos y priorizamos casos de uso de alto impacto.",
  },
  {
    number: "02",
    title: "Diseño",
    description: "Diseñamos la experiencia conversacional y la arquitectura técnica del canal.",
  },
  {
    number: "03",
    title: "Desarrollo",
    description: "Construimos, integramos y ponemos en producción soluciones listas para operar a escala.",
  },
  {
    number: "04",
    title: "Mejora Continua",
    description: "Medimos, iteramos y evolucionamos el canal en función de datos reales.",
  },
];

const ProcessSection = () => {
  return (
    <section id="proceso" className="py-20 md:py-28 bg-muted/50">
      <div className="container">
        <div className="text-center mb-14">
          <p className="text-primary font-semibold text-sm tracking-wide uppercase mb-3 font-heading">
            Proceso
          </p>
          <h2 className="font-heading font-bold text-3xl md:text-4xl max-w-2xl mx-auto">
            Un proceso probado para resultados reales
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step) => (
            <div key={step.number} className="relative">
              <div className="glass-card rounded-xl p-7 h-full">
                <span className="font-heading font-bold text-4xl text-primary/20 block mb-4">
                  {step.number}
                </span>
                <h3 className="font-heading font-semibold text-lg mb-3">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <p className="text-sm text-primary font-medium font-heading">↻ Ciclo iterativo continuo</p>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
