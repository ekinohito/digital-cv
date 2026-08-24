import { z } from "zod";
import type { CreateProjectInput } from "../../gql/graphql";
import { emptyToNull } from "../admin/admin.utils.ts";

export type Translate = (key: string) => string;

export function createProjectFormSchema(t: Translate) {
  return z.object({
    slug: z
      .string()
      .trim()
      .min(1, t("admin.validation.required"))
      .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, t("admin.validation.slug")),
    titleEn: z.string().trim().min(1, t("admin.validation.required")),
    titleRu: z.string().trim().min(1, t("admin.validation.required")),
    summaryEn: z.string().trim().min(1, t("admin.validation.required")),
    summaryRu: z.string().trim().min(1, t("admin.validation.required")),
    detailsEn: z.string(),
    detailsRu: z.string(),
    repoUrl: z.string().url(t("admin.validation.url")).or(z.literal("")),
    liveUrl: z.string().url(t("admin.validation.url")).or(z.literal("")),
    featured: z.boolean(),
    sortOrder: z.string().regex(/^\d+$/, t("admin.validation.number")),
    skillIds: z.array(z.string()),
    imageAssetId: z.string(),
  });
}

const defaultMessages: Record<string, string> = {
  "admin.validation.required": "This field is required.",
  "admin.validation.url": "Enter a valid URL.",
  "admin.validation.number": "Enter a whole number.",
  "admin.validation.slug": "Use lowercase words separated by hyphens.",
};
const defaultTranslate: Translate = (key) => defaultMessages[key] ?? key;
export const projectFormSchema = createProjectFormSchema(defaultTranslate);

export type ProjectFormValues = z.infer<typeof projectFormSchema>;

export const emptyProjectFormValues: ProjectFormValues = {
  slug: "",
  titleEn: "",
  titleRu: "",
  summaryEn: "",
  summaryRu: "",
  detailsEn: "",
  detailsRu: "",
  repoUrl: "",
  liveUrl: "",
  featured: false,
  sortOrder: "10",
  skillIds: [],
  imageAssetId: "",
};

export function projectMutationInput(values: ProjectFormValues): CreateProjectInput {
  return {
    slug: values.slug,
    titleEn: values.titleEn,
    titleRu: values.titleRu,
    summaryEn: values.summaryEn,
    summaryRu: values.summaryRu,
    detailsEn: emptyToNull(values.detailsEn),
    detailsRu: emptyToNull(values.detailsRu),
    repoUrl: emptyToNull(values.repoUrl),
    liveUrl: emptyToNull(values.liveUrl),
    featured: values.featured,
    sortOrder: Number(values.sortOrder),
    skillIds: values.skillIds,
    imageAssetId: values.imageAssetId || null,
  };
}
