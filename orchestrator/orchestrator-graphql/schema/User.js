const axios = require("axios")
const redis = require("../config/redis")

const BASE_URL_USER = "http://user-service:4001"

const typeDefs = `#graphql
  type User {
    _id:  String,
    username: String,
    email: String,
    phoneNumber: String,
    address: String,
  }

  input form {
    username: String,
    password: String,
    email: String,
    phoneNumber: String,
    address: String,
  }

  type Query {
    users: [User],
    user(_id: String): User
    login(form: form): User
  }

  type Mutation {
    addUser(form: form): User
    deleteUser(_id: String): User
  }
`

const resolvers = {
  Query: {
    users: async () => {
      try {
        let result = await redis.get("users")

        if (!result) {
          const { data } = await axios(BASE_URL_USER + "/users")
          await redis.set("users", JSON.stringify(data))
          result = data
        } else {
          result = JSON.parse(result)
        }

        return result
      } catch (err) {
        console.log(err.response.data)
      }
    },

    user: async (_, args) => {
      try {
        const { data } = await axios(BASE_URL_USER + "/users/" + args._id)
        return data
      } catch (err) {
        console.log(err.response.data)
      }
    },

    login: async (_, args) => {
      try {
        const { data } = await axios.post(BASE_URL_USER + "/login", args.form)
        return data
      } catch (err) {
        console.log(err.response.data)
      }
    },
  },

  Mutation: {
    addUser: async (_, args) => {
      try {
        const { data } = await axios.post(BASE_URL_USER + "/users", args.form)
        await redis.del("users")
        return data
      } catch (err) {
        console.log(err.response.data)
      }
    },

    deleteUser: async (_, args) => {
      try {
        const { data } = await axios.delete(BASE_URL_USER + "/users/" + args._id)
        await redis.del("users")
        return data
      } catch (err) {
        console.log(err.response.data)
      }
    },
  },
}

module.exports = { typeDefs, resolvers }
