import Image from "next/image";
import Link from "next/link";
import Layout from "../../components/Layout";
import axios from "axios";
import { AiFillDelete } from "react-icons/ai";
import { wishlistDelete } from "../../client/request";
import { config } from "../../client/config";
import { useState } from "react";

export default function PokemonList({ pokemon, token }) {
  const [wishlistData, setWishlistData] = useState(pokemon);
  const mapPokemonWithWishlist = async () => {
    const { data } = await axios.get("/api/wishlist/wishlistFetch", {
      baseURL: config.baseUrl,
      headers: {
        Authorization: token,
      },
    });
    const result = await axios.get(
      "https://pokeapi.co/api/v2/pokemon?limit=30"
    );
    const { results } = result.data;
    const tempData = [];
    data.data.map((item) => {
      tempData.push({
        ...results[item - 1],
        id: item - 1,
      });
    });
    const pokemon = tempData.map((result) => {
      const paddedIndex = ("00" + (result.id + 1)).slice(-3);
      const image = `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${paddedIndex}.png`;
      return {
        ...result,
        image,
      };
    });
    return pokemon;
  };

  const bookmarkHendelerRemove = async (id) => {
    const payload = { id };
    const result = await wishlistDelete(payload);
    try {
      if (result.status === "success") {
        console.log(await mapPokemonWithWishlist());
        setWishlistData(await mapPokemonWithWishlist());
        // console.log(mapPokemonWithWishlist(pokemonData, pokemonIds));
        console.log("succes with remove wishlist");
      }
    } catch (error) {
      console.log("error on bookmarkHendelerRemove", error);
    }
  };
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
          Pokemon Wishlist
        </h1>
      </div>
      {wishlistData.length === 0 ? (
        <div className="md:max flex flex-col items-center justify-center space-x-40 rounded border-2  border-black bg-white shadow-md hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 md:flex-row">
          <div className="flex flex-col items-center justify-between p-4 leading-normal  ">
            <h3 className="text-2xl text-red-600">Please Add Wishlist</h3>
          </div>
        </div>
      ) : (
        <ul>
          {wishlistData.map((pokeman, index) => (
            <li key={index} className="mt-3 ">
              <div className="flex">
                <div className="rounded border-2 border-r-0 border-black bg-white">
                  <button
                    onClick={() => bookmarkHendelerRemove(pokeman.id + 1)}
                  >
                    <AiFillDelete className="mt-12 cursor-pointer  text-3xl text-red-600" />
                  </button>
                </div>
                <div className="w-full">
                  <Link href={`/dashboard/pokemon?id=${index + 1}`}>
                    <a className="md:max flex flex-col items-center justify-center space-x-40 rounded border-2 border-l-0 border-black bg-white shadow-md hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 md:flex-row">
                      <Image
                        className="h-96 w-full rounded-t-lg object-cover md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"
                        src={pokeman.image}
                        alt={pokeman.name}
                        width={150}
                        height={150}
                      />
                      <div className="flex flex-col items-center justify-between p-4 leading-normal  ">
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                          {pokeman.id}
                        </h5>
                        <p className="mb-3  text-2xl font-normal text-gray-700 dark:text-gray-400">
                          {pokeman.name}
                        </p>
                      </div>
                      {/* <span className="mr-2 font-bold">{index + 1}</span>
                {pokeman.name} */}
                    </a>
                  </Link>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const token = context.req.cookies.PokemonToken;

  if (!token) return { redirect: { destination: "/" } };
  else {
    try {
      const { data } = await axios.get("/api/wishlist/wishlistFetch", {
        baseURL: config.baseUrl,
        headers: {
          Authorization: token,
        },
      });
      const myWishlistData = data.data;

      const result = await axios.get(
        "https://pokeapi.co/api/v2/pokemon?limit=30"
      );
      const { results } = result.data;

      const tempData = [];
      myWishlistData.map((item) => {
        tempData.push({
          ...results[item - 1],
          id: item - 1,
        });
      });

      const pokemon = tempData.map((result) => {
        const paddedIndex = ("00" + (result.id + 1)).slice(-3);
        const image = `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${paddedIndex}.png`;
        return {
          ...result,
          image,
        };
      });

      return {
        props: { pokemon, token },
      };
    } catch (error) {
      console.log(error);
      return { redirect: { destination: "/" } };
    }
  }
}
