const AWS = require("aws-sdk")
const fs = require("fs-extra");
const bluebird = require("bluebird");
const fileType = require("file-type");
const multiparty = require("multiparty")

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_ID,
  secretAccessKey: process.env.AWS_ACCESS_KEY
});

AWS.config.setPromisesDependency(bluebird);

const s3 = new AWS.S3();

const uploadFile = (buffer, name, type) => {
  const params = {
    ACL: 'public-read',
    Body: buffer,
    Bucket: process.env.AWS_BUCKET,
    ContentType: type.mime,
    Key: `${name}.${type.ext}`
  }
  return s3.upload(params).promise()
};

const fileUpload = async (files) => {
  const path = files.file[0].path;
  const buffer = fs.readFileSync(path);
  const type = fileType(buffer);
  const timestamp = Date.now().toString();
  const fileName = `uploads/${timestamp}`;
  const data = await uploadFile(buffer, fileName, type)
  return data
}

const fieldParseCreate = (fields, data) => {
  const formFields = {}
  for (let key in fields) {
    if (key !== "password") {
      formFields[key] = fields[key][0]
    }
  }
  if (data) {
    formFields.image = data.Location
  } else {
    formFields.image = null
  }
  return formFields
}

const fieldsParseUpdate = (fields, data, model) => {
  for (let key in fields) {
    if (key !== "password") {
      model[key] = fields[key][0]
    }
  }
  if (data) {
    model.image = data.Location
  }
  return model
}

module.exports = {
  fileUpload,
  uploadFile,
  fieldParseCreate,
  fieldsParseUpdate
};