import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import es from './es';
import en from './en';

export type Language = 'es' | 'en';
export type TranslationKey = keyof typeof es;
type TranslationValues = Record<string, string | number>;

const dictionaries: Record<Language, Record<TranslationKey, string>> = { es, en };
const STORAGE_KEY = 'lost-space-archive-language';

interface LanguageContextValue {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: TranslationKey, values?: TranslationValues) => string;
  formatDate: (date: string) => string;
  formatNumber: (value: number, maximumFractionDigits?: number) => string;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

function getSavedLanguage(): Language {
  try {
    const value = localStorage.getItem(STORAGE_KEY);
    return value === 'en' || value === 'es' ? value : 'es';
  } catch {
    return 'es';
  }
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(getSavedLanguage);

  useEffect(() => {
    document.documentElement.lang = language;
    document.title = dictionaries[language]['app.title'];
    try {
      localStorage.setItem(STORAGE_KEY, language);
    } catch {
      // Language still works for the current session when storage is unavailable.
    }
  }, [language]);

  const t = useCallback((key: TranslationKey, values: TranslationValues = {}) => {
    return Object.entries(values).reduce(
      (text, [name, value]) => text.split(`{${name}}`).join(String(value)),
      dictionaries[language][key],
    );
  }, [language]);

  const formatDate = useCallback((date: string) => {
    const parsed = new Date(`${date.slice(0, 10)}T12:00:00Z`);
    if (Number.isNaN(parsed.getTime())) return date;
    return new Intl.DateTimeFormat(language === 'es' ? 'es-ES' : 'en-US', {
      day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC',
    }).format(parsed);
  }, [language]);

  const formatNumber = useCallback((value: number, maximumFractionDigits = 1) => new Intl.NumberFormat(
    language === 'es' ? 'es-ES' : 'en-US',
    { maximumFractionDigits },
  ).format(value), [language]);

  const value = useMemo(() => ({ language, setLanguage, t, formatDate, formatNumber }), [language, t, formatDate, formatNumber]);
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage(): LanguageContextValue {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within a LanguageProvider');
  return context;
}
