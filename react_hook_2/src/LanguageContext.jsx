import { createContext, useContext, useState, useMemo } from 'react';

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState('ru'); // 'ru' или 'en'

  const value = useMemo(() => ({ lang, setLang }), [lang]);

  return (
    <LanguageContext value={value}>
      {children}
    </LanguageContext>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage нужно вызывать внутри LanguageProvider');
  return ctx;
}
