const redis = require("./config/redis")

const deleteRedisCache = async () => {
  const news = await redis.del("news")
  const category = await redis.del("category")
  const users = await redis.del("users")
  console.log("OK")
}

console.log(deleteRedisCache())
