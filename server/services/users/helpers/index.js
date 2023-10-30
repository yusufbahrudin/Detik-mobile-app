const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const salt = bcrypt.genSaltSync(10)

const hashPass = (data) => bcrypt.hashSync(data, salt)
const compareHash = (password, hash) => bcrypt.compareSync(password, hash)

const generateToken = (payload) => jwt.sign(payload, process.env.JWT_SECRET)
const verifyToken = (token) => jwt.verify(token, process.env.JWT_SECRET)

module.exports = { hashPass, compareHash, generateToken, verifyToken }
