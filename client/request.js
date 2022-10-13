import { toast } from "react-toastify";
import pokemonApi from "./pokemonApi";

export const signup = async (payload) => {
  try {
    const res = await pokemonApi.post(`/signup`, payload);
    return res.data;
  } catch (error) {
    toast.error(error.data);
    console.log("error on Request signup", error);
    return;
  }
};

export const signIn = async (payload) => {
  try {
    const res = await pokemonApi.post(`/signin`, payload);
    return res.data;
  } catch (error) {
    toast.error(error.data);
    console.log("error on Request signin", error);
    return;
  }
};

export const logout = async () => {
  try {
    const res = await pokemonApi.post(`/logout`);
    return res.data;
  } catch (error) {
    // toast.error(error.data);
    console.log("error on Request", error);
    return;
  }
};

export const wishlistAdd = async (payload) => {
  try {
    const res = await pokemonApi.post(`/wishlist/wishlistAdd`, payload);
    return res.data;
  } catch (error) {
    // toast.error(error.data);
    console.log("error on Request", error);
    return;
  }
};

export const wishlistDelete = async (payload) => {
  try {
    const res = await pokemonApi.post(`/wishlist/wishlistDelete`, payload);

    return res.data;
  } catch (error) {
    // toast.error(error.data);
    console.log("error on Request", error);
    return;
  }
};

export const wishlistFetch = async (payload) => {
  try {
    const res = await pokemonApi.get(`/wishlist/wishlistFetch`, payload);

    return res.data;
  } catch (error) {
    // toast.error(error.data);
    console.log("error on Request", error);
    return;
  }
};
