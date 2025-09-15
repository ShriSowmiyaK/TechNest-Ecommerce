import { useState } from "react"
import { FaTimes } from 'react-icons/fa';
import apiRequest from "./../../utils/apiRequest";
import ErrorDialogbox from "./ErrorDialogbox";

const Signup = ({ setloginModal, signupModal, setsignupModal }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setpasswordConfirm] = useState("");
  const [name, setname] = useState("");
  const [error, setError] = useState(null);

  const submitSignup = async (e) => {
    e.preventDefault();
    // console.log(password);
    // console.log(passwordConfirm);
    try {
      const res = await apiRequest({
        url: "/api/users/signup",
        method: "POST",
        data: { name, email, password, passwordConfirm },
      });
      // console.log("Signup success:", res);
      setsignupModal(false);
      setError(null);
      setloginModal(true);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
      { <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
          <div className="relative w-full max-w-md bg-white px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 sm:rounded-xl sm:px-10">
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
              onClick={() => setsignupModal(false)}
            >
              <FaTimes size={20} />
            </button>
            <div className="w-full">
              <div className="text-center">
                <h1 className="text-3xl font-semibold text-gray-900">SIGNUP</h1>
                <p className="mt-2 text-gray-500">
                  SIGNUP below to access your account
                </p>
              </div>
              <div className="mt-5">
                <form onSubmit={submitSignup}>
                  <div className="relative mt-6">
                    <input
                      type="text"
                      value={name}
                      id="name"
                      placeholder="Name"
                      onChange={(e) => setname(e.target.value)}
                      className="peer mt-1 w-full border-b-2 border-gray-300 px-0 py-1 placeholder:text-transparent focus:border-gray-500 focus:outline-none"
                    />
                    <label htmlFor="name" className="pointer-events-none absolute top-0 left-0 origin-left -translate-y-1/2 transform text-sm text-gray-800 opacity-75 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-gray-800">
                      Name
                    </label>
                  </div>

                  <div className="relative mt-6">
                    <input
                      type="email"
                      value={email}
                      id="email"
                      placeholder="Email Address"
                      onChange={(e) => setEmail(e.target.value)}
                      className="peer mt-1 w-full border-b-2 border-gray-300 px-0 py-1 placeholder:text-transparent focus:border-gray-500 focus:outline-none"
                    />
                    <label htmlFor="email" className="pointer-events-none absolute top-0 left-0 origin-left -translate-y-1/2 transform text-sm text-gray-800 opacity-75 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-gray-800">
                      Email Address
                    </label>
                  </div>

                  <div className="relative mt-6">
                    <input
                      type="password"
                      value={password}
                      id="password"
                      placeholder="Password"
                      onChange={(e) => setPassword(e.target.value)}
                      className="peer mt-1 w-full border-b-2 border-gray-300 px-0 py-1 placeholder:text-transparent focus:border-gray-500 focus:outline-none"
                    />
                    <label htmlFor="password" className="pointer-events-none absolute top-0 left-0 origin-left -translate-y-1/2 transform text-sm text-gray-800 opacity-75 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-gray-800">
                      Password
                    </label>
                  </div>

                  <div className="relative mt-6">
                    <input
                      type="password"
                      value={passwordConfirm}
                      id="passwordConfirm"
                      placeholder="Confirm Password"
                      onChange={(e) => setpasswordConfirm(e.target.value)}
                      className="peer mt-1 w-full border-b-2 border-gray-300 px-0 py-1 placeholder:text-transparent focus:border-gray-500 focus:outline-none"
                    />
                    <label htmlFor="passwordConfirm" className="pointer-events-none absolute top-0 left-0 origin-left -translate-y-1/2 transform text-sm text-gray-800 opacity-75 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-gray-800">
                      Confirm Password
                    </label>
                  </div>

                  <div className="my-6">
                    <button
                      type="submit"
                      className="w-full rounded-md bg-black px-3 py-4 text-white focus:bg-gray-600 focus:outline-none"
                    >
                      Submit
                    </button>
                  </div>

                  <p className="text-center text-sm text-gray-500">
                    Already have an account?
                    <button type="button"
                      className="font-semibold text-gray-600 hover:underline focus:text-gray-800 focus:outline-none"
                      onClick={() => {
                        setsignupModal(false);
                        setloginModal(true);
                      }}
                    >
                      Login
                    </button>
                    .
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      }
      {error && <ErrorDialogbox setError={setError} message={error} />}
    </>
  );
};

export default Signup;
