import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'
import HttpApi from 'i18next-http-backend'
import LanguageDetector from 'i18next-browser-languagedetector'

const i18nX = i18next
    .use(HttpApi)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        supportedLngs: ['en', 'tr'],
        fallbackLng: 'en',
        detection: {
            order: ['cookie', 'navigator', 'htmlTag'],
            caches: ['cookie'],
        },
        backend: {
            loadPath: 'assets/locales/{{lng}}/translation.json',
        }
    })

export default i18nX;