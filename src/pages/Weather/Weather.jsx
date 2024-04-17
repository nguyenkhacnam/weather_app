import React, { useEffect } from "react";
import WeatherDetail from "./WeatherDetail";
import WeaetherList from "./WeatherList";
import Search from "../../components/Search";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../../stores/actions";

function Weather() {

  return (
    <div className="p-10 bg-gradient-to-br from-pink-200 via-purple-200 to-indigo-200">
      <Search />
      <div className="flex flex-col items-center justify-center  min-h-screen text-gray-700 p-10 bg-gradient-to-br from-pink-200 via-purple-200 to-indigo-200 ">
        <WeatherDetail />
        <WeaetherList />
      </div>
    </div>
  );
}

export default Weather;
