import axios from "axios";

const server = axios.create({
  baseURL: "http://192.168.1.102:3000/api",
  withCredentials: true,
});

export default server;
