import axios from "axios";

const BASE_URL = "https://api.traveluca.com/api";

const api = axios.create({
  baseURL: `${BASE_URL}`,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export default api;
