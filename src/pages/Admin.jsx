import React, { useContext, useEffect } from "react";
import "../stilovi/admin.css";
import axios from "axios";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { AppContext } from "../components/AppContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Admin() {
  const [searchValue, setSearchValue] = useState("");
  const { people, setPeople } = useContext(AppContext);
  const navigate = useNavigate();
  const filteredPeople = people.filter((ele, eleIndex) => {
    if (ele.username.includes(searchValue)) return true;
    if (ele.username.toLowerCase().includes(searchValue)) return true;
    return false;
  });
  function removeUser(id) {
    const filteredUser3 = people.filter((user) => user.id !== id);
    console.log(id);
    setPeople(filteredUser3);
  }

  // Paginate kontrola
  function PaginationControlled() {
    const handleChange = (event, value) => {
      setPage(value - 1);
      console.log(page);
    };

    return (
      <Stack spacing={2}>
        <Pagination
          count={Math.floor(people.length / 6) + 1} // Popravka: koristi filteredUser2
          page={page + 1}
          onChange={handleChange}
        />
      </Stack>
    );
  }

  const [filteredUser2, setFilteredUser2] = useState([]); // Početna vrednost kao prazan niz
  const [page, setPage] = useState(0);

  // useEffect za učitavanje korisnika sa API-ja
  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const response = await axios.get(
          "http://localhost:3000/auth/getPeople",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setPeople(response.data); // Postavljanje podataka u kontekst
        // setFilteredUser2(response.data); // Postavljanje u stanje filteredUser2
        console.log(response.data);
      } catch (err) {
        console.error("Greska pri uzimanju korisnika iz baze podataka:", err);
      }
    };

    fetchUser();
  }, []); // Poboljšanje zavisnosti

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
            <button
              onClick={() => {
                console.log(people);
              }}
            >
              nista
            </button>
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
        <input
          type="text"
          placeholder="Search users..."
          value={searchValue}
          onChange={(e) => {
            setSearchValue(e.target.value);
          }}
        />
        <div className="admincustomersinfo">
          <div className="admincustomersinfoheader">
            <h1>Name</h1>
            <h1>Email</h1>
            <h1>Remove</h1>
          </div>
        </div>
        <div className="admincustomerinfouseri">
          {filteredPeople
            .slice(page * 6, page * 6 + 6)
            .map((people, peopleIndex) => {
              return (
                <div key={peopleIndex} className="ljudi">
                  <div className="admincustomerinfouseri2">
                    {people.username}
                  </div>
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
