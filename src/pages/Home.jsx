import { useState } from "react";
import * as React from "react";
import Hero from "../components/Hero";
import Generator from "../components/Generator";
import Workout from "../components/Workout";
import { generateWorkout } from "../utils/functions";
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";
import StarIcon from "@mui/icons-material/Star";
import "../stilovi/home.css";
import { Context } from "../App";
export default function Home() {
  const { value, setValue } = React.useContext(Context);
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
          precision={0.5}
          getLabelText={getLabelText}
          onChange={(event, newValue) => {
            setValue(newValue);
            console.log(value);
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
        </div>
      )}
    </main>
  );
}
