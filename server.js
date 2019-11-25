const fs = require("fs");
const path = require("path");
const { ApolloServer } = require("apollo-server");
const { resolvers } = require("./graphql/resolvers");

const typeDefs = fs
  .readFileSync(path.join(__dirname, "graphql/schema.graphql"))
  .toString();

const server = new ApolloServer({ typeDefs, resolvers: resolvers });

server.listen(4000).then(({ url }) => console.log("rodando " + url));
