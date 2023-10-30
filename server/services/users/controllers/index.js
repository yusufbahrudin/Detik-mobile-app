const { compareHash, generateToken } = require("../helpers")
const { User } = require("../models/User")

const isEmail = (email) => {
  var regex =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return regex.test(email)
}

class Controller {
  static async getUser(req, res, next) {
    try {
      const users = await User.getUser()
      res.status(200).json(users)
    } catch (err) {
      next(err)
    }
  }

  static async addUser(req, res, next) {
    try {
      const { email, password } = req.body
      if (!email || !password) throw { name: "BadRequest", message: "Email or Password is required." }

      if (!isEmail(email)) throw { name: "BadRequest", message: "Invalid email format." }

      const find = await User.findUser(email)
      if (find) throw { name: "BadRequest", message: "Email already registered" }
      await User.addUser(req.body)

      res.status(200).json({ msg: "Account register as admin" })
    } catch (err) {
      next(err)
    }
  }

  static async findUser(req, res, next) {
    try {
      const { id } = req.params
      const user = await User.findById(id)

      if (!user) throw { name: "NotFound", message: "Account not found" }

      res.status(200).json(user)
    } catch (err) {
      next(err)
    }
  }

  static async deleteUser(req, res, next) {
    try {
      const { id } = req.params
      const find = await User.findById(id)
      if (!find) throw { name: "NotFound", message: "Account not found" }

      await User.deleteUser(id)

      res.status(200).json({ msg: "Account deleted" })
    } catch (err) {
      next(err)
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body
      if (!email || !password) throw { name: "Unauthorized", message: "Invalid email or password." }

      const user = await User.findUser(email)
      if (!user || !compareHash(password, user.password)) throw { name: "Unauthorized", message: "Invalid email or password." }

      const access_token = generateToken({ id: user._id, email: user.email, username: user.username })
      res.status(200).json({ id: user._id, email: user.email, username: user.username, access_token })
    } catch (err) {
      next(err)
    }
  }
}

module.exports = { Controller }
