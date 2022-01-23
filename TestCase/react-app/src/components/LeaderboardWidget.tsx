import React from "react";

export default function LeaderboardWidget(props: { leaderboard: UserObj[], user?: UserObj }) {
    return (
        <>
            <div id={"home-widget-header"}>
                Leaderboard
            </div>
            {props.leaderboard.map((user, index) => (
                <div className={"home-widget-item"} key={index}>
                    <div style={{flex: 1}}><span className={"home-leaderboard-number"}>{index + 1}</span></div>
                    <div style={{flex: 10}}>{user.name}</div>
                </div>))}
            {props.user &&
                <div id={"home-leaderboard-footer"}>
                    <div style={{flex: 1}}><span className={"home-leaderboard-number"}>{props.user.rank}</span></div>
                    <div style={{flex: 10, fontWeight: 500}}>You</div>
                </div>}
        </>
    )
}