import React from "react";
import "../stilovi/admin.css";
import people from "../utils/people.json";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useState } from "react";
export default function Admin() {
  function removeUser(id) {
    const filteredUser3 = filteredUser2.filter((user) => user.id !== id);
    console.log(id);
    setFilteredUser2(filteredUser3);
  }
  function PaginationControlled() {
    const handleChange = (event, value) => {
      setPage(value - 1);
      console.log(page);
    };

    return (
      <Stack spacing={2}>
        <Pagination
          count={Math.floor(people.length / 7) + 1}
          page={page + 1}
          onChange={handleChange}
        />
      </Stack>
    );
  }

  let people2 = [];
  people2.push(...people);
  const [filteredUser2, setFilteredUser2] = useState(people2);
  const [page, setPage] = useState(1);
  return (
    <div className="adminmain">
      <div className="adminheader">
        <h1>Hello Haris 👋</h1>
      </div>
      <div className="adminstats">
        <div className="prvideo">
          <div className="prvideolevo">
            <i className="fa-solid fa-users"></i>
          </div>
          <div className="prvideodesno">
            <p>Total Customers</p>
            <h1>1723</h1>
          </div>
        </div>
        <div className="drugideo">
          <div className="drugideolevo">
            <i className="fa-solid fa-users"></i>
          </div>
          <div className="drugideodesno">
            <p>Members</p>
            <h1>452</h1>
          </div>
        </div>
        <div className="trecideo">
          <div className="trecideolevo">
            <i className="fa-solid fa-users"></i>
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
        </div>
        <div className="admincustomerinfouseri">
          {filteredUser2
            .slice(page * 6, page * 6 + 6)
            .map((people, peopleIndex) => {
              return (
                <div key={people.id} className="ljudi">
                  <div className="admincustomerinfouseri2">{people.name}</div>
                  <div className="admincustomerinfouseri2">{people.email}</div>
                  <div className="admincustomerinfouseri2">
                    <i
                      className="removeikona fa-solid fa-user-xmark"
                      onClick={() => removeUser(people.id)}
                    ></i>
                  </div>
                </div>
              );
            })}
        </div>
        <div className="pages">
          <PaginationControlled />
        </div>
      </div>
    </div>
  );
}
