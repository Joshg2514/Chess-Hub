export { }
import { getChallengesToUserFromDB } from "./firestore";
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

module.exports = router;