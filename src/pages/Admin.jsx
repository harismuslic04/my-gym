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
  const [activeUsers, setActiveUsers] = useState(0);
  const username = localStorage.getItem("username");
  const [totalCustomers, setTotalCustomers] = useState(0);
  const [members, setMembers] = useState(0);

  const { people, setPeople } = useContext(AppContext);
  const navigate = useNavigate();
  const filteredPeople = people.filter((ele, eleIndex) => {
    if (ele.username.includes(searchValue)) return true;
    if (ele.username.toLowerCase().includes(searchValue)) return true;
    return false;
  });
  const fetchActiveUsers = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/auth/activeUsers"
      );
      console.log(response.data);

      setActiveUsers(response.data.activeUsers);
    } catch (err) {
      console.error("Error fetching active users", err);
    }
  };
  useEffect(() => {
    fetchActiveUsers();
    const interval = setInterval(fetchActiveUsers, 10000);
    return () => clearInterval(interval);
  }, []);
  function removeUser(id) {
    const filteredUser3 = people.filter((user) => user.id !== id);
    console.log(id);
    setPeople(filteredUser3);
  }
  const deleteUser = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete(
        `http://localhost:3000/auth/deleteUser/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log(response.data);
    } catch (err) {
      console.error("Error deleting", err.response.data.message);
    }
  };
  // Paginate kontrola
  function PaginationControlled() {
    const handleChange = (event, value) => {
      setPage(value - 1);
      console.log(page);
    };

    return (
      <Stack spacing={2}>
        <Pagination
          count={Math.floor(filteredPeople.length / 6)} // Popravka: koristi filteredUser2
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
        setMembers(response.data.activeUsers);
        setTotalCustomers(response.data.totalCustomers);
        setPeople(response.data.rows); // Postavljanje podataka u kontekst
        // setFilteredUser2(response.data); // Postavljanje u stanje filteredUser2
        console.log(response.data);
      } catch (err) {
        console.error("Greska pri uzimanju korisnika iz baze podataka:", err);
      }
    };

    fetchUser();
    const interval = setInterval(fetchUser, 10000);
    return () => clearInterval(interval);
  }, []); // Poboljšanje zavisnosti

  return (
    <div className="adminmain">
      <div className="adminheader">
        <h1>Hello {username} 👋</h1>
      </div>
      <div className="adminstats">
        <div className="prvideo">
          <div className="prvideolevo">
            <i className="fa-solid fa-users"></i>
          </div>
          <div className="prvideodesno">
            <p>Total Customers</p>
            <h1>{totalCustomers}</h1>
          </div>
        </div>
        <div className="drugideo">
          <div className="drugideolevo">
            <i className="fa-solid fa-users"></i>
          </div>
          <div className="drugideodesno">
            <p>Members</p>

            <h1>{members}</h1>
          </div>
        </div>
        <div className="trecideo">
          <div className="trecideolevo">
            <i className="fa-solid fa-users"></i>
          </div>
          <div className="trecideodesno">
            <p>Active Now</p>
            <h1>{activeUsers}</h1>
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
                  <div className="admincustomerinfouseri2 emailovi">
                    {people.email}
                  </div>
                  <div className="admincustomerinfouseri2">
                    <i
                      className="removeikona fa-solid fa-user-xmark"
                      onClick={() => {
                        removeUser(people.id);
                        deleteUser(people.id);
                      }}
                    ></i>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
      <div className="pages">
        <PaginationControlled />
      </div>
    </div>
  );
}
