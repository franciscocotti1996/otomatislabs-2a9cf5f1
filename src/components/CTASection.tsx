import { useState } from "react";
import { Send, Loader2 } from "lucide-react";
import { z } from "zod";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useLanguage } from "@/i18n/LanguageContext";
import { toast } from "sonner";

type ContactValues = { name: string; company: string; comments: string };

const WHATSAPP_NUMBER = "5491134213579";

const CTASection = () => {
  const { ref, isVisible } = useScrollAnimation();
  const { t } = useLanguage();
  const contactSchema = z.object({
    name: z.string().trim().min(2, { message: t.cta.err.name }).max(100, { message: t.cta.err.nameMax }),
    company: z.string().trim().min(2, { message: t.cta.err.company }).max(120, { message: t.cta.err.companyMax }),
    comments: z.string().trim().min(5, { message: t.cta.err.comments }).max(1000, { message: t.cta.err.commentsMax }),
  });
  const [values, setValues] = useState<ContactValues>({ name: "", company: "", comments: "" });
  const [errors, setErrors] = useState<Partial<Record<keyof ContactValues, string>>>({});
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (field: keyof ContactValues) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setValues((v) => ({ ...v, [field]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = contactSchema.safeParse(values);
    if (!parsed.success) {
      const fieldErrors: Partial<Record<keyof ContactValues, string>> = {};
      parsed.error.issues.forEach((issue) => {
        const key = issue.path[0] as keyof ContactValues;
        if (!fieldErrors[key]) fieldErrors[key] = issue.message;
      });
      setErrors(fieldErrors);
      return;
    }
    setErrors({});
    setSubmitting(true);
    const { name, company, comments } = parsed.data;
    const message =
      `${t.cta.waGreeting}\n\n` +
      `${t.cta.waIntro}\n\n` +
      `• ${t.cta.name}: ${name}\n` +
      `• ${t.cta.company}: ${company}\n` +
      `• ${t.cta.comments}: ${comments}\n\n` +
      `${t.cta.waClosing}`;
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    toast.success(t.cta.successTitle, { description: t.cta.waRedirect });
    setTimeout(() => {
      window.open(url, "_blank", "noopener,noreferrer");
      setSubmitting(false);
    }, 600);
  };

  return (
    <section
      ref={ref}
      id="contacto"
      className={`py-20 md:py-28 transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0 is-visible" : "opacity-0 translate-y-8"
      }`}
    >
      <div className="container">
        <div className="bg-gradient-hero rounded-2xl overflow-hidden relative">
          <div className="absolute top-0 left-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 p-8 md:p-12 lg:p-16 relative z-10">
            <div>
              <h2 className="font-heading font-bold text-3xl md:text-4xl text-primary-foreground mb-4">
                {t.cta.title}
              </h2>
              <p className="text-primary-foreground/70 max-w-lg leading-relaxed">
                {t.cta.sub}
              </p>
            </div>

            <form
              onSubmit={handleSubmit}
              noValidate
              className="bg-background/95 backdrop-blur rounded-xl p-6 md:p-8 space-y-4 shadow-xl"
            >
              <div className="space-y-2">
                <Label htmlFor="contact-name" className="font-heading">
                  {t.cta.name}
                </Label>
                <Input
                  id="contact-name"
                  name="name"
                  autoComplete="name"
                  value={values.name}
                  onChange={handleChange("name")}
                  maxLength={100}
                  aria-invalid={!!errors.name}
                  placeholder={t.cta.namePh}
                />
                {errors.name && (
                  <p className="text-sm text-destructive">{errors.name}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="contact-company" className="font-heading">
                  {t.cta.company}
                </Label>
                <Input
                  id="contact-company"
                  name="company"
                  autoComplete="organization"
                  value={values.company}
                  onChange={handleChange("company")}
                  maxLength={120}
                  aria-invalid={!!errors.company}
                  placeholder={t.cta.companyPh}
                />
                {errors.company && (
                  <p className="text-sm text-destructive">{errors.company}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="contact-comments" className="font-heading">
                  {t.cta.comments}
                </Label>
                <Textarea
                  id="contact-comments"
                  name="comments"
                  value={values.comments}
                  onChange={handleChange("comments")}
                  maxLength={1000}
                  rows={5}
                  aria-invalid={!!errors.comments}
                  placeholder={t.cta.commentsPh}
                />
                {errors.comments && (
                  <p className="text-sm text-destructive">{errors.comments}</p>
                )}
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full font-heading font-semibold"
                disabled={submitting}
                aria-busy={submitting}
              >
                {submitting ? (
                  <>
                    {t.cta.sending} <Loader2 className="w-4 h-4 animate-spin" />
                  </>
                ) : (
                  <>
                    {t.cta.send} <Send className="w-4 h-4" />
                  </>
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
