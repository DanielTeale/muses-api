const multiparty = require("multiparty");
const SponsorModel = require("../database/models/sponsor_model");
const AWSService = require("../services/aws_service")

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

async function create(req, res) {
  let form = new multiparty.Form()
  form.parse(req, async (error, fields, files) => {
    if (error) throw new Error(error);
    try {
      if (files.file) {
        var data = await AWSService.fileUpload(files)
      }
      const formFields = AWSService.fieldParse(fields, data)

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
  let form = new multiparty.Form()
  form.parse(req, async (error, fields, files) => {
    if (error) throw new Error(error);
    try {
      if (files.file) {
        var data = await AWSService.fileUpload(files)
      }
      const sponsor = await SponsorModel.findById(id)
      const updatedSponsor = AWSService.fieldsParseUpdate(fields, data, sponsor)
      await updatedSponsor.save()
      const sponsors = await SponsorModel.find()
      return res.json(sponsors)
    } catch(err) {
      return next(err)
    }
  })
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