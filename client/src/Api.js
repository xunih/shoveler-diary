import axios from "axios";

export const Api = axios.create({
  baseURL: "http://localhost:3000/api",
  //import.meta.env.VUE_APP_API_ENDPOINT || To be fixed later
});
