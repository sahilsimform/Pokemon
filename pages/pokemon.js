import Image from "next/image";
import Link from "next/link";
import React from "react";
import Layout from "../components/Layout";

export default function pokemon({ pokeman }) {
  return (
    <Layout title={pokeman.name}>
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
