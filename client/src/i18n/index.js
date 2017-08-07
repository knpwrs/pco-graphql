import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import en from './en.yml';
import es from './es.yml';
import fr from './fr.yml';

export default i18n.use(LanguageDetector).init({
  resources: {
    en, es, fr,
  },
  fallbackLng: 'en', // Intentionally not lang
  defaultNS: 'common',
});

// Uncomment the following to test a language.
// i18n.changeLanguage('en');
