const express = require("express");
const router = express.Router();
const { celebrate } = require("celebrate");
const NewsController = require("../controllers/news_controller")
const passport = require("passport")

router.get("/", NewsController.index);

router.post("/", passport.authenticate("jwt", { session: false }), NewsController.create);

router.put("/:id", passport.authenticate("jwt", { session: false }), NewsController.update)
router.patch("/:id", passport.authenticate("jwt", { session: false }), NewsController.update)

router.delete("/:id", passport.authenticate("jwt", { session: false }), NewsController.remove)

module.exports = router;