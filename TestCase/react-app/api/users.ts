export { }
import { getUserFromDB, getUsersByClubFromDB } from "./firestore";
const express = require('express');

const router = express.Router();

router.get('/:id', async (req: any, res: any) => {
  const id = req.params.id
  // get token from db using id
  const user = await getUserFromDB(id)
  res.json(user)
})

router.get('/club/:clubId', async (req: any, res: any) => {
  const clubId = req.params.clubId
  // get token from db using id
  const members = await getUsersByClubFromDB(clubId)
  res.json({ members })
})

module.exports = router;