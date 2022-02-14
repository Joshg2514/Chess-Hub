import Header from "../components/Header";
import React from "react";
import JoinRequestsWidget from "../components/JoinRequestsWidget";
import { dummyJoinRequests, dummyUsers } from "../models/DummyData";
import MembersWidget from "../components/MembersWidget";
import UserProps from "./ScreensProps";

export default function AdminScreen(props: UserProps) {
    return (
        <div id={"main-container"}>
            <Header user={props.user} />
            <div style={{ display: "flex", flexDirection: "row", backgroundColor: "whitesmoke" }}>
                <div className={"side-padding"} />
                <div id={"columns-container"}>
                    <div className={"column"}>
                        <div className={"column-item"}>
                            <JoinRequestsWidget requests={dummyJoinRequests} />
                        </div>
                    </div>
                    <div style={{ width: 32, height: 16 }} />
                    <div className={"column"}>
                        <div className={"column-item"}>
                            <MembersWidget members={dummyUsers} />
                        </div>
                    </div>
                </div>
                <div className={"side-padding"} />
            </div>
        </div>
    );
}