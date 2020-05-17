import React from 'react';
import { Form } from 'semantic-ui-react';
import { useForm, Controller } from 'react-hook-form';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { toast } from 'react-toastify';
import { getTownListQuery, addHeroQuery, getHeroListQuery } from '../queries';

export const HeroForm = () => {
  const { register, handleSubmit, errors, control } = useForm();

  const { data } = useQuery(getTownListQuery);
  const [addHero] = useMutation(addHeroQuery);

  if (data == null) {
    return null;
  }

  const onSubmit = async ({ movementPoints, name, townId }, e) => {
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
      e.target.reset();
    } catch (e) {
      toast.error('Save error');
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Form.Field error={errors.name}>
        <label>Name</label>
        <input name="name" ref={register({ required: true })} className={errors.name && 'red'} />
      </Form.Field>
      <Form.Field error={errors.movementPoints}>
        <label>Movement Points</label>
        <input type="number" name="movementPoints" ref={register({ required: true })} />
      </Form.Field>
      <Controller
        as={Form.Select}
        label="Town"
        name="townId"
        control={control}
        options={data.towns.map((town) => ({
          key: town.id,
          text: town.name,
          value: town.id,
        }))}
        onChange={([_, { value }]) => value}
      />
      <Form.Button color="green" fluid content="Add Hero" icon="save" />
    </Form>
  );
};
