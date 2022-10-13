import Link from "next/link";
import Image from "next/image";
import { logout } from "../client/request";
import { useRouter } from "next/router";

const Navbar = () => {
  const router = useRouter();

  const logoutHandler = async (e) => {
    e.preventDefault();
    const result = await logout();

    try {
      if (result.message === "Successful logged out!") {
        notify("success", "Successful Logout");
        router.replace("/signin");
      } else {
        notify("error in try in nav bar", result.message);
      }
    } catch {
      console.log("Something went wrong here in nav bar");
    }
  };
  return (
    <nav className="rounded border-gray-200 bg-black px-2 py-2.5 sm:px-4 ">
      <div className="container mx-auto flex flex-wrap items-center justify-between">
        <Link href="/dashboard/pokemonList">
          <div className="flex items-center">
            <Image
              src="/img/pokeball_open.png"
              alt="Flowbite Logo"
              width="60"
              height="60"
            />
            <span className="self-center whitespace-nowrap text-xl font-semibold text-white">
              Pokemon
            </span>
          </div>
        </Link>
        <div className="flex md:order-2 ">
          <div
            className=" flex w-full items-center justify-between  md:order-1 md:flex md:w-auto"
            id="navbar-cta"
          >
            <ul className="mt-4 flex flex-col rounded-lg border border-gray-100 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800 sm:flex md:mt-0 md:flex md:flex-row md:space-x-8 md:border-0 md:bg-white md:text-sm md:font-medium md:dark:bg-gray-900">
              <li>
                <Link
                  href="/dashboard/pokemonWishlist"
                  className="block rounded bg-blue-700 py-2 pr-4 pl-3 text-white dark:text-white md:bg-transparent md:p-0 md:text-blue-700"
                >
                  Wishlist
                </Link>
              </li>
              <li>
                <Link
                  href="/signin"
                  className="block rounded bg-blue-700 py-2 pr-4 pl-3 text-white dark:text-white md:bg-transparent md:p-0 md:text-blue-700"
                >
                  Sign In
                </Link>
              </li>
              <li>
                <Link
                  href="/signup"
                  className="block rounded bg-blue-700 py-2 pr-4 pl-3 text-white dark:text-white md:bg-transparent md:p-0 md:text-blue-700"
                >
                  Sign Up
                </Link>
              </li>
              <li>
                <button onClick={logoutHandler}>
                  <Link
                    href="/signin"
                    className="block rounded bg-blue-700 py-2 pr-4 pl-3 text-white dark:text-white md:bg-transparent md:p-0 md:text-blue-700"
                  >
                    Log out
                  </Link>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
