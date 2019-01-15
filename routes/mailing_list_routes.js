const express = require("express");
const router = express.Router();
const MailingListController = require("../controllers/mailing_list_controller")
const {celebrate} = require("celebrate")
const {mailingListVerification} = require("../services/celebrate_service")

router.get("/", MailingListController.index);

router.get("/:id", MailingListController.show);

router.get("/chapter/:chapter", MailingListController.chapterIndex)

router.post("/", celebrate(mailingListVerification), MailingListController.create);

router.put("/:id", celebrate(mailingListVerification), MailingListController.update);
router.patch("/:id", celebrate(mailingListVerification), MailingListController.update);

router.delete("/:id", MailingListController.remove);

module.exports = router;
