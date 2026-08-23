export function dateInputValue(value: string | null | undefined): string {
  return value ? value.slice(0, 10) : "";
}

export function dateTimeValue(value: string): string {
  return new Date(`${value}T00:00:00.000Z`).toISOString();
}

export function emptyToNull(value: string): string | null {
  const normalized = value.trim();
  return normalized.length > 0 ? normalized : null;
}

export function errorMessage(error: unknown, fallback: string): string {
  return error instanceof Error && error.message ? error.message : fallback;
}

export function formatBytes(size: number): string {
  if (size < 1024) {
    return `${size} B`;
  }
  if (size < 1024 * 1024) {
    return `${Math.round(size / 1024)} KB`;
  }
  return `${(size / (1024 * 1024)).toFixed(1)} MB`;
}
