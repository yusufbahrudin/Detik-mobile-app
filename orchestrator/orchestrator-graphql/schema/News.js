const redis = require("../config/redis")
const axios = require("axios")

const BASE_URL_USER = "http://user-service:4001"
const BASE_URL_NEWS = "http://app-service:4002"

const typeDefs = `#graphql
  type News {
    id: ID,
    title: String,
    slug: String,
    content: String,
    imgUrl: String,
    categoryId: Int,
    authorId: Int,
    userMongoId: String,
    createdAt: String,
    updatedAt: String,
    Category: Category
    Tags: [Tags],
    User: User
  }

  type Category {
    id: ID,
    name: String,
    updatedAt: String,
    createdAt: String
  }

  type User {
    _id: String,
    username: String,
    email: String,
    phoneNumber: String,
    address: String,
    role: String
  }

  type Tags {
    id: ID,
    postId: Int,
    name: String,
    updatedAt: String,
    createdAt: String
  }

  input Form {
    title: String,
    content: String,
    imgUrl: String,
    categoryId: Int,
    authorId: Int,
    userMongoId: String,
    tags: [FormTags]
  }

  input FormTags {
    name: String
  }

  type Query {
    news: [News],
    getNewsDetail(slug: String): News
  }

  type Mutation {
    addNews(Form: Form): News
    deleteNews(id: ID): News
    editNews(id: ID, Form: Form): News
  }
`

const resolvers = {
  Query: {
    news: async () => {
      try {
        let result = await redis.get("news")

        if (!result) {
          const { data } = await axios.get(BASE_URL_NEWS + "/news")
          await redis.set("news", JSON.stringify(data))
          result = data
        } else {
          result = JSON.parse(result)
        }

        return result
      } catch (err) {
        console.log(err.response.data)
        return err
      }
    },

    getNewsDetail: async (_, args) => {
      try {
        const { data } = await axios.get(BASE_URL_NEWS + "/news/" + args.slug)
        const { data: user } = await axios.get(BASE_URL_USER + "/users/" + data.userMongoId)
        data.User = user

        return data
      } catch (err) {
        console.log(err.response.data)
        return err
      }
    },
  },

  Mutation: {
    addNews: async (_, args) => {
      try {
        const { data } = await axios.post(BASE_URL_NEWS + "/news", args.Form)
        await redis.del("news")
        return data
      } catch (err) {
        console.log(err.response.data)
        return err
      }
    },

    deleteNews: async (_, args) => {
      try {
        const { data } = await axios.delete(BASE_URL_NEWS + "/news/" + args.id)
        await redis.del("news")
        return data
      } catch (err) {
        console.log(err.response.data)
        return err
      }
    },

    editNews: async (_, args) => {
      console.log(args)
      try {
        const { data } = await axios.put(BASE_URL_NEWS + "/news/" + args.id, args.Form)
        await redis.del("news")
        return data
      } catch (err) {
        console.log(err.response.data)
        return err
      }
    },
  },
}

module.exports = { typeDefs, resolvers }

// static async editNews(req, res, next) {
//   try {
//     const { data } = await axios.put(BASEURL_NEWS + "/news/" + req.params.id, req.body)
//     await redis.del("news")
//     res.status(200).json(data)
//   } catch (err) {
//     console.log(err.response.data)
//     res.status(err.response.status).json(err.response.data)
//   }
// }
