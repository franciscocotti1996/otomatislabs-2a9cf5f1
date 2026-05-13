import { Fragment } from "react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import {
  Megaphone,
  ShoppingBag,
  HeartHandshake,
  ArrowRight,
  Layers,
  MessageSquare,
  BarChart3,
  CalendarRange,
  Target,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const cycle = [
  {
    title: "Marketing",
    description:
      "Campañas y captación que inician la conversación en el canal correcto.",
    Icon: Megaphone,
  },
  {
    title: "Commerce",
    description:
      "Catálogo, asesoramiento con IA, carrito y pago dentro del mismo chat.",
    Icon: ShoppingBag,
  },
  {
    title: "Care",
    description:
      "Postventa, soporte y fidelización en un solo hilo conversacional.",
    Icon: HeartHandshake,
  },
];

const aspects = [
  {
    title: "Funcionalidades del canal",
    description: "Capacidades nativas de WhatsApp aplicadas a ventas.",
    Icon: Layers,
  },
  {
    title: "Mensajería y publicidad",
    description: "Click-to-chat, plantillas y campañas pagas integradas.",
    Icon: MessageSquare,
  },
  {
    title: "Medición e integración",
    description: "Eventos, CRM y stack de datos conectados end-to-end.",
    Icon: BarChart3,
  },
  {
    title: "Estacionalidad y eventos",
    description: "Picos de demanda y lanzamientos orquestados sin fricción.",
    Icon: CalendarRange,
  },
  {
    title: "Modelo de atribución",
    description: "Visibilidad real del aporte del canal al revenue.",
    Icon: Target,
  },
];

const ConversationalCommerceSection = () => {
  const { ref, isVisible } = useScrollAnimation(0.1);

  return (
    <section
      ref={ref}
      id="conversational-commerce"
      className={`relative py-20 md:py-28 overflow-hidden transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0 is-visible" : "opacity-0 translate-y-8"
      }`}
    >
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background via-muted/30 to-background" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 h-80 w-[60rem] max-w-full rounded-full bg-primary/10 blur-3xl" />

      <div className="container">
        <div className="text-center mb-14 md:mb-16 max-w-3xl mx-auto">
          <p className="text-primary font-semibold text-sm tracking-wide uppercase mb-3 font-heading">
            Conversational Commerce
          </p>
          <h2 className="font-heading font-bold text-3xl md:text-5xl leading-tight">
            El ciclo del usuario es{" "}
            <span className="text-gradient">conversacional</span>
          </h2>
          <p className="mt-5 text-muted-foreground text-base md:text-lg">
            Unificamos{" "}
            <span className="text-foreground font-semibold">
              marketing, ventas y atención
            </span>{" "}
            en un único canal: del primer mensaje a la recompra, sin saltos
            entre apps ni equipos.
          </p>
        </div>

        {/* Cycle: Marketing → Commerce → Care */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr_auto_1fr] gap-x-3 gap-y-8 items-stretch max-w-5xl mx-auto">
          {cycle.map((step, i) => (
            <Fragment key={step.title}>
              <div className="group relative rounded-3xl border border-primary/20 bg-card p-6 md:p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-primary/40">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-5">
                  <step.Icon className="w-7 h-7 text-primary" strokeWidth={1.75} />
                </div>
                <h3 className="font-heading font-bold text-xl mb-2 text-foreground">
                  {step.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>

              {i < cycle.length - 1 && (
                <div className="hidden lg:flex items-center justify-center">
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

        {/* Aspects */}
        <div className="mt-20 md:mt-24">
          <div className="text-center mb-10 md:mb-12 max-w-2xl mx-auto">
            <h3 className="font-heading font-bold text-2xl md:text-3xl leading-tight">
              Aspectos a desarrollar para usar{" "}
              <span className="text-gradient">WhatsApp como canal de ventas</span>
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 md:gap-5">
            {aspects.map((a) => (
              <div
                key={a.title}
                className="group rounded-2xl border border-border bg-card p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:border-primary/40"
              >
                <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <a.Icon className="w-5 h-5 text-primary" strokeWidth={1.75} />
                </div>
                <h4 className="font-heading font-semibold text-base mb-1.5 text-foreground">
                  {a.title}
                </h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {a.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 flex justify-center">
          <Button
            asChild
            size="lg"
            className="font-heading font-semibold rounded-full"
          >
            <a href="#contacto">
              Hablemos de tu caso
              <ArrowRight className="ml-1.5 w-4 h-4" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ConversationalCommerceSection;
