const bcrypt = require("bcrypt")
const salt = bcrypt.genSaltSync(10)

const hash = (data) => bcrypt.hashSync(data, salt)
const compareHash = (data, hash) => bcrypt.compareSync(data, hash)

module.exports = { hash, compareHash }
