const { compareHash } = require("../helpers/bcrypt")
const { generateToken } = require("../helpers/jwt")
const { User } = require("../models")

class Auth {
  static async login(req, res, next) {
    try {
      const { email, password } = req.body

      if (!email || !password) throw { name: "Unauthorized", message: "Email & Password required" }

      const user = await User.findOne({ where: { email } })

      if (!user || !compareHash(password, user.password)) throw { name: "Unauthorized", message: "Invalid email or password" }

      res.status(200).json({
        email: user.email,
        access_token: generateToken({ id: user.id, email: user.email }),
      })
    } catch (err) {
      next(err)
    }
  }

  static async register(req, res, next) {
    try {
      const { username, email, password, phoneNumbeer, address } = req.body
      const register = await User.create({ username, email, password, phoneNumbeer, address })
      res.status(201).json({
        email: register.email,
        access_token: generateToken({ id: register.id, email: register.email }),
      })
    } catch (err) {
      next(err)
    }
  }
}

module.exports = { Auth }
