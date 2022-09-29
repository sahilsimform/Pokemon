import { useCallback, useState } from "react";
import Image from "next/image";
import Layout from "../components/Layout";
// import { getSession, signIn } from "next-auth/client";
import toast from "../components/Toast";
import { useRouter } from "next/router";
import { signIn } from "../client/request";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const router = useRouter();

  const notify = useCallback((type, message) => {
    toast({ type, message });
  }, []);

  const loginHandler = async (e) => {
    e.preventDefault();
    const payload = { email, password };
    const result = await signIn(payload);

    // if (!result.error) {
    //   notify("success", "Successful Signin");
    //   router.replace("/");
    // } else {
    //   notify("error", result.error);
    //   setErrorMessage(result.error);
    // }

    if (result.hasError) {
      notify("error", result.errorMessage);
      setErrorMessage(result.errorMessage);
    } else {
      setErrorMessage(null);
      setEmail("");
      setPassword("");
      // console.log(result);
      notify("success", "Successful SignIn");
      router.replace(`/`);
    }
  };

  return (
    <Layout>
      <form
        className="flex items-center justify-center"
        onSubmit={loginHandler}
      >
        <div className="w-96 rounded bg-white p-6 shadow-sm">
          <h1 className="items-center text-center text-4xl">Sign In</h1>
          <did className="mb-4 flex items-center justify-center">
            <Image
              src="/img/pokeball_close.png"
              alt="Pokeball"
              width="200"
              height="230"
            />
          </did>
          {errorMessage && (
            <p className="text-bold flex items-center justify-center text-red-600">
              {errorMessage}
            </p>
          )}
          <label className="text-gray-700">Email Address</label>
          <input
            className="mb-4 w-full bg-gray-50 py-2 px-1 text-gray-500 outline-none"
            type="email"
            id="floatingEmail"
            placeholder="name@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label className="text-gray-700">Password</label>
          <input
            className="mb-4 w-full bg-gray-50 py-2 px-1 text-gray-500 outline-none"
            type="password"
            id="floatingPassword"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="w-full rounded bg-blue-500 text-gray-100 transition-colors hover:bg-blue-600"
          >
            Sign In
          </button>
        </div>
      </form>
    </Layout>
  );
}

export default SignIn;