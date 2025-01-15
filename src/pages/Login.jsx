import React from "react";
import "../stilovi/login.css";
import { useState, useEffect, useContext } from "react";
import { AppContext } from "../components/AppContext";
import { useNavigate } from "react-router-dom";
export default function Login() {
  const navigate = useNavigate();
  const {
    signup,
    setSignup,
    email,
    setEmail,
    password,
    setPassword,
    username,
    setUsername,
  } = useContext(AppContext);
  return (
    <div className="loginMain">
      <div className="loginbar">
        <div className="loginleft">
          <h1>Log In to MyGym</h1>
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
          <button>Sign in</button>
        </div>
        <div className="loginright">
          <h1>Hello, Friend!</h1>
          <p>Enjoy you personal details and start journey with us</p>
          <button
            onClick={() => {
              navigate("/register");
            }}
          >
            Sign up
          </button>
        </div>
      </div>
    </div>
  );
}
