const express = require("express")
const router = express.Router()

const { User, News } = require("../controllers")

router.get("/", (req, res) => res.status(200).send("It's works!"))

router.get("/users", User.getUser)
router.post("/users", User.addUser)
router.get("/users/:id", User.findUser)
router.delete("/users/:id", User.deleteUser)
router.post("/login", User.login)

router.get("/news", News.getNews)
router.post("/news", News.addNews)
router.get("/news/:slug", News.getNewsDetail)
router.delete("/news/:id", News.deleteNews)
router.put("/news/:id", News.editNews)

module.exports = router
