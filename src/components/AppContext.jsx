import { createContext, useEffect, useState } from "react";
import React from "react";

const AppContext = createContext(); // Kreiranje konteksta

function ContextProvider({ children }) {
  const [value, setValue] = useState(3); // Početna vrednost za kontekst
  const [signup, setSignup] = useState(false);
  const [email, setEmail] = useState(" ");
  const [password, setPassword] = useState("");
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
  };

  return <AppContext.Provider value={values}>{children}</AppContext.Provider>;
}

export { AppContext, ContextProvider };
