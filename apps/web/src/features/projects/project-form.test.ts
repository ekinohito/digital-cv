import { describe, expect, test } from "vite-plus/test";
import { emptyProjectFormValues, projectMutationInput, projectFormSchema } from "./project-form.ts";

describe("project form payload", () => {
  test("creates the GraphQL input with explicit nullable fields", () => {
    const values = projectFormSchema.parse({
      ...emptyProjectFormValues,
      slug: "systems-dossier",
      titleEn: "Systems dossier",
      titleRu: "Досье системы",
      summaryEn: "A contract-first portfolio.",
      summaryRu: "Портфолио с контрактом прежде всего.",
      repoUrl: "https://github.com/example/systems-dossier",
      sortOrder: "20",
      featured: true,
      skillIds: ["skill-typescript", "skill-graphql"],
    });

    expect(projectMutationInput(values)).toEqual({
      slug: "systems-dossier",
      titleEn: "Systems dossier",
      titleRu: "Досье системы",
      summaryEn: "A contract-first portfolio.",
      summaryRu: "Портфолио с контрактом прежде всего.",
      detailsEn: null,
      detailsRu: null,
      repoUrl: "https://github.com/example/systems-dossier",
      liveUrl: null,
      featured: true,
      sortOrder: 20,
      skillIds: ["skill-typescript", "skill-graphql"],
      imageAssetId: null,
    });
  });
});
