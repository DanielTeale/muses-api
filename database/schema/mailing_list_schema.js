const { Schema } = require("mongoose")
const ChapterSchema = require("./chapter_schema")

const MailingListSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  chapter: {type: Schema.Types.ObjectId, ref: "Chapter"}
})

module.exports = MailingListSchema;