const express = require("express");
const bodyParser = require("body-parser");

const updateRanking = require("./helperFunctions/updateRankings.js");

fs = require("fs");
//arrayMove = require('array-move');

const e = require("express");

// New app using express module
const app = express();
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
  var num1 = Number(req.body.num1);
  var num2 = Number(req.body.num2);

  try {
    if (!checkIfInt(num1, num2)) {
      res.send("Invalid Numbers");
    } else {
      updateRanking.loadFile(req, res, num1, num2);
    }
  } catch (error) {
    console.log(error);
  }
});

app.listen(3000, function () {
  console.log("server is running on port 3000");
});

function checkIfInt(num1, num2) {
  if (Number.isInteger(num1) && Number.isInteger(num2)) {
    return true;
  }
}


