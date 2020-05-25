import { GraphQLServer, PubSub } from 'graphql-yoga';
import 'reflect-metadata';
import { buildSchema } from 'type-graphql';
import * as Mongoose from 'mongoose';
import { HeroResolver, TownResolver } from './graphql';
import models from './models';
import { env } from './config';

async function bootstrap() {
  const schema = await buildSchema({
    resolvers: [HeroResolver, TownResolver],
    emitSchemaFile: true,
  });

  const db = Mongoose.connect(env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const pubsub = new PubSub();

  const server = new GraphQLServer({
    schema,
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
        console.log('GraphQL-server listening subscriptions');
      },
    },
  };

  Mongoose.connection.once('open', function () {
    console.log('Mongodb is connected successfully');
    server.start(options, () => {
      console.log(`GraphQL-server listening on port ${env.API_PORT}.`);
    });
  });
}

bootstrap();
