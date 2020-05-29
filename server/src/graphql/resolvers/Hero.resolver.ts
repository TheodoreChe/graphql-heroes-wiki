import { PubSubEngine } from 'graphql-subscriptions';
import {
  Arg,
  Ctx,
  FieldResolver,
  Mutation,
  PubSub,
  Resolver,
  Root,
  Subscription,
  Query,
} from 'type-graphql';
import { HeroSchema, IHero } from '../schemas/Hero.schema';
import { NotificationSchema, INotification } from '../schemas/Notification.schema';
import { TownSchema } from '../schemas/Town.schema';
import { AddHeroInput } from '../inputs/HeroInput';
import { IContext } from '../types/Context.interface';

const NOTIFICATION = 'NOTIFICATION';

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
  async heroes(@Ctx() { models }: IContext) {
    const heroes = await models.Hero.find({});
    if (heroes != null) {
      return heroes;
    }
  }

  @Mutation((returns) => HeroSchema)
  async addHero(
    @PubSub() pubSub: PubSubEngine,
    @Arg('data') newHeroData: AddHeroInput,
    @Ctx() { models }: IContext,
  ): Promise<HeroSchema> {
    try {
      const hero = new models.Hero(newHeroData);
      // await pubSub.publish(NOTIFICATION, { message: newHeroData.name });
      return await hero.save();
    } catch (err) {
      throw err;
    }
  }

  @FieldResolver()
  async town(@Root() root: IHero, @Ctx() { models }: IContext): Promise<TownSchema> {
    try {
      return await models.Town.findById(root.townId);
    } catch (err) {
      throw err;
    }
  }

  @Subscription({ topics: NOTIFICATION })
  notification(@Root() { message }: INotification): NotificationSchema {
    return { message };
  }
}
