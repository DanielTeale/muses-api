const express = require("express");
const router = express.Router();
const AuthRoutes = require("./auth_routes")
const EventRoutes = require("./event_routes")
const MailingListRoutes = require("./mailing_list_routes")
const SponsorRoutes = require("./sponsor_routes")
const ChapterRoutes = require("./chapter_routes")
const passport =  require("passport")

router.get("/", (req, res) => res.send("Welcome"))
router.use("/auth", AuthRoutes)
router.use("/mailinglist", MailingListRoutes)
router.use("/events", passport.authenticate("jwt", {session: false}), EventRoutes)
router.use("/sponsor", passport.authenticate("jwt", {session: false}), SponsorRoutes)
router.use("/chapter", passport.authenticate("jwt", { session: false }), ChapterRoutes);

module.exports = router;