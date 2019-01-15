const express = require("express");
const router = express.Router();
const {celebrate} = require("celebrate")
const SponsorController = require("../controllers/sponsor_controller")
const {sponsorVerification} = require("../services/celebrate_service");

router.get("/", SponsorController.index)

router.get("/:id", SponsorController.show)

router.post("/", celebrate(sponsorVerification), SponsorController.create);

router.put("/:id", celebrate(sponsorVerification), SponsorController.update);
router.patch("/:id", celebrate(sponsorVerification), SponsorController.update);

router.delete("/:id", SponsorController.remove)

module.exports = router;