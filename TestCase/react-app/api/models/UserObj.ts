import { TokenObj } from "./TokenObj";

export interface UserObj {
    id: string,
    name: string,
    token?: TokenObj,
    club?: string,
    rank?: number,
    rating?: number,
    isAdmin?: boolean,
    imageUrl?: string,
}

export const dummyUser: UserObj = {
    id: "1",
    name: "Magnus",
    token: {
        accessToken: "",
        refreshToken: "",
        tokenExpiration: 0
    }
}
// const equals = (user1?: UserObj, user2?: UserObj): boolean => {
//     return !!user1 && !!user2 && user1.name === user2.name && user1.rank === user2.rank
// }