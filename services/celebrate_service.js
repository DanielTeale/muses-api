const {Joi} = require("celebrate")

const userVerification = {
  body: {
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    name: Joi.string(),
    avatar: Joi.string(),
    chapter: Joi.string(),
    url: Joi.string(),
    socialMedia: Joi.array()
  }
}


const eventVerification = {
  body: {
    title: Joi.string().required(),
    description: Joi.string().required(),
    date: Joi.string().required(),
    location: Joi.string().required(),
    sponsors: Joi.array(),
    approved: Joi.boolean().required(),
    type: Joi.string().required()
  }
}

const mailingListVerification = {
  body: {
    email: Joi.string().required(),
    name: Joi.string().required(),
    chapter: Joi.string().required()

    // TODO: chapter/city integration
    // city: 
  }
}

const chapterVerification = {
  body: {
    city: Joi.string().required(),
    organisers: Joi.array()
  }
}

const sponsorVerification = {
  body: {
    name: Joi.string().required(),
    description: Joi.string().required(),
    website: Joi.string().required(),
    logo: Joi.string().required()
  }
}

module.exports = {
  userVerification,
  eventVerification,
  mailingListVerification,
  chapterVerification,
  sponsorVerification
}