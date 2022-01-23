import React from "react";

export default function ScheduledGamesWidget(props: { user: UserObj, challengers: UserObj[] }) {
    return (
        <>
            <div id={"home-widget-header"}>
                Scheduled Games
            </div>
            {
                props.challengers.length > 0 ?
                    (props.challengers.map((challenger, index) =>
                            <div className={"home-widget-item"} key={index}>
                                You&nbsp;<span style={{fontWeight: 600}}>({props.user.rank})</span>&nbsp;
                                <span style={{fontWeight: 600}}>VS</span>&nbsp;
                                {challenger.name}&nbsp;<span style={{fontWeight: 600}}>({challenger.rank})</span>
                            </div>)
                    )
                    : (
                        <div className={"home-widget-item"}>No games scheduled</div>
                    )
            }
        </>
    )
}