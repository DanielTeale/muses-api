const SponsorModel = require("../database/models/sponsor_model");
const AWSService = require("../services/aws_service")
const multiparty = require("multiparty");
const fileType = require("file-type");
const fs = require("fs-extra");

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
  let form = new multiparty.Form()
  form.parse(req, async (error, fields, files) => {
    if (error) throw new Error(error);
    try {
      if (files.file) {
        const path = files.file[0].path;
        const buffer = fs.readFileSync(path);
        const type = fileType(buffer);
        const timestamp = Date.now().toString();
        const fileName = `uploads/${timestamp}`;

        var data = await AWSService.uploadFile(buffer, fileName, type)
      }
      const formFields = {}
      for (let key in fields) {
        formFields[key] = fields[key][0]
      }
      if (data) {
        formFields.logo = data.Location
      } else {
        formFields.logo = null
      }

      const sponsor = new SponsorModel(formFields)

      try {
        await sponsor.save()
        const sponsors = await SponsorModel.find()
        return res.json(sponsors)
      } catch (err) {
        return console.log(err)
      }
    }catch (err) {
      console.log(err)
    }})
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