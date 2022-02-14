import { UserObj } from "./models/UserObj"

export async function getUser(id: string): Promise<UserObj> {
  return fetch(`/api/discord/user/${id}`).then(async (res) => {
    if (res.status === 200) {
      const json = await res.json()
      return json
    } else {
      throw 'Error retrieving user info'
    }
  })
}

export async function getChallengesToUser(id: string): Promise<string[]> {
  return fetch(`/api/challenges/to/${id}`).then(async (res) => {
    if (res.status === 200) {
      const json = await res.json()
      return json.challengers
    } else {
      throw 'Error retrieving challengers'
    }
  })
}

export async function getChallengers(id: string, limit: number = 100): Promise<UserObj[]> {
  const challengerIds = await getChallengesToUser(id)
  const challengers = await Promise.all(challengerIds.slice(0, limit).map(async id => await getUser(id)))
  console.log(challengers)
  if (challengers) {
    return challengers
  } else {
    throw 'Error retrieving challengers'
  }
}