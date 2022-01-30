import React, {useState} from "react";

export default function GameOfTheDay(props: { url: string }) {

    return (<>
        <h4 id={"widget-header"}>
            Game Of The Day
        </h4>
        <iframe id={"game-of-the-day"} src={props.url} style={{width: '100%', height: 400}} frameBorder={0}/>
    </>)

}