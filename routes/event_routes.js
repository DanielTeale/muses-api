const express = require("express");
const router = express.Router();
const {eventVerification} = require("../services/celebrate_service");
const { celebrate } = require("celebrate");
const passport = require("passport")

const EventController = require("../controllers/event_controller")

router.get("/", EventController.index);
router.get("/:id", EventController.show)
router.get("/chapter/:chapter", EventController.chapterIndex)
router.post("/", passport.authenticate("jwt", { session: false }), EventController.create);
router.put("/:id", celebrate(eventVerification), passport.authenticate("jwt", { session: false }), EventController.update);
router.patch("/:id", celebrate(eventVerification), passport.authenticate("jwt", { session: false }), EventController.update);
router.delete("/:id", passport.authenticate("jwt", { session: false }), EventController.remove);

module.exports = router;