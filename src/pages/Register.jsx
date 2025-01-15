import React from "react";
import "../stilovi/login.css";
import { useState, useEffect, useContext } from "react";
import { AppContext } from "../components/AppContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
export default function Register() {
  const navigate = useNavigate();
  const {
    value,
    signup,
    setSignup,
    email,
    setEmail,
    password,
    setPassword,
    username,
    setUsername,
  } = useContext(AppContext);
  const handleSumbit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/auth/register", {
        username,
        email,
        password,
      });
      console.log(response);
      if (response.status == 201) {
        navigate("/login");
      }
    } catch (err) {
      console.log(err.message);
    }
  };
  return (
    <div className="loginMain">
      <div className="loginbar">
        <div className="loginleft">
          <h1>Create account</h1>
          <div className="loginleftinput">
            <i className="fa-regular fa-user"></i>
            <input
              onChange={(event) => {
                setUsername(event.target.value);
              }}
              type="text"
              placeholder=" Username"
              name="username"
            />
            <i className="fa-regular fa-envelope"></i>
            <input
              onChange={(event) => {
                setEmail(event.target.value);
              }}
              type="text"
              placeholder=" Email"
              name="email"
            />
            <i className="fa-solid fa-lock"></i>
            <input
              onChange={(event) => {
                setPassword(event.target.value);
              }}
              type="password"
              placeholder="Password"
              name="password"
            />
          </div>
          <button onClick={handleSumbit}>Sign up</button>
        </div>
        <div className="loginright">
          <h1>Welcome back</h1>
          <p>To keep connected with us please login with your personal info</p>
          <button
            onClick={() => {
              navigate("/login");
            }}
          >
            Sign in
          </button>
        </div>
      </div>
    </div>
  );
}
