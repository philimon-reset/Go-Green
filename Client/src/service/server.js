import axios from "axios";

const server = axios.create({
  baseURL: "http://127.0.0.1:6379/api",
  withCredentials: true,
});

export default server;
