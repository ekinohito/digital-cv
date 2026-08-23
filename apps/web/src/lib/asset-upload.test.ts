// @vitest-environment jsdom
import { beforeEach, describe, expect, test, vi } from "vite-plus/test";
import { setAdminToken } from "./admin-token.ts";
import { uploadAsset } from "./asset-upload.ts";

describe("asset upload", () => {
  beforeEach(() => {
    window.sessionStorage.clear();
    vi.restoreAllMocks();
  });

  test("sends the bearer token and multipart file", async () => {
    setAdminToken("secret-token");
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        id: "asset-1",
        originalName: "photo.png",
        mimeType: "image/png",
        size: 12,
        url: "/api/assets/asset-1",
      }),
    });
    vi.stubGlobal("fetch", fetchMock);
    const file = new File(["image"], "photo.png", { type: "image/png" });

    await expect(uploadAsset(file)).resolves.toMatchObject({ id: "asset-1" });

    const [, options] = fetchMock.mock.calls[0] as [string, RequestInit];
    expect(options.method).toBe("POST");
    expect(options.headers).toEqual({ authorization: "Bearer secret-token" });
    expect(options.body).toBeInstanceOf(FormData);
    expect((options.body as FormData).get("file")).toBeInstanceOf(File);
  });

  test("rejects an invalid server response", async () => {
    setAdminToken("secret-token");
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({ ok: true, json: async () => ({ id: "asset-1" }) }),
    );

    await expect(uploadAsset(new File(["x"], "x.txt", { type: "text/plain" }))).rejects.toThrow();
  });
});
