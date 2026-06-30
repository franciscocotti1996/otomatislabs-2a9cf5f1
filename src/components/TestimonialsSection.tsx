import { Quote } from "lucide-react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { useLanguage } from "@/i18n/LanguageContext";
import testimonial1 from "@/assets/testimonial-1.jpg";
import testimonial2 from "@/assets/testimonial-2.jpg";
import testimonial3 from "@/assets/testimonial-3.jpg";

const IMAGES = [testimonial1, testimonial2, testimonial3];

const TestimonialsSection = () => {
  const { ref, isVisible } = useScrollAnimation();
  const { t } = useLanguage();
  const testimonials = t.testimonials.items.map((item, i) => ({ ...item, image: IMAGES[i] }));

  return (
    <section
      ref={ref}
      className={`py-20 md:py-28 bg-gradient-hero transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0 is-visible" : "opacity-0 translate-y-8"}`}
    >
      <div className="container">
        <div className="text-center mb-14">
          <p className="text-teal-light font-semibold text-sm tracking-wide uppercase mb-3 font-heading">
            {t.testimonials.eyebrow}
          </p>
          <h2 className="font-heading font-bold text-3xl md:text-4xl max-w-2xl mx-auto text-primary-foreground">
            {t.testimonials.title}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((item) => (
            <div
              key={item.name}
              className="rounded-xl p-7 bg-primary-foreground/5 border border-primary-foreground/10 backdrop-blur-md flex flex-col"
            >
              <Quote className="w-8 h-8 text-teal-light/40 mb-4" />
              <p className="text-sm text-primary-foreground/80 leading-relaxed flex-1 mb-6">
                "{item.quote}"
              </p>
              <div className="flex items-center gap-3">
                <img
                  src={item.image}
                  alt={item.name}
                  width={512}
                  height={512}
                  loading="lazy"
                  className="w-11 h-11 rounded-full object-cover"
                />
                <div>
                  <p className="text-sm font-semibold text-primary-foreground">{item.name}</p>
                  <p className="text-xs text-primary-foreground/60">
                    {item.role}, {item.company}
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
