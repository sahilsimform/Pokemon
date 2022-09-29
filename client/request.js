// import { getValue } from "../utils/common";
// import { pokemonApi } from "./pokemonApi";

import axios from "axios";
import { baseUrl } from "./config";

export const signup = async (payload) => {
  try {
    // const res = await pokemonApi.post(`/signup`, payload);
    const res = await axios.post(baseUrl + `/signup`, payload);
    // console.log("pokemonApi", { pokemonApi });
    // console.log("baseurl", baseUrl);
    return res.data;
  } catch (error) {
    console.log("error on Request", error);
    return;
    // return getValue(error, ["response", "data"]);
  }
};

///////////////////////////////
export const signIn = async (payload) => {
  try {
    const res = await axios.post(baseUrl + `/signin`, payload);
    // console.log("pokemonApi", { pokemonApi });
    return res.data;
  } catch (error) {
    console.log("error on Request", error);
    return;
    // return getValue(error, ["response", "data"]);
  }
};
