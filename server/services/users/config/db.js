const { MongoClient } = require("mongodb")

const uri = process.env.MONGODB_URI
const dbName = process.env.MONGODB_DB

let db = null

const connect = async () => {
  try {
    const client = new MongoClient(uri)
    await client.connect()
    const database = client.db(dbName)

    db = database

    return database
  } catch (err) {
    return err
  }
}

const database = () => {
  return db
}

module.exports = { connect, database }
