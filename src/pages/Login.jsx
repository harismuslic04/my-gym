import React from "react";
import "../stilovi/login.css";
import { useState, useEffect, useContext } from "react";
import { AppContext } from "../components/AppContext";
export default function Login() {
  const { value, signup, setSignup, email, setEmail, password, setPassword } =
    useContext(AppContext);
  return (
    <div className="loginMain">
      <div className="loginbar">
        <div className="loginleft">
          <h1>Sign In to MyGym</h1>
          <div className="loginleftinput">
            <i className="fa-regular fa-envelope"></i>
            <input
              onChange={(event) => {
                setEmail(event.target.value);
              }}
              type="text"
              placeholder=" Email"
            />
            <i className="fa-solid fa-lock"></i>
            <input
              onChange={(event) => {
                setPassword(event.target.value);
                console.log(password);
                console.log(email);
              }}
              type="password"
              placeholder="Password"
            />
          </div>
          <button
            onClick={() => {
              setSignup(!signup);
            }}
          >
            {signup ? "Sign up" : "Sign in"}
          </button>
        </div>
        <div className="loginright">
          <h1>{value}</h1>
          <p>Enjoy you personal details and start journey with us</p>
          <button>Sign Up</button>
        </div>
      </div>
    </div>
  );
}
