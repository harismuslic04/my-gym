import React from "react";
import "../stilovi/admin.css";
import people from "../utils/people.json";
export default function Admin() {
  return (
    <div className="adminmain">
      <div className="adminheader">
        <h1>Hello Haris 👋</h1>
      </div>
      <div className="adminstats">
        <div className="prvideo">
          <div className="prvideolevo">
            <i class="fa-solid fa-users"></i>
          </div>
          <div className="prvideodesno">
            <p>Total Customers</p>
            <h1>1723</h1>
          </div>
        </div>
        <div className="drugideo">
          <div className="drugideolevo">
            <i class="fa-solid fa-users"></i>
          </div>
          <div className="drugideodesno">
            <p>Members</p>
            <h1>452</h1>
          </div>
        </div>
        <div className="trecideo">
          <div className="trecideolevo">
            <i class="fa-solid fa-users"></i>
          </div>
          <div className="trecideodesno">
            <p>Active Now</p>
            <h1>31</h1>
          </div>
        </div>
      </div>
      <div className="admincustomers">
        <h1>All Customers</h1>
        <div className="admincustomersinfo">
          <div className="admincustomersinfoheader">
            <h1>Name</h1>
            <h1>Email</h1>
            <h1>Remove</h1>
          </div>
          <div className="admincustomerinfouseri"></div>
        </div>
      </div>
    </div>
  );
}
