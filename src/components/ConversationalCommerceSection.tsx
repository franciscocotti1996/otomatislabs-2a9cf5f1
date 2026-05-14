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
  MessageCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const WHATSAPP_URL =
  "https://wa.me/5491100000000?text=Hola%2C%20quiero%20hablar%20sobre%20conversational%20commerce";

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
    cta: "Activar mi canal",
  },
  {
    title: "Mensajería y publicidad",
    description: "Click-to-chat, plantillas y campañas pagas integradas.",
    Icon: MessageSquare,
    cta: "Lanzar mi campaña",
  },
  {
    title: "Medición e integración",
    description: "Eventos, CRM y stack de datos conectados end-to-end.",
    Icon: BarChart3,
    cta: "Integrar mi stack",
  },
  {
    title: "Estacionalidad y eventos",
    description: "Picos de demanda y lanzamientos orquestados sin fricción.",
    Icon: CalendarRange,
    cta: "Planear mi evento",
  },
  {
    title: "Modelo de atribución",
    description: "Visibilidad real del aporte del canal al revenue.",
    Icon: Target,
    cta: "Medir mi revenue",
  },
];

const ConversationalCommerceSection = () => {
  const { ref, isVisible } = useScrollAnimation(0.1);

  return (
    <section
      ref={ref}
      id="conversational-commerce"
      className={`relative py-16 sm:py-20 md:py-28 lg:py-32 overflow-hidden transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0 is-visible" : "opacity-0 translate-y-8"
      }`}
    >
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background via-muted/30 to-background" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 h-64 sm:h-80 w-[60rem] max-w-full rounded-full bg-primary/10 blur-3xl" />

      <div className="container px-4 sm:px-6">
        <div className="text-center mb-12 sm:mb-16 md:mb-20 max-w-3xl mx-auto">
          <p className="text-primary font-semibold text-xs sm:text-sm tracking-[0.2em] uppercase mb-3 sm:mb-4 font-heading">
            Conversational Commerce
          </p>
          <h2 className="font-heading font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-[1.1] tracking-tight">
            El ciclo del usuario es{" "}
            <span className="text-gradient">conversacional</span>
          </h2>
          <p className="mt-4 sm:mt-6 text-muted-foreground text-base sm:text-lg md:text-xl leading-relaxed">
            Unificamos{" "}
            <span className="text-foreground font-semibold">
              marketing, ventas y atención
            </span>{" "}
            en un único canal: del primer mensaje a la recompra, sin saltos
            entre apps ni equipos.
          </p>
        </div>

        {/* Cycle: Marketing → Commerce → Care */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr_auto_1fr] gap-x-4 gap-y-5 sm:gap-y-6 items-stretch max-w-5xl mx-auto">
          {cycle.map((step, i) => (
            <Fragment key={step.title}>
              <div className="group relative rounded-2xl sm:rounded-3xl border border-primary/20 bg-card p-5 sm:p-6 md:p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-primary/40">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-primary/10 flex items-center justify-center mb-4 sm:mb-5">
                  <step.Icon className="w-6 h-6 sm:w-7 sm:h-7 text-primary" strokeWidth={1.75} />
                </div>
                <h3 className="font-heading font-bold text-lg sm:text-xl mb-1.5 sm:mb-2 text-foreground">
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
        <div className="mt-16 sm:mt-20 md:mt-28 lg:mt-32">
          <div className="text-center mb-10 sm:mb-12 md:mb-14 max-w-2xl mx-auto">
            <h3 className="font-heading font-bold text-2xl sm:text-3xl md:text-4xl leading-tight tracking-tight">
              Aspectos a desarrollar para usar{" "}
              <span className="text-gradient">WhatsApp como canal de ventas</span>
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 sm:gap-5 md:gap-6">
            {aspects.map((a) => (
              <div
                key={a.title}
                className="group flex flex-col rounded-2xl border border-border bg-card p-5 sm:p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-primary/40"
              >
                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 sm:mb-5">
                  <a.Icon className="w-5 h-5 text-primary" strokeWidth={1.75} />
                </div>
                <h4 className="font-heading font-semibold text-base mb-1.5 sm:mb-2 text-foreground leading-snug">
                  {a.title}
                </h4>
                <p className="text-[13px] sm:text-sm text-muted-foreground leading-relaxed flex-1">
                  {a.description}
                </p>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${a.cta} por WhatsApp`}
                  className="mt-4 sm:mt-5 inline-flex items-center justify-center gap-1.5 rounded-full border border-primary/30 bg-primary/5 px-3.5 py-2 text-xs font-heading font-semibold text-primary transition-colors hover:bg-primary hover:text-primary-foreground hover:border-primary"
                >
                  <MessageCircle className="w-3.5 h-3.5" strokeWidth={2.25} />
                  {a.cta}
                </a>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 sm:mt-14 md:mt-16 flex justify-center">
          <Button
            asChild
            size="lg"
            className="font-heading font-semibold rounded-full w-full sm:w-auto"
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
