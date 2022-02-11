import React, { useEffect, useState } from "react";
import './App.css';
import UpdateMatchScreen from "./screens/UpdateMatchScreen";
import { Routes, Route, useNavigate } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import SignUpScreen from "./screens/SignUpScreen";
import AdminScreen from "./screens/AdminScreen";
import { UserObj } from "./models/UserObj";

function App() {

  const [discordToken, setDiscordToken] = useState<string | undefined>(undefined)
  const [user, setUser] = useState<UserObj | undefined>(undefined)
  const navigate = useNavigate()

  const url = window.location.href

  useEffect(() => {
    // if user object hasn't been initialized and user isn't on login page
    if (!user && !url.includes('/login')) {
      const params = new URL(url).searchParams
      // try to get id from url or localStorage
      let id: string | null = params.get('id')
      if (id) {
        window.localStorage.setItem('id', id)
      } else {
        id = window.localStorage.getItem('id')
      }
      // if id successfully retrieved
      if (id) {
        // fetch user object
        fetch(`/api/discord/user/${id}`).then(async (res) => {
          if (res.status === 200) {
            const json = await res.json()
            console.log(json)
            return json
          } else {
            throw 'Error retrieving user info'
          }
        }).then(json => {
          console.log(json)
          setUser({
            name: json.name
          })
        }).catch(err => console.log(err))
      } else {
        // redirect to login
        navigate('/login')
      }
    }
  }, [url, user])

  return (
    <Routes>
      <Route path="/" element={<HomeScreen user={user} />} />
      <Route path="/update" element={<UpdateMatchScreen />} />
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/signup" element={<SignUpScreen />} />
      <Route path="/admin" element={<AdminScreen />} />
    </Routes>
  );
}

export default App