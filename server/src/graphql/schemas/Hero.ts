import { Field, ObjectType, Int, ID } from 'type-graphql';
import { Town } from './Town';

@ObjectType()
export class Hero {
  @Field((type) => ID)
  id: string;

  @Field()
  name: string;

  @Field((type) => Int)
  movementPoints: number;

  @Field((type) => Town)
  town: Town;
}
