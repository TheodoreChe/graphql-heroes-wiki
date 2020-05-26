import { Arg, Ctx, Query, Resolver, InputType, Field, Mutation, Int } from 'type-graphql';
import { HeroSchema } from '../schemas/HeroSchema';

interface IContext {
  models: any;
}

@InputType({ description: 'New recipe data' })
class AddHeroInput {
  @Field()
  name: string;

  @Field((type) => Int)
  movementPoints: number;

  @Field()
  townId: string;
}

@Resolver()
export class HeroResolver {
  @Query((returns) => HeroSchema)
  async hero(@Arg('id') id: string, @Ctx() { models }: IContext) {
    const hero = await models.Hero.findById(id);
    if (hero != null) {
      return hero;
    }
  }

  @Query((returns) => [HeroSchema])
  async heroes(@Ctx() { models }: { models: any }) {
    const heroes = await models.Hero.find({});
    if (heroes != null) {
      return heroes;
    }
  }

  @Mutation((returns) => HeroSchema)
  async addHero(
    @Arg('data') newHeroData: AddHeroInput,
    @Ctx() { models }: IContext,
  ): Promise<HeroSchema> {
    try {
      const hero = new models.Hero(newHeroData);
      return await hero.save();
    } catch (err) {
      throw new Error(err);
    }
  }
}
