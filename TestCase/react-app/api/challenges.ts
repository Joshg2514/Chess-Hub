export { }
import { addChallengeToDB, getChallengesToUserFromDB } from "./firestore";
const express = require('express');
const fetch = require('node-fetch')
const { URLSearchParams } = require("url")
require('dotenv').config({ path: __dirname + '/./../.env' });

const router = express.Router();

router.get('/to/:id', async (req: any, res: any) => {
  const id = req.params.id
  // get token from db using id
  const challengers = await getChallengesToUserFromDB(id)
  res.json({ challengers })
})

router.post('/create', async (req: any, res: any) => {
  console.log("creating challenge...")
  console.log(req.body)
  const from = req.body.from
  const to = req.body.to
  await addChallengeToDB(to, from)
  res.send("Challenge created!")
})

module.exports = router;