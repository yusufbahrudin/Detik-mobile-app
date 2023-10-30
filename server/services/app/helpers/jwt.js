const jwt = require("jsonwebtoken")

const generateToken = (data) => jwt.sign(data, process.env.JWT_SECRET)
const verifyToken = (data) => jwt.verify(data, process.env.JWT_SECRET)

module.exports = { generateToken, verifyToken }
