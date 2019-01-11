const express = require("express");
const morgan = require("morgan")
const app = express()
const passport = require("./config/passport")

app.use(passport.initialize())

app.use(express.urlencoded({extended: false}))
app.use(express.json())

app.use(morgan("combined"))

app.use(require("./routes"))

module.exports = app;