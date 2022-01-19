import React from "react";

export default function Leaderboard(props: { leaderboard: string[] }) {
    return (
        <>
            <div id={"home-leaderboard-header"}>
                Leaderboard
            </div>
            {props.leaderboard.map((player, index) => (
                <div className={"home-leaderboard-item"}>#{index + 1}. {player}</div>))}
        </>
    )
}