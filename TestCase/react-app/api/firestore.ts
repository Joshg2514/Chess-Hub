import { dummyUser, UserObj } from "./models/UserObj";
const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore');
const serviceAccount = require('./serviceAccountKey.json');
require('dotenv').config({ path: __dirname + '/./../.env' });

initializeApp({
  credential: cert(serviceAccount)
})
const db = getFirestore()

export const addUser = async (user: UserObj) => {
  const res = await db.collection('users').doc(user.id).set(user);
}
