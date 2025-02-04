import { useState, useEffect, useContext } from "react";
import * as React from "react";
import axios from "axios";
import Hero from "../components/Hero";
import { Navigate, useNavigate } from "react-router-dom";
import Generator from "../components/Generator";
import Workout from "../components/Workout";
import { generateWorkout } from "../utils/functions";
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";
import StarIcon from "@mui/icons-material/Star";
import "../stilovi/home.css";
import { AppContext } from "../components/AppContext";
import { resolveTimeViewsResponse } from "@mui/x-date-pickers/internals";
export default function Home() {
  const {
    vezba1,
    setVezba1,
    vezba2,
    setVezba2,
    vezba3,
    setVezba3,
    vezba4,
    setVezba4,
    vezba5,
    setVezba5,
    misici1,
    setMisici1,
    misici2,
    setMisici2,
    misici3,
    setMisici3,
    misici4,
    setMisici4,
    misici5,
    setMisici5,
    date,
    setDate,
  } = useContext(AppContext);
  const navigate = useNavigate();
  const zavrsiTrening = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token"); // Uzmi token iz localStorage
    if (!token) {
      alert("Niste prijavljeni!");
      return;
    }
    const workoutData = {
      date,
      misici1,
      vezba1,
      misici2,
      vezba2,
      misici3,
      vezba3,
      misici4,
      vezba4,
      misici5,
      vezba5,
      value,
    };
    try {
      // Slanje podataka zajedno sa tokenom u zaglavlju
      const response = await axios.post(
        "http://localhost:3000/auth/addWorkout",
        workoutData,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Slanje tokena u zaglavlju
          },
        }
      );
      // alert(response.data.message);
      if (response.status === 201) {
        navigate("/profile");
      }
      if (response.status === 400) {
        return alert("You alreadu trained today");
      }
    } catch (err) {
      console.error("Error adding workout", err);
      alert("Došlo je do greške pri dodavanju podataka o treningu.");
    }
  };
  const fetchUser = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:3000/auth/home", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status !== 201) {
        navigate("/login");
      }
    } catch (err) {
      navigate("/login");
      console.log(err);
    }
  };
  useEffect(() => {
    fetchUser();
  }, []);
  const { value, setValue } = React.useContext(AppContext);
  const [hover, setHover] = React.useState(-1);

  const labels = {
    0.5: "Useless",
    1: "Useless+",
    1.5: "Poor",
    2: "Poor+",
    2.5: "Ok",
    3: "Ok+",
    3.5: "Good",
    4: "Good+",
    4.5: "Excellent",
    5: "Excellent+",
  };
  const [workout, setWorkout] = useState(null);
  const [poison, setPoison] = useState("individual");
  const [muscles, setMuscles] = useState([]);
  const [goal, setGoal] = useState("strength_power");
  function getLabelText(value) {
    return `${value} Star${value !== 1 ? "s" : ""}, ${labels[value]}`;
  }
  function HoverRating() {
    return (
      <Box sx={{ width: 200, display: "flex", alignItems: "center" }}>
        <Rating
          name="hover-feedback"
          value={value}
          precision={1}
          getLabelText={getLabelText}
          onChange={(event, newValue) => {
            setValue(newValue);
            console.log(newValue);
          }}
          onChangeActive={(event, newHover) => {
            setHover(newHover);
          }}
          icon={<StarIcon style={{ fontSize: "2.4rem" }} />} // Povećajte veličinu zvezdice
          emptyIcon={
            <StarIcon
              style={{ opacity: 1, fontSize: "2.4rem" }}
              fontSize="inherit"
            />
          }
        />
        {value !== null && (
          <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]}</Box>
        )}
      </Box>
    );
  }
  function updateWorkout() {
    if (muscles.length < 1) {
      return;
    }
    let newWorkout = generateWorkout({ poison, muscles, goal });

    setWorkout(newWorkout);
    window.location.href = "#workout";
  }
  return (
    <main className="min-h-screen flex flex-col bg-gradient-to-r from-slate-800 to-slate-950 text-white text-sm sm:text-base">
      <Hero />
      <Generator
        poison={poison}
        setPoison={setPoison}
        muscles={muscles}
        setMuscles={setMuscles}
        goal={goal}
        setGoal={setGoal}
        updateWorkout={updateWorkout}
      />
      {workout && <Workout workout={workout} />}
      {workout && (
        <div className="homerating">
          <h1>Rate the training</h1>
          <HoverRating />
          <button onClick={zavrsiTrening}>submit</button>
        </div>
      )}
    </main>
  );
}
