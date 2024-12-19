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
import { Chart } from "react-google-charts";
// import { PieChart } from "@mui/x-charts/PieChart";
import { desktopOS, valueFormatter } from "../components/webUsageStats";

import { BarChart } from "@mui/x-charts/BarChart";
import "rsuite/dist/rsuite-no-reset.min.css";
import { PieChart } from "@rsuite/charts";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { isOverflowing } from "rsuite/esm/DOMHelper";
export const data = [
  ["Language", "Speakers (in millions)"],
  ["Chest", 5.85],
  ["Shoulder", 1.66],
  ["Biceps", 1.316],
];

export const options = {
  legend: "none",
  pieSliceText: "label",

  pieStartAngle: 100,
  backgroundColor: "transparent",
  pieSliceBorderColor: "transparent",
  slices: {
    0: { color: "#8E44AD" }, // Lila boja za prvi deo
    1: { color: "#3498DB" }, // Plava boja za drugi deo
    2: { color: "#1ABC9C" }, // Teal (plavi zeleni) za treći deo
    3: { color: "#F39C12" }, // Žuta za četvrti deo (Romansh)
  },
  chartArea: {
    width: "70%", // Širina prostora za krug
    height: "70%", // Visina prostora za krug
  },
};

export function Chart2() {
  return (
    <Chart
      chartType="PieChart"
      data={data}
      options={options}
      width={"100%"}
      height={"100%"}
    />
  );
}
// export function Pie() {
//   // Sample data
//   const sampleData = [
//     ["Books", 10],
//     ["Cars", 20],
//     ["Table", 50],
//   ];

//   return (
//     <div className="krug">
//       <h4></h4>
//       <PieChart name="PieChart" data={sampleData} />
//     </div>
//   );
// }
export function BasicPie() {
  return (
    <PieChart
      series={[
        {
          data: [
            { id: 0, value: 10, label: "series A" },
            { id: 1, value: 15, label: "series B" },
            { id: 2, value: 20, label: "series C" },
          ],
        },
      ]}
      width={230}
      height={200}
    />
  );
}
const today = dayjs().format("YYYY-MM-DD");
export function BasicDateCalendar() {
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (date) => {
    setSelectedDate(date); // Postavlja novi odabrani datum
    console.log("Kliknuti datum:", date.format("YYYY-MM-DD")); // Ispisuje datum u konzolu
  };
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateCalendar
        onChange={handleDateChange}
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
      value={70}
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
            <Chart2 />
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
