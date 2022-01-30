import React from "react";
import {UserObj} from "../models/UserObj";

export default function MembersWidget(props: { members: UserObj[]}) {

    const { members } = props

    return (
        <>
            <div id={"widget-header"}>
                Members
            </div>
            {members.length > 0 ?
                (members.map((user, index) => (
                        <div className={"widget-item"} key={index}>
                            <div style={{flex: 1}}>{user.name}</div>
                            <div className={"reject-button"}>Remove</div>
                        </div>))
                ) : (
                    <div className={"widget-item"}>No members found</div>
                )
            }
        </>
    )
}