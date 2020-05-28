import { Field, ObjectType, Int, ID } from 'type-graphql';
import { TownSchema, ITown } from './Town.schema';

@ObjectType({ description: "The Hero is Type" })
export class HeroSchema {
  @Field((type) => ID)
  id: string;

  @Field()
  name: string;

  @Field((type) => Int)
  movementPoints: number;

  @Field((type) => ID)
  townId: string;

  @Field((type) => TownSchema)
  town: TownSchema;
}

export interface IHero {
  id: string;
  name: string;
  movementPoints: number;
  townId: string;
  town: ITown;
}