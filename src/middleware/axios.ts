import axios from "axios";

export const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL
    ? process.env.REACT_APP_API_URL
    : "https://6304c03394b8c58fd7244553.mockapi.io",
});
