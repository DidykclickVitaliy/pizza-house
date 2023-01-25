import axios from "axios";

export const instance = axios.create({
  baseURL: process.env.REACT_APP_PIZZA_HOUSE
    ? process.env.REACT_APP_PIZZA_HOUSE
    : "https://6304c03394b8c58fd7244553.mockapi.io",
});
