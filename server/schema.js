const { gql } = require('apollo-server-express');

const typeDefs = gql`
  # ... your GraphQL schema here ...
`;

const resolvers = {
  Query: {
    // ... your Query resolvers here ...
  },
  Mutation: {
    // ... your Mutation resolvers here ...
  },
};

module.exports = { typeDefs, resolvers };