import { createContext, useContext, useEffect, type ReactNode } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { translations, type Lang, type Dict } from "./translations";
import { getFormatters, type Formatters } from "./formatters";

type Ctx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  toggle: () => void;
  t: Dict;
  f: Formatters;
};

const LanguageContext = createContext<Ctx | null>(null);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const lang: Lang = location.pathname.startsWith("/en") ? "en" : "es";

  const setLang = (l: Lang) => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem("lang", l);
    }
    if (l !== lang) {
      navigate(`/${l}${location.hash || ""}`, { replace: false });
    }
  };

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = lang;
    }
    if (typeof window !== "undefined") {
      window.localStorage.setItem("lang", lang);
    }
  }, [lang]);

  const toggle = () => setLang(lang === "es" ? "en" : "es");

  const f = getFormatters(lang);

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggle, t: translations[lang], f }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used inside LanguageProvider");
  return ctx;
};