const mongoose = require("mongoose");
const MailingListSchema = require("../schema/mailing_list_schema")

const MailingListModel = mongoose.model("Mailing_List", MailingListSchema)

module.exports = MailingListModel;