import { Fragment } from "react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import {
  Search,
  PenLine,
  Cpu,
  TrendingUp,
  ArrowRight,
  FileText,
  RefreshCw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const steps = [
  {
    number: "01",
    title: "Discovery",
    description:
      "Entendemos tu negocio, definimos objetivos y priorizamos casos de uso de alto impacto.",
    Icon: Search,
    deliverables: [
      "Workshop de descubrimiento con stakeholders",
      "Mapa de casos de uso priorizados",
      "Definición de KPIs y métricas de éxito",
      "Roadmap inicial y estimación de esfuerzo",
    ],
  },
  {
    number: "02",
    title: "Diseño",
    description:
      "Diseñamos la experiencia conversacional y la arquitectura técnica del canal.",
    Icon: PenLine,
    deliverables: [
      "Flujos conversacionales y guion del bot",
      "Arquitectura técnica e integraciones",
      "Prototipo navegable del canal",
      "Plan de pruebas y criterios de aceptación",
    ],
  },
  {
    number: "03",
    title: "Desarrollo e Implementación",
    description:
      "Construimos, integramos y ponemos en producción soluciones listas para operar a escala.",
    Icon: Cpu,
    deliverables: [
      "Canal desplegado en producción",
      "Integraciones con CRM, ERP y APIs internas",
      "Panel de monitoreo y observabilidad",
      "Documentación técnica y handover",
    ],
  },
  {
    number: "04",
    title: "Growth y Mejora continua",
    description:
      "Medimos, iteramos y evolucionamos el canal en función de datos reales.",
    Icon: TrendingUp,
    deliverables: [
      "Reportes mensuales de performance",
      "Optimización continua de flujos e IA",
      "Nuevos casos de uso e iteraciones",
      "Revisiones estratégicas trimestrales",
    ],
  },
];

const ProcessSection = () => {
  const { ref, isVisible } = useScrollAnimation(0.1);

  return (
    <section
      ref={ref}
      id="proceso"
      className={`relative py-20 md:py-28 overflow-hidden transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0 is-visible" : "opacity-0 translate-y-8"
      }`}
    >
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background via-muted/40 to-background" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -z-10 h-72 w-[60rem] max-w-full rounded-full bg-primary/10 blur-3xl" />

      <div className="container">
        <div className="text-center mb-14 md:mb-16 max-w-3xl mx-auto">
          <p className="text-primary font-semibold text-sm tracking-wide uppercase mb-3 font-heading">
            Proceso
          </p>
          <h2 className="font-heading font-bold text-3xl md:text-5xl leading-tight">
            Un proceso probado para entornos{" "}
            <span className="text-gradient">de alta complejidad</span>
          </h2>
          <p className="mt-5 text-muted-foreground text-base md:text-lg">
            Trabajamos con un enfoque iterativo que combina{" "}
            <span className="text-foreground font-semibold">
              estrategia, implementación y mejora continua
            </span>
            , reduciendo riesgos y acelerando resultados.
          </p>
        </div>

        {/* Flow: all steps visible on one screen */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr] gap-x-3 gap-y-10 items-start">
          {steps.map((step, i) => (
            <Fragment key={step.number}>
              <div className="flex flex-col items-center text-center px-2">
                <div className="relative">
                  <div className="absolute inset-0 rounded-3xl bg-primary/10 blur-xl opacity-0 hover:opacity-100 transition-opacity" />
                  <div className="relative w-24 h-24 md:w-28 md:h-28 rounded-3xl bg-card border border-primary/30 shadow-md flex flex-col items-center justify-center gap-1.5 transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg">
                    <span className="font-heading font-bold text-xs tracking-widest text-primary">
                      {step.number}
                    </span>
                    <step.Icon
                      className="w-8 h-8 text-primary"
                      strokeWidth={1.75}
                    />
                  </div>
                </div>

                <h3 className="font-heading font-bold text-base md:text-lg mt-5 mb-2 text-foreground">
                  {step.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed max-w-[16rem]">
                  {step.description}
                </p>

                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="mt-3 text-primary hover:text-primary hover:bg-primary/10 font-heading font-medium group/btn"
                    >
                      Ver entregables
                      <ArrowRight className="ml-1 w-4 h-4 transition-transform group-hover/btn:translate-x-0.5" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <div className="flex items-center gap-3 mb-1">
                        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                          <step.Icon className="w-5 h-5 text-primary" />
                        </div>
                        <div className="text-left">
                          <p className="text-xs font-semibold text-primary tracking-widest">
                            {step.number}
                          </p>
                          <DialogTitle className="font-heading text-xl">
                            {step.title}
                          </DialogTitle>
                        </div>
                      </div>
                      <DialogDescription className="text-left pt-2">
                        Entregables incluidos en esta etapa:
                      </DialogDescription>
                    </DialogHeader>
                    <ul className="mt-2 space-y-3">
                      {step.deliverables.map((d) => (
                        <li key={d} className="flex items-start gap-3 text-sm">
                          <FileText className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                          <span className="text-foreground/90">{d}</span>
                        </li>
                      ))}
                    </ul>
                  </DialogContent>
                </Dialog>
              </div>

              {i < steps.length - 1 && (
                <div className="hidden lg:flex items-center justify-center pt-12">
                  <div className="relative flex items-center w-full min-w-[40px]">
                    <div className="h-px flex-1 bg-primary/40" />
                    <ArrowRight
                      className="w-5 h-5 -ml-2 text-primary"
                      strokeWidth={2.25}
                    />
                  </div>
                </div>
              )}
            </Fragment>
          ))}
        </div>

        <div className="mt-14 flex justify-center">
          <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full border border-primary/30 bg-card shadow-sm">
            <RefreshCw className="w-4 h-4 text-primary" />
            <span className="font-heading font-semibold text-xs md:text-sm tracking-widest uppercase text-primary">
              Ciclo iterativo continuo
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;