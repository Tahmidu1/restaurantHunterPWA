import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Define your translation resources – add as many keys/languages as needed.
const resources = {
  en: {
    translation: {
      "home.title": "Craving something?",
      "home.subtitle": "Find restaurants in the quickest way near you offline or online.",
      "button.restaurantSearch": "Restaurant Search",
      "button.contactUs": "Contact Us",
      "contact.title": "Contact Us",
      "contact.subtitle": "We're here to help you with any inquiries.",
      "contact.emailLabel": "Email",
      "contact.emailAddress": "support@restHunter.com",
      "contact.phoneLabel": "Phone",
      "contact.phoneNumber": "+1 (123) 456 7890",
      "contact.officeLabel": "Office",
      "contact.officeLocation": "London, XX000",
      "contact.newsletterTitle": "Subscribe to our Newsletter",
      "contact.newsletterSubtitle": "Be the first to learn about our latest features and updates.",
      "button.join": "Join",
      // ... add more keys if needed
    }
  },
  es: {
    translation: {
      "home.title": "¿Antojo de algo?",
      "home.subtitle": "Encuentra restaurantes cerca de ti rápidamente, ya sea en línea o sin conexión.",
      "button.restaurantSearch": "Buscar Restaurante",
      "button.contactUs": "Contáctenos",
      "contact.title": "Contáctenos",
      "contact.subtitle": "Estamos aquí para ayudarte con cualquier consulta.",
      "contact.emailLabel": "Correo electrónico",
      "contact.emailAddress": "soporte@restHunter.com",
      "contact.phoneLabel": "Teléfono",
      "contact.phoneNumber": "+1 (123) 456 7890",
      "contact.officeLabel": "Oficina",
      "contact.officeLocation": "Londres, XX000",
      "contact.newsletterTitle": "Suscríbete a nuestro boletín",
      "contact.newsletterSubtitle": "Sé el primero en conocer nuestras últimas características y actualizaciones.",
      "button.join": "Unirse",
      // ... add additional keys
    }
  }
  // add more languages as needed
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en", // default language
  fallbackLng: "en",
  interpolation: {
    escapeValue: false // react already safes from xss
  },
});

export default i18n;
