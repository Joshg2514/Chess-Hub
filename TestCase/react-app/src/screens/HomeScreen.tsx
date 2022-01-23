import React from "react";
import "../Global.css"
import "./HomeScreen.css"
import Header from "../components/Header"
import LeaderboardWidget from "../components/LeaderboardWidget";
import ChallengesWidget from "../components/ChallengesWidget";
import ScheduledGamesWidget from "../components/ScheduledGamesWidget";
import GameOfTheDay from "../components/GameOfTheDay";

const MAX_CHALLENGES = 5;
const MAX_LEADERBOARD_SIZE = 10;
const MAX_SCHEDULED_GAMES = 5;

export default function HomeScreen() {

    const dummyLeaderboard : UserObj[] = Array(10).fill("Magnus").map((name: string, index: number) => ({name: name, rank: index + 1}))
    const dummyChallenges: UserObj[] = [{name: "Ian", rank: 5}, {name: "Fabiano", rank: 4}]
    const dummyScheduledGames: UserObj[] = [{name: "Alireza", rank: 2}]
    const dummyUser: UserObj = {name: "Bobby", rank: 14}

    return (
        <div id={"main-container"}>
            <Header/>
            <div style={{display: "flex", flexDirection: "row", backgroundColor: "whitesmoke"}}>
                <div className={"side-padding"}/>
                <div id={"home-columns-container"}>
                    <div className={"home-column"}>
                        <div className={"home-column-item"}>
                            <LeaderboardWidget leaderboard={dummyLeaderboard.slice(0, MAX_LEADERBOARD_SIZE)} user={dummyUser}/>
                        </div>
                    </div>
                    <div style={{width: 32, height: 16}}/>
                    <div className={"home-column"}>
                        <div className={"home-column-item"}>
                            <ChallengesWidget challengers={dummyChallenges.slice(0,MAX_CHALLENGES)} />
                        </div>
                        <div style={{height: 16}} />
                        <div className={"home-column-item"}>
                            <ScheduledGamesWidget user={dummyUser} challengers={dummyScheduledGames.slice(0,MAX_SCHEDULED_GAMES)} />
                        </div>
                        <div style={{height: 16}} />
                        <div className={"home-column-item"} style={{borderRadius: "8px 8px 0px 0px"}}>
                            <GameOfTheDay url={"https://lichess.org/embed/MPJcy1JW?theme=auto&bg=auto"} />
                        </div>
                    </div>
                </div>
                <div className={"side-padding"}/>
            </div>
        </div>
    );
}