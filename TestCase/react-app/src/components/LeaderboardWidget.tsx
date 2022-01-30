import React from "react";
import {UserObj, equals} from "../models/UserObj";

export default function LeaderboardWidget(props: { leaderboard: UserObj[], user?: UserObj }) {

    const { leaderboard, user } = props

    return (
        <>
            <div id={"widget-header"} style={{display: 'flex', alignItems: 'center'}}>
                <h4>
                    Leaderboard
                </h4>
                <div style={{flex: 1}} />
                <span className={"widget-header-link"}>{"More \u203A\u203A"}</span>
            </div>
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