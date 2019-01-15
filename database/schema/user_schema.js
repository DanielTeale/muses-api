const {Schema} = require("mongoose")
const ChapterSchema = require("./chapter_schema")
const passportLocalMongoose = require("passport-local-mongoose")

const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  bio: {
    type: String,
    required: true
  },
  avatar: {
    type: String,
  },
  chapter: {ChapterSchema},
  website: {
    type: String
  }
  // TODO: link 
  // socialMedia: []
})

UserSchema.plugin(passportLocalMongoose, {usernameField: "email"})

module.exports = UserSchema;