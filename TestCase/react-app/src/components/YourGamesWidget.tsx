import React from "react";
import { ScheduledGameObj } from "../models/ScheduledGameObj";
import { equals, UserObj } from "../models/UserObj";

export default function YourGamesWidget(props: { opponents: UserObj[] | undefined }) {

    const { opponents } = props

    return (
        <>
            <div id={"widget-header"} style={{ display: 'flex', alignItems: 'center' }}>
                <h4>
                    Your Games
                </h4>
                <div style={{ flex: 1 }} />
                <span className={"widget-header-link"}>{"More \u203A\u203A"}</span>
            </div>
            {
                opponents ?
                    opponents.length > 0 ?
                        (opponents.map((opponent, index) =>
                            <div className={"widget-item"} key={index}>
                                <span style={{ fontWeight: 600 }}>VS</span>&nbsp;
                                {opponent.name}&nbsp;<span style={{ fontWeight: 600 }}>({opponent.rank || '?'})</span>
                                <div style={{ flex: 1 }} />
                                <div className={"primary-button"}>Submit</div>
                            </div>)
                        )
                        : (
                            <div className={"widget-item"}>No games scheduled</div>
                        )
                    : (<div className={"widget-item"}>Loading games...</div>)
            }
        </>
    )
}