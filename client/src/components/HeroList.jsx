import React, { Suspense } from 'react';
import { Table, Label, Pagination } from 'semantic-ui-react';
import { useQuery } from '@apollo/react-hooks';
import { GET_HERO_LIST_QUERY } from '../queries';
import { PlaceholderList } from './PlaceHolders';

const HeroListComponent = () => {
  const { data, client } = useQuery(GET_HERO_LIST_QUERY, { suspend: true });

  if (data == null) return <PlaceholderList />;

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
      <Table.Footer>
        <Table.Row>
          <Table.HeaderCell colSpan='2'>
            <Pagination
              boundaryRange={0}
              defaultActivePage={1}
              firstItem={null}
              lastItem={null}
              siblingRange={1}
              totalPages={6}
              prevItem={null}
              nextItem={null}
            />
          </Table.HeaderCell>
        </Table.Row>
      </Table.Footer>
    </Table>
  );
};

export const HeroList = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <HeroListComponent />
  </Suspense>
);
