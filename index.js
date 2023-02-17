const express = require("express");
const { generateUploadURL } = require("./connectS3");
const { uploadFile, getFileStream } = require("./sendFile");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
var cors = require("cors");
const csv = require("csv-parser");
const fs = require("fs");
// const test = require("./test.csv");
var app = express();
var xlsx = require("node-xlsx");
// const path = require("path");
app.use(cors());

app.get("/csv", (req, res) => {
  let results = [];
  fs.createReadStream("test.csv")
    .pipe(csv())
    .on("data", (data) => results.push(data))
    .on("end", () => {
      res.send(results);
      // [
      //   { NAME: 'Daffy Duck', AGE: '24' },
      //   { NAME: 'Bugs Bunny', AGE: '22' }
      // ]
    });
});
app.get("/xlsx", (req, res) => {
  var obj = xlsx.parse(__dirname + "/test.xlsx"); // parses a file
  var result = [];

  //looping through all sheets
  // for (var i = 0; i < obj.length; i++) {
  //   var sheet = obj[i];
  //   //loop through all rows in the sheet
  //   for (var j = 0; j < sheet["data"].length; j++) {
  //     //add the row to the rows array
  //     rows.push(sheet["data"][j]);
  //   }
  // }
  res.json(obj);
  //creates the csv string to write it to a file
  // for (var i = 0; i < rows.length; i++) {
  //   writeStr += rows[i].join(",") + "\n";
  // }

  //writes to a file, but you will presumably send the csv as a
  //response instead
  // fs.writeFile(__dirname + "/test.csv", writeStr, function (err) {
  //   if (err) {
  //     return console.log(err);
  //   }
  //   console.log("test.csv was saved in the current directory!");
  // });
});
app.get("/api/s3url", async (req, res) => {
  const URL = await generateUploadURL();
  console.log(URL);
  res.json({ URL });
});

//Get a image from s3 server
app.get("/image/:key", (req, res) => {
  const key = req.params.key;
  const readStream = getFileStream(key);
  let results = [];
  file
    .pipe(csv())
    .on("data", function (data) {
      results.push(data); // --> here
    })
    .on("end", () => {
      res.send({ results: results });
      console.log("done");
    });
  readStream.pipe(res);
});

//Get a CSV/XLSX from s3 server
app.get("/csv/:key", (req, res) => {
  const key = req.params.key;
  const file = getFileStream(key);
  // readStream.pipe(res);
  let results = [];
  file
    .pipe(csv())
    .on("data", function (data) {
      results.push(data);
    })
    .on("end", () => {
      res.send({ results: results });
      console.log("done");
    });
});

//Get a XLSX from s3 server
app.get("/xlsx/:key", (req, res) => {
  const key = req.params.key;
  const file = getFileStream(key);
  var buffers = [];
  file.on("data", function (data) {
    buffers.push(data);
  });

  file.on("end", function () {
    var buffer = Buffer.concat(buffers);
    var workbook = xlsx.parse(buffer);
    // console.log("workbook", workbook);
    res.json({ result: workbook });
  });
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
