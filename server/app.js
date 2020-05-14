const express = require('express');
const expressHTTP = require('express-graphql');
const mongoose = require('mongoose');
const env = require('./env');
const schema = require('./graphql/schema.js');

const app = express();

mongoose.connect(env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.once('open', () => {
  console.log(`Server is running on http://localhost:${env.API_PORT}`);
});

app.use(
  '/graphql',
  expressHTTP({
    schema,
    graphiql: true,
  }),
);

app.listen(env.API_PORT, () => {
  console.log(`Server listening at http://localhost:${env.API_PORT}`);
});