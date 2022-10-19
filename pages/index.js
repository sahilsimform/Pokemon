import React from "react";
import Layout from "../components/Layout";

const Index = () => {
  return (
    <Layout title="Home">
      <div className="border-1 rounded border-2 border-black  bg-white  dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
        <h3 className="text-3xl">Welcome To Sahil Pokemon App</h3>
      </div>
      <div className="border-1 rounded border-2 border-black  bg-white  dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
        <h3 className="text-xl">To see the PokemonList Please Sigin/Signup </h3>
      </div>
    </Layout>
  );
};

export default Index;
