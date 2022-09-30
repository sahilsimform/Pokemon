import axios from "axios";
import { toast } from "react-toastify";
import { config } from "./config";

const baseUrl = config.baseUrl;

const parseErrorCode = (error) => {
  if (error.response) {
    if (error.response.status === 401) {
      toast.error("Check ID and password!");
    } else if (error.response.status === 404) {
      toast.error("Page not found 404");
    } else {
      toast.error("Something went wrong !");
    }
  } else {
    console.log(error.message);
    toast.error(error.message);
  }

  return Promise.reject(error.response);
};

const pokemonApi = axios.create();

// Request parsing interceptor
pokemonApi.interceptors.request.use(
  async (config) => {
    config.baseURL = baseUrl;
    return config;
  },
  (error) => Promise.reject(error)
);

pokemonApi.interceptors.response.use(
  (response) => response,
  (error) => parseErrorCode(error)
);

export default pokemonApi;
