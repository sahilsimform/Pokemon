// export default baseUrl = `http://localhost:3000/api`;

const production = {
  baseUrl: `https://sahil-pokemon.vercel.app/api`,
};

const development = {
  baseUrl: `http://localhost:3000/api`,
};

export const config =
  process.env.NODE_ENV === "development" ? development : production;
