import { Arg, Ctx, Query, Resolver } from 'type-graphql';
import { Hero } from '../schemas/Hero';

@Resolver(Hero)
export default class {
  @Query((returns) => Hero)
  async hero(@Arg('id') id: string, @Ctx() { models }: { models: any }) {
    const hero = await models.Hero.findById(id);
    if (hero === undefined) {
      throw new Error();
    }
    return hero;
  }
}
