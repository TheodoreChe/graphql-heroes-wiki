import { Arg, Ctx, Query, Resolver } from 'type-graphql';
import { HeroSchema } from '../schemas/Hero';

@Resolver((of) => HeroSchema)
export class HeroResolver {
  @Query((returns) => HeroSchema)
  async hero(@Arg('id') id: string, @Ctx() { models }: { models: any }) {
    const hero = await models.Hero.findById(id);
    if (hero === undefined) {
      throw new Error();
    }
    return hero;
  }
}
