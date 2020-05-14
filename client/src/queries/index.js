import { gql } from 'apollo-boost';

export const addHeroQuery = gql`
  mutation addHero($movementPoints: Int!, $name: String!, $townId: String!) {
    addHero(movementPoints: $movementPoints, name: $name, townId: $townId) {
      name
    }
  }
`;

export const getTownListQuery = gql`
  {
    towns {
      id
      name
    }
  }
`;

export const getHeroListQuery = gql`
  {
    heroes {
      id
      name
      movementPoints
      town {
        name
      }
    }
  }
`;
