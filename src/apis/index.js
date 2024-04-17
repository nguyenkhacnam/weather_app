import axios from "axios";

const http = axios.create({
    baseURL: `http://api.openweathermap.org/data/2.5`,
    timeout: 100000
})

export default http