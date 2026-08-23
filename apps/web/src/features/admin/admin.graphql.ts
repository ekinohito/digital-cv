import { graphql } from "../../gql";

export const AssetPickerFragment = graphql(`
  fragment AssetPicker on AssetObject {
    id
    originalName
    mimeType
    size
    url
    createdAt
  }
`);

export const AdminAccessQuery = graphql(`
  query AdminAccess {
    adminAccess
  }
`);

export const AdminProfileQuery = graphql(`
  query AdminProfile {
    profile {
      id
      fullName
      headlineEn
      headlineRu
      summaryEn
      summaryRu
      email
      githubUrl
      avatar {
        ...AssetPicker
      }
      resume {
        ...AssetPicker
      }
      updatedAt
    }
  }
`);

export const UpdateProfileMutation = graphql(`
  mutation UpdateProfile($input: UpdateProfileInput!) {
    updateProfile(input: $input) {
      id
      fullName
      headlineEn
      headlineRu
      summaryEn
      summaryRu
      email
      githubUrl
      avatar {
        ...AssetPicker
      }
      resume {
        ...AssetPicker
      }
      updatedAt
    }
  }
`);

export const AdminExperiencesQuery = graphql(`
  query AdminExperiences {
    experiences {
      id
      company
      roleEn
      roleRu
      descriptionEn
      descriptionRu
      startDate
      endDate
      sortOrder
      skills {
        id
        name
      }
      updatedAt
    }
  }
`);

export const CreateExperienceMutation = graphql(`
  mutation CreateExperience($input: CreateExperienceInput!) {
    createExperience(input: $input) {
      id
      company
      updatedAt
    }
  }
`);

export const UpdateExperienceMutation = graphql(`
  mutation UpdateExperience($id: ID!, $input: UpdateExperienceInput!) {
    updateExperience(id: $id, input: $input) {
      id
      company
      updatedAt
    }
  }
`);

export const DeleteExperienceMutation = graphql(`
  mutation DeleteExperience($id: ID!) {
    deleteExperience(id: $id)
  }
`);

export const AdminProjectsQuery = graphql(`
  query AdminProjects {
    projects {
      id
      slug
      titleEn
      titleRu
      summaryEn
      summaryRu
      detailsEn
      detailsRu
      repoUrl
      liveUrl
      featured
      sortOrder
      image {
        ...AssetPicker
      }
      skills {
        id
        name
      }
      updatedAt
    }
  }
`);

export const CreateProjectMutation = graphql(`
  mutation CreateProject($input: CreateProjectInput!) {
    createProject(input: $input) {
      id
      slug
      updatedAt
    }
  }
`);

export const UpdateProjectMutation = graphql(`
  mutation UpdateProject($id: ID!, $input: UpdateProjectInput!) {
    updateProject(id: $id, input: $input) {
      id
      slug
      updatedAt
    }
  }
`);

export const DeleteProjectMutation = graphql(`
  mutation DeleteProject($id: ID!) {
    deleteProject(id: $id)
  }
`);

export const AdminSkillsQuery = graphql(`
  query AdminSkills {
    skills {
      id
      slug
      name
      category
      sortOrder
      updatedAt
    }
  }
`);

export const CreateSkillMutation = graphql(`
  mutation CreateSkill($input: CreateSkillInput!) {
    createSkill(input: $input) {
      id
      slug
      updatedAt
    }
  }
`);

export const UpdateSkillMutation = graphql(`
  mutation UpdateSkill($id: ID!, $input: UpdateSkillInput!) {
    updateSkill(id: $id, input: $input) {
      id
      slug
      updatedAt
    }
  }
`);

export const DeleteSkillMutation = graphql(`
  mutation DeleteSkill($id: ID!) {
    deleteSkill(id: $id)
  }
`);

export const AdminLinksQuery = graphql(`
  query AdminLinks {
    socialLinks {
      id
      platform
      label
      url
      sortOrder
      updatedAt
    }
  }
`);

export const CreateSocialLinkMutation = graphql(`
  mutation CreateSocialLink($input: CreateSocialLinkInput!) {
    createSocialLink(input: $input) {
      id
      label
      updatedAt
    }
  }
`);

export const UpdateSocialLinkMutation = graphql(`
  mutation UpdateSocialLink($id: ID!, $input: UpdateSocialLinkInput!) {
    updateSocialLink(id: $id, input: $input) {
      id
      label
      updatedAt
    }
  }
`);

export const DeleteSocialLinkMutation = graphql(`
  mutation DeleteSocialLink($id: ID!) {
    deleteSocialLink(id: $id)
  }
`);

export const AdminAssetsQuery = graphql(`
  query AdminAssets {
    assets {
      ...AssetPicker
    }
  }
`);

export const DeleteAssetMutation = graphql(`
  mutation DeleteAsset($id: ID!) {
    deleteAsset(id: $id)
  }
`);
