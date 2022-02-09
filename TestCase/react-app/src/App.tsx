import React, { useEffect, useState } from "react";
import './App.css';
import UpdateMatchScreen from "./screens/UpdateMatchScreen";
import { Routes, Route } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import SignUpScreen from "./screens/SignUpScreen";
import AdminScreen from "./screens/AdminScreen";
import { UserObj } from "./models/UserObj";

function App() {

  const [discordToken, setDiscordToken] = useState<string | undefined>(undefined)
  const [user, setUser] = useState<UserObj | undefined>(undefined)

  const url = window.location.href

  useEffect(() => {
    const params = new URL(window.location.href).searchParams
    if (params.has('token')) {
      setDiscordToken(params.get('token') || undefined)
    }
  }, [url])

  useEffect(() => {
    if (discordToken) {
      fetch("http://discordapp.com/api/users/@me", {
        method: "GET",
        headers: {
          'Authorization': discordToken
        },
        mode: 'no-cors'
      }).then((res) => console.log(res)).catch((err) => console.log(err))
    }
  }, [url, discordToken])

  return (
    <Routes>
      <Route path="/" element={<HomeScreen user={discordToken} />} />
      <Route path="/update" element={<UpdateMatchScreen />} />
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/signup" element={<SignUpScreen />} />
      <Route path="/admin" element={<AdminScreen />} />
    </Routes>
  );
}

export default App