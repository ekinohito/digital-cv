// @vitest-environment jsdom
import { beforeEach, describe, expect, test } from "vite-plus/test";
import { clearAdminToken, getAdminToken, setAdminToken } from "./admin-token.ts";

describe("admin token storage", () => {
  beforeEach(() => {
    window.sessionStorage.clear();
  });

  test("stores the token in sessionStorage", () => {
    setAdminToken("  secret-token  ");

    expect(getAdminToken()).toBe("secret-token");
    expect(window.sessionStorage.getItem("digital-cv.admin-token")).toBe("secret-token");
    expect(window.localStorage.getItem("digital-cv.admin-token")).toBeNull();
  });

  test("removes the token on logout", () => {
    setAdminToken("secret-token");
    clearAdminToken();

    expect(getAdminToken()).toBeNull();
  });
});
