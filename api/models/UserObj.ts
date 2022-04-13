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