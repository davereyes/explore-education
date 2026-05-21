import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';

export type Language = 'es' | 'en';

interface LanguageContextValue {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggle: () => void;
  t: (es: string, en: string) => string;
}

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('es');

  const value = useMemo<LanguageContextValue>(
    () => ({
      language,
      setLanguage,
      toggle: () => setLanguage((l) => (l === 'es' ? 'en' : 'es')),
      t: (es, en) => (language === 'es' ? es : en),
    }),
    [language],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
}
