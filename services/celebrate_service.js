const {Joi} = require("celebrate")

const userVerification = {
  body: {
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    name: Joi.string()
  }
}


const eventVerification = {
  body: {
    title: Joi.string().required(),
    description: Joi.string().required(),
    date: Joi.string().required()
  }
}


module.exports = {
  userVerification,
  eventVerification
}