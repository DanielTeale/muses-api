const mongoose = require("mongoose");
const ChapterSchema = require("../schema/chapter_schema");

const ChapterModel = mongoose.model("Chapter", ChapterSchema);

module.exports = ChapterModel;