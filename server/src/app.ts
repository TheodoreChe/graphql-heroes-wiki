import { GraphQLServer, PubSub } from 'graphql-yoga';
import 'reflect-metadata';
import mongoose from 'mongoose';
import env from './env';
import models from './models';
import resolvers from './graphql-basic/resolvers';

async function bootstrap() {
  const db = mongoose.connect(env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const pubsubApp = new PubSub();

  const server = new GraphQLServer({
    typeDefs: `${__dirname}/graphql/schema.graphql`,
    resolvers,
    context: { models, db, pubsub: pubsubApp },
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
      },
    },
  };

  mongoose.connection.once('open', function () {
    server.start(options, () => {
      console.log(`Server is running on http://localhost:${env.API_PORT}`);
    });
  });
}

bootstrap();
