// graphql/queries.ts
import { gql } from '@apollo/client';

export const GET_ALL_FARMS = gql`
  query GetAllFarms {
    getAllFarms {
      id
      farmName
      ownerName
      address
      latitude
      longitude
      pictures
      description
      tags
      ratings
      products {
        id
        name
        availability
        quantity
        price
        pictures
      }
    }
  }
`;