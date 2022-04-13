import React from "react";
import { UserObj } from "../models/UserObj";

export default function SendChallengeWidget(props: { members: UserObj[], handleCreateChallenge: Function }) {

  const { members, handleCreateChallenge } = props

  return (
    <div className="column-item" onClick={(e) => e.stopPropagation()}>
      <h4 id={"widget-header"}>
        Send A Challenge
      </h4>
      <div>
        {
          members ?
            members.length > 0 ?
              (members.map((member, index) =>
                <div className={"widget-item"} key={index} style={{ minWidth: 280 }}>
                  <img src={member.imageUrl || require("../images/account.png")} id={"account-icon"} />
                  <div style={{ width: 16 }} />
                  {member.name}
                  <div style={{ flex: 1 }} />
                  <div className={"primary-button"} onClick={() => handleCreateChallenge(member.id)}>Challenge</div>
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