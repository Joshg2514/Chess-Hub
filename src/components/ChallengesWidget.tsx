import React from "react";
import { UserObj } from "../models/UserObj";

export default function ChallengesWidget(props: { challengers: UserObj[] | undefined, setShowDialog: Function, handleAcceptChallenge: Function }) {

    const { challengers, setShowDialog, handleAcceptChallenge } = props

    return (
        <>
            <div id={"widget-header"} style={{ display: 'flex', alignItems: 'center' }}>
                <h4>
                    Challenges
                </h4>
                <div style={{ flex: 1 }} />
                <span className={"widget-header-link"}>{"More \u203A\u203A"}</span>
            </div>
            {
                challengers ?
                    challengers.length > 0 ?
                        (challengers.map((challenger, index) =>
                            <div className={"widget-item"} key={index}>
                                <img src={challenger.imageUrl || require("../images/account.png")} id={"account-icon"} />
                                <div style={{ flex: 1 }} />
                                <div className={"accept-button"} onClick={() => handleAcceptChallenge(challenger)}>Accept</div>
                            </div>)
                        )
                        : (
                            <div className={"widget-item"}>No challenges found</div>
                        )
                    : (<div className={"widget-item"}>Loading challenges...</div>)

            }
            <div className={"primary-button"} style={{ margin: 16, padding: 16 }} onClick={() => {
                setShowDialog(true)
            }}>Send A Challenge</div>
        </>
    )
}