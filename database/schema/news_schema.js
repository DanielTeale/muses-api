const {Schema} = require("mongoose")
const UserSchema = require("./user_schema")

const NewsSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  author: {UserSchema},
  date_created: {
    type: String
  },
  date_edited: {
    type: String
  },
  image: String,
  chapter: {
    type: Schema.Types.ObjectId,
    ref: "Chapter"
  }
});

module.exports = NewsSchema;