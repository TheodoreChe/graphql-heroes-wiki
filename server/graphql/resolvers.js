const PUB_SUB = {
  MESSAGE: 'PUB_SUB_MESSAGE',
};

module.exports = {
  Query: {
    town: async (parent, args, { models }) => await models.Town.findById(args.id),
    towns: async (parent, args, { models }) => await models.Town.find({}),
    hero: async (parent, args, { models }) => await models.Hero.findById(args.id),
    heroes: async (parent, args, { models }) => await models.Hero.find({}),
  },
  Mutation: {
    addTown: async (parent, { name }, { models }) => {
      try {
        let town = new models.Town({ name });
        return await town.save();
      } catch (e) {
        throw new Error('Cannot Save Town');
      }
    },
    addHero: async (parent, { name, movementPoints, townId }, { models, pubsub }) => {
      try {
        pubsub.publish(PUB_SUB.MESSAGE, {
          messageSent: {
            content: 'Hero Saving...'
          },
        });
        let hero = new models.Hero({ name, movementPoints, townId });
        return await hero.save();
      } catch (e) {
        throw new Error('Cannot Save Hero');
      }
    },
  },
  Subscription: {
    messageSent: {
      subscribe: (parent, args, { pubsub }) => pubsub.asyncIterator(PUB_SUB.MESSAGE),
    },
  },
  Town: {
    heroes: async ({ id }, args, { models }) => await models.Hero.find({ townId: id }),
  },
  Hero: {
    town: async ({ townId }, args, { models }) => await models.Town.findById(townId),
  },
};
