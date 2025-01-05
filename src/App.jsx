import { useState, createContext } from "react";
import Hero from "./components/Hero";
import Generator from "./components/Generator";
import Workout from "./components/Workout";
import { generateWorkout } from "./utils/functions";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./pages/Layout";
import Profile from "./pages/Profile";
import First from "./pages/First";
import Admin from "./pages/Admin";
import Login from "./pages/login";
import * as React from "react";
export const Context = createContext();
function App() {
  const [value, setValue] = useState(3); // Početna vrednost za kontekst

  return (
    <Context.Provider value={[value, setValue]}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Layout" element={<Layout />} />
          <Route path="/Profile" element={<Profile />} />
          <Route path="/First" element={<First />} />
          <Route path="/Admin" element={<Admin />} />
          <Route path="/Login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </Context.Provider>
  );
}

export default App;
