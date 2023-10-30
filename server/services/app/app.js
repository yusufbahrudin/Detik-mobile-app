if (process.NODE_ENV !== "production") {
  require("dotenv").config()
}

const express = require("express")
const cors = require("cors")
const router = require("./routes")

const { errorHandler } = require("./middleware/errorHandler")

const app = express()
const port = process.env.PORT || 4002

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())
app.use(router)
app.use(errorHandler)
app.listen(port, () => console.log(`# Server listening on port ${port}`))
