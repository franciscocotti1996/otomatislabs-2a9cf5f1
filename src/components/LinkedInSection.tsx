import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { Button } from "@/components/ui/button";
import linkedinLogo from "@/assets/logo-linkedin.webp.asset.json";
import { useLanguage } from "@/i18n/LanguageContext";

const LinkedInSection = () => {
  const { ref, isVisible } = useScrollAnimation();
  const { t } = useLanguage();

  return (
    <section
      ref={ref}
      className={`py-20 md:py-28 bg-muted transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0 is-visible" : "opacity-0 translate-y-8"
      }`}
    >
      <div className="container">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center justify-center mb-6">
            <img
              src={linkedinLogo.url}
              alt="LinkedIn"
              className="w-14 h-14 md:w-20 md:h-20 object-contain"
            />
          </div>

          <h2 className="font-heading font-bold text-3xl md:text-4xl text-foreground mb-4">
            {t.linkedin.title}
          </h2>

          <p className="text-muted-foreground max-w-xl mx-auto leading-relaxed mb-8">
            {t.linkedin.sub}
          </p>

          <Button
            asChild
            size="lg"
            className="bg-[#0077b5] hover:bg-[#005285] text-white font-heading font-semibold px-8"
          >
            <a
              href="https://www.linkedin.com/company/otomatis-labs/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 leading-none"
            >
              <img
                src={linkedinLogo.url}
                alt=""
                aria-hidden="true"
                className="w-5 h-5 object-contain shrink-0"
              />
              <span>{t.linkedin.cta}</span>
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default LinkedInSection;
