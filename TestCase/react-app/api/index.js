"use strict";
exports.__esModule = true;
var path = require("path");
var express = require("express");
var app = express(); // create express app
require('dotenv').config();
// add middlewares
app.use(express.static(path.join(__dirname, "..", "build")));
app.use(express.static("public"));
app.get("/test", function (req, res) {
    res.json({ message: "Hello from server!" });
});
// Routes
app.use('/api/discord', require('./discord'));
app.post("/api/update", function (req, res) {
    /*
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
    */
});
app.use(function (req, res, next) {
    res.sendFile(path.join(__dirname, "..", "build", "index.html"));
});
// start express server on port 5000
app.listen(3000, function () {
    console.log("server started on port 3000");
});
app.use(function (err, req, res, next) {
    switch (err.message) {
        case 'NoCodeProvided':
            return res.status(400).send({
                status: 'ERROR',
                error: err.message
            });
        default:
            return res.status(500).send({
                status: 'ERROR',
                error: err.message
            });
    }
});
