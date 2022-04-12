import React from "react";
import '../App.css';

export default function UpdateMatchScreen() {
    return (
        <div>
            <h1> &nbsp;&nbsp;&nbsp;  &nbsp;&nbsp;&nbsp;Update Match</h1>
            <form action="/api/update" method="post">
                <input type="text" name="num1"
                       placeholder="Player 1"/>
                <input type="text" name="num2"
                       placeholder="Player 2"/>
                <br/>
                <br/>
                <button style={{"backgroundColor": "green"}} type="submit" name="win">
                    Win
                </button>

                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;

                <button type="submit" name="draw">
                    Draw
                </button>

                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;

                <button style={{"backgroundColor": "crimson"}} type="submit" name="loss">
                    Loss
                </button>
            </form>
        </div>
    );
}