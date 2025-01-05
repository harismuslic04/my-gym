import React from "react";
import "../stilovi/login.css";
export default function login() {
  return (
    <div className="loginMain">
      <div className="loginbar">
        <div className="loginleft">
          <h1>Sign In to MyGym</h1>
          <div className="loginleftinput">
            <i class="fa-regular fa-envelope"></i>
            <input type="text" placeholder=" Email" />
            <i class="fa-solid fa-lock"></i>
            <input type="password" placeholder="Password" />
          </div>
          <button>Sign In</button>
        </div>
        <div className="loginright">
          <h1>Hello,Friend!</h1>
          <p>Enjoy you personal details and start journey with us</p>
          <button>Sign Up</button>
        </div>
      </div>
    </div>
  );
}
