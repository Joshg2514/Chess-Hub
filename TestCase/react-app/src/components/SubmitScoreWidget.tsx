import React from "react";
import { submitScore } from "../api";
import { UserObj } from "../models/UserObj";

export default function SubmitScoreWidget(props: { player1: UserObj | undefined, player2: UserObj | undefined, handleSubmitScore: Function }) {

  const { player1, player2, handleSubmitScore } = props

  return (
    <div className="column-item" style={{ minWidth: 280 }} onClick={(e) => e.stopPropagation()}>
      <h4 id={"widget-header"}>
        Submit Score
      </h4>
      <div className="widget-item">
        {player1 && player2 ? (
          <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
            <div style={{ display: "flex" }}>
              <div>{player1.name}<span style={{ fontWeight: 600, marginLeft: 8 }}>({player1.rank || "?"})</span></div>
              <div style={{ flex: 1 }} />
              <div>{player2.name}<span style={{ fontWeight: 600, marginLeft: 8 }}>({player2.rank || "?"})</span></div>
            </div>
            <div style={{ height: 16 }} />
            <div style={{ display: "flex" }}>
              <div style={{ flex: 1, display: "flex", justifyContent: "flex-start" }}>
                <div className={"primary-button"} onClick={() => handleSubmitScore(player1, player2, true)}>Winner</div>
              </div>
              <div style={{ flex: 1, display: "flex", justifyContent: "center" }}>
                <div className={"primary-button"} onClick={() => handleSubmitScore(player1, player2, undefined)}>Draw</div>
              </div>
              <div style={{ flex: 1, display: "flex", justifyContent: "flex-end" }}>
                <div className={"primary-button"} onClick={() => handleSubmitScore(player1, player2, false)}>Winner</div>
              </div>
            </div>
          </div>
        ) : (<div>Error</div>)
        }
      </div>
    </div>
  )
}