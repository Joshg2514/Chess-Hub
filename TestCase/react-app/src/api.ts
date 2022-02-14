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