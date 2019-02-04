const express = require("express");
const router = express.Router();
const { celebrate } = require("celebrate");
const ChapterController = require("../controllers/chapter_controller");
const { chapterVerification } = require("../services/celebrate_service");
const passport = require("passport");

router.get("/", ChapterController.index);

router.get("/:id", ChapterController.show);

router.post("/", celebrate(chapterVerification), passport.authenticate("jwt", { session: false }), ChapterController.create);

router.put("/:id", passport.authenticate("jwt", { session: false }), ChapterController.update, ChapterController.index);
router.patch("/:id", celebrate(chapterVerification), ChapterController.patch, ChapterController.index);

router.delete("/:id", passport.authenticate("jwt", { session: false }), ChapterController.remove);

module.exports = router;