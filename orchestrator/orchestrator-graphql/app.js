const { ApolloServer } = require("@apollo/server")
const { startStandaloneServer } = require("@apollo/server/standalone")

const { typeDefs: userTypeDefs, resolvers: userResolvers } = require("./schema/User")
const { typeDefs: newsTypeDefs, resolvers: newsResolvers } = require("./schema/News")
const { typeDefs: categoryTypeDefs, resolvers: categoryResolvers } = require("./schema/Category")

const server = new ApolloServer({
  typeDefs: [userTypeDefs, newsTypeDefs, categoryTypeDefs],
  resolvers: [userResolvers, newsResolvers, categoryResolvers],
})

startStandaloneServer(server, { listen: { port: 4000 } }).then(({ url }) => {
  console.log(`# GraphQL Listening on: ${url}`)
})
