import axios from "axios";

const urls = {
  dev: "http://localhost:5112/api",
  prod: "https://resgaters.azurewebsites.net/api",
};

export const apiUrl =
  process.env.NODE_ENV === "production" ? urls.prod : urls.dev;

const api = axios.create({
  baseURL: apiUrl,
});

export default api;
