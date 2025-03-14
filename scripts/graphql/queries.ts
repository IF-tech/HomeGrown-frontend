// scripts/graphql/queries.ts

import { gql } from "@apollo/client";

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

export const GET_FARM_BY_ID = gql`
  query GetFarm($id: ID!) {
    getFarm(id: $id) {
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