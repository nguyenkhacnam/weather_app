import http from ".";
const apiKey = import.meta.env.VITE_APP_API_KEY;

export const getWeather = (q = "Ha Noi") => {
  return http.get(`/forecast?q=${q}&appid=${apiKey}&lang=vi&units=metric`);
};

export const search = (q = "Ha Noi") => {
  return http.get(`/weather?q=${q}&appid=${apiKey}&lang=vi&units=metric`);
};
