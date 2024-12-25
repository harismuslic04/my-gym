import React from "react";
import "../stilovi/first.css";
import image from "../images/img.png";
import kalorije from "../images/kalorije.jpg";
import procenat from "../images/procenat2.png";
import serije from "../images/serije2.png";
import cal from "../images/cal.png";
export default function First() {
  return (
    <div className="firstmain ">
      <div className="firstunder">
        <div className="firstheader">
          <h1 className="text-2xl relative top-2 text-white ">MyGym</h1>
          <ul>
            <li>Workout plans</li>
            <li>Functionality</li>
          </ul>
        </div>
        <div className="firstabout">
          <h1>Start workout today</h1>
          <p>
            Tracking progress is key to achieving goals. Our platform allows you
            to track all your workouts and results through a simple and
            intuitive interface.
          </p>

          <button>Get Started</button>
          <div className="signup"></div>
          <div className="slika">
            <img src={image} alt="" />
          </div>
        </div>
      </div>
      <div className="firstunder1">
        <p>Train insane or remain the same</p>
        <h1>Create unlimited custom-made workouts </h1>
        <div className="custom">
          <div className="customunder">PUSH</div>
          <div className="customunder">PULL</div>
          <div className="customunder">LEGS</div>
          <div className="customunder">CHEST</div>
          <div className="customunder">BACK</div>
        </div>
      </div>
      <div className="firstunder2">
        <div className="div">
          <div className="krug">Track how you progressing</div>
        </div>
      </div>
      <div className="firstunder3">
        <div className="firstunder3levi">
          <div className="firstunder3levimuscle">
            <img src={procenat} alt="" />
          </div>
          <div className="firstunder3leviserije">
            <img src={serije} alt="" />
          </div>
          <h1>Challenge yourself with achievements</h1>
          <div className="firstunder3leviaktivnost">
            <h1>Active days</h1>
            <h1>4🔥</h1>
          </div>
        </div>
        <div className="firstunder3desni">
          <div className="firstunder3desnikalorije">
            <h1>570</h1>
            <p>Burned calories</p>
          </div>
          <div className="firstunder3desnical">
            <img src={cal} alt="" />
          </div>
          <div className="firstunder3desnitime">
            <h1>Time remaining</h1>
            <p>2h 23m</p>
          </div>
          <h1 className="firstunder3desnih1">
            The body achieves what the mind believes.
          </h1>
        </div>
      </div>
    </div>
  );
}
