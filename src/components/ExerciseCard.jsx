import React, { useState, useContext } from "react";
import { AppContext } from "../components/AppContext";
export default function ExerciseCard(props) {
  const [setsCompleted, setSetsCompleted] = useState(0);
  const { exercise, i } = props;
  function handleSetIncrement() {
    setSetsCompleted((prev) => {
      const newSetsCompleted = (prev + 1) % 6;

      // Ažuriraj odgovarajuću vezbu odmah koristeći novu vrednost
      if (i === 0) {
        setVezba1(newSetsCompleted);
      }
      if (i === 1) {
        setVezba2(newSetsCompleted);
      }
      if (i === 2) {
        setVezba3(newSetsCompleted);
      }
      if (i === 3) {
        setVezba4(newSetsCompleted);
      }
      if (i === 4) {
        setVezba5(newSetsCompleted);
      }

      return newSetsCompleted; // Vrati novu vrednost stanja
    });
  }

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
  } = useContext(AppContext);
  // function setVezbe() {
  //   if (i == 0) {
  //     setVezba1(setsCompleted);
  //   }
  //   if (i == 1) {
  //     setVezba2(setsCompleted);
  //   }
  //   if (i == 2) {
  //     setVezba3(setsCompleted);
  //   }
  //   if (i == 3) {
  //     setVezba4(setsCompleted);
  //   }
  //   if (i == 4) {
  //     setVezba5(setsCompleted);
  //   }
  // }
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
        onClick={() => {
          console.log(vezba1, vezba2, vezba3, vezba4, vezba5);
        }}
      >
        nebitno
      </button>
    </div>
  );
}
