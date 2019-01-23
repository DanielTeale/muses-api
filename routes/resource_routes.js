const express = require("express");
const router = express.Router();
const { resourceVerification } = require("../services/celebrate_service");
const { celebrate } = require("celebrate");
const passport = require("passport");

const ResourceController = require("./../controllers/resource_controller");

router.get("/", ResourceController.index);
router.get("/:id", ResourceController.show)
router.post("/", celebrate(resourceVerification), passport.authenticate("jwt", { session: false }), ResourceController.create);
router.put("/:id", celebrate(resourceVerification), passport.authenticate("jwt", { session: false }), ResourceController.update);
router.patch("/:id", celebrate(resourceVerification), passport.authenticate("jwt", { session: false }), ResourceController.update);
router.delete("/:id", passport.authenticate("jwt", { session: false }), ResourceController.remove);

module.exports = router;