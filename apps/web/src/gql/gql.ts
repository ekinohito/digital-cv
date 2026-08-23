/* eslint-disable */
import * as types from "./graphql";
import type { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
  "\n  fragment AssetPicker on AssetObject {\n    id\n    originalName\n    mimeType\n    size\n    url\n    createdAt\n  }\n": typeof types.AssetPickerFragmentDoc;
  "\n  query AdminAccess {\n    adminAccess\n  }\n": typeof types.AdminAccessDocument;
  "\n  query AdminProfile {\n    profile {\n      id\n      fullName\n      headlineEn\n      headlineRu\n      summaryEn\n      summaryRu\n      email\n      githubUrl\n      avatar {\n        ...AssetPicker\n      }\n      resume {\n        ...AssetPicker\n      }\n      updatedAt\n    }\n  }\n": typeof types.AdminProfileDocument;
  "\n  mutation UpdateProfile($input: UpdateProfileInput!) {\n    updateProfile(input: $input) {\n      id\n      fullName\n      headlineEn\n      headlineRu\n      summaryEn\n      summaryRu\n      email\n      githubUrl\n      avatar {\n        ...AssetPicker\n      }\n      resume {\n        ...AssetPicker\n      }\n      updatedAt\n    }\n  }\n": typeof types.UpdateProfileDocument;
  "\n  query AdminExperiences {\n    experiences {\n      id\n      company\n      roleEn\n      roleRu\n      descriptionEn\n      descriptionRu\n      startDate\n      endDate\n      sortOrder\n      skills {\n        id\n        name\n      }\n      updatedAt\n    }\n  }\n": typeof types.AdminExperiencesDocument;
  "\n  mutation CreateExperience($input: CreateExperienceInput!) {\n    createExperience(input: $input) {\n      id\n      company\n      updatedAt\n    }\n  }\n": typeof types.CreateExperienceDocument;
  "\n  mutation UpdateExperience($id: ID!, $input: UpdateExperienceInput!) {\n    updateExperience(id: $id, input: $input) {\n      id\n      company\n      updatedAt\n    }\n  }\n": typeof types.UpdateExperienceDocument;
  "\n  mutation DeleteExperience($id: ID!) {\n    deleteExperience(id: $id)\n  }\n": typeof types.DeleteExperienceDocument;
  "\n  query AdminProjects {\n    projects {\n      id\n      slug\n      titleEn\n      titleRu\n      summaryEn\n      summaryRu\n      detailsEn\n      detailsRu\n      repoUrl\n      liveUrl\n      featured\n      sortOrder\n      image {\n        ...AssetPicker\n      }\n      skills {\n        id\n        name\n      }\n      updatedAt\n    }\n  }\n": typeof types.AdminProjectsDocument;
  "\n  mutation CreateProject($input: CreateProjectInput!) {\n    createProject(input: $input) {\n      id\n      slug\n      updatedAt\n    }\n  }\n": typeof types.CreateProjectDocument;
  "\n  mutation UpdateProject($id: ID!, $input: UpdateProjectInput!) {\n    updateProject(id: $id, input: $input) {\n      id\n      slug\n      updatedAt\n    }\n  }\n": typeof types.UpdateProjectDocument;
  "\n  mutation DeleteProject($id: ID!) {\n    deleteProject(id: $id)\n  }\n": typeof types.DeleteProjectDocument;
  "\n  query AdminSkills {\n    skills {\n      id\n      slug\n      name\n      category\n      sortOrder\n      updatedAt\n    }\n  }\n": typeof types.AdminSkillsDocument;
  "\n  mutation CreateSkill($input: CreateSkillInput!) {\n    createSkill(input: $input) {\n      id\n      slug\n      updatedAt\n    }\n  }\n": typeof types.CreateSkillDocument;
  "\n  mutation UpdateSkill($id: ID!, $input: UpdateSkillInput!) {\n    updateSkill(id: $id, input: $input) {\n      id\n      slug\n      updatedAt\n    }\n  }\n": typeof types.UpdateSkillDocument;
  "\n  mutation DeleteSkill($id: ID!) {\n    deleteSkill(id: $id)\n  }\n": typeof types.DeleteSkillDocument;
  "\n  query AdminLinks {\n    socialLinks {\n      id\n      platform\n      label\n      url\n      sortOrder\n      updatedAt\n    }\n  }\n": typeof types.AdminLinksDocument;
  "\n  mutation CreateSocialLink($input: CreateSocialLinkInput!) {\n    createSocialLink(input: $input) {\n      id\n      label\n      updatedAt\n    }\n  }\n": typeof types.CreateSocialLinkDocument;
  "\n  mutation UpdateSocialLink($id: ID!, $input: UpdateSocialLinkInput!) {\n    updateSocialLink(id: $id, input: $input) {\n      id\n      label\n      updatedAt\n    }\n  }\n": typeof types.UpdateSocialLinkDocument;
  "\n  mutation DeleteSocialLink($id: ID!) {\n    deleteSocialLink(id: $id)\n  }\n": typeof types.DeleteSocialLinkDocument;
  "\n  query AdminAssets {\n    assets {\n      ...AssetPicker\n    }\n  }\n": typeof types.AdminAssetsDocument;
  "\n  mutation DeleteAsset($id: ID!) {\n    deleteAsset(id: $id)\n  }\n": typeof types.DeleteAssetDocument;
  "\n  fragment ProjectRow on ProjectObject {\n    id\n    slug\n    titleEn\n    titleRu\n    summaryEn\n    summaryRu\n    repoUrl\n    liveUrl\n    image {\n      id\n      url\n    }\n    skills {\n      id\n      name\n    }\n  }\n": typeof types.ProjectRowFragmentDoc;
  "\n  query PortfolioPage {\n    profile {\n      id\n      fullName\n      headlineEn\n      headlineRu\n      summaryEn\n      summaryRu\n      email\n      githubUrl\n      avatar {\n        id\n        url\n      }\n      resume {\n        id\n        url\n        originalName\n      }\n    }\n    projects(featured: true) {\n      ...ProjectRow\n    }\n    experiences {\n      id\n      company\n      roleEn\n      roleRu\n      descriptionEn\n      descriptionRu\n      startDate\n      endDate\n      skills {\n        id\n        name\n      }\n    }\n    skills {\n      id\n      name\n      category\n      sortOrder\n    }\n    socialLinks {\n      id\n      platform\n      label\n      url\n    }\n  }\n": typeof types.PortfolioPageDocument;
};
const documents: Documents = {
  "\n  fragment AssetPicker on AssetObject {\n    id\n    originalName\n    mimeType\n    size\n    url\n    createdAt\n  }\n":
    types.AssetPickerFragmentDoc,
  "\n  query AdminAccess {\n    adminAccess\n  }\n": types.AdminAccessDocument,
  "\n  query AdminProfile {\n    profile {\n      id\n      fullName\n      headlineEn\n      headlineRu\n      summaryEn\n      summaryRu\n      email\n      githubUrl\n      avatar {\n        ...AssetPicker\n      }\n      resume {\n        ...AssetPicker\n      }\n      updatedAt\n    }\n  }\n":
    types.AdminProfileDocument,
  "\n  mutation UpdateProfile($input: UpdateProfileInput!) {\n    updateProfile(input: $input) {\n      id\n      fullName\n      headlineEn\n      headlineRu\n      summaryEn\n      summaryRu\n      email\n      githubUrl\n      avatar {\n        ...AssetPicker\n      }\n      resume {\n        ...AssetPicker\n      }\n      updatedAt\n    }\n  }\n":
    types.UpdateProfileDocument,
  "\n  query AdminExperiences {\n    experiences {\n      id\n      company\n      roleEn\n      roleRu\n      descriptionEn\n      descriptionRu\n      startDate\n      endDate\n      sortOrder\n      skills {\n        id\n        name\n      }\n      updatedAt\n    }\n  }\n":
    types.AdminExperiencesDocument,
  "\n  mutation CreateExperience($input: CreateExperienceInput!) {\n    createExperience(input: $input) {\n      id\n      company\n      updatedAt\n    }\n  }\n":
    types.CreateExperienceDocument,
  "\n  mutation UpdateExperience($id: ID!, $input: UpdateExperienceInput!) {\n    updateExperience(id: $id, input: $input) {\n      id\n      company\n      updatedAt\n    }\n  }\n":
    types.UpdateExperienceDocument,
  "\n  mutation DeleteExperience($id: ID!) {\n    deleteExperience(id: $id)\n  }\n":
    types.DeleteExperienceDocument,
  "\n  query AdminProjects {\n    projects {\n      id\n      slug\n      titleEn\n      titleRu\n      summaryEn\n      summaryRu\n      detailsEn\n      detailsRu\n      repoUrl\n      liveUrl\n      featured\n      sortOrder\n      image {\n        ...AssetPicker\n      }\n      skills {\n        id\n        name\n      }\n      updatedAt\n    }\n  }\n":
    types.AdminProjectsDocument,
  "\n  mutation CreateProject($input: CreateProjectInput!) {\n    createProject(input: $input) {\n      id\n      slug\n      updatedAt\n    }\n  }\n":
    types.CreateProjectDocument,
  "\n  mutation UpdateProject($id: ID!, $input: UpdateProjectInput!) {\n    updateProject(id: $id, input: $input) {\n      id\n      slug\n      updatedAt\n    }\n  }\n":
    types.UpdateProjectDocument,
  "\n  mutation DeleteProject($id: ID!) {\n    deleteProject(id: $id)\n  }\n":
    types.DeleteProjectDocument,
  "\n  query AdminSkills {\n    skills {\n      id\n      slug\n      name\n      category\n      sortOrder\n      updatedAt\n    }\n  }\n":
    types.AdminSkillsDocument,
  "\n  mutation CreateSkill($input: CreateSkillInput!) {\n    createSkill(input: $input) {\n      id\n      slug\n      updatedAt\n    }\n  }\n":
    types.CreateSkillDocument,
  "\n  mutation UpdateSkill($id: ID!, $input: UpdateSkillInput!) {\n    updateSkill(id: $id, input: $input) {\n      id\n      slug\n      updatedAt\n    }\n  }\n":
    types.UpdateSkillDocument,
  "\n  mutation DeleteSkill($id: ID!) {\n    deleteSkill(id: $id)\n  }\n":
    types.DeleteSkillDocument,
  "\n  query AdminLinks {\n    socialLinks {\n      id\n      platform\n      label\n      url\n      sortOrder\n      updatedAt\n    }\n  }\n":
    types.AdminLinksDocument,
  "\n  mutation CreateSocialLink($input: CreateSocialLinkInput!) {\n    createSocialLink(input: $input) {\n      id\n      label\n      updatedAt\n    }\n  }\n":
    types.CreateSocialLinkDocument,
  "\n  mutation UpdateSocialLink($id: ID!, $input: UpdateSocialLinkInput!) {\n    updateSocialLink(id: $id, input: $input) {\n      id\n      label\n      updatedAt\n    }\n  }\n":
    types.UpdateSocialLinkDocument,
  "\n  mutation DeleteSocialLink($id: ID!) {\n    deleteSocialLink(id: $id)\n  }\n":
    types.DeleteSocialLinkDocument,
  "\n  query AdminAssets {\n    assets {\n      ...AssetPicker\n    }\n  }\n":
    types.AdminAssetsDocument,
  "\n  mutation DeleteAsset($id: ID!) {\n    deleteAsset(id: $id)\n  }\n":
    types.DeleteAssetDocument,
  "\n  fragment ProjectRow on ProjectObject {\n    id\n    slug\n    titleEn\n    titleRu\n    summaryEn\n    summaryRu\n    repoUrl\n    liveUrl\n    image {\n      id\n      url\n    }\n    skills {\n      id\n      name\n    }\n  }\n":
    types.ProjectRowFragmentDoc,
  "\n  query PortfolioPage {\n    profile {\n      id\n      fullName\n      headlineEn\n      headlineRu\n      summaryEn\n      summaryRu\n      email\n      githubUrl\n      avatar {\n        id\n        url\n      }\n      resume {\n        id\n        url\n        originalName\n      }\n    }\n    projects(featured: true) {\n      ...ProjectRow\n    }\n    experiences {\n      id\n      company\n      roleEn\n      roleRu\n      descriptionEn\n      descriptionRu\n      startDate\n      endDate\n      skills {\n        id\n        name\n      }\n    }\n    skills {\n      id\n      name\n      category\n      sortOrder\n    }\n    socialLinks {\n      id\n      platform\n      label\n      url\n    }\n  }\n":
    types.PortfolioPageDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  fragment AssetPicker on AssetObject {\n    id\n    originalName\n    mimeType\n    size\n    url\n    createdAt\n  }\n",
): (typeof documents)["\n  fragment AssetPicker on AssetObject {\n    id\n    originalName\n    mimeType\n    size\n    url\n    createdAt\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query AdminAccess {\n    adminAccess\n  }\n",
): (typeof documents)["\n  query AdminAccess {\n    adminAccess\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query AdminProfile {\n    profile {\n      id\n      fullName\n      headlineEn\n      headlineRu\n      summaryEn\n      summaryRu\n      email\n      githubUrl\n      avatar {\n        ...AssetPicker\n      }\n      resume {\n        ...AssetPicker\n      }\n      updatedAt\n    }\n  }\n",
): (typeof documents)["\n  query AdminProfile {\n    profile {\n      id\n      fullName\n      headlineEn\n      headlineRu\n      summaryEn\n      summaryRu\n      email\n      githubUrl\n      avatar {\n        ...AssetPicker\n      }\n      resume {\n        ...AssetPicker\n      }\n      updatedAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  mutation UpdateProfile($input: UpdateProfileInput!) {\n    updateProfile(input: $input) {\n      id\n      fullName\n      headlineEn\n      headlineRu\n      summaryEn\n      summaryRu\n      email\n      githubUrl\n      avatar {\n        ...AssetPicker\n      }\n      resume {\n        ...AssetPicker\n      }\n      updatedAt\n    }\n  }\n",
): (typeof documents)["\n  mutation UpdateProfile($input: UpdateProfileInput!) {\n    updateProfile(input: $input) {\n      id\n      fullName\n      headlineEn\n      headlineRu\n      summaryEn\n      summaryRu\n      email\n      githubUrl\n      avatar {\n        ...AssetPicker\n      }\n      resume {\n        ...AssetPicker\n      }\n      updatedAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query AdminExperiences {\n    experiences {\n      id\n      company\n      roleEn\n      roleRu\n      descriptionEn\n      descriptionRu\n      startDate\n      endDate\n      sortOrder\n      skills {\n        id\n        name\n      }\n      updatedAt\n    }\n  }\n",
): (typeof documents)["\n  query AdminExperiences {\n    experiences {\n      id\n      company\n      roleEn\n      roleRu\n      descriptionEn\n      descriptionRu\n      startDate\n      endDate\n      sortOrder\n      skills {\n        id\n        name\n      }\n      updatedAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  mutation CreateExperience($input: CreateExperienceInput!) {\n    createExperience(input: $input) {\n      id\n      company\n      updatedAt\n    }\n  }\n",
): (typeof documents)["\n  mutation CreateExperience($input: CreateExperienceInput!) {\n    createExperience(input: $input) {\n      id\n      company\n      updatedAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  mutation UpdateExperience($id: ID!, $input: UpdateExperienceInput!) {\n    updateExperience(id: $id, input: $input) {\n      id\n      company\n      updatedAt\n    }\n  }\n",
): (typeof documents)["\n  mutation UpdateExperience($id: ID!, $input: UpdateExperienceInput!) {\n    updateExperience(id: $id, input: $input) {\n      id\n      company\n      updatedAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  mutation DeleteExperience($id: ID!) {\n    deleteExperience(id: $id)\n  }\n",
): (typeof documents)["\n  mutation DeleteExperience($id: ID!) {\n    deleteExperience(id: $id)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query AdminProjects {\n    projects {\n      id\n      slug\n      titleEn\n      titleRu\n      summaryEn\n      summaryRu\n      detailsEn\n      detailsRu\n      repoUrl\n      liveUrl\n      featured\n      sortOrder\n      image {\n        ...AssetPicker\n      }\n      skills {\n        id\n        name\n      }\n      updatedAt\n    }\n  }\n",
): (typeof documents)["\n  query AdminProjects {\n    projects {\n      id\n      slug\n      titleEn\n      titleRu\n      summaryEn\n      summaryRu\n      detailsEn\n      detailsRu\n      repoUrl\n      liveUrl\n      featured\n      sortOrder\n      image {\n        ...AssetPicker\n      }\n      skills {\n        id\n        name\n      }\n      updatedAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  mutation CreateProject($input: CreateProjectInput!) {\n    createProject(input: $input) {\n      id\n      slug\n      updatedAt\n    }\n  }\n",
): (typeof documents)["\n  mutation CreateProject($input: CreateProjectInput!) {\n    createProject(input: $input) {\n      id\n      slug\n      updatedAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  mutation UpdateProject($id: ID!, $input: UpdateProjectInput!) {\n    updateProject(id: $id, input: $input) {\n      id\n      slug\n      updatedAt\n    }\n  }\n",
): (typeof documents)["\n  mutation UpdateProject($id: ID!, $input: UpdateProjectInput!) {\n    updateProject(id: $id, input: $input) {\n      id\n      slug\n      updatedAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  mutation DeleteProject($id: ID!) {\n    deleteProject(id: $id)\n  }\n",
): (typeof documents)["\n  mutation DeleteProject($id: ID!) {\n    deleteProject(id: $id)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query AdminSkills {\n    skills {\n      id\n      slug\n      name\n      category\n      sortOrder\n      updatedAt\n    }\n  }\n",
): (typeof documents)["\n  query AdminSkills {\n    skills {\n      id\n      slug\n      name\n      category\n      sortOrder\n      updatedAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  mutation CreateSkill($input: CreateSkillInput!) {\n    createSkill(input: $input) {\n      id\n      slug\n      updatedAt\n    }\n  }\n",
): (typeof documents)["\n  mutation CreateSkill($input: CreateSkillInput!) {\n    createSkill(input: $input) {\n      id\n      slug\n      updatedAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  mutation UpdateSkill($id: ID!, $input: UpdateSkillInput!) {\n    updateSkill(id: $id, input: $input) {\n      id\n      slug\n      updatedAt\n    }\n  }\n",
): (typeof documents)["\n  mutation UpdateSkill($id: ID!, $input: UpdateSkillInput!) {\n    updateSkill(id: $id, input: $input) {\n      id\n      slug\n      updatedAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  mutation DeleteSkill($id: ID!) {\n    deleteSkill(id: $id)\n  }\n",
): (typeof documents)["\n  mutation DeleteSkill($id: ID!) {\n    deleteSkill(id: $id)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query AdminLinks {\n    socialLinks {\n      id\n      platform\n      label\n      url\n      sortOrder\n      updatedAt\n    }\n  }\n",
): (typeof documents)["\n  query AdminLinks {\n    socialLinks {\n      id\n      platform\n      label\n      url\n      sortOrder\n      updatedAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  mutation CreateSocialLink($input: CreateSocialLinkInput!) {\n    createSocialLink(input: $input) {\n      id\n      label\n      updatedAt\n    }\n  }\n",
): (typeof documents)["\n  mutation CreateSocialLink($input: CreateSocialLinkInput!) {\n    createSocialLink(input: $input) {\n      id\n      label\n      updatedAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  mutation UpdateSocialLink($id: ID!, $input: UpdateSocialLinkInput!) {\n    updateSocialLink(id: $id, input: $input) {\n      id\n      label\n      updatedAt\n    }\n  }\n",
): (typeof documents)["\n  mutation UpdateSocialLink($id: ID!, $input: UpdateSocialLinkInput!) {\n    updateSocialLink(id: $id, input: $input) {\n      id\n      label\n      updatedAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  mutation DeleteSocialLink($id: ID!) {\n    deleteSocialLink(id: $id)\n  }\n",
): (typeof documents)["\n  mutation DeleteSocialLink($id: ID!) {\n    deleteSocialLink(id: $id)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query AdminAssets {\n    assets {\n      ...AssetPicker\n    }\n  }\n",
): (typeof documents)["\n  query AdminAssets {\n    assets {\n      ...AssetPicker\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  mutation DeleteAsset($id: ID!) {\n    deleteAsset(id: $id)\n  }\n",
): (typeof documents)["\n  mutation DeleteAsset($id: ID!) {\n    deleteAsset(id: $id)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  fragment ProjectRow on ProjectObject {\n    id\n    slug\n    titleEn\n    titleRu\n    summaryEn\n    summaryRu\n    repoUrl\n    liveUrl\n    image {\n      id\n      url\n    }\n    skills {\n      id\n      name\n    }\n  }\n",
): (typeof documents)["\n  fragment ProjectRow on ProjectObject {\n    id\n    slug\n    titleEn\n    titleRu\n    summaryEn\n    summaryRu\n    repoUrl\n    liveUrl\n    image {\n      id\n      url\n    }\n    skills {\n      id\n      name\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query PortfolioPage {\n    profile {\n      id\n      fullName\n      headlineEn\n      headlineRu\n      summaryEn\n      summaryRu\n      email\n      githubUrl\n      avatar {\n        id\n        url\n      }\n      resume {\n        id\n        url\n        originalName\n      }\n    }\n    projects(featured: true) {\n      ...ProjectRow\n    }\n    experiences {\n      id\n      company\n      roleEn\n      roleRu\n      descriptionEn\n      descriptionRu\n      startDate\n      endDate\n      skills {\n        id\n        name\n      }\n    }\n    skills {\n      id\n      name\n      category\n      sortOrder\n    }\n    socialLinks {\n      id\n      platform\n      label\n      url\n    }\n  }\n",
): (typeof documents)["\n  query PortfolioPage {\n    profile {\n      id\n      fullName\n      headlineEn\n      headlineRu\n      summaryEn\n      summaryRu\n      email\n      githubUrl\n      avatar {\n        id\n        url\n      }\n      resume {\n        id\n        url\n        originalName\n      }\n    }\n    projects(featured: true) {\n      ...ProjectRow\n    }\n    experiences {\n      id\n      company\n      roleEn\n      roleRu\n      descriptionEn\n      descriptionRu\n      startDate\n      endDate\n      skills {\n        id\n        name\n      }\n    }\n    skills {\n      id\n      name\n      category\n      sortOrder\n    }\n    socialLinks {\n      id\n      platform\n      label\n      url\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> =
  TDocumentNode extends DocumentNode<infer TType, any> ? TType : never;
