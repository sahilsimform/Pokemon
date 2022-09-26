import Head from "next/head";
import Navbar from "./Navbar";

const Layout = ({ children, title, description }) => {
  return (
    <div className="bg-[url('/img/wallpaper.jpg')] ">
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <main className="container mx-auto max-w-2xl pt-8 min-h-screen">
        {children}
      </main>
    </div>
  );
};

export default Layout;
