const path = require("path");
const express = require("express");
const app = express(); // create express app
require('dotenv').config();

const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore');

//Initialize Firebase
var admin = require("firebase-admin");
var serviceAccount = require("../chesshub-2c7a9-firebase-adminsdk-tj59a-2ea82b66e7.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

updateDB();

async function updateDB(){

  const db = getFirestore();

  const docRef = db.collection('users').doc('alovelace');
  await docRef.set({
    first: 'Ada',
    last: 'Lovelace',
    born: 1816
  });

  const aTuringRef = db.collection('users').doc('aturing');
  await aTuringRef.set({
    'first': 'Alan',
    'middle': 'Mathison',
    'last': 'Turing',
    'born': 1912
  });

  const snapshot = await db.collection('users').get();
  snapshot.forEach((doc) => {
    console.log(doc.id, '=>', doc.data());
  });

}



// add middlewares
app.use(express.static(path.join(__dirname, "..", "build")));
app.use(express.static("public"));

app.get("/test", (req, res) => {
  res.json({ message: "Hello from server!" });
});

// Routes
app.use('/api/discord', require('../api/discord'));

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

app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, "..", "build", "index.html"));
});

// start express server on port 5000
app.listen(3000, () => {
  console.log("server started on port 3000");
});

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