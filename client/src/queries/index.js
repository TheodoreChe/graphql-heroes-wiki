import { gql } from 'apollo-boost';

export const ADD_HERO_QUERY = gql`
  mutation addHero($movementPoints: Int!, $name: String!, $townId: String!) {
    addHero(movementPoints: $movementPoints, name: $name, townId: $townId) {
      name
    }
  }
`;

export const GET_TOWN_LIST_QUERY = gql`
  {
    towns {
      id
      name
    }
  }
`;

export const GET_HERO_LIST_QUERY = gql`
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

export const GET_HERO_QUERY = gql`
  query Hero($id: ID!) {
    hero(id: $id) {
      name
      town {
        name
      }
    }
  }
`;

export const HERO_ID = gql`
    query heroId {
        heroId @client
    }
`;
