const express = require("express");
const router = express.Router();
const {eventVerification} = require("../services/celebrate_service")
const { celebrate } = require("celebrate")

const EventController = require("../controllers/event_controller")

router.get("/", EventController.index);
// router.post("/", EventController.create);
// router.put("/:id", EventController.update);
// router.patch("/:id", EventController.update);

// router.post("/", celebrate({
//   body: {
//     title: Joi.string().required(),
//     description: Joi.string().required(),
//     date: Joi.string().required()
//   }
// }), EventController.create);

// router.put("/:id", celebrate({
//   body: {
//     title: Joi.string().required(),
//     description: Joi.string().required(),
//     date: Joi.string().required()
//   }
// }), EventController.update);

// router.patch("/:id", celebrate({
//   body: {
//     title: Joi.string().required(),
//     description: Joi.string().required(),
//     date: Joi.string().required()
//   }
// }), EventController.update);
router.post("/", celebrate(eventVerification), EventController.create);
router.put("/:id", celebrate(eventVerification), EventController.update);
router.patch("/:id", celebrate(eventVerification), EventController.update);
router.delete("/:id", EventController.remove);

module.exports = router;