const { GraphQLServer } = require('graphql-yoga');
const mongoose = require('mongoose');
const env = require('../env');
const models = require('../models');
const typeDefs = require('../graphql/type-defs.graphql');
const resolvers = require('../graphql/resolvers.js');

const db = mongoose.connect(env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const context = { models, db };

const app = new GraphQLServer({
  typeDefs,
  resolvers,
  context,
});

app.start({ port: env.API_PORT }, () => {
  console.log(`Server is running on http://localhost:${env.API_PORT}`);
});
