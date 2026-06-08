import { useState } from "react";
import logoHorizontal from "@/assets/logo-horizontal.png";
import { Menu, X } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

const scrollToContact = (e: React.MouseEvent) => {
  e.preventDefault();
  const el = document.getElementById("contacto");
  if (el) {
    const offset = 120;
    const top = el.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: "smooth" });
  }
};

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { t, toggle, lang } = useLanguage();

  const navLinks = [
    { label: t.nav.services, href: "#servicios" },
    { label: t.nav.why, href: "#diferencial" },
    { label: t.nav.process, href: "#proceso" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-card/90 backdrop-blur-md border-b border-border/50">
      <div className="container flex items-center justify-between h-20 md:h-28">
        <a href="#" className="flex items-center">
          <img src={logoHorizontal} alt="Otomatis Labs" className="h-14 md:h-20" />
        </a>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {link.label}
            </a>
          ))}
          <button
            onClick={toggle}
            aria-label={t.nav.langAria}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-border text-sm font-semibold text-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
          >
            <span className="text-base leading-none" aria-hidden="true">
              {lang === "es" ? "🇪🇸" : "🇺🇸"}
            </span>
            {t.nav.langLabel}
          </button>
          <a
            href="#contacto"
            className="px-5 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity"
          >
            {t.nav.contact}
          </a>
        </div>

        {/* Mobile toggle */}
        <div className="md:hidden flex items-center gap-1">
          <button
            onClick={toggle}
            aria-label={t.nav.langAria}
            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-md border border-border text-xs font-semibold"
          >
            <span className="text-sm leading-none" aria-hidden="true">
              {lang === "es" ? "🇪🇸" : "🇺🇸"}
            </span>
            {t.nav.langLabel}
          </button>
          <button className="p-2" onClick={() => setOpen(!open)} aria-label="Menu">
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-card border-t border-border px-6 py-4 space-y-3 animate-fade-in">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="block text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contacto"
            onClick={() => setOpen(false)}
            className="block px-5 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-semibold text-center"
          >
            {t.nav.contact}
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
