const Redis = require("ioredis")
require("dotenv").config()

const redis = new Redis({
  port: 19673,
  host: process.env.REDIS_HOST,
  username: "default",
  password: process.env.REDIS_PASSWORD,
  db: 0,
})

module.exports = redis
