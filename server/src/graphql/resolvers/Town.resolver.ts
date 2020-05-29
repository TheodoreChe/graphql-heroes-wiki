import { Arg, Ctx, FieldResolver, Mutation, Query, Resolver, Root } from 'type-graphql';
import { TownSchema, ITown } from '../schemas/Town.schema';
import { AddTownInput } from '../inputs/TownInput';
import { IContext } from '../types/Context.interface';

@Resolver((returns) => TownSchema)
export class TownResolver {
  @Query((returns) => TownSchema)
  async town(@Arg('id') id: string, @Ctx() { models }: { models: any }) {
    const town = await models.Town.findById(id);
    if (town != null) {
      return town;
    }
  }

  @Query((returns) => [TownSchema])
  async towns(@Ctx() { models }: IContext) {
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

  @FieldResolver()
  async heroes(
    @Root() root: ITown,
    @Ctx() { models }: IContext,
  ): Promise<TownSchema> {
    try {
      return await models.Hero.find({ townId: root.id });
    } catch (err) {
      throw err;
    }
  }
}
