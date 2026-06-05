import logoHorizontal from "@/assets/logo-horizontal.png";
import { useLanguage } from "@/i18n/LanguageContext";

const Footer = () => {
  const { t } = useLanguage();
  return (
    <footer className="py-10 bg-gradient-hero">
      <div className="container flex flex-col md:flex-row items-center justify-between gap-6">
        <img src={logoHorizontal} alt="Otomatis Labs" className="h-8" />
        <p className="text-sm text-primary-foreground/70">
          © {new Date().getFullYear()} Otomatis Labs. {t.footer.rights}
        </p>
        <div className="flex items-center gap-6">
          <a href="#servicios" className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">{t.footer.services}</a>
          <a href="#proceso" className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">{t.footer.process}</a>
          <a href="#contacto" className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">{t.footer.contact}</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
