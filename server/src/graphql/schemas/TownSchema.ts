import { Field, ObjectType, ID } from 'type-graphql';
import { HeroSchema } from './HeroSchema';

@ObjectType({ description: "The Town is Type" })
export class TownSchema {
  @Field((type) => ID)
  id: string;

  @Field()
  name: string;

  @Field((type) => HeroSchema)
  heroes: [HeroSchema];
}
