const { verifyToken } = require("../helpers/jwt")
const { User } = require("../models")

const authentication = async (req, res, next) => {
  try {
    const { access_token } = req.headers
    if (!access_token) throw { name: "Unauthorized", message: "Invalid token" }

    const token = verifyToken(access_token)

    if (!(await User.findByPk(token.id))) throw { name: "Unauthorized", message: "User account not found" }

    req.user = token
    next()
  } catch (err) {
    next(err)
  }
}

module.exports = { authentication }
