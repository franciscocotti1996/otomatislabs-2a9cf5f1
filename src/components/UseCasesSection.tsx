import { useState } from "react";
import { ShoppingCart, HeadphonesIcon, CalendarCheck, CreditCard, UserPlus, Truck, Check, Zap, AlertTriangle } from "lucide-react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const useCases = [
  {
    icon: ShoppingCart,
    title: "Ventas conversacionales",
    description: "Agentes IA que asesoran, recomiendan productos y cierran ventas dentro del chat.",
    benefit: "+30% conversión en WhatsApp",
    problem:
      "Los clientes abandonan la compra por falta de asesoramiento inmediato. El 70% de los carritos en e-commerce se pierde por dudas sin resolver.",
    solution:
      "Implementamos agentes IA que entienden la intención de compra, recomiendan productos del catálogo en tiempo real y guían todo el proceso de checkout sin que el cliente salga del chat.",
    benefits: [
      "Recomendaciones personalizadas basadas en preferencias del usuario",
      "Carrito y checkout integrado dentro de WhatsApp",
      "Recupero automático de carritos abandonados con seguimiento",
      "Trazabilidad completa de cada venta con métricas en tiempo real",
    ],
    examples: [
      "Tienda de moda: +35% de conversión en campañas de WhatsApp",
      "Supermercado online: checkout conversacional con lista de compras",
      "Electrónica: recomendación cruzada de accesorios por IA",
    ],
    integrations: ["WhatsApp Business API", "Shopify / VTEX / Tiendanube", "Mercado Pago / Stripe", "HubSpot / Salesforce"],
  },
  {
    icon: HeadphonesIcon,
    title: "Atención al cliente 24/7",
    description: "Resolvemos consultas frecuentes al instante y derivamos solo lo crítico a un humano.",
    benefit: "-40% consultas repetitivas",
    problem:
      "El equipo de soporte se satura con preguntas repetitivas sobre horarios, precios y políticas. Los clientes esperan horas por respuestas simples.",
    solution:
      "Desplegamos IA generativa entrenada con tu base de conocimiento para responder al instante. Lo que requiere intervención humana se deriva con todo el contexto al agente correcto.",
    benefits: [
      "Respuesta inmediata 24/7 en todos los canales (WhatsApp, web, Instagram)",
      "Hand-off al humano con historial completo de la conversación",
      "Reducción drástica de tickets repetitivos en el help desk",
      "Mejora continua del bot basada en métricas de satisfacción",
    ],
    examples: [
      "Clínica médica: turnos, prepagas y coberturas resueltos por IA",
      "EdTech: consultas sobre cursos, precios y contenido automatizadas",
      "Gimnasio: horarios, planes y reservas gestionadas sin operador",
    ],
    integrations: ["Zendesk / Freshdesk", "Intercom", "Notion / Confluence (KB)", "Slack / Teams"],
  },
  {
    icon: CalendarCheck,
    title: "Gestión de turnos y reservas",
    description: "Reservas, recordatorios y confirmaciones automatizadas desde el canal favorito del cliente.",
    benefit: "-60% ausencias",
    problem:
      "Las ausencias y cancelaciones de último momento dejan huecos improductivos. Los clientes olvidan sus turnos y no hay sistema de recordatorio efectivo.",
    solution:
      "El cliente reserva, reprograma o cancela su turno en segundos vía chat conversacional. Enviamos recordatorios automáticos con confirmación y sincronizamos con tu calendario en tiempo real.",
    benefits: [
      "Reservas conversacionales sin formularios ni apps adicionales",
      "Recordatorios automáticos con confirmación por parte del cliente",
      "Reprogramación o cancelación en un solo clic desde el chat",
      "Sincronización bidireccional con tu agenda y calendario",
    ],
    examples: [
      "Consultorio médico: reservas 24/7 con recordatorios vía WhatsApp",
      "Estética y spa: agenda completa gestionada por IA",
      "Restaurante: reservas de mesa con confirmación automática",
    ],
    integrations: ["Google Calendar / Outlook", "Calendly", "Sistemas de turnos propios vía API"],
  },
  {
    icon: CreditCard,
    title: "Cobranzas inteligentes",
    description: "Recordatorios de pago contextualizados, links de pago y conciliación dentro del chat.",
    benefit: "+25% recupero",
    problem:
      "Las cobranzas tradicionales generan fricción con el cliente. Los recordatorios genéricos no se personalizan y los links de pago se pierden en el spam.",
    solution:
      "Segmentamos por comportamiento de pago y enviamos recordatorios con el tono adecuado para cada cliente. Generamos links de pago dinámicos y conciliamos automáticamente al confirmar.",
    benefits: [
      "Segmentación inteligente de morosidad por perfil de cliente",
      "Links de pago personalizados con montos y vencimientos",
      "Conciliación automática en el chat al recibir la confirmación",
      "Reportes en tiempo real de recupero y cartera",
    ],
    examples: [
      "Fintech: recupero de préstamos con planes de pago conversacionales",
      "Servicios de suscripción: renovaciones automatizadas con descuentos",
      "Colegios: cobro de cuotas con recordatorios personalizados a padres",
    ],
    integrations: ["Mercado Pago / Stripe / dLocal", "ERP / Core bancario", "Google Sheets / BI"],
  },
  {
    icon: UserPlus,
    title: "Onboarding y calificación de leads",
    description: "Capturamos, calificamos y nutrimos leads automáticamente antes de pasarlos a ventas.",
    benefit: "Leads listos para vender",
    problem:
      "El 80% de los leads que llegan no están calificados. Ventas pierde tiempo en seguimientos fríos y oportunidades reales se escapan por falta de velocidad.",
    solution:
      "Cada lead que entra es recibido por un agente IA que califica con preguntas inteligentes, asigna un score y enriquece el perfil antes de pasarlo al equipo de ventas con todo el contexto.",
    benefits: [
      "Captura multicanal desde web, ads y redes sociales",
      "Calificación BANT/SQL automatizada en la conversación",
      "Asignación inteligente al vendedor según región o producto",
      "Nurturing automático del lead frío con seguimiento programado",
    ],
    examples: [
      "Inmobiliaria: calificación de compradores con presupuesto y zona",
      "Seguros: cotización conversacional con asesoramiento de coberturas",
      "Agencia de viajes: armado de itinerario según preferencias del lead",
    ],
    integrations: ["HubSpot / Salesforce / Pipedrive", "Meta Ads / Google Ads", "Webhooks y APIs propias"],
  },
  {
    icon: Truck,
    title: "Logística y postventa",
    description: "Seguimiento de pedidos, gestión de cambios y encuestas de satisfacción sin fricción.",
    benefit: "NPS más alto",
    problem:
      "Los clientes consultan repetidamente el estado de sus pedidos saturando al equipo. Los cambios y devoluciones son lentos y las encuestas de NPS tienen baja respuesta.",
    solution:
      "Tus clientes consultan el estado de su pedido, gestionan cambios o devoluciones y completan encuestas NPS directamente en el chat, sin esperar a un operador humano.",
    benefits: [
      "Tracking de envíos en tiempo real con respuesta conversacional",
      "Gestión completa de cambios y devoluciones desde el chat",
      "Encuestas NPS automáticas tras la entrega",
      "Detección temprana de incidencias con alertas proactivas",
    ],
    examples: [
      "E-commerce de indumentaria: tracking y cambios vía WhatsApp",
      "Farmacia online: seguimiento de recetas y entregas programadas",
      "Mueblería: coordinación de entrega con reprogramación por chat",
    ],
    integrations: ["ERP / WMS", "Couriers (Andreani, DHL, OCA)", "Typeform / Encuestas propias"],
  },
];

