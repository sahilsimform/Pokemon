import Link from "next/link";
import Image from "next/image";

const Navbar = () => {
  return (
    <nav className="bg-black border-gray-200 px-2 sm:px-4 py-2.5 rounded ">
      <div className="container flex flex-wrap justify-between items-center mx-auto">
        <Link href="/">
          <div className="flex items-center">
            <Image
              src="/img/pokeball_open.png"
              alt="Flowbite Logo"
              width="60"
              height="60"
            />
            <span className="self-center text-xl font-semibold whitespace-nowrap text-white">
              Pokemon
            </span>
          </div>
        </Link>
        <div className="flex md:order-2 ">
          <div
            className="hidden justify-between items-center w-full md:flex md:w-auto md:order-1"
            id="navbar-cta"
          >
            <ul className="flex flex-col p-4 mt-4 bg-gray-50 rounded-lg border border-gray-100 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <Link
                  href="/login"
                  className="block py-2 pr-4 pl-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white"
                >
                  Log In
                </Link>
              </li>
              <li>
                <Link
                  href="/signup"
                  className="block py-2 pr-4 pl-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white"
                >
                  Sign Up
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
