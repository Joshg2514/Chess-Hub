import { UserObj } from "./models/UserObj"

export async function getUser(id: string): Promise<UserObj> {
  return fetch(`/api/users/${id}`).then(async (res) => {
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

export async function getOpponentsOfUser(id: string): Promise<string[]> {
  return fetch(`/api/challenges/opponents/${id}`).then(async (res) => {
    if (res.status === 200) {
      const json = await res.json()
      return json.opponents
    } else {
      throw 'Error retrieving opponents'
    }
  })
}

export async function createChallenge(from: string, to: string): Promise<string> {
  const params = new URLSearchParams();
  params.append('from', from)
  params.append('to', to)
  return await fetch(`/api/challenges/create`, {
    method: 'POST',
    body: params,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    }
  }).then(async (res) => {
    return await res.text()
  })
}

export async function acceptChallenge(from: string, to: string) {
  const params = new URLSearchParams();
  params.append('from', from)
  params.append('to', to)
  return fetch(`/api/challenges/accept`, {
    method: 'POST',
    body: params
  })
}

export async function submitScore(player1: UserObj, player2: UserObj, player1Won: boolean | undefined) {
  const params = new URLSearchParams();
  params.append('player1', JSON.stringify(player1))
  params.append('player2', JSON.stringify(player2))
  params.append('winner', player1Won === true ? '1' : player1Won === false ? '2' : '0')
  return fetch(`/api/challenges/submit-score`, {
    method: 'POST',
    body: params
  })
}

export async function getChallengers(id: string, limit: number = 100): Promise<UserObj[]> {
  const challengerIds = await getChallengesToUser(id)
  const challengers = await Promise.all(challengerIds.slice(0, limit).map(async id => await getUser(id)))
  if (challengers) {
    return challengers
  } else {
    throw 'Error retrieving challengers'
  }
}

export async function getOpponents(id: string, limit: number = 100): Promise<UserObj[]> {
  const opponentIds = await getOpponentsOfUser(id)
  const opponents = await Promise.all(opponentIds.slice(0, limit).map(async id => await getUser(id)))
  if (opponents) {
    return opponents
  } else {
    throw 'Error retrieving opponents'
  }
}

export async function getClubMembers(clubId: string): Promise<UserObj[]> {
  const memberIds = await fetch(`/api/users/club/${clubId}`).then(async (res) => {
    if (res.status === 200) {
      const json = await res.json()
      return json.members as string[]
    } else {
      throw 'Error retrieving club members'
    }
  }).catch(err => {
    console.log(err)
    return undefined
  })
  const members = memberIds && await Promise.all(memberIds.map(async id => await getUser(id)))
  if (members) {
    return members
  } else {
    throw 'Error retrieving club members'
  }
}

export async function getGameOfTheDay(): Promise<string> {
  return fetch('/api/gotd').then((res) => {
    return res.text()
  }).catch((err) => {
    return err
  })
}