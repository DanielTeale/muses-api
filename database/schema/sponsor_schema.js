const {Schema} = require("mongoose")

const SponsorSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  website: {
    type: String,
    required: true
  },
  logo: {
    type: String
  }
})

module.exports = SponsorSchema;