import React, { useEffect } from "react";
import "../Global.css"
import "./HomeScreen.css"
import Header from "../components/Header"
import LeaderboardWidget from "../components/LeaderboardWidget";
import ChallengesWidget from "../components/ChallengesWidget";
import ScheduledGamesWidget from "../components/ScheduledGamesWidget";
import GameOfTheDay from "../components/GameOfTheDay";
import {
    dummyChallengers,
    dummyLeaderboard,
    dummyLoggedInUser,
    dummyOpponents,
    dummyScheduledGames
} from "../models/DummyData"
import YourGamesWidget from "../components/YourGamesWidget";
import ScreenProps from "./ScreensProps";

const MAX_CHALLENGES = 5;
const MAX_LEADERBOARD_SIZE = 10;
const MAX_GAMES = 5;

export default function HomeScreen(props: ScreenProps) {

    return (
        <div id={"main-container"}>
            <Header user={props.user} />
            <div style={{ display: "flex", flexDirection: "row", backgroundColor: "whitesmoke" }}>
                <div className={"side-padding"} />
                <div id={"columns-container"}>
                    <div className={"column"}>
                        <div className={"column-item"}>
                            <LeaderboardWidget leaderboard={dummyLeaderboard.slice(0, MAX_LEADERBOARD_SIZE)} user={dummyLoggedInUser} />
                        </div>
                    </div>
                    <div style={{ width: 32, height: 16 }} />
                    <div className={"column"}>
                        <div className={"column-item"}>
                            <ChallengesWidget challengers={dummyChallengers.slice(0, MAX_CHALLENGES)} />
                        </div>
                        <div style={{ height: 16 }} />
                        <div className={"column-item"}>
                            <YourGamesWidget opponents={dummyOpponents.slice(0, MAX_GAMES)} />
                        </div>
                        <div style={{ height: 16 }} />
                        <div className={"column-item"} style={{ borderRadius: "8px 8px 0px 0px" }}>
                            <GameOfTheDay url={"https://lichess.org/embed/MPJcy1JW?theme=auto&bg=auto"} />
                        </div>
                    </div>
                </div>
                <div className={"side-padding"} />
            </div>
        </div>
    );
}