import React, {useState} from "react";

export default function GameOfTheDay(props: { url: string }) {

    return (<>
        <div id={"home-widget-header"}>
            Game Of The Day
        </div>
        <iframe id={"game-of-the-day"} src={props.url} style={{width: '100%', height: 400}} frameBorder={0}/>
    </>)

}