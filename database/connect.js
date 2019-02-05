require("dotenv").config();
const mongoose = require("mongoose");
console.log(process.env.DB_HOST)

mongoose.connect(process.env.DB_HOST, { useNewUrlParser: true });
mongoose.Promise = global.Promise;
mongoose.connection.on("error", console.log);

module.exports = mongoose;