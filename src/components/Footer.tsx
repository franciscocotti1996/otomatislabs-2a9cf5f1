import logoHorizontal from "@/assets/logo-horizontal.png";

const Footer = () => {
  return (
    <footer className="py-10 bg-gradient-hero">
      <div className="container flex flex-col md:flex-row items-center justify-between gap-6">
        <img src={logoHorizontal} alt="Otomatis Labs" className="h-8" />
        <p className="text-sm text-primary-foreground/70">
          © {new Date().getFullYear()} Otomatis Labs. Todos los derechos reservados.
        </p>
        <div className="flex items-center gap-6">
          <a href="#servicios" className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">Servicios</a>
          <a href="#proceso" className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">Proceso</a>
          <a href="#contacto" className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">Contacto</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
