import { graphql } from "../../gql";

export const ProjectRowFragment = graphql(`
  fragment ProjectRow on ProjectObject {
    id
    slug
    titleEn
    titleRu
    summaryEn
    summaryRu
    repoUrl
    liveUrl
    image {
      id
      url
    }
    skills {
      id
      name
    }
  }
`);

export const PortfolioPageQuery = graphql(`
  query PortfolioPage {
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
        id
        url
      }
      resume {
        id
        url
        originalName
      }
    }
    projects(featured: true) {
      ...ProjectRow
    }
    experiences {
      id
      company
      roleEn
      roleRu
      descriptionEn
      descriptionRu
      startDate
      endDate
      skills {
        id
        name
      }
    }
    skills {
      id
      name
      category
      sortOrder
    }
    socialLinks {
      id
      platform
      label
      url
    }
  }
`);
