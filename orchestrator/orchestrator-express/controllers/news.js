const axios = require("axios")
const redis = require("../config/redis")

const BASEURL_USER = "http://localhost:4001"
const BASEURL_NEWS = "http://localhost:4002"

class News {
  static async getNews(req, res, next) {
    try {
      let result = await redis.get("news")

      if (!result) {
        const { data } = await axios.get(BASEURL_NEWS + "/news")
        await redis.set("news", JSON.stringify(data))
        result = data
      } else {
        result = JSON.parse(result)
      }

      res.status(200).json(result)
    } catch (err) {
      console.log(err.response.data)
      res.status(err.response.status).json(err.response.data)
    }
  }

  static async addNews(req, res, next) {
    try {
      const { data } = await axios.post(BASEURL_NEWS + "/news", req.body)
      await redis.del("news")
      res.status(200).json(data)
    } catch (err) {
      console.log(err.response.data)
      res.status(err.response.status).json(err.response.data)
    }
  }

  static async getNewsDetail(req, res, next) {
    try {
      const { data } = await axios.get(BASEURL_NEWS + "/news/" + req.params.slug)
      const { data: user } = await axios.get(BASEURL_USER + "/users/" + data.userMongoId)

      data.User = user

      res.status(200).json(data)
    } catch (err) {
      console.log(err.response.data)
      res.status(err.response.status).json(err.response.data)
    }
  }

  static async deleteNews(req, res, next) {
    try {
      const { data } = await axios.delete(BASEURL_NEWS + "/news/" + req.params.id)
      await redis.del("news")
      res.status(200).json(data)
    } catch (err) {
      console.log(err.response.data)
      res.status(err.response.status).json(err.response.data)
    }
  }

  static async editNews(req, res, next) {
    try {
      const { data } = await axios.put(BASEURL_NEWS + "/news/" + req.params.id, req.body)
      await redis.del("news")
      res.status(200).json(data)
    } catch (err) {
      console.log(err.response.data)
      res.status(err.response.status).json(err.response.data)
    }
  }
}

module.exports = News