type UseCase = (typeof useCases)[number];

const UseCasesSection = () => {
  const { ref, isVisible } = useScrollAnimation();
  const [selected, setSelected] = useState<UseCase | null>(null);

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
            <button
              key={useCase.title}
              type="button"
              onClick={() => setSelected(useCase)}
              className="text-left rounded-xl p-7 bg-primary-foreground/5 border border-primary-foreground/10 backdrop-blur-md hover:shadow-xl hover:border-teal-light/40 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-light transition-all group flex flex-col"
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
              <span className="mt-4 text-xs font-semibold text-teal-light/80 group-hover:text-teal-light transition-colors">
                Ver detalles →
              </span>
            </button>
          ))}
        </div>
      </div>

      <Dialog open={!!selected} onOpenChange={(open) => !open && setSelected(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          {selected && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-11 h-11 rounded-lg bg-primary/10 flex items-center justify-center">
                    <selected.icon className="w-5 h-5 text-primary" />
                  </div>
                  <span className="inline-flex items-center text-xs font-semibold text-primary bg-primary/10 border border-primary/20 rounded-full px-3 py-1">
                    {selected.benefit}
                  </span>
                </div>
                <DialogTitle className="font-heading text-2xl">{selected.title}</DialogTitle>
                <DialogDescription className="text-base leading-relaxed pt-2">
                  {selected.detail}
                </DialogDescription>
              </DialogHeader>

              <div className="mt-2">
                <h4 className="font-heading font-semibold text-sm uppercase tracking-wide text-foreground mb-3">
                  Beneficios
                </h4>
                <ul className="space-y-2">
                  {selected.benefits.map((b) => (
                    <li key={b} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-4">
                <h4 className="font-heading font-semibold text-sm uppercase tracking-wide text-foreground mb-3 flex items-center gap-2">
                  <Plug className="w-4 h-4 text-primary" />
                  Integraciones de ejemplo
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selected.integrations.map((i) => (
                    <span
                      key={i}
                      className="text-xs font-medium text-foreground bg-muted border border-border rounded-full px-3 py-1"
                    >
                      {i}
                    </span>
                  ))}
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default UseCasesSection;