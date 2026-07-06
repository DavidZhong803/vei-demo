"use client";

import { createContext, useContext, useEffect, useState } from "react";

export type Lang = "en" | "zh";

const LangCtx = createContext<{ lang: Lang; setLang: (l: Lang) => void }>({
  lang: "en",
  setLang: () => {},
});

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    const saved = localStorage.getItem("vea-lang");
    if (saved === "en" || saved === "zh") setLangState(saved);
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    try {
      localStorage.setItem("vea-lang", l);
    } catch {
      /* ignore */
    }
  };

  return (
    <LangCtx.Provider value={{ lang, setLang }}>{children}</LangCtx.Provider>
  );
}

export function useLang() {
  return useContext(LangCtx);
}

/** Convenience: returns a picker `t(en, zh)` for the current language. */
export function useT() {
  const { lang } = useLang();
  return (en: string, zh: string) => (lang === "zh" ? zh : en);
}
