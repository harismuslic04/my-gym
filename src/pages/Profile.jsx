import React from "react";
import { useState } from "react";
import "../stilovi/Profile.css";
export default function Profile() {
  return (
    <div className="main">
      <header className="header">
        <div className="left">
          <h1>Hello,Haris!</h1>
          <p>Always stay motivated</p>
        </div>
        <button>Logout</button>
      </header>
    </div>
  );
}
