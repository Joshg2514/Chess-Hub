import React from "react";
import "../Global.css"
import "./HomeScreen.css"
import Header from "../components/Header"
import Leaderboard from "../components/Leaderboard";

export default function HomeScreen() {

    const dummyLeaderboard : string[] = Array(10).fill("Magnus")

    return (
        <div id={"main-container"}>
            <Header/>
            <div style={{display: "flex", flexDirection: "row", backgroundColor: "whitesmoke"}}>
                <div className={"side-padding"}/>
                <div id={"home-columns-container"}>
                    <div className={"home-column"}>
                        <div className={"home-column-item"}>
                            <Leaderboard leaderboard={dummyLeaderboard.slice(0, 10)} />
                        </div>
                    </div>
                    <div style={{width: 32, height: 16}}/>
                    <div className={"home-column"}>
                        <div className={"home-column-item"}>Challenges</div>
                        <div style={{height: 16}} />
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