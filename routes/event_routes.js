const express = require("express");
const router = express.Router();
const {eventVerification} = require("../services/celebrate_service")
const { celebrate } = require("celebrate")

const EventController = require("../controllers/event_controller")

router.get("/", EventController.index);
router.get("/:id", EventController.show)
router.get("/chapter/:chapter", EventController.chapterIndex)
router.post("/", celebrate(eventVerification), EventController.create);
router.put("/:id", celebrate(eventVerification), EventController.update);
router.patch("/:id", celebrate(eventVerification), EventController.update);
router.delete("/:id", EventController.remove);

module.exports = router;