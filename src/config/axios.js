import axios from "axios";
import { baseUrl } from "./baseurl";

export const client = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});
