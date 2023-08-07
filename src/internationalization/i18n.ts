import { createInstance } from 'i18next';
import { messages } from './locales/translations';
import { initReactI18next } from 'react-i18next';

const i18n = createInstance({
		resources: messages,
		lng: 'en',
		fallbackLng: 'en',
		defaultNS: ['translations'],
		ns: ['translations'],
		interpolation: {
			escapeValue: false,
		},
	});

i18n.use(initReactI18next).init();

export default i18n
