const mongoose = require("mongoose")
const NewsSchema = require("../schema/news_schema")

const NewsModel = mongoose.model("News", NewsSchema);

module.exports = NewsModel;