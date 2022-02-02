import React from "react";
import "./Header.css"
import "../Global.css"
import {useState} from "react";
import {Link} from "react-router-dom";
import {dummyLoggedInUser} from "../models/DummyData";
import Logo from "./Logo";

export default function Header() {

    const [showDropdown, setShowDropdown] = useState(false)

    return (
        <div id={"header-container"}>
            <div className={"side-padding"}/>
            <div id={"header-content"}>
                <Link to={"/"} style={{textDecoration: 'none'}}><Logo /></Link>
                <div style={{flex: 1}}/>
                <span style={{display: 'flex', alignItems: 'center'}} onClick={() => setShowDropdown(prevState => !prevState)}>
                <h4>{dummyLoggedInUser.name}</h4>
                <div style={{width: 8}} />
                <div style={{position: "relative"}}>
                    <img src={dummyLoggedInUser.imageUrl || require("../images/account.png")} id={"header-account-icon"}/>
                    {showDropdown ?
                        <div className={"header-dropdown"}>
                            {dummyLoggedInUser.isAdmin && (<div><Link to={"/admin"} className={"header-dropdown-item"}>Admin</Link></div>)}
                            <div style={{height: 8}}/>
                            <div><Link to={"/login"} className={"header-dropdown-item"}>Logout</Link></div>
                        </div>
                        : []}
                </div>
                </span>
            </div>
            <div className={"side-padding"}/>
        </div>
    )
}