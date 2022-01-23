import React from "react";

export default function ChallengesWidget(props: { challengers: UserObj[] }) {
    return (
        <>
            <div id={"home-widget-header"}>
                Challenges
            </div>
            {
                props.challengers.length > 0 ?
                    (props.challengers.map((challenger, index) =>
                        <div className={"home-widget-item"} key={index}>
                            {challenger.name}<span style={{fontWeight: 600, marginLeft: 8}}>({challenger.rank})</span>
                            <div style={{flex: 1}} />
                            <div className={"home-challenges-button"}>Play</div>
                        </div>)
                    )
                : (
                    <div className={"home-widget-item"}>No challenges found</div>
                )
            }
        </>
    )
}