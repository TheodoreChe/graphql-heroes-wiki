import React from 'react';
import { Card } from 'semantic-ui-react';
import { useQuery } from '@apollo/react-hooks';
import { GET_HERO_QUERY, HERO_ID } from '../queries';

const HeroInfoComponent = React.memo(({ id }) => {
  const { data, loading } = useQuery(GET_HERO_QUERY, { variables: { id } });

  if (data == null || loading) return null;
  console.log(data);

  return <Card header={data.hero.name} meta={data.hero.town.name} />;
});

export const HeroInfo = () => {
  const { data } = useQuery(HERO_ID);

  if (data == null) return null;

  return <HeroInfoComponent id={data.heroId} />;
};
