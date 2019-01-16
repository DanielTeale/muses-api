const mongoose = require("mongoose");
const SponsorSchema = require("../schema/sponsor_schema");

const SponsorModel = mongoose.model("Sponsor", SponsorSchema);

module.exports = SponsorModel;