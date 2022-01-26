const path = require("path");
const express = require("express");
const app = express(); // create express app
require('dotenv').config();

// add middlewares
app.use(express.static(path.join(__dirname, "..", "build")));
app.use(express.static("public"));

app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, "..", "build", "index.html"));
});

app.post("/api/update", function (req, res) {
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

// start express server on port 5000
app.listen(3000, () => {
  console.log("server started on port 3000");
});

// Routes
app.use('/api/discord', require('../api/discord'));

app.use((err, req, res, next) => {
  switch (err.message) {
    case 'NoCodeProvided':
      return res.status(400).send({
        status: 'ERROR',
        error: err.message,
      });
    default:
      return res.status(500).send({
        status: 'ERROR',
        error: err.message,
      });
  }
});

app.get("/test", (req, res) => {
  res.json({ message: "Hello from server!" });
});