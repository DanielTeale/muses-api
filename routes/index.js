const express = require("express");
const router = express.Router();
const AuthRoutes = require("./auth_routes")
const EventRoutes = require("./event_routes")
const MailingListRoutes = require("./mailing_list_routes")
const SponsorRoutes = require("./sponsor_routes")
const ChapterRoutes = require("./chapter_routes")
const passport = require("passport")
const fileRoute = require("../services/aws_service")
const ResourceRoutes = require("./resource_routes");

router.get("/", (req, res) => res.send("Welcome"))
// router.post("/files", fileRoute.fileUpload)
router.use("/auth", AuthRoutes)
router.use("/mailinglist", MailingListRoutes)
router.use("/events", EventRoutes)
router.use("/sponsor", passport.authenticate("jwt", { session: false }), SponsorRoutes)
router.use("/chapter", ChapterRoutes);
router.use("/resources", ResourceRoutes);

module.exports = router;