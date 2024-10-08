import React, { useState } from "react";
import SectionWrapper from "./SectionWrapper";
import { SCHEMES, WORKOUTS } from "../utils/swoilder";

function Header(props) {
  const { index, title, description } = props;
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-center gap-2">
        <p className="text-3xl sm:text-4xl md:text-5xl font-semibold text-slate-400">
          {index}
        </p>
        <h4 className="text-xl sm:text-2xl md:text-3xl">{title}</h4>
      </div>
      <p className="text-sm sm:text:text-base mx-auto">{description}</p>
    </div>
  );
}

export default function Generator() {
  const [showModal, setShowModal] = useState(false);
  const [poison, setPoison] = useState("individual");
  const [muscles, setMuscles] = useState([]);
  const [goal, setGoal] = useState("strength_power");
  function toggleModal() {
    setShowModal(!showModal);
  }

  return (
    <SectionWrapper
      header={"generate your workout"}
      title={["It's", "Huge", "o'clock"]}
    >
      <Header
        index={"01"}
        title={"Pick your poison"}
        description={"Select the workout you wish to endure"}
      />
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {Object.keys(WORKOUTS).map((type, typeIndex) => {
          return (
            <button
              onClick={() => {
                setPoison(type);
              }}
              className={
                "bg-slate-950 border  duration-200 px-4 hover:border-blue-600 py-3 rounded-lg " +
                (type === poison ? " border-blue-600" : " border-blue-400")
              }
              key={typeIndex}
            >
              <p className="capitalize">{type.replaceAll("_", " ")}</p>
            </button>
          );
        })}
      </div>
      <Header
        index={"02"}
        title={"Lock on targets"}
        description={"Select the muscles jugded for annihilation"}
      />
      <div className="bg-slate-950  border border-solid border-blue-400  rounded-lg flex flex-col">
        <button
          onClick={toggleModal}
          className="relative p-2 flex items-center justify-center"
        >
          <p>Select muscle groups</p>
          <i className="fa-solid absolute right-3 top-1/2  -translate-y-1/2 fa-caret-down"></i>
        </button>
        {showModal && <div>modal</div>}
      </div>
      <Header
        index={"03"}
        title={"Become juggernaut"}
        description={"Select your ultimate objective"}
      />
      <div className="grid grid-cols-3  gap-4">
        {Object.keys(SCHEMES).map((scheme, schemeIndex) => {
          return (
            <button
              onClick={() => {
                setGoal(scheme);
              }}
              className={
                "bg-slate-950 border    duration-200 hover:border-blue-600 py-3 rounded-lg " +
                (scheme === goal ? "border-blue-800" : "border-blue-400")
              }
              key={schemeIndex}
            >
              <p className="capitalize">{scheme.replaceAll("_", " ")}</p>
            </button>
          );
        })}
      </div>
    </SectionWrapper>
  );
}
