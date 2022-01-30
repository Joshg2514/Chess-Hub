import Header from "../components/Header";
import LeaderboardWidget from "../components/LeaderboardWidget";
import ChallengesWidget from "../components/ChallengesWidget";
import ScheduledGamesWidget from "../components/ScheduledGamesWidget";
import GameOfTheDay from "../components/GameOfTheDay";
import React from "react";
import JoinRequestsWidget from "../components/JoinRequestsWidget";

const dummyJoinRequests = [{name: "Gary"}, {name: "Hikaru"}]

export default function AdminScreen() {
    return (
        <div id={"main-container"}>
            <Header/>
            <div style={{display: "flex", flexDirection: "row", backgroundColor: "whitesmoke"}}>
                <div className={"side-padding"}/>
                <div id={"columns-container"}>
                    <div className={"column"}>
                        <div className={"column-item"}>
                            <JoinRequestsWidget requests={dummyJoinRequests} />
                        </div>
                    </div>
                    <div style={{width: 32, height: 16}}/>
                    <div className={"column"}>
                        <div className={"column-item"}>
                        </div>
                    </div>
                </div>
                <div className={"side-padding"}/>
            </div>
        </div>
    );
}