import React, { Suspense } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { getHeroListQuery } from '../queries';

const HeroListComponent = () => {
  const { data } = useQuery(getHeroListQuery, { suspend: true });

  if (data == null) {
    return null;
  }

  return (
    <ul>
      {data.heroes.map((hero) => (
        <li key={hero.id}>
          {hero.name} <i>— {hero.town.name}</i> ({hero.movementPoints})
        </li>
      ))}
    </ul>
  );
};

export const HeroList = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <HeroListComponent />
  </Suspense>
);
