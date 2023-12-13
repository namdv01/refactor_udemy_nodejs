const { GraphQLSchema } = require('graphql');
const { RootType, RootMutation } = require('./schema.graphql');
const { createHandler } = require('graphql-http/lib/use/express');
const schema = new GraphQLSchema({
  query: RootType,
  mutation: RootMutation,
});
const root = createHandler({ schema });
module.exports = root;

// {
//   "query": "query {posts {id title author {name info}} users {name posts {title}}}"
// }