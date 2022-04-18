import React, { useEffect, useState } from "react";

export default function GameOfTheDay(props: { id: string }) {

    const { id } = props

    return (<>
        <h4 id={"widget-header"}>
            Game Of The Day
        </h4>
        <iframe id={id} allowTransparency={true} frameBorder={0} style={{ width: "100%", border: "none", height: 500, display: "block" }} src={`https://lichess.org/embed/${id}?theme=auto&bg=auto`}></iframe>
    </>)

}