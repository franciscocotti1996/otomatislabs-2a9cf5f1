import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/i18n/LanguageContext";

const LinkedInIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.125 2.062 2.062 0 0 1 0 4.125zM7.119 20.452H3.554V9h3.565v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

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
          <div className="inline-flex items-center justify-center mb-6 text-[#0077b5]">
            <LinkedInIcon className="w-14 h-14 md:w-20 md:h-20" />
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
              <LinkedInIcon className="w-5 h-5 shrink-0" />
              <span>{t.linkedin.cta}</span>
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default LinkedInSection;
