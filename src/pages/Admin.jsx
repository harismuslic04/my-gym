import React from "react";
import "../stilovi/admin.css";
import people from "../utils/people.json";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
export function PaginationControlled() {
  const [page, setPage] = React.useState(1);
  const handleChange = (event, value) => {
    setPage(value);
  };

  return (
    <Stack spacing={2}>
      <Pagination count={10} page={page} onChange={handleChange} />
    </Stack>
  );
}
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
        </div>
        <div className="admincustomerinfouseri">
          {people.map((people, peopleIndex) => {
            return (
              <div className="ljudi">
                <div key={peopleIndex} className="admincustomerinfouseri2">
                  {people.name}
                </div>
                <div key={peopleIndex} className="admincustomerinfouseri2">
                  {people.email}
                </div>
                <div key={peopleIndex} className="admincustomerinfouseri2">
                  <div key={peopleIndex} className="admincustomerinfouseri2">
                    <div key={peopleIndex} className="admincustomerinfouseri2">
                      <i class="fa-solid fa-user-xmark"></i>{" "}
                    </div>
                  </div>
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
