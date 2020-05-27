import { Arg, Ctx, Field, InputType, Mutation, Query, Resolver } from 'type-graphql';
import { TownSchema } from '../schemas/TownSchema';
import { IContext } from '../context.interface';

@InputType({ description: 'New Town' })
class AddTownInput {
  @Field()
  name: string;
}

@Resolver()
export class TownResolver {
  @Query((returns) => TownSchema)
  async town(@Arg('id') id: string, @Ctx() { models }: { models: any }) {
    const town = await models.Town.findById(id);
    if (town != null) {
      return town;
    }
  }

  @Query((returns) => [TownSchema])
  async towns(@Ctx() { models }: { models: any }) {
    const towns = await models.Town.find({});
    if (towns != null) {
      return towns;
    }
  }

  @Mutation((returns) => TownSchema)
  async addTown(
    @Arg('data') newTownData: AddTownInput,
    @Ctx() { models }: IContext,
  ): Promise<TownSchema> {
    try {
      const town = new models.Town(newTownData);
      return await town.save();
    } catch (err) {
      throw new Error(err);
    }
  }
}
