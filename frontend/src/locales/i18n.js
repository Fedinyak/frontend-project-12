import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import resources from './ru';
// import ru from './ru';

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    lng: 'ru',
    resources,
    // resources: {
    //   ru,
    // },

    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
