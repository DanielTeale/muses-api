const mongoose = require("mongoose")
const UserSchema = require("../schema/user_schema")

const UserModel = mongoose.model("User", UserSchema);

module.exports = UserModel;

