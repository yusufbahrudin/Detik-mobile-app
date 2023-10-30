const { User } = require("../models")

class UserController {
  static async getUser(req, res, next) {
    try {
      const users = await User.findAll({ attributes: { exclude: ["password"] } })
      res.status(200).json(users)
    } catch (err) {
      next(err)
    }
  }
}

module.exports = { UserController }
