import React, { useEffect, useState } from "react";
import './App.css';
import UpdateMatchScreen from "./screens/UpdateMatchScreen";
import { Routes, Route, useNavigate } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import SignUpScreen from "./screens/SignUpScreen";
import AdminScreen from "./screens/AdminScreen";
import { UserObj } from "./models/UserObj";
import { getUser } from "./api";

function App() {

  const [discordToken, setDiscordToken] = useState<string | undefined>(undefined)
  const [user, setUser] = useState<UserObj | undefined>(undefined)
  const navigate = useNavigate()

  const url = window.location.href

  console.log(user)

  useEffect(() => {

    /*

    if user state is undefined and user is not in login screen
      if user has stored object
        retrieve that object
      else if user has id in url
        retrieve id
        fetch user object
        store user object
      else 
        redirect to login

    */

    if (!user && !url.includes('login')) {
      const storedUserString = window.localStorage.getItem('user')
      if (storedUserString) {
        setUser(JSON.parse(storedUserString))
      } else {
        const params = new URL(url).searchParams
        let id: string | null = params.get('id')
        console.log('id:')
        console.log(id)
        if (id) {
          getUser(id).then(json => {
            window.localStorage.setItem('user', JSON.stringify(json))
            const { id, name, imageUrl, isAdmin, club, rating, rank } = json
            setUser({
              id,
              name,
              imageUrl,
              isAdmin,
              club,
              rating,
              rank
            })
          }).catch(err => console.log(err))
        } else {
          navigate('/login')
        }
      }
    }
  }, [url, user])

  return (
    <Routes>
      <Route path="/" element={<HomeScreen user={user} />} />
      <Route path="/update" element={<UpdateMatchScreen />} />
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/signup" element={<SignUpScreen />} />
      <Route path="/admin" element={<AdminScreen user={user} />} />
    </Routes>
  );
}

export default App