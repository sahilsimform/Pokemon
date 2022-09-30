import { toast } from "react-toastify";
import pokemonApi from "./pokemonApi";

export const signup = async (payload) => {
  try {
    // const res = await axios.post(baseUrl + `/signup`, payload);
    const res = await pokemonApi.post(`/signup`, payload);
    return res.data;
  } catch (error) {
    toast.error(error.data);
    // console.log("error on Request", error);
    return;
  }
};

export const signIn = async (payload) => {
  try {
    // const res = await axios.post(baseUrl + `/signin`, payload);
    const res = await pokemonApi.post(`/signin`, payload);
    return res.data;
  } catch (error) {
    toast.error(error.data);
    // console.log("error on Request", error);
    return;
  }
};
