const { GraphQLServer, PubSub } = require('graphql-yoga');
const mongoose = require('mongoose');
const env = require('./env');
const models = require('./models');
const resolvers = require('./graphql/resolvers.js');

const db = mongoose.connect(env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const pubsub = new PubSub();

const server = new GraphQLServer({
  typeDefs: `${__dirname}/graphql/schema.graphql`,
  resolvers,
  context: { models, db, pubsub },
});

const FRONTEND_HOST = 'localhost';
const FRONTEND_PORT = '3000';

const origin = `http://${FRONTEND_HOST}:${FRONTEND_PORT}`;

const options = {
  cors: { credentials: true, origin },
  port: env.API_PORT,
  subscriptions: {
    onConnect: () => {
      console.log(`Server is running on ws://localhost:${env.API_PORT}`);
    }
  }
};

mongoose.connection.once("open", function(){
  server.start(options, () => {
    console.log(`Server is running on http://localhost:${env.API_PORT}`);
  });
});
