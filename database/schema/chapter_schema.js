const {Schema} = require("mongoose")
const UserSchema = require("./user_schema")

const ChapterSchema = new Schema({
  city: {
    type: String,
    required: true
  },
  organisers: [UserSchema]
})

module.exports = ChapterSchema