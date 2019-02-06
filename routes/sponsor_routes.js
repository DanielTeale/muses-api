const express = require("express");
const router = express.Router();
const {celebrate} = require("celebrate")
const SponsorController = require("../controllers/sponsor_controller")
const {sponsorVerification} = require("../services/celebrate_service");
const passport = require("passport")

router.get("/", SponsorController.index)

router.get("/:id", SponsorController.show)

router.post("/", passport.authenticate("jwt", { session: false }), SponsorController.create);

router.put("/:id", passport.authenticate("jwt", { session: false }), SponsorController.update);
router.patch("/:id", passport.authenticate("jwt", { session: false }), SponsorController.update);

router.delete("/:id", SponsorController.remove)

module.exports = router;