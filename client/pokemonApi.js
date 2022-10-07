import axios from "axios";
import { toast } from "react-toastify";

const parseErrorCode = (error) => {
  if (error.response) {
    if (error.response.status === 401) {
      toast.error("Check ID and password!");
    } else if (error.response.status === 404) {
      toast.error("Page not found 404");
    } else {
      toast.error("API Something went wrong !");
    }
  } else {
    console.log("Axois ErrorMessages", error.message);
    toast.error(error.message);
  }

  return Promise.reject(error.response);
};

const pokemonApi = axios.create();

// Request parsing interceptor
pokemonApi.interceptors.request.use(
  async (config) => {
    const hostname = window.location.hostname;
    config.baseURL =
      hostname === "localhost"
        ? `${window.location.origin}/api`
        : `https://sahil-pokemon.vercel.app/api`;
    return config;
  },
  (error) => Promise.reject(error)
);

pokemonApi.interceptors.response.use(
  (response) => response,
  (error) => parseErrorCode(error)
);

export default pokemonApi;
