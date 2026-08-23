import { z } from "zod";
import { getAdminToken } from "./admin-token.ts";

const AssetUploadResponseSchema = z.object({
  id: z.string(),
  originalName: z.string(),
  mimeType: z.string(),
  size: z.number(),
  url: z.string(),
});

export type AssetUploadResponse = z.infer<typeof AssetUploadResponseSchema>;

export async function uploadAsset(file: File): Promise<AssetUploadResponse> {
  const token = getAdminToken();

  if (!token) {
    throw new Error("Admin token is missing");
  }

  const body = new FormData();
  body.append("file", file);

  const response = await fetch("/api/admin/assets", {
    method: "POST",
    headers: { authorization: `Bearer ${token}` },
    body,
  });

  if (!response.ok) {
    throw new Error(`Upload failed: ${response.status}`);
  }

  return AssetUploadResponseSchema.parse(await response.json());
}
