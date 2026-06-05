import { useState } from "react";
import { ShoppingCart, HeadphonesIcon, CalendarCheck, CreditCard, UserPlus, Truck, Check, Zap, AlertTriangle } from "lucide-react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { useLanguage } from "@/i18n/LanguageContext";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const USE_CASE_ICONS = [ShoppingCart, HeadphonesIcon, CalendarCheck, CreditCard, UserPlus, Truck];

const UseCasesSection = () => {
  const { ref, isVisible } = useScrollAnimation();
  const { t } = useLanguage();
  const useCases = t.useCases.items.map((it, i) => ({ ...it, icon: USE_CASE_ICONS[i] }));
  type UseCase = (typeof useCases)[number];
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
            {t.useCases.eyebrow}
          </p>
          <h2 className="font-heading font-bold text-3xl md:text-4xl max-w-2xl mx-auto text-primary-foreground">
            {t.useCases.title}
          </h2>
          <p className="text-primary-foreground/70 max-w-2xl mx-auto mt-4 text-base md:text-lg">
            {t.useCases.sub}
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
                {t.useCases.seeMore}
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
              </DialogHeader>

              <div className="space-y-5 mt-2">
                <div>
                  <h4 className="font-heading font-semibold text-sm uppercase tracking-wide text-foreground mb-2 flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-500" />
                    {t.useCases.problem}
                  </h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">{selected.problem}</p>
                </div>

                <div>
                  <h4 className="font-heading font-semibold text-sm uppercase tracking-wide text-foreground mb-2 flex items-center gap-2">
                    <Zap className="w-4 h-4 text-primary" />
                    {t.useCases.solution}
                  </h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">{selected.solution}</p>
                </div>

                <div>
                  <h4 className="font-heading font-semibold text-sm uppercase tracking-wide text-foreground mb-3 flex items-center gap-2">
                    <Check className="w-4 h-4 text-primary" />
                    {t.useCases.benefits}
                  </h4>
                  <ul className="space-y-2">
                    {selected.benefitsList.map((b) => (
                      <li key={b} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-heading font-semibold text-sm uppercase tracking-wide text-foreground mb-3">
                    {t.useCases.realCases}
                  </h4>
                  <ul className="space-y-2">
                    {selected.examples.map((ex) => (
                      <li key={ex} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                        <span>{ex}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-heading font-semibold text-sm uppercase tracking-wide text-foreground mb-3">
                    {t.useCases.integrations}
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
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default UseCasesSection;