const graphql = require('graphql');

const {
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
} = graphql;

const TownType = new GraphQLObjectType({
  name: 'TownType',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    heroes: {
      type: new GraphQLList(HeroType),
      resolve(parent) {
        return [parent.id];
      },
    },
  }),
});

const HeroType = new GraphQLObjectType({
  name: 'HeroType',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    movementPoints: { type: GraphQLInt },
    town: {
      type: TownType,
      resolve(parent) {
        // get data parent.townId
        return { id: parent.townId };
      },
    },
  }),
});

const RootQueryType = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    town: {
      type: TownType,
      args: {
        id: { type: GraphQLID },
      },
      resolve(parent, args) {
        return { id: args.id };
      },
    },
    hero: {
      type: HeroType,
      args: {
        id: { type: GraphQLID },
      },
      resolve(parent, args) {
        return { id: args.id };
      },
    },
    towns: {
      type: new GraphQLList(TownType),
      resolve() {
        return towns;
      },
    },
    heroes: {
      type: new GraphQLList(HeroType),
      resolve() {
        return heroes;
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQueryType,
});
