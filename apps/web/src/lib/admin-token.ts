const KEY = "digital-cv.admin-token";

export function getAdminToken(): string | null {
  if (typeof window === "undefined") {
    return null;
  }

  return window.sessionStorage.getItem(KEY);
}

export function setAdminToken(token: string): void {
  window.sessionStorage.setItem(KEY, token.trim());
}

export function clearAdminToken(): void {
  window.sessionStorage.removeItem(KEY);
}
