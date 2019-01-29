const UserModel = require("../database/models/user_model")
const JWTService = require("../services/jwt_service")
const AWSService = require("../services/aws_service")
const multiparty = require("multiparty")
const fileType = require("file-type");
const fs = require("fs-extra");

async function register(req, res) {
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
        if (key !== "password"){
          formFields[key] = fields[key][0]
        }
      }
      console.log(data)
      if (data) {
        formFields.avatar = data.Location
      } else {
        formFields.avatar = null
      }
      
      const password = fields.password[0]
      const user = new UserModel(formFields)

      UserModel.register(user, password, (err, user) => {
        if (err) {
          return console.log(err)
        }
        const token = JWTService.generateToken(user)
        const userObject = JSON.parse(JSON.stringify(user))
        delete userObject["salt"]
        delete userObject["hash"]
        const data = { user: userObject, token }
        return res.json(data)
      })
    } catch (err) {
      return console.log(err)
    }
  })
}

async function loginVerify(req, res, next) {
  const {email, password} = req.body
  const user = await UserModel.findOne({email})
  if (!user) {
    return next(res.send("Incorrect name or password"))
  }
  const valid = user.authenticate(password);
  if (!valid) {
    return next(res.send("Incorrect name or password"))
  }
  const token = JWTService.generateToken(user)
  const userObject = JSON.parse(JSON.stringify(user))
  delete userObject["salt"]
  delete userObject["hash"]
  const data = { user: userObject, token }
  return res.json(data)
}

async function update(req, res) {
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
    
      const user = await UserModel.findOne({email: fields.email[0]})
      for (let key in fields) {
        user[key] = fields[key][0]
      }
      if (data) {
        user["avatar"] = data.Location
      }
      try{
        await user.save()
        delete user.hash
        delete user.salt
        const token = JWTService.generateToken(user)
        const data = {user, token}
        return res.json(data);
      } catch (err) {
        console.log(err)
      }
    } catch (err) {
      return res.status(400).send(err)
    }
  })
}

async function refresh(req, res) {
  try{
    const user = req.user

    const token = JWTService.generateToken(user)
    const data = {user, token}
    return res.json(data)
  } catch (err) {
    return res.send(err)
  }
}

async function index(req, res) {
  try{
    const {chapter} = req.body
    const users = await UserModel.find({chapter: chapter})
    users.forEach((user) => {
      delete user.salt;
      delete user.hash;
    })
    return res.json(users)
  } catch (err) {
    return console.log(err)
  }
}

module.exports = {
  register,
  loginVerify,
  update,
  refresh,
  index
}