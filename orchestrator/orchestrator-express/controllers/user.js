const axios = require("axios")
const redis = require("../config/redis")

const BASEURL_USER = "http://localhost:4001"

class User {
  static async getUser(req, res, next) {
    try {
      let result = await redis.get("users")

      if (!result) {
        const { data } = await axios(BASEURL_USER + "/users")
        await redis.set("users", JSON.stringify(data))
        result = data
      } else {
        result = JSON.parse(result)
      }

      res.status(200).json(result)
    } catch (err) {
      console.log(err)
      res.json(err.response.data)
    }
  }

  static async addUser(req, res, next) {
    try {
      const { data } = await axios.post(BASEURL_USER + "/users", req.body)
      await redis.del("users")
      res.status(200).json(data)
    } catch (err) {
      console.log(err.response.data)
      res.json(err.response.data)
    }
  }

  static async findUser(req, res, next) {
    try {
      console.log(req.params.id)
      const { data } = await axios.get(BASEURL_USER + "/users/" + req.params.id)
      res.status(200).json(data)
    } catch (err) {
      res.json(err.response.data)
    }
  }

  static async deleteUser(req, res, next) {
    try {
      const { data } = await axios.delete(BASEURL_USER + "/users/" + req.params.id)
      await redis.del("users")
      res.status(200).json(data)
    } catch (err) {
      res.json(err.response.data)
    }
  }

  static async login(req, res, next) {
    try {
      const { data } = await axios.post(BASEURL_USER + "/login", req.body)
      res.status(200).json(data)
    } catch (err) {
      res.json(err.response.data)
    }
  }
}

module.exports = User
