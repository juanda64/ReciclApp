import i18n from 'i18next';
import Backend from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';

i18n
  .use(Backend)
  .use(initReactI18next)
  .init({
    fallbackLng: 'es', // Lenguaje por defecto si no encuentra otro
    debug: true, // Activa la depuración para ver mensajes en la consola
    backend: {
      loadPath: '/locales/{{lng}}/label.json', // Ruta a los archivos de traducción
    },
    interpolation: {
      escapeValue: false, // React ya maneja el escape de las interpolaciones
    },
  });

export default i18n;
