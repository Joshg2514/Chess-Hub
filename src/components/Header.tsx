import React from "react";
import "./Header.css"
import "../Global.css"
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { dummyLoggedInUser } from "../models/DummyData";
import Logo from "./Logo";
import UserProps from "../screens/ScreensProps";

export default function Header(props: UserProps) {

    const [showDropdown, setShowDropdown] = useState(false)
    const navigate = useNavigate()

    const handleLogout = () => {
        window.localStorage.removeItem('user')
        navigate('/login')
    }

    return (
        <div id={"header-container"}>
            <div className={"side-padding"} />
            <div id={"header-content"}>
                <Link to={"/"} style={{ textDecoration: 'none' }}><Logo /></Link>
                <div style={{ flex: 1 }} />
                <span style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={() => setShowDropdown(prevState => !prevState)}>
                    <h4>{props.user?.name || "?"}</h4>
                    <div style={{ width: 8 }} />
                    <div style={{ position: "relative" }}>
                        <img src={props.user?.imageUrl || require("../images/account.png")} id={"account-icon"} />
                        {showDropdown ?
                            <div className={"header-dropdown"}>
                                {dummyLoggedInUser.isAdmin && (<div><Link to={"/admin"} className={"header-dropdown-item"}>Admin</Link></div>)}
                                <div style={{ height: 8 }} />
                                <div className={"header-dropdown-item"} onClick={handleLogout}>Logout</div>
                            </div>
                            : []}
                    </div>
                </span>
            </div>
            <div className={"side-padding"} />
        </div>
    )
}