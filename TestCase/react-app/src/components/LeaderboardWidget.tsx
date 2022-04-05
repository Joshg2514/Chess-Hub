import React from "react";
import { UserObj, equals } from "../models/UserObj";
import { dummyLoggedInUser } from "../models/DummyData";

export default function LeaderboardWidget(props: { leaderboard: UserObj[] | undefined, user?: UserObj }) {

    const { leaderboard, user } = props

    return (
        <>
            <div id={"widget-header"} style={{ display: 'flex', alignItems: 'center' }}>
                <h4>
                    Leaderboard
                </h4>
                <div style={{ flex: 1 }} />
                <span className={"widget-header-link"}>{"More \u203A\u203A"}</span>
            </div>
            {leaderboard ? (<>
                {
                    leaderboard.map((player, index) => (
                        <div className={equals(user, player) ? "widget-item-highlight" : "widget-item"} key={index}>
                            <div style={{ flex: 1 }}><span className={"home-leaderboard-number"}>{index + 1}</span></div>
                            <img src={player.imageUrl || require("../images/account.png")} id={"account-icon"} style={{ width: 24, height: 24 }} />
                            <div style={{ width: 16 }} />
                            <div style={{ flex: 10 }}>{player.name}</div>
                        </div>))
                }
                {/* {(user && !leaderboard.some((player) => {
                    console.log("Comparing...")
                    console.log(player)
                    console.log(user)
                    equals(user, player)
                })) &&
                    <div className={"widget-item-highlight"}>
                        <div style={{ flex: 1 }}><span className={"home-leaderboard-number"}>{user.rank}</span></div>
                        <div style={{ flex: 10, fontWeight: 500 }}>{user.name}</div>
                    </div>} */}
            </>) :
                (<div className="widget-item">Loading leaderboard...</div>)
            }
        </>
    )
}