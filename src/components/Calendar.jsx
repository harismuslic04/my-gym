import React from "react";
import { useState } from "react";
// import "../components/Calendar.css";
export default function Calendar() {
  const moods = {
    "&*@#$": "😭",
    Sad: "🥲",
    Existing: "😶",
    Good: "😊",
    Elated: "😍",
  };
  const dayList = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const months = {
    January: "Jan",
    February: "Feb",
    March: "Mar",
    April: "Apr",
    May: "May",
    June: "Jun",
    July: "Jul",
    August: "Aug",
    September: "Sept",
    October: "Oct",
    November: "Nov",
    December: "Dec",
  };
  const monthsArr = Object.keys(months);
  const now = new Date();
  const currMonth = now.getMonth();
  const [selectedMonth, setSelectMonth] = useState(
    Object.keys(months)[currMonth]
  );
  const [selectedYear, setSelectedYear] = useState(now.getFullYear());
  const numericMonth = monthsArr.indexOf(selectedMonth);
  const monthNow = new Date(
    selectedYear,
    Object.keys(months).indexOf(selectedMonth),
    1
  );
  const firstDayOfMonth = monthNow.getDay();
  const daysInMonth = new Date(
    selectedYear,
    Object.keys(selectedMonth).indexOf(selectedMonth) + 1,
    0
  ).getDate();

  const daysToDisplay = firstDayOfMonth + daysInMonth;

  const numRows = Math.floor(daysToDisplay / 7) + (daysToDisplay % 7 ? 1 : 0);
  return (
    <div className="main flex flex-col min-h-screen bg-gradient-to-r from-slate-800 to-slate-950">
      <header className="header">
        <p>MyGym</p>
        <button>Logout</button>
      </header>
      <div className="about bg-slate-950 py-10 flex  gap-2  items-center p-4 ">
        <div className="first ">
          <h1>Num days</h1>
          <p>4</p>
        </div>
        <div className="first">
          <h1>Average mood</h1>
          <p>4.4</p>
        </div>
        <div className="first">
          <h1>Time remaining</h1>
          <p>4h 30m</p>
        </div>
      </div>
      <div className="disc flex flex-col gap-4 max-w-[1200px] w-full mx-auto p-4">
        <h1 className="text-white uppercase font-semibold text-2xl sm:text-4xl md:text-5xl lg:text-6xl">
          How was your<span className="text-blue-400"> training</span> today?
        </h1>
      </div>
      <div className="moods">
        {Object.keys(moods).map((mood, moodIndex) => {
          return (
            <div key={moodIndex} className="moods">
              <button>
                <p className="img">{moods[mood]}</p>
                <p className="wtf">{mood}</p>
              </button>
            </div>
          );
        })}
      </div>
      <div className="flex bg-slate-950 cal flex-col overflow-hidden gap-3 py-4 sm:py-6 md:py-10">
        {[...Array(numRows).keys()].map((row, rowIndex) => {
          return (
            <div key={rowIndex} className="grid grid-cols-7 gap-1">
              {dayList.map((dayOfWeek, dayOfWeekIndex) => {
                let dayIndex =
                  rowIndex * 7 + dayOfWeekIndex - (firstDayOfMonth - 1);

                let dayDisplay =
                  dayIndex > daysInMonth
                    ? false
                    : row === 0 && dayOfWeekIndex < firstDayOfMonth
                    ? false
                    : true;

                let isToday = dayIndex === now.getDate();

                if (!dayDisplay) {
                  return (
                    <div className="bg-transparent" key={dayOfWeekIndex} />
                  );
                }

                return (
                  <div
                    className={
                      "datum text-xs sm:text-sm border border-solid p-2 flex items-center gap-2 justify-between rounded-lg " +
                      (isToday ? " border-indigo-400" : " border-indigo-100")
                    }
                    key={dayOfWeekIndex}
                  >
                    <p className="text-white">{dayIndex}</p>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}
