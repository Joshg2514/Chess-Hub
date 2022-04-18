import { ChallengeObj } from "./models/ChallengeObj";
import { dummyUser, UserObj } from "./models/UserObj";
const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore');
//const serviceAccount = require('./serviceAccountKey.json');
require('dotenv').config({ path: __dirname + '/./../.env' });

const DEFAULT_RATING = 1000

initializeApp({
  credential: cert({
    "project_id": process.env.FIREBASE_PROJECT_ID,
    "private_key": process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    "client_email": process.env.FIREBASE_CLIENT_EMAIL,
  }),
  //databaseURL: "https://my-firebase-app.firebaseio.com"
})
const db = getFirestore()

export const addUserToDB = async (user: UserObj) => {
  const doc = await db.collection('users').doc(user.id).get()
  if (!doc.exists) {
    user.rating = DEFAULT_RATING
    await db.collection('users').doc(user.id).set(user);
  } else {
    await updateUserInDB(user)
  }
}

export const updateUserInDB = async (user: UserObj) => {
  await db.collection('users').doc(user.id).update(user);
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

export const addChallengeToDB = async (challenge: ChallengeObj): Promise<void> => {
  const challengesFromUser = await db.collection('challenges').where('to', '==', challenge.to).where('from', '==', challenge.from).get();
  const challengesToUser = await db.collection('challenges').where('to', '==', challenge.from).where('from', '==', challenge.to).get();
  const challengeExists = challengesToUser.docs.length !== 0 || challengesFromUser.docs.length !== 0
  if (!challengeExists) {
    await db.collection('challenges').add(challenge)
  }
  return new Promise((resolve, reject) => {
    if (!challengeExists) {
      resolve()
    } else if (challengesFromUser.docs.length === 0) {
      reject("You have already challenged this user.")
    } else if (challengesToUser.docs.length === 0) {
      reject("This user has already challenged you.")
    }
  })
}

export const acceptChallenge = async (from: string, to: string) => {
  const snapshot = await db.collection('challenges').where('to', '==', to).where('from', '==', from).where('accepted', '==', false).get()
  if (snapshot.docs) {
    const challengeId = snapshot.docs[0].id
    await db.collection('challenges').doc(challengeId).update({ accepted: true });
  }
}

export const removeChallenge = async (from: string, to: string): Promise<boolean> => {
  const snapshot1 = await db.collection('challenges').where('to', '==', to).where('from', '==', from).where('accepted', '==', true).get()
  const snapshot2 = await db.collection('challenges').where('to', '==', from).where('from', '==', to).where('accepted', '==', true).get()
  const combinedSnapshot = (!(snapshot1?.docs) && !(snapshot2?.docs)) ? undefined : [...(snapshot1?.docs || []), ...(snapshot2.docs || [])]
  if (combinedSnapshot) {
    combinedSnapshot.forEach((doc: any) => {
      doc.ref.delete()
    });
    return true;
  } else {
    return false
  }
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
  const snapshot1 = await db.collection('challenges').where('to', '==', id).where('accepted', '==', true).get();
  const snapshot2 = await db.collection('challenges').where('from', '==', id).where('accepted', '==', true).get();
  const combinedSnapshot = (!(snapshot1?.docs) && !(snapshot2?.docs)) ? undefined : [...(snapshot1?.docs || []), ...(snapshot2.docs || [])]
  return new Promise((resolve, reject) => {
    if (combinedSnapshot) {
      resolve(combinedSnapshot.map((doc: any) => {
        const challenge = doc.data()
        return challenge.from === id ? challenge.to : challenge.from
      }))
    } else {
      reject(`Error retrieving challenges to user ${id}`)
    }
  })
}

export const getGameOfTheDay = async (): Promise<string> => {
  const ref = db.collection('gameOfTheDay').doc('currentGame');
  const doc = await ref.get();
  return new Promise((resolve, reject) => {
    if (doc.exists) {
      resolve(doc.data().id)
    } else {
      reject(`Error retrieving game of the day.`)
    }
  })
}