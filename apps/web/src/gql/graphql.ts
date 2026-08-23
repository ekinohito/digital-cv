/* eslint-disable */
/** Internal type. DO NOT USE DIRECTLY. */
type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** Internal type. DO NOT USE DIRECTLY. */
export type Incremental<T> =
  | T
  | { [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never };
import type { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";
export type CreateExperienceInput = {
  company: string;
  descriptionEn: string;
  descriptionRu: string;
  endDate?: string | null | undefined;
  roleEn: string;
  roleRu: string;
  skillIds: Array<string | number>;
  sortOrder: number;
  startDate: string;
};

export type CreateProjectInput = {
  detailsEn?: string | null | undefined;
  detailsRu?: string | null | undefined;
  featured?: boolean;
  imageAssetId?: string | number | null | undefined;
  liveUrl?: string | null | undefined;
  repoUrl?: string | null | undefined;
  skillIds: Array<string | number>;
  slug: string;
  sortOrder: number;
  summaryEn: string;
  summaryRu: string;
  titleEn: string;
  titleRu: string;
};

export type CreateSkillInput = {
  category: SkillCategory;
  name: string;
  slug: string;
  sortOrder: number;
};

export type CreateSocialLinkInput = {
  label: string;
  platform: string;
  sortOrder: number;
  url: string;
};

export type SkillCategory =
  | "BACKEND"
  | "DATABASE"
  | "FRONTEND"
  | "INFRASTRUCTURE"
  | "LANGUAGE"
  | "OTHER"
  | "TESTING"
  | "TOOLING";

export type UpdateExperienceInput = {
  company?: string | null | undefined;
  descriptionEn?: string | null | undefined;
  descriptionRu?: string | null | undefined;
  endDate?: string | null | undefined;
  roleEn?: string | null | undefined;
  roleRu?: string | null | undefined;
  skillIds?: Array<string | number> | null | undefined;
  sortOrder?: number | null | undefined;
  startDate?: string | null | undefined;
};

export type UpdateProfileInput = {
  avatarAssetId?: string | number | null | undefined;
  email?: string | null | undefined;
  fullName?: string | null | undefined;
  githubUrl?: string | null | undefined;
  headlineEn?: string | null | undefined;
  headlineRu?: string | null | undefined;
  resumeAssetId?: string | number | null | undefined;
  summaryEn?: string | null | undefined;
  summaryRu?: string | null | undefined;
};

export type UpdateProjectInput = {
  detailsEn?: string | null | undefined;
  detailsRu?: string | null | undefined;
  featured?: boolean | null | undefined;
  imageAssetId?: string | number | null | undefined;
  liveUrl?: string | null | undefined;
  repoUrl?: string | null | undefined;
  skillIds?: Array<string | number> | null | undefined;
  slug?: string | null | undefined;
  sortOrder?: number | null | undefined;
  summaryEn?: string | null | undefined;
  summaryRu?: string | null | undefined;
  titleEn?: string | null | undefined;
  titleRu?: string | null | undefined;
};

export type UpdateSkillInput = {
  category?: SkillCategory | null | undefined;
  name?: string | null | undefined;
  slug?: string | null | undefined;
  sortOrder?: number | null | undefined;
};

export type UpdateSocialLinkInput = {
  label?: string | null | undefined;
  platform?: string | null | undefined;
  sortOrder?: number | null | undefined;
  url?: string | null | undefined;
};

export type AssetPickerFragment = {
  id: string;
  originalName: string;
  mimeType: string;
  size: number;
  url: string;
  createdAt: string;
} & { " $fragmentName"?: "AssetPickerFragment" };

export type AdminAccessQueryVariables = Exact<{ [key: string]: never }>;

export type AdminAccessQuery = { adminAccess: boolean };

export type AdminProfileQueryVariables = Exact<{ [key: string]: never }>;

export type AdminProfileQuery = {
  profile: {
    id: string;
    fullName: string;
    headlineEn: string;
    headlineRu: string;
    summaryEn: string;
    summaryRu: string;
    email: string;
    githubUrl: string | null;
    updatedAt: string;
    avatar: { " $fragmentRefs"?: { AssetPickerFragment: AssetPickerFragment } } | null;
    resume: { " $fragmentRefs"?: { AssetPickerFragment: AssetPickerFragment } } | null;
  };
};

export type UpdateProfileMutationVariables = Exact<{
  input: UpdateProfileInput;
}>;

export type UpdateProfileMutation = {
  updateProfile: {
    id: string;
    fullName: string;
    headlineEn: string;
    headlineRu: string;
    summaryEn: string;
    summaryRu: string;
    email: string;
    githubUrl: string | null;
    updatedAt: string;
    avatar: { " $fragmentRefs"?: { AssetPickerFragment: AssetPickerFragment } } | null;
    resume: { " $fragmentRefs"?: { AssetPickerFragment: AssetPickerFragment } } | null;
  };
};

export type AdminExperiencesQueryVariables = Exact<{ [key: string]: never }>;

export type AdminExperiencesQuery = {
  experiences: Array<{
    id: string;
    company: string;
    roleEn: string;
    roleRu: string;
    descriptionEn: string;
    descriptionRu: string;
    startDate: string;
    endDate: string | null;
    sortOrder: number;
    updatedAt: string;
    skills: Array<{ id: string; name: string }>;
  }>;
};

export type CreateExperienceMutationVariables = Exact<{
  input: CreateExperienceInput;
}>;

export type CreateExperienceMutation = {
  createExperience: { id: string; company: string; updatedAt: string };
};

export type UpdateExperienceMutationVariables = Exact<{
  id: string | number;
  input: UpdateExperienceInput;
}>;

export type UpdateExperienceMutation = {
  updateExperience: { id: string; company: string; updatedAt: string };
};

export type DeleteExperienceMutationVariables = Exact<{
  id: string | number;
}>;

export type DeleteExperienceMutation = { deleteExperience: boolean };

export type AdminProjectsQueryVariables = Exact<{ [key: string]: never }>;

export type AdminProjectsQuery = {
  projects: Array<{
    id: string;
    slug: string;
    titleEn: string;
    titleRu: string;
    summaryEn: string;
    summaryRu: string;
    detailsEn: string | null;
    detailsRu: string | null;
    repoUrl: string | null;
    liveUrl: string | null;
    featured: boolean;
    sortOrder: number;
    updatedAt: string;
    image: { " $fragmentRefs"?: { AssetPickerFragment: AssetPickerFragment } } | null;
    skills: Array<{ id: string; name: string }>;
  }>;
};

export type CreateProjectMutationVariables = Exact<{
  input: CreateProjectInput;
}>;

export type CreateProjectMutation = {
  createProject: { id: string; slug: string; updatedAt: string };
};

export type UpdateProjectMutationVariables = Exact<{
  id: string | number;
  input: UpdateProjectInput;
}>;

export type UpdateProjectMutation = {
  updateProject: { id: string; slug: string; updatedAt: string };
};

export type DeleteProjectMutationVariables = Exact<{
  id: string | number;
}>;

export type DeleteProjectMutation = { deleteProject: boolean };

export type AdminSkillsQueryVariables = Exact<{ [key: string]: never }>;

export type AdminSkillsQuery = {
  skills: Array<{
    id: string;
    slug: string;
    name: string;
    category: SkillCategory;
    sortOrder: number;
    updatedAt: string;
  }>;
};

export type CreateSkillMutationVariables = Exact<{
  input: CreateSkillInput;
}>;

export type CreateSkillMutation = { createSkill: { id: string; slug: string; updatedAt: string } };

export type UpdateSkillMutationVariables = Exact<{
  id: string | number;
  input: UpdateSkillInput;
}>;

export type UpdateSkillMutation = { updateSkill: { id: string; slug: string; updatedAt: string } };

export type DeleteSkillMutationVariables = Exact<{
  id: string | number;
}>;

export type DeleteSkillMutation = { deleteSkill: boolean };

export type AdminLinksQueryVariables = Exact<{ [key: string]: never }>;

export type AdminLinksQuery = {
  socialLinks: Array<{
    id: string;
    platform: string;
    label: string;
    url: string;
    sortOrder: number;
    updatedAt: string;
  }>;
};

export type CreateSocialLinkMutationVariables = Exact<{
  input: CreateSocialLinkInput;
}>;

export type CreateSocialLinkMutation = {
  createSocialLink: { id: string; label: string; updatedAt: string };
};

export type UpdateSocialLinkMutationVariables = Exact<{
  id: string | number;
  input: UpdateSocialLinkInput;
}>;

export type UpdateSocialLinkMutation = {
  updateSocialLink: { id: string; label: string; updatedAt: string };
};

export type DeleteSocialLinkMutationVariables = Exact<{
  id: string | number;
}>;

export type DeleteSocialLinkMutation = { deleteSocialLink: boolean };

export type AdminAssetsQueryVariables = Exact<{ [key: string]: never }>;

export type AdminAssetsQuery = {
  assets: Array<{ " $fragmentRefs"?: { AssetPickerFragment: AssetPickerFragment } }>;
};

export type DeleteAssetMutationVariables = Exact<{
  id: string | number;
}>;

export type DeleteAssetMutation = { deleteAsset: boolean };

export type ProjectRowFragment = {
  id: string;
  slug: string;
  titleEn: string;
  titleRu: string;
  summaryEn: string;
  summaryRu: string;
  repoUrl: string | null;
  liveUrl: string | null;
  image: { id: string; url: string } | null;
  skills: Array<{ id: string; name: string }>;
} & { " $fragmentName"?: "ProjectRowFragment" };

export type PortfolioPageQueryVariables = Exact<{ [key: string]: never }>;

export type PortfolioPageQuery = {
  profile: {
    id: string;
    fullName: string;
    headlineEn: string;
    headlineRu: string;
    summaryEn: string;
    summaryRu: string;
    email: string;
    githubUrl: string | null;
    avatar: { id: string; url: string } | null;
    resume: { id: string; url: string; originalName: string } | null;
  };
  projects: Array<{ " $fragmentRefs"?: { ProjectRowFragment: ProjectRowFragment } }>;
  experiences: Array<{
    id: string;
    company: string;
    roleEn: string;
    roleRu: string;
    descriptionEn: string;
    descriptionRu: string;
    startDate: string;
    endDate: string | null;
    skills: Array<{ id: string; name: string }>;
  }>;
  skills: Array<{ id: string; name: string; category: SkillCategory; sortOrder: number }>;
  socialLinks: Array<{ id: string; platform: string; label: string; url: string }>;
};

export const AssetPickerFragmentDoc = {
  kind: "Document",
  definitions: [
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "AssetPicker" },
      typeCondition: { kind: "NamedType", name: { kind: "Name", value: "AssetObject" } },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "originalName" } },
          { kind: "Field", name: { kind: "Name", value: "mimeType" } },
          { kind: "Field", name: { kind: "Name", value: "size" } },
          { kind: "Field", name: { kind: "Name", value: "url" } },
          { kind: "Field", name: { kind: "Name", value: "createdAt" } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<AssetPickerFragment, unknown>;
export const ProjectRowFragmentDoc = {
  kind: "Document",
  definitions: [
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "ProjectRow" },
      typeCondition: { kind: "NamedType", name: { kind: "Name", value: "ProjectObject" } },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "slug" } },
          { kind: "Field", name: { kind: "Name", value: "titleEn" } },
          { kind: "Field", name: { kind: "Name", value: "titleRu" } },
          { kind: "Field", name: { kind: "Name", value: "summaryEn" } },
          { kind: "Field", name: { kind: "Name", value: "summaryRu" } },
          { kind: "Field", name: { kind: "Name", value: "repoUrl" } },
          { kind: "Field", name: { kind: "Name", value: "liveUrl" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "image" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "url" } },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "skills" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "name" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<ProjectRowFragment, unknown>;
export const AdminAccessDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "AdminAccess" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [{ kind: "Field", name: { kind: "Name", value: "adminAccess" } }],
      },
    },
  ],
} as unknown as DocumentNode<AdminAccessQuery, AdminAccessQueryVariables>;
export const AdminProfileDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "AdminProfile" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "profile" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "fullName" } },
                { kind: "Field", name: { kind: "Name", value: "headlineEn" } },
                { kind: "Field", name: { kind: "Name", value: "headlineRu" } },
                { kind: "Field", name: { kind: "Name", value: "summaryEn" } },
                { kind: "Field", name: { kind: "Name", value: "summaryRu" } },
                { kind: "Field", name: { kind: "Name", value: "email" } },
                { kind: "Field", name: { kind: "Name", value: "githubUrl" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "avatar" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "FragmentSpread", name: { kind: "Name", value: "AssetPicker" } },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "resume" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "FragmentSpread", name: { kind: "Name", value: "AssetPicker" } },
                    ],
                  },
                },
                { kind: "Field", name: { kind: "Name", value: "updatedAt" } },
              ],
            },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "AssetPicker" },
      typeCondition: { kind: "NamedType", name: { kind: "Name", value: "AssetObject" } },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "originalName" } },
          { kind: "Field", name: { kind: "Name", value: "mimeType" } },
          { kind: "Field", name: { kind: "Name", value: "size" } },
          { kind: "Field", name: { kind: "Name", value: "url" } },
          { kind: "Field", name: { kind: "Name", value: "createdAt" } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<AdminProfileQuery, AdminProfileQueryVariables>;
export const UpdateProfileDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "UpdateProfile" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "input" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "UpdateProfileInput" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "updateProfile" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "input" },
                value: { kind: "Variable", name: { kind: "Name", value: "input" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "fullName" } },
                { kind: "Field", name: { kind: "Name", value: "headlineEn" } },
                { kind: "Field", name: { kind: "Name", value: "headlineRu" } },
                { kind: "Field", name: { kind: "Name", value: "summaryEn" } },
                { kind: "Field", name: { kind: "Name", value: "summaryRu" } },
                { kind: "Field", name: { kind: "Name", value: "email" } },
                { kind: "Field", name: { kind: "Name", value: "githubUrl" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "avatar" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "FragmentSpread", name: { kind: "Name", value: "AssetPicker" } },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "resume" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "FragmentSpread", name: { kind: "Name", value: "AssetPicker" } },
                    ],
                  },
                },
                { kind: "Field", name: { kind: "Name", value: "updatedAt" } },
              ],
            },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "AssetPicker" },
      typeCondition: { kind: "NamedType", name: { kind: "Name", value: "AssetObject" } },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "originalName" } },
          { kind: "Field", name: { kind: "Name", value: "mimeType" } },
          { kind: "Field", name: { kind: "Name", value: "size" } },
          { kind: "Field", name: { kind: "Name", value: "url" } },
          { kind: "Field", name: { kind: "Name", value: "createdAt" } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<UpdateProfileMutation, UpdateProfileMutationVariables>;
export const AdminExperiencesDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "AdminExperiences" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "experiences" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "company" } },
                { kind: "Field", name: { kind: "Name", value: "roleEn" } },
                { kind: "Field", name: { kind: "Name", value: "roleRu" } },
                { kind: "Field", name: { kind: "Name", value: "descriptionEn" } },
                { kind: "Field", name: { kind: "Name", value: "descriptionRu" } },
                { kind: "Field", name: { kind: "Name", value: "startDate" } },
                { kind: "Field", name: { kind: "Name", value: "endDate" } },
                { kind: "Field", name: { kind: "Name", value: "sortOrder" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "skills" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "name" } },
                    ],
                  },
                },
                { kind: "Field", name: { kind: "Name", value: "updatedAt" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<AdminExperiencesQuery, AdminExperiencesQueryVariables>;
export const CreateExperienceDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "CreateExperience" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "input" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "CreateExperienceInput" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "createExperience" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "input" },
                value: { kind: "Variable", name: { kind: "Name", value: "input" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "company" } },
                { kind: "Field", name: { kind: "Name", value: "updatedAt" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<CreateExperienceMutation, CreateExperienceMutationVariables>;
export const UpdateExperienceDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "UpdateExperience" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "input" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "UpdateExperienceInput" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "updateExperience" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: { kind: "Variable", name: { kind: "Name", value: "id" } },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "input" },
                value: { kind: "Variable", name: { kind: "Name", value: "input" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "company" } },
                { kind: "Field", name: { kind: "Name", value: "updatedAt" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<UpdateExperienceMutation, UpdateExperienceMutationVariables>;
export const DeleteExperienceDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "DeleteExperience" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "deleteExperience" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: { kind: "Variable", name: { kind: "Name", value: "id" } },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<DeleteExperienceMutation, DeleteExperienceMutationVariables>;
export const AdminProjectsDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "AdminProjects" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "projects" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "slug" } },
                { kind: "Field", name: { kind: "Name", value: "titleEn" } },
                { kind: "Field", name: { kind: "Name", value: "titleRu" } },
                { kind: "Field", name: { kind: "Name", value: "summaryEn" } },
                { kind: "Field", name: { kind: "Name", value: "summaryRu" } },
                { kind: "Field", name: { kind: "Name", value: "detailsEn" } },
                { kind: "Field", name: { kind: "Name", value: "detailsRu" } },
                { kind: "Field", name: { kind: "Name", value: "repoUrl" } },
                { kind: "Field", name: { kind: "Name", value: "liveUrl" } },
                { kind: "Field", name: { kind: "Name", value: "featured" } },
                { kind: "Field", name: { kind: "Name", value: "sortOrder" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "image" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "FragmentSpread", name: { kind: "Name", value: "AssetPicker" } },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "skills" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "name" } },
                    ],
                  },
                },
                { kind: "Field", name: { kind: "Name", value: "updatedAt" } },
              ],
            },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "AssetPicker" },
      typeCondition: { kind: "NamedType", name: { kind: "Name", value: "AssetObject" } },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "originalName" } },
          { kind: "Field", name: { kind: "Name", value: "mimeType" } },
          { kind: "Field", name: { kind: "Name", value: "size" } },
          { kind: "Field", name: { kind: "Name", value: "url" } },
          { kind: "Field", name: { kind: "Name", value: "createdAt" } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<AdminProjectsQuery, AdminProjectsQueryVariables>;
export const CreateProjectDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "CreateProject" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "input" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "CreateProjectInput" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "createProject" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "input" },
                value: { kind: "Variable", name: { kind: "Name", value: "input" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "slug" } },
                { kind: "Field", name: { kind: "Name", value: "updatedAt" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<CreateProjectMutation, CreateProjectMutationVariables>;
export const UpdateProjectDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "UpdateProject" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "input" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "UpdateProjectInput" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "updateProject" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: { kind: "Variable", name: { kind: "Name", value: "id" } },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "input" },
                value: { kind: "Variable", name: { kind: "Name", value: "input" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "slug" } },
                { kind: "Field", name: { kind: "Name", value: "updatedAt" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<UpdateProjectMutation, UpdateProjectMutationVariables>;
export const DeleteProjectDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "DeleteProject" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "deleteProject" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: { kind: "Variable", name: { kind: "Name", value: "id" } },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<DeleteProjectMutation, DeleteProjectMutationVariables>;
export const AdminSkillsDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "AdminSkills" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "skills" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "slug" } },
                { kind: "Field", name: { kind: "Name", value: "name" } },
                { kind: "Field", name: { kind: "Name", value: "category" } },
                { kind: "Field", name: { kind: "Name", value: "sortOrder" } },
                { kind: "Field", name: { kind: "Name", value: "updatedAt" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<AdminSkillsQuery, AdminSkillsQueryVariables>;
export const CreateSkillDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "CreateSkill" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "input" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "CreateSkillInput" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "createSkill" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "input" },
                value: { kind: "Variable", name: { kind: "Name", value: "input" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "slug" } },
                { kind: "Field", name: { kind: "Name", value: "updatedAt" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<CreateSkillMutation, CreateSkillMutationVariables>;
export const UpdateSkillDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "UpdateSkill" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "input" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "UpdateSkillInput" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "updateSkill" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: { kind: "Variable", name: { kind: "Name", value: "id" } },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "input" },
                value: { kind: "Variable", name: { kind: "Name", value: "input" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "slug" } },
                { kind: "Field", name: { kind: "Name", value: "updatedAt" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<UpdateSkillMutation, UpdateSkillMutationVariables>;
export const DeleteSkillDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "DeleteSkill" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "deleteSkill" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: { kind: "Variable", name: { kind: "Name", value: "id" } },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<DeleteSkillMutation, DeleteSkillMutationVariables>;
export const AdminLinksDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "AdminLinks" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "socialLinks" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "platform" } },
                { kind: "Field", name: { kind: "Name", value: "label" } },
                { kind: "Field", name: { kind: "Name", value: "url" } },
                { kind: "Field", name: { kind: "Name", value: "sortOrder" } },
                { kind: "Field", name: { kind: "Name", value: "updatedAt" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<AdminLinksQuery, AdminLinksQueryVariables>;
export const CreateSocialLinkDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "CreateSocialLink" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "input" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "CreateSocialLinkInput" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "createSocialLink" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "input" },
                value: { kind: "Variable", name: { kind: "Name", value: "input" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "label" } },
                { kind: "Field", name: { kind: "Name", value: "updatedAt" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<CreateSocialLinkMutation, CreateSocialLinkMutationVariables>;
export const UpdateSocialLinkDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "UpdateSocialLink" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "input" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "UpdateSocialLinkInput" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "updateSocialLink" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: { kind: "Variable", name: { kind: "Name", value: "id" } },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "input" },
                value: { kind: "Variable", name: { kind: "Name", value: "input" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "label" } },
                { kind: "Field", name: { kind: "Name", value: "updatedAt" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<UpdateSocialLinkMutation, UpdateSocialLinkMutationVariables>;
export const DeleteSocialLinkDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "DeleteSocialLink" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "deleteSocialLink" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: { kind: "Variable", name: { kind: "Name", value: "id" } },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<DeleteSocialLinkMutation, DeleteSocialLinkMutationVariables>;
export const AdminAssetsDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "AdminAssets" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "assets" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "FragmentSpread", name: { kind: "Name", value: "AssetPicker" } },
              ],
            },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "AssetPicker" },
      typeCondition: { kind: "NamedType", name: { kind: "Name", value: "AssetObject" } },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "originalName" } },
          { kind: "Field", name: { kind: "Name", value: "mimeType" } },
          { kind: "Field", name: { kind: "Name", value: "size" } },
          { kind: "Field", name: { kind: "Name", value: "url" } },
          { kind: "Field", name: { kind: "Name", value: "createdAt" } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<AdminAssetsQuery, AdminAssetsQueryVariables>;
export const DeleteAssetDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "DeleteAsset" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "deleteAsset" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: { kind: "Variable", name: { kind: "Name", value: "id" } },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<DeleteAssetMutation, DeleteAssetMutationVariables>;
export const PortfolioPageDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "PortfolioPage" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "profile" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "fullName" } },
                { kind: "Field", name: { kind: "Name", value: "headlineEn" } },
                { kind: "Field", name: { kind: "Name", value: "headlineRu" } },
                { kind: "Field", name: { kind: "Name", value: "summaryEn" } },
                { kind: "Field", name: { kind: "Name", value: "summaryRu" } },
                { kind: "Field", name: { kind: "Name", value: "email" } },
                { kind: "Field", name: { kind: "Name", value: "githubUrl" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "avatar" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "url" } },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "resume" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "url" } },
                      { kind: "Field", name: { kind: "Name", value: "originalName" } },
                    ],
                  },
                },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "projects" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "featured" },
                value: { kind: "BooleanValue", value: true },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [{ kind: "FragmentSpread", name: { kind: "Name", value: "ProjectRow" } }],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "experiences" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "company" } },
                { kind: "Field", name: { kind: "Name", value: "roleEn" } },
                { kind: "Field", name: { kind: "Name", value: "roleRu" } },
                { kind: "Field", name: { kind: "Name", value: "descriptionEn" } },
                { kind: "Field", name: { kind: "Name", value: "descriptionRu" } },
                { kind: "Field", name: { kind: "Name", value: "startDate" } },
                { kind: "Field", name: { kind: "Name", value: "endDate" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "skills" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "name" } },
                    ],
                  },
                },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "skills" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "name" } },
                { kind: "Field", name: { kind: "Name", value: "category" } },
                { kind: "Field", name: { kind: "Name", value: "sortOrder" } },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "socialLinks" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "platform" } },
                { kind: "Field", name: { kind: "Name", value: "label" } },
                { kind: "Field", name: { kind: "Name", value: "url" } },
              ],
            },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "ProjectRow" },
      typeCondition: { kind: "NamedType", name: { kind: "Name", value: "ProjectObject" } },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "slug" } },
          { kind: "Field", name: { kind: "Name", value: "titleEn" } },
          { kind: "Field", name: { kind: "Name", value: "titleRu" } },
          { kind: "Field", name: { kind: "Name", value: "summaryEn" } },
          { kind: "Field", name: { kind: "Name", value: "summaryRu" } },
          { kind: "Field", name: { kind: "Name", value: "repoUrl" } },
          { kind: "Field", name: { kind: "Name", value: "liveUrl" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "image" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "url" } },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "skills" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "name" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<PortfolioPageQuery, PortfolioPageQueryVariables>;
