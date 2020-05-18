import React, { Suspense } from 'react';
import { Table, Label } from 'semantic-ui-react';
import { useQuery } from '@apollo/react-hooks';
import { GET_HERO_LIST_QUERY } from '../queries';

const HeroListComponent = () => {
  const { data, client } = useQuery(GET_HERO_LIST_QUERY, { suspend: true });

  if (data == null) return null;

  return (
    <Table>
      <Table.Body>
        {data.heroes.map((hero) => (
          <Table.Row key={hero.id}>
            <Table.Cell>
              <Label
                as="a"
                content={hero.name}
                onClick={() => client.writeData({ data: { heroId: hero.id } })}
              />
            </Table.Cell>
            <Table.Cell>{hero.town.name}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
};

export const HeroList = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <HeroListComponent />
  </Suspense>
);
