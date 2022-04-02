import React from "react";
import { UserObj } from "../models/UserObj";

export default function SendChallengeWidget(props: { members: UserObj[], handleChallenge: Function }) {

  const { members, handleChallenge } = props

  return (
    <div className="column-item">
      <h4 id={"widget-header"}>
        Send A Challenge
      </h4>
      <div>
        {
          members ?
            members.length > 0 ?
              (members.map((member, index) =>
                <div className={"widget-item"} key={index}>
                  <img src={member.imageUrl || require("../images/account.png")} id={"account-icon"} />
                  <div style={{ width: 8 }} />
                  <div>{member.name}<span style={{ fontWeight: 600, marginLeft: 8 }}>({member.rank || "?"})</span></div>
                  <div style={{ flex: 1 }} />
                  <div className={"primary-button"} onClick={() => handleChallenge(member.id)}>Challenge</div>
                </div>)
              )
              : (
                <div className={"widget-item"}>No club members</div>
              )
            : (<div className={"widget-item"}>Loading club members...</div>)

        }
      </div>
    </div>
  )
}