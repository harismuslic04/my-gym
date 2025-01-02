import { useState, useEffect } from "react";
import "../stilovi/Profile.css";
import * as React from "react";
import { pieArcLabelClasses } from "@mui/x-charts/PieChart";
import dayjs from "dayjs";
import statistika from "../utils/statistika.json";
import {
  GaugeContainer,
  GaugeValueArc,
  GaugeReferenceArc,
  useGaugeState,
} from "@mui/x-charts/Gauge";
// import { Chart } from "react-google-charts";
// import { PieChart } from "@mui/x-charts/PieChart";
// import { desktopOS, valueFormatter } from "../components/webUsageStats";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
// import { PieChart } from "@mui/x-charts/PieChart";
// import { platforms } from "./webUsageStats";
import { Chart } from "primereact/chart";
import { CSSTransition } from "react-transition-group";
import { BarChart } from "@mui/x-charts/BarChart";
import "rsuite/dist/rsuite-no-reset.min.css";
// import { PieChart } from "@rsuite/charts";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { isOverflowing } from "rsuite/esm/DOMHelper";
import { PieChart } from "react-minimal-pie-chart";
import { SIZE } from "rsuite/esm/internals/constants";
import { color } from "chart.js/helpers";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const [selectedData, setSelectedData] = useState(null);
  const navigate = useNavigate();
  const goToTraining = () => {
    setTimeout(() => {
      navigate("/"); // Navigacija nakon animacije
    }, 300);
  };
  const data = [
    ["Language", "Speakers (in millions)"],
    ["Chest", 5.85],
    ["Shoulder", 1.66],
    ["Biceps", 1.316],
  ];

  const options = {
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

  function Chart2() {
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

  const today = dayjs().format("YYYY-MM-DD");
  function BasicDateCalendar() {
    const [selectedDate, setSelectedDate] = useState(null);

    const handleDateChange = (date) => {
      setSelectedDate(date); // Postavlja novi odabrani datum
      console.log("Kliknuti datum:", date.format("YYYY-MM-DD")); // Ispisuje datum u konzolu

      const podaci = statistika.workoutLog.find(
        (entry) => entry.date == date.format("YYYY-MM-DD")
      );

      setSelectedData(podaci);
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
  function BasicBars() {
    const [barData, setBarData] = useState([0, 0, 0]);

    useEffect(() => {
      if (selectedData) {
        // Uzimanje podataka iz selectedData i ažuriranje barData
        const newBarData = selectedData.muscleGroups.map((group) => group.name); // Na primer, koristi 'sets' za bar graf
        setBarData(newBarData); // Ažurira podatke za bar graf
        console.log(newBarData);
      }
    }, [selectedData]);
    return (
      <BarChart
        xAxis={[
          {
            scaleType: "band",
            data: barData,

            labelColor: "#ffffff", // Promena boje teksta na X osi
            labelFontSize: 14, // Promena veličine fonta
            labelFontFamily: "Arial",
          },
        ]}
        series={[{ data: [0, 0, 0] }, { data: [4, 6, 3] }, { data: [0, 0, 0] }]}
        width={250}
        height={300}
      />
    );
  }
  function PieActiveArc() {
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

  function CompositionExample() {
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
  function PieChartDemo() {
    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});

    useEffect(() => {
      const documentStyle = getComputedStyle(document.documentElement);
      const data = {
        labels: ["Chest", "Biceps", "Triceps"],
        datasets: [
          {
            data: [2, 6, 2],
          },
        ],
      };
      const options = {
        plugins: {
          legend: {
            labels: {
              usePointStyle: true,
              font: {
                size: 13,

                // weight: "bold", // Deblji font
                family: "Arial",
              },
              color: "black",
            },
          },
        },
      };

      setChartData(data);
      setChartOptions(options);
    }, []);

    return (
      <div className="">
        <Chart
          type="pie"
          data={chartData}
          options={chartOptions}
          style={{
            width: "95%",
            height: "300px",
            position: "relative",
            left: "0.3rem",
            top: "1rem",
            color: "Red",
          }}
        />
      </div>
    );
  }

  return (
    <div className="main">
      <header className="header">
        <div className="left">
          <h1 className="text-2xl ">Hello,Haris!</h1>
          <p className="">Always stay motivated</p>
        </div>
        <button onClick={goToTraining} className=" button2 text white">
          Start training
        </button>
        <button className=" button1 text-white">Logout</button>
      </header>
      <div className="info">
        <div>
          <p className="">Active days</p>
          <p className="drugip">4</p>
        </div>
        <div>
          <p>Average rating</p>
          <p className="drugip">4.4</p>
        </div>
        <div>
          <p>Time remaining</p>
          <p className="drugip">3h 2m</p>
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
            <PieChartDemo />
          </div>
        </div>
        <div className="calories">
          <div className="calories2">
            <CompositionExample />
          </div>
          <h1 className="text-1xl text-black">Calories burned</h1>
          <p className="text-black">300</p>
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
