const {Schema} = require("mongoose");

const EventSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  sponsors: [{
    type: Schema.Types.ObjectId, 
    ref: "Sponsor"
  }],
  chapter: [{
    type: Schema.Types.ObjectId,
    ref: "Chapter",
    required: true
  }],
  approved: Boolean,
  type: [{
    type: String,
    enum: ["Workshop", "Meetup"],
    required: true
  }]
})

module.exports = EventSchema