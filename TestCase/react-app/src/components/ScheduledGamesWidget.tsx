import React from "react";
import {ScheduledGameObj} from "../models/ScheduledGameObj";
import {UserObj} from "../models/UserObj";

export default function ScheduledGamesWidget(props: { user: UserObj, scheduledGames: ScheduledGameObj[] }) {

    const { user, scheduledGames } = props

    return (
        <>
            <h4 id={"widget-header"}>
                Scheduled Games
            </h4>
            {
                scheduledGames.length > 0 ?
                    (scheduledGames.map((scheduleGame, index) =>
                            <div className={"widget-item"} key={index}>
                                {scheduleGame.player1.name}&nbsp;<span style={{fontWeight: 600}}>({scheduleGame.player1.rank || '?'})</span>
                                &nbsp;<span style={{fontWeight: 600}}>VS</span>&nbsp;
                                {scheduleGame.player2.name}&nbsp;<span style={{fontWeight: 600}}>({scheduleGame.player2.rank || '?'})</span>
                            </div>)
                    )
                    : (
                        <div className={"widget-item"}>No games scheduled</div>
                    )
            }
        </>
    )
}