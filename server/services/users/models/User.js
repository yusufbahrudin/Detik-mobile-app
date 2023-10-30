const { ObjectId } = require("mongodb")
const { database } = require("../config/db")
const { hashPass } = require("../helpers")

class User {
  static collection() {
    return database().collection("users")
  }

  static getUser() {
    return User.collection()
      .find({}, { projection: { password: 0 } })
      .toArray()
  }

  static addUser({ username, email, password, phoneNumber, address }) {
    return User.collection().insertOne({ username, email, password: hashPass(password), phoneNumber, address, role: "admin" })
  }

  static findById(id) {
    return User.collection().findOne({ _id: new ObjectId(id) }, { projection: { password: 0 } })
  }

  static findUser(email) {
    return User.collection().findOne({ email })
  }

  static deleteUser(id) {
    return User.collection().deleteOne({ _id: new ObjectId(id) })
  }
}

module.exports = { User }
