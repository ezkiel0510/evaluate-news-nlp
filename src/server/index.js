projectData = {};
// const dotenv = require("dotenv");
// dotenv.config();
var path = require("path");
const express = require("express");
const mockAPIResponse = require("./mockAPI.js");

const app = express();

app.use(express.static("dist"));

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require("cors");
app.use(cors());

console.log(__dirname);
console.log(`Your API key is ${process.env.API_KEY}`);

app.get("/", function (req, res) {
  res.sendFile("dist/index.html");
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
  projectData = req.body;
  res.send(projectData);
}

app.get("/all", getAll);

function getAll(req, res) {
  res.send(projectData);
}
