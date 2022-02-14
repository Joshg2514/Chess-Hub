export interface UserObj {
    id?: string,
    name: string,
    club?: string,
    rank?: number,
    isAdmin?: boolean,
    imageUrl?: string,
}

export const equals = (user1?: UserObj, user2?: UserObj): boolean => {
    return !!user1 && !!user2 && user1.name === user2.name && user1.id === user2.id && user1.rank === user2.rank
}