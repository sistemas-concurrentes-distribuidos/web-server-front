import axios from "axios";

const clientAxios = axios.create({
  baseURL: "http://localhost:8000/",
});

export default clientAxios;
