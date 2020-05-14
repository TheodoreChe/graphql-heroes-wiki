import React, { Suspense } from 'react';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';

const getHeroListQuery = gql`
    {
        heroes {
            id
            name
            town{
                name
            }
        }
    }
`;

const HeroListComponent = () => {
  const { data } = useQuery(getHeroListQuery, { suspend: true });

  if (data == null) {
    return null;
  }

  return (
    <ul>
      {data.heroes.map(hero => (
        <li key={hero.id}>{hero.name} <i>— {hero.town.name}</i></li>
      ))}
    </ul>
  );
};

export const HeroList = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <HeroListComponent />
  </Suspense>
);