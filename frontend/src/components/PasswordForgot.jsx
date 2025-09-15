import apiRequest from "../../utils/apiRequest";
import { useState } from "react";

const PasswordForgot = ({setForgotPassword}) => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleForgot = async (e) => {
    e.preventDefault();
    try {
      const res = await apiRequest({
        url: "/api/users/forgotPassword",
        method: "POST",
        data: { email },
      });
      alert("Reset link sent to your email!");
      setForgotPassword(false);
      setError("");
    } catch (err) {
      setError(err.message || "Something went wrong");
    }
  };

  return (
    <div className="relative w-full max-w-md bg-white px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 sm:rounded-xl sm:px-10">
      <div className="mt-5">
        <form onSubmit={handleForgot}>
          <div className="relative mt-6">
            <input
              type="email"
              value={email}
              id="emailid"
              placeholder="Email Address"
              onChange={(e) => setEmail(e.target.value)}
              className="peer mt-1 w-full border-b-2 border-gray-300 px-0 py-1 placeholder:text-transparent focus:border-gray-500 focus:outline-none"
            />
            <label
              htmlFor="emailid"
              className="pointer-events-none absolute top-0 left-0 origin-left -translate-y-1/2 transform text-sm text-gray-800 opacity-75 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-gray-800"
            >
              Email Address
            </label>
          </div>

          {error && <p className="text-red-500 mt-2">{error}</p>}

          <div className="my-6">
            <button
              type="submit"
              className="w-full rounded-md bg-black px-3 py-4 text-white focus:bg-gray-600 focus:outline-none"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PasswordForgot;
