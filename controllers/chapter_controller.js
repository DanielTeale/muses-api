const ChapterModel = require("../database/models/chapter_model")

async function index(req, res, next) {
  try {
    const chapters = await ChapterModel.find()
    return res.json(chapters)
  } catch (err) {
    return next(err)
  }
};

async function show(req, res, next) {
  const { id } = req.params
  try {
    const chapter = await ChapterModel.findById(id)
    return res.json(chapter)
  } catch (err) {
    return next(err)
  }
};

async function create(req, res, next) {
  const { city } = req.body
  const chapter = new ChapterModel({ city })
  try {
    await chapter.save()
    return res.json(chapter)
  } catch (err) {
    return next(err)
  }
};

async function update(req, res, next) {
  const { id } = req.params;
  const { city, organisers } = req.body;
  console.log(city);
  try {
    const chapter = await ChapterModel.findById(id)
    chapter.city = city
    if (organisers) {
      const organisersIds = chapter.organisers.map(organiser => organiser.toString());
      organisers
        .filter(organiser => !organisersIds.includes(organiser._id))
        .forEach(organiser => {
          chapter.organisers.push(organiser)
        });
    };
    await chapter.save();
    const chapters = await ChapterModel.find();
    return res.json(chapters)
  } catch (err) {
    return next(err)
  }
};

async function remove(req, res, next) {
  const { id } = req.params;
  try {
    const chapter = await ChapterModel.findById(id)
    await ChapterModel.remove(chapter)
    return res.send("Removed")
  } catch (err) {
    return next(err)
  }
};

module.exports = {
  index,
  show,
  create,
  update,
  remove
}