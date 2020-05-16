import React, { useState } from 'react';
import { Form } from 'semantic-ui-react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { toast } from 'react-toastify';
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
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await addHero({
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
    } catch (e) {
      toast.error('Save error');
    }
  };

  return (
    <Form onSubmit={submitHandler}>
      <Form.Input label="Name" type="text" value={name} onChange={(e) => setName(e.target.value)} />
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
      <Form.Button color="green" fluid>
        Add Hero
      </Form.Button>
    </Form>
  );
};
