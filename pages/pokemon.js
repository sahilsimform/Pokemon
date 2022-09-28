import Image from "next/image";
import Link from "next/link";
import { useCallback } from "react";
import Layout from "../components/Layout";
import toast from "../components/Toast";

export default function Pokemon({ pokeman }) {
  const notify = useCallback((type, message) => {
    toast({ type, message });
  }, []);

  return (
    <Layout title={pokeman.name}>
      <Link href="/">
        <div className=" ml-40 max-w-sm  rounded-lg border-2  border-black bg-white text-center shadow-md dark:border-gray-700 dark:bg-gray-800">
          <Link href="/">
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
                <span className="mr-2 font-bold">Weight: </span>
                {pokeman.weight}
              </p>
              <p>
                <span className="mr-2 font-bold">Height: </span>
                {pokeman.height}
              </p>
              <h2 className="mt-6 mb-2 text-2xl">Types</h2>
              {pokeman.types.map((type, index) => (
                <p key={index}>{type.type.name}</p>
              ))}
            </div>
          </div>
        </div>
      </Link>
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
    notify("error", error);
    console.log(error);
  }
}
