const express = require('express');
const expressHTTP = require('express-graphql');
const mongoose = require('mongoose');
const env = require('../env');
const schema = require('../schema');

try {
  mongoose.connect(env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  mongoose.connection.once('open', () => {
    console.log('[mongodb] connected');
  });

  const app = express();
  app.use(
    '/graphql',
    expressHTTP({
      schema,
      graphiql: true,
    }),
  );

  app.listen(env.API_PORT, () => {
    console.log('[address] http://localhost:4000/graphql');
  });
} catch (e) {
  console.error('[error] ', e);
}
