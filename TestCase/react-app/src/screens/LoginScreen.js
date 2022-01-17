import React from "react";
import "./LoginScreen.css"

export default function LoginScreen() {

    return (
        <div id={"container"}>
            <img id={"banner-image"} src={require("../images/background.jpeg")} />
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: 48}}>
                <div style={{flex: 1, maxHeight: 48 }} />
                <h1 style={{fontWeight: 600, fontSize: 20}}>Login</h1>
                <div style={{height: 32}} />
                <label className={"text-field-label-style"}>
                    Email
                    <br />
                    <div style={{height: 8}} />
                    <input type={"email"} className={"text-field-style"} />
                </label>
                <br />
                <div style={{height: 8}} />
                <label className={"text-field-label-style"}>
                    Password
                    <br />
                    <div style={{height: 8}} />
                    <input type={"password"} className={"text-field-style"} />
                </label>
                <div style={{height: 32}} />
                <button>
                    Login
                </button>
            </div>
        </div>
    );
}