const dotenv = require("dotenv");
dotenv.config();
var path = require("path");
const express = require("express");
const mockAPIResponse = require("./mockAPI.js");

const app = express();

app.use(express.static("dist"));

console.log(__dirname);
console.log(`Your API key is ${process.env.API_KEY}`);

app.get("/", function (req, res) {
  res.sendFile("dist/index.html");
  // res.sendFile(path.resolve('src/client/views/index.html'))
});

// designates what port the app will listen to for incoming requests
app.listen(8080, function () {
  console.log("Example app listening on port 8080!");
});

app.get("/test", function (req, res) {
  res.send(mockAPIResponse);
});

// Respond with JS object when a GET request is made to the homepage
app.post("/addData", addData);

function addData(req, res) {
  projectData["sentence_list"] = req.body.sentence_list;
  res.send(projectData);
}

app.get("/all", getAll);

function getAll(req, res) {
  res.send(projectData);
}
