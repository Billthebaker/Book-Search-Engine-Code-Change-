const express = require('express');
const path = require('path');
const { ApolloServer } = require('apollo-server-express');
const cors = require('cors');
const typeDefs = require('./typeDefs');
const resolvers = require('./resolver');
const db = require('./config/connection');
const routes = require('./routes');

const app = express();

app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use((req, res, next) => {
  res.setHeader('Content-Security-Policy', "script-src 'self' 'unsafe-inline' 'unsafe-eval' edge.fullstory.com www.googletagmanager.com cdn.segment.com www.apollographql.com studio-ui-deployments.apollographql.com js.recurly.com js.stripe.com cdn.cookielaw.org www.google.com www.gstatic.com bat.bing.com www.redditstatic.com snap.licdn.com connect.facebook.net static.ads-twitter.com");
  next();
});

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

async function startServer() {
  const server = new ApolloServer({ typeDefs, resolvers });
  await server.start();
  server.applyMiddleware({ app });
}

startServer();

app.use(routes);

db.once('open', () => {
  app.listen(process.env.PORT || 3001, () => {
    console.log(`🌍 Now listening on port ${process.env.PORT || 3001}!`);
  });
});