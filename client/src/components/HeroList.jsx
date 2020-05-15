import React, { Suspense } from 'react';
import { Header, List } from 'semantic-ui-react';
import { useQuery } from '@apollo/react-hooks';
import { getHeroListQuery } from '../queries';

const HeroListComponent = () => {
  const { data } = useQuery(getHeroListQuery, { suspend: true });

  if (data == null) {
    return null;
  }

  return (
    <List
      bulleted
      items={data.heroes.map((hero) => ({
        header: hero.name,
        description: hero.town.name,
      }))}
    />
  );
};

export const HeroList = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <Header as='h2' content="Heroes List"/>
    <HeroListComponent />
  </Suspense>
);
