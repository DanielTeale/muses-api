const EventModel = require("../database/models/event_model")

async function index(req, res, next) {
  try {
    const events = await EventModel.find()
    return res.json(events)
  } catch (err) {
    return next(console.log(err));
  }
}

async function create(req, res, next) {
  const {title, description, date, location} = req.body;
  const event = new EventModel({ title, description, date, location })

  try {
    await event.save();
    return res.json(event)
  } catch (err) {
    return next(err)
  }
};

async function update(req, res, next) {
  const { id } = req.params
  const { title, description, date, location } = req.body
  const event = await EventModel.findById(id)

  try {
    event.title = title
    event.description = description
    event.date = date
    event.location = location
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
  create,
  update,
  remove
}