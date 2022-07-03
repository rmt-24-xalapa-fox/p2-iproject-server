const novelRoute = require("express").Router()
const NovelController = require("../controllers/novelController")
const { authorization } = require("../middlewares/authorization")
const authentication = require("../middlewares/authentication")

novelRoute.use(authentication)
novelRoute.get("/", NovelController.getNovel)
novelRoute.post("/", NovelController.postNovel)

novelRoute.get("/:id", NovelController.getNovelById)

novelRoute.put("/:id", authorization, NovelController.putNovelById)
novelRoute.delete("/:id", authorization, NovelController.deleteNovelById)

module.exports =  novelRoute 