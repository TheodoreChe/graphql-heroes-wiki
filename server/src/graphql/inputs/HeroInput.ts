import { Field, InputType, Int } from 'type-graphql';

@InputType({ description: 'New hero data' })
export class AddHeroInput {
  @Field()
  name: string;

  @Field((type) => Int)
  movementPoints: number;

  @Field()
  townId: string;
}
