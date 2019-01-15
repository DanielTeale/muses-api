const express = require("express");
const router = express.Router();
const {celebrate} = require("celebrate");
const ChapterController = require("../controllers/chapter_controller");
const {chapterVerification} = require("../services/celebrate_service");

router.get("/", ChapterController.index);

router.get("/:id", ChapterController.show);

router.post("/", celebrate(chapterVerification), ChapterController.create);

router.put("/:id", celebrate(chapterVerification), ChapterController.update);
router.patch("/:id", celebrate(chapterVerification), ChapterController.update);

router.delete("/:id", ChapterController.remove);

module.exports = router;