import { Arg, Ctx, Query, Resolver } from 'type-graphql';
import { TownSchema } from '../schemas/TownSchema';

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
}
