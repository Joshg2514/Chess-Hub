import React from "react";
import {UserObj} from "../models/UserObj";

export default function ChallengesWidget(props: { challengers: UserObj[] }) {

    const { challengers } = props

    return (
        <>
            <h4 id={"widget-header"}>
                Challenges
            </h4>
            {
                challengers.length > 0 ?
                    (challengers.map((challenger, index) =>
                        <div className={"widget-item"} key={index}>
                            {challenger.name}<span style={{fontWeight: 600, marginLeft: 8}}>({challenger.rank})</span>
                            <div style={{flex: 1}} />
                            <div className={"accept-button"}>Accept</div>
                        </div>)
                    )
                : (
                    <div className={"widget-item"}>No challenges found</div>
                )
            }
            <div className={"home-challenges-send-button"} style={{margin: 16}}>Send A Challenge</div>
        </>
    )
}