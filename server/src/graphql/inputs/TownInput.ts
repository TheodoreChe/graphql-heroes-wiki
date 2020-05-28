import { Field, InputType } from 'type-graphql';

@InputType({ description: 'New town data' })
export class AddTownInput {
  @Field()
  name: string;
}
