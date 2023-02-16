const express = require("express");
const { generateUploadURL } = require("./connectS3");
const { uploadFile, getFileStream } = require("./sendFile");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
var cors = require("cors");

var app = express();
app.use(cors());

app.get("/api/s3url", async (req, res) => {
  const URL = await generateUploadURL();
  console.log(URL);
  res.json({ URL });
});

//Get a image from s3 server
app.get("/image/:key", (req, res) => {
  const key = req.params.key;
  const readStream = getFileStream(key);
  readStream.pipe(res);
});

//Add image from server
app.post("/api/addImg", upload.single("image"), async (req, res) => {
  const file = req.file;
  console.log(req.file);
  // console.log(req.body);
  const result = await uploadFile(file);
  console.log(result);
  res.json({ msg: "yolo" });
});

const PORT = 8000;

app.listen(PORT, () => {
  console.log("PORT started at: " + PORT);
});
