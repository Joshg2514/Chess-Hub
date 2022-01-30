import React from "react";
import {UserObj} from "../models/UserObj";

export default function JoinRequestsWidget(props: { requests: UserObj[]}) {

    const { requests } = props

    return (
        <>
            <div id={"widget-header"}>
                Join Requests
            </div>
            {requests.length > 0 ?
                (requests.map((user, index) => (
                    <div className={"widget-item"} key={index}>
                        <div style={{flex: 1}}>{user.name}</div>
                        <div className={"accept-button"}>Accept</div>
                        <div style={{width: 8}}/>
                        <div className={"reject-button"}>Reject</div>
                    </div>))
                ) : (
                    <div className={"widget-item"}>No join requests found</div>
                )
            }
        </>
    )
}