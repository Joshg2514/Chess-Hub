export { }
import { acceptChallenge, addChallengeToDB, addUserToDB, getChallengesToUserFromDB, getOpponentsOfUserFromDB, removeChallenge } from "./firestore";
import { ChallengeObj } from "./models/ChallengeObj";
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

router.post('/accept', async (req: any, res: any) => {
  const from = req.body.from
  const to = req.body.to
  await acceptChallenge(from, to)
  res.send('Challenge accepted')
})

router.post('/submit-score', async (req: any, res: any) => {
  const player1 = JSON.parse(req.body.player1)
  const player2 = JSON.parse(req.body.player2)
  console.log(player1)
  console.log(player2)
  const winner = req.body.winner
  if (winner === '1' || winner === '2') {
    if (winner === '1') {
      player1.rating += 10
      player2.rating -= 10
    } else if (winner === '2') {
      player2.rating += 10
      player1.rating -= 10
    }
    await addUserToDB(player1)
    await addUserToDB(player2)
  }
  await removeChallenge(player2.id, player1.id)
})

router.get('/opponents/:id', async (req: any, res: any) => {
  const id = req.params.id
  const opponents = await getOpponentsOfUserFromDB(id)
  res.json({ opponents })
})

router.post('/create', async (req: any, res: any) => {
  const from = req.body.from
  const to = req.body.to
  const challenge: ChallengeObj = { from, to, accepted: false }
  await addChallengeToDB(challenge)
  res.send("Challenge created")
})

module.exports = router;