module.exports = {
  Query: {
    towns: async (parent, args, { models }) => {
      const Towns = await models.Town.find({});
      console.log('[Towns]', Towns);
      return Towns;
    },
    heroes: async (parent, args, { models }) => {
      const Heroes = await models.Hero.find({});
      console.log('[Heroes]', Heroes);
      return Heroes;
    },
  },
  Mutation: {
  },
};
