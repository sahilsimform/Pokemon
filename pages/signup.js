import { useCallback, useState } from "react";
import Image from "next/image";
import Layout from "../components/Layout";
import { signup } from "../client/request";
import toast from "../components/Toast";
import { useRouter } from "next/router";
///////
// import { Formik, Form, Field } from "formik";
// import * as Yup from "yup";
///////

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const router = useRouter();

  const notify = useCallback((type, message) => {
    toast({ type, message });
  }, []);

  const signupHandler = async (e) => {
    e.preventDefault();

    const payload = { name, email, password };
    const result = await signup(payload);

    if (result.hasError) {
      notify("error", result.errorMessage);
      setErrorMessage(result.errorMessage);
    } else {
      setErrorMessage(null);
      setName("");
      setEmail("");
      setPassword("");
      // console.log(result);
      notify("success", "Successful SignUp");
      router.replace(`/signin`);
    }
  };

  // const initialValues = {
  //   name: "",
  //   email: "",
  //   password: "",
  // };

  // const validate = Yup.object().shape({
  //   name: Yup.string()
  //     .min(5, "Must be at least 5 characters")
  //     .max(15, "Must be 15 characters or less")
  //     .required("Name Required"),
  //   email: Yup.string()
  //     .email("Must be a valid email")
  //     .max(20)
  //     .required("Email is required"),
  //   password: Yup.string()
  //     .matches(
  //       /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
  //       "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
  //     )
  //     .required("Password is Required!"),
  // });

  return (
    <Layout>
      {/* <Formik
        validationSchema={validate}
        initialValues={initialValues}
        onSubmit={onSubmitSend}
      > */}
      <form
        className="flex items-center justify-center "
        onSubmit={signupHandler}
      >
        <div className="w-96 rounded bg-white p-6 shadow-sm">
          <h1 className="items-center text-center text-4xl">Sign Up</h1>
          <div className="mb-4 flex items-center justify-center">
            <Image
              src="/img/pokeball_open.png"
              alt="Pokeball"
              width="230"
              height="230"
            />
          </div>
          {errorMessage && (
            <p className="text-bold flex items-center justify-center text-red-600">
              {errorMessage}
            </p>
          )}
          {/* <ErrorMessages name="name" /> */}
          <label className="text-gray-700">Name</label>
          <input
            className="mb-4 w-full bg-gray-50 py-2 px-1 text-gray-500 outline-none"
            type="text"
            id="floatingName"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {/* <ErrorMessages name="name" /> */}
          <label className="text-gray-700">Email Address</label>
          <input
            className="mb-4 w-full bg-gray-50 py-2 px-1 text-gray-500 outline-none"
            type="email"
            id="floatingEmail"
            placeholder="name@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {/* <ErrorMessages name="name" /> */}
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
            Sign Up
          </button>
        </div>
      </form>
      {/* </Formik> */}
    </Layout>
  );
}

export default Signup;