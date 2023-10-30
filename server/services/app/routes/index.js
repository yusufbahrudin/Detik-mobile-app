const express = require("express")
const router = express.Router()

const { Auth, News, CategoryController, UserController } = require("../controllers")
const { authentication } = require("../middleware")

router.get("/", (req, res) => {
  res.status(200).json({ msg: "Goodbye World !" })
})

router.post("/login", Auth.login)

router.get("/news", News.getNews)
router.get("/news/:slug", News.getNewsBySlug)
router.get("/category", CategoryController.getCategory)

// router.use(authentication)
router.post("/register", Auth.register)

router.get("/users", UserController.getUser)
router.post("/news", News.addNews)
router.delete("/news/:id", News.deleteNews)
router.put("/news/:id", News.editNews)

router.post("/category", CategoryController.addCategory)
router.put("/category/:id", CategoryController.editCategory)
router.delete("/category/:id", CategoryController.deleteCategory)

module.exports = router
