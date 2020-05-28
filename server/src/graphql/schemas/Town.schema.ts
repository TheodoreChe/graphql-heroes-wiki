import { Field, ObjectType, ID } from 'type-graphql';
import { HeroSchema, IHero } from './Hero.schema';

@ObjectType({ description: "The Town is Type" })
export class TownSchema {
  @Field((type) => ID)
  id: string;

  @Field()
  name: string;

  @Field((type) => HeroSchema)
  heroes: [HeroSchema];
}

export interface ITown {
  id: string;
  name: string;
  heroes: IHero[];
}
