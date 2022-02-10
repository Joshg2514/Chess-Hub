export interface UserObj {
    id: string,
    name: string,
    accessToken: string,
    refreshToken: string,
    tokenExpiration: number,
    rank?: number,
    isAdmin?: boolean,
    imageUrl?: string,
}

export const dummyUser: UserObj = {
    id: "1",
    name: "Magnus",
    accessToken: "",
    refreshToken: "",
    tokenExpiration: 0
}
// const equals = (user1?: UserObj, user2?: UserObj): boolean => {
//     return !!user1 && !!user2 && user1.name === user2.name && user1.rank === user2.rank
// }