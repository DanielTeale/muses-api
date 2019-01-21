const {Schema} = require("mongoose")
const ChapterSchema = require("./chapter_schema")
const passportLocalMongoose = require("passport-local-mongoose")

const UserSchema = new Schema({
  email: String,
  name: {
    type: String,
    required: true
  },
  bio: {
    type: String,
  },
  avatar: {
    type: String,
  },
  chapter: {
    type: Schema.Types.ObjectId,
    ref: "Chapter"
  },
  website: {
    type: String
  }
  // TODO: link 
  // socialMedia: []
})

UserSchema.plugin(passportLocalMongoose, {usernameField: "email"})

module.exports = UserSchema;