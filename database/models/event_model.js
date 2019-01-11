const mongoose = require("mongoose")
const EventSchema = require("../schema/event_schema")

const EventModel = mongoose.model("Event", EventSchema);

module.exports = EventModel;