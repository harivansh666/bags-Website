import axios from "axios";

const axiosInstance = axios.create({

  baseURL: "https://hatti-online.vercel.app/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;