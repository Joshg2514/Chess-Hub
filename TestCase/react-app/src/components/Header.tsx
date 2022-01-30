import React from "react";
import "./Header.css"
import "../Global.css"
import {useState} from "react";
import {Link} from "react-router-dom";

export default function Header() {

    const [showDropdown, setShowDropdown] = useState(false)

    return (
        <div id={"header-container"}>
            <div className={"side-padding"}/>
            <div id={"header-content"}>
                <Link to={"/"} style={{textDecoration: 'none'}}><h4 id={"header-main-text"}>classical ranking</h4></Link>
                <div style={{flex: 1}}/>
                <div style={{position: "relative"}}>
                    <img src={require("../images/account.png")} id={"header-account-icon"}
                         onClick={() => setShowDropdown(prevState => !prevState)}/>
                    {showDropdown ?
                        <div className={"header-dropdown"}>
                            {/*<div className={"header-dropdown-item"}>Challenges</div>*/}
                            {/*<div style={{height: 8}}/>*/}
                            <div className={"header-dropdown-item"}>Logout</div>
                        </div>
                        : []}
                </div>
            </div>
            <div className={"side-padding"}/>
        </div>
    )
}