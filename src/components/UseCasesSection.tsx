import { ShoppingCart, HeadphonesIcon, CalendarCheck, CreditCard, UserPlus, Truck } from "lucide-react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

const useCases = [
  {
    icon: ShoppingCart,
    title: "Ventas conversacionales",
    description: "Agentes IA que asesoran, recomiendan productos y cierran ventas dentro del chat.",
    benefit: "+30% conversión en WhatsApp",
  },
  {
    icon: HeadphonesIcon,
    title: "Atención al cliente 24/7",
    description: "Resolvemos consultas frecuentes al instante y derivamos solo lo crítico a un humano.",
    benefit: "-40% consultas repetitivas",
  },
  {
    icon: CalendarCheck,
    title: "Gestión de turnos y reservas",
    description: "Reservas, recordatorios y confirmaciones automatizadas desde el canal favorito del cliente.",
    benefit: "-60% ausencias",
  },
  {
    icon: CreditCard,
    title: "Cobranzas inteligentes",
    description: "Recordatorios de pago contextualizados, links de pago y conciliación dentro del chat.",
    benefit: "+25% recupero",
  },
  {
    icon: UserPlus,
    title: "Onboarding y calificación de leads",
    description: "Capturamos, calificamos y nutrimos leads automáticamente antes de pasarlos a ventas.",
    benefit: "Leads listos para vender",
  },
  {
    icon: Truck,
    title: "Logística y postventa",
    description: "Seguimiento de pedidos, gestión de cambios y encuestas de satisfacción sin fricción.",
    benefit: "NPS más alto",
  },
];

const UseCasesSection = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section
      ref={ref}
      id="casos-de-uso"
      className={`py-20 md:py-28 bg-gradient-hero transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0 is-visible" : "opacity-0 translate-y-8"}`}
    >
      <div className="container">
        <div className="text-center mb-14">
          <p className="text-teal-light font-semibold text-sm tracking-wide uppercase mb-3 font-heading">
            Casos de uso
          </p>
          <h2 className="font-heading font-bold text-3xl md:text-4xl max-w-2xl mx-auto text-primary-foreground">
            Agentes IA y chatbots multicanal en acción
          </h2>
          <p className="text-primary-foreground/70 max-w-2xl mx-auto mt-4 text-base md:text-lg">
            Soluciones concretas que automatizan procesos y generan impacto medible en tu negocio.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {useCases.map((useCase) => (
            <div
              key={useCase.title}
              className="rounded-xl p-7 bg-primary-foreground/5 border border-primary-foreground/10 backdrop-blur-md hover:shadow-xl hover:border-teal-light/40 transition-all group flex flex-col"
            >
              <div className="w-12 h-12 rounded-lg bg-teal/20 flex items-center justify-center mb-5 group-hover:bg-teal/30 transition-colors">
                <useCase.icon className="w-6 h-6 text-teal-light" />
              </div>
              <h3 className="font-heading font-semibold text-lg mb-3 text-primary-foreground">
                {useCase.title}
              </h3>
              <p className="text-sm text-primary-foreground/70 leading-relaxed flex-1 mb-5">
                {useCase.description}
              </p>
              <div className="inline-flex items-center self-start text-xs font-semibold text-teal-light bg-teal/10 border border-teal-light/20 rounded-full px-3 py-1">
                {useCase.benefit}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UseCasesSection;