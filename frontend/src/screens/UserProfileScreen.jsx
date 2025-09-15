import { useState } from "react";
import { useSelector } from "react-redux";
import { FaTimes } from 'react-icons/fa';
import ErrorDialogbox from "../components/ErrorDialogbox";
import apiRequest from "../../utils/apiRequest";
import { useDispatch } from "react-redux";
import { setUser } from "../../utils/slices/userSlice";
import { Link } from "react-router-dom";

const UserProfileScreen = () => {
  const user = useSelector((store)=>store.user);
  const [detailModal,setdetailModal] = useState(false);
  const [formData, setFormData] = useState({name:user.name});
  const [error,setError] = useState("");
  const dispatch = useDispatch();

  // Update password Details
  const handleForgot = async (e) => {
    e.preventDefault();
    try {
      const res = await apiRequest({
        url: "/api/users/forgotPassword",
        method: "POST",
        data: { email : user.email },
      });
      alert("Reset link sent to your email!");
      setError("");
    } catch (err) {
      setError(err.message || "Something went wrong");
    }
  };

  //setting data to post
  const handleDetailChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  // Submit updated details
  const handleDetailsSubmit = async(e) => {
    e.preventDefault();   
    try {
      const res = await apiRequest({
        url: "/api/users/updateMe",
        method: "PATCH",
        data: formData,
      });
        dispatch(setUser({ ...formData, email : user.email }));
        setdetailModal(false);
        //  console.log("Updated Details:", formData);
      setError("");
    } catch (err) {
        // console.log(err);
      setError(err.message || "Something went wrong");
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      {/* Display User Info */}
      <div className="bg-white shadow-md p-4 rounded-xl mb-4">
        <h2 className="text-xl font-bold mb-2">User Profile</h2>
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <button
          onClick={() => setdetailModal(true)}
          className="w-full bg-fuchsia-800 hover:bg-fuchsia-950 text-white py-2 rounded-xl shadow"
        >
          Update Name
        </button>
        <button className="w-full bg-fuchsia-800 hover:bg-fuchsia-950 text-white py-2 rounded-xl shadow" onClick={handleForgot}>
          Update Password
        </button>
         
      </div>
     

      {/* Update Details Form */}
      {detailModal && (
        <div>
        <button className="absolute top-3 right-3 text-gray-500 hover:text-gray-800" onClick={() => setdetailModal(false)}>
            <FaTimes size={20} />
        </button>
        <form
          onSubmit={handleDetailsSubmit}
          className="mt-4 bg-gray-100 p-4 rounded-xl"
        >
          <h3 className="font-semibold mb-2">Update Details</h3>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleDetailChange}
            placeholder="Name"
            className="block w-full border p-2 mb-2 rounded"
          />
          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded-xl"
          >
            Save
          </button>
        </form>
        </div>
      )}
     
      {error && <ErrorDialogbox setError={setError} message={error}/>}

      {/* if role is admin then admin can view orders of all buyers */}
      {user.role=="admin" &&  
      
        <Link to="/orders" className="mt-5 w-full bg-fuchsia-800 hover:bg-fuchsia-950 text-white py-2 rounded-xl shadow text-center block">
            View orders
        </Link>
      }
    </div>
  );
};

export default UserProfileScreen;
