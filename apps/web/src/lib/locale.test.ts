// @vitest-environment jsdom
import { beforeEach, describe, expect, test } from "vite-plus/test";
import { getLocale, localized, setLocale } from "./locale.ts";

describe("locale helpers", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  test("persists the selected locale", () => {
    expect(getLocale()).toBe("en");
    setLocale("ru");
    expect(getLocale()).toBe("ru");
  });

  test("selects localized content with a fallback", () => {
    expect(localized("ru", "English", "Русский")).toBe("Русский");
    expect(localized("en", "English", "Русский")).toBe("English");
    expect(localized("ru", "English", null)).toBe("English");
  });
});
