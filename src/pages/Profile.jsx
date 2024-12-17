import { useState } from "react";
import "../stilovi/Profile.css";
import * as React from "react";
import {
  GaugeContainer,
  GaugeValueArc,
  GaugeReferenceArc,
  useGaugeState,
} from "@mui/x-charts/Gauge";

function GaugePointer() {
  const { valueAngle, outerRadius, cx, cy } = useGaugeState();

  if (valueAngle === null) {
    // No value to display
    return null;
  }

  const target = {
    x: cx + outerRadius * Math.sin(valueAngle),
    y: cy - outerRadius * Math.cos(valueAngle),
  };
  return (
    <g>
      <circle cx={cx} cy={cy} r={5} fill="red" />
      <path
        d={`M ${cx} ${cy} L ${target.x} ${target.y}`}
        stroke="red"
        strokeWidth={3}
      />
    </g>
  );
}

export function CompositionExample() {
  return (
    <GaugeContainer
      width={200}
      height={200}
      startAngle={-110}
      endAngle={110}
      value={30}
    >
      <GaugeReferenceArc />
      <GaugeValueArc />
      <GaugePointer />
    </GaugeContainer>
  );
}
export default function Profile() {
  return (
    <div className="main">
      <header className="header">
        <div className="left">
          <h1 className="text-2xl text-white">Hello,Haris!</h1>
          <p className="text-white">Always stay motivated</p>
        </div>
        <button className="text-white">Logout</button>
      </header>
      <div className="info">
        <div>
          <p className="">Active days</p>
          <p>4</p>
        </div>
        <div>
          <p>Average rating</p>
          <p>4.4</p>
        </div>
        <div>
          <p>Time remaining</p>
          <p>3h 2m</p>
        </div>
      </div>
      <div className="stats">
        <h1 className="text-2xl text-white">Physical Activity</h1>
        <div className="sets"></div>
        <div className="muscles"></div>
        <div className="calories">
          <div className="calories2">
            <CompositionExample />
          </div>
          <h1 className="text-1xl text-white">Calories burned</h1>
          <p className="text-white">300</p>
        </div>
      </div>
    </div>
  );
}
