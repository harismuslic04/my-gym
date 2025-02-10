import React from "react";
import "../stilovi/login.css";
import { useState, useEffect, useContext } from "react";
import { AppContext } from "../components/AppContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
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
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/auth/login", {
        email,
        password,
      });
      if (response.status === 201) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("username", response.data.username);
        localStorage.setItem("email", response.data.email);
        navigate("/");
        setEmail(response.data.email);
        console.log(response.data.email);
      }
    } catch (err) {
      console.log(err.mesage);
    }
  };
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
              }}
              type="password"
              placeholder="Password"
            />
          </div>
          <button onClick={handleSubmit}>Sign in</button>
        </div>
        <div className="loginright">
          <h1>New here?</h1>
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
