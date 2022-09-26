import Image from "next/image";
import Link from "next/link";
import React from "react";
import Layout from "../components/Layout";

export default function pokemon({ pokeman }) {
  return (
    <Layout title={pokeman.name}>
      {/* <h1 className="text-4xl mb-2 text-center capitalize">{pokeman.name}</h1>
      <Image
        className="mx-auto"
        src={pokeman.image}
        alt={pokeman.name}
        width={300}
        height={300}
      />
      <p>
        <span className="font-bold mr-2">Weight: </span>
        {pokeman.weight}
      </p>
      <p>
        <span className="font-bold mr-2">Height: </span>
        {pokeman.height}
      </p>
      <h2 className="text-2xl mt-6 mb-2">Types</h2>
      {pokeman.types.map((type, index) => (
        <p key={index}>{type.type.name}</p>
      ))} */}
      {/* <p className="mt-10 text-center">
        <Link href="/" className="text-2xl underline">
          Go to Home
        </Link>
      </p> */}
      <div className="max-w-sm text-center bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
        <Link href="#">
          <Image
            className="rounded-t-lg"
            src={pokeman.image}
            alt={pokeman.name}
            width={300}
            height={300}
          />
        </Link>
        <div className="p-5 text-center">
          <Link href="/">
            <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {pokeman.name}
            </h2>
          </Link>
          <div className="">
            {/* <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              Here are the biggest enterprise technology acquisitions of 2021 so
              far, in reverse chronological order.
            </p> */}
            <p>
              <span className="font-bold mr-2">Weight: </span>
              {pokeman.weight}
            </p>
            <p>
              <span className="font-bold mr-2">Height: </span>
              {pokeman.height}
            </p>
            <h2 className="text-2xl mt-6 mb-2">Types</h2>
            {pokeman.types.map((type, index) => (
              <p key={index}>{type.type.name}</p>
            ))}
          </div>
        </div>
      </div>
    </Layout>

    //  <div className="max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
    //     <a href="#">
    //         <img className="rounded-t-lg" src="/docs/images/blog/image-1.jpg" alt="">
    //     </a>
    //     <div className="p-5">
    //         <a href="#">
    //             <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Noteworthy technology acquisitions 2021</h5>
    //         </a>
    //         <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
    //         <a href="#" className="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
    //             Read more
    //             <svg aria-hidden="true" className="ml-2 -mr-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
    //         </a>
    //     </div>
    // </div>
  );
}

export async function getServerSideProps(context) {
  const id = context.query.id;
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const pokeman = await response.json();
    const paddedIndex = ("00" + id).slice(-3);
    const image = `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${paddedIndex}.png`;
    pokeman.image = image;
    return {
      props: { pokeman },
    };
  } catch (error) {
    console.log(error);
  }
}
