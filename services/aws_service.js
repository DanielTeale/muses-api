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

const fileUpload = (req, res, next) => {
  const form = new multiparty.Form();
  form.parse(req, async (error, fields, files) => {
    if (error) throw new Error(error);
    try {
      const path = files.file[0].path;
      const buffer = fs.readFileSync(path);
      const type = fileType(buffer);
      const timestamp = Date.now().toString();
      const fileName = `uploads/${timestamp}`;
      const data = await uploadFile(buffer, fileName, type)
      return data
    } catch (err) {
      return res.status(400).send(err)
    }
  })
};

module.exports = {
  fileUpload,
  uploadFile
};