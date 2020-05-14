import React, { Suspense, useState } from 'react';
import { Form } from 'semantic-ui-react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { getTownListQuery, addHeroQuery } from '../queries';

export const HeroForm = () => {
  const { data } = useQuery(getTownListQuery);
  const [addHero] = useMutation(addHeroQuery);

  const [name, setName] = useState();
  const [movementPoints, setPoints] = useState();
  const [townId, setTownId] = useState();

  if (data == null) {
    return null;
  }

  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault();
        addHero({ variables: { movementPoints: Number(movementPoints), name, townId } });
        setName('');
        setPoints('');
        setTownId('');
      }}
    >
      <Form.Group widths="equal">
        <Form.Input label="Name" value={name} onChange={(e) => setName(e.target.value)} />
        <Form.Input label="Points" value={movementPoints} onChange={(e) => setPoints(e.target.value)} />
        <Suspense fallback={<div>Loading...</div>}>
          <Form.Select
            fluid
            label="Town"
            value={townId}
            options={data.towns.map((town) => ({
              key: town.id,
              text: town.name,
              value: town.id,
            }))}
            onChange={(e, { value }) => setTownId(value)}
          />
        </Suspense>
      </Form.Group>
      <Form.Button color="green">Save Hero</Form.Button>
    </Form>
  );
};
