import { useState } from "react";
import { Send, Loader2 } from "lucide-react";
import { z } from "zod";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, { message: "Ingresá tu nombre" })
    .max(100, { message: "Máximo 100 caracteres" }),
  company: z
    .string()
    .trim()
    .min(2, { message: "Ingresá tu empresa" })
    .max(120, { message: "Máximo 120 caracteres" }),
  comments: z
    .string()
    .trim()
    .min(5, { message: "Contanos un poco más" })
    .max(1000, { message: "Máximo 1000 caracteres" }),
});

type ContactValues = z.infer<typeof contactSchema>;

const CTASection = () => {
  const { ref, isVisible } = useScrollAnimation();
  const [values, setValues] = useState<ContactValues>({ name: "", company: "", comments: "" });
  const [errors, setErrors] = useState<Partial<Record<keyof ContactValues, string>>>({});
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (field: keyof ContactValues) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setValues((v) => ({ ...v, [field]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
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
    try {
      const { error } = await supabase.functions.invoke("send-contact-email", {
        body: parsed.data,
      });
      if (error) throw error;
      toast({
        title: "¡Mensaje enviado!",
        description: "Te respondemos a la brevedad.",
      });
      setValues({ name: "", company: "", comments: "" });
    } catch (err) {
      console.error(err);
      toast({
        title: "No pudimos enviar tu mensaje",
        description: "Por favor intentá nuevamente en unos minutos.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
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
                ¿Listo para automatizar tu negocio?
              </h2>
              <p className="text-primary-foreground/70 max-w-lg leading-relaxed">
                Contanos sobre tu proyecto y nuestro equipo se pondrá en contacto a la brevedad
                para conversar cómo los chatbots y agentes de IA pueden transformar la relación
                con tus clientes.
              </p>
            </div>

            <form
              onSubmit={handleSubmit}
              noValidate
              className="bg-background/95 backdrop-blur rounded-xl p-6 md:p-8 space-y-4 shadow-xl"
            >
              <div className="space-y-2">
                <Label htmlFor="contact-name" className="font-heading">
                  Nombre
                </Label>
                <Input
                  id="contact-name"
                  name="name"
                  autoComplete="name"
                  value={values.name}
                  onChange={handleChange("name")}
                  maxLength={100}
                  aria-invalid={!!errors.name}
                  placeholder="Tu nombre"
                />
                {errors.name && (
                  <p className="text-sm text-destructive">{errors.name}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="contact-company" className="font-heading">
                  Empresa
                </Label>
                <Input
                  id="contact-company"
                  name="company"
                  autoComplete="organization"
                  value={values.company}
                  onChange={handleChange("company")}
                  maxLength={120}
                  aria-invalid={!!errors.company}
                  placeholder="Nombre de tu empresa"
                />
                {errors.company && (
                  <p className="text-sm text-destructive">{errors.company}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="contact-comments" className="font-heading">
                  Comentarios
                </Label>
                <Textarea
                  id="contact-comments"
                  name="comments"
                  value={values.comments}
                  onChange={handleChange("comments")}
                  maxLength={1000}
                  rows={5}
                  aria-invalid={!!errors.comments}
                  placeholder="Contanos brevemente qué necesitás"
                />
                {errors.comments && (
                  <p className="text-sm text-destructive">{errors.comments}</p>
                )}
              </div>

              <Button
                type="submit"
                size="lg"
                disabled={submitting}
                className="w-full font-heading font-semibold"
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" /> Enviando...
                  </>
                ) : (
                  <>
                    Enviar mensaje <Send className="w-4 h-4" />
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
