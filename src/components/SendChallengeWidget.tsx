import React, { useState } from "react";
import { UserObj } from "../models/UserObj";

export default function SendChallengeWidget(props: { members: UserObj[], handleCreateChallenge: Function, response: string | null | undefined }) {

  const { members, handleCreateChallenge, response } = props

  return (
    <div className="column-item" onClick={(e) => e.stopPropagation()}>
      <h4 id={"widget-header"}>
        Send A Challenge
      </h4>
      <div>
        <div className={"widget-item"} style={{ minWidth: 200, flexDirection: "column", alignItems: "stretch" }}>
          {
            !response ?
              members ?
                members.length > 0 ?
                  (members.map((member, index) =>
                    <div className="widget-item" key={index}>
                      <img src={member.imageUrl || require("../images/account.png")} id={"account-icon"} />
                      <div style={{ width: 16 }} />
                      {member.name}
                      <div style={{ flex: 1 }} />
                      <div className={"primary-button"} onClick={() => {
                        if (response === null) {
                          handleCreateChallenge(member.id)
                        }
                      }}>Challenge</div>
                    </div>)
                  )
                  : "No club members"

                : "Loading club members..."
              : response
          }
        </div>
      </div>
    </div>
  )
}