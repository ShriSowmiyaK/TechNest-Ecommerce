import { FaShoppingCart, FaUser} from 'react-icons/fa';
import { useSelector,useDispatch } from 'react-redux';
import { useState } from 'react';
import { logoutUser } from '../../utils/slices/userSlice';
import Login from './Login';
import Signup from './Signup';
import apiRequest from '../../utils/apiRequest';
import ErrorDialogbox from './ErrorDialogbox';
import { Link } from 'react-router-dom';

const Header = () => {
  const dispatch = useDispatch();
  const userState = useSelector((store)=>store.user);
  const cartCount = useSelector((store)=>store.cart.count);
  const [error, setError] = useState(null);
  const [loginModal,setloginModal] = useState(false);
  const [signupModal,setsignupModal] = useState(false);
  

  const logout = async()=>{
    try {
          const res = await apiRequest({
            url: "/api/users/logout",
            method: "GET",
          });
          setError(null);
          dispatch(logoutUser());
        } 
    catch (err) 
        {
            setError(err.message); 
        }
    }

  return (
    <>
    <header>
      <div className="flex justify-between bg-fuchsia-950 shadow-lg text-white py-7 px-12">
        <Link to="/" className='text-3xl font-semibold'>TECHNEST</Link>
        <div className='flex items-center gap-2'>
          { userState.isLoggedIn ? (
            <>
              <div className="flex items-center gap-7">
                <div className="flex items-center gap-2 cursor-pointer">
                  <span className="text-xl font-semibold">({cartCount})</span>
                  <FaShoppingCart className="text-xl" />
                  <Link to="/cart" className="text-xl font-semibold">CART</Link>
                </div>

                <Link to="/userProfile" className="flex items-center gap-2 cursor-pointer" >
                  <FaUser className="text-xl" />
                  <span className="text-xl font-semibold">{userState.name}</span>
                </Link>
                <Link to="/" className="text-xl font-semibold cursor-pointer" onClick={logout}>LOGOUT</Link>
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center gap-2 cursor-pointer">
                <FaUser className="text-xl" />
                <span className="text-xl font-semibold" onClick={()=>{setloginModal(true)}}>LOGIN</span>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
    {
      error && <ErrorDialogbox setError={setError} message={error}/>
    }

    {
    loginModal && <Login loginModal={loginModal} setloginModal={setloginModal} signupModal={signupModal} setsignupModal={setsignupModal} />
    }
    {
    signupModal && <Signup setloginModal={setloginModal} signupModal={signupModal} setsignupModal={setsignupModal}/>
    }
</>
  );
};

export default Header;