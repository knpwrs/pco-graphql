import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import en from './en.yml';

export default i18n.use(LanguageDetector).init({
  resources: {
    en,
  },
  fallbackLng: 'en', // Intentionally not lang
  defaultNS: 'common',
});
