import React from "react";
import {UserObj, equals} from "../models/UserObj";

export default function LeaderboardWidget(props: { leaderboard: UserObj[], user?: UserObj }) {

    const { leaderboard, user } = props

    return (
        <>
            <h4 id={"widget-header"}>
                Leaderboard
            </h4>
            {leaderboard.map((player, index) => (
                <div className={equals(user, player) ? "widget-item-highlight" : "widget-item"} key={index}>
                    <div style={{flex: 1}}><span className={"home-leaderboard-number"}>{index + 1}</span></div>
                    <div style={{flex: 10}}>{player.name}</div>
                </div>))}
            {(user && !leaderboard.some((player) => equals(user, player))) &&
                <div className={"widget-item-highlight"}>
                    <div style={{flex: 1}}><span className={"home-leaderboard-number"}>{user.rank}</span></div>
                    <div style={{flex: 10, fontWeight: 500}}>{user.name}</div>
                </div>}
        </>
    )
}