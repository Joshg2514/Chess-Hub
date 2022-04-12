import React from "react";
import "./LoginScreen.css"
import "../Global.css"
import Logo from "../components/Logo";

export default function LoginScreen() {

    return (
        <div id={"login-main-container"}>
            <img id={"login-banner-image"} src={require("../images/background.jpeg")}/>
            <div id={"login-input-container"}>
                <div style={{flex: 1}} />
                <h1 className={"login-main-header"}><Logo /></h1>
                <div style={{height: 24}} />
                <a id={"discord-login-button"} href="/api/discord/login">
                    <img id={"discord-logo"} src={require("../images/discord.png")} />
                    Login with discord
                </a>
                <div style={{flex: 1}} />
                {/*<h1 className={"login-main-header"}>classical ranking</h1>*/}
                {/*<div style={{flex: 1, maxHeight: 48}}/>*/}
                {/*<h1 className={"login-sub-header"}>Login</h1>*/}
                {/*<div style={{height: 32}}/>*/}
                {/*<label className={"login-text-field-label-style"}>*/}
                {/*    Email*/}
                {/*    <br/>*/}
                {/*    <div style={{height: 8}}/>*/}
                {/*    <input type={"email"} name="email" className={"login-text-field-style"}/>*/}
                {/*</label>*/}
                {/*<br/>*/}
                {/*<div style={{height: 8}}/>*/}
                {/*<label className={"login-text-field-label-style"}>*/}
                {/*    Password*/}
                {/*    <br/>*/}
                {/*    <div style={{height: 8}}/>*/}
                {/*    <input type={"password"} name="password" className={"login-text-field-style"}/>*/}
                {/*</label>*/}
                {/*<div style={{height: 32}}/>*/}
                {/*<a id={"login-button"} href="/api/discord/login">*/}
                {/*    Login*/}
                {/*</a>*/}
                {/*<div style={{height: 32}}/>*/}
                {/*<span>Don't have an account? <Link id={"login-signup-link"} to="/signup">Create one</Link></span>*/}
            </div>
        </div>
    );
}