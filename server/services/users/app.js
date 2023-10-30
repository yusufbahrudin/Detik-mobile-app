if (process.env.NODE_ENV !== "production") require("dotenv").config()

const { connect } = require("./config/db")
const { errorHandler } = require("./middleware")

const express = require("express")
const router = require("./routes")
const port = process.env.PORT || 4001
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(router)
app.use(errorHandler)

const start = async () => {
  try {
    await connect()
    app.listen(port, () => console.log("# Server listening on port", port))
  } catch (err) {
    console.log("# SERVER ERROR")
  }
}

start()
