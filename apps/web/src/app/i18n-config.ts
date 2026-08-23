import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "../locales/en.json";
import ru from "../locales/ru.json";
import { getLocale, setLocale, type Locale } from "../lib/locale.ts";

void i18n.use(initReactI18next).init({
  resources: { en: { translation: en }, ru: { translation: ru } },
  lng: getLocale(),
  fallbackLng: "en",
  interpolation: { escapeValue: false },
});

export async function changeLocale(locale: Locale): Promise<void> {
  setLocale(locale);
  await i18n.changeLanguage(locale);
  document.documentElement.lang = locale;
}

export { i18n };
