const express = require('express');
require('dotenv').config();

const fetch = require('node-fetch');
const btoa = require('btoa');
const { catchAsync } = require('../utils');
const { URLSearchParams } = require('url')

const router = express.Router();

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;

const redirect = 'http://localhost:3000/api/discord/callback';

router.get('/login', (req, res) => {
   res.redirect(`https://discordapp.com/api/oauth2/authorize?client_id=${CLIENT_ID}&scope=identify&response_type=code&redirect_uri=${redirect}`);
});

router.get('/callback', catchAsync(async (req, res) => {
  if (!req.query.code) throw new Error('NoCodeProvided');
  const code = req.query.code;
  const creds = btoa(`${CLIENT_ID}:${CLIENT_SECRET}`);

  const params = new URLSearchParams();
  params.append('client_id', CLIENT_ID)
  params.append('client_secret', CLIENT_SECRET)
  params.append('grant_type', 'authorization_code');
  params.append('code', code);
  params.append('redirect_uri', redirect);

  const response = await fetch(`https://discord.com/api/oauth2/token`,
  {
    method: 'POST',
    headers: {
      Authorization: `Basic ${creds}`,
    },
    body: params
  });
  const json = await response.json();
  res.redirect(`/?token=${json.access_token}`);
}));

module.exports = router;
