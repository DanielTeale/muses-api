const ResourceModel = require("../database/models/resource_model");

async function index(req, res, next) {
  try {
    const resources = await ResourceModel.find()
    return res.json(resources)
  } catch (err) {
    return next(console.log(err));
  }
}

async function show(req, res, next) {
  const { id } = req.params;
  try {
    const resource = await ResourceModel.findById(id)
    return res.status(200).json(resource)
  } catch (err) {
    return res.status(400).send(err)
  }
};

async function create(req, res, next) {
  const { title, description, link } = req.body;
  const resource = new ResourceModel({ title, description, link });

  try {
    await resource.save();
    return res.json(resource)
  } catch (err) {
    return next(err)
  }
};

async function update(req, res, next) {
  const { id } = req.params
  const { title, description, link } = req.body
  const resource = await ResourceModel.findById(id)

  try {
    resource.title = title
    resource.description = description
    resource.link = link
    await resource.save()

    return res.json(resource)
  } catch (err) {
    return next(err)
  }
}

async function remove(req, res, next) {
  const { id } = req.params

  try {
    const resource = await ResourceModel.findById(id)
    await ResourceModel.remove(resource)
    return res.send("Removed")
  } catch (err) {
    return next(err)
  }
}

module.exports = {
  index,
  show,
  create,
  update,
  remove
}