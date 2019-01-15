const SponsorModel = require("../database/models/sponsor_model");

async function index(req, res, next) {
  try{
    const sponsors = await SponsorModel.find();
    return res.json(sponsors);
  } catch (err) {
    return next(err)
  }
};

async function show(req, res, next) {
  const {id} = req.params;
  try {
    const sponsor = await SponsorModel.findById(id)
    return res.json(sponsor)
  } catch (err) {
    return next(err)
  }
}

async function create(req, res, next) {
  const {name, description, website, logo} = req.body
  const sponsor = new SponsorModel({name, description, website, logo})
  try {
    await sponsor.save()
    return res.json(sponsor)
  } catch(err) {
    return next(err)
  }
};

async function update(req, res, next) {
  const {id} = req.params
  const {name, description, website, logo} = req.body
  try{
    const sponsor = await SponsorModel.findById(id)
    sponsor.name = name,
    sponsor.description = description
    sponsor.website = website,
    sponsor.logo = logo
    await sponsor.save()
    return res.json(sponsor)
  } catch(err) {
    return next(err)
  }
};

async function remove(req, res, next) {
  const {id} = req.params
  try {
    const sponsor = await SponsorModel.findById(id)
    await SponsorModel.remove(sponsor)
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