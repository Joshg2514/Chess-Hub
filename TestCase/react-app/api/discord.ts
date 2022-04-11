export { }
import { addUserToDB, getUserFromDB } from "./firestore";
const express = require('express');
const fetch = require('node-fetch')
const { URLSearchParams } = require("url")
import { TokenObj } from "./models/TokenObj"
require('dotenv').config({ path: __dirname + '/./../.env' });

const { catchAsync } = require('../utils');

const router = express.Router();

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;

const redirect = 'http://localhost:3000/api/discord/callback';

// var accessToken: string | undefined
// var refreshToken: string | undefined
// var tokenExpiration: number | undefined

// get a new discord accessToken using the refreshToken
const refresh = async (refreshToken: string): Promise<TokenObj> => {
  console.log("refreshing token...")
  const params = new URLSearchParams();
  params.append('client_id', CLIENT_ID!!)
  params.append('client_secret', CLIENT_SECRET!!)
  params.append('grant_type', 'refresh_token');
  params.append('refresh_token', refreshToken);

  const response = await fetch(`https://discord.com/api/oauth2/token`,
    {
      method: 'POST',
      body: params
    });
  const json = await response.json()
  const accessToken: string = json.access_token
  refreshToken = json.refresh_token
  const tokenExpiration: number = Date.now() + json.expires_in
  const token: TokenObj | undefined = (accessToken && refreshToken && tokenExpiration) ? { accessToken, refreshToken, tokenExpiration } : undefined

  return new Promise((resolve, reject) => {
    if (token) {
      resolve(token)
    } else {
      reject("Error refreshing token")
    }
  });

}

// make sure the current accessToken is not expired
const validate = async (token: TokenObj): Promise<TokenObj> => {
  const { tokenExpiration, refreshToken } = token

  if (tokenExpiration && tokenExpiration <= Date.now()) {
    var refreshedToken = await refresh(refreshToken)
  } else {
    refreshedToken = token
  }

  return new Promise((resolve, reject) => {
    if (refreshedToken) {
      resolve(refreshedToken)
    } else {
      console.log("error validating token")
      reject("Error validating token")
    }
  })
}

// get the discord user details
async function getCurrentUser(token: TokenObj) {
  const validatedToken = await validate(token)
  if (validatedToken) {
    const response = await fetch("http://discordapp.com/api/users/@me", {
      method: "GET",
      headers: {
        'Authorization': `Bearer ${validatedToken.accessToken}`
      },
    })
    return await response.json()
  } else {
    return new Promise((_, reject) => {
      reject("Error retrieving user")
    })
  }
}

router.get('/login', (req: any, res: any) => {
  res.redirect(`https://discordapp.com/api/oauth2/authorize?client_id=${CLIENT_ID}&scope=identify&response_type=code&redirect_uri=${redirect}`);
});

// callback for discord auth
// gets the discord token, gets the discord user details, adds that user to the db, then redirects to the homepage 
router.get('/callback', catchAsync(async (req: any, res: any) => {
  // check if the discord api sent a code, if it did get that code
  if (!req.query.code) throw new Error('NoCodeProvided');
  const code = req.query.code;

  // initialize parameters needed to make discord api call
  const creds = btoa(`${CLIENT_ID}:${CLIENT_SECRET}`);
  const params = new URLSearchParams();
  params.append('client_id', CLIENT_ID!!)
  params.append('client_secret', CLIENT_SECRET!!)
  params.append('grant_type', 'authorization_code');
  params.append('code', code);
  params.append('redirect_uri', redirect);

  // get discord token from discord api
  const response = await fetch(`https://discord.com/api/oauth2/token`,
    {
      method: 'POST',
      headers: {
        Authorization: `Basic ${creds}`,
      },
      body: params
    });
  const json = await response.json();
  const accessToken = json.access_token
  const refreshToken = json.refresh_token
  const tokenExpiration = Date.now() + json.expires_in
  const token = { accessToken, refreshToken, tokenExpiration }

  // user this token to get user info
  const user = await getCurrentUser(token)

  // add/update user in database
  addUserToDB({
    id: user.id,
    name: user.username,
    imageUrl: `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`,
    isAdmin: false,
    club: "lsu-chess-club",
    token: {
      accessToken: accessToken!!,
      refreshToken: refreshToken!!,
      tokenExpiration: tokenExpiration!!
    },
    rating: user.rating || 1000
  })

  // redirect client to homepage and pass user id
  res.redirect(`/?id=${user.id}`);
}));

module.exports = router;
