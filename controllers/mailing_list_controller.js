const MailingListModel = require("../database/models/mailing_list_model");

async function index(req, res, next) {
  try {
    const mailingList = await MailingListModel.find();
    return res.json(mailingList)
  } catch (err) {
    return next(err)
  };
};

async function show(req, res, next) {
  const {id} = req.params
  try {
    const mailingList = await MailingListModel.findById(id)
    return res.json(mailingList);
  } catch (err) {
    return next(err)
  };
};

async function chapterIndex(req, res, next) {
  const {chapter} = req.params
  try {
    const mailingList = await MailingListModel.find({chapter: chapter})
    return res.json(mailingList)
  } catch (err) {
    return next(err)
  }
}

async function create(req, res, next) {
  const {name, email, chapter} = req.body;
  const mailingList = new MailingListModel({name, email, chapter})
  try {
    await mailingList.save();
    return res.json(mailingList)
  } catch (err) {
    return res.json(err)
  }
};

async function update(req, res, next) {
  const {id} = req.params;
  const {name, email, chapter} = req.body;
  try {
    const mailingList = await MailingListModel.findById(id);
    
    mailingList.name = name;
    mailingList.email = email;
    mailingList.chapter = chapter;
    
    await mailingList.save();
    
    return res.json(mailingList);
  } catch (err) {
    return next(err)
  }
};

async function remove(req, res, next) {
  const {id} = req.params;
  try {
    const mailingList = await MailingListModel.findById(id);
    await MailingListModel.remove(mailingList);
    return res.send("Removed")
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  index,
  chapterIndex,
  show,
  create,
  update,
  remove
}

