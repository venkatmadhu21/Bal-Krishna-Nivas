import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import translation files
import enTranslation from './locales/en.json';
import mrTranslation from './locales/mr.json';

const resources = {
  en: {
    translation: enTranslation
  },
  mr: {
    translation: mrTranslation
  }
};

i18n
  .use(LanguageDetector) // Detects user language
  .use(initReactI18next) // Passes i18n down to react-i18next
  .init({
    resources,
    fallbackLng: 'en', // Default language
    debug: process.env.NODE_ENV === 'development',
    
    detection: {
      // Detection options
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage']
    },

    interpolation: {
      escapeValue: false // React already does escaping
    },

    react: {
      useSuspense: false // Set to false to avoid loading issues
    }
  });

export default i18n;