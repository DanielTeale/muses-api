const EventModel = require("../database/models/event_model");
const AWSService = require("../services/aws_service");
const multiparty = require("multiparty");
const fileType = require("file-type");
const fs = require("fs-extra");

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

//Create
async function create(req, res) {
  let form = new multiparty.Form();
  form.parse(req, async (error, fields, files) => {
    if (error) {throw new Error(error);}
    console.log(files);
    try {

      if (files.file) {
        const path = files.file[0].path;
        const buffer = fs.readFileSync(path);
        const type = fileType(buffer);
        const timestamp = Date.now().toString();
        const fileName = `uploads/${timestamp}`;

        var data = await AWSService.uploadFile(buffer, fileName, type);
      }
      const formFields = {}
      for (let key in fields) {
        formFields[key] = fields[key][0];
      }
     
      if (data) {
        formFields.image = data.Location;
      } else {
        formFields.image = "https://source.unsplash.com/user/erondu/1600x900";
      }
      
      const event = new EventModel(formFields);
      try{
        await event.save();
        const events = await EventModel.find().populate('sponsors').populate('chapter').exec();
        return res.json(events);
      } catch(err){
        return console.log(err);
      }
    }catch(err){
      return res.json(err);
    }
  })
}

//Update
async function update(req, res, next) {

  let form = new multiparty.Form();
  form.parse(req, async (error, fields, files) => {
    if (error) {throw new Error(error);}
    console.log(files);
    try {

      if (files.file) {
        const path = files.file[0].path;
        const buffer = fs.readFileSync(path);
        const type = fileType(buffer);
        const timestamp = Date.now().toString();
        const fileName = `uploads/${timestamp}`;

        var data = await AWSService.uploadFile(buffer, fileName, type);
      }

      const formFields = {}
      for (let key in fields) {
        formFields[key] = fields[key][0];
      }
     
      if (data) {
        formFields.image = data.Location;
      } else {
        formFields.image = "https://source.unsplash.com/user/erondu/1600x900";
      }
      
      //const event = new EventModel(formFields);
      //const event = await EventModel.findById(req.param.id);
      
      try{
        const event = await EventModel.findByIdAndUpdate(req.params.id, formFields);
       // console.log(fields);
        await event.save();
        const events = await EventModel.find().populate('sponsors').populate('chapter').exec();
        return res.json(events);
      } catch(err){
        return console.log(err);
      }
    }catch(err){
      return res.json(err);
    }
  })






  // const { id } = req.params
  // const { image, title, description, date, location, chapter, sponsors, type, approved } = req.body
  // const event = await EventModel.findById(id)

  // try {
  //   event.image = image
  //   event.title = title
  //   event.description = description
  //   event.date = date
  //   event.location = location
  //   event.chapter = chapter
  //   event.sponsors = sponsors
  //   event.type = type
  //   event.approved = approved
  //   await event.save()

  //   return res.json(event)
  // } catch (err) {
  //   return next(err)
  // }
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