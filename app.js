const express = require("express");
const morgan = require("morgan")
const app = express()

app.use(express.urlencoded({extended: false}))
app.use(express.json())

app.use(morgan("combined"))

app.use(require("./routes"))

module.exports = app;