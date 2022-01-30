import {UserObj} from "./UserObj";
import {ScheduledGameObj} from "./ScheduledGameObj";

export const dummyUsers: UserObj[] = [{name: "Magnus", rank: 1}, {name: "Alireza", rank: 2}, {name: "Ding", rank: 3}, {name: "Fabiano", rank: 4}, {name: "Ian", rank: 5}, {name: "Wesley", rank: 6}, {name: "Anish", rank: 7}, {name: "Levon", rank: 8}, {name: "Shakhriyar", rank: 9}, {name: "Alexander", rank: 10}]
export const dummyLoggedInUser: UserObj = dummyUsers[4]
export const dummyLeaderboard : UserObj[] = dummyUsers
export const dummyChallenges: UserObj[] = [dummyUsers[6], dummyUsers[9]]
export const dummyScheduledGames: ScheduledGameObj[] = [{player1: dummyUsers[0], player2: dummyUsers[1]}]
export const dummyJoinRequests = [{name: "Gary"}, {name: "Hikaru"}]