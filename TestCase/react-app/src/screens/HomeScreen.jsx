import React from "react";
import "../Global.css"
import "./HomeScreen.css"
import Header from "../components/Header"

export default function HomeScreen() {

    const dummyLeaderboard = Array(10).fill("Magnus")

    return (
        <div id={"main-container"}>
            <Header/>
            <div style={{display: "flex", flexDirection: "row"}}>
                <div className={"side-padding"}/>
                <div id={"home-columns-container"}>
                    <div className={"home-column"}>
                        <div className={"home-column-item"}>
                            <div id={"home-leaderboard-header"}>
                                Leaderboard
                            </div>
                            {dummyLeaderboard.map((player, index) => (
                                <div className={"home-leaderboard-item"}>#{index + 1}. {player}</div>))}
                        </div>
                    </div>
                    <div style={{width: 32, height: 16}}/>
                    <div className={"home-column"}>
                        <div className={"home-column-item"}>Scheduled games</div>
                        <div style={{height: 16}} />
                        <div className={"home-column-item"}>Game of the day?</div>
                    </div>
                </div>
                <div className={"side-padding"}/>
            </div>
        </div>
    );
}