import { z } from "zod";
import type { CreateProjectInput } from "../../gql/graphql";
import { emptyToNull } from "../admin/admin.utils.ts";

export const projectFormSchema = z.object({
  slug: z
    .string()
    .trim()
    .min(1, "Slug is required")
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Use lowercase words separated by hyphens"),
  titleEn: z.string().trim().min(1, "English title is required"),
  titleRu: z.string().trim().min(1, "Russian title is required"),
  summaryEn: z.string().trim().min(1, "English summary is required"),
  summaryRu: z.string().trim().min(1, "Russian summary is required"),
  detailsEn: z.string(),
  detailsRu: z.string(),
  repoUrl: z.string().url("Enter a valid URL").or(z.literal("")),
  liveUrl: z.string().url("Enter a valid URL").or(z.literal("")),
  featured: z.boolean(),
  sortOrder: z.string().regex(/^\d+$/, "Use a whole number"),
  skillIds: z.array(z.string()),
  imageAssetId: z.string(),
});

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
