const mongoose = require("mongoose");
const ResourceSchema = require("./../schema/resource_schema");

const ResourceModel = mongoose.model("Resource", ResourceSchema);

module.exports = ResourceModel;