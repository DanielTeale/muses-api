const EventModel = require("../database/models/event_model")

async function index(req, res, next) {
  try {
    const events = await EventModel.find().populate('sponsors').populate('chapter').exec()
    return res.json(events)
  } catch (err) {
    return next(console.log(err));
  }
}

async function show(req, res, next) {
  const {id} = req.params;
  try {
    const event = await EventModel.findById(id)
    return res.status(200).json(event)
  } catch (err) {
    return res.status(400).send(err)
  }
};

async function chapterIndex(req, res, next) {
  const {chapter} = req.params;
  try {
    const events = await EventModel.find({chapter: chapter})
    return res.status(200).json(events);
  } catch (err) {
    return res.status(400).send(err)
  }
}

async function create(req, res, next) {
  const {image, title, description, date, location, chapter, sponsors, type, approved} = req.body;
  const event = new EventModel({ image, title, description, date, location, chapter, sponsors, type, approved })

  try {
    await event.save();
    return res.json(event)
  } catch (err) {
    return next(err)
  }
};

async function update(req, res, next) {
  const { id } = req.params
  const { image, title, description, date, location, chapter, sponsors, type, approved } = req.body
  const event = await EventModel.findById(id)

  try {
    event.image = image
    event.title = title
    event.description = description
    event.date = date
    event.location = location
    event.chapter = chapter
    event.sponsors = sponsors
    event.type = type
    event.approved = approved
    await event.save()

    return res.json(event)
  } catch (err) {
    return next(err)
  }
}

async function remove(req, res, next) {
  const { id } = req.params

  try {
    const event = await EventModel.findById(id)
    await EventModel.remove(event)
    return res.send("Removed")
  } catch (err) {
    return next(err)
  }
}

module.exports = {
  index,
  show,
  chapterIndex,
  create,
  update,
  remove
}