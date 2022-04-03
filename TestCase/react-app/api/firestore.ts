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
  const doc = await db.collection('users').doc(user.id).get()
  if (!doc.exists) {
    user = { ...user, rating: 1000 }
  }
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

export const getUsersByClubFromDB = async (clubId: string): Promise<UserObj[]> => {
  const snapshot = await db.collection('users').where("club", "==", clubId).get()
  return new Promise((resolve, reject) => {
    if (snapshot.docs) {
      resolve(snapshot.docs.map((doc: any) => doc.data().id))
    } else {
      reject(`Error retrieving members of club ${clubId}`)
    }
  })
}

export const addChallengeToDB = async (challenge: ChallengeObj) => {
  await db.collection('challenges').add(challenge)
}

export const getChallengesToUserFromDB = async (id: string): Promise<string[]> => {
  const snapshot = await db.collection('challenges').where('to', '==', id).where('accepted', '==', false).get();
  return new Promise((resolve, reject) => {
    if (snapshot.docs) {
      resolve(snapshot.docs.map((doc: any) => doc.data().from))
    } else {
      reject(`Error retrieving challenges to user ${id}`)
    }
  })
}

export const getOpponentsOfUserFromDB = async (id: string): Promise<string[]> => {
  const snapshot = await db.collection('challenges').where('to', '==', id).where('accepted', '==', true).get();
  return new Promise((resolve, reject) => {
    if (snapshot.docs) {
      resolve(snapshot.docs.map((doc: any) => doc.data().from))
    } else {
      reject(`Error retrieving challenges to user ${id}`)
    }
  })
}