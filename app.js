const express = require("express");
const morgan = require("morgan")
const app = express()
const passport = require("./config/passport")
const cors = require("cors")
const {errors} = require("celebrate")

app.use(passport.initialize())

app.use(cors({
  origin: process.env.FRONT_END_DOMAIN
}))

app.use(express.urlencoded({extended: false}))
app.use(express.json())

app.use(morgan("combined"))

app.use(require("./routes"))

module.exports = app;