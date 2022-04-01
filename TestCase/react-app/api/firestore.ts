import { ChallengeObj } from "./models/ChallengeObj";
import { dummyUser, UserObj } from "./models/UserObj";
const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore');
const serviceAccount = require('./serviceAccountKey.json');
require('dotenv').config({ path: __dirname + '/./../.env' });

initializeApp({
  credential: cert(serviceAccount)
})
const db = getFirestore()

export const addUserToDB = async (user: UserObj) => {
  await db.collection('users').doc(user.id).set(user);
}

export const getUserFromDB = async (id: string): Promise<UserObj> => {
  const ref = db.collection('users').doc(id);
  const doc = await ref.get();
  return new Promise((resolve, reject) => {
    if (doc.exists) {
      resolve(doc.data())
    } else {
      reject(`Error retrieving user ${id}`)
    }
  })
}

export const addChallengeToDB = async (to: string, from: string) => {
  await db.collection('challenges').add({
    from, to
  })
}

export const getChallengesToUserFromDB = async (id: string): Promise<string[]> => {
  const ref = db.collection('challenges').where('to', '==', id)
  const snapshot = await ref.get();
  return new Promise((resolve, reject) => {
    if (snapshot.docs) {
      resolve(snapshot.docs.map((doc: any) => doc.data().from))
    } else {
      reject(`Error retrieving challenges to user ${id}`)
    }
  })
}
