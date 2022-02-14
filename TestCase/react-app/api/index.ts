export { }
const path = require("path");
const express = require("express");
const app = express(); // create express app
require('dotenv').config();

// add middlewares
app.use(express.static(path.join(__dirname, "..", "build")));
app.use(express.static("public"));

app.get("/test", (req: any, res: any) => {
  res.json({ message: "Hello from server!" });
});

// Routes
app.use('/api/discord', require('./discord'));

app.use('/api/challenges', require('./challenges'));

app.post("/api/update", function (req: any, res: any) {
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

app.use((req: any, res: any, next: any) => {
  res.sendFile(path.join(__dirname, "..", "build", "index.html"));
});

// start express server on port 5000
app.listen(3000, () => {
  console.log("server started on port 3000");
});

app.use((err: any, req: any, res: any, next: any) => {
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