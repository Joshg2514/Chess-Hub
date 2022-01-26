import React from "react";
import '../App.css';

import {Link} from 'react-router-dom'
export default function DiscordLoginButton() {
    return (
    <div className="container">
    <a href="/api/discord/login">Login through discord</a>
  </div>


    );
 }