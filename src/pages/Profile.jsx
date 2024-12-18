import { useState } from "react";
import "../stilovi/Profile.css";
import * as React from "react";
import { pieArcLabelClasses } from "@mui/x-charts/PieChart";
import dayjs from "dayjs";
import {
  GaugeContainer,
  GaugeValueArc,
  GaugeReferenceArc,
  useGaugeState,
} from "@mui/x-charts/Gauge";

import { PieChart } from "@mui/x-charts/PieChart";
import { desktopOS, valueFormatter } from "../components/webUsageStats";

import { BarChart } from "@mui/x-charts/BarChart";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";

export function BasicPie() {
  const data = [
    { id: 0, value: 10, label: "series A", color: "#FF5733" },
    { id: 1, value: 15, label: "series B", color: "#33FF57" },
    { id: 2, value: 20, label: "series C", color: "#3357FF" },
  ];

  return (
    <div style={{ position: "relative", width: "250px", height: "200px" }}>
      {/* PieChart bez legende */}
      <PieChart
        sx={{
          // Ako želite da sakrijete legendu u CSS-u
          "& .MuiPieChart-legend": {
            display: "none", // Ovo će sakriti legendu
          },
        }}
        series={[
          {
            data: data,
          },
        ]}
        width={250}
        height={200}
      />

      {/* Prikazivanje legende ispod grafikona */}
      <div
        style={{
          position: "absolute",
          bottom: "-30px", // Pomeranje legende malo niže
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        {data.map((item) => (
          <div
            key={item.id}
            style={{
              marginRight: "10px",
              color: item.color,
              display: "flex",
              alignItems: "center",
            }}
          >
            {/* Kutija sa bojom */}
            <span
              style={{
                backgroundColor: item.color,
                width: "10px",
                height: "10px",
                marginRight: "5px",
                borderRadius: "50%",
              }}
            />
            {/* Naziv serije */}
            <span>{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

const today = dayjs().format("YYYY-MM-DD");
export function BasicDateCalendar() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateCalendar
        sx={{
          // Stilizacija svakog datuma
          "& .MuiPickersDay-root": {
            position: "relative",
            borderRadius: "50%", // Zaobljene ivice
            color: "white",
            border: "1px solid rgb(39, 38, 38)", // Dodaje border
            backgroundColor: "rgb(39, 38, 38)", // Pozadinska boja
            "&:hover": {
              backgroundColor: "#e0f7fa", // Boja pri hover efektu
              color: "black",
            },
            "&:not(.Mui-selected)": {
              '&[data-day="today"]': {
                backgroundColor: "#FFEB3B", // Žuta pozadina za današnji datum
                color: "#000", // Crna boja teksta
                borderRadius: "50%", // Zaobljene ivice
                "&:hover": {
                  backgroundColor: "#FDD835", // Tamnija žuta pri hover-u
                },
              },
            },
          },
        }}
      />
    </LocalizationProvider>
  );
}
export function BasicBars() {
  return (
    <BarChart
      xAxis={[{ scaleType: "band", data: ["group A", "group B", "group C"] }]}
      series={[{ data: [0, 0, 0] }, { data: [4, 6, 3] }, { data: [0, 0, 0] }]}
      width={260}
      height={300}
    />
  );
}
export function PieActiveArc() {
  return (
    <PieChart
      series={[
        {
          data: desktopOS,
          highlightScope: { fade: "global", highlight: "item" },
          faded: { innerRadius: 30, additionalRadius: -30, color: "gray" },
          valueFormatter,
          // Prilagodjene boje
        },
      ]}
      height={200}
    />
  );
}
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
        <button className=" button2 text white">Start training</button>
        <button className=" button1 text-white">Logout</button>
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
        <div className="sets">
          <div className="sets2">
            <BasicBars />
          </div>
        </div>
        <div className="muscles">
          <div className="muscles2">
            <BasicPie />
          </div>
        </div>
        <div className="calories">
          <div className="calories2">
            <CompositionExample />
          </div>
          <h1 className="text-1xl text-white">Calories burned</h1>
          <p className="text-white">300</p>
        </div>
      </div>
      <div className="calendar2">
        <h1
          className="text-white text-2xl
         relative top-6 left-5
        "
        >
          Your Active Days
        </h1>
        <div className="undercalendar">
          <BasicDateCalendar />
        </div>
      </div>
    </div>
  );
}
