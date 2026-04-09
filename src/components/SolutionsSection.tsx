import { Bot, Globe, Smartphone, Cpu, Workflow, HeadphonesIcon } from "lucide-react";

const solutions = [
  {
    icon: Bot,
    title: "Chatbots Inteligentes",
    description: "Chatbots con IA que entienden el contexto, resuelven consultas y escalan cuando es necesario.",
  },
  {
    icon: Globe,
    title: "Integración Multicanal",
    description: "WhatsApp, Web, Instagram, Messenger y más. Una experiencia consistente en todos los canales.",
  },
  {
    icon: Cpu,
    title: "Agentes de IA Autónomos",
    description: "Agentes inteligentes que ejecutan tareas complejas de negocio de forma autónoma y eficiente.",
  },
  {
    icon: Workflow,
    title: "Automatización de Procesos",
    description: "Automatizamos flujos de atención, ventas y soporte para reducir costos y tiempos de respuesta.",
  },
  {
    icon: Smartphone,
    title: "Comercio Conversacional",
    description: "Lleva toda la experiencia de compra a canales de mensajería con catálogo, carrito y pago integrado.",
  },
  {
    icon: HeadphonesIcon,
    title: "Atención al Cliente IA",
    description: "Soluciones de atención 24/7 que mejoran la satisfacción y reducen la carga operativa.",
  },
];

const SolutionsSection = () => {
  return (
    <section id="servicios" className="py-20 md:py-28 bg-muted/50">
      <div className="container">
        <div className="text-center mb-14">
          <p className="text-primary font-semibold text-sm tracking-wide uppercase mb-3 font-heading">
            Soluciones
          </p>
          <h2 className="font-heading font-bold text-3xl md:text-4xl max-w-2xl mx-auto">
            Soluciones que transforman la interacción con tus clientes
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {solutions.map((solution) => (
            <div
              key={solution.title}
              className="glass-card rounded-xl p-7 hover:shadow-xl transition-shadow group"
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
                <solution.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-heading font-semibold text-lg mb-3">{solution.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{solution.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SolutionsSection;
