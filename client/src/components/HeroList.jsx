import React, { Suspense } from 'react';
import { Table } from 'semantic-ui-react';
import { useQuery } from '@apollo/react-hooks';
import { getHeroListQuery } from '../queries';

const HeroListComponent = () => {
  const { data } = useQuery(getHeroListQuery, { suspend: true });

  if (data == null) {
    return null;
  }

  return (
    <Table
      headerRow={['Name', 'Town']}
      tableData={data.heroes.map((hero) => [hero.name, hero.town.name])}
      renderBodyRow={(i) => i}
    />
  );
};

export const HeroList = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <HeroListComponent />
  </Suspense>
);
