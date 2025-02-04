import { useState, useEffect, useContext } from "react";
import "../stilovi/Profile.css";
import * as React from "react";
import { pieArcLabelClasses } from "@mui/x-charts/PieChart";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { AppContext } from "../components/AppContext";
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
import axios from "axios";

export default function Profile() {
  dayjs.extend(utc);
  const navigate = useNavigate();
  const [selectedData, setSelectedData] = useState(null);
  const [barData, setBarData] = useState([0, 0, 0]);
  const [barData2, setBarData2] = useState([0, 0, 0]);
  const [barData3, setBarData3] = useState([0, 0, 0]);
  const [barData4, setBarData4] = useState(0);
  const email = localStorage.getItem("email");
  const { value, setValue, workout, setWorkout } = useContext(AppContext);
  const username = localStorage.getItem("username");
  const [filteredWorkout, setFilteredWorkout] = useState("");
  const today = dayjs().format("YYYY-MM-DD");
  const [selectedDate, setSelectedDate] = useState(today);
  const handleLogout = async () => {
    try {
      const response = await axios.post("http://localhost:3000/auth/logout", {
        email,
      });
      localStorage.removeItem("token");
      console.log(email);
      navigate("/login");

      alert("Logout successful");
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const response = await axios.get(
          "http://localhost:3000/auth/getWorkouts",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setWorkout(response.data);
        console.log(workout);
        const podaci = workout.find(
          (entry) => dayjs(entry.date).format("YYYY-MM-DD") === today
        );
        console.log(podaci);
        setWorkout(podaci);
      } catch (err) {
        console.error("Greška prilikom dobijanja podataka o treninzima:", err);
      }
    };

    fetchUser();
  }, []);

  function klikni() {
    console.log(email);
  }

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

  function BasicDateCalendar() {
    const handleDateChange = (date) => {
      setSelectedDate(date.format("YYYY-MM-DD")); // Postavlja novi odabrani datum
      console.log("Kliknuti datum:", date.format("YYYY-MM-DD")); // Ispisuje datum u konzolu
      console.log(workout);

      const podaci = workout.find(
        (entry) =>
          dayjs(entry.date).format("YYYY-MM-DD") === date.format("YYYY-MM-DD")
      );

      if (podaci) {
        setSelectedData(podaci); // Postavlja podatke ako postoje
      } else {
        console.log("nema podataka");
        setSelectedData(null);
      }
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
    if (
      !selectedData ||
      (!selectedData.misici1?.trim() && !selectedData.misici2?.trim())
    ) {
      return null; // Ako ne postoji, ne prikazujemo ništa
    }

    // Grupisanje mišića i sabiranje setova
    const misiciSetovi = [
      {
        misici: selectedData.misici1,
        setovi: Number(selectedData.setovi1) || 0,
      },
      {
        misici: selectedData.misici2,
        setovi: Number(selectedData.setovi2) || 0,
      },
      {
        misici: selectedData.misici3,
        setovi: Number(selectedData.setovi3) || 0,
      },
      {
        misici: selectedData.misici4,
        setovi: Number(selectedData.setovi4) || 0,
      },
      {
        misici: selectedData.misici5,
        setovi: Number(selectedData.setovi5) || 0,
      },
    ];

    // Grupisanje mišića po imenu i sabiranje njihovih setova
    const groupedData = misiciSetovi.reduce((acc, { misici, setovi }) => {
      if (misici) {
        acc[misici] = (acc[misici] || 0) + setovi; // Sabiranje setova za isti mišić
      }
      return acc;
    }, {});

    const misici = Object.keys(groupedData); // Imena mišića
    const setovi = Object.values(groupedData); // Sabirani setovi

    // Ako nema validnih podataka, ne prikazujemo grafikon
    if (!misici.length || !setovi.some((value) => value > 0)) {
      return null;
    }

    return (
      <BarChart
        xAxis={[
          {
            scaleType: "band",
            data: misici,
          },
        ]}
        series={[{ data: [0, 0, 0] }, { data: setovi }, { data: [0, 0, 0] }]}
        width={400}
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
        value={
          (selectedData?.setovi1 +
            selectedData?.setovi2 +
            selectedData?.setovi3 +
            selectedData?.setovi4 +
            selectedData?.setovi5) *
          20 *
          0.2
        }
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
    if (
      !selectedData ||
      (!selectedData.misici1?.trim() && !selectedData.misici2?.trim())
    ) {
      return null; // Ako ne postoji, ne prikazujemo ništa
    }

    // Grupisanje mišića i sabiranje setova
    const misiciSetovi = [
      {
        misici: selectedData.misici1,
        setovi: Number(selectedData.setovi1) || 0,
      },
      {
        misici: selectedData.misici2,
        setovi: Number(selectedData.setovi2) || 0,
      },
      {
        misici: selectedData.misici3,
        setovi: Number(selectedData.setovi3) || 0,
      },
      {
        misici: selectedData.misici4,
        setovi: Number(selectedData.setovi4) || 0,
      },
      {
        misici: selectedData.misici5,
        setovi: Number(selectedData.setovi5) || 0,
      },
    ];

    // Grupisanje mišića po imenu i sabiranje njihovih setova
    const groupedData = misiciSetovi.reduce((acc, { misici, setovi }) => {
      if (misici) {
        acc[misici] = (acc[misici] || 0) + setovi; // Sabiranje setova za isti mišić
      }
      return acc;
    }, {});

    const misici = Object.keys(groupedData); // Imena mišića
    const setovi = Object.values(groupedData); // Sabirani setovi za svaki mišić

    // Ukupan broj setova
    const totalSetovi = setovi.reduce((sum, value) => sum + value, 0);

    // Računanje procenata
    const procenti = setovi.map((value) =>
      ((value / totalSetovi) * 100).toFixed(2)
    ); // Procenti sa 2 decimale
    useEffect(() => {
      const documentStyle = getComputedStyle(document.documentElement);
      const data = {
        labels: misici,
        datasets: [
          {
            data: procenti,
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
            left: "",
          }}
        />
      </div>
    );
  }
  useEffect(() => {
    console.log("Value je ažurirano:", value);
  }, [value]);
  return (
    <div className="main">
      <header className="header">
        <div className="left">
          <h1 className="text-2xl ">
            Hello,
            {username.charAt(0).toUpperCase() + username.slice(1).toLowerCase()}
            !
          </h1>
          <p className="">Always stay motivated</p>
        </div>
        <div className="right">
          {" "}
          <button onClick={goToTraining} className=" button2 text white">
            Start training
          </button>
          <button
            onClick={() => {
              handleLogout();
              console.log(workout);
              console.log(selectedData);
              console.log(selectedData?.rating);
              console.log(selectedData?.misici1);
              console.log(selectedData?.setovi1);
              console.log(selectedData?.date);
              console.log(
                (selectedData?.setovi1 +
                  selectedData?.setovi2 +
                  selectedData?.setovi3 +
                  selectedData?.setovi4 +
                  selectedData?.setovi5) *
                  20
              );
            }}
            className=" button1 text-white"
          >
            Logout
          </button>
        </div>
      </header>
      <div className="info">
        <div>
          <p className="">Active days</p>
          <p className="drugip">4</p>
        </div>
        <div>
          <p>Average rating</p>
          <p className="drugip">{selectedData?.rating || "N/A"}</p>
        </div>
        <div>
          <p>Time remaining</p>
          <p className="drugip">3h 2m</p>
        </div>
      </div>
      <div className="stats">
        <h1 className="text-2xl text-white">Physical Activity</h1>

        <div className="profileDatum">
          <h1>{selectedDate}</h1>
        </div>

        {selectedData && (
          <div className="sets">
            <div className="sets2">
              <BasicBars />
            </div>
          </div>
        )}
        {!selectedData && (
          <div className="nemapodataka">
            <h1>There are no recorded activities for this day.</h1>
          </div>
        )}
        {selectedData && (
          <div className="muscles">
            <div className="muscles2">
              <PieChartDemo />
            </div>
          </div>
        )}
        {selectedData && (
          <div className="calories">
            <div className="calories2">
              <CompositionExample />
            </div>

            <h1 className="text-1xl text-black">Calories burned</h1>
            <p className="text-black">
              {(selectedData?.setovi1 +
                selectedData?.setovi2 +
                selectedData?.setovi3 +
                selectedData?.setovi4 +
                selectedData?.setovi5) *
                20}
            </p>
          </div>
        )}
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
//moram
