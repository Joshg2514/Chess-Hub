import React from "react";

export default function JoinRequestsWidget(props: { requests: UserObj[]}) {
    return (
        <>
            <div id={"widget-header"}>
                Join Requests
            </div>
            {props.requests.map((user, index) => (
                <div className={"widget-item"} key={index}>
                    <div style={{flex: 10}}>{user.name}</div>
                    <div className={"accept-button"}>Accept</div>
                    <div style={{width: 8}} />
                    <div className={"reject-button"}>Reject</div>
                </div>))}
        </>
    )
}