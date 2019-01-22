const {Schema} = require("mongoose");

const EventSchema = new Schema({
  image:{
    type: String
  },
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
    type: Date,
    required: true
  },
  sponsors: [{
    type: Schema.Types.ObjectId, 
    ref: "Sponsor"
  }],
  chapter: {
    type: Schema.Types.ObjectId,
    ref: "Chapter",
    required: true
  },
 
  type: {
    type: String,
    enum: ["Workshop", "Meetup"],
    required: true
  },
  approved: Boolean
})

module.exports = EventSchema