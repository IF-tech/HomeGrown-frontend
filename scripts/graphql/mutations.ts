// src/graphql/mutations.js
import { gql } from "@apollo/client";

export const CREATE_FARM = gql`
  mutation CreateFarm($input: FarmInput!) {
    createFarm(input: $input) {
      id
      farmName
      address
      latitude
      longitude
      ratings
    }
  }
`;