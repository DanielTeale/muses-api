const UserModel = require("../database/models/user_model")
const JWTService = require("../services/jwt_service")
const AWSService = require("../services/aws_service")
const multiparty = require("multiparty")


async function register(req, res, next) {
  const { email, password, name, bio, chapter, website } = req.body;
  // console.log(req)
  // let form = new multiparty.Form()
  // form.parse(req, () => {
    
  // })

  const user = new UserModel({ email, name, bio, chapter, website })
  
  // await AWSService.fileUpload(req, res, next )

  UserModel.register(user, password, (err, user) => {
    if (err) {
      return next(console.log(err))
    }
    const token = JWTService.generateToken(user)
    const data = {user, token}
    return res.json(data)
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
  const data = { user, token }
  return res.json(data)
}

async function update(req, res) {

  const {email, name, bio, chapter, website, avatar} = req.body
  const user = await UserModel.findOne({ email })


  try {
    user.email = email
    user.name = name
    user.bio = bio
    user.chapter = chapter
    user.website = website
    user.avatar = avatar
    await user.save()
    const token = JWTService.generateToken(user)
    const data = {user, token}
    return res.json(data);
  } catch (err) {
    return res.status(400).send(err)
  }
}

module.exports = {
  register,
  loginVerify,
  update
}