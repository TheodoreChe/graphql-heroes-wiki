import { Field, ObjectType, ID } from 'type-graphql';
import { Hero } from './Hero';

@ObjectType()
export class Town {
  @Field((type) => ID)
  id: string;

  @Field()
  name: string;

  @Field((type) => Hero)
  heroes: Hero[];
}
