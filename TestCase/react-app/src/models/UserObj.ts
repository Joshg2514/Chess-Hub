export interface UserObj {
    name: string,
    rank?: number,
    isAdmin?: boolean,
    imageUrl?: string,
}

export const equals = (user1?: UserObj, user2?: UserObj) : boolean => {
    return !!user1 && !!user2 && user1.name === user2.name && user1.rank === user2.rank
}