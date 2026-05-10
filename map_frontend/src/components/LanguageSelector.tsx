import { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import type { Language } from '../i18n/translations';

interface LangOption {
  code: Language;
  label: string;
  shortLabel: string;
  flag: string;
}

const LANGUAGES: LangOption[] = [
  { code: 'uz-Latn', label: "O'zbek (Lotin)", shortLabel: "UZ", flag: '🇺🇿' },
  { code: 'uz-Cyrl', label: 'Ўзбек (Кирил)', shortLabel: 'ЎЗ', flag: '🇺🇿' },
  { code: 'ru', label: 'Русский', shortLabel: 'RU', flag: '🇷🇺' },
  { code: 'en', label: 'English', shortLabel: 'EN', flag: '🇬🇧' },
];

export default function LanguageSelector() {
  const { language, setLanguage, t } = useLanguage();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const current = LANGUAGES.find((l) => l.code === language) ?? LANGUAGES[0];

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label={t.language}
        aria-expanded={open}
        aria-haspopup="listbox"
        className={`
          flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium
          transition-all duration-200 cursor-pointer
          dark:bg-slate-700 dark:hover:bg-slate-600 dark:text-slate-200
          bg-slate-100 hover:bg-slate-200 text-slate-700
        `}
      >
        <span className="text-base leading-none">{current.flag}</span>
        <span className="hidden sm:inline">{current.shortLabel}</span>
        <svg
          className={`w-3.5 h-3.5 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div
          role="listbox"
          aria-label={t.language}
          className={`
            absolute right-0 top-full mt-2 w-52 rounded-2xl shadow-xl border z-50
            dark:bg-slate-800 dark:border-slate-700
            bg-white border-slate-200
            overflow-hidden
            animate-fade-in
          `}
        >
          {LANGUAGES.map((lang) => (
            <button
              key={lang.code}
              role="option"
              aria-selected={language === lang.code}
              onClick={() => { setLanguage(lang.code); setOpen(false); }}
              className={`
                w-full flex items-center gap-3 px-4 py-3 text-sm text-left
                transition-colors duration-150 cursor-pointer
                ${language === lang.code
                  ? 'dark:bg-blue-600/20 dark:text-blue-400 bg-blue-50 text-blue-700 font-semibold'
                  : 'dark:text-slate-300 dark:hover:bg-slate-700 text-slate-700 hover:bg-slate-50'
                }
              `}
            >
              <span className="text-lg leading-none">{lang.flag}</span>
              <span className="flex-1">{lang.label}</span>
              {language === lang.code && (
                <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
