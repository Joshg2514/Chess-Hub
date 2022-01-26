import React from "react";
import './App.css';
import UpdateMatchScreen from "./screens/UpdateMatchScreen";
import { Routes, Route } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import SignUpScreen from "./screens/SignUpScreen";
import DiscordLogin from "./screens/DiscordLogin";

function App() {
  return (
      <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/update" element={<UpdateMatchScreen />} />
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/signup" element={<SignUpScreen />} />
          <Route path="/discordLogin" element={<DiscordLogin />} />
          <Route path="/discordCallback" element={<DiscordCallback />} />
      </Routes>
  );
}

export default App