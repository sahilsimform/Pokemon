import Image from "next/image";
import Link from "next/link";
import { useCallback } from "react";
import Layout from "../components/Layout";
import toast from "../components/Toast";

export default function Home({ pokemon }) {
  const notify = useCallback((type, message) => {
    toast({ type, message });
  }, []);
  return (
    <Layout title="Pokemon Home">
      <div className="flex items-center justify-center">
        <Image
          src="/img/pokeball_close.png"
          alt="Pokeball"
          width="100"
          height="120"
        />
        <h1 className=" border-2 border-black bg-white text-center text-4xl text-red-600 ">
          Pokemon List
        </h1>
      </div>
      <ul>
        {pokemon.map((pokeman, index) => (
          <li
            key={index}
            className="mt-3 "
            onClick={() => notify("info", pokeman.name)}
          >
            <Link href={`/pokemon?id=${index + 1}`}>
              <a className="md:max flex flex-col items-center justify-center space-x-40 rounded-lg border-2 border-black bg-white shadow-md hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 md:flex-row">
                <Image
                  className="h-96 w-full rounded-t-lg object-cover md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"
                  src={pokeman.image}
                  alt={pokeman.name}
                  width={150}
                  height={150}
                />
                <div className="flex flex-col items-center justify-between p-4 leading-normal  ">
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {index + 1}
                  </h5>
                  <p className="mb-3  text-2xl font-normal text-gray-700 dark:text-gray-400">
                    {pokeman.name}
                  </p>
                </div>
                {/* <span className="mr-2 font-bold">{index + 1}</span>
                {pokeman.name} */}
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </Layout>
  );
}

export async function getStaticProps(context) {
  try {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=30");
    const { results } = await response.json();

    const pokemon = results.map((result, index) => {
      const paddedIndex = ("00" + (index + 1)).slice(-3);
      const image = `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${paddedIndex}.png`;
      return {
        ...result,
        image,
      };
    });
    return {
      props: { pokemon },
    };
  } catch (error) {
    notify("error", error);
  }
}
