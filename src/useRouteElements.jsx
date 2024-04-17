import React from "react";
import { useRoutes } from "react-router-dom";
import NotFound from "./pages/NotFound";
import path from "./constants/path";
import Weather from "./pages/Weather";
import WeatherDetail from "./pages/Weather/WeatherDetail";

function useRouterElement() {
  const routeElements = useRoutes([
    {
      path: path.home,
      element: <Weather />,
    },
    // {
    //   path: path.weatherDetail,
    //   element: <WeatherDetail />,
    // },
    {
      path: "*",
      element: <NotFound />,
    },
  ]);
  return routeElements
}

export default useRouterElement;
