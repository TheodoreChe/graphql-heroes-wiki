import {
  Arg,
  Ctx,
  InputType,
  Field,
  FieldResolver,
  Mutation,
  Resolver,
  Root,
  Query,
  Int,
} from 'type-graphql';
import { HeroSchema } from '../schemas/HeroSchema';
import { TownSchema } from '../schemas/TownSchema';
import { IContext } from '../context.interface';

@InputType({ description: 'New Hero' })
class AddHeroInput {
  @Field()
  name: string;

  @Field((type) => Int)
  movementPoints: number;

  @Field()
  townId: string;
}

@Resolver((returns) => HeroSchema)
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
      throw err;
    }
  }

  @FieldResolver()
  async town(
    @Root() { _doc: { townId} }: { _doc: HeroSchema },
    @Ctx() { models }: IContext,
  ): Promise<TownSchema> {
    try {
      return await models.Town.findById(townId);
    } catch (err) {
      throw err;
    }
  }
}
