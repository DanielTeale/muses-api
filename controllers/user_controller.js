const multiparty = require("multiparty")
const UserModel = require("../database/models/user_model")
const mongoose = require("mongoose")
const JWTService = require("../services/jwt_service")
const AWSService = require("../services/aws_service")

async function register(req, res) {
  let form = new multiparty.Form()
  form.parse(req, async (error, fields, files) => {
    if (error) throw new Error(error);

    try {
      if (files.file) {
        var data = await AWSService.fileUpload(files)
      }
      const formFields = AWSService.fieldsParseCreate(fields, data)
      
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
  const { email, password } = req.body
  const user = await UserModel.findOne({ email })
  if (!user) {
    return next(res.status(401).send("Invalid Username or password"))
  }
  const valid = user.authenticate(password);
  if (!valid) {
    return next(res.status(401).send("Invalid Username or password"))
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
        var data = await AWSService.fileUpload(files)
      }
    
      const user = await UserModel.findOne({email: fields.email[0]})
      const updatedUser = AWSService.fieldsParseUpdate(fields, data, user)
      
      try{
        await updatedUser.save()
        delete updatedUser.hash
        delete updatedUser.salt
        const token = JWTService.generateToken(updatedUser)
        const data = {user: updatedUser, token}
        return res.json(data);
      } catch (err) {
        console.log(err)
      }
    } catch (err) {
      // return res.status(400).send(err)
      return console.log(err)
    }
  });
}

async function refresh(req, res) {
  try {
    const user = req.user

    const token = JWTService.generateToken(user)
    const data = { user, token }
    return res.json(data)
  } catch (err) {
    return res.send(err)
  }
}

async function index(req, res) {
  try {
    let users;
    if (req.query.city === undefined) {
      users = await UserModel.find()
    } else {
      const chapter = mongoose.Types.ObjectId(req.query.city);
      users = await UserModel.find({ chapter });
    }
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