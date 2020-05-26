const graphql = require('graphql');
const { Town, Hero } = require('../db');

const {
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLNonNull,
} = graphql;

/**
 * Types
 */
const TownType = new GraphQLObjectType({
  name: 'TownType',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    heroes: {
      type: new GraphQLList(HeroType),
      resolve(parent) {
        return Hero.find({ townId: parent.id });
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
        return Town.findById(parent.townId);
      },
    },
  }),
});

/**
 * Query
 */
const RootQueryType = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    town: {
      type: TownType,
      args: {
        id: { type: GraphQLID },
      },
      resolve(parent, args) {
        return Town.findById(args.id);
      },
    },
    hero: {
      type: HeroType,
      args: {
        id: { type: GraphQLID },
      },
      resolve(parent, args) {
        return Hero.findById(args.id);
      },
    },
    towns: {
      type: new GraphQLList(TownType),
      resolve() {
        return Town.find({});
      },
    },
    heroes: {
      type: new GraphQLList(HeroType),
      resolve() {
        return Hero.find({});
      },
    },
  },
});

/**
 * Mutation
 */
const MutationType = new GraphQLObjectType({
  name: 'MutationType',
  fields: {
    addTown: {
      type: TownType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(parent, args) {
        let town = new Town({
          name: args.name,
        });
        return town.save();
      }
    },
    addHero: {
      type: HeroType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        movementPoints: { type: new GraphQLNonNull(GraphQLInt) },
        townId: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(parent, args) {
        let hero = new Hero({
          name: args.name,
          movementPoints: args.movementPoints,
          townId: args.townId,
        });
        return hero.save();
      }
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQueryType,
  mutation: MutationType,
});
