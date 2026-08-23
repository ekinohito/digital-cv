export type Locale = "en" | "ru";

const LOCALE_KEY = "digital-cv.locale";

export function getLocale(): Locale {
  if (typeof window === "undefined") {
    return "en";
  }

  return window.localStorage.getItem(LOCALE_KEY) === "ru" ? "ru" : "en";
}

export function setLocale(locale: Locale): void {
  window.localStorage.setItem(LOCALE_KEY, locale);
}

export function localized(
  locale: Locale,
  en: string | null | undefined,
  ru: string | null | undefined,
): string {
  const value = locale === "ru" ? ru : en;
  return value ?? (locale === "ru" ? en : ru) ?? "";
}
