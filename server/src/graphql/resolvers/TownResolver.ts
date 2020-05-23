import { Arg, Ctx, Query, Resolver } from 'type-graphql';
import { Town } from '../schemas/Town';

@Resolver(Town)
export default class {
  @Query((returns) => Town)
  async town(@Arg('id') id: string, @Ctx() { models }: { models: any }) {
    const town = await models.Town.findById(id);
    if (town === undefined) {
      throw new Error();
    }
    return town;
  }
}
