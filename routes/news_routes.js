const express = require("express");
const router = express.Router();
const { celebrate } = require("celebrate");
const NewsController = require("../controllers/news_controller")
const passport = require("passport")

router.get("/", NewsController.index);

router.post("/", NewsController.create);

router.put("/:id", NewsController.update)
router.patch("/:id", NewsController.update)

router.delete("/:id", NewsController.remove)

module.exports = router;