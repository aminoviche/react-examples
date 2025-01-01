import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpApi from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(HttpApi) // Load translations from external files
  .use(LanguageDetector) // Detect the user's language
  .use(initReactI18next) // Pass i18n instance to react-i18next
  .init({
    fallbackLng: 'en', // Default language
    debug: true, // Enable debug logs in development
    interpolation: {
      escapeValue: false, // React already escapes by default
    },
    backend: {
      loadPath: 'locales/i18n/{{lng}}.json', // Adjust path to your public folder
    },
  });

export default i18n;
