const multiparty = require("multiparty")
const AWSService = require("../services/aws_service")
const NewsModel = require("../database/models/news_model")

async function index(req, res) {
  try{
    const news = await NewsModel.find()
    return res.json(news)
  } catch (err) {
    return console.log(err)
  }
};

async function create(req, res) {
  // const {title, content, date_created, date_updated, image}
  let form = new multiparty.Form()
  form.parse(req, async (error, fields, files) => {
    if (error) throw new Error(error);
    try {
      if (files.file) {
        var data = await AWSService.fileUpload(files)
      }
      const formFields = AWSService.fieldParseCreate(fields, data)
      
      const date = new Date()

      formFields.date_created = date
      formFields.date_edited = date

      const newsItem = new NewsModel(formFields)

      try {
        await newsItem.save();
        const news = await NewsModel.find();
        return res.json(news)
      } catch (err) {
        return console.log(err)
      }
    } catch (err) {
      return console.log(err)
    }
  })
};

async function update(req, res) {
  const {id} = req.params
  let form = new multiparty.Form()
  form.parse(req, async (error, fields, files) => {
    if (error) throw new Error(error);
    try {
      if (files.file) {
        var data = await AWSService.fileUpload(files)
      }
      const newsItem = await NewsModel.findById(id)
      const updatedNews = AWSService.fieldsParseUpdate(fields, data, newsItem)

      const date = new Date()

      updatedNews.date_edited = date

      try {
        await updatedNews.save();
        const news = await NewsModel.find();
        return res.json(news)
      } catch (err) {
        return console.log(err)
      }
    } catch (err) {
      return console.log(err)
    }
  })
};

async function remove(req, res) {
  const { id } = req.params
  try {
    const newsItem = await NewsModel.findById(id)
    await NewsModel.remove(newsItem)
    return res.send("Removed")
  } catch (err) {
    return next(err)
  }
};

module.exports = {
  index,
  create,
  update,
  remove
}