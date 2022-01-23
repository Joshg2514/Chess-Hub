import React from "react";

export default function LeaderboardWidget(props: { leaderboard: string[], user?: { name: string, rank: number } }) {
    return (
        <>
            <div id={"home-leaderboard-header"}>
                Leaderboard
            </div>
            {props.leaderboard.map((user, index) => (
                <div className={"home-leaderboard-item"}>
                    <div style={{flex: 1}}><span className={"home-leaderboard-number"}>{index + 1}</span></div>
                    <div style={{flex: 10}}>{user}</div>
                </div>))}
            {props.user &&
                <div id={"home-leaderboard-footer"}>
                    <div style={{flex: 1}}><span className={"home-leaderboard-number"}>{props.user.rank}</span></div>
                    <div style={{flex: 10}}>{props.user.name}</div>
                </div>}
        </>
    )
}