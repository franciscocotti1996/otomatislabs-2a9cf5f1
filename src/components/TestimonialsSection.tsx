import { Quote } from "lucide-react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import testimonial1 from "@/assets/testimonial-1.jpg";
import testimonial2 from "@/assets/testimonial-2.jpg";
import testimonial3 from "@/assets/testimonial-3.jpg";

const testimonials = [
  {
    quote: "Otomatis Labs transformó nuestra atención al cliente. En 3 meses redujimos un 40% las consultas repetitivas gracias al chatbot en WhatsApp.",
    name: "Carlos Méndez",
    role: "Director de Operaciones",
    company: "FinServ Latam",
    image: testimonial1,
  },
  {
    quote: "El equipo entendió nuestro negocio desde el día uno. La implementación fue rápida y los resultados superaron nuestras expectativas.",
    name: "María José Rivera",
    role: "Head of Customer Experience",
    company: "RetailMax",
    image: testimonial2,
  },
  {
    quote: "Los agentes de IA que desarrollaron automatizan procesos que antes tomaban horas. Es un cambio real en nuestra productividad.",
    name: "Andrés Gutiérrez",
    role: "CTO",
    company: "LogiTech Solutions",
    image: testimonial3,
  },
];

const TestimonialsSection = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section
      ref={ref}
      className={`py-20 md:py-28 bg-gradient-hero transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0 is-visible" : "opacity-0 translate-y-8"}`}
    >
      <div className="container">
        <div className="text-center mb-14">
          <p className="text-teal-light font-semibold text-sm tracking-wide uppercase mb-3 font-heading">
            Testimonios
          </p>
          <h2 className="font-heading font-bold text-3xl md:text-4xl max-w-2xl mx-auto text-primary-foreground">
            Lo que dicen nuestros clientes
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="rounded-xl p-7 bg-primary-foreground/5 border border-primary-foreground/10 backdrop-blur-md flex flex-col"
            >
              <Quote className="w-8 h-8 text-teal-light/40 mb-4" />
              <p className="text-sm text-primary-foreground/80 leading-relaxed flex-1 mb-6">
                "{t.quote}"
              </p>
              <div className="flex items-center gap-3">
                <img
                  src={t.image}
                  alt={t.name}
                  width={512}
                  height={512}
                  loading="lazy"
                  className="w-11 h-11 rounded-full object-cover"
                />
                <div>
                  <p className="text-sm font-semibold text-primary-foreground">{t.name}</p>
                  <p className="text-xs text-primary-foreground/60">
                    {t.role}, {t.company}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
