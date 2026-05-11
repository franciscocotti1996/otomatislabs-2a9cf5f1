import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { Search, PenLine, Cpu, TrendingUp, ArrowRight } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Discovery",
    description: "Entendemos tu negocio, definimos objetivos y priorizamos casos de uso de alto impacto.",
    Icon: Search,
  },
  {
    number: "02",
    title: "Diseño",
    description: "Diseñamos la experiencia conversacional y la arquitectura técnica del canal.",
    Icon: PenLine,
  },
  {
    number: "03",
    title: "Desarrollo e Implementación",
    description: "Construimos, integramos y ponemos en producción soluciones listas para operar a escala.",
    Icon: Cpu,
  },
  {
    number: "04",
    title: "Growth y Mejora continua",
    description: "Medimos, iteramos y evolucionamos el canal en función de datos reales.",
    Icon: TrendingUp,
  },
];

const ProcessSection = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section
      ref={ref}
      id="proceso"
      className={`relative py-20 md:py-28 overflow-hidden transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0 is-visible" : "opacity-0 translate-y-8"
      }`}
    >
      {/* Soft backdrop */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background via-muted/40 to-background" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -z-10 h-72 w-[60rem] max-w-full rounded-full bg-primary/10 blur-3xl" />

      <div className="container">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <p className="text-primary font-semibold text-sm tracking-wide uppercase mb-3 font-heading">
            Proceso
          </p>
          <h2 className="font-heading font-bold text-3xl md:text-5xl leading-tight">
            Un proceso probado para entornos{" "}
            <span className="text-gradient">de alta complejidad</span>
          </h2>
          <p className="mt-5 text-muted-foreground text-base md:text-lg">
            Trabajamos con un enfoque iterativo que combina{" "}
            <span className="text-foreground font-semibold">estrategia, implementación y mejora continua</span>,
            reduciendo riesgos y acelerando resultados.
          </p>
        </div>

        {/* Flow */}
        <div className="relative">
          {/* Connector line (desktop) */}
          <div className="hidden lg:block absolute top-[7.25rem] left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-8 lg:gap-2 items-start">
            {steps.map((step, i) => (
              <React.Fragment key={step.number}>
                <div
                  className="lg:col-span-1 flex flex-col items-center text-center group"
                >
                  <div className="relative">
                    <div className="w-32 h-32 rounded-3xl bg-card border border-border shadow-lg flex flex-col items-center justify-center gap-2 transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-xl group-hover:border-primary/40">
                      <span className="font-heading font-bold text-xs text-primary tracking-widest">
                        {step.number}
                      </span>
                      <step.Icon className="w-9 h-9 text-primary" strokeWidth={1.75} />
                    </div>
                  </div>
                  <h3 className="font-heading font-bold text-lg mt-6 mb-3">
                    {step.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed max-w-[16rem]">
                    {step.description}
                  </p>
                </div>

                {i < steps.length - 1 && (
                  <div
                    className="hidden lg:flex lg:col-span-1 items-start justify-center pt-[3.5rem]"
                  >
                    <ArrowRight className="w-6 h-6 text-primary/70" strokeWidth={2} />
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
