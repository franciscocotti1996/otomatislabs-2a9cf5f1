import { ArrowRight } from "lucide-react";
import ctaPerson from "@/assets/cta-person.jpg";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

const CTASection = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section ref={ref} id="contacto" className={`py-20 md:py-28 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0 is-visible" : "opacity-0 translate-y-8"}`}>
      <div className="container">
        <div className="bg-gradient-hero rounded-2xl overflow-hidden relative">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Text content */}
            <div className="p-10 md:p-16 relative z-10">
              {/* Decorative elements */}
              <div className="absolute top-0 left-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />

              <div className="relative z-10">
                <h2 className="font-heading font-bold text-3xl md:text-4xl text-primary-foreground mb-4">
                  ¿Listo para automatizar tu negocio?
                </h2>
                <p className="text-primary-foreground/70 max-w-lg mb-8 leading-relaxed">
                  Conversemos sobre cómo los chatbots y agentes de IA pueden transformar la relación con tus clientes.
                </p>
                <a
                  href="mailto:hola@otomatislabs.com"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity"
                >
                  Contactar ahora
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Image */}
            <div className="hidden lg:block relative">
              <img
                src={ctaPerson}
                alt="Profesional trabajando con soluciones de IA"
                width={1280}
                height={720}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover opacity-60"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[hsl(var(--navy))] to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
