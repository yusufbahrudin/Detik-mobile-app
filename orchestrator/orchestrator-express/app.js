const express = require("express")
const router = require("./routes")

const port = process.env.PORT || 4000
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(router)
app.listen(port, () => console.log("# Server Gateway listening on port", port))
