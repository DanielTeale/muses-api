const UserModel = require("../database/models/user_model")
const JWTService = require("../services/jwt_service")


function register(req, res, next) {
  const { email, password, name, bio } = req.body
  const user = new UserModel({ email, name })

  UserModel.register(user, password, (err, user) => {
    if (err) {
      return next(console.log(err))
    }
    const token = JWTService.generateToken(user)
    return res.json(token)
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
  return res.json(token)
}

module.exports = {
  register,
  loginVerify
}