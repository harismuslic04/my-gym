import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../components/AppContext";
import dayjs from "dayjs";
export default function ExerciseCard(props) {
  const navigate = useNavigate();
  const [setsCompleted, setSetsCompleted] = useState(0);
  const { exercise, i } = props;
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
    value,
    setDate,
    workout,
    setWorkout,
  } = useContext(AppContext);
  useEffect(() => {
    const currentDate = dayjs().format("YYYY-MM-DD");
    setDate(currentDate);
    // Ažuriraj mišiće za određenu vežbu kada se izvrši increment
    if (setsCompleted !== 0) {
      if (i === 0) {
        setVezba1(setsCompleted);
        setMisici1(exercise.muscles);
      }
      if (i === 1) {
        setVezba2(setsCompleted);
        setMisici2(exercise.muscles);
      }
      if (i === 2) {
        setVezba3(setsCompleted);
        setMisici3(exercise.muscles);
      }
      if (i === 3) {
        setVezba4(setsCompleted);
        setMisici4(exercise.muscles);
      }
      if (i === 4) {
        setVezba5(setsCompleted);
        setMisici5(exercise.muscles);
      }
    }
  }, [
    setsCompleted,
    i,
    exercise.muscles,
    setVezba1,
    setVezba2,
    setVezba3,
    setVezba4,
    setVezba5,
    setMisici1,
    setMisici2,
    setMisici3,
    setMisici4,
    setMisici5,
  ]);
  function handleSetIncrement() {
    setSetsCompleted((prev) => {
      return (prev + 1) % 6;
    });
  }
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
      alert(response.data.message);
      if (response.status === 201) {
        navigate("/profile");
      }
    } catch (err) {
      console.error("Error adding workout", err);
      alert("Došlo je do greške pri dodavanju podataka o treningu.");
    }
  };
  return (
    <div className="p-4 rounded-4 flex flex-col gap-4 bg-slate-950 sm:flex-wrap">
      <div className="flex flex-col sm:flex-row sm:items-center sm:flex-wrap gap-x-4">
        <h4 className="text-3xl hidden sm:inline sm:text-4xl md:text-5xl font-semibold text-slate-400 ">
          0{i + 1}
        </h4>
        <h2 className="capitalize whitespace-nowrap truncate max-w-full text-lg sm:text-xl md:text-2xl flex-1 sm:text-center">
          {exercise.name.replaceAll("_", " ")}
        </h2>
        <p className="text-sm text-slate-400 capitalize">{exercise.type}</p>
      </div>
      <div className="flex flex-col">
        <h3 className="text-slate-400 text-sm">Muscle Groups</h3>
        <p className="capitalize">{exercise.muscles.join("&")}</p>
      </div>
      <div className="flex flex-col bg-slate-950 rounded gap-2 ">
        {exercise.description.split("___").map((val, valindex) => {
          return (
            <div key={valindex} className="text-sm">
              {val}
            </div>
          );
        })}
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 sm:place-items-center gap-2">
        {["reps", "rest", "tempo"].map((info) => {
          return (
            <div
              key={info}
              className="flex flex-col p-2 rounded border-[1.5px] border-solid border-slate-900 w-full"
            >
              <h3 className="capitalize text-slate-400 text-sm">
                {info === "reps" ? `${exercise.unit}` : info}
              </h3>
              <p className="font-md">{exercise[info]}</p>
            </div>
          );
        })}
        <button
          onClick={() => {
            handleSetIncrement();
            // setVezbe();
          }}
          className="flex flex-col p-2 rounded border-[1.5px] duration-200 border-solid border-blue-900 hover:border-blue-600 w-full duration-200"
        >
          <h3 className="text-slate-400 text-sm capitalize">Sets</h3>
          <p className="font-medium">{setsCompleted} / 5</p>
        </button>
      </div>
      <button
        // onClick={() => {
        //   console.log(
        //     vezba1,
        //     vezba2,
        //     vezba3,
        //     vezba4,
        //     vezba5,
        //     misici1,
        //     misici2,
        //     misici3,
        //     misici4,
        //     misici5
        //   );
        // }}
        onClick={zavrsiTrening}
      >
        nebitno
      </button>
    </div>
  );
}
