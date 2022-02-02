import React from "react";
import {ScheduledGameObj} from "../models/ScheduledGameObj";
import {equals, UserObj} from "../models/UserObj";

export default function ScheduledGamesWidget(props: { user: UserObj, scheduledGames: ScheduledGameObj[] }) {

    const { user, scheduledGames } = props

    return (
        <>
            <div id={"widget-header"} style={{display: 'flex', alignItems: 'center'}}>
                <h4>
                    Scheduled Games
                </h4>
                <div style={{flex: 1}} />
                <span className={"widget-header-link"}>{"More \u203A\u203A"}</span>
            </div>
            {
                scheduledGames.length > 0 ?
                    (scheduledGames.map((scheduledGame, index) =>
                            <div className={equals(user, scheduledGame.player1) || equals(user, scheduledGame.player2) ? "widget-item-highlight" : "widget-item"} key={index}>
                                {scheduledGame.player1.name}&nbsp;<span style={{fontWeight: 600}}>({scheduledGame.player1.rank || '?'})</span>
                                &nbsp;<span style={{fontWeight: 600}}>VS</span>&nbsp;
                                {scheduledGame.player2.name}&nbsp;<span style={{fontWeight: 600}}>({scheduledGame.player2.rank || '?'})</span>
                            </div>)
                    )
                    : (
                        <div className={"widget-item"}>No games scheduled</div>
                    )
            }
        </>
    )
}