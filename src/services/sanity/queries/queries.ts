import { gql } from '@apollo/client';

export const GET_PROJECTS = gql`
  query getAllProjects {
    allProject {
      _id
      title
      projectCategory {
        name
      }
      coverImage {
        asset {
          url
        }
      }
      slug {
        current
      }
      description
      publishedAt
      tags {
        title
      }
      weblinks {
        _key

        type {
          title
        }
        url
      }
    }
  }
`;
