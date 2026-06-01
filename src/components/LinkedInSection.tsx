import { Linkedin } from "lucide-react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { Button } from "@/components/ui/button";

const LinkedInSection = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section
      ref={ref}
      className={`py-20 md:py-28 bg-muted transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0 is-visible" : "opacity-0 translate-y-8"
      }`}
    >
      <div className="container">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#0077b5]/10 mb-6">
            <Linkedin className="w-8 h-8 text-[#0077b5]" />
          </div>

          <h2 className="font-heading font-bold text-3xl md:text-4xl text-foreground mb-4">
            Conectemos en LinkedIn
          </h2>

          <p className="text-muted-foreground max-w-xl mx-auto leading-relaxed mb-8">
            Seguinos en LinkedIn para enterarte de las últimas novedades sobre
            chatbots, agentes de IA y transformación digital.
          </p>

          <Button
            asChild
            size="lg"
            className="bg-[#0077b5] hover:bg-[#005f90] text-white font-heading font-semibold px-8"
          >
            <a
              href="https://www.linkedin.com/company/otomatis-labs"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Linkedin className="w-5 h-5 mr-2" />
              Visitar LinkedIn
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default LinkedInSection;
