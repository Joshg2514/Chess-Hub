import React, {useState} from "react";

export default function GameOfTheDay(props: { url: string }) {

    const { url } = props

    return (<>
        <h4 id={"widget-header"}>
            Game Of The Day
        </h4>
        <iframe id={"game-of-the-day"} src={url} style={{width: '100%', height: 400}} frameBorder={0}/>
    </>)

}