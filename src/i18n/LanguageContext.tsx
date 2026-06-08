import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { translations, type Lang, type Dict } from "./translations";

type Ctx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  toggle: () => void;
  t: Dict;
};

const LanguageContext = createContext<Ctx | null>(null);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLangState] = useState<Lang>(() => {
    if (typeof window === "undefined") return "es";
    const stored = window.localStorage.getItem("lang");
    if (stored === "en" || stored === "es") return stored as Lang;
    const nav = (window.navigator.languages?.[0] || window.navigator.language || "es").toLowerCase();
    return nav.startsWith("es") ? "es" : "en";
  });

  const setLang = (l: Lang) => {
    setLangState(l);
    if (typeof window !== "undefined") {
      window.localStorage.setItem("lang", l);
    }
  };

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = lang;
    }
  }, [lang]);

  const toggle = () => setLang(lang === "es" ? "en" : "es");

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggle, t: translations[lang] }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used inside LanguageProvider");
  return ctx;
};