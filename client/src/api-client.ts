import axios from "axios";

const axiosInstance = axios.create({
  // baseURL: "http://localhost:4000/todos",
  baseURL: "https://todolist-api-2hel.onrender.com/todos",
});
export default axiosInstance;
