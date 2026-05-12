import { useEffect, useRef, useState } from "react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import {
  Search,
  PenLine,
  Cpu,
  TrendingUp,
  ArrowRight,
  ArrowDown,
  FileText,
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

const clamp = (n: number, min = 0, max = 1) => Math.max(min, Math.min(max, n));

const ProcessSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);
  const { ref: visibilityRef, isVisible: sectionVisible } = useScrollAnimation(0.1);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // Start when top of section reaches 75% of viewport,
      // finish when bottom reaches 25% of viewport.
      const start = vh * 0.75;
      const end = -rect.height + vh * 0.25;
      const p = (start - rect.top) / (start - end);
      setProgress(clamp(p));
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const N = steps.length;
  const isVisible = progress > 0.01;
  // Active step follows scroll progress through the flow.
  const activeIndex = clamp(Math.floor(progress * N), 0, N - 1);
  // Per-segment fill: segment i fills from progress (i+0.5)/N to (i+1.5)/N.
  const segmentFill = (i: number) =>
    clamp((progress - (i + 0.5) / N) / (1 / N));

  const StepCard = ({
    step,
    index,
  }: {
    step: (typeof steps)[number];
    index: number;
  }) => {
    const active = index === activeIndex && isVisible;
    const reached = index <= activeIndex && isVisible;
    return (
      <div className="flex flex-col items-center text-center">
        <div className="relative">
          {/* Active glow */}
          <div
            className={`absolute inset-0 rounded-3xl bg-primary/20 blur-xl transition-opacity duration-500 ${
              active ? "opacity-100" : "opacity-0"
            }`}
          />
          <div
            className={`relative w-28 h-28 md:w-32 md:h-32 rounded-3xl bg-card shadow-lg flex flex-col items-center justify-center gap-2 transition-all duration-500 ${
              active
                ? "border-2 border-primary shadow-xl -translate-y-1 scale-105"
                : reached
                ? "border border-primary/40"
                : "border border-border"
            }`}
          >
            <span
              className={`font-heading font-bold text-xs tracking-widest transition-colors duration-300 ${
                reached ? "text-primary" : "text-muted-foreground"
              }`}
            >
              {step.number}
            </span>
            <step.Icon
              className={`w-9 h-9 transition-colors duration-300 ${
                reached ? "text-primary" : "text-muted-foreground"
              }`}
              strokeWidth={1.75}
            />
          </div>
        </div>

        <h3
          className={`font-heading font-bold text-lg mt-6 mb-3 transition-colors duration-300 ${
            active ? "text-primary" : "text-foreground"
          }`}
        >
          {step.title}
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed max-w-[18rem]">
          {step.description}
        </p>

        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="mt-4 text-primary hover:text-primary hover:bg-primary/10 font-heading font-medium group/btn"
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
    );
  };

  return (
    <section
      ref={(node) => {
        sectionRef.current = node;
        (visibilityRef as React.MutableRefObject<HTMLElement | null>).current = node;
      }}
      id="proceso"
      className={`relative py-20 md:py-28 overflow-hidden transition-all duration-700 ${
        sectionVisible ? "opacity-100 translate-y-0 is-visible" : "opacity-0 translate-y-8"
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
            <span className="text-foreground font-semibold">
              estrategia, implementación y mejora continua
            </span>
            , reduciendo riesgos y acelerando resultados.
          </p>
        </div>

        {/* Desktop horizontal flow */}
        <div className="hidden lg:grid grid-cols-7 gap-2 items-start">
          {steps.map((step, i) => {
            const fill = segmentFill(i);
            const arrowActive = fill > 0.85;
            return (
              <div key={step.number} className="contents">
                <div className="col-span-1">
                  <StepCard step={step} index={i} />
                </div>
                {i < steps.length - 1 && (
                  <div className="col-span-1 flex items-center justify-center pt-[3.5rem] -mt-1">
                    <div className="relative flex items-center w-full">
                      {/* Track */}
                      <div className="absolute inset-x-0 h-px bg-border" />
                      {/* Fill */}
                      <div
                        className="relative h-px bg-gradient-to-r from-primary/60 to-primary origin-left transition-transform duration-300 ease-out flex-1"
                        style={{ transform: `scaleX(${fill})` }}
                      />
                      <ArrowRight
                        className="w-5 h-5 -ml-2 transition-all duration-300"
                        strokeWidth={2.25}
                        style={{
                          opacity: 0.3 + 0.7 * fill,
                          color: arrowActive
                            ? "hsl(var(--primary))"
                            : "hsl(var(--muted-foreground))",
                          transform: `translateX(${(1 - fill) * -6}px)`,
                        }}
                      />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Mobile / tablet vertical flow */}
        <div className="lg:hidden flex flex-col items-center gap-2">
          {steps.map((step, i) => {
            const fill = segmentFill(i);
            const arrowActive = fill > 0.85;
            return (
              <div key={step.number} className="w-full flex flex-col items-center">
                <StepCard step={step} index={i} />
                {i < steps.length - 1 && (
                  <div className="relative flex flex-col items-center my-6">
                    {/* Track */}
                    <div className="absolute top-0 bottom-0 w-px bg-border" />
                    {/* Fill */}
                    <div
                      className="w-px bg-gradient-to-b from-primary/60 to-primary origin-top transition-transform duration-300 ease-out"
                      style={{
                        height: "3.5rem",
                        transform: `scaleY(${fill})`,
                      }}
                    />
                    <ArrowDown
                      className="w-5 h-5 -mt-1 transition-all duration-300"
                      strokeWidth={2.25}
                      style={{
                        opacity: 0.3 + 0.7 * fill,
                        color: arrowActive
                          ? "hsl(var(--primary))"
                          : "hsl(var(--muted-foreground))",
                      }}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
