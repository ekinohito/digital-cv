import { createElement, useEffect, type PropsWithChildren, type ReactNode } from "react";
import { I18nextProvider } from "react-i18next";
import { i18n } from "./i18n-config.ts";

export function I18nProvider({ children }: PropsWithChildren): ReactNode {
  useEffect(() => {
    document.documentElement.lang = i18n.language === "ru" ? "ru" : "en";
  }, []);

  return createElement(I18nextProvider, { i18n }, children);
}
