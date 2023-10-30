const axios = require("axios")
const redis = require("../config/redis")

const BASE_URL_NEWS = "http://app-service:4002"

const typeDefs = `#graphql
  type Category {
    id:  ID,
    name: String,
    createdAt: String,
    updatedAt: String,
  }

  type Query {
    category: [Category],
  }

`

const resolvers = {
  Query: {
    category: async () => {
      try {
        let result = await redis.get("category")

        if (!result) {
          const { data } = await axios(BASE_URL_NEWS + "/category")
          await redis.set("category", JSON.stringify(data))
          result = data
        } else {
          result = JSON.parse(result)
        }

        return result
      } catch (err) {
        console.log(err.response.data)
      }
    },
  },
}

module.exports = { typeDefs, resolvers }
