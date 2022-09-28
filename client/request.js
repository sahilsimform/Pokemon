import axios from "axios";
import { getValue } from "../utils/common";
import { pokemonApi } from "./pokemon-api";

export const signup = async (payload) => {
  try {
    const res = await axios.post(pokemonApi + `/signup`, payload);
    console.log({ pokemonApi });
    return res.data;
  } catch (error) {
    return getValue(error, ["response", "data"]);
  }
};
