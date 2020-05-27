import { Field, ObjectType, Int, ID } from 'type-graphql';
import { TownSchema } from './TownSchema';

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
