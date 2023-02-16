var dotenv = require("dotenv");
dotenv.config();
// var AWS = require("aws-sdk");
// const { S3 } = require("@aws-sdk/client-s3");
const S3 = require("aws-sdk/clients/s3");

const { v4: uuidv4 } = require("uuid");

const bucketName = process.env.AWS_BUCKET_NAME;
const region = process.env.AWS_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCCESS_KEY;

const s3 = new S3({
  region,
  accessKeyId,
  secretAccessKey,
  signatureVersion: "v4",
});

async function generateUploadURL() {
  const imageName = uuidv4();
  const params = {
    Bucket: bucketName,
    Key: imageName,
    Expires: 6000,
  };
  try {
    // const uploadURL = await s3.getSignedUrlPromise("putObject", params);
    const uploadURL = await s3.getSignedUrlPromise("putObject", params);
    return uploadURL;
  } catch (err) {
    console.log("ERRRR: " + err);
  }
}

module.exports = { generateUploadURL };
