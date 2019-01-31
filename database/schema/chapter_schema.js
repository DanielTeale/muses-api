const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const UserSchema = require("./user_schema")

const ChapterSchema = new Schema({
  city: {
    type: String,
    required: true
  },
  organisers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }]
})

module.exports = ChapterSchema