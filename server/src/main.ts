import 'reflect-metadata';
import { ApolloServer } from 'apollo-server';
import { buildSchema } from 'type-graphql';
import mongoose from 'mongoose';
import { HeroResolver, TownResolver } from './graphql';
import { models } from './db';
import { env } from './config';

async function bootstrap() {
  try {
    // Build the TypeGraphQL schema
    const schema = await buildSchema({
      resolvers: [HeroResolver, TownResolver],
    });

    // Connect to DataBase
    const db = mongoose.connect(env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Create GraphQL server
    const server = new ApolloServer({
      schema,
      playground: true,
      context: { models, db },
    });

    mongoose.connection.once('open', async () => {
      console.log('Mongodb is connected successfully');
      // Start the server
      const { url } = await server.listen(env.API_PORT);
      console.log(`Server is running, GraphQL Playground available at ${url}`);
    });
  } catch (err) {
    console.error(err);
  }
}

bootstrap();
