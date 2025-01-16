import { createContext, useEffect, useState } from "react";
import React from "react";

const AppContext = createContext(); // Kreiranje konteksta

function ContextProvider({ children }) {
  const [value, setValue] = useState(3); // Početna vrednost za kontekst
  const [signup, setSignup] = useState(false);
  const [email, setEmail] = useState(" ");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [vezba1, setVezba1] = useState(0);
  const [vezba2, setVezba2] = useState(0);
  const [vezba3, setVezba3] = useState(0);
  const [vezba4, setVezba4] = useState(0);
  const [vezba5, setVezba5] = useState(0);
  const [date, setDate] = useState("");
  const [misici1, setMisici1] = useState("");
  const [misici2, setMisici2] = useState("");
  const [misici3, setMisici3] = useState("");
  const [misici4, setMisici4] = useState("");
  const [misici5, setMisici5] = useState("");
  useEffect(() => {
    console.log(value);
  }, [value]);
  const values = {
    value,
    setValue,
    signup,
    setSignup,
    email,
    setEmail,
    password,
    setPassword,
    username,
    setUsername,
    vezba1,
    setVezba1,
    vezba2,
    setVezba2,
    vezba3,
    setVezba3,
    vezba4,
    setVezba4,
    vezba5,
    setVezba5,
    date,
    setDate,
    misici1,
    setMisici1,
    misici2,
    setMisici2,
    misici3,
    setMisici3,
    misici4,
    setMisici4,
    misici5,
    setMisici5,
  };

  return <AppContext.Provider value={values}>{children}</AppContext.Provider>;
}

export { AppContext, ContextProvider };
