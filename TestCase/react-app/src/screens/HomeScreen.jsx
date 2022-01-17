import React from "react";
import "./Global.css"
import "./HomeScreen.css"
import Header from "../components/Header"

export default function HomeScreen() {
    return (
        <div id={"main-container"}>
            <Header />
            <div style={{width: '100%'}}>Home Screen</div>
        </div>
    );
}