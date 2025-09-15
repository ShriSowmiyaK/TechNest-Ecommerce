import { useState, useEffect } from 'react';
import ErrorDialogbox from "../components/ErrorDialogbox";
import { useSelector,useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

const HomeScreen = () => {
    const userState = useSelector((store)=>store.user);
    const [error, setError] = useState(null);

  return (
    <>
    <div className=" flex flex-col gap-11 pt-28">
      <h3 className="text-2xl font-semibold ">Welcome to TechNest {userState.name}</h3>
      {
        userState.isLoggedIn ? (
           <>
            <h3 className="text-2xl font-semibold "><Link to="/products" className='underline'>Click here</Link> to view our Latest Products </h3>
           </>
        ) : (
            <h3 className="text-2xl font-semibold ">Login to view our Latest Products</h3>
        )
      }
      
    </div>
    {
      error && <ErrorDialogbox setError={setError} message={error} />
    }
    </>
    
  )
}

export default HomeScreen;
