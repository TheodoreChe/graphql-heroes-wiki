import React, { useState } from 'react';
import { Form, Header } from 'semantic-ui-react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { getTownListQuery, addHeroQuery, getHeroListQuery } from '../queries';

export const HeroForm = () => {
  const { data } = useQuery(getTownListQuery);
  const [addHero] = useMutation(addHeroQuery);

  const [name, setName] = useState();
  const [movementPoints, setPoints] = useState();
  const [townId, setTownId] = useState();

  if (data == null) {
    return null;
  }
  const submitHandler = (e) => {
    e.preventDefault();
    addHero({
      variables: {
        movementPoints: Number(movementPoints),
        name,
        townId,
      },
      refetchQueries: [
        {
          query: getHeroListQuery,
        },
      ],
    });
    setName('');
    setPoints('');
    setTownId('');
  };

  return (
    <Form onSubmit={submitHandler}>
      <Header as='h2' content="Add Hero"/>
      <Form.Input
        label="Name"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Form.Input
        label="Points"
        type="number"
        value={movementPoints}
        onChange={(e) => setPoints(e.target.value)}
      />
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
      <Form.Button color="green">Save Hero</Form.Button>
    </Form>
  );
};
