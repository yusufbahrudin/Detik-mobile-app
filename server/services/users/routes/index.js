const express = require("express")
const { Controller } = require("../controllers")
const router = express.Router()

router.get("/", (req, res, next) => res.status(200).send("# Goodbye world"))
router.get("/users", Controller.getUser)
router.post("/users", Controller.addUser)
router.get("/users/:id", Controller.findUser)
router.delete("/users/:id", Controller.deleteUser)

router.post("/login", Controller.login)

module.exports = router
