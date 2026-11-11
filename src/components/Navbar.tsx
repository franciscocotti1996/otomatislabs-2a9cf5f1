import { useEffect, useState } from "react";
import ResponsiveImage from "@/components/ResponsiveImage";
import { responsiveImages } from "@/lib/responsive-images";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/i18n/LanguageContext";

const scrollToContact = (e: React.MouseEvent) => {
  e.preventDefault();
  const el = document.getElementById("contacto");
  if (el) {
    const offset = 120;
    const top = el.getBoundingClientRect().top + window.scrollY - offset;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top, behavior: reduced ? "auto" : "smooth" });
  }
};

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [activeId, setActiveId] = useState<string>("");
  const { t, toggle } = useLanguage();

  const navLinks = [
    { label: t.nav.services, href: "#servicios" },
    { label: t.nav.agents, href: "#agentes-ia" },
    { label: t.nav.why, href: "#diferencial" },
    { label: t.nav.process, href: "#proceso" },
  ];

  useEffect(() => {
    const ids = ["servicios", "agentes-ia", "diferencial", "proceso", "contacto"];
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => !!el);

    if (sections.length === 0) return;

    const computeActive = () => {
      const offset = 140;
      const scrollY = window.scrollY + offset;
      let current = "";
      for (const s of sections) {
        if (s.offsetTop <= scrollY) current = s.id;
      }
      // Force contacto when near bottom
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 4) {
        const last = sections[sections.length - 1];
        if (last) current = last.id;
      }
      setActiveId(current);
    };

    computeActive();
    window.addEventListener("scroll", computeActive, { passive: true });
    window.addEventListener("resize", computeActive);
    return () => {
      window.removeEventListener("scroll", computeActive);
      window.removeEventListener("resize", computeActive);
    };
  }, []);

  const isActive = (href: string) => activeId && href === `#${activeId}`;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-card/90 backdrop-blur-md border-b border-border/50">
      <div className="container flex items-center justify-between h-20 md:h-28">
        <a href="#" className="flex items-center">
          <ResponsiveImage asset={responsiveImages.brand} sizes="(min-width: 768px) 131px, 92px" loading="eager" alt="Otomatis Labs" className="h-14 md:h-20 w-auto" />
        </a>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              aria-current={isActive(link.href) ? "page" : undefined}
              className={`relative text-sm font-medium transition-colors after:content-[''] after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:bg-primary after:transition-all ${
                isActive(link.href)
                  ? "text-foreground after:w-full"
                  : "text-muted-foreground hover:text-foreground after:w-0"
              }`}
            >
              {link.label}
            </a>
          ))}
          <Button
            variant="outline"
            onClick={toggle}
            aria-label={t.nav.langAria}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-border text-sm font-semibold text-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
          >
            {t.nav.langLabel}
          </Button>
          <a
            href="#contacto"
            onClick={scrollToContact}
            aria-current={isActive("#contacto") ? "page" : undefined}
            className={`px-5 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity ${
              isActive("#contacto") ? "ring-2 ring-primary/40 ring-offset-2 ring-offset-card" : ""
            }`}
          >
            {t.nav.contact}
          </a>
        </div>

        {/* Mobile toggle */}
        <div className="md:hidden flex items-center gap-1">
          <Button
            variant="outline"
            size="sm"
            onClick={toggle}
            aria-label={t.nav.langAria}
            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-md border border-border text-xs font-semibold"
          >
            {t.nav.langLabel}
          </Button>
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
              aria-current={isActive(link.href) ? "page" : undefined}
              className={`block text-sm font-medium border-l-2 pl-3 transition-colors ${
                isActive(link.href)
                  ? "text-foreground border-primary"
                  : "text-muted-foreground border-transparent hover:text-foreground"
              }`}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contacto"
            onClick={(e) => { scrollToContact(e); setOpen(false); }}
            aria-current={isActive("#contacto") ? "page" : undefined}
            className={`block px-5 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-semibold text-center ${
              isActive("#contacto") ? "ring-2 ring-primary/40" : ""
            }`}
          >
            {t.nav.contact}
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
