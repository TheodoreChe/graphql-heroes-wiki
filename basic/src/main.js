const express = require('express');
const expressHTTP = require('express-graphql');
const mongoose = require('mongoose');
const env = require('./env');
const schema = require('./graphql/schema.js');

const main = express();

mongoose.connect(env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.once('open', () => {
  console.log('Mongoose is running');
});

main.use(
  '/graphql',
  expressHTTP({
    schema,
    graphiql: true,
  }),
);

main.listen(env.API_PORT, () => {
  console.log(`GraphQL-server listening on port ${env.API_PORT}.`);
});
