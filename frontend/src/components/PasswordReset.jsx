import { useParams, useNavigate } from "react-router-dom";
import apiRequest from "../../utils/apiRequest";
import { useState } from "react";
import ErrorDialogbox from "./ErrorDialogbox";

const PasswordReset = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [error, setError] = useState("");


  const handleReset = async (e) => {
    e.preventDefault();
    try {
      await apiRequest({
        url: `/api/users/resetPassword/${token}`,
        method: "PATCH",
        data: { password, passwordConfirm },
      });
      alert("Password changed successfully");
      setError("");
      navigate("/"); 
    } catch (err) {
      setError(err.message || err.message || "Something went wrong");
    }
  };


  return (
    <div className="relative w-full max-w-md bg-white px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 sm:rounded-xl sm:px-10">
      <form onSubmit={handleReset}>
        <div className="relative mt-6">
          <input
            type="password"
            value={password}
            id="password"
            placeholder="Enter Password"
            onChange={(e) => setPassword(e.target.value)}
            className="peer mt-1 w-full border-b-2 border-gray-300 px-0 py-1 placeholder:text-transparent focus:border-gray-500 focus:outline-none"
          />
          <label
            htmlFor="password"
            className="pointer-events-none absolute top-0 left-0 origin-left -translate-y-1/2 transform text-sm text-gray-800 opacity-75 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-gray-800"
          >
            Password
          </label>
        </div>

        <div className="relative mt-6">
          <input
            type="password"
            value={passwordConfirm}
            id="passwordConfirm"
            placeholder="Confirm Password"
            onChange={(e) => setPasswordConfirm(e.target.value)}
            className="peer mt-1 w-full border-b-2 border-gray-300 px-0 py-1 placeholder:text-transparent focus:border-gray-500 focus:outline-none"
          />
          <label
            htmlFor="passwordConfirm"
            className="pointer-events-none absolute top-0 left-0 origin-left -translate-y-1/2 transform text-sm text-gray-800 opacity-75 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-gray-800"
          >
            Confirm Password
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
      {
      error && <ErrorDialogbox setError={setError} message={error}/>
     }
    </div>
  );
};

export default PasswordReset;
