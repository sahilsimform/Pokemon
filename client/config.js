const production = {
  baseUrl: `https://sahil-pokemon.vercel.app/`,
};

const development = {
  baseUrl: `http://localhost:3000/`,
};

export const config =
  process.env.NODE_ENV === "development" ? development : production;
