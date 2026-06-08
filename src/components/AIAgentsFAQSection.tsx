import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { useLanguage } from "@/i18n/LanguageContext";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
  e.preventDefault();
  const id = href.replace(/^#/, "");
  const el = document.getElementById(id);
  if (el) {
    const offset = 120;
    const top = el.getBoundingClientRect().top + window.scrollY - offset;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top, behavior: reduced ? "auto" : "smooth" });
  }
};

const AnswerWithLinks = ({ answer, links }: { answer: string; links?: Array<{ text: string; href: string }> }) => {
  if (!links || links.length === 0) {
    return <>{answer}</>;
  }

  const parts: React.ReactNode[] = [];
  let remaining = answer;
  let key = 0;

  links.forEach((link, index) => {
    const placeholder = `{${index}}`;
    const pos = remaining.indexOf(placeholder);
    if (pos === -1) return;

    if (pos > 0) {
      parts.push(<span key={`text-${key++}`}>{remaining.slice(0, pos)}</span>);
    }

    parts.push(
      <a
        key={`link-${key++}`}
        href={link.href}
        onClick={(e) => scrollToSection(e, link.href)}
        className="text-primary underline underline-offset-2 hover:text-primary/80 font-medium"
      >
        {link.text}
      </a>
    );

    remaining = remaining.slice(pos + placeholder.length);
  });

  if (remaining) {
    parts.push(<span key={`text-end-${key++}`}>{remaining}</span>);
  }

  return <>{parts}</>;
};

const AIAgentsFAQSection = () => {
  const { ref, isVisible } = useScrollAnimation();
  const { t } = useLanguage();
  const faqs = t.aiAgentsFaq.items;

  return (
    <section
      ref={ref}
      id="agentes-ia-faq"
      className={`py-16 md:py-24 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0 is-visible" : "opacity-0 translate-y-8"}`}
    >
      <div className="container max-w-3xl">
        <div className="text-center mb-12">
          <p className="text-primary font-semibold text-sm tracking-wide uppercase mb-3 font-heading">
            {t.aiAgentsFaq.eyebrow}
          </p>
          <h2 className="font-heading font-bold text-3xl md:text-4xl">
            {t.aiAgentsFaq.title}
          </h2>
        </div>

        <Accordion type="single" collapsible className="space-y-3">
          {faqs.map((faq, i) => (
            <AccordionItem
              key={i}
              value={`ai-faq-${i}`}
              className="glass-card rounded-xl px-6 border-none"
            >
              <AccordionTrigger className="text-left font-heading font-semibold text-sm md:text-base hover:no-underline py-5">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground leading-relaxed pb-5">
                <AnswerWithLinks answer={faq.answer} links={"links" in faq ? (faq as any).links : undefined} />
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default AIAgentsFAQSection;
