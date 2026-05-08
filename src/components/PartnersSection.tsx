import { useState } from "react";
import { ShieldCheck, MessageCircle, Bot } from "lucide-react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import metaLogo from "@/assets/logos/meta.png";
import botmakerLogo from "@/assets/logos/botmaker.png";

type Partner = {
  name: string;
  tag: string;
  src?: string;
  Icon: React.ComponentType<{ className?: string }>;
};

const partners: Partner[] = [
  { name: "Meta", tag: "WhatsApp Business Partner", src: metaLogo, Icon: MessageCircle },
  { name: "Botmaker", tag: "Official Partner", src: botmakerLogo, Icon: Bot },
];

const PartnerCard = ({ partner }: { partner: Partner }) => {
  const [errored, setErrored] = useState(false);
  const { Icon } = partner;
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-border/60 bg-card/50 backdrop-blur px-6 py-4 hover:border-primary/40 hover:shadow-lg transition-all">
      {partner.src && !errored ? (
        <img
          src={partner.src}
          alt={partner.name}
          onError={() => setErrored(true)}
          className="h-10 w-auto object-contain"
          loading="lazy"
        />
      ) : (
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <Icon className="h-6 w-6" />
        </div>
      )}
      <div className="text-left">
        <p className="font-heading font-bold text-base leading-tight">{partner.name}</p>
        <p className="text-xs text-muted-foreground">{partner.tag}</p>
      </div>
    </div>
  );
};

const PartnersSection = () => {
  const { ref, isVisible } = useScrollAnimation();
  return (
    <section
      ref={ref}
      className={`py-16 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
    >
      <div className="container">
        <div className="flex flex-col items-center text-center gap-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-xs font-medium text-primary">
            <ShieldCheck className="h-4 w-4" />
            Partners oficiales
          </div>
          <h2 className="font-heading text-2xl md:text-3xl font-bold max-w-2xl">
            Somos partners oficiales de las plataformas líderes en mensajería y automatización
          </h2>
          <div className="flex flex-wrap justify-center gap-4 mt-4">
            {partners.map((p) => (
              <PartnerCard key={p.name} partner={p} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;