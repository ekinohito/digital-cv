import { z } from "zod";

const HealthSchema = z.object({
  status: z.string(),
  database: z.string(),
  storage: z.string(),
});

export type HealthSnapshot = z.infer<typeof HealthSchema>;

export async function getHealth(): Promise<HealthSnapshot> {
  const response = await fetch("/api/health");

  if (!response.ok) {
    throw new Error("Health check failed");
  }

  return HealthSchema.parse(await response.json());
}

export type HealthStatus = "online" | "offline" | "unknown";

export function toHealthStatus(value: string | undefined): HealthStatus {
  if (!value) {
    return "unknown";
  }

  return ["ok", "online", "connected", "available", "healthy", "degraded"].includes(
    value.toLowerCase(),
  )
    ? "online"
    : "offline";
}
