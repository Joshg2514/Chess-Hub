import { addUser } from "./firestore";

export { }
const express = require('express');
const fetch = require('node-fetch')
const { URLSearchParams } = require("url")
require('dotenv').config({ path: __dirname + '/./../.env' });

const { catchAsync } = require('../utils');

const router = express.Router();

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;

const redirect = 'http://localhost:3000/api/discord/callback';

var accessToken: string | undefined
var refreshToken: string | undefined
var tokenExpiration: number | undefined

// get a new discord accessToken using the refreshToken
const refresh = async () => {
  const params = new URLSearchParams();
  params.append('client_id', CLIENT_ID!!)
  params.append('client_secret', CLIENT_SECRET!!)
  params.append('grant_type', 'refresh_token');
  params.append('refresh_token', refreshToken!!);

  const response = await fetch(`https://discord.com/api/oauth2/token`,
    {
      method: 'POST',
      body: params
    });
  const json = await response.json()
  accessToken = json.access_token
  refreshToken = json.refresh_token
  tokenExpiration = Date.now()// + json.expires_in
}

// make sure the current accessToken is not expired
const validate = async () => {
  if (tokenExpiration) {
    if (tokenExpiration <= Date.now()) {
      const response = await refresh()
      return true
    }
  }
  return false
}

// get the discord user details
const getUser = async () => {
  const hasToken = await validate()
  if (hasToken) {
    const response = await fetch("http://discordapp.com/api/users/@me", {
      method: "GET",
      headers: {
        'Authorization': `Bearer ${accessToken}`
      },
    })
    return await response.json()
  } else {
    return undefined
  }
}

router.get('/login', (req: any, res: any) => {
  res.redirect(`https://discordapp.com/api/oauth2/authorize?client_id=${CLIENT_ID}&scope=identify&response_type=code&redirect_uri=${redirect}`);
});

// callback for discord auth
// gets the discord token, gets the discord user details, adds that user to the db, then redirects to the homepage 
router.get('/callback', catchAsync(async (req: any, res: any) => {
  if (!req.query.code) throw new Error('NoCodeProvided');
  const code = req.query.code;
  const creds = btoa(`${CLIENT_ID}:${CLIENT_SECRET}`);

  const params = new URLSearchParams();
  params.append('client_id', CLIENT_ID!!)
  params.append('client_secret', CLIENT_SECRET!!)
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
  accessToken = json.access_token
  refreshToken = json.refresh_token
  tokenExpiration = Date.now()// + json.expires_in
  const user = await getUser()
  addUser({
    id: user.id,
    name: user.username,
    accessToken: accessToken!!,
    refreshToken: refreshToken!!,
    tokenExpiration: tokenExpiration
  })
  res.redirect(`/`);
}));

module.exports = router;
